"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Trash2, Loader2, Plus, X } from "lucide-react";
import type { Testimonial } from "@/lib/types";

export default function TestimonialsManager({ testimonials }: { testimonials: Testimonial[] }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function openNew() {
    setEditing(null);
    setShowForm(true);
    setError("");
  }

  function openEdit(t: Testimonial) {
    setEditing(t);
    setShowForm(true);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const data = new FormData(e.currentTarget);
    const payload = {
      name: data.get("name"),
      role: data.get("role"),
      content: data.get("content"),
      rating: Number(data.get("rating")) || 5,
      image: data.get("image") || null,
      published: data.get("published") === "on",
    };

    try {
      const res = await fetch(editing ? `/api/admin/testimonials/${editing.id}` : "/api/admin/testimonials", {
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
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-white">Testimonials</h1>
          <p className="text-sm text-white/40 mt-1">{testimonials.length} total</p>
        </div>
        <button onClick={openNew} className="btn-brass">
          <Plus size={16} /> New Testimonial
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-stone-dark border border-white/10 rounded-xl p-6 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg text-white">{editing ? "Edit Testimonial" : "New Testimonial"}</h2>
            <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="text-white/40 hover:text-white">
              <X size={18} />
            </button>
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label-field">Name</label>
              <input name="name" required defaultValue={editing?.name} className="input-field" />
            </div>
            <div>
              <label className="label-field">Role / Location</label>
              <input name="role" defaultValue={editing?.role || ""} className="input-field" placeholder="e.g. Homeowner, Worli" />
            </div>
          </div>
          <div>
            <label className="label-field">Testimonial</label>
            <textarea name="content" required rows={3} defaultValue={editing?.content} className="input-field" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label-field">Rating (1–5)</label>
              <input name="rating" type="number" min={1} max={5} defaultValue={editing?.rating ?? 5} className="input-field" />
            </div>
            <div>
              <label className="label-field">Photo URL (optional)</label>
              <input name="image" defaultValue={editing?.image || ""} className="input-field" />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-white/60">
            <input type="checkbox" name="published" defaultChecked={editing ? Boolean(editing.published) : true} /> Published
          </label>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading && <Loader2 className="animate-spin" size={16} />}
            {editing ? "Save Changes" : "Create Testimonial"}
          </button>
        </form>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-stone-dark border border-white/10 rounded-xl p-5">
            <div className="flex justify-between items-start">
              <div className="flex gap-0.5 text-cyan-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} fill={i < t.rating ? "currentColor" : "none"} />
                ))}
              </div>
              {!t.published && <span className="text-[10px] uppercase text-white/30 border border-white/15 px-1.5 py-0.5 rounded">Draft</span>}
            </div>
            <p className="text-sm text-white/60 mt-3 line-clamp-3">&ldquo;{t.content}&rdquo;</p>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
              <div>
                <div className="text-sm font-medium text-white">{t.name}</div>
                {t.role && <div className="text-xs text-white/30">{t.role}</div>}
              </div>
              <div className="flex gap-3">
                <button onClick={() => openEdit(t)} className="text-xs font-semibold text-cyan-300">Edit</button>
                <button onClick={() => handleDelete(t.id)} className="text-red-400 hover:text-red-300">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && !showForm && (
          <p className="text-white/40 text-sm col-span-full py-8 text-center">No testimonials yet.</p>
        )}
      </div>
    </div>
  );
}
