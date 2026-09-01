# Testing

## Honest status

This build environment has **no network access** — `npm install` could not be run, so nothing
downstream of it (`next build`, `next lint`, `tsc --noEmit`, `vitest run`, `playwright test`,
`docker build`) could actually be *executed* here. Every file was hand-written and cross-checked
(import resolution, brace/bracket balance across all 67+ TS/TSX files, Server Action export/import
matching, Prisma field names against `schema.prisma`), and the EMI calculator's unit-test
assertions were independently verified against the real formula using a local Python calculation
before being written — but none of that substitutes for actually running the suite.

**Run these yourself, in order, before trusting the build**:

```bash
npm install
npm run typecheck
npm run lint
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm test              # vitest — EMI calculator unit tests
npm run build          # the strongest signal — exercises every route and re-typechecks under
                        # stricter production settings than `next dev`
npm run start
npm run test:e2e        # requires `npx playwright install` first, and the server running
```

If any step fails, that's real signal per the brief's own loop: fail → diagnose → fix → rerun →
document → continue. Don't treat a working `npm run dev` as sufficient — `next build` catches
classes of type errors dev mode doesn't.

## What has real test coverage

- **`src/lib/emi.ts`** (`tests/unit/emi.test.ts`) — the EMI calculation is pure, deterministic
  business logic, so it's the one thing verifiable by direct calculation without a running app.
  Covers: a known-value calculation (independently checked against the formula by hand/script),
  the EMI×tenure≈totalPayable identity, and rejection of out-of-range loan amount, interest rate,
  tenure, and non-finite input — plus boundary values at the exact configured min/max limits.

## What's written but NOT executed

`tests/e2e/website.spec.ts` and `tests/e2e/admin.spec.ts` — Playwright specs covering the brief's
own E2E test-case list (homepage load, nav, configuration cards, FAQ accordion, EMI calculator,
gallery lightbox, contact form validation and submission, brochure CTA, WhatsApp CTA, no
horizontal scroll at 375px; admin login, invalid login rejection, dashboard, lead search/filter,
lead detail, notes, status changes, CMS FAQ creation, logout, and one RBAC check that hits the API
directly rather than trusting hidden UI). These are real specs against the app's actual routes and
element roles/labels — not placeholders — but they have never been run, because running them
requires installing Playwright's browser binaries, which requires network access this sandbox
doesn't have.

## Manual verification checklist

- [ ] Homepage renders the full project page (hero → overview → highlights → amenities →
      configurations → location → gallery → EMI → FAQ → enquiry)
- [ ] Header nav anchors scroll to the right section; mobile hamburger menu opens/closes
- [ ] Sticky mobile CTA bar appears below 768px width and logs `phone_click`/`whatsapp_click`
- [ ] EMI calculator sliders update the computed EMI/interest/total live, with no server round-trip
- [ ] FAQ accordion items open/close via click and via keyboard (native `<details>`, so this should
      work with no extra ARIA wiring — verify it actually does)
- [ ] Gallery category filter + lightbox open/close, including via the close button and backdrop click
- [ ] Submitting the enquiry form creates a `Lead` (check `/admin/leads`) with UTM params populated
      if the URL had `?utm_source=...` etc.
- [ ] Submitting the same phone number twice within an hour logs a note on the existing lead, not
      a second lead
- [ ] Brochure button opens the name/phone dialog and only reveals the file link after submission
- [ ] `/admin` redirects to `/admin/login` when logged out; direct `GET /api/leads` also 401s
- [ ] Each of the five seeded roles (SUPER_ADMIN, SALES_MANAGER, SALES_AGENT, MARKETING, VIEWER)
      logs in and sees only the sidebar sections their role has permission for
- [ ] A `SALES_AGENT` or `VIEWER` session gets `403` from a `PATCH /api/leads/:id` or a
      configuration-create Server Action, even if they somehow reach the form
- [ ] Lead status buttons, agent assignment, notes, follow-ups, and site visits all persist and
      appear in the activity timeline
- [ ] Dashboard numbers change after creating/updating leads (no cached/fake numbers)
- [ ] `/sitemap.xml` lists the project URL; `/robots.txt` disallows `/admin` and `/api`
- [ ] `/api/health` returns `200`; `/api/ready` returns `503` if `DATABASE_URL` points somewhere invalid
- [ ] Mobile viewport (360px, 390px, 430px): no horizontal scroll on homepage, contact page, or
      any admin page with a wide table (leads list, configurations)

## Test report

See `docs/FINAL_QA_REPORT.md` — marked `NOT EXECUTED`/`BLOCKED` per feature rather than filled
with fabricated pass results, per the brief's own explicit instruction: "Never claim a test,
deployment, integration or feature succeeded unless it was actually executed and verified."
