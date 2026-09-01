import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Phone, Mail, Calendar, Clock, MessageSquare } from "lucide-react";
import { getLeadById, getLeadActivity } from "@/lib/data";
import { LEAD_STATUS_LABELS, LEAD_STATUS_COLORS } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";
import LeadActions from "@/components/admin/LeadActions";

export const metadata = { title: "Lead Detail" };

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = getLeadById(Number(id));
  if (!lead) notFound();

  const activity = getLeadActivity(lead.id);

  return (
    <div>
      <Link href="/admin/leads" className="inline-flex items-center gap-1 text-sm text-white/50 hover:text-white mb-6">
        <ArrowLeft size={14} /> Back to leads
      </Link>

      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl text-white">{lead.name}</h1>
          <span className={`inline-block mt-2 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${LEAD_STATUS_COLORS[lead.status]}`}>
            {LEAD_STATUS_LABELS[lead.status]}
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-stone-dark border border-white/10 rounded-xl p-6 grid sm:grid-cols-2 gap-4">
            <Info icon={Phone} label="Phone" value={lead.phone} />
            <Info icon={Mail} label="Email" value={lead.email || "Not provided"} />
            <Info icon={Calendar} label="Enquiry Type" value={lead.type.replace("_", " ")} capitalize />
            <Info icon={Clock} label="Source" value={lead.source} capitalize />
            {lead.project_title && <Info icon={MessageSquare} label="Project" value={lead.project_title} />}
            {lead.preferred_date && <Info icon={Calendar} label="Preferred Date" value={lead.preferred_date} />}
            {lead.preferred_time && <Info icon={Clock} label="Preferred Time" value={lead.preferred_time} />}
          </div>

          {lead.message && (
            <div className="bg-stone-dark border border-white/10 rounded-xl p-6">
              <h2 className="font-display text-lg text-white mb-3">Message</h2>
              <p className="text-sm text-white/60 leading-relaxed whitespace-pre-line">{lead.message}</p>
            </div>
          )}

          <div className="bg-stone-dark border border-white/10 rounded-xl p-6">
            <h2 className="font-display text-lg text-white mb-4">Activity Timeline</h2>
            <div className="space-y-4">
              {activity.map((a) => (
                <div key={a.id} className="flex gap-3 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                  <div>
                    <p className="text-white/70">{a.note}</p>
                    <p className="text-xs text-white/30 mt-0.5">{formatDateTime(a.created_at)}</p>
                  </div>
                </div>
              ))}
              {activity.length === 0 && <p className="text-sm text-white/30">No activity recorded yet.</p>}
            </div>
          </div>
        </div>

        <div className="bg-stone-dark border border-white/10 rounded-xl p-6">
          <LeadActions
            leadId={lead.id}
            initialStatus={lead.status}
            initialPriority={lead.priority}
            initialNotes={lead.notes || ""}
          />
        </div>
      </div>
    </div>
  );
}

function Info({
  icon: Icon,
  label,
  value,
  capitalize,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={16} className="text-cyan-400 shrink-0 mt-0.5" />
      <div>
        <div className="text-[11px] uppercase tracking-wide text-white/30">{label}</div>
        <div className={`text-sm text-white/80 ${capitalize ? "capitalize" : ""}`}>{value}</div>
      </div>
    </div>
  );
}
