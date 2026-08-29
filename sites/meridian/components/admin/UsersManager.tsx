"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, X, ShieldCheck, Trash2 } from "lucide-react";
import { ROLE_LABELS } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface AdminUserView {
  id: number;
  email: string;
  name: string;
  role: string;
  active: number;
  created_at: string;
}

export default function UsersManager({
  users,
  currentUserId,
}: {
  users: AdminUserView[];
  currentUserId: number;
}) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const data = new FormData(e.currentTarget);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      role: data.get("role"),
    };

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
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
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  }

  async function toggleActive(id: number, active: boolean) {
    await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active }),
    });
    router.refresh();
  }

  async function changeRole(id: number, role: string) {
    await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    router.refresh();
  }

  async function handleDelete(id: number) {
    if (!confirm("Remove this admin account permanently?")) return;
    await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-white flex items-center gap-2">
            <ShieldCheck size={22} className="text-violet-400" /> Admin Users
          </h1>
          <p className="text-sm text-white/40 mt-1">Manage who can access the CRM console and their permission level.</p>
        </div>
        <button onClick={() => setShowForm((v) => !v)} className="btn-brass">
          <Plus size={16} /> New Admin
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-stone-dark border border-white/10 rounded-xl p-6 mb-6 space-y-4 max-w-lg">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg text-white">New Admin Account</h2>
            <button type="button" onClick={() => setShowForm(false)} className="text-white/40 hover:text-white">
              <X size={18} />
            </button>
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div>
            <label className="label-field">Full Name</label>
            <input name="name" required className="input-field" />
          </div>
          <div>
            <label className="label-field">Email</label>
            <input name="email" type="email" required className="input-field" />
          </div>
          <div>
            <label className="label-field">Temporary Password</label>
            <input name="password" type="text" required minLength={8} className="input-field" placeholder="Min. 8 characters" />
          </div>
          <div>
            <label className="label-field">Role</label>
            <select name="role" defaultValue="ADMIN" className="input-field">
              <option value="ADMIN">Admin — manages projects, leads, content</option>
              <option value="SUPER_ADMIN">Super Admin — full access + user management</option>
            </select>
          </div>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading && <Loader2 className="animate-spin" size={16} />}
            Create Account
          </button>
        </form>
      )}

      <div className="bg-stone-dark border border-white/10 rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wide text-white/40 border-b border-white/10">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Joined</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const isSelf = u.id === currentUserId;
              return (
                <tr key={u.id} className="border-b border-white/5 last:border-0">
                  <td className="p-4 text-white font-medium">
                    {u.name} {isSelf && <span className="text-xs text-white/30">(you)</span>}
                  </td>
                  <td className="p-4 text-white/50">{u.email}</td>
                  <td className="p-4">
                    <select
                      defaultValue={u.role}
                      disabled={isSelf}
                      onChange={(e) => changeRole(u.id, e.target.value)}
                      className="bg-transparent border border-white/15 rounded-md text-xs px-2 py-1 text-white disabled:opacity-40"
                    >
                      <option value="ADMIN" className="bg-[#0a0b12]">{ROLE_LABELS.ADMIN}</option>
                      <option value="SUPER_ADMIN" className="bg-[#0a0b12]">{ROLE_LABELS.SUPER_ADMIN}</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      disabled={isSelf}
                      onClick={() => toggleActive(u.id, !u.active)}
                      className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full disabled:opacity-40 ${
                        u.active ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20" : "bg-white/5 text-white/40 border border-white/10"
                      }`}
                    >
                      {u.active ? "Active" : "Deactivated"}
                    </button>
                  </td>
                  <td className="p-4 text-white/30">{formatDate(u.created_at)}</td>
                  <td className="p-4 text-right">
                    <button disabled={isSelf} onClick={() => handleDelete(u.id)} className="text-red-400 hover:text-red-300 disabled:opacity-30">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
