"use client";

import { motion } from "framer-motion";

export default function MagneticButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.button
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: .97,
      }}
      className="magnetic-button"
    >
      {children}
    </motion.button>
  );
}