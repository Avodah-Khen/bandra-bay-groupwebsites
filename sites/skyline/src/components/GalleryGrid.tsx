'use client';

import { useState } from 'react';
import Image from 'next/image';

export type GalleryItemData = { id: string; url: string; alt: string | null; category: string };

const CATEGORY_LABELS: Record<string, string> = {
  EXTERIOR: 'Exterior', INTERIOR: 'Interior', AMENITY: 'Amenities', FLOOR_PLAN: 'Floor Plans', LOCATION: 'Location',
};

export default function GalleryGrid({ items }: { items: GalleryItemData[] }) {
  const [filter, setFilter] = useState<string>('ALL');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const categories = ['ALL', ...Array.from(new Set(items.map((i) => i.category)))];
  const filtered = filter === 'ALL' ? items : items.filter((i) => i.category === filter);

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button key={c} onClick={() => setFilter(c)} className={`rounded-full px-3 py-1 text-xs font-medium ${filter === c ? 'bg-deep text-white' : 'bg-ink/5 text-ink/70 hover:bg-ink/10'}`}>
            {c === 'ALL' ? 'All' : CATEGORY_LABELS[c] || c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-ink/50">Gallery images will appear here once added in the admin CMS.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {filtered.map((item, i) => (
            <button key={item.id} onClick={() => setOpenIndex(i)} className="relative aspect-square overflow-hidden rounded-sm bg-ink/5" aria-label={`Open image: ${item.alt || CATEGORY_LABELS[item.category] || item.category}`}>
              <Image src={item.url} alt={item.alt || `${CATEGORY_LABELS[item.category] || item.category} photo`} fill loading="lazy" sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition hover:scale-105" />
            </button>
          ))}
        </div>
      )}

      {openIndex !== null && filtered[openIndex] && (
        <div role="dialog" aria-modal="true" aria-label="Image viewer" className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setOpenIndex(null)}>
          <button className="absolute right-4 top-4 text-2xl text-white" aria-label="Close image viewer" onClick={() => setOpenIndex(null)}>×</button>
          <div className="relative h-[70vh] w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <Image src={filtered[openIndex].url} alt={filtered[openIndex].alt || 'Gallery image'} fill sizes="100vw" className="object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
