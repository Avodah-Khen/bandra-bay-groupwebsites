'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BrochureButton({ brochureUrl, projectId }: { brochureUrl: string | null; projectId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleUnlock() {
    setStatus('loading');
    setError(null);
    try {
      const res = await fetch('/api/brochure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, consent: true, projectId }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Could not process request.');
      }
      const data = await res.json();
      if (data.brochureUrl) {
        window.open(data.brochureUrl, '_blank', 'noopener,noreferrer');
      }
      setOpen(false);
      router.refresh();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (!brochureUrl) return null;

  return (
    <>
      <button type="button" className="btn-outline border-white/40 text-white hover:bg-white/10" onClick={() => setOpen(true)}>
        Download Brochure
      </button>

      {open && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="card w-full max-w-sm bg-white p-5 text-ink">
            <p className="mb-1 font-display text-lg font-semibold">Get the Brochure</p>
            <p className="mb-4 text-sm text-ink/60">Share a few details and we&rsquo;ll send you the full brochure.</p>
            <div className="space-y-3">
              <div>
                <label className="label" htmlFor="brochure-name">Name</label>
                <input id="brochure-name" className="input" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label className="label" htmlFor="brochure-phone">Mobile</label>
                <input id="brochure-phone" className="input" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              {status === 'error' && <p className="text-sm text-red-600">{error}</p>}
              <div className="flex gap-2">
                <button type="button" className="btn-outline flex-1" onClick={() => setOpen(false)}>Cancel</button>
                <button type="button" className="btn-gold flex-1" onClick={handleUnlock} disabled={status === 'loading' || !name || !phone}>
                  {status === 'loading' ? 'Please wait…' : 'Download'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
