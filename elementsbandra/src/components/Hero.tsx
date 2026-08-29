"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center animate-[float_18s_ease-in-out_infinite]"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=2000&q=80)",
        }}
      />

      {/* Dark Gradient */}
      <div className="hero-gradient absolute inset-0" />

      {/* Grain Effect */}
      <div className="grain absolute inset-0 opacity-40" />

      {/* Hero Content */}
      <div
        className="
          relative z-10
          flex min-h-[100svh] w-full
          flex-col justify-end
          px-5 pb-16 pt-28
          sm:px-6 sm:pb-20
          md:px-10 md:pb-24 md:pt-32
          lg:px-16 lg:pb-28
          xl:px-20
        "
      >
        {/* Location */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="
            text-[10px]
            uppercase tracking-[0.3em]
            text-[var(--brass-soft)]
            sm:text-xs sm:tracking-[0.4em]
          "
        >
          Mumbai · City of Dreams
        </motion.p>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="
            mt-3
            max-w-[95%]
            font-display
            text-4xl
            leading-[1.08]
            text-white
            sm:mt-4
            sm:max-w-3xl
            sm:text-5xl
            md:max-w-4xl
            md:text-7xl
            lg:max-w-5xl
            lg:text-8xl
            xl:text-9xl
          "
        >
          Elements Realty
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="
            mt-4
            max-w-[95%]
            text-sm
            leading-relaxed
            text-white/75
            sm:mt-5
            sm:max-w-xl
            sm:text-base
            md:text-lg
          "
        >
          Hopes of Mumbaikars. Redeveloping the skyline — one lifetime home at
          a time, by the bay in Bandra.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="
            mt-8
            flex
            w-full
            flex-col
            gap-3
            sm:mt-10
            sm:w-auto
            sm:flex-row
            sm:gap-4
          "
        >
          <Link
            href="/projects"
            className="btn-primary w-full sm:w-auto"
          >
            View Projects
          </Link>

          <Link
            href="/contact"
            className="btn-ghost w-full sm:w-auto"
          >
            Talk To Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}