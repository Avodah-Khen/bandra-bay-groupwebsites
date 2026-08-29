import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { countAdminUsers } from "@/lib/data";
import LoginForm from "@/components/admin/LoginForm";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const adminCount = countAdminUsers();

  return (
    <div className="min-h-screen bg-[#08090f] relative flex items-center justify-center px-6 overflow-hidden">
      <div className="aurora-blob bg-cyan-500 w-[26rem] h-[26rem] -top-32 -left-24 animate-aurora" />
      <div className="aurora-blob bg-violet-600 w-[26rem] h-[26rem] -bottom-32 -right-24 animate-aurora [animation-delay:-8s]" />
      <div className="absolute inset-0 grid-fade" />

      <div className="w-full max-w-sm relative">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-gradient" />
            <span className="font-display font-semibold text-2xl text-white">{siteConfig.name}</span>
          </Link>
          <p className="text-white/40 text-sm mt-1">Admin &amp; CRM Console</p>
        </div>

        {adminCount === 0 && (
          <div className="mb-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 flex gap-3">
            <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
            <div className="text-sm text-amber-200">
              <p className="font-semibold">No admin accounts found yet.</p>
              <p className="text-amber-200/70 mt-1">
                The database hasn&apos;t been seeded. Stop the server and run{" "}
                <code className="bg-black/30 px-1.5 py-0.5 rounded text-amber-100">npm run seed</code>{" "}
                from your project folder, then refresh this page and sign in below.
              </p>
            </div>
          </div>
        )}

        <LoginForm />
      </div>
    </div>
  );
}
