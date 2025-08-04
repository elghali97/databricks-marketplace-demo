#!/usr/bin/env python3
"""
Production server startup script
"""
import uvicorn
import os
import sys
from pathlib import Path

# Add the server directory to Python path so we can import the app module
server_dir = Path(__file__).parent.parent
sys.path.insert(0, str(server_dir))

# Change to server directory
os.chdir(server_dir)

if __name__ == "__main__":
    # Production configuration
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        workers=int(os.getenv("WORKERS", 4)),
        log_level="warning",
        access_log=False
    ) 