import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-[#0a0b12] flex">
      <AdminSidebar role={admin.role} />
      <div className="flex-1 min-w-0">
        <AdminTopbar admin={admin} />
        <main className="p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
