"use client";

import { useRouter } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import type { SessionPayload } from "@/lib/auth";
import { ROLE_LABELS } from "@/lib/types";

export default function AdminTopbar({ admin }: { admin: SessionPayload }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="h-16 bg-[#0a0b12] border-b border-white/10 flex items-center justify-between px-6">
      <button className="md:hidden text-white"><Menu size={22} /></button>
      <div className="hidden md:flex items-center gap-3 text-sm text-white/50">
        Welcome back, <span className="text-white font-medium">{admin.name}</span>
        <span
          className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${
            admin.role === "SUPER_ADMIN"
              ? "bg-violet-500/15 text-violet-300 border-violet-500/20"
              : "bg-cyan-500/15 text-cyan-300 border-cyan-500/20"
          }`}
        >
          {ROLE_LABELS[admin.role] || admin.role}
        </span>
      </div>
      <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-white/50 hover:text-red-400 transition-colors">
        <LogOut size={16} /> Sign out
      </button>
    </header>
  );
}
