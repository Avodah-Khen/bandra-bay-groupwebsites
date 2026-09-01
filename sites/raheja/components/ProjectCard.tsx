"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

export default function ProjectCard({ project }: { project: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="project-card"
    >
      <Link href={`/projects/${project.slug}`}>
        <div
          className="project-image"
          style={{
            backgroundImage: `url(${project.heroImage})`,
          }}
        >
          <div className="project-overlay" />

          <div className="project-top">
            <span>{project.category}</span>

            <div className="project-arrow">
              <ArrowUpRight size={20} />
            </div>
          </div>

          <div className="project-info">
            <h3>{project.title}</h3>

            <div className="location">
              <MapPin size={14} />
              {project.location}, {project.city}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}