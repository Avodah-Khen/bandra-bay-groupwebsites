import { TEAM, PILLARS, STATS, SITE } from "@/lib/site";
import Link from "next/link";

export const metadata = {
  title: "About Us | Elements Realty",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative min-h-[55vh] overflow-hidden pt-28">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80)",
          }}
        />
        <div className="hero-gradient absolute inset-0" />
        <div className="relative z-10 flex min-h-[45vh] items-end px-5 pb-16 md:px-10 lg:px-16">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--brass-soft)]">
              About Us
            </p>
            <h1 className="mt-3 font-display text-5xl text-white md:text-6xl">
              Building Homes for a Lifetime
            </h1>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--foam)]">
        <div className="mx-auto max-w-3xl">
          <p className="text-lg leading-relaxed text-[var(--stone)]">
            Life is made possible by four elements when they come together in
            the right quantum — Fire, Air, Water, and Earth. At Elements Realty,
            we imbibe these in the creations we infuse life into. We aim to
            serve our residents with a promise of providing all the elements
            that improve their lives.
          </p>
        </div>
      </section>

      <section className="section-pad bg-[var(--ink)] text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--brass-soft)]">
            Our Elements Of Success
          </p>
          <h2 className="mt-3 font-display text-4xl">
            A team that embellished the skyline of Mumbai
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {TEAM.map((m) => (
              <article key={m.name} className="border-t border-white/15 pt-6">
                <h3 className="font-display text-2xl">{m.name}</h3>
                <p className="mt-2 text-sm text-[var(--brass-soft)]">{m.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-white/65">
                  {m.bio}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-display text-4xl text-[var(--brass-soft)]">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--foam)]">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-4xl">Core Elements</h2>
          <p className="mt-3 max-w-2xl text-[var(--stone)]">
            We wish to create a world where our creations always stand tall by
            following eight foundation principles.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p) => (
              <div key={p.title} className="bg-white/60 p-5">
                <h3 className="font-display text-xl">{p.title}</h3>
                <p className="mt-3 text-sm text-[var(--stone)]">{p.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-sm text-[var(--stone)]">
            Join us ·{" "}
            <a href={`mailto:${SITE.careers}`} className="text-[var(--sea)]">
              {SITE.careers}
            </a>
          </p>
          <Link href="/contact" className="btn-primary mt-8 inline-flex">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
