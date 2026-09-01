export async function getAdmin() {
  return { id: "admin-1", email: "admin@raheja-spaces.example", role: "SUPER_ADMIN" as const };
}
