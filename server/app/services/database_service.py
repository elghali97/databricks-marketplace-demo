import os
import asyncpg
import uuid
from typing import List, Dict, Any, Optional
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import text
import logging
from dotenv import load_dotenv
from databricks.sdk import WorkspaceClient

# Load environment variables at module import time
load_dotenv()

logger = logging.getLogger(__name__)

class DatabaseService:
    """
    Service for managing PostgreSQL database connections with Databricks SDK OAuth authentication
    """
    def __init__(self):
        self.engine = None
        self.session_factory = None
        self.databricks_client = None
        self._cached_credentials = None
        self._credentials_cache_duration = 3600  # 1 hour cache
        self._credentials_timestamp = None
        self._initialize_databricks_client()
        self._initialize_connection()
    
    def _initialize_databricks_client(self):
        """
        Initialize Databricks SDK client for credential generation with OAuth client credentials support
        """
        try:
            server_hostname = os.getenv('DATABRICKS_HOST')
            access_token = os.getenv('DATABRICKS_ACCESS_TOKEN')
            client_id = os.getenv('DATABRICKS_CLIENT_ID')
            client_secret = os.getenv('DATABRICKS_CLIENT_SECRET')
            cli_profile = os.getenv('DATABRICKS_CLI_PROFILE', 'DEFAULT')
            
            logger.info(f"Initializing Databricks client for database credentials:")
            logger.info(f"  Server: {server_hostname}")
            logger.info(f"  Profile: {cli_profile}")
            logger.info(f"  Has Access Token: {bool(access_token)}")
            logger.info(f"  Has Client Credentials: {bool(client_id and client_secret)}")
            
            # Priority 1: OAuth client credentials (production)
            if client_id and client_secret:
                logger.info("Using OAuth client credentials for database credential generation")
                self.databricks_client = WorkspaceClient(
                    host=f"https://{server_hostname}",
                    client_id=client_id,
                    client_secret=client_secret
                )
                logger.info("✅ Databricks client initialized with OAuth client credentials for database credentials")
                
            # Priority 2: Access token authentication  
            elif access_token:
                logger.info("Using access token for database credential generation")
                self.databricks_client = WorkspaceClient(
                    host=f"https://{server_hostname}",
                    token=access_token
                )
                logger.info("✅ Databricks client initialized with access token for database credentials")
                
            # Priority 3: CLI profile authentication (development)
            else:
                logger.info(f"Using CLI profile '{cli_profile}' for database credential generation")
                self.databricks_client = WorkspaceClient(
                    host=f"https://{server_hostname}",
                    profile=cli_profile
                )
                logger.info(f"✅ Databricks client initialized with CLI profile '{cli_profile}' for database credentials")
            
            # Test if the database API is available
            try:
                # Just check if the API exists without making a full call
                if hasattr(self.databricks_client, 'database') and hasattr(self.databricks_client.database, 'generate_database_credential'):
                    logger.info("Database credential generation API is available")
                else:
                    logger.warning("Database credential generation API is not available on this client")
                    self.databricks_client = None
            except Exception as api_test_error:
                logger.warning(f"Database credential API test failed: {api_test_error}")
                
        except Exception as e:
            logger.error(f"Failed to initialize Databricks client for database credentials: {e}")
            logger.error(f"Error type: {type(e).__name__}")
            logger.info("Falling back to static password authentication")
            self.databricks_client = None
    
    def _extract_instance_name(self, host: str) -> str:
        """
        Extract instance name from the PostgreSQL host
        """
        # Extract instance name from host like: instance-864ee2de-0b83-4f24-bcbf-10b4f655c496.database.cloud.databricks.com
        if '.database.cloud.databricks.com' in host:
            return host.split('.database.cloud.databricks.com')[0]
        return host
    
    def _generate_database_credentials(self) -> Optional[Dict[str, str]]:
        """
        Generate temporary database credentials using Databricks SDK
        """
        try:
            if not self.databricks_client:
                logger.warning("Databricks client not available for credential generation")
                return None
            
            # Get instance name from PGHOST
            host = os.getenv('PGHOST', 'localhost')
            instance_name = self._extract_instance_name(host)
            
            logger.info(f"Generating database credentials for instance: {instance_name}")
            logger.info(f"Full host: {host}")
            
            # Generate unique request ID
            request_id = str(uuid.uuid4())
            logger.info(f"Using request ID: {request_id}")
            
            # Generate database credential using Databricks SDK
            logger.info("Calling Databricks SDK generate_database_credential...")
            credential_response = self.databricks_client.database.generate_database_credential(
                request_id=request_id,
                instance_names=[instance_name]
            )
            
            logger.info(f"Credential response received: {type(credential_response).__name__}")
            
            if credential_response:
                # Inspect the credential object to find available attributes
                available_attrs = [attr for attr in dir(credential_response) if not attr.startswith('_')]
                logger.info(f"Available attributes on credential response: {available_attrs}")
                
                # Try to get credential info using as_dict() method if available
                if hasattr(credential_response, 'as_dict'):
                    try:
                        cred_dict = credential_response.as_dict()
                        logger.info(f"Credential response as dict: {cred_dict}")
                    except Exception as dict_error:
                        logger.warning(f"Could not convert to dict: {dict_error}")
                
                # Try different possible attribute names for username and password
                username = None
                password = None
                
                # Common attribute patterns to try
                username_attrs = ['username', 'user', 'user_name', 'login']
                password_attrs = ['password', 'passwd', 'secret', 'token', 'access_token']
                
                for attr in username_attrs:
                    if hasattr(credential_response, attr):
                        username = getattr(credential_response, attr)
                        logger.info(f"Found username using attribute '{attr}': {username}")
                        break
                
                for attr in password_attrs:
                    if hasattr(credential_response, attr):
                        password = getattr(credential_response, attr)
                        logger.info(f"Found password using attribute '{attr}': {'***' if password else 'None'}")
                        break
                
                # If we couldn't find username/password, try accessing the response as a dict
                if not username or not password:
                    if hasattr(credential_response, 'as_dict'):
                        try:
                            cred_dict = credential_response.as_dict()
                            if not username:
                                for key in username_attrs:
                                    if key in cred_dict:
                                        username = cred_dict[key]
                                        logger.info(f"Found username in dict using key '{key}': {username}")
                                        break
                            
                            if not password:
                                for key in password_attrs:
                                    if key in cred_dict:
                                        password = cred_dict[key]
                                        logger.info(f"Found password in dict using key '{key}': {'***' if password else 'None'}")
                                        break
                        except Exception as dict_error:
                            logger.warning(f"Could not access credential dict: {dict_error}")
                
                # Use fallback username if none found
                if not username:
                    username = os.getenv('PGUSER', 'postgres')
                    logger.info(f"Using fallback username: {username}")
                
                if password:
                    logger.info(f"Successfully generated database credentials via Databricks SDK")
                    logger.info(f"Generated username: {username}")
                    logger.info(f"Password length: {len(password)} chars")
                    
                    return {
                        'username': username,
                        'password': password,
                        'instance_name': instance_name
                    }
                else:
                    logger.warning("Credential response received but no valid password found")
                    logger.warning(f"Tried password attributes: {password_attrs}")
            else:
                logger.warning("No credential response received from Databricks SDK")
                
            return None
                
        except Exception as e:
            logger.error(f"Error generating database credentials: {e}")
            logger.error(f"Error type: {type(e).__name__}")
            logger.error(f"Error details: {str(e)}")
            return None
    
    def _get_database_credentials(self) -> Dict[str, str]:
        """
        Get database credentials, using cached OAuth credentials or falling back to static password
        """
        import time
        
        # Check if we have valid cached credentials
        if (self._cached_credentials and 
            self._credentials_timestamp and 
            time.time() - self._credentials_timestamp < self._credentials_cache_duration):
            logger.debug("Using cached database credentials")
            return self._cached_credentials
        
        # Try to generate new OAuth credentials
        oauth_creds = self._generate_database_credentials()
        if oauth_creds:
            self._cached_credentials = oauth_creds
            self._credentials_timestamp = time.time()
            logger.info("Using OAuth-generated database credentials")
            return oauth_creds
        
        # Fallback to static password from environment
        static_creds = {
            'username': os.getenv('PGUSER', 'postgres'),
            'password': os.getenv('PGPASSWORD', ''),
            'instance_name': 'static'
        }
        
        if static_creds['password']:
            logger.info("Using static password from environment variables")
            return static_creds
        else:
            logger.warning("No database credentials available")
            logger.warning("OAuth credential generation failed and no static password configured")
            logger.info("To use OAuth credentials, ensure:")
            logger.info("  1. Databricks workspace supports database credential generation")
            logger.info("  2. User has required permissions for database access")
            logger.info("  3. Databricks CLI profile is configured correctly")
            logger.info("To use static password, set PGPASSWORD environment variable")
            return static_creds
    
    def _get_database_url(self) -> str:
        """
        Construct database URL using dynamic OAuth credentials or static configuration
        """
        # Get connection parameters from environment variables
        host = os.getenv('PGHOST', 'localhost')
        port = os.getenv('PGPORT', '5432')
        database = os.getenv('PGDATABASE', 'marketplace')
        sslmode = os.getenv('PGSSLMODE', 'require')
        
        # Get credentials (OAuth or static)
        credentials = self._get_database_credentials()
        user = credentials['username']
        password = credentials['password']
        
        # Debug logging
        logger.info(f"Database connection parameters:")
        logger.info(f"  Host: {host}")
        logger.info(f"  Port: {port}")
        logger.info(f"  Database: {database}")
        logger.info(f"  User: {user}")
        logger.info(f"  SSL Mode: {sslmode}")
        logger.info(f"  Auth Method: {'OAuth (Databricks SDK)' if credentials['instance_name'] != 'static' else 'Static Password'}")
        logger.info(f"  Password: {'***OAuth-generated***' if credentials['instance_name'] != 'static' else '***static***'} ({len(password)} chars)")
        
        # Construct asyncpg connection URL
        if password:
            database_url = f"postgresql+asyncpg://{user}:{password}@{host}:{port}/{database}"
        else:
            database_url = f"postgresql+asyncpg://{user}@{host}:{port}/{database}"
        
        # Add SSL mode if specified (asyncpg uses 'ssl' parameter, not 'sslmode')
        if sslmode:
            if sslmode == 'require':
                database_url += "?ssl=require"
            elif sslmode == 'prefer':
                database_url += "?ssl=prefer"
            elif sslmode == 'disable':
                database_url += "?ssl=disable"
            else:
                database_url += f"?ssl={sslmode}"
        
        return database_url
    
    def _initialize_connection(self):
        """
        Initialize database engine and session factory
        """
        try:
            database_url = self._get_database_url()
            self.engine = create_async_engine(
                database_url,
                echo=False,  # Set to True for SQL query logging
                pool_size=5,
                max_overflow=10,
                pool_pre_ping=True,
                pool_recycle=3600,
            )
            
            self.session_factory = async_sessionmaker(
                self.engine,
                class_=AsyncSession,
                expire_on_commit=False
            )
            
            logger.info("Database connection initialized successfully")
            
        except Exception as e:
            logger.error(f"Failed to initialize database connection: {e}")
            raise
    
    async def execute_query(self, query: str, params: Optional[Dict[str, Any]] = None) -> List[Dict[str, Any]]:
        """
        Execute a raw SQL query and return results
        """
        try:
            async with self.session_factory() as session:
                result = await session.execute(text(query), params or {})
                
                # Convert result to list of dictionaries
                columns = result.keys()
                rows = result.fetchall()
                
                return [dict(zip(columns, row)) for row in rows]
                
        except Exception as e:
            logger.error(f"Database query failed: {e}")
            logger.error(f"Query: {query}")
            raise
    
    async def test_connection(self) -> bool:
        """
        Test database connection with automatic credential refresh if needed
        """
        try:
            result = await self.execute_query("SELECT 1 as test")
            return len(result) == 1 and result[0]['test'] == 1
        except Exception as e:
            logger.error(f"Database connection test failed: {e}")
            
            # If connection failed, try refreshing OAuth credentials and reconnecting
            if self.databricks_client:
                logger.info("Attempting to refresh OAuth credentials and reconnect...")
                try:
                    await self.refresh_connection()
                    result = await self.execute_query("SELECT 1 as test")
                    return len(result) == 1 and result[0]['test'] == 1
                except Exception as retry_error:
                    logger.error(f"Connection retry with fresh credentials also failed: {retry_error}")
            
            return False
    
    async def refresh_connection(self):
        """
        Refresh database connection with new OAuth credentials
        """
        try:
            logger.info("Refreshing database connection with new OAuth credentials...")
            
            # Clear cached credentials to force regeneration
            self._cached_credentials = None
            self._credentials_timestamp = None
            
            # Close existing connection
            if self.engine:
                await self.engine.dispose()
                logger.info("Closed existing database connection")
            
            # Reinitialize with fresh credentials
            self._initialize_connection()
            logger.info("Database connection refreshed successfully")
            
        except Exception as e:
            logger.error(f"Failed to refresh database connection: {e}")
            raise
    
    def get_databricks_auth_method(self) -> str:
        """
        Get the current Databricks authentication method being used
        """
        client_id = os.getenv('DATABRICKS_CLIENT_ID')
        client_secret = os.getenv('DATABRICKS_CLIENT_SECRET')
        access_token = os.getenv('DATABRICKS_ACCESS_TOKEN')
        
        if client_id and client_secret:
            return "oauth_client_credentials"
        elif access_token:
            return "access_token"
        else:
            return "cli_profile"

    def get_credential_info(self) -> Dict[str, Any]:
        """
        Get information about current credentials (for debugging/monitoring)
        """
        import time
        
        # Basic info about Databricks client availability
        databricks_available = self.databricks_client is not None
        static_password_available = bool(os.getenv('PGPASSWORD'))
        auth_method = self.get_databricks_auth_method()
        
        if not self._cached_credentials:
            return {
                "status": "no_credentials",
                "auth_method": "none",
                "cached": False,
                "databricks_client_available": databricks_available,
                "static_password_available": static_password_available,
                "oauth_supported": databricks_available,
                "databricks_auth_method": auth_method,
                "environment": os.getenv("ENVIRONMENT", "unknown")
            }
        
        # Calculate time remaining for cached credentials
        time_remaining = 0
        if self._credentials_timestamp:
            elapsed = time.time() - self._credentials_timestamp
            time_remaining = max(0, self._credentials_cache_duration - elapsed)
        
        return {
            "status": "active",
            "auth_method": self._cached_credentials.get("auth_method", "unknown"),
            "cached": True,
            "cache_duration": self._credentials_cache_duration,
            "time_remaining": int(time_remaining),
            "username": self._cached_credentials.get("username", "unknown"),
            "instance_name": self._cached_credentials.get("instance_name", "unknown"),
            "expires_in_seconds": self._cached_credentials.get("expires_in_seconds", 0),
            "databricks_client_available": databricks_available,
            "static_password_available": static_password_available,
            "oauth_supported": databricks_available,
            "databricks_auth_method": auth_method,
            "environment": os.getenv("ENVIRONMENT", "unknown")
        }
    
    async def close(self):
        """
        Close database connections
        """
        if self.engine:
            await self.engine.dispose()
            logger.info("Database connections closed")

# Global database service instance
database_service = DatabaseService() 