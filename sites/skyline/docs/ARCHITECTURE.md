# Architecture

## Overview

One Next.js 14 (App Router) application covering the public microsite, the REST-ish API, and the
admin/CRM — rather than the brief's suggested separate NestJS backend. See "Why one app" below.

```
                    ┌─────────────────────────────────┐
                    │            Next.js app            │
  Browser  ───────▶ │  App Router (RSC + route handlers) │ ──▶ Prisma ──▶ SQLite (dev)
                    │  ├─ public microsite (SSR)          │              PostgreSQL (prod)
                    │  ├─ /api/* (REST)                    │
                    │  ├─ /admin (Server Actions)           │
                    │  └─ middleware.ts (edge auth)          │
                    └─────────────────────────────────┘
```

## Why one app instead of Next.js + NestJS

The brief's target shape (separate frontend/backend/CRM, ready to split into independent services)
is right for a team maintaining this at real scale. For a single build pass that needs to produce
*working, checkable* code rather than a bigger surface of unverified files, collapsing the backend
into the same Next.js process removes an entire class of cross-service concerns (a second deploy
target, a second auth boundary, API-contract drift) without changing the shape of the domain logic.
The permission map (`src/lib/rbac.ts`), validation schemas (`src/lib/validation.ts`), and Prisma
models are all written as standalone modules specifically so they could move into a separate NestJS
service later with minimal rewriting — the REST routes under `src/app/api/**` already mirror what
that service's controllers would look like.

## Request flow examples

**Public project page** (`/` or `/projects/[slug]`): a server component (`getFirstPublishedProject`
/ `getProjectBySlug` in `src/lib/projects.ts`) queries Prisma directly with all relations
(configurations, amenities, features, gallery, locations, FAQs) in one call, and
`components/ProjectPage.tsx` renders the full microsite from that single object — no client-side
fetch waterfall for the initial page.

**Lead capture** (any CTA — hero enquire, configuration enquire, callback, EMI, contact form):
`components/EnquiryForm.tsx` (client component) collects UTM params from the URL, the current
pathname, `document.referrer`, and a simple mobile/desktop device guess, then `fetch`s
`POST /api/leads`. That route validates with `enquirySchema`, checks for a same-phone duplicate
within the last hour, creates the `Lead` + first `LeadActivity`, and logs an analytics event —
never blocking the user-facing response on the analytics write.

**Brochure download**: `components/BrochureButton.tsx` opens a small dialog, collects name+phone,
and posts to `POST /api/brochure`, which creates/updates a lead, logs a `brochure_download`
analytics event, and returns the actual file URL only after that — so the CTA both captures a lead
and tracks the download, per the brief's brochure-system requirement.

**Admin: change a lead's status**: `/admin/leads/[id]/page.tsx` renders one `<form>` per pipeline
stage, each bound to the `updateLeadStatusAction(leadId, status)` Server Action — no client JS
required. The action re-checks the `lead:update` permission server-side, updates the lead, appends
a `STATUS_CHANGED` activity entry, and writes an `AuditLog` row.

## Auth flow

1. `POST /api/auth/login` verifies email/password (bcrypt), signs a JWT (`jose`, HS256:
   `{ userId, email, role, name }`), sets it as an httpOnly cookie, and records a `LOGIN` audit entry.
2. `src/middleware.ts` runs at the edge on every `/admin/*` and protected `/api/*` request, verifying
   the JWT signature before the request reaches any page or route handler.
3. Page/action code calls `getSession()` to read the caller's role, then `can(role, permission)`
   (`src/lib/rbac.ts`) to authorize the specific action — every mutation re-checks this itself; the
   admin sidebar hiding a link is a UX nicety, not the actual enforcement.

## CMS content model

Every content section (configurations, amenities, features, gallery, locations, FAQs) belongs to a
`Project` and follows the same pattern: a Prisma model with `displayOrder`/`active` fields, a public
read (embedded in the project query, no separate fetch), and an admin Server Action pair
(`create*Action` / `delete*Action`, with `toggle*ActiveAction` for configurations) that revalidates
both the admin list and the public homepage path. Adding a new CMS section means following this same
four-piece pattern (schema model → validation schema → Server Actions → admin page), not inventing
a new one.

## Directory layout

See the tree in the root `README.md` — it's kept there rather than duplicated to avoid drift.
