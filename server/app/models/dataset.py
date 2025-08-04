from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum

class DatasetCategory(str, Enum):
    MARKET_TRADING = "Market Trading"
    ALTERNATIVE_DATA = "Alternative Data"
    REFERENCE_DATA = "Reference Data"
    RISK_COMPLIANCE = "Risk & Compliance"
    CUSTOMER_ANALYTICS = "Customer Analytics"
    ESG_SUSTAINABILITY = "ESG & Sustainability"
    CREDIT_RISK = "Credit Risk"
    FRAUD_DETECTION = "Fraud Detection"

class DataFrequency(str, Enum):
    REAL_TIME = "Real-time"
    DAILY = "Daily"
    WEEKLY = "Weekly"
    MONTHLY = "Monthly"
    QUARTERLY = "Quarterly"
    ANNUALLY = "Annual"

class PricingModel(str, Enum):
    FREE = "Free"
    ONE_TIME = "One-time Purchase"
    SUBSCRIPTION = "Subscription"
    PAY_PER_USE = "Pay-per-use"

class AccessLevel(str, Enum):
    PUBLIC = "Public"
    PREMIUM = "Premium"
    ENTERPRISE = "Enterprise"

class Provider(BaseModel):
    name: str
    logo: Optional[str] = None
    verified: bool = False

class TimeRange(BaseModel):
    start: datetime
    end: datetime

class Dataset(BaseModel):
    id: str
    title: str
    description: str
    provider: Provider
    category: DatasetCategory
    subCategory: Optional[str] = None
    frequency: DataFrequency
    lastUpdated: datetime
    pricingModel: PricingModel
    price: float
    currency: str
    accessLevel: AccessLevel
    rating: float
    ratingsCount: int
    downloadCount: int
    tags: List[str]
    formats: List[str]
    geographicCoverage: List[str]
    timeRange: Optional[TimeRange] = None
    sampleAvailable: bool = False
    sampleUrl: Optional[str] = None
    previewImage: Optional[str] = None
    qualityScore: int = Field(ge=0, le=100)
    verified: bool = False

class DatasetListResponse(BaseModel):
    data: List[Dataset]
    total: int
    page: int = 1
    limit: int = 50

class DatasetStatsResponse(BaseModel):
    totalDatasets: int
    totalProviders: int
    categoryCounts: Dict[str, int]

class DatasetSearchParams(BaseModel):
    q: Optional[str] = None
    category: Optional[DatasetCategory] = None
    page: int = Field(default=1, ge=1)
    limit: int = Field(default=50, ge=1, le=100) 