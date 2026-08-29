import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="container-px py-16 max-w-2xl">
      <h1 className="font-display text-3xl text-ink mb-6">Privacy Policy</h1>
      <div className="prose prose-sm text-ink/70 space-y-4 leading-relaxed">
        <p>{siteConfig.name} collects the information you submit through enquiry, callback and site-visit forms — including your name, phone number, email and project interest — solely to respond to your request and share relevant project updates.</p>
        <p>We do not sell your information to third parties. Data is stored securely and retained only as long as necessary to service your enquiry.</p>
        <p>You may request access to, correction of, or deletion of your data at any time by writing to {siteConfig.email}.</p>
        <p className="text-xs text-ink/40">This is placeholder policy text for demonstration. Replace with counsel-reviewed content before production use.</p>
      </div>
    </div>
  );
}
