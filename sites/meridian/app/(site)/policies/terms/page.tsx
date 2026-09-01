import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Terms of Use" };

export default function TermsPage() {
  return (
    <div className="container-px py-16 max-w-2xl">
      <h1 className="font-display text-3xl text-ink mb-6">Terms of Use</h1>
      <div className="prose prose-sm text-ink/70 space-y-4 leading-relaxed">
        <p>All project information on this website is indicative and subject to change. Pricing, availability and possession dates should be confirmed directly with our sales team before making any decision.</p>
        <p>RERA registration numbers, where displayed, should be independently verified on the official Maharashtra RERA portal.</p>
        <p className="text-xs text-ink/40">This is placeholder terms text for demonstration. Replace with counsel-reviewed content before production use. — {siteConfig.name}</p>
      </div>
    </div>
  );
}
