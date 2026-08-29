"use client";

import { motion } from "framer-motion";

const stats = [
  ["35+", "Years of Legacy"],
  ["120+", "Projects Delivered"],
  ["18M+", "Sq. Ft. Delivered"],
  ["15+", "Cities / Locations"],
];

export default function Stats() {
  return (
    <section className="stats-section">
      <div className="container stats-grid">

        {stats.map(([number, label], index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * .1,
            }}
            className="stat-modern"
          >
            <strong>{number}</strong>
            <span>{label}</span>
          </motion.div>
        ))}

      </div>
    </section>
  );
}