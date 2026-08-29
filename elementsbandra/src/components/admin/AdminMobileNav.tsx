"use client";

import { apiFetch } from "@/lib/api";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function AdminMobileNav({
  user,
}: {
  user: { name: string; email: string };
}) {
  const router = useRouter();

  async function logout() {
    await apiFetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden">
      <div>
        <p className="font-semibold">Elements CRM</p>
        <p className="text-xs text-slate-500">{user.email}</p>
      </div>
      <div className="flex gap-3 text-sm">
        <Link href="/admin">Home</Link>
        <Link href="/admin/inquiries">Leads</Link>
        <Link href="/admin/properties">Props</Link>
        <button type="button" onClick={logout} className="text-red-600">
          Out
        </button>
      </div>
    </div>
  );
}
