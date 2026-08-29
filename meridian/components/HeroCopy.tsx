"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function HeroCopy() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="eyebrow mb-4"
      >
        {siteConfig.tagline}
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-display text-4xl md:text-6xl leading-[1.05] text-white"
      >
        Landmarks that <span className="text-gradient">outlast</span> the skyline.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mt-6 text-white/50 text-lg leading-relaxed max-w-lg"
      >
        {siteConfig.description} Explore residential addresses, commercial landmarks and
        industrial parks engineered for the next generation of Mumbai.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 flex flex-wrap gap-4"
      >
        <Link href="/projects" className="btn-brass">
          Explore Projects <ArrowRight size={16} />
        </Link>
        <Link href="/contact" className="btn-outline">
          Talk to Us
        </Link>
      </motion.div>
    </div>
  );
}
