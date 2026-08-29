import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import StatsBand from "@/components/StatsBand";
import { siteConfig } from "@/lib/site-config";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = { title: "About Us" };

const MILESTONES = [
  { year: "1994", event: "Meridian Realty founded with its first residential address in Bandra." },
  { year: "2003", event: "Expanded into commercial developments across the Bandra Kurla Complex." },
  { year: "2011", event: "Launched the group's first industrial and logistics park." },
  { year: "2018", event: "Crossed 10,000 families housed across greater Mumbai." },
  { year: "2023", event: "Committed to net-zero construction practices across all new launches." },
];

const VALUES = [
  "Transparent RERA-registered transactions",
  "On-time possession across 90%+ of projects",
  "In-house quality assurance at every construction milestone",
  "Dedicated post-possession customer support",
];

export default function AboutPage() {
  return (
    <div>
      <section className="container-px pt-16 pb-12">
        <SectionHeading
          eyebrow="About Us"
          title={`${siteConfig.name} has been shaping Mumbai's skyline for three decades`}
          description={siteConfig.description}
        />
      </section>

      <StatsBand />

      <section className="container-px py-20 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display text-2xl text-ink mb-4">Our Story</h2>
          <p className="text-ink/70 leading-relaxed">
            What began as a single residential address in Bandra has grown into a diversified
            developer spanning residential, commercial and industrial real estate. Every project
            we deliver is guided by the same principle: build landmarks that hold their value
            for the families and businesses who call them home.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl text-ink mb-4">Why Buyers Trust Us</h2>
          <ul className="space-y-3">
            {VALUES.map((v) => (
              <li key={v} className="flex items-start gap-2 text-sm text-ink/70">
                <CheckCircle2 size={16} className="text-brass shrink-0 mt-0.5" /> {v}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="milestones" className="bg-stone-dark/40 border-y border-ink/10 py-20">
        <div className="container-px">
          <SectionHeading eyebrow="Our journey" title="Milestones" align="center" />
          <div className="mt-12 max-w-2xl mx-auto">
            {MILESTONES.map((m, i) => (
              <div key={m.year} className="flex gap-6 pb-8 relative">
                {i !== MILESTONES.length - 1 && (
                  <div className="absolute left-[27px] top-8 bottom-0 w-px bg-ink/10" />
                )}
                <div className="w-14 h-14 shrink-0 rounded-full bg-accent-gradient text-white flex items-center justify-center text-xs font-semibold shadow-glow">
                  {m.year}
                </div>
                <p className="text-ink/70 pt-3.5 text-sm leading-relaxed">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="csr" className="container-px py-20">
        <SectionHeading
          eyebrow="Corporate Social Responsibility"
          title="Building beyond our sites"
          description="Through our CSR initiatives, we invest in affordable housing pilots, skill-development programmes for construction workers, and neighbourhood green cover around our project sites."
        />
      </section>
    </div>
  );
}
