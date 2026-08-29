export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function apiFetch(path: string, init: RequestInit = {}) {
  return fetch(`${API_BASE}${path}`, {
    ...init,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(init.headers || {}) },
  });
}

export async function getProperties() {
  const res = await fetch(`${API_BASE}/api/properties`, { cache: "no-store" });
  if (!res.ok) throw new Error("Unable to load properties");
  const data = await res.json();
  return data.properties || [];
}

export async function getProperty(slug: string) {
  const res = await fetch(`${API_BASE}/api/properties/${encodeURIComponent(slug)}`, { cache: "no-store" });
  if (!res.ok) return null;
  const data = await res.json();
  return data.property || null;
}
