"use client";

import { apiFetch } from "@/lib/api";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await apiFetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: fd.get("email"),
          password: fd.get("password"),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Login failed");
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
          Elements Realty
        </p>
        <h1 className="mt-2 font-display text-3xl text-slate-900">Admin CRM</h1>
        <p className="mt-2 text-sm text-slate-500">
          Sign in to manage inquiries &amp; properties
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              defaultValue="admin@elementsrealty.in"
              className="admin-input"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              defaultValue="Admin@123"
              className="admin-input"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[var(--sea)] py-2.5 text-sm font-semibold text-white hover:bg-[var(--tide)]"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <Link href="/" className="mt-6 block text-center text-sm text-slate-500 hover:text-slate-800">
          ← Back to website
        </Link>
      </div>
    </div>
  );
}
