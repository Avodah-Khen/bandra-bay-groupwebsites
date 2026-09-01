"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

export default function StatsBand() {
  return (
    <div className="relative border-y border-white/10 bg-white/[0.02]">
      <div className="container-px py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {siteConfig.stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="text-center md:text-left"
          >
            <div className="font-display text-3xl md:text-4xl font-semibold text-gradient">{s.value}</div>
            <div className="text-xs uppercase tracking-widest3 text-white/40 mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
