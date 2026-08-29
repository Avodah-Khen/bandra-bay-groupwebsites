"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users2,
  MessageSquareQuote,
  HelpCircle,
  ShieldCheck,
  ScrollText,
  ExternalLink,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: Building2 },
  { href: "/admin/leads", label: "Leads (CRM)", icon: Users2 },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
];

const SUPER_ADMIN_NAV = [
  { href: "/admin/users", label: "Admin Users", icon: ShieldCheck },
  { href: "/admin/audit-log", label: "Audit Log", icon: ScrollText },
];

export default function AdminSidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const isSuperAdmin = role === "SUPER_ADMIN";

  return (
    <aside className="w-64 shrink-0 bg-[#08090f] text-white/80 hidden md:flex flex-col border-r border-white/10">
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-gradient" />
          <span className="font-display font-semibold text-lg text-white">{siteConfig.name}</span>
        </Link>
        <div className="text-[11px] uppercase tracking-widest3 text-white/30 mt-1.5">Admin Console</div>
      </div>
      <nav className="flex-1 py-4">
        {NAV.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                active ? "bg-white/5 text-cyan-300 border-r-2 border-cyan-400" : "text-white/50 hover:bg-white/[0.03] hover:text-white"
              }`}
            >
              <item.icon size={17} />
              {item.label}
            </Link>
          );
        })}

        {isSuperAdmin && (
          <>
            <div className="px-6 pt-5 pb-2 text-[10px] uppercase tracking-widest3 text-white/25">Super Admin</div>
            {SUPER_ADMIN_NAV.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                    active ? "bg-white/5 text-violet-300 border-r-2 border-violet-400" : "text-white/50 hover:bg-white/[0.03] hover:text-white"
                  }`}
                >
                  <item.icon size={17} />
                  {item.label}
                </Link>
              );
            })}
          </>
        )}
      </nav>
      <div className="p-6 border-t border-white/10">
        <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-white/40 hover:text-cyan-300 transition-colors">
          <ExternalLink size={14} /> View public site
        </a>
      </div>
    </aside>
  );
}
