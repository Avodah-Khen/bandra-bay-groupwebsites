import type { SessionPayload } from "./types";
export async function getCurrentAdmin(): Promise<SessionPayload | null> {
  return { id: 1, name: "Meridian Admin", email: "admin@meridianrealty.in", role: "SUPER_ADMIN" };
}
