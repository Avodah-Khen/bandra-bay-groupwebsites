import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { CATEGORY_LABELS, STATUS_LABELS } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block bg-stone-dark border border-white/10 hover:border-cyan-400/40 rounded-xl overflow-hidden transition-colors"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={project.hero_image || "/images/placeholder.jpg"}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090f] via-transparent to-transparent" />
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur border border-white/10 text-white text-[11px] font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
          {STATUS_LABELS[project.status]}
        </div>
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight size={16} className="text-white" />
        </div>
      </div>
      <div className="p-6">
        <div className="eyebrow mb-2">{CATEGORY_LABELS[project.category]}</div>
        <h3 className="font-display text-xl text-white mb-2 group-hover:text-cyan-300 transition-colors">
          {project.title}
        </h3>
        <div className="flex items-center gap-1.5 text-sm text-white/40 mb-4">
          <MapPin size={14} />
          {project.location || project.city}
        </div>
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <div>
            <div className="text-[11px] uppercase tracking-wide text-white/30">Starting at</div>
            <div className="font-semibold text-white">{formatPrice(project.starting_price, project.price_unit || "INR")}</div>
          </div>
          {project.area_range && (
            <div className="text-right">
              <div className="text-[11px] uppercase tracking-wide text-white/30">Area</div>
              <div className="font-semibold text-white">{project.area_range}</div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
