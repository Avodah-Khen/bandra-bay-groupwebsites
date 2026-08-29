import { InquiryForm } from "@/components/InquiryForm";
import { SITE } from "@/lib/site";

export const metadata = { title: "Contact Us | Elements Realty" };

export default function ContactPage() {
  return (
    <>
      <section className="bg-[var(--ink)] px-5 pb-12 pt-32 md:px-10 lg:px-16">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--brass-soft)]">
          Contact Us
        </p>
        <h1 className="mt-3 font-display text-5xl text-white md:text-6xl">
          We look forward to hearing from you
        </h1>
      </section>

      <section className="section-pad bg-[var(--foam)]">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">
          <div className="space-y-10">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--tide)]">
                Office Address
              </p>
              <p className="mt-3 text-[var(--stone)] leading-relaxed">
                {SITE.office}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--tide)]">
                Registered Address
              </p>
              <p className="mt-3 text-[var(--stone)] leading-relaxed">
                {SITE.registered}
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <p>
                Phone:{" "}
                <a href={`tel:${SITE.phone}`} className="text-[var(--sea)]">
                  {SITE.phone}
                </a>
              </p>
              <p>
                Email:{" "}
                <a href={`mailto:${SITE.email}`} className="text-[var(--sea)]">
                  {SITE.email}
                </a>
              </p>
              <p>
                Careers:{" "}
                <a href={`mailto:${SITE.careers}`} className="text-[var(--sea)]">
                  {SITE.careers}
                </a>
              </p>
            </div>
          </div>
          <div>
            <h2 className="font-display text-3xl">Get in Touch</h2>
            <p className="mt-2 text-sm text-[var(--stone)]">
              Form data is stored in PostgreSQL and visible in Admin CRM.
            </p>
            <InquiryForm source="contact-page" className="mt-8" />
          </div>
        </div>
      </section>
    </>
  );
}
