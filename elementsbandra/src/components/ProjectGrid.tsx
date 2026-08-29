"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { parseJsonArray } from "@/lib/site";

export type PropertyCardData = {
  id: string;
  slug: string;
  name: string;
  location: string;
  status: string;
  tagline: string | null;
  coverImage: string;
  configurations: string;
  priceFrom: string | null;
};

export function ProjectGrid({
  properties,
  title = "Projects",
  subtitle = "Bandra Bay & beyond — residences shaped by the four elements.",
}: {
  properties: PropertyCardData[];
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="section-pad bg-[var(--ink)] text-white">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--brass-soft)]">
          Portfolio
        </p>
        <h2 className="mt-3 font-display text-4xl md:text-5xl">{title}</h2>
        <p className="mt-4 max-w-2xl text-white/65">{subtitle}</p>

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {properties.map((p, i) => {
            const configs = parseJsonArray(p.configurations);
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group"
              >
                <Link href={`/projects/${p.slug}`} className="block">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${p.coverImage})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <span className="absolute left-4 top-4 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-wider text-white backdrop-blur">
                      {p.status}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="font-display text-3xl">{p.name}</h3>
                      <p className="mt-1 text-sm text-white/70">{p.location}</p>
                      {p.priceFrom && (
                        <p className="mt-3 text-sm text-[var(--brass-soft)]">
                          {p.priceFrom}
                        </p>
                      )}
                      {configs.length > 0 && (
                        <p className="mt-2 text-xs text-white/55">
                          {configs.join(" · ")}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
