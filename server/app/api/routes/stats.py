from fastapi import APIRouter, HTTPException
from app.models.dataset import DatasetStatsResponse
from app.services.dataset_service import dataset_service

router = APIRouter()

@router.get("/stats", response_model=DatasetStatsResponse)
async def get_dataset_stats():
    """
    Get dataset statistics including total counts and category distribution
    """
    try:
        stats = dataset_service.get_dataset_stats()
        return DatasetStatsResponse(**stats)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching dataset statistics: {str(e)}") 