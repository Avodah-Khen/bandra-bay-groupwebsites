import { redirect } from "next/navigation";
import { ScrollText } from "lucide-react";
import { getCurrentAdmin } from "@/lib/auth";
import { listAuditLog } from "@/lib/data";
import { formatDateTime } from "@/lib/utils";

export const metadata = { title: "Audit Log" };

export default async function AuditLogPage() {
  const admin = await getCurrentAdmin();
  if (!admin || admin.role !== "SUPER_ADMIN") redirect("/admin/dashboard");

  const entries = listAuditLog(200);

  return (
    <div>
      <h1 className="font-display text-2xl text-white flex items-center gap-2 mb-1">
        <ScrollText size={22} className="text-violet-400" /> Audit Log
      </h1>
      <p className="text-sm text-white/40 mb-6">A record of administrative actions across the CRM console.</p>

      <div className="bg-stone-dark border border-white/10 rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wide text-white/40 border-b border-white/10">
              <th className="p-4">Actor</th>
              <th className="p-4">Role</th>
              <th className="p-4">Action</th>
              <th className="p-4">Entity</th>
              <th className="p-4">When</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id} className="border-b border-white/5 last:border-0">
                <td className="p-4 text-white">{e.actor_name}</td>
                <td className="p-4 text-white/40 text-xs uppercase">{e.actor_role.replace("_", " ")}</td>
                <td className="p-4 text-white/60 capitalize">{e.action}</td>
                <td className="p-4 text-white/60">
                  <span className="capitalize">{e.entity}</span>
                  {e.entity_label && <span className="text-white/30"> — {e.entity_label}</span>}
                </td>
                <td className="p-4 text-white/30">{formatDateTime(e.created_at)}</td>
              </tr>
            ))}
            {entries.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-white/40">No actions recorded yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
