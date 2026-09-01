# CRM

## Lead lifecycle

Every CTA on the public site — hero enquire, callback request, configuration enquiry, EMI
calculator "get breakdown," brochure gate, contact form — funnels through the single
`POST /api/leads` endpoint (or, for the brochure flow specifically, `POST /api/brochure`, which
also creates/updates a lead). Every submission creates a `Lead` with `status = "NEW"` and an
initial `LeadActivity` entry.

Pipeline stages, per the brief's spec:

```
NEW → CONTACTED → QUALIFIED → SITE_VISIT_SCHEDULED → SITE_VISIT_COMPLETED
    → NEGOTIATION → BOOKING_PENDING → WON
                                    ↘ LOST (from any state)
```

The lead-detail page (`/admin/leads/[id]`) renders one button per stage — clicking any of them
calls `updateLeadStatusAction`, which re-checks the `lead:update` permission, updates the lead,
appends a `STATUS_CHANGED` activity entry, and writes an audit log row. There's no enforced linear
order — a real sales process sometimes skips stages or moves backward, and the CRM doesn't fight
that.

## UTM / campaign attribution

`EnquiryForm.tsx` reads `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` from
the current URL's query string client-side, plus `window.location.pathname` (landing page),
`document.referrer`, and a simple mobile/desktop device guess — all sent alongside the form
submission and stored directly on the `Lead` row. This means campaign attribution works for any
ad platform that appends standard UTM params to the landing URL, without a separate
tag-manager integration.

## Duplicate detection

`POST /api/leads` and `POST /api/brochure` both check for an existing lead with the same `phone`
created within the last hour. If found, a `NOTE_ADDED` activity entry is appended to the existing
lead instead of creating a new one — this catches the common case of someone re-submitting a form
(double-click, page reload) without fragmenting one person's interest into multiple lead records.
It's intentionally narrow: the same person enquiring again a week later, or through a different
phone number, creates a new lead — that's a distinct signal a sales agent should see.

## Sales agent system and assignment

Six roles (`SUPER_ADMIN, ADMIN, SALES_MANAGER, SALES_AGENT, MARKETING, VIEWER`) are implemented as
a string field on `User` plus the permission map in `src/lib/rbac.ts` — see `docs/SECURITY.md` for
why this is a simplification of a full relational Role/Permission model and what upgrading it
would look like. Leads assign to a `User` (not a separate public-facing `Agent` model, since this
brief's spec ties leads directly to internal CRM users) via `assignedToId`. The lead-detail page's
assignment dropdown is filtered to `SALES_AGENT` and `SALES_MANAGER` users.

## Notes, follow-ups, site visits, activity timeline

- **`LeadNote`** — free-text notes an agent adds; every note also writes a `NOTE_ADDED`
  `LeadActivity` entry, so notes and the timeline stay in sync without a separate merge step.
- **`FollowUp`** — a due date + optional note; marking one complete doesn't change the lead's
  status automatically (an agent might complete a follow-up call and still need another one).
- **`SiteVisit`** — scheduling one automatically moves the lead to `SITE_VISIT_SCHEDULED`; marking
  a visit `COMPLETED` moves the lead to `SITE_VISIT_COMPLETED`. `CANCELLED`/`NO_SHOW` don't change
  lead status automatically — that's left to the agent's judgment via the status buttons.
- **`LeadActivity`** — the single append-only timeline every one of the above writes to, plus
  `LEAD_CREATED` (on submission) and `AGENT_ASSIGNED` (on assignment change). This is what
  `/admin/leads/[id]` renders as "Activity timeline."

## Dashboard

`/admin` computes every widget directly from the database at request time (`prisma.lead.count`,
`groupBy`, etc.) — none of it is hardcoded or mocked, per the brief's "do not use fake dashboard
numbers" instruction. It includes: total/new/today's/qualified leads, site visits, pending
follow-ups (due date ≤ now, not completed), won/lost counts and conversion rate, a 14-day
leads-per-day bar chart, a full pipeline funnel across all 8 non-terminal-plus-won stages, leads by
source, and leads by configuration.

## What the brief asked for that isn't built

- **Lead export** (CSV/Excel download) — not implemented. The data is fully queryable via
  `GET /api/leads`; wiring that to a CSV response is a small, contained addition.
- **CAPTCHA / anti-bot on the public lead form** — not implemented; only rate-limiting (see
  `docs/SECURITY.md`). Adding an actual CAPTCHA provider (hCaptcha/Turnstile) requires a real API
  key this environment can't provision or test against.
- **User creation/editing UI** — `/admin/users` is read-only; see that page's own in-app note.
- **Deletion/retention workflow for lead data** (brief section 49, "Data Privacy") — the schema
  supports hard-deleting a `Lead` via cascade (deletes its notes/activities/follow-ups/site-visits
  with it), but there's no admin UI button for "delete this lead's data" or a retention-policy
  scheduler. This is a meaningful gap if you're handling real personal data under a privacy
  regulation — treat it as a pre-launch requirement, not a nice-to-have.
