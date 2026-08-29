import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";

export default async function AdminIndex() {
  const admin = await getCurrentAdmin();
  redirect(admin ? "/admin/dashboard" : "/admin/login");
}
