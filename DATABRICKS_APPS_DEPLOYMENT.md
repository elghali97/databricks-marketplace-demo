# 🔥 Databricks Apps Deployment Guide

This application is optimized for seamless deployment with **Databricks Apps**. The project structure follows Databricks Apps requirements for combined Node.js/Python applications.

## Deployment Overview

Databricks Apps automatically detects and builds both frontend and backend components:

1. **Dependency Installation**: `npm install` (installs all frontend build dependencies)
2. **Python Dependencies**: `pip install -r requirements.txt` (installs backend dependencies)
3. **Frontend Build**: `npm run build` (builds React app to `/dist`)
4. **Application Start**: Runs command specified in `app.yaml`

## Project Structure for Databricks Apps

```
databricks-marketplace-demo/
├── package.json              # Node.js dependencies (all in dependencies, not devDependencies)
├── requirements.txt           # Python dependencies
├── vite.config.ts            # Frontend build configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── app.yaml                  # Databricks Apps deployment config
├── dist/                     # Built frontend (generated)
├── client/                   # React frontend source
└── server/                   # FastAPI backend source
```

## Key Configuration Files

### app.yaml
```yaml
command: 
  - "gunicorn"
  - "server.app.main:app"
  - "--bind"
  - "0.0.0.0:8000"
  - "--worker-class"
  - "uvicorn.workers.UvicornWorker"
  - "--workers"
  - "2"
env:
  - name: "ENVIRONMENT"
    value: "production"
  - name: "PGDATABASE"
    valueFrom: "lakebase-db"
  - name: "PGHOST"
    valueFrom: "lakebase-db"
  - name: "PGPORT"
    valueFrom: "lakebase-db"
  - name: "PGSSLMODE"
    valueFrom: "lakebase-db"
  - name: "PGUSER"
    valueFrom: "lakebase-db"
  - name: "PGINSTANCE_NAME"
    valueFrom: "lakebase-db"
  - name: "DATABRICKS_HOST"
    valueFrom: "databricks-workspace"
  - name: "DATABRICKS_WAREHOUSE_ID"
    valueFrom: "sql-warehouse"
  - name: "DATABRICKS_CLIENT_ID"
    valueFrom: "databricks-oauth"
  - name: "DATABRICKS_CLIENT_SECRET"
    valueFrom: "databricks-oauth"
  - name: "PREVIEW_DATA_LIMIT"
    value: "15"
  - name: "PORT"
    value: "8000"
```

### package.json (Root Level)
All dependencies are in `dependencies` (not `devDependencies`) for production builds:

```json
{
  "name": "databricks-marketplace-demo",
  "scripts": {
    "build": "vite build",
    "start": "python -m server.scripts.databricks_prod"
  },
  "dependencies": {
    "react": "^18.3.1",
    "vite": "^5.4.2",
    "@vitejs/plugin-react": "^4.3.1",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3"
  }
}
```

### requirements.txt (Root Level)
```
fastapi>=0.115.0
uvicorn[standard]>=0.32.0
python-multipart>=0.0.12
pydantic>=2.10.0
python-dotenv>=1.0.0
aiofiles>=24.1.0
psycopg2-binary>=2.9.9
asyncpg>=0.29.0
sqlalchemy[asyncio]>=2.0.23
databricks-sdk>=0.18.0
gunicorn>=21.2.0
```

## Environment Variables

Set these in your Databricks Apps deployment:

### Database Configuration
```bash
PGDATABASE=marketplace
PGHOST=instance-xyz.database.cloud.databricks.com
PGPORT=5432
PGSSLMODE=require
PGUSER=your-username
PGINSTANCE_NAME=instance-xyz  # Required for OAuth credential generation
```

### Databricks Configuration
```bash
DATABRICKS_HOST=your-workspace.cloud.databricks.com
DATABRICKS_WAREHOUSE_ID=your-warehouse-id
DATABRICKS_CLIENT_ID=your-client-id
DATABRICKS_CLIENT_SECRET=your-client-secret
```

### Application Settings
```bash
ENVIRONMENT=production
PREVIEW_DATA_LIMIT=15
PORT=8000
```

## Deployment Steps

### 1. Prepare the Repository
```bash
# Ensure all files are committed
git add .
git commit -m "Prepare for Databricks Apps deployment"
git push origin main
```

### 2. Deploy to Databricks Apps
1. Connect your Git repository to Databricks Apps
2. Configure environment variables through the Databricks UI
3. Deploy the application

### 3. Verify Deployment
- Check `/api/health` endpoint for system status
- Verify database connectivity at `/api/database/test`
- Access the marketplace interface at the root URL

## Build Process Details

### Frontend Build
```bash
# Databricks Apps runs this automatically
npm install        # Install all dependencies
npm run build     # Build React app to /dist using Vite
```

### Backend Setup
```bash
# Databricks Apps runs this automatically
pip install -r requirements.txt    # Install Python dependencies
```

### Application Start
```bash
# Command from app.yaml
gunicorn server.app.main:app \
  --bind 0.0.0.0:8000 \
  --worker-class uvicorn.workers.UvicornWorker \
  --workers 2
```

## Features Optimized for Databricks Apps

- **Static File Serving**: Built frontend served directly by FastAPI
- **Database Integration**: PostgreSQL with OAuth credential generation
- **Databricks SQL Warehouse**: Live data preview integration
- **Environment Flexibility**: Supports both development and production configs
- **Health Monitoring**: Comprehensive health checks and diagnostics

## Troubleshooting

### Build Issues
- Ensure all dependencies are in `dependencies`, not `devDependencies`
- Check that `vite.config.ts` is at the root level
- Verify `NODE_ENV=production` is set if needed

### Runtime Issues
- Check `/api/health` for system status
- Verify environment variables are set correctly
- Test database connectivity at `/api/database/test`

### Database Connection Issues
- Ensure `PGINSTANCE_NAME` is set for OAuth credential generation
- Check that Databricks client credentials are configured
- Verify SSL mode is set to 'require' for production

## Security Considerations

- OAuth client credentials for production database access
- Environment variables managed through Databricks Apps UI
- SSL/TLS encryption for all database connections
- Static password fallback for development/testing only

---

**Ready for Production Deployment with Databricks Apps! 🚀** 