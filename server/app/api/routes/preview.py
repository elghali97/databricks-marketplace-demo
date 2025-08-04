"""
Preview data API routes
"""
from fastapi import APIRouter, HTTPException, Query
from typing import Dict, Any
import logging

from app.services.databricks_service import databricks_service

logger = logging.getLogger(__name__)
router = APIRouter()

@router.get("/preview", response_model=Dict[str, Any])
async def get_table_preview(
    table_reference: str = Query(..., description="Table reference or sample URL to preview")
):
    """
    Get preview data from a Databricks table
    
    Args:
        table_reference: Table name, path, or sample URL from dataset.sampleUrl
        
    Returns:
        Dict containing table schema, preview data, and metadata
    """
    try:
        logger.info(f"Preview request for table: {table_reference}")
        
        result = await databricks_service.get_table_preview(table_reference)
        
        if 'error' in result:
            logger.warning(f"Preview failed for {table_reference}: {result['error']}")
            # Return the error result but with 200 status (not a server error)
            return result
        
        logger.info(f"Preview successful for {table_reference}: {result['row_count']} rows")
        return result
        
    except Exception as e:
        logger.error(f"Preview API error for {table_reference}: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to get table preview: {str(e)}"
        )

@router.get("/preview/test", response_model=Dict[str, Any])
async def test_databricks_connection():
    """
    Test connection to Databricks SQL warehouse
    
    Returns:
        Connection status and configuration info
    """
    try:
        is_connected = await databricks_service.test_connection()
        
        return {
            "status": "connected" if is_connected else "disconnected",
            "service": "databricks-sql-warehouse",
            "server_hostname": databricks_service.server_hostname,
            "http_path": databricks_service.http_path,
            "preview_limit": databricks_service.preview_limit,
            "using_cli_profile": not bool(databricks_service.access_token)
        }
        
    except Exception as e:
        logger.error(f"Databricks connection test failed: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Connection test failed: {str(e)}"
        ) 