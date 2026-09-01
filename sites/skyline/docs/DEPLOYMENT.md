# Deployment

None of the three options below have been executed against a live target from this build
environment (no network access). Commands are given precisely; validate each step yourself and
don't skip `docs/TESTING.md`'s checklist once deployed — the brief explicitly requires actually
validating a deployment, not just declaring success.

## Before any option: switch to PostgreSQL

The app ships configured for SQLite (`prisma/schema.prisma`, `provider = "sqlite"`) for
zero-setup local development. For any real deployment:

1. Edit `prisma/schema.prisma`: change `provider = "sqlite"` to `provider = "postgresql"`.
2. Set `DATABASE_URL` to a real Postgres connection string.
3. Run `npx prisma migrate dev --name init` against that database (this generates
   `prisma/migrations/`, which isn't pre-committed in this deliverable).
4. Run `npm run prisma:seed` if you want the demo data — replace `prisma/seed.ts`'s content with
   your real project's licensed data first (see `docs/reference-analysis.md`'s content-decision
   note for why the shipped seed data is intentionally fictional/placeholder).

## Option A — Vercel + managed Postgres

```bash
npm install -g vercel
vercel login
vercel link
vercel env add DATABASE_URL production
vercel env add AUTH_SECRET production
vercel env add NEXT_PUBLIC_SITE_URL production
vercel --prod
```

Use a managed Postgres provider (Vercel Postgres, Neon, Supabase, RDS) for `DATABASE_URL`. Run
`npx prisma migrate deploy` against production from CI or locally before/after the first deploy —
Vercel's build step does not run migrations automatically.

## Option B — Docker + VPS

```bash
docker compose build
docker compose up -d
docker compose exec web npx prisma migrate deploy
docker compose exec web npm run prisma:seed   # optional, replace seed data first
```

`docker-compose.yml` runs Postgres + the app with health checks on both. Put a reverse proxy
(Caddy, Nginx, Traefik) in front for TLS termination — this compose file does not include one.
See the comment at the top of `docker-compose.yml`: it targets Postgres, so the schema-provider
switch above is required before `docker compose build` will produce a working image against it.

## Option C — Other cloud platforms (AWS/GCP/Azure)

The `output: 'standalone'` Next.js build (`next.config.js`) plus the multi-stage `Dockerfile`
produce a self-contained image runnable on any container platform (ECS, Cloud Run, App Service,
Fly.io, Railway, Render). The pattern is the same as Option B: build the image, run
`prisma migrate deploy` against your managed Postgres instance (as a one-off task/job, not baked
into the image build), then start the container. Point `DATABASE_URL` at your managed Postgres
instance's connection string and set `AUTH_SECRET`/`NEXT_PUBLIC_SITE_URL` as platform secrets/env
vars — never bake them into the image.

## Post-deployment validation (do this, don't skip it)

Work through `docs/TESTING.md`'s manual checklist against the live URL. At minimum: homepage
loads over HTTPS, an enquiry form submission creates a real lead, admin login works with a
**non-default** password you've changed from the seed value, `/api/health` and `/api/ready`
both return `200`, and mobile viewport has no horizontal scroll.
