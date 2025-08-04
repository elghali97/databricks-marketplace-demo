# 🚀 Databricks Financial Data Marketplace

A modern, full-stack financial data marketplace application built with React, TypeScript, and FastAPI, powered by PostgreSQL.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Database Setup](#database-setup)
- [Development](#development)
- [Production Deployment](#production-deployment)
- [API Documentation](#api-documentation)
- [Architecture](#architecture)
- [Contributing](#contributing)

## 🎯 Overview

The Databricks Financial Data Marketplace is a comprehensive platform for discovering, accessing, and managing financial datasets. It provides a modern marketplace interface for data providers to publish their datasets and for consumers to find and access financial data with various pricing models and access levels.

### Key Capabilities

- **Dataset Discovery**: Browse and search through comprehensive financial datasets
- **Category Filtering**: Organized by Market Trading, Alternative Data, ESG & Sustainability, Reference Data, Risk & Compliance, Credit Risk, Customer Analytics, and Fraud Detection
- **Provider Management**: Multi-provider ecosystem with verification and rating systems
- **Advanced Analytics**: Real-time analytics dashboard with performance metrics
- **Admin Console**: Comprehensive administrative interface for platform management
- **PostgreSQL Integration**: Enterprise-grade database backend with automatic fallback

## ✨ Features

### 🏪 Marketplace Features
- **Smart Search**: Intelligent dataset search with filtering
- **Category Navigation**: Organized dataset categories with real-time counts
- **Dataset Details**: Comprehensive dataset information with previews
- **Provider Profiles**: Detailed provider information and verification
- **Rating System**: User ratings and reviews for datasets
- **Access Management**: Multiple access levels (Public, Premium, Enterprise)

### 📊 Analytics & Admin
- **Real-time Dashboard**: Live metrics and performance indicators
- **User Management**: Complete user lifecycle management
- **Dataset Management**: Dataset approval, categorization, and lifecycle
- **Analytics Reporting**: Revenue, downloads, and engagement metrics
- **System Health**: Database connectivity and system status monitoring

### 🔧 Technical Features
- **Responsive Design**: Mobile-first, responsive UI design
- **PostgreSQL Integration**: Primary database with JSON fallback
- **API-First Architecture**: RESTful API with comprehensive documentation
- **Environment Management**: Development and production configurations
- **Health Monitoring**: Built-in health checks and monitoring
- **Docker Support**: Containerized deployment ready

## 🛠 Technology Stack

### Frontend
- **React 18** - Modern React with hooks and context
- **TypeScript** - Type-safe development
- **Vite** - Fast development and build tooling
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API communication
- **React Router** - Client-side routing

### Backend
- **FastAPI** - Modern Python web framework
- **Pydantic** - Data validation and serialization
- **SQLAlchemy** - Database ORM with async support
- **asyncpg** - Async PostgreSQL adapter
- **Uvicorn** - ASGI server implementation
- **python-dotenv** - Environment variable management

### Database
- **PostgreSQL** - Primary database (Databricks instance)
- **JSON Fallback** - Automatic fallback for development

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-service orchestration
- **NPM Scripts** - Development workflow automation

## 📋 Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.9+
- **PostgreSQL** access (Databricks instance or local)
- **Git** for version control

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd databricks-marketplace-demo
```

### 2. Install Dependencies
```bash
# Install all dependencies (frontend + backend)
npm run install:all
```

### 3. Database Setup
```bash
cd server
./venv/bin/python setup_database.py
```
Follow the interactive prompts to configure your PostgreSQL connection.

### 4. Start Development Server
```bash
# From project root
npm run dev
```

This starts both frontend (http://localhost:5173) and backend (http://localhost:8000).

## 🗄 Database Setup

### PostgreSQL Configuration

The application uses environment variables for database configuration:

```bash
# server/.env
PGDATABASE=marketplace
PGHOST=your-database-host
PGPORT=5432
PGSSLMODE=require
PGUSER=your-username
PGPASSWORD=your-password
```

### Interactive Setup
```bash
cd server
./venv/bin/python setup_database.py
```

### Manual Setup
1. Copy `server/env.example` to `server/.env`
2. Update database credentials
3. Test connection: `curl http://localhost:8000/api/database/test`

### Database Schema
The application expects a table at `elghali_benchekroun.dataset` with the dataset records. If unavailable, it automatically falls back to the JSON data source.

## 🔧 Development

### Development Commands
```bash
# Start both frontend and backend
npm run dev

# Start frontend only
npm run dev:frontend

# Start backend only
npm run dev:backend

# Install all dependencies
npm run install:all

# Build frontend
cd client && npm run build
```

### API Development
- **Backend**: http://localhost:8000
- **API Docs**: http://localhost:8000/api/docs
- **Health Check**: http://localhost:8000/api/health

### Frontend Development
- **Frontend**: http://localhost:5173
- **Hot Reload**: Enabled via Vite
- **TypeScript**: Strict mode enabled

### Environment Variables

#### Backend (`server/.env`)
```bash
# Database
PGDATABASE=marketplace
PGHOST=your-host
PGPORT=5432
PGSSLMODE=require
PGUSER=your-user
PGPASSWORD=your-password

# API
FASTAPI_ENV=development
CORS_ORIGINS=http://localhost:5173
```

#### Frontend
Environment-based API URLs:
- **Development**: `http://localhost:8000/api`
- **Production**: `/api`

## 🚀 Production Deployment

### Docker Deployment
```bash
# Build and run production containers
docker-compose --profile production up -d

# Or use npm script
npm run docker:prod
```

### Manual Deployment

#### 1. Backend Setup
```bash
cd server
python3 setup.py  # Create venv and install deps
source venv/bin/activate
python setup_database.py  # Configure database
```

#### 2. Frontend Build
```bash
cd client
npm run build
```

#### 3. Production Server
```bash
cd server
./venv/bin/python scripts/prod.py
```

The production server serves the built frontend from `client/build` and API from `/api`.

### Environment Configuration

#### Production Environment Variables
```bash
# server/.env (production)
FASTAPI_ENV=production
CORS_ORIGINS=https://your-domain.com
PGDATABASE=marketplace_prod
PGHOST=your-prod-db-host
PGUSER=your-prod-user
PGPASSWORD=your-prod-password
```

### Deployment Checklist
- [ ] PostgreSQL database configured and accessible
- [ ] Environment variables set in `server/.env`
- [ ] Frontend built with `npm run build`
- [ ] SSL certificates configured (for HTTPS)
- [ ] Database connection tested
- [ ] Health endpoints responding

## 📚 API Documentation

### Core Endpoints

#### Health & Monitoring
```bash
GET /api/health              # Service health status
GET /api/database/test       # Database connectivity test
```

#### Datasets
```bash
GET /api/datasets            # List all datasets
GET /api/datasets/{id}       # Get dataset by ID
GET /api/datasets/stats      # Dataset statistics
GET /api/datasets/search     # Search datasets
GET /api/datasets/refresh    # Refresh dataset cache
```

#### Query Parameters
```bash
# Category filtering
GET /api/datasets?category=Market Trading

# Search
GET /api/datasets/search?q=financial

# Pagination
GET /api/datasets?page=1&limit=20
```

### Response Format
```json
{
  "data": [...],
  "total": 52,
  "page": 1,
  "limit": 20
}
```

### Interactive API Documentation
Visit http://localhost:8000/api/docs for the complete interactive API documentation.

## 🏗 Architecture

### Application Structure
```
databricks-marketplace-demo/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── hooks/         # Custom React hooks
│   │   └── types/         # TypeScript definitions
│   └── dist/              # Built frontend
├── server/                # FastAPI backend
│   ├── app/
│   │   ├── api/          # API routes
│   │   ├── models/       # Pydantic models
│   │   └── services/     # Business logic
│   └── scripts/          # Deployment scripts
└── docker-compose.yml    # Container orchestration
```

### Data Flow
1. **Frontend** makes API requests via Axios
2. **Backend** processes requests through FastAPI
3. **Database Service** queries PostgreSQL with fallback to JSON
4. **Response** flows back through the stack with proper error handling

### Key Components

#### Frontend Services
- `DatasetService`: API communication layer
- `useDatasets`: React hooks for data fetching
- `UserContext`: User state management

#### Backend Services
- `DatabaseService`: PostgreSQL connection management
- `DatasetService`: Business logic and data processing
- Health monitoring and error handling

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make changes with proper TypeScript typing
4. Test both frontend and backend
5. Submit a pull request

### Code Standards
- **TypeScript**: Strict mode, proper typing
- **Python**: PEP 8, type hints
- **React**: Functional components, hooks
- **API**: RESTful design, proper status codes

### Testing
```bash
# Frontend testing
cd client && npm test

# Backend testing
cd server && ./venv/bin/python -m pytest

# API testing
curl http://localhost:8000/api/health
```

---

## 📞 Support

For issues and questions:
- Create an issue in the repository
- Check the API documentation at `/api/docs`
- Review the health endpoints for system status

**Built with ❤️ for the Databricks Financial Data Ecosystem** 