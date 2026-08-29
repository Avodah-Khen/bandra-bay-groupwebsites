"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDown, Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero-modern">

      <div className="hero-background" />

      <div className="hero-noise" />

      <div className="container hero-content">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="eyebrow"
        >
          BUILDING BEYOND SPACES
        </motion.div>

        <motion.h1
          initial={{
            opacity: 0,
            y: 80,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: .15,
          }}
        >
          Designing
          <br />
          <span>Tomorrow.</span>
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: .8,
            delay: .4,
          }}
        >
          Premium residences, commercial destinations
          and industrial spaces built for the next generation
          of Indian cities.
        </motion.p>

        <div className="hero-actions">

          <Link href="/projects" className="btn">
            Explore Projects
          </Link>

          <button className="video-button">
            <Play size={16} />
            Watch Experience
          </button>

        </div>

      </div>

      <motion.div
        animate={{
          y: [0, 12, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="scroll-indicator"
      >
        <ArrowDown />
      </motion.div>

    </section>
  );
}