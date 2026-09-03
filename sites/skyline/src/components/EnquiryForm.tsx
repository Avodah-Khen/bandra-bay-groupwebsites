'use client';

import { useState, FormEvent, useEffect } from 'react';

type Config = { id: string; type: string };

type Props = {
  formType?: 'ENQUIRY' | 'CALLBACK' | 'BROCHURE' | 'EMI' | 'SITE_VISIT';
  title?: string;
  configurations?: Config[];
  compact?: boolean;
  onSuccess?: () => void;
};

function getUtmParams() {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get('utm_source') || undefined,
    medium: params.get('utm_medium') || undefined,
    campaign: params.get('utm_campaign') || undefined,
    term: params.get('utm_term') || undefined,
    content: params.get('utm_content') || undefined,
  };
}

export default function EnquiryForm({ formType = 'ENQUIRY', title, configurations = [], compact, onSuccess }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'form_started', metadata: { formType } }),
    }).catch(() => {});
  }, [formType]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const utm = getUtmParams();

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          formType,
          ...utm,
          landingPage: window.location.pathname,
          referrer: document.referrer || undefined,
          device: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Something went wrong. Please try again.');
      }

      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'form_submitted', metadata: { formType } }),
      }).catch(() => {});

      setStatus('success');
      form.reset();
      onSuccess?.();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'success') {
    return (
      <div className="card p-4 text-sm text-deep" role="status">
        Thank you — our sales team will get back to you shortly.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? 'space-y-3' : 'card space-y-3 p-5'}>
      {title && <p className="font-display text-lg font-semibold">{title}</p>}

      <div>
        <label className="label" htmlFor={`name-${formType}`}>Name</label>
        <input id={`name-${formType}`} name="name" required className="input" disabled={status === 'loading'} />
      </div>
      <div>
        <label className="label" htmlFor={`phone-${formType}`}>Mobile</label>
        <input id={`phone-${formType}`} name="phone" required className="input" disabled={status === 'loading'} />
      </div>
      <div>
        <label className="label" htmlFor={`email-${formType}`}>Email</label>
        <input id={`email-${formType}`} name="email" type="email" className="input" disabled={status === 'loading'} />
      </div>

      {configurations.length > 0 && (
        <div>
          <label className="label" htmlFor={`configurationId-${formType}`}>Configuration</label>
          <select id={`configurationId-${formType}`} name="configurationId" className="input" disabled={status === 'loading'}>
            <option value="">No preference</option>
            {configurations.map((c) => (
              <option key={c.id} value={c.id}>{c.type}</option>
            ))}
          </select>
        </div>
      )}

      {!compact && (
        <>
          <div>
            <label className="label" htmlFor={`budget-${formType}`}>Budget (optional)</label>
            <input id={`budget-${formType}`} name="budget" className="input" disabled={status === 'loading'} />
          </div>
          <div>
            <label className="label" htmlFor={`message-${formType}`}>Message (optional)</label>
            <textarea id={`message-${formType}`} name="message" rows={3} className="input" disabled={status === 'loading'} />
          </div>
          <div>
            <label className="label" htmlFor={`preferredContactTime-${formType}`}>Preferred contact time (optional)</label>
            <input id={`preferredContactTime-${formType}`} name="preferredContactTime" placeholder="e.g. Weekday evenings" className="input" disabled={status === 'loading'} />
          </div>
        </>
      )}

      <label className="flex items-start gap-2 text-xs text-ink/60">
        <input type="checkbox" name="consent" required className="mt-0.5" disabled={status === 'loading'} />
        <span>
          I agree to be contacted by phone, email, or WhatsApp regarding this enquiry, per the
          site&rsquo;s privacy terms.
        </span>
      </label>

      {status === 'error' && <p className="text-sm text-red-600" role="alert">{error}</p>}

      <button type="submit" className="btn-gold w-full" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending…' : formType === 'CALLBACK' ? 'Request Callback' : formType === 'BROCHURE' ? 'Download Brochure' : 'Submit Enquiry'}
      </button>
    </form>
  );
}
