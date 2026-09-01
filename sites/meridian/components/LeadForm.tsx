"use client";

import { useState, FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

type FormVariant = "enquiry" | "callback" | "schedule_visit" | "contact";

interface Props {
  variant: FormVariant;
  projectId?: number;
  projectTitle?: string;
  title?: string;
  compact?: boolean;
}

const VARIANT_COPY: Record<FormVariant, { title: string; cta: string }> = {
  enquiry: { title: "Enquire Now", cta: "Submit Enquiry" },
  callback: { title: "Request a Callback", cta: "Request Callback" },
  schedule_visit: { title: "Schedule a Site Visit", cta: "Schedule Visit" },
  contact: { title: "Send us a message", cta: "Send Message" },
};

export default function LeadForm({ variant, projectId, projectTitle, title, compact }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const copy = VARIANT_COPY[variant];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      phone: data.get("phone"),
      email: data.get("email") || undefined,
      type: variant,
      source: "website",
      project_id: projectId ?? null,
      message: data.get("message") || undefined,
      preferred_date: data.get("preferred_date") || undefined,
      preferred_time: data.get("preferred_time") || undefined,
      consent: data.get("consent") === "on",
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-brass/30 bg-brass/5 p-8 text-center">
        <CheckCircle2 className="mx-auto text-brass mb-3" size={36} />
        <h3 className="font-display text-xl text-ink mb-1">Thank you{projectTitle ? `` : ""}!</h3>
        <p className="text-sm text-ink/60">
          {"We've received your details"}{projectTitle ? ` for ${projectTitle}` : ""} and our team will reach out shortly.
        </p>
        <button className="text-sm font-semibold text-brass mt-4 underline" onClick={() => setStatus("idle")}>
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-3" : "space-y-4"}>
      {title !== "" && <h3 className="font-display text-xl text-ink mb-1">{title ?? copy.title}</h3>}

      <div>
        <label className="label-field" htmlFor={`${variant}-name`}>Full Name</label>
        <input id={`${variant}-name`} name="name" required minLength={2} className="input-field" placeholder="Your name" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label-field" htmlFor={`${variant}-phone`}>Phone</label>
          <input id={`${variant}-phone`} name="phone" required className="input-field" placeholder="+91 98xxxxxxx" />
        </div>
        <div>
          <label className="label-field" htmlFor={`${variant}-email`}>Email</label>
          <input id={`${variant}-email`} name="email" type="email" className="input-field" placeholder="you@email.com" />
        </div>
      </div>

      {variant === "callback" && (
        <div>
          <label className="label-field" htmlFor={`${variant}-time`}>Preferred time to call</label>
          <input id={`${variant}-time`} name="preferred_time" className="input-field" placeholder="e.g. Weekdays after 6 PM" />
        </div>
      )}

      {variant === "schedule_visit" && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label-field" htmlFor={`${variant}-date`}>Preferred Date</label>
            <input id={`${variant}-date`} name="preferred_date" type="date" className="input-field" />
          </div>
          <div>
            <label className="label-field" htmlFor={`${variant}-slot`}>Preferred Time</label>
            <input id={`${variant}-slot`} name="preferred_time" className="input-field" placeholder="e.g. 11:00 AM" />
          </div>
        </div>
      )}

      {(variant === "contact" || variant === "enquiry") && (
        <div>
          <label className="label-field" htmlFor={`${variant}-message`}>Message</label>
          <textarea id={`${variant}-message`} name="message" rows={3} className="input-field" placeholder={projectTitle ? `I'm interested in ${projectTitle}...` : "How can we help?"} />
        </div>
      )}

      <label className="flex items-start gap-2 text-xs text-ink/60">
        <input type="checkbox" name="consent" required className="mt-0.5" />
        I agree to be contacted regarding this enquiry and accept the privacy policy.
      </label>

      {status === "error" && <p className="text-sm text-red-400">{errorMsg}</p>}

      <button type="submit" disabled={status === "loading"} className="btn-brass w-full">
        {status === "loading" ? <Loader2 className="animate-spin" size={16} /> : null}
        {copy.cta}
      </button>
    </form>
  );
}
