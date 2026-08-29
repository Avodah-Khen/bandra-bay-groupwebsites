"use client";

import { apiFetch } from "@/lib/api";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Building2,
  LogOut,
  ExternalLink,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/inquiries", label: "Inquiries CRM", icon: MessageSquare },
  { href: "/admin/properties", label: "Properties", icon: Building2 },
];

export function AdminNav({
  user,
}: {
  user: { name: string; email: string };
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await apiFetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="hidden w-64 shrink-0 flex-col bg-[var(--ink)] text-white md:flex">
      <div className="border-b border-white/10 px-5 py-6">
        <p className="font-display text-xl">Elements CRM</p>
        <p className="mt-1 truncate text-xs text-white/50">{user.email}</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {links.map((l) => {
          const Icon = l.icon;
          const active =
            l.href === "/admin"
              ? pathname === "/admin"
              : pathname?.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm ${
                active ? "bg-white/10 text-white" : "text-white/65 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {l.label}
            </Link>
          );
        })}
      </nav>
      <div className="space-y-1 border-t border-white/10 p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-white/65 hover:bg-white/5"
        >
          <ExternalLink size={18} />
          View site
        </Link>
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-white/65 hover:bg-white/5"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
