# Databricks Marketplace Backend API Reference

This document outlines the expected API structure for the Databricks Marketplace backend. The frontend is configured to make requests to these endpoints.

## Base URLs

- **Development**: `http://localhost:8000/api`
- **Production**: `/api`

## Authentication

All API requests should include appropriate authentication headers. The frontend will handle this automatically once authentication is implemented.

## Endpoints

### 1. Get All Datasets
**Endpoint**: `GET /datasets`

**Response**:
```json
{
  "data": [
    {
      "id": "1",
      "title": "US Stock Market Real-Time Data",
      "description": "Real-time stock market data for US exchanges including NYSE and NASDAQ...",
      "provider": {
        "name": "Databricks Market Intelligence",
        "logo": "https://...",
        "verified": true
      },
      "category": "MARKET_TRADING",
      "subCategory": "Equities",
      "frequency": "REAL_TIME",
      "lastUpdated": "2024-01-15T10:30:00Z",
      "pricingModel": "SUBSCRIPTION",
      "price": 2500,
      "currency": "USD",
      "accessLevel": "PREMIUM",
      "rating": 4.8,
      "ratingsCount": 156,
      "downloadCount": 15420,
      "tags": ["stocks", "real-time", "NYSE", "NASDAQ"],
      "formats": ["JSON", "CSV", "Parquet"],
      "geographicCoverage": ["United States"],
      "timeRange": {
        "start": "2020-01-01T00:00:00Z",
        "end": "2024-12-31T23:59:59Z"
      },
      "sampleAvailable": true,
      "sampleUrl": "https://example.com/sample.json",
      "previewImage": "https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg",
      "qualityScore": 95,
      "verified": true
    }
  ],
  "total": 52,
  "page": 1,
  "limit": 50
}
```

### 2. Get Dataset by ID
**Endpoint**: `GET /datasets/{id}`

**Response**:
```json
{
  "id": "1",
  "title": "US Stock Market Real-Time Data",
  // ... same structure as above
}
```

### 3. Get Datasets by Category
**Endpoint**: `GET /datasets?category={category}`

**Parameters**:
- `category`: One of the DatasetCategory enum values

**Response**: Same structure as "Get All Datasets"

### 4. Search Datasets
**Endpoint**: `GET /datasets/search?q={query}`

**Parameters**:
- `q`: Search query string

**Response**: Same structure as "Get All Datasets"

### 5. Get Dataset Statistics
**Endpoint**: `GET /datasets/stats`

**Response**:
```json
{
  "totalDatasets": 52,
  "totalProviders": 29,
  "categoryCounts": {
    "MARKET_TRADING": 16,
    "ALTERNATIVE_DATA": 8,
    "RISK_COMPLIANCE": 8,
    "ESG_SUSTAINABILITY": 4,
    "REFERENCE_DATA": 4,
    "CREDIT_RISK": 4,
    "CUSTOMER_ANALYTICS": 4,
    "FRAUD_DETECTION": 4
  }
}
```

## Data Types

### DatasetCategory Enum
```typescript
enum DatasetCategory {
  MARKET_TRADING = "Market Trading",
  ALTERNATIVE_DATA = "Alternative Data", 
  REFERENCE_DATA = "Reference Data",
  RISK_COMPLIANCE = "Risk & Compliance",
  CUSTOMER_ANALYTICS = "Customer Analytics",
  ESG_SUSTAINABILITY = "ESG & Sustainability",
  CREDIT_RISK = "Credit Risk",
  FRAUD_DETECTION = "Fraud Detection"
}
```

### DataFrequency Enum
```typescript
enum DataFrequency {
  REAL_TIME = "Real-time",
  DAILY = "Daily",
  WEEKLY = "Weekly", 
  MONTHLY = "Monthly",
  QUARTERLY = "Quarterly",
  ANNUALLY = "Annual"
}
```

### PricingModel Enum
```typescript
enum PricingModel {
  FREE = "Free",
  ONE_TIME = "One-time Purchase",
  SUBSCRIPTION = "Subscription",
  PAY_PER_USE = "Pay-per-use"
}
```

### AccessLevel Enum
```typescript
enum AccessLevel {
  PUBLIC = "Public",
  PREMIUM = "Premium",
  ENTERPRISE = "Enterprise"
}
```

## Error Responses

### 404 Not Found
```json
{
  "error": "Dataset not found",
  "code": "DATASET_NOT_FOUND",
  "message": "The requested dataset does not exist"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "code": "INTERNAL_ERROR", 
  "message": "An unexpected error occurred"
}
```

## Implementation Notes

1. **Environment Detection**: The frontend automatically detects the environment and uses the appropriate base URL.

2. **Fallback Strategy**: If the API is unavailable, the frontend will fall back to loading data from the local JSON file.

3. **Type Safety**: All API responses are converted to TypeScript interfaces on the frontend.

4. **Error Handling**: The frontend includes comprehensive error handling with user-friendly messages.

5. **Loading States**: All components that use dataset data include proper loading and error states.

## Development Setup

For local development, start your backend server on `http://localhost:8000` and ensure the `/api/datasets` endpoint is available. The frontend will automatically connect to this endpoint when running in development mode. 