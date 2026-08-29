"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import type { LeadStatus } from "@/lib/types";
import { LEAD_STATUS_LABELS } from "@/lib/types";

export default function LeadActions({
  leadId,
  initialStatus,
  initialPriority,
  initialNotes,
}: {
  leadId: number;
  initialStatus: LeadStatus;
  initialPriority: string;
  initialNotes: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [priority, setPriority] = useState(initialPriority);
  const [notes, setNotes] = useState(initialNotes);
  const [savingStatus, setSavingStatus] = useState(false);
  const [savingNotes, setSavingNotes] = useState(false);

  async function updateStatus(newStatus: string) {
    setStatus(newStatus as LeadStatus);
    setSavingStatus(true);
    await fetch(`/api/admin/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    router.refresh();
    setSavingStatus(false);
  }

  async function updatePriority(newPriority: string) {
    setPriority(newPriority);
    await fetch(`/api/admin/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priority: newPriority }),
    });
    router.refresh();
  }

  async function saveNotes() {
    setSavingNotes(true);
    await fetch(`/api/admin/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes }),
    });
    router.refresh();
    setSavingNotes(false);
  }

  async function deleteLead() {
    if (!confirm("Delete this lead permanently? This cannot be undone.")) return;
    await fetch(`/api/admin/leads/${leadId}`, { method: "DELETE" });
    router.push("/admin/leads");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="label-field">Status</label>
        <select
          value={status}
          onChange={(e) => updateStatus(e.target.value)}
          disabled={savingStatus}
          className="input-field"
        >
          {Object.entries(LEAD_STATUS_LABELS).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="label-field">Priority</label>
        <div className="flex gap-2">
          {["low", "normal", "high"].map((p) => (
            <button
              key={p}
              onClick={() => updatePriority(p)}
              className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wide rounded-md border transition-colors capitalize ${
                priority === p
                  ? "bg-accent-gradient text-white border-transparent"
                  : "border-white/15 text-white/50 hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="label-field">Internal Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={5}
          className="input-field"
          placeholder="Add notes for the sales team..."
        />
        <button onClick={saveNotes} disabled={savingNotes} className="btn-outline mt-2 !py-2 !px-4 text-xs">
          {savingNotes ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
          Save Notes
        </button>
      </div>

      <button onClick={deleteLead} className="text-xs text-red-400 hover:text-red-300">
        Delete this lead permanently
      </button>
    </div>
  );
}
