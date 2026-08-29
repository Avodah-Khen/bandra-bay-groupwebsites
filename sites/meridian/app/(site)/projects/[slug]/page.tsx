import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, CheckCircle2, ShieldCheck, CalendarClock } from "lucide-react";
import { getProjectBySlug, listProjects } from "@/lib/data";
import { parseJsonArray } from "@/lib/utils";
import { CATEGORY_LABELS, STATUS_LABELS } from "@/lib/types";
import { formatPrice, formatDate } from "@/lib/utils";
import ProjectCard from "@/components/ProjectCard";
import LeadForm from "@/components/LeadForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.seo_title || project.title,
    description: project.seo_description || project.short_description || undefined,
    openGraph: {
      title: project.title,
      description: project.short_description || undefined,
      images: project.hero_image ? [project.hero_image] : undefined,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project || !project.published) notFound();

  const configurations = parseJsonArray(project.configurations);
  const amenities = parseJsonArray(project.amenities);
  const highlights = parseJsonArray(project.highlights);
  const gallery = parseJsonArray(project.gallery);

  const similar = listProjects({ category: project.category })
    .filter((p) => p.id !== project.id)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: project.title,
    address: project.address || project.location,
    description: project.short_description,
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative h-[26rem] md:h-[34rem]">
        <Image
          src={project.hero_image || "/images/placeholder.jpg"}
          alt={project.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090f] via-[#08090f]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container-px pb-10 text-white">
          <div className="eyebrow mb-2 text-brass-light">{CATEGORY_LABELS[project.category]} &middot; {STATUS_LABELS[project.status]}</div>
          <h1 className="font-display text-3xl md:text-5xl">{project.title}</h1>
          <div className="flex items-center gap-1.5 mt-3 text-white/80">
            <MapPin size={16} /> {project.location}{project.city ? `, ${project.city}` : ""}
          </div>
        </div>
      </section>

      <div className="container-px py-12 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Quick facts */}
          <div className="grid sm:grid-cols-3 gap-4 border border-ink/10 bg-stone-dark p-6">
            <Fact label="Starting Price" value={formatPrice(project.starting_price, project.price_unit || "INR")} />
            <Fact label="Area Range" value={project.area_range || "On request"} />
            <Fact label="Possession" value={project.possession_date ? formatDate(project.possession_date) : "TBD"} />
          </div>

          {/* Overview */}
          {project.description && (
            <div>
              <h2 className="font-display text-2xl text-ink mb-4">Overview</h2>
              <p className="text-ink/70 leading-relaxed whitespace-pre-line">{project.description}</p>
            </div>
          )}

          {/* Highlights */}
          {highlights.length > 0 && (
            <div>
              <h2 className="font-display text-2xl text-ink mb-4">Highlights</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-ink/70">
                    <CheckCircle2 size={16} className="text-brass shrink-0 mt-0.5" /> {h}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Configurations */}
          {configurations.length > 0 && (
            <div>
              <h2 className="font-display text-2xl text-ink mb-4">Configurations</h2>
              <div className="flex flex-wrap gap-3">
                {configurations.map((c, i) => (
                  <span key={i} className="border border-ink/15 px-4 py-2 text-sm text-ink/70">{c}</span>
                ))}
              </div>
            </div>
          )}

          {/* Amenities */}
          {amenities.length > 0 && (
            <div>
              <h2 className="font-display text-2xl text-ink mb-4">Amenities</h2>
              <div className="grid sm:grid-cols-3 gap-3">
                {amenities.map((a, i) => (
                  <div key={i} className="bg-stone-dark border border-ink/10 rounded-xl px-4 py-3 text-sm text-ink/70 text-center">{a}</div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery */}
          {gallery.length > 0 && (
            <div>
              <h2 className="font-display text-2xl text-ink mb-4">Gallery</h2>
              <div className="grid sm:grid-cols-3 gap-3">
                {gallery.map((src, i) => (
                  <div key={i} className="relative h-40 border border-ink/10">
                    <Image src={src} alt={`${project.title} gallery ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RERA */}
          {project.rera_number && (
            <div className="flex items-start gap-3 bg-stone-dark border border-ink/10 rounded-xl p-6 text-sm text-ink/60">
              <ShieldCheck className="text-brass shrink-0" size={20} />
              <div>
                <div className="font-semibold text-ink">RERA Registration</div>
                {project.rera_number}. Prospective buyers are encouraged to verify project details on the official Maharashtra RERA website.
              </div>
            </div>
          )}
        </div>

        {/* Sidebar forms */}
        <aside className="space-y-6">
          <div className="bg-stone-dark border border-ink/10 rounded-xl p-6 sticky top-24">
            <LeadForm variant="enquiry" projectId={project.id} projectTitle={project.title} />
          </div>
          <div className="bg-stone-dark border border-ink/10 rounded-xl p-6">
            <LeadForm variant="callback" projectId={project.id} projectTitle={project.title} compact />
          </div>
          <div className="bg-stone-dark border border-ink/10 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-1">
              <CalendarClock size={18} className="text-brass" />
              <h3 className="font-display text-xl text-ink">Schedule a Site Visit</h3>
            </div>
            <LeadForm variant="schedule_visit" projectId={project.id} projectTitle={project.title} title="" compact />
          </div>
        </aside>
      </div>

      {/* Similar projects */}
      {similar.length > 0 && (
        <section className="bg-stone-dark/40 border-t border-ink/10 py-16">
          <div className="container-px">
            <h2 className="font-display text-2xl text-ink mb-8">Similar Projects</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="container-px py-8">
        <Link href="/projects" className="text-sm text-brass font-semibold">&larr; Back to all projects</Link>
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wide text-ink/40">{label}</div>
      <div className="font-display text-lg text-ink mt-1">{value}</div>
    </div>
  );
}
