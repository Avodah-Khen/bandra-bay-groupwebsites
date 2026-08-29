"use client";

import { apiFetch } from "@/lib/api";

import { FormEvent, useState } from "react";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  propertyId?: string;
  propertySlug?: string;
  propertyName?: string;
  source?: string;
};

export function InquireModal({
  open,
  onClose,
  propertyId,
  propertySlug,
  propertyName,
  source = "inquire-now",
}: Props) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await apiFetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: fd.get("firstName"),
          lastName: fd.get("lastName"),
          mobile: fd.get("mobile"),
          email: fd.get("email"),
          message: fd.get("message") || undefined,
          source,
          propertyId,
          propertySlug,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed");
      setDone(true);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-lg bg-[var(--foam)] p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-[var(--stone)] hover:text-[var(--ink)]"
        >
          <X size={20} />
        </button>
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--tide)]">
          Get in Touch
        </p>
        <h2 className="mt-2 font-display text-3xl text-[var(--ink)]">
          Inquire Now
        </h2>
        {propertyName && (
          <p className="mt-2 text-sm text-[var(--stone)]">
            Project: <span className="text-[var(--ink)]">{propertyName}</span>
          </p>
        )}

        {done ? (
          <div className="mt-8 rounded-md bg-[var(--mist)] p-5 text-sm text-[var(--sea)]">
            Thank you. Your inquiry has been saved to our CRM. Our team will
            contact you shortly.
            <button
              type="button"
              className="mt-4 block text-[var(--brass)] underline"
              onClick={() => setDone(false)}
            >
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <input
                name="firstName"
                required
                placeholder="First Name *"
                className="input-field"
              />
              <input
                name="lastName"
                required
                placeholder="Last Name *"
                className="input-field"
              />
            </div>
            <input
              name="mobile"
              required
              placeholder="Mobile Number *"
              className="input-field"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email Address *"
              className="input-field"
            />
            <textarea
              name="message"
              rows={3}
              placeholder="Write your message here..."
              className="input-field resize-none"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
