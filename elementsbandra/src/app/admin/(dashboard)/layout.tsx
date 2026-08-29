"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { AdminNav } from "@/components/admin/AdminNav";
import { AdminMobileNav } from "@/components/admin/AdminMobileNav";

type User = { id: string; email: string; name: string; role: string };

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    apiFetch("/api/auth/me")
      .then(async res => {
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setUser(data.user);
      })
      .catch(() => router.replace("/admin/login"))
      .finally(() => setChecking(false));
  }, [router]);

  if (checking || !user) return <div className="flex min-h-screen items-center justify-center bg-slate-100 text-sm text-slate-500">Checking admin session...</div>;

  return (
    <div className="flex min-h-screen">
      <AdminNav user={user} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminMobileNav user={user} />
        <div className="flex-1 overflow-auto p-4 md:p-8">{children}</div>
      </div>
    </div>
  );
}
