import json
import os
from pathlib import Path
from typing import List, Optional, Dict, Any
from datetime import datetime
import logging
from app.models.dataset import Dataset, DatasetCategory, DataFrequency, PricingModel, AccessLevel, Provider, TimeRange
from app.services.database_service import database_service

logger = logging.getLogger(__name__)

class DatasetService:
    def __init__(self):
        # Keep JSON path for fallback
        self.client_data_path = Path(__file__).parent.parent.parent.parent / "client" / "src" / "data" / "datasets.json"
        self._datasets_cache = None
        self._cache_timestamp = None
        self._cache_duration = 300  # 5 minutes cache
    
    def _convert_enum_values(self, item: dict) -> dict:
        """Convert database string values to Pydantic enum values"""
        # Mapping from database values to enum values
        enum_mappings = {
            'category': {
                'MARKET_TRADING': DatasetCategory.MARKET_TRADING,
                'ALTERNATIVE_DATA': DatasetCategory.ALTERNATIVE_DATA,
                'REFERENCE_DATA': DatasetCategory.REFERENCE_DATA,
                'RISK_COMPLIANCE': DatasetCategory.RISK_COMPLIANCE,
                'CUSTOMER_ANALYTICS': DatasetCategory.CUSTOMER_ANALYTICS,
                'ESG_SUSTAINABILITY': DatasetCategory.ESG_SUSTAINABILITY,
                'CREDIT_RISK': DatasetCategory.CREDIT_RISK,
                'FRAUD_DETECTION': DatasetCategory.FRAUD_DETECTION,
                # Also handle the actual enum values from database
                'Market Trading': DatasetCategory.MARKET_TRADING,
                'Alternative Data': DatasetCategory.ALTERNATIVE_DATA,
                'Reference Data': DatasetCategory.REFERENCE_DATA,
                'Risk & Compliance': DatasetCategory.RISK_COMPLIANCE,
                'Customer Analytics': DatasetCategory.CUSTOMER_ANALYTICS,
                'ESG & Sustainability': DatasetCategory.ESG_SUSTAINABILITY,
                'Credit Risk': DatasetCategory.CREDIT_RISK,
                'Fraud Detection': DatasetCategory.FRAUD_DETECTION,
            },
            'frequency': {
                'REAL_TIME': DataFrequency.REAL_TIME,
                'DAILY': DataFrequency.DAILY,
                'WEEKLY': DataFrequency.WEEKLY,
                'MONTHLY': DataFrequency.MONTHLY,
                'QUARTERLY': DataFrequency.QUARTERLY,
                'ANNUALLY': DataFrequency.ANNUALLY,
                # Also handle the actual enum values from database
                'Real-time': DataFrequency.REAL_TIME,
                'Daily': DataFrequency.DAILY,
                'Weekly': DataFrequency.WEEKLY,
                'Monthly': DataFrequency.MONTHLY,
                'Quarterly': DataFrequency.QUARTERLY,
                'Annual': DataFrequency.ANNUALLY,
            },
            'pricingModel': {
                'FREE': PricingModel.FREE,
                'ONE_TIME': PricingModel.ONE_TIME,
                'SUBSCRIPTION': PricingModel.SUBSCRIPTION,
                'PAY_PER_USE': PricingModel.PAY_PER_USE,
                'CUSTOM': PricingModel.ONE_TIME,  # Map CUSTOM to ONE_TIME
                # Also handle the actual enum values from database
                'Free': PricingModel.FREE,
                'One-time Purchase': PricingModel.ONE_TIME,
                'Subscription': PricingModel.SUBSCRIPTION,
                'Pay-per-use': PricingModel.PAY_PER_USE,
            },
            'accessLevel': {
                'PUBLIC': AccessLevel.PUBLIC,
                'PREMIUM': AccessLevel.PREMIUM,
                'ENTERPRISE': AccessLevel.ENTERPRISE,
                'RESTRICTED': AccessLevel.PREMIUM,  # Map RESTRICTED to PREMIUM
                'PRIVATE': AccessLevel.ENTERPRISE,  # Map PRIVATE to ENTERPRISE
                # Also handle the actual enum values from database
                'Public': AccessLevel.PUBLIC,
                'Premium': AccessLevel.PREMIUM,
                'Enterprise': AccessLevel.ENTERPRISE,
            }
        }
        
        # Convert enum values
        for field, mapping in enum_mappings.items():
            if field in item and item[field] in mapping:
                item[field] = mapping[item[field]]
        
        return item
    
    async def _load_datasets_from_database(self) -> List[Dataset]:
        """Load datasets from PostgreSQL database"""
        try:
            logger.info("Loading datasets from PostgreSQL database")
            
            # Test database connection first
            if not await database_service.test_connection():
                logger.warning("Database connection test failed, falling back to JSON")
                return self._load_datasets_from_json()
            
            # Execute the SQL query provided by the user
            query = "SELECT * FROM elghali_benchekroun.dataset"
            rows = await database_service.execute_query(query)
            
            if not rows:
                logger.warning("No datasets found in database, falling back to JSON")
                return self._load_datasets_from_json()
            
            logger.info(f"Found {len(rows)} datasets in database")
            datasets = []
            
            for row in rows:
                try:
                    # Convert database row to dataset format
                    item = dict(row)
                    
                    # Convert enum values
                    item = self._convert_enum_values(item)
                    
                    # Handle datetime fields
                    if 'lastUpdated' in item and item['lastUpdated']:
                        if isinstance(item['lastUpdated'], str):
                            item['lastUpdated'] = datetime.fromisoformat(item['lastUpdated'])
                    
                    # Handle timeRange - check different possible field names
                    time_range_data = None
                    if 'timeRange' in item and item['timeRange']:
                        time_range_data = item['timeRange']
                    elif 'time_range' in item and item['time_range']:
                        time_range_data = item['time_range']
                    
                    if time_range_data:
                        if isinstance(time_range_data, dict):
                            # Handle JSON format
                            start_key = 'start' if 'start' in time_range_data else 'from'
                            end_key = 'end' if 'end' in time_range_data else 'to'
                            
                            item['timeRange'] = TimeRange(
                                start=datetime.fromisoformat(time_range_data[start_key]),
                                end=datetime.fromisoformat(time_range_data[end_key])
                            )
                        else:
                            # Handle string format or other formats
                            item['timeRange'] = None
                    
                    # Handle provider - check if it's already a dict or needs parsing
                    if 'provider' in item and item['provider']:
                        if isinstance(item['provider'], dict):
                            item['provider'] = Provider(**item['provider'])
                        elif isinstance(item['provider'], str):
                            # If provider is just a string, create a basic Provider object
                            item['provider'] = Provider(name=item['provider'], logo=None, verified=True)
                    
                    # Handle array fields that might be JSON strings
                    array_fields = ['tags', 'formats', 'geographicCoverage']
                    for field in array_fields:
                        if field in item and isinstance(item[field], str):
                            try:
                                item[field] = json.loads(item[field])
                            except (json.JSONDecodeError, TypeError):
                                # If not valid JSON, split by comma as fallback
                                item[field] = [tag.strip() for tag in item[field].split(',') if tag.strip()]
                    
                    # Create Dataset instance
                    dataset = Dataset(**item)
                    datasets.append(dataset)
                    
                except Exception as e:
                    logger.error(f"Error processing dataset row {row.get('id', 'unknown')}: {e}")
                    continue
            
            logger.info(f"Successfully loaded {len(datasets)} datasets from database")
            return datasets
            
        except Exception as e:
            logger.error(f"Error loading datasets from database: {e}")
            logger.info("Falling back to JSON file")
            return self._load_datasets_from_json()
    
    def _load_datasets_from_json(self) -> List[Dataset]:
        """Fallback method to load datasets from JSON file"""
        try:
            logger.info("Loading datasets from JSON file (fallback)")
            with open(self.client_data_path, 'r') as file:
                data = json.load(file)
                datasets = []
                for item in data:
                    # Convert enum values
                    item = self._convert_enum_values(item)
                    
                    # Convert string dates to datetime objects
                    item['lastUpdated'] = datetime.fromisoformat(item['lastUpdated'])
                    
                    # Fix timeRange property mapping (JSON uses 'from'/'to', model expects 'start'/'end')
                    if item.get('timeRange'):
                        time_range = item['timeRange']
                        item['timeRange'] = TimeRange(
                            start=datetime.fromisoformat(time_range['from']),
                            end=datetime.fromisoformat(time_range['to'])
                        )
                    
                    # Convert provider to Provider model
                    if isinstance(item.get('provider'), dict):
                        item['provider'] = Provider(**item['provider'])
                    
                    # Create Dataset instance
                    dataset = Dataset(**item)
                    datasets.append(dataset)
                
                return datasets
        except FileNotFoundError:
            logger.error(f"Fallback JSON file not found at {self.client_data_path}")
            return []
        except Exception as e:
            logger.error(f"Error loading fallback datasets from JSON: {e}")
            return []
    
    async def _get_datasets_with_cache(self) -> List[Dataset]:
        """Get datasets with caching mechanism"""
        current_time = datetime.now().timestamp()
        
        # Check if cache is valid
        if (self._datasets_cache is not None and 
            self._cache_timestamp is not None and 
            current_time - self._cache_timestamp < self._cache_duration):
            logger.debug("Using cached datasets")
            return self._datasets_cache
        
        # Load fresh data
        datasets = await self._load_datasets_from_database()
        
        # Update cache
        self._datasets_cache = datasets
        self._cache_timestamp = current_time
        
        return datasets
    
    async def get_all_datasets(self, page: int = 1, limit: int = 50) -> tuple[List[Dataset], int]:
        """Get all datasets with pagination"""
        datasets = await self._get_datasets_with_cache()
        start_idx = (page - 1) * limit
        end_idx = start_idx + limit
        paginated_datasets = datasets[start_idx:end_idx]
        return paginated_datasets, len(datasets)
    
    async def get_dataset_by_id(self, dataset_id: str) -> Optional[Dataset]:
        """Get a specific dataset by ID"""
        datasets = await self._get_datasets_with_cache()
        for dataset in datasets:
            if dataset.id == dataset_id:
                return dataset
        return None
    
    async def get_datasets_by_category(self, category: DatasetCategory, page: int = 1, limit: int = 50) -> tuple[List[Dataset], int]:
        """Get datasets filtered by category"""
        datasets = await self._get_datasets_with_cache()
        filtered_datasets = [d for d in datasets if d.category == category]
        start_idx = (page - 1) * limit
        end_idx = start_idx + limit
        paginated_datasets = filtered_datasets[start_idx:end_idx]
        return paginated_datasets, len(filtered_datasets)
    
    async def search_datasets(self, query: str, page: int = 1, limit: int = 50) -> tuple[List[Dataset], int]:
        """Search datasets by query string"""
        datasets = await self._get_datasets_with_cache()
        query_lower = query.lower()
        filtered_datasets = []
        
        for dataset in datasets:
            # Search in title, description, provider name, and tags
            if (query_lower in dataset.title.lower() or
                query_lower in dataset.description.lower() or
                query_lower in dataset.provider.name.lower() or
                any(query_lower in tag.lower() for tag in dataset.tags)):
                filtered_datasets.append(dataset)
        
        start_idx = (page - 1) * limit
        end_idx = start_idx + limit
        paginated_datasets = filtered_datasets[start_idx:end_idx]
        return paginated_datasets, len(filtered_datasets)
    
    async def get_dataset_stats(self) -> Dict[str, Any]:
        """Get dataset statistics"""
        datasets = await self._get_datasets_with_cache()
        category_counts = {}
        providers = set()
        
        for dataset in datasets:
            # Count by category
            category_key = dataset.category.value
            category_counts[category_key] = category_counts.get(category_key, 0) + 1
            
            # Count unique providers
            providers.add(dataset.provider.name)
        
        return {
            "totalDatasets": len(datasets),
            "totalProviders": len(providers),
            "categoryCounts": category_counts
        }
    
    async def refresh_datasets(self):
        """Reload datasets from database (clears cache)"""
        logger.info("Refreshing datasets cache")
        self._datasets_cache = None
        self._cache_timestamp = None

# Global instance
dataset_service = DatasetService() 