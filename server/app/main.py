from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import os
import json
from pathlib import Path
from typing import List, Optional, Dict, Any
import uvicorn
from pydantic import BaseModel
from dotenv import load_dotenv

from app.api.routes import datasets, preview
from app.services.database_service import database_service

# Load environment variables
load_dotenv()

# Configuration
API_V1_PREFIX = "/api"
CLIENT_BUILD_PATH = Path(__file__).parent.parent.parent / "client" / "dist"

app = FastAPI(
    title="Databricks Marketplace API",
    description="Backend API for the Databricks Financial Data Marketplace with PostgreSQL integration and Databricks SQL warehouse preview",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(datasets.router, prefix=f"{API_V1_PREFIX}/datasets", tags=["datasets"])
app.include_router(preview.router, prefix=f"{API_V1_PREFIX}", tags=["preview"])

@app.get("/api/health")
async def health_check():
    """
    Health check endpoint with database connectivity test and credential info
    """
    try:
        # Test database connection
        db_healthy = await database_service.test_connection()
        
        # Get credential information
        credential_info = database_service.get_credential_info()
        
        return {
            "status": "healthy",
            "service": "databricks-marketplace-api",
            "database": "connected" if db_healthy else "disconnected",
            "database_auth": {
                "method": credential_info.get("auth_method", "unknown"),
                "status": credential_info.get("status", "unknown"),
                "databricks_sdk_available": credential_info.get("databricks_client_available", False),
                "databricks_auth_method": credential_info.get("databricks_auth_method", "unknown")
            },
            "environment": os.getenv("ENVIRONMENT", "development")
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "error": str(e),
            "service": "databricks-marketplace-api",
            "database": "error",
            "environment": os.getenv("ENVIRONMENT", "development")
        }

@app.get("/api/database/credentials")
async def get_database_credentials_info():
    """
    Get detailed information about database credentials for debugging and monitoring
    """
    try:
        credential_info = database_service.get_credential_info()
        
        return {
            "status": "success",
            "credentials": credential_info,
            "database": {
                "host": os.getenv("PGHOST", "not set"),
                "port": os.getenv("PGPORT", "not set"), 
                "database": os.getenv("PGDATABASE", "not set"),
                "user": os.getenv("PGUSER", "not set"),
                "ssl_mode": os.getenv("PGSSLMODE", "not set")
            },
            "databricks": {
                "server_hostname": os.getenv("DATABRICKS_HOST", "not set"),
                "http_path": os.getenv("DATABRICKS_WAREHOUSE_ID", "not set"),
                "cli_profile": os.getenv("DATABRICKS_CLI_PROFILE", "not set"),
                "has_access_token": bool(os.getenv("DATABRICKS_ACCESS_TOKEN")),
                "has_client_credentials": bool(os.getenv("DATABRICKS_CLIENT_ID") and os.getenv("DATABRICKS_CLIENT_SECRET")),
                "auth_method": credential_info.get("databricks_auth_method", "unknown")
            },
            "environment": os.getenv("ENVIRONMENT", "development")
        }
    except Exception as e:
        return {
            "status": "error",
            "error": str(e),
            "environment": os.getenv("ENVIRONMENT", "development")
        }

@app.post("/api/database/refresh")
async def refresh_database_connection():
    """
    Manually refresh database connection with new OAuth credentials
    """
    try:
        await database_service.refresh_connection()
        
        # Test the new connection
        connection_test = await database_service.test_connection()
        credential_info = database_service.get_credential_info()
        
        return {
            "status": "success",
            "message": "Database connection refreshed",
            "connection_test": "passed" if connection_test else "failed",
            "credentials": credential_info
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to refresh connection: {str(e)}")

@app.get("/api/database/test")
async def test_database():
    """
    Dedicated database connection test endpoint
    """
    try:
        db_healthy = await database_service.test_connection()
        
        if db_healthy:
            return {
                "status": "success",
                "message": "Database connection successful",
                "database": {
                    "host": os.getenv("PGHOST", "not set"),
                    "port": os.getenv("PGPORT", "not set"),
                    "database": os.getenv("PGDATABASE", "not set"),
                    "user": os.getenv("PGUSER", "not set"),
                    "ssl_mode": os.getenv("PGSSLMODE", "not set")
                }
            }
        else:
            return {
                "status": "failed",
                "message": "Database connection failed",
                "database": {
                    "host": os.getenv("PGHOST", "not set"),
                    "port": os.getenv("PGPORT", "not set"),
                    "database": os.getenv("PGDATABASE", "not set"),
                    "user": os.getenv("PGUSER", "not set"),
                    "ssl_mode": os.getenv("PGSSLMODE", "not set")
                }
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database test failed: {str(e)}")

# Serve static files in production
if CLIENT_BUILD_PATH.exists():
    app.mount("/assets", StaticFiles(directory=CLIENT_BUILD_PATH / "assets"), name="assets")
    
    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        if full_path.startswith("api/"):
            raise HTTPException(status_code=404, detail="API endpoint not found")
        
        static_file_path = CLIENT_BUILD_PATH / full_path
        if static_file_path.is_file():
            return FileResponse(static_file_path)
        
        index_file = CLIENT_BUILD_PATH / "index.html"
        if index_file.exists():
            return FileResponse(index_file)
        else:
            raise HTTPException(status_code=404, detail="Frontend build not found")

@app.get("/")
async def root():
    """
    Root endpoint with service information
    """
    if CLIENT_BUILD_PATH.exists():
        return FileResponse(CLIENT_BUILD_PATH / "index.html")
    else:
        return {
            "message": "Databricks Marketplace API",
            "version": "1.0.0",
            "docs": "/api/docs",
            "health": "/api/health",
            "database_test": "/api/database/test",
            "note": "Frontend build not found. Run 'npm run build' in the client directory."
        }

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    ) 