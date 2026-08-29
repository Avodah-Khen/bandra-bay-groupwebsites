# Elements Bandra — Frontend

Next.js 14 + React + TypeScript + Tailwind CSS. This folder contains only the website UI and browser-side API calls.

Backend URL is configured with `NEXT_PUBLIC_API_URL` (default `http://localhost:4000`).

Run:
1. `npm install`
2. Copy `.env.example` to `.env.local`
3. `npm run dev`
4. Open http://localhost:3000

The frontend does NOT connect directly to PostgreSQL. It calls the backend REST API.
