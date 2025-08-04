from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from app.models.dataset import Dataset, DatasetListResponse, DatasetCategory, DatasetStatsResponse
from app.services.dataset_service import dataset_service

router = APIRouter()

@router.get("", response_model=DatasetListResponse)
async def get_datasets(
    category: Optional[DatasetCategory] = Query(None, description="Filter by category"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(50, ge=1, le=100, description="Items per page")
):
    """
    Get all datasets with optional category filtering and pagination
    """
    try:
        if category:
            datasets, total = await dataset_service.get_datasets_by_category(category, page, limit)
        else:
            datasets, total = await dataset_service.get_all_datasets(page, limit)
        
        return DatasetListResponse(
            data=datasets,
            total=total,
            page=page,
            limit=limit
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching datasets: {str(e)}")

@router.get("/stats", response_model=DatasetStatsResponse)
async def get_dataset_stats():
    """
    Get dataset statistics including total counts and category distribution
    """
    try:
        stats = await dataset_service.get_dataset_stats()
        return DatasetStatsResponse(**stats)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching dataset statistics: {str(e)}")

@router.get("/search", response_model=DatasetListResponse)
async def search_datasets(
    q: str = Query(..., description="Search query"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(50, ge=1, le=100, description="Items per page")
):
    """
    Search datasets by query string
    """
    try:
        datasets, total = await dataset_service.search_datasets(q, page, limit)
        
        return DatasetListResponse(
            data=datasets,
            total=total,
            page=page,
            limit=limit
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching datasets: {str(e)}")

@router.get("/{dataset_id}", response_model=Dataset)
async def get_dataset_by_id(dataset_id: str):
    """
    Get a specific dataset by ID
    """
    dataset = await dataset_service.get_dataset_by_id(dataset_id)
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found")
    return dataset

@router.post("/refresh")
async def refresh_datasets():
    """
    Refresh datasets from database (useful for development)
    """
    try:
        await dataset_service.refresh_datasets()
        return {"message": "Datasets refreshed successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error refreshing datasets: {str(e)}") 