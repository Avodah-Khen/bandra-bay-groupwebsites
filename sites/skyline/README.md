# Realty Platform — Production Build (Demo)

A single-project luxury real-estate microsite + CRM/admin platform, built from the detailed
functional specification in the original brief, informed by (but not copying content from)
adanirealty.com's Linkbay Residences project page. See `docs/reference-analysis.md` for exactly
what was and wasn't verifiable from the reference site, and why the seeded demo content uses an
original fictional project rather than the real one.

## Honest status before you do anything else

This codebase was written in a sandboxed environment **with no network access** — `npm install`,
`next build`, `npm test`, `npx playwright install`, and `docker build` could not actually be run
here. Every file was hand-written and cross-checked (import resolution, Prisma field names against
`schema.prisma`, Server Action exports against their call sites, and the EMI calculator's test
assertions were verified against the real formula with an independent calculation) — but that is
not a substitute for a real build. **Run `npm install && npm run build` yourself before trusting
anything else.** See `docs/TESTING.md` and `docs/FINAL_QA_REPORT.md` — the latter is intentionally
left as NOT EXECUTED / BLOCKED rather than filled with fabricated pass results.

## Scope decisions (read this before comparing against the original 59-section brief)

- **SQLite via Prisma**, not PostgreSQL + Redis, for the code as shipped — trivial to run locally
  with zero infrastructure. `docker-compose.yml` targets PostgreSQL for a production path; see
  `docs/DEPLOYMENT.md` for the exact migration steps.
- **Single Next.js app** (App Router, Server Actions for admin mutations, Route Handlers for the
  public/external API), not a separate NestJS backend — see `docs/ARCHITECTURE.md` for why, and
  what would need to change to split it out.
- **String-based roles + a permission map** (`src/lib/rbac.ts`), not normalized `Role`/`Permission`
  database tables — see `docs/DATABASE.md`.
- **User creation has no admin UI** — read-only list at `/admin/users`; create/edit via
  `npx prisma studio`. Documented, not hidden.
- **Notification providers (Email/WhatsApp/SMS) are stub adapters** — they log what would have
  been sent; no real provider is wired up (`src/lib/notifications.ts`).
- **No real map integration** — the location section renders a labeled placeholder; add
  `GOOGLE_MAPS_API_KEY` and wire a real map component to complete this.
- **No CAPTCHA** — rate limiting (in-memory, single-process) is the only anti-bot measure on lead
  capture and login. See `docs/SECURITY.md` for what's missing before a real public launch.

## Quickstart

```bash
npm install
cp .env.example .env      # defaults work for local dev; change AUTH_SECRET
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev                # http://localhost:3000
```

Admin/CRM: `http://localhost:3000/admin/login` — seeded accounts for all six roles are printed by
the seed script and listed in `docs/ENVIRONMENT.md`.

## Verify the build actually works (do this before anything else)

```bash
npm run typecheck
npm run lint
npm test                    # unit tests (EMI calculator)
npm run build && npm start  # production build
npm run test:e2e            # Playwright — requires `npx playwright install` first
```

## Project structure

```
prisma/                   schema.prisma, seed.ts
src/
  middleware.ts             Edge auth guard
  lib/                       db, auth, rbac, validation, actions (Server Actions),
                               emi, analytics, notifications, audit, rate-limit, projects
  components/                 Public site + admin UI components
  app/
    page.tsx, projects/[slug]/  Public microsite
    contact/                     Contact page
    api/                          REST routes (auth, leads, projects, amenities,
                                    configurations, brochure, analytics, admin/dashboard,
                                    health, ready)
    admin/
      login/                      Public login
      (protected)/                 Dashboard, leads/CRM, CMS sections, users, audit log
tests/
  unit/                      Vitest — EMI calculator
  e2e/                       Playwright — website + admin/RBAC journeys
docs/                      This documentation set
.github/workflows/ci.yml   Install → lint → typecheck → unit test → build (E2E/Docker optional)
```

## Documentation index

- `docs/reference-analysis.md` — what was/wasn't verifiable about the reference site, and the
  content-substitution decision
- `docs/ARCHITECTURE.md` — system design and request flows
- `docs/DATABASE.md` — schema reference and design decisions
- `docs/API.md` — API route reference
- `docs/CRM.md` — lead lifecycle, pipeline, roles
- `docs/SECURITY.md` — what's implemented and what's missing before real production use
- `docs/TESTING.md` — what to run yourself, and what was/wasn't executed here
- `docs/DEPLOYMENT.md` — Vercel / Docker+VPS / cloud paths, including the SQLite→Postgres migration
- `docs/ENVIRONMENT.md` — every environment variable explained
- `docs/FINAL_QA_REPORT.md` — the brief's requested QA report, honestly filled in
