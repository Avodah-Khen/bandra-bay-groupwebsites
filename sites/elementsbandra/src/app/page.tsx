import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { InquiryForm } from "@/components/InquiryForm";
import { PILLARS, STATS, SITE } from "@/lib/site";
import { getProperties } from "@/lib/api";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const properties = await getProperties().catch(() => []);

  return (
    <>
      <Hero />

      <section className="section-pad relative overflow-hidden bg-[var(--foam)]">
        <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-[var(--mist)] blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--tide)]">
              About
            </p>
            <h2 className="mt-3 font-display text-4xl text-[var(--ink)] md:text-5xl">
              In our element — taking Mumbai&apos;s skyline to new heights
            </h2>
            <p className="mt-6 text-[var(--stone)] leading-relaxed">
              We are here, in our element, to take the skyline of Mumbai to new
              heights. Redefining excellence with every brick. At Elements
              Realty, we imbibe Fire, Air, Water and Earth into the creations we
              infuse life into.
            </p>
            <Link href="/about" className="btn-primary mt-8 !bg-[var(--sea)] !text-white">
              Discover Our Story
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-1">
            {STATS.map((s) => (
              <div key={s.label} className="border-l-2 border-[var(--brass)] pl-5">
                <p className="font-display text-4xl text-[var(--sea)]">{s.value}</p>
                <p className="mt-1 text-sm text-[var(--stone)]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--sea)] text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--brass-soft)]">
            #BeInYourElement
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl md:text-5xl">
            Homes for a lifetime — not just to live, but to live merry
          </h2>
          <p className="mt-6 max-w-3xl text-white/70 leading-relaxed">
            The signature touch of Elements Realty is becoming the aspiration
            and envy of many. It only motivates us to push for better and make a
            difference one step at a time.
          </p>
        </div>
      </section>

      <section className="section-pad bg-[var(--foam)]">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--tide)]">
            Foundation
          </p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">The 8 Pillars</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p, i) => (
              <div
                key={p.title}
                className="border-t border-[var(--mist)] pt-5 transition hover:border-[var(--brass)]"
              >
                <p className="text-xs text-[var(--brass)]">0{i + 1}</p>
                <h3 className="mt-2 font-display text-xl text-[var(--ink)]">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--stone)]">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProjectGrid
        properties={properties}
        title="Projects Coming Soon"
        subtitle="9 Elements & 7 Elements at Bandra Bay, plus Union Park, Turner Road and Malabar Hill."
      />

      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=80)",
          }}
        />
        <div className="absolute inset-0 bg-[var(--ink)]/80" />
        <div className="relative section-pad mx-auto max-w-4xl text-center text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--brass-soft)]">
            We Believe
          </p>
          <blockquote className="mt-6 font-display text-3xl leading-snug md:text-4xl">
            “Owning a home is the keystone of wealth, financial affluence, and
            emotional security.”
          </blockquote>
          <p className="mx-auto mt-6 max-w-2xl text-white/70">
            Your home is where you raise your children, maintain healthy
            relationships, and live your life — more than the materials used to
            construct it.
          </p>
        </div>
      </section>

      <section className="section-pad bg-[var(--foam)]" id="contact">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--tide)]">
              Contact Us
            </p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              Find your dream home
            </h2>
            <p className="mt-4 text-[var(--stone)]">
              Share your details — every Inquire Now submission is stored in our
              CRM database for our sales team.
            </p>
            <div className="mt-8 space-y-3 text-sm text-[var(--stone)]">
              <p>{SITE.office}</p>
              <p>
                <a href={`tel:${SITE.phone}`} className="text-[var(--sea)]">
                  {SITE.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${SITE.email}`} className="text-[var(--sea)]">
                  {SITE.email}
                </a>
              </p>
            </div>
          </div>
          <InquiryForm source="home-contact" />
        </div>
      </section>
    </>
  );
}
