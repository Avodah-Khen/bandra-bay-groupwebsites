# Unified CRM Backend — Render + Firebase Ready

This backend is designed as ONE shared API for all five websites.
Docker is used by Render to build/run the service. You do NOT need to start Docker manually after deployment.

## Render Web Service
- Root Directory: `backend`
- Runtime: Docker
- Health Check Path: `/api/health`
- Pre-Deploy Command: `./node_modules/.bin/prisma migrate deploy`
- Start Command: leave empty / use Dockerfile CMD

The Docker container only runs `npm start`. Database migrations run once during the Render deploy, not every container restart. The seed script is NEVER run automatically.

## Required Render environment variables
```text
NODE_ENV=production
DATABASE_URL=<Render PostgreSQL internal URL>
JWT_SECRET=<32+ character random secret; only for legacy cookie compatibility>
SESSION_TTL=8h
CORS_ORIGINS=https://site1.com,https://site2.com,https://site3.com
FIREBASE_PROJECT_ID=<Firebase project id>
FIREBASE_CLIENT_EMAIL=<Firebase service account client email>
FIREBASE_PRIVATE_KEY=<Firebase service account private key with \n escaped as needed>
```

Optional:
```text
GOOGLE_SERVICE_ACCOUNT_JSON=<single-line service account JSON>
```

## First deployment
1. Create Render PostgreSQL.
2. Create Render Web Service from this repository.
3. Set Root Directory to `backend`.
4. Select Docker runtime.
5. Add the environment variables above.
6. Set Pre-Deploy Command to `./node_modules/.bin/prisma migrate deploy`.
7. Deploy.
8. Open `https://YOUR-SERVICE.onrender.com/api/health`.
9. Expected result: `{"ok":true,"service":"unified-real-estate-crm","database":"up"}`.

## Seed database ONCE
After the first successful migration, run the seed once from a secure environment connected to the production DATABASE_URL:
```bash
npm run db:seed
```
Never put `db:seed` in Docker CMD.

## Firebase authentication
The backend supports Firebase ID tokens through:
```http
Authorization: Bearer <Firebase ID token>
```
It also exposes `POST /api/auth/firebase` for exchanging a Firebase ID token for the existing CRM session cookie.

A Firebase user must correspond to a provisioned CRM `User` record. On first Firebase login, the backend links the Firebase UID to the existing user email.

## Frontend
Set on every Vercel frontend:
```text
NEXT_PUBLIC_API_URL=https://YOUR-SERVICE.onrender.com
```
For Firebase-authenticated API calls, send:
```http
Authorization: Bearer <Firebase ID token>
x-site-key: <site key>
```

## Production notes
- Do not commit `.env` files or Firebase private keys.
- Do not use the old default seed passwords.
- PostgreSQL is the source of truth; Google Sheets is optional export/sync.
- One Render backend serves all sites.
