'use client';

import Link from 'next/link';
import { useState } from 'react';

const NAV = [
  { href: '#overview', label: 'Overview' },
  { href: '#amenities', label: 'Amenities' },
  { href: '#location', label: 'Location' },
  { href: '#configurations', label: 'Configurations' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-porcelain/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight text-deep">
          Skyline Bay Residences
        </Link>

        <nav className="hidden gap-6 text-sm font-medium md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="hover:text-gold">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href="tel:+911800108009" className="text-sm font-medium text-deep">
            1800 108 0009
          </a>
          <a href="#enquire" className="btn-gold text-xs">
            Enquire Now
          </a>
        </div>

        <button
          className="rounded p-2 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-ink/10 bg-white px-4 py-3 md:hidden">
          <ul className="space-y-1 text-sm font-medium">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="block py-2" onClick={() => setOpen(false)}>
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#enquire" className="btn-gold mt-2 block text-center" onClick={() => setOpen(false)}>
                Enquire Now
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
