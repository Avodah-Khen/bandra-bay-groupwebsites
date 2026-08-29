import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site-config";
import { Briefcase } from "lucide-react";

export const metadata: Metadata = { title: "Careers" };

const OPENINGS = [
  { title: "Sales Manager — Residential", location: "Mumbai", type: "Full-time" },
  { title: "Site Engineer", location: "Thane", type: "Full-time" },
  { title: "CRM Executive", location: "Mumbai", type: "Full-time" },
  { title: "Digital Marketing Associate", location: "Mumbai", type: "Full-time" },
];

export default function CareersPage() {
  return (
    <div className="container-px py-16">
      <SectionHeading eyebrow="Join us" title="Careers at Meridian Realty" description="We're always looking for people who care about craft, transparency and long-term relationships with the families we serve." />

      <div className="mt-12 max-w-3xl divide-y divide-ink/10 border-y border-ink/10">
        {OPENINGS.map((o) => (
          <div key={o.title} className="py-5 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Briefcase size={18} className="text-brass mt-1" />
              <div>
                <div className="font-medium text-ink">{o.title}</div>
                <div className="text-sm text-ink/50">{o.location} &middot; {o.type}</div>
              </div>
            </div>
            <a href={`mailto:${siteConfig.email}?subject=Application: ${encodeURIComponent(o.title)}`} className="text-sm font-semibold text-brass shrink-0">
              Apply
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
