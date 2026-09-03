export type ConfigurationData = {
  id: string; type: string; carpetAreaSqft: number; price: number | null; startingPrice: number | null;
  floorPlanUrl: string | null; availability: string;
};

function formatPrice(config: ConfigurationData) {
  if (config.price) return `₹${(config.price / 10000000).toFixed(2)} Cr`;
  if (config.startingPrice) return `Starting ₹${(config.startingPrice / 10000000).toFixed(2)} Cr`;
  return 'Price on request';
}

export default function ConfigurationCards({ configurations }: { configurations: ConfigurationData[] }) {
  if (configurations.length === 0) {
    return <p className="text-sm text-ink/50">Configurations will appear here once added in the admin CMS.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {configurations.map((c) => (
        <div key={c.id} className="card flex flex-col p-5">
          <p className="font-display text-xl font-semibold">{c.type}</p>
          <p className="mt-1 text-sm text-ink/60">{c.carpetAreaSqft.toLocaleString('en-IN')} sq. ft. carpet area</p>
          <p className="mt-3 text-sm font-semibold text-deep">{formatPrice(c)}</p>
          <span className={`mt-2 w-fit rounded-full px-2 py-0.5 text-xs ${c.availability === 'SOLD_OUT' ? 'bg-ink/10 text-ink/50' : c.availability === 'LIMITED' ? 'bg-gold/10 text-gold' : 'bg-deep/10 text-deep'}`}>
            {c.availability.replace('_', ' ')}
          </span>
          <div className="mt-4 flex gap-2">
            {c.floorPlanUrl && (
              <a href={c.floorPlanUrl} className="btn-outline flex-1 text-xs" target="_blank" rel="noopener noreferrer">Download Plan</a>
            )}
            <a href="#enquire" className="btn-gold flex-1 text-xs">Enquire</a>
          </div>
        </div>
      ))}
    </div>
  );
}
