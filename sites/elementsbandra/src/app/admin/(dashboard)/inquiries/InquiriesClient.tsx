"use client";

import { apiFetch } from "@/lib/api";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Inquiry = {
  id: string;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  message: string | null;
  source: string;
  status: string;
  notes: string | null;
  createdAt: string;
  property: { id: string; name: string; slug: string } | null;
};

const STATUSES = ["new", "contacted", "qualified", "won", "lost"];

export default function InquiriesClient() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState(searchParams.get("status") || "all");
  const [q, setQ] = useState("");
  const [items, setItems] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Inquiry | null>(null);

  async function load() {
    setLoading(true);
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (q) params.set("q", q);
    const res = await apiFetch(`/api/admin/inquiries?${params}`);
    const data = await res.json();
    if (data.ok) setItems(data.inquiries);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function updateInquiry(id: string, patch: Partial<Inquiry>) {
    const res = await apiFetch(`/api/admin/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    const data = await res.json();
    if (data.ok) {
      setItems((prev) => prev.map((i) => (i.id === id ? data.inquiry : i)));
      setSelected(data.inquiry);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this inquiry?")) return;
    await apiFetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== id));
    setSelected(null);
  }

  return (
    <div>
      <h1 className="font-display text-3xl">Inquiries CRM</h1>
      <p className="mt-1 text-sm text-slate-500">
        All website &quot;Inquire Now&quot; / contact submissions saved in the database.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="admin-input w-auto"
        >
          <option value="all">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, email, mobile..."
          className="admin-input max-w-xs"
        />
        <button
          type="button"
          onClick={load}
          className="rounded-md bg-[var(--sea)] px-4 py-2 text-sm text-white"
        >
          Search
        </button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <div className="overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-slate-200 lg:col-span-3">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="border-b bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Lead</th>
                <th className="px-4 py-3">Project</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-slate-400">
                    Loading...
                  </td>
                </tr>
              )}
              {!loading &&
                items.map((i) => (
                  <tr
                    key={i.id}
                    onClick={() => setSelected(i)}
                    className={`cursor-pointer border-b border-slate-100 hover:bg-slate-50 ${
                      selected?.id === i.id ? "bg-teal-50" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium">
                        {i.firstName} {i.lastName}
                      </p>
                      <p className="text-xs text-slate-500">{i.email}</p>
                    </td>
                    <td className="px-4 py-3">{i.property?.name || "—"}</td>
                    <td className="px-4 py-3 capitalize">{i.status}</td>
                    <td className="px-4 py-3 text-slate-500">
                      {new Date(i.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 lg:col-span-2">
          {selected ? (
            <div className="space-y-4">
              <h2 className="font-display text-2xl">
                {selected.firstName} {selected.lastName}
              </h2>
              <p className="text-sm text-slate-600">{selected.mobile}</p>
              <p className="text-sm text-slate-600">{selected.email}</p>
              <p className="text-sm">
                <span className="text-slate-500">Source:</span> {selected.source}
              </p>
              <p className="text-sm">
                <span className="text-slate-500">Project:</span>{" "}
                {selected.property?.name || "General"}
              </p>
              {selected.message && (
                <p className="rounded-md bg-slate-50 p-3 text-sm">{selected.message}</p>
              )}
              <div>
                <label className="text-xs font-medium text-slate-500">Status</label>
                <select
                  className="admin-input mt-1"
                  value={selected.status}
                  onChange={(e) =>
                    updateInquiry(selected.id, { status: e.target.value })
                  }
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">
                  CRM Notes
                </label>
                <textarea
                  className="admin-input mt-1 min-h-[100px]"
                  defaultValue={selected.notes || ""}
                  key={selected.id}
                  onBlur={(e) =>
                    updateInquiry(selected.id, { notes: e.target.value })
                  }
                />
              </div>
              <button
                type="button"
                onClick={() => remove(selected.id)}
                className="text-sm text-red-600"
              >
                Delete inquiry
              </button>
            </div>
          ) : (
            <p className="text-sm text-slate-400">Select a lead to view details</p>
          )}
        </div>
      </div>
    </div>
  );
}
