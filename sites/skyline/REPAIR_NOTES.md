# Realty Platform Repair

This package repairs the incomplete route layer from the supplied ZIP.

## Added
- Public homepage `/` and project route `/projects/[slug]`
- Contact page
- Admin login and protected admin layout
- Dashboard, CRM leads list/detail, users, audit log
- CMS pages for configurations, amenities, features, gallery, locations and FAQs
- REST handlers for auth, projects, amenities, configurations, leads, brochure, analytics, health and readiness
- Sitemap and robots routes
- 12 local SVG real-estate visual assets (no external image fetch required)
- Demo brochure PDF
- Seed repair logic that replaces broken external gallery URLs with local assets

## Run locally
```powershell
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run typecheck
npm run build
npm run dev
```

Then open `http://localhost:3000` (or the port printed by Next.js).

Demo Super Admin:
- Email: `admin@realty-platform.local`
- Password: `ChangeMe123!`

Other seeded roles:
- `content-admin@realty-platform.local` / `AdminPass123!`
- `manager@realty-platform.local` / `ManagerPass123!`
- `agent@realty-platform.local` / `AgentPass123!`
- `marketing@realty-platform.local` / `MarketingPass123!`
- `viewer@realty-platform.local` / `ViewerPass123!`

## Verification performed in the build workspace
- 61 TypeScript/TSX files syntax-transpiled successfully.
- No unresolved `@/*` imports found.
- All referenced local image/PDF assets exist.
- 22 Server Actions exported; every imported Server Action name resolves.
- Seed and core validation/action files syntax-check successfully.

A full Next.js/Prisma runtime build was not executed in this workspace because the supplied archive does not contain `node_modules`/a usable lockfile and this environment cannot download packages. Run the commands above on your Windows machine for the final runtime verification.
