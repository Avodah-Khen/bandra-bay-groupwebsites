"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") || "").trim();
    const password = String(data.get("password") || "").trim();

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Login failed.");
        setLoading(false);
        return;
      }
      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-xl p-8 space-y-4">
      <div className="flex items-center gap-2 text-white mb-2">
        <Lock size={18} className="text-cyan-400" />
        <h1 className="font-display text-xl">Sign in</h1>
      </div>

      <div>
        <label className="label-field" htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required className="input-field" placeholder="admin@meridianrealty.com" autoComplete="username" />
      </div>
      <div>
        <label className="label-field" htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required className="input-field" placeholder="••••••••" autoComplete="current-password" />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button type="submit" disabled={loading} className="btn-brass w-full">
        {loading && <Loader2 className="animate-spin" size={16} />}
        Sign In
      </button>

      <p className="text-xs text-white/30 text-center pt-2">
        Seed logins — Super Admin: admin@meridianrealty.com / Admin@12345<br />
        Admin: sales@meridianrealty.com / Sales@12345
      </p>
    </form>
  );
}
