import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { listFaqs } from "@/lib/data";

export const metadata: Metadata = { title: "FAQ" };
export const dynamic = "force-dynamic";

export default function FaqPage() {
  const faqs = listFaqs();
  return (
    <div className="container-px py-16">
      <SectionHeading eyebrow="Help center" title="Frequently Asked Questions" align="center" />
      <div className="mt-12 max-w-3xl mx-auto divide-y divide-ink/10 border-y border-ink/10">
        {faqs.map((f) => (
          <details key={f.id} className="group py-5">
            <summary className="flex items-center justify-between cursor-pointer list-none font-medium text-ink">
              {f.question}
              <span className="text-brass text-xl group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="text-sm text-ink/60 mt-3 leading-relaxed">{f.answer}</p>
          </details>
        ))}
        {faqs.length === 0 && <p className="text-ink/50 py-10 text-center">No FAQs published yet.</p>}
      </div>
    </div>
  );
}
