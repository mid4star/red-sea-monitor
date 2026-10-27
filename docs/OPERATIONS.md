# Operations, Deployments & Environment Architecture — Red Sea Monitor

## 1. Quick Start (Development)
```bash
# 1. Install dependencies
pnpm install

# 2. Configure environment
cp .env.example .env

# 3. Generate Prisma client & seed demo data
pnpm prisma:generate
pnpm prisma:seed

# 4. Start Next.js development server
pnpm dev
# App will run at http://localhost:3000
```

## 2. Production Deployment via Docker Compose
For containerized server environments with PostgreSQL and PostGIS:
```bash
# Spin up PostGIS 16 and Next.js 15
docker compose up -d --build

# Run database migrations
docker compose exec app pnpm prisma migrate deploy

# Seed initial verified taxonomy & sample data
docker compose exec app pnpm prisma:seed
```

## 3. Automated Daily Database Backups
A cron job should dump the PostgreSQL schema and PostGIS tables daily:
```bash
#!/bin/bash
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/var/backups/red_sea_monitor"
mkdir -p "$BACKUP_DIR"

docker exec red-sea-monitor-db pg_dump -U postgres -d red_sea_monitor -F c -b -v -f "$BACKUP_DIR/backup_$TIMESTAMP.dump"

# Retain backups for 30 days
find "$BACKUP_DIR" -type f -name "*.dump" -mtime +30 -exec rm {} +
```

## 4. Environment Variables Checklist
| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string with PostGIS support |
| `NEXT_PUBLIC_APP_URL` | Base public domain URL (e.g. `https://redseamonitor.org`) |
| `AUTH_SECRET` | 32-character cryptographically secure token for sessions |
| `RESEND_API_KEY` | Transactional email delivery service |
| `STORAGE_ENDPOINT` | Cloudflare R2 / S3-compatible media bucket |
