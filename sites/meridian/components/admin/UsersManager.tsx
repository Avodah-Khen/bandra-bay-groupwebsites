"use client";

import { useState } from "react";
import {
  UserPlus,
  Shield,
  ShieldCheck,
  UserX,
  UserCheck,
} from "lucide-react";

import type { AdminUser, AdminRole } from "@/lib/types";

interface UsersManagerProps {
  users: AdminUser[];
  currentUserId: number;
}

export default function UsersManager({
  users,
  currentUserId,
}: UsersManagerProps) {
  const [items, setItems] = useState<AdminUser[]>(users);
  const [showCreate, setShowCreate] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<AdminRole>("ADMIN");

  function toggleUser(id: number) {
    setItems((current) =>
      current.map((user) =>
        user.id === id
          ? {
              ...user,
              active: !user.active,
            }
          : user
      )
    );
  }

  function createUser() {
    if (!name.trim() || !email.trim() || !password.trim()) {
      return;
    }

    const newUser: AdminUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      role,
      active: true,
      created_at: new Date().toISOString(),
    };

    setItems((current) => [newUser, ...current]);

    setName("");
    setEmail("");
    setPassword("");
    setRole("ADMIN");
    setShowCreate(false);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-ink">
            Admin Users
          </h1>

          <p className="text-sm text-ink/50 mt-1">
            Manage administrators and their access.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreate((value) => !value)}
          className="btn-primary inline-flex items-center gap-2"
        >
          <UserPlus size={16} />
          Add User
        </button>
      </div>

      {/* Create User */}
      {showCreate && (
        <div className="bg-stone-dark border border-ink/10 rounded-xl p-6">
          <h2 className="font-display text-lg text-ink mb-5">
            Create Admin User
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Full name"
              className="input-field"
            />

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email address"
              className="input-field"
            />

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Password"
              className="input-field"
            />

            <select
              value={role}
              onChange={(event) =>
                setRole(event.target.value as AdminRole)
              }
              className="input-field"
            >
              <option value="ADMIN">Admin</option>
              <option value="SUPER_ADMIN">
                Super Admin
              </option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-5">
            <button
              type="button"
              onClick={() => setShowCreate(false)}
              className="px-4 py-2 text-sm text-ink/60 hover:text-ink"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={createUser}
              className="btn-primary"
            >
              Create User
            </button>
          </div>
        </div>
      )}

      {/* Users */}
      <div className="bg-stone-dark border border-ink/10 rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wide text-ink/40 border-b border-ink/10">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {items.map((user) => (
              <tr
                key={user.id}
                className="border-b border-ink/5 last:border-0"
              >
                <td className="p-4 text-ink">
                  {user.name}
                </td>

                <td className="p-4 text-ink/60">
                  {user.email}
                </td>

                <td className="p-4">
                  <span className="inline-flex items-center gap-1 text-xs uppercase tracking-wide text-ink/60">
                    {user.role === "SUPER_ADMIN" ? (
                      <ShieldCheck size={14} />
                    ) : (
                      <Shield size={14} />
                    )}

                    {user.role.replace("_", " ")}
                  </span>
                </td>

                <td className="p-4">
                  {user.active ? (
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-600">
                      <UserCheck size={14} />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-red-500">
                      <UserX size={14} />
                      Inactive
                    </span>
                  )}
                </td>

                <td className="p-4">
                  {user.id === currentUserId ? (
                    <span className="text-xs text-ink/30">
                      Current user
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => toggleUser(user.id)}
                      className="text-xs font-semibold text-brass hover:underline"
                    >
                      {user.active
                        ? "Deactivate"
                        : "Activate"}
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {items.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="p-8 text-center text-ink/40"
                >
                  No admin users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}