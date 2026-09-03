'use client';

export default function StickyMobileCta() {
  function track(event: string) {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, device: 'mobile' }),
    }).catch(() => {});
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-ink/10 bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.06)] md:hidden">
      <a href="tel:+911800108009" onClick={() => track('phone_click')} className="flex flex-col items-center gap-0.5 py-2.5 text-xs font-medium text-deep">
        Call
      </a>
      <a href="https://wa.me/919820000000" target="_blank" rel="noopener noreferrer" onClick={() => track('whatsapp_click')} className="flex flex-col items-center gap-0.5 border-x border-ink/10 py-2.5 text-xs font-medium text-deep">
        WhatsApp
      </a>
      <a href="#enquire" className="flex flex-col items-center gap-0.5 bg-gold py-2.5 text-xs font-medium text-white">
        Enquire Now
      </a>
    </div>
  );
}
