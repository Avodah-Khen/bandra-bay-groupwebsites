"use client";

import { apiFetch } from "@/lib/api";

import { FormEvent, useState } from "react";

type Props = {
  source?: string;
  propertyId?: string;
  propertySlug?: string;
  compact?: boolean;
  className?: string;
};

export function InquiryForm({
  source = "contact",
  propertyId,
  propertySlug,
  compact,
  className = "",
}: Props) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

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

  if (done) {
    return (
      <div className={`rounded-md bg-[var(--mist)] p-6 text-[var(--sea)] ${className}`}>
        <p className="font-display text-2xl">Thank you</p>
        <p className="mt-2 text-sm">
          Your details are saved in our database. We will get back to you soon.
        </p>
        <button
          type="button"
          className="mt-4 text-sm text-[var(--brass)] underline"
          onClick={() => setDone(false)}
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`space-y-5 ${className}`}>
      <div className="grid gap-5 sm:grid-cols-2">
        <input name="firstName" required placeholder="First Name *" className="input-field" />
        <input name="lastName" required placeholder="Last Name *" className="input-field" />
      </div>
      <input name="mobile" required placeholder="Mobile Number *" className="input-field" />
      <input
        name="email"
        type="email"
        required
        placeholder="Email Address *"
        className="input-field"
      />
      {!compact && (
        <textarea
          name="message"
          rows={4}
          placeholder="Write your message here..."
          className="input-field resize-none"
        />
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
