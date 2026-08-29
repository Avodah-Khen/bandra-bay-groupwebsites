import Link from "next/link";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-white">
      <div className="section-pad grid gap-12 md:grid-cols-3 lg:grid-cols-4">
        <div className="md:col-span-1 lg:col-span-1">
          <p className="font-display text-3xl">{SITE.name}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
            The signature touch of Elements Realty is what would soon turn out
            to be the aspiration and envy of many.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--brass-soft)]">
            Explore
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-white">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/faqs" className="hover:text-white">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/buyers-guide" className="hover:text-white">
                Buyer&apos;s Guide
              </Link>
            </li>
            <li>
              <Link href="/nri-corner" className="hover:text-white">
                NRI Corner
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--brass-soft)]">
            Talk To Us
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li>
              <a href={`tel:${SITE.phone}`} className="hover:text-white">
                {SITE.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-white">
                {SITE.email}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.careers}`} className="hover:text-white">
                Careers · {SITE.careers}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--brass-soft)]">
            Office Address
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/75">{SITE.office}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-xs text-white/50">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/disclaimer" className="hover:text-white">
              Disclaimer
            </Link>
            <Link href="/site-map" className="hover:text-white">
              Sitemap
            </Link>
            <Link href="/admin/login" className="hover:text-white">
              Admin
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/40 md:px-10">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved. Demo
        replica for portfolio / CRM use.
      </div>
    </footer>
  );
}
