import Image from 'next/image';
export type LocationPointData = { id: string; name: string; category: string; distanceKm: number | null; travelTimeMin: number | null };

const CATEGORY_LABELS: Record<string, string> = {
  SCHOOL: 'Schools', HOSPITAL: 'Hospitals', BUSINESS: 'Business Districts', SHOPPING: 'Shopping',
  TRANSPORT: 'Transport', AIRPORT: 'Airport', METRO: 'Metro', BEACH: 'Beach',
};

export default function LocationList({ points }: { points: LocationPointData[] }) {
  if (points.length === 0) {
    return <p className="text-sm text-ink/50">Nearby landmarks will appear here once added in the admin CMS.</p>;
  }

  const grouped = points.reduce<Record<string, LocationPointData[]>>((acc, p) => {
    (acc[p.category] ||= []).push(p);
    return acc;
  }, {});

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-ink/10 bg-ink/5" role="img" aria-label="Illustrative location map"><Image src="/images/location.jpg" alt="Illustrative project location map" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover"/><div className="absolute bottom-3 left-3 rounded bg-white/90 px-3 py-2 text-xs text-ink/60">Illustrative map · verify distances independently</div></div>
      <div className="space-y-5">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <p className="eyebrow mb-2">{CATEGORY_LABELS[category] || category}</p>
            <ul className="space-y-1 text-sm">
              {items.map((p) => (
                <li key={p.id} className="flex items-center justify-between border-b border-ink/5 py-1.5">
                  <span>{p.name}</span>
                  <span className="text-ink/50">{p.travelTimeMin ? `${p.travelTimeMin} min` : p.distanceKm ? `${p.distanceKm} km` : ''}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
