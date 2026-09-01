# Meridian Frontend

This folder contains the public website and admin UI, components, styles, and static assets extracted from the original monolithic Next.js app.

Important: the original Meridian app is a Next.js full-stack application. Some server-rendered pages import `lib/data` directly. Therefore this is a logical frontend/backend separation of the existing source, not yet a fully independent frontend service. The backend folder contains the API, database, auth and data layer.

To make these two folders independently deployable, the page-level direct database imports must be replaced with HTTP API calls to the backend.
