export const metadata = { title: "NRI Corner | Elements Realty" };

export default function NriPage() {
  return (
    <section className="section-pad mx-auto max-w-3xl pt-32">
      <h1 className="font-display text-5xl">NRI Corner</h1>
      <p className="mt-6 text-[var(--stone)] leading-relaxed">
        Non-Resident Indians can purchase residential property in India subject
        to FEMA guidelines. Elements Realty assists with documentation,
        virtual tours for Bandra projects, and coordination with preferred
        banking partners.
      </p>
      <ul className="mt-8 list-disc space-y-3 pl-5 text-[var(--stone)]">
        <li>Passport, OCI/PIO (if applicable) and PAN</li>
        <li>NRE / NRO account for payments</li>
        <li>Power of Attorney options for local execution</li>
        <li>Dedicated CRM follow-up after you inquire online</li>
      </ul>
    </section>
  );
}
