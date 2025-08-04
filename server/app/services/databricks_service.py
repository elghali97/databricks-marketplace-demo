"""
Databricks SDK Service for data preview functionality
"""
import os
import logging
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv
from databricks.sdk import WorkspaceClient
from databricks.sdk.service.sql import StatementState
import re
import asyncio
from concurrent.futures import ThreadPoolExecutor
import pandas as pd

# Load environment variables
load_dotenv()

logger = logging.getLogger(__name__)

class DatabricksService:
    """
    Service for connecting to Databricks using the SDK and fetching preview data
    """
    
    def __init__(self):
        self.server_hostname = os.getenv('DATABRICKS_HOST')
        self.http_path = f"/sql/1.0/warehouses/{os.getenv('DATABRICKS_WAREHOUSE_ID')}"
        self.access_token = os.getenv('DATABRICKS_ACCESS_TOKEN')
        self.client_id = os.getenv('DATABRICKS_CLIENT_ID')
        self.client_secret = os.getenv('DATABRICKS_CLIENT_SECRET')
        self.cli_profile = os.getenv('DATABRICKS_CLI_PROFILE', 'DEFAULT')
        self.preview_limit = int(os.getenv('PREVIEW_DATA_LIMIT', '15'))
        self.client = None
        self.executor = ThreadPoolExecutor(max_workers=2)
        
        # Initialize client
        self._initialize_client()
        
        # Log configuration (without sensitive data)
        logger.info(f"Databricks SDK service initialized:")
        logger.info(f"  Server: {self.server_hostname}")
        logger.info(f"  HTTP Path: {self.http_path}")
        logger.info(f"  CLI Profile: {self.cli_profile}")
        logger.info(f"  Has Access Token: {bool(self.access_token)}")
        logger.info(f"  Has Client Credentials: {bool(self.client_id and self.client_secret)}")
        logger.info(f"  Preview Limit: {self.preview_limit}")
    
    def _initialize_client(self):
        """
        Initialize Databricks SDK client with OAuth client credentials support
        """
        try:
            # Priority 1: OAuth client credentials (production)
            if self.client_id and self.client_secret:
                logger.info("Initializing Databricks client with OAuth client credentials")
                self.client = WorkspaceClient(
                    host=f"https://{self.server_hostname}",
                    client_id=self.client_id,
                    client_secret=self.client_secret
                )
                logger.info("✅ Databricks client initialized with OAuth client credentials")
                
            # Priority 2: Access token authentication  
            elif self.access_token:
                logger.info("Initializing Databricks client with access token")
                self.client = WorkspaceClient(
                    host=f"https://{self.server_hostname}",
                    token=self.access_token
                )
                logger.info("✅ Databricks client initialized with access token")
                
            # Priority 3: CLI profile authentication (development)
            else:
                logger.info(f"Initializing Databricks client with CLI profile: {self.cli_profile}")
                self.client = WorkspaceClient(
                    host=f"https://{self.server_hostname}",
                    profile=self.cli_profile
                )
                logger.info(f"✅ Databricks client initialized with CLI profile '{self.cli_profile}'")
                
        except Exception as e:
            logger.error(f"Failed to initialize Databricks client: {e}")
            self.client = None
    
    def get_auth_method(self) -> str:
        """
        Get the current authentication method being used
        """
        if self.client_id and self.client_secret:
            return "oauth_client_credentials"
        elif self.access_token:
            return "access_token"
        else:
            return "cli_profile"
    
    def _sanitize_table_name(self, table_reference: str) -> str:
        """
        Extract and sanitize table name from various formats
        """
        # Remove common URL prefixes and paths
        table_name = table_reference.replace('/samples/', '').replace('.csv', '').replace('.parquet', '')
        
        # Handle full table references like catalog.schema.table
        if '.' in table_name and not table_name.startswith('/'):
            # Assume it's already a proper table reference
            return table_name
        
        # For sample URLs, try to map to actual tables
        # This is a mapping from sample file names to actual table names
        table_mappings = {
            'msci-esg-sample': 'solacc_var.market_data',
            'bloomberg-corporate-sample': 'solacc_var.monte_carlo_market',
            'sp500-sample': 'solacc_var.market_data',
            'refinitiv-worldcheck-sample': 'solacc_var.market_data',
            'moody-credit-sample': 'solacc_var.market_data',
            'visa-fraud-sample': 'solacc_var.market_data',
            'dowjones-kyc-sample': 'solacc_var.market_data',
        }
        
        # Try to find a mapping
        for sample_name, table_name in table_mappings.items():
            if sample_name in table_reference:
                return table_name
        
        # Default fallback table for preview
        return 'solacc_var.market_data'
    
    def _execute_sql_sync(self, query: str) -> Dict[str, Any]:
        """
        Execute SQL query synchronously using Databricks SDK
        """
        try:
            if not self.client:
                raise Exception("Databricks client not initialized")
            
            # Extract warehouse ID from HTTP path
            warehouse_id = self.http_path.split('/')[-1] if self.http_path else None
            if not warehouse_id:
                raise Exception("Invalid warehouse HTTP path")
            
            logger.info(f"Executing query on warehouse {warehouse_id}: {query[:100]}...")
            
            # Execute the statement
            response = self.client.statement_execution.execute_statement(
                statement=query,
                warehouse_id=warehouse_id,
                wait_timeout="30s"
            )
            
            # Check if execution was successful
            if response.status.state != StatementState.SUCCEEDED:
                error_msg = f"Query failed with state: {response.status.state}"
                if response.status.error:
                    error_msg += f" - {response.status.error.message}"
                raise Exception(error_msg)
            
            # Extract results
            result_data = response.result
            if not result_data:
                return {
                    'columns': [],
                    'data': [],
                    'row_count': 0
                }
            
            # Get column information from the manifest in the response
            columns = []
            if hasattr(response, 'manifest') and response.manifest and response.manifest.schema:
                for col in response.manifest.schema.columns:
                    columns.append({
                        'name': col.name,
                        'type': col.type_name
                    })
            
            # Get data rows
            data_rows = []
            if result_data.data_array:
                for row in result_data.data_array[:self.preview_limit]:
                    row_dict = {}
                    for i, value in enumerate(row):
                        if i < len(columns):
                            row_dict[columns[i]['name']] = value
                        else:
                            # Fallback: use column index if no schema available
                            row_dict[f'column_{i}'] = value
                    data_rows.append(row_dict)
            
            return {
                'columns': columns,
                'data': data_rows,
                'row_count': len(data_rows)
            }
            
        except Exception as e:
            logger.error(f"SQL execution failed: {e}")
            raise
    
    async def get_table_preview(self, table_reference: str) -> Dict[str, Any]:
        """
        Get preview data from a Databricks table using SDK
        """
        try:
            # Sanitize and get actual table name
            table_name = self._sanitize_table_name(table_reference)
            logger.info(f"Getting preview for table: {table_name}")
            
            # Validate table name to prevent SQL injection
            if not re.match(r'^[a-zA-Z_][a-zA-Z0-9_.]*$', table_name):
                raise ValueError(f"Invalid table name format: {table_name}")
            
            # First, get table schema
            describe_query = f"DESCRIBE {table_name}"
            
            # Run describe query in executor to avoid blocking
            loop = asyncio.get_event_loop()
            schema_result = await loop.run_in_executor(
                self.executor, 
                self._execute_sql_sync, 
                describe_query
            )
            
            # Get preview data
            preview_query = f"SELECT * FROM {table_name} LIMIT {self.preview_limit}"
            preview_result = await loop.run_in_executor(
                self.executor,
                self._execute_sql_sync,
                preview_query
            )
            
            result = {
                'table_name': table_name,
                'columns': preview_result['columns'],
                'data': preview_result['data'],
                'row_count': preview_result['row_count'],
                'preview_limit': self.preview_limit
            }
            
            logger.info(f"Successfully retrieved {result['row_count']} rows from {table_name}")
            return result
                
        except Exception as e:
            logger.error(f"Failed to get table preview for {table_reference}: {e}")
            # Return fallback data structure
            return {
                'table_name': table_reference,
                'columns': [],
                'data': [],
                'row_count': 0,
                'preview_limit': self.preview_limit,
                'error': str(e)
            }
    
    async def test_connection(self) -> bool:
        """
        Test connection to Databricks using SDK
        """
        try:
            if not self.client:
                logger.warning("Databricks client not initialized")
                return False
            
            # Simple test query
            test_query = "SELECT 1 as test"
            
            loop = asyncio.get_event_loop()
            result = await loop.run_in_executor(
                self.executor,
                self._execute_sql_sync,
                test_query
            )
            
            success = result and result.get('row_count', 0) > 0
            if success:
                logger.info("Databricks SDK connection test successful")
            else:
                logger.warning("Databricks SDK connection test failed")
            
            return success
                
        except Exception as e:
            logger.error(f"Databricks SDK connection test failed: {e}")
            return False

# Global service instance
databricks_service = DatabricksService() 