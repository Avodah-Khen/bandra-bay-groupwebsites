import Link from "next/link";
import { listLeads, listProjects } from "@/lib/data";
import { LEAD_STATUS_LABELS, LEAD_STATUS_COLORS } from "@/lib/types";
import { timeAgo } from "@/lib/utils";

export const metadata = { title: "Leads" };

interface SearchParams {
  status?: string;
  source?: string;
  project_id?: string;
  q?: string;
}

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const leads = listLeads({
    status: sp.status,
    source: sp.source,
    project_id: sp.project_id ? Number(sp.project_id) : undefined,
    q: sp.q,
  });
  const projects = listProjects({ publishedOnly: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-white">Leads (CRM)</h1>
          <p className="text-sm text-white/40 mt-1">{leads.length} lead{leads.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <form className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 bg-stone-dark border border-white/10 rounded-xl p-4 mb-6">
        <input type="text" name="q" defaultValue={sp.q} placeholder="Search name, phone, email" className="input-field lg:col-span-2" />
        <select name="status" defaultValue={sp.status || ""} className="input-field">
          <option value="">All Statuses</option>
          {Object.entries(LEAD_STATUS_LABELS).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
        <select name="source" defaultValue={sp.source || ""} className="input-field">
          <option value="">All Sources</option>
          {["website", "google", "meta", "whatsapp", "phone", "referral", "walk_in", "campaign", "other"].map((s) => (
            <option key={s} value={s} className="capitalize">{s}</option>
          ))}
        </select>
        <select name="project_id" defaultValue={sp.project_id || ""} className="input-field">
          <option value="">All Projects</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.title}</option>
          ))}
        </select>
        <button type="submit" className="btn-brass lg:col-span-5 sm:col-span-2">Apply Filters</button>
      </form>

      <div className="bg-stone-dark border border-white/10 rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wide text-white/40 border-b border-white/10">
              <th className="p-4">Name</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Project</th>
              <th className="p-4">Type</th>
              <th className="p-4">Source</th>
              <th className="p-4">Status</th>
              <th className="p-4">Received</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                <td className="p-4">
                  <Link href={`/admin/leads/${l.id}`} className="font-medium text-white hover:text-cyan-300">{l.name}</Link>
                </td>
                <td className="p-4 text-white/50">
                  <div>{l.phone}</div>
                  {l.email && <div className="text-xs text-white/30">{l.email}</div>}
                </td>
                <td className="p-4 text-white/50">{l.project_title || <span className="text-white/25">General enquiry</span>}</td>
                <td className="p-4 text-white/50 capitalize">{l.type.replace("_", " ")}</td>
                <td className="p-4 text-white/50 capitalize">{l.source}</td>
                <td className="p-4">
                  <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${LEAD_STATUS_COLORS[l.status]}`}>
                    {LEAD_STATUS_LABELS[l.status]}
                  </span>
                </td>
                <td className="p-4 text-white/30">{timeAgo(l.created_at)}</td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-white/40">No leads match these filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
