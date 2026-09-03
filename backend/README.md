# Unified Real Estate CRM Backend — Deployment Ready

## What is fixed
- Render-friendly Dockerfile: container startup only runs the API.
- Prisma migrations are separate from container startup.
- No automatic database seeding on restart.
- Firebase Admin ID-token authentication is supported.
- Existing email/password JWT login remains temporarily available for frontend compatibility.
- Firebase UID is linked to the existing CRM User by email on first Firebase login.
- PostgreSQL schema includes Firebase UID support.
- Render Blueprint (`render.yaml`) included.
- Health endpoint: `/api/health`.

## Deploy
1. Put the `backend` folder into your repository.
2. Push to GitHub.
3. In Render create a PostgreSQL database.
4. Create a Docker Web Service with Root Directory `backend`.
5. Set Pre-Deploy Command:
   `./node_modules/.bin/prisma migrate deploy`
6. Add environment variables from `.env.example`.
7. Deploy.
8. Test `/api/health`.

## Firebase
Frontend obtains a Firebase ID token and sends it as:
`Authorization: Bearer <ID_TOKEN>`

The backend verifies it with Firebase Admin and maps the Firebase user to a CRM User.

Alternatively, call `POST /api/auth/firebase` with:
```json
{"idToken":"<Firebase ID token>"}
```
This links the account and also issues the existing CRM session cookie.

## Important
The Firebase service-account private key is server-only. Never place it in the frontend or commit it to Git.

The seed is intentionally not run by Docker. Run it once from a secure environment after the first migration, using your own seed credentials.
