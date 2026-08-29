"use client";

import { apiFetch } from "@/lib/api";

import { FormEvent, useEffect, useState } from "react";

type Property = {
  id: string;
  slug: string;
  name: string;
  location: string;
  status: string;
  tagline: string | null;
  description: string;
  configurations: string;
  priceFrom: string | null;
  possession: string | null;
  rera: string | null;
  area: string | null;
  amenities: string;
  coverImage: string;
  gallery: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
};

const empty = {
  slug: "",
  name: "",
  location: "Bandra West, Mumbai",
  status: "Coming Soon",
  tagline: "",
  description: "",
  configurations: "3 BHK, 4 BHK",
  priceFrom: "On request",
  possession: "To be announced",
  rera: "",
  area: "Bandra West",
  amenities: "Pool, Gym, Security",
  coverImage:
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
  gallery:
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
  featured: true,
  published: true,
  sortOrder: 10,
};

export default function AdminPropertiesPage() {
  const [items, setItems] = useState<Property[]>([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  async function load() {
    const res = await apiFetch("/api/admin/properties");
    const data = await res.json();
    if (data.ok) setItems(data.properties);
  }

  useEffect(() => {
    load();
  }, []);

  function startEdit(p: Property) {
    setEditingId(p.id);
    setForm({
      slug: p.slug,
      name: p.name,
      location: p.location,
      status: p.status,
      tagline: p.tagline || "",
      description: p.description,
      configurations: safeJoin(p.configurations),
      priceFrom: p.priceFrom || "",
      possession: p.possession || "",
      rera: p.rera || "",
      area: p.area || "",
      amenities: safeJoin(p.amenities),
      coverImage: p.coverImage,
      gallery: safeJoin(p.gallery),
      featured: p.featured,
      published: p.published,
      sortOrder: p.sortOrder,
    });
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setMsg("");
    const payload = {
      ...form,
      configurations: form.configurations.split(",").map((s) => s.trim()).filter(Boolean),
      amenities: form.amenities.split(",").map((s) => s.trim()).filter(Boolean),
      gallery: form.gallery.split(",").map((s) => s.trim()).filter(Boolean),
    };
    const url = editingId
      ? `/api/admin/properties/${editingId}`
      : "/api/admin/properties";
    const res = await fetch(url, {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!data.ok) {
      setMsg("Save failed — check fields (image must be a valid URL).");
      return;
    }
    setMsg(editingId ? "Updated" : "Created");
    setEditingId(null);
    setForm(empty);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete property?")) return;
    await apiFetch(`/api/admin/properties/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="font-display text-3xl">Properties</h1>
      <p className="mt-1 text-sm text-slate-500">
        Manage Bandra / Mumbai listings shown on the public site.
      </p>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="space-y-3">
          {items.map((p) => (
            <div
              key={p.id}
              className="flex gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200"
            >
              <div
                className="h-20 w-24 shrink-0 rounded-md bg-cover bg-center"
                style={{ backgroundImage: `url(${p.coverImage})` }}
              />
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{p.name}</p>
                <p className="truncate text-xs text-slate-500">{p.location}</p>
                <p className="mt-1 text-xs">{p.status}</p>
                <div className="mt-2 flex gap-3 text-xs">
                  <button type="button" className="text-[var(--tide)]" onClick={() => startEdit(p)}>
                    Edit
                  </button>
                  <button type="button" className="text-red-600" onClick={() => remove(p.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={onSubmit} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="font-semibold">
            {editingId ? "Edit property" : "Add property"}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {(
              [
                ["name", "Name"],
                ["slug", "Slug"],
                ["location", "Location"],
                ["status", "Status"],
                ["priceFrom", "Price from"],
                ["possession", "Possession"],
                ["rera", "RERA"],
                ["area", "Area"],
              ] as const
            ).map(([key, label]) => (
              <div key={key}>
                <label className="text-xs text-slate-500">{label}</label>
                <input
                  className="admin-input mt-1"
                  value={String(form[key] ?? "")}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  required={key === "name" || key === "slug" || key === "location"}
                />
              </div>
            ))}
          </div>
          <div className="mt-3">
            <label className="text-xs text-slate-500">Tagline</label>
            <input
              className="admin-input mt-1"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            />
          </div>
          <div className="mt-3">
            <label className="text-xs text-slate-500">Description</label>
            <textarea
              className="admin-input mt-1 min-h-[90px]"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>
          <div className="mt-3">
            <label className="text-xs text-slate-500">
              Configurations (comma separated)
            </label>
            <input
              className="admin-input mt-1"
              value={form.configurations}
              onChange={(e) => setForm({ ...form, configurations: e.target.value })}
            />
          </div>
          <div className="mt-3">
            <label className="text-xs text-slate-500">Amenities (comma separated)</label>
            <input
              className="admin-input mt-1"
              value={form.amenities}
              onChange={(e) => setForm({ ...form, amenities: e.target.value })}
            />
          </div>
          <div className="mt-3">
            <label className="text-xs text-slate-500">Cover image URL</label>
            <input
              className="admin-input mt-1"
              value={form.coverImage}
              onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
              required
            />
          </div>
          <div className="mt-3">
            <label className="text-xs text-slate-500">Gallery URLs (comma separated)</label>
            <textarea
              className="admin-input mt-1 min-h-[70px]"
              value={form.gallery}
              onChange={(e) => setForm({ ...form, gallery: e.target.value })}
            />
          </div>
          <div className="mt-3 flex gap-4 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              Featured
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
              />
              Published
            </label>
          </div>
          {msg && <p className="mt-3 text-sm text-emerald-700">{msg}</p>}
          <div className="mt-4 flex gap-3">
            <button
              type="submit"
              className="rounded-md bg-[var(--sea)] px-4 py-2 text-sm text-white"
            >
              {editingId ? "Update" : "Create"}
            </button>
            {editingId && (
              <button
                type="button"
                className="text-sm text-slate-500"
                onClick={() => {
                  setEditingId(null);
                  setForm(empty);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function safeJoin(value: string) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.join(", ") : value;
  } catch {
    return value;
  }
}
