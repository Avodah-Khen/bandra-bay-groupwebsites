import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <div className="container-px py-16">
      <SectionHeading eyebrow="Get in touch" title="Contact Us" description="Our sales team is available to help with project details, pricing and site visits." />

      <div className="mt-12 grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <InfoRow icon={MapPin} label="Head Office" value={siteConfig.address} />
          <InfoRow icon={Phone} label="Sales Enquiries" value={siteConfig.phone} />
          <InfoRow icon={Mail} label="Email" value={siteConfig.email} />
          <InfoRow icon={Clock} label="Working Hours" value="Mon – Sat, 10:00 AM – 7:00 PM" />

          <div className="h-56 bg-stone-dark border border-ink/10 rounded-xl flex items-center justify-center text-ink/40 text-sm">
            Map embed placeholder — add your Google Maps embed here
          </div>
        </div>

        <div className="lg:col-span-3 bg-stone-dark border border-ink/10 rounded-xl p-8">
          <LeadForm variant="contact" />
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 shrink-0 bg-brass/10 text-brass flex items-center justify-center">
        <Icon size={18} />
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-wide text-ink/40">{label}</div>
        <div className="text-sm text-ink/80 mt-0.5">{value}</div>
      </div>
    </div>
  );
}
