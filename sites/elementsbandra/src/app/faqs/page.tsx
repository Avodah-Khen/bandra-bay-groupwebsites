export const metadata = { title: "FAQs | Elements Realty" };

const faqs = [
  {
    q: "Where are Elements Realty projects located?",
    a: "Primary focus is Bandra West / Bandra Bay (9 Elements & 7 Elements), with upcoming addresses at Union Park, Turner Road and Malabar Hill.",
  },
  {
    q: "How do I inquire about a project?",
    a: "Use Inquire Now on any page or project detail. Your details are saved to our CRM database and our team follows up.",
  },
  {
    q: "Are projects RERA registered?",
    a: "Yes for launched projects — e.g. 9 Elements (P51800080333) and 7 Elements (PR1180002501765). Always verify on MahaRERA.",
  },
  {
    q: "Can NRIs purchase?",
    a: "Yes. See our NRI Corner for documentation guidance, then submit an inquiry for a dedicated callback.",
  },
];

export default function FaqsPage() {
  return (
    <section className="section-pad mx-auto max-w-3xl pt-32">
      <h1 className="font-display text-5xl">FAQs</h1>
      <div className="mt-12 space-y-8">
        {faqs.map((f) => (
          <div key={f.q} className="border-t border-[var(--mist)] pt-6">
            <h2 className="font-display text-2xl">{f.q}</h2>
            <p className="mt-3 text-[var(--stone)]">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
