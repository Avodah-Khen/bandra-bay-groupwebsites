import Link from "next/link";
import { Users2, PhoneCall, CalendarCheck2, TrendingUp, Building2, ArrowRight } from "lucide-react";
import { getDashboardStats, listLeads } from "@/lib/data";
import MiniBarChart from "@/components/admin/MiniBarChart";
import { LEAD_STATUS_LABELS, LEAD_STATUS_COLORS } from "@/lib/types";
import { timeAgo } from "@/lib/utils";

export const metadata = { title: "Dashboard" };

export default function AdminDashboardPage() {
  const stats = getDashboardStats();
  const recentLeads = listLeads().slice(0, 6);

  const cards = [
    { label: "Total Leads", value: stats.totalLeads, icon: Users2 },
    { label: "New This Period", value: stats.newLeads, icon: PhoneCall },
    { label: "Site Visits Scheduled", value: stats.siteVisits, icon: CalendarCheck2 },
    { label: "Conversion Rate", value: `${stats.conversionRate}%`, icon: TrendingUp },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl text-ink">Dashboard</h1>
        <p className="text-sm text-ink/50 mt-1">Live overview of leads, projects and enquiries.</p>
      </div>

      {/* Stat cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-stone-dark border border-ink/10 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div className="text-[11px] uppercase tracking-wide text-ink/40">{c.label}</div>
              <c.icon size={16} className="text-brass" />
            </div>
            <div className="font-display text-3xl text-ink mt-2">{c.value}</div>
          </div>
        ))}
      </div>

      {/* Funnel */}
      <div className="bg-stone-dark border border-ink/10 rounded-xl p-6">
        <h2 className="font-display text-lg text-ink mb-4">Lead Status Funnel</h2>
        <div className="grid sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
          {([
            ["new", stats.newLeads],
            ["contacted", stats.contactedLeads],
            ["qualified", stats.qualifiedLeads],
            ["site_visit", stats.siteVisits],
            ["negotiation", stats.negotiations],
            ["converted", stats.converted],
            ["lost", stats.lost],
          ] as const).map(([key, value]) => (
            <div key={key} className="border border-ink/10 py-4">
              <div className="font-display text-2xl text-ink">{value}</div>
              <span className={`inline-block mt-2 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 ${LEAD_STATUS_COLORS[key]}`}>
                {LEAD_STATUS_LABELS[key]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-stone-dark border border-ink/10 rounded-xl p-6">
          <h2 className="font-display text-lg text-ink mb-4">Leads by Source</h2>
          <MiniBarChart data={stats.bySource} labelKey="source" valueKey="c" />
        </div>
        <div className="bg-stone-dark border border-ink/10 rounded-xl p-6">
          <h2 className="font-display text-lg text-ink mb-4">Top Projects by Leads</h2>
          {stats.byProject.length === 0 ? (
            <p className="text-sm text-ink/40">No project-linked leads yet.</p>
          ) : (
            <MiniBarChart data={stats.byProject} labelKey="project" valueKey="c" />
          )}
        </div>
      </div>

      {/* Recent leads */}
      <div className="bg-stone-dark border border-ink/10 rounded-xl">
        <div className="flex items-center justify-between p-6 pb-0">
          <h2 className="font-display text-lg text-ink">Recent Leads</h2>
          <Link href="/admin/leads" className="text-sm font-semibold text-brass inline-flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wide text-ink/40 border-b border-ink/10">
                <th className="pb-2 pr-4">Name</th>
                <th className="pb-2 pr-4">Project</th>
                <th className="pb-2 pr-4">Type</th>
                <th className="pb-2 pr-4">Status</th>
                <th className="pb-2">Received</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((l) => (
                <tr key={l.id} className="border-b border-ink/5 last:border-0">
                  <td className="py-3 pr-4">
                    <Link href={`/admin/leads/${l.id}`} className="font-medium text-ink hover:text-brass">{l.name}</Link>
                    <div className="text-xs text-ink/40">{l.phone}</div>
                  </td>
                  <td className="py-3 pr-4 text-ink/60">
                    {l.project_title || <span className="text-ink/30">General enquiry</span>}
                  </td>
                  <td className="py-3 pr-4 text-ink/60 capitalize">{l.type.replace("_", " ")}</td>
                  <td className="py-3 pr-4">
                    <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 ${LEAD_STATUS_COLORS[l.status]}`}>
                      {LEAD_STATUS_LABELS[l.status]}
                    </span>
                  </td>
                  <td className="py-3 text-ink/40">{timeAgo(l.created_at)}</td>
                </tr>
              ))}
              {recentLeads.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-ink/40">
                    No leads yet — submissions from your public site will show up here automatically.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-ink/40">
        <Building2 size={16} />
        {stats.publishedProjects} of {stats.totalProjects} projects published
      </div>
    </div>
  );
}
