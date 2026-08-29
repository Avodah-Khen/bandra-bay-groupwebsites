export const metadata = { title: "Buyer's Guide | Elements Realty" };

export default function BuyersGuidePage() {
  return (
    <section className="section-pad mx-auto max-w-3xl pt-32">
      <h1 className="font-display text-5xl">Buyer&apos;s Guide</h1>
      <ol className="mt-10 list-decimal space-y-6 pl-5 text-[var(--stone)]">
        <li>
          <strong className="text-[var(--ink)]">Shortlist</strong> — Explore
          Bandra Bay projects and match configuration, budget and possession.
        </li>
        <li>
          <strong className="text-[var(--ink)]">Site visit</strong> — Book via
          Inquire Now; our CRM assigns a relationship manager.
        </li>
        <li>
          <strong className="text-[var(--ink)]">Verify RERA</strong> — Confirm
          registration, escrow and timelines on MahaRERA.
        </li>
        <li>
          <strong className="text-[var(--ink)]">Finance</strong> — Align home
          loan / NRI remittance before booking.
        </li>
        <li>
          <strong className="text-[var(--ink)]">Agreement</strong> — Review
          allotment letter, payment schedule and amenities.
        </li>
      </ol>
    </section>
  );
}
