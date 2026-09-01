import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { listAdminUsers } from "@/lib/data";
import UsersManager from "@/components/admin/UsersManager";

export const metadata = {
  title: "Users",
};

export default async function UsersPage() {
  const admin = await getCurrentAdmin();

  if (!admin || admin.role !== "SUPER_ADMIN") {
    redirect("/admin/dashboard");
  }

  const users = listAdminUsers();

  return (
    <UsersManager
      users={users}
      currentUserId={admin.id}
    />
  );
}