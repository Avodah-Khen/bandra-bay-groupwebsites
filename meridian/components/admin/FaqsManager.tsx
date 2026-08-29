"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2, Plus, X } from "lucide-react";
import type { Faq } from "@/lib/types";

export default function FaqsManager({ faqs }: { faqs: Faq[] }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Faq | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function openNew() {
    setEditing(null);
    setShowForm(true);
    setError("");
  }

  function openEdit(f: Faq) {
    setEditing(f);
    setShowForm(true);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const data = new FormData(e.currentTarget);
    const payload = {
      question: data.get("question"),
      answer: data.get("answer"),
      sort_order: Number(data.get("sort_order")) || 0,
      published: data.get("published") === "on",
    };

    try {
      const res = await fetch(editing ? `/api/admin/faqs/${editing.id}` : "/api/admin/faqs", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const json = await res.json();
        setError(json.error || "Something went wrong.");
        setLoading(false);
        return;
      }
      setShowForm(false);
      setEditing(null);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this FAQ?")) return;
    await fetch(`/api/admin/faqs/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-white">FAQs</h1>
          <p className="text-sm text-white/40 mt-1">{faqs.length} total</p>
        </div>
        <button onClick={openNew} className="btn-brass">
          <Plus size={16} /> New FAQ
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-stone-dark border border-white/10 rounded-xl p-6 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg text-white">{editing ? "Edit FAQ" : "New FAQ"}</h2>
            <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="text-white/40 hover:text-white">
              <X size={18} />
            </button>
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div>
            <label className="label-field">Question</label>
            <input name="question" required defaultValue={editing?.question} className="input-field" />
          </div>
          <div>
            <label className="label-field">Answer</label>
            <textarea name="answer" required rows={3} defaultValue={editing?.answer} className="input-field" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4 items-end">
            <div>
              <label className="label-field">Sort Order</label>
              <input name="sort_order" type="number" defaultValue={editing?.sort_order ?? 0} className="input-field" />
            </div>
            <label className="flex items-center gap-2 text-sm text-white/60 mb-2.5">
              <input type="checkbox" name="published" defaultChecked={editing ? Boolean(editing.published) : true} /> Published
            </label>
          </div>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading && <Loader2 className="animate-spin" size={16} />}
            {editing ? "Save Changes" : "Create FAQ"}
          </button>
        </form>
      )}

      <div className="bg-stone-dark border border-white/10 rounded-xl divide-y divide-white/10">
        {faqs.map((f) => (
          <div key={f.id} className="p-5 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium text-white text-sm">{f.question}</p>
                {!f.published && <span className="text-[10px] uppercase text-white/30 border border-white/15 px-1.5 py-0.5 rounded">Draft</span>}
              </div>
              <p className="text-sm text-white/50 mt-1">{f.answer}</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button onClick={() => openEdit(f)} className="text-xs font-semibold text-cyan-300">Edit</button>
              <button onClick={() => handleDelete(f.id)} className="text-red-400 hover:text-red-300">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        {faqs.length === 0 && !showForm && <p className="text-white/40 text-sm p-8 text-center">No FAQs yet.</p>}
      </div>
    </div>
  );
}
