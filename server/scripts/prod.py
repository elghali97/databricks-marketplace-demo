#!/usr/bin/env python3
"""
Production server startup script
Works for both traditional deployments and Databricks Apps
"""
import uvicorn
import os
import sys
from pathlib import Path

def is_databricks_apps_environment():
    """
    Detect if running in Databricks Apps environment
    """
    # Check for Databricks Apps specific environment indicators
    databricks_indicators = [
        os.getenv("DATABRICKS_RUNTIME_VERSION"),
        os.getenv("SPARK_HOME"),
        # Check if we're in a containerized environment typical of Databricks Apps
        os.path.exists("/databricks"),
        # Check if we have OAuth client credentials (typical for Databricks Apps)
        os.getenv("DATABRICKS_CLIENT_ID") and os.getenv("DATABRICKS_CLIENT_SECRET")
    ]
    
    return any(databricks_indicators)

def setup_python_paths():
    """
    Setup Python paths for both environments
    """
    server_dir = Path(__file__).parent.parent
    root_dir = server_dir.parent
    
    # Always add server directory to path
    sys.path.insert(0, str(server_dir))
    
    if is_databricks_apps_environment():
        # For Databricks Apps, also add root directory and change to root
        sys.path.insert(0, str(root_dir))
        os.chdir(root_dir)
        return "server.app.main:app"
    else:
        # For traditional deployment, stay in server directory
        os.chdir(server_dir)
        return "app.main:app"

if __name__ == "__main__":
    # Setup environment
    is_databricks = is_databricks_apps_environment()
    app_module = setup_python_paths()
    
    # Get configuration based on environment
    if is_databricks:
        # Databricks Apps configuration
        workers = 1  # Single worker for Databricks Apps
        log_level = "info"
        access_log = True
        server_header = False
        date_header = False
        print("🔥 Starting in Databricks Apps mode")
    else:
        # Traditional deployment configuration
        workers = int(os.getenv("WORKERS", 4))
        log_level = "warning"
        access_log = False
        server_header = True
        date_header = True
        print("🚀 Starting in traditional deployment mode")
    
    print(f"📦 App module: {app_module}")
    print(f"🌍 Environment: {os.getenv('ENVIRONMENT', 'production')}")
    print(f"👥 Workers: {workers}")
    print(f"📋 Log level: {log_level}")
    
    # Production configuration
    uvicorn.run(
        app_module,
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        workers=workers,
        log_level=log_level,
        access_log=access_log,
        server_header=server_header,
        date_header=date_header
    ) 