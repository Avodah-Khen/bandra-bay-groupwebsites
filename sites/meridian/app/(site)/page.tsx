import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Factory, Home as HomeIcon } from "lucide-react";
import { listProjects, listTestimonials } from "@/lib/data";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import StatsBand from "@/components/StatsBand";
import TestimonialCard from "@/components/TestimonialCard";
import LeadForm from "@/components/LeadForm";
import Reveal from "@/components/Reveal";
import HeroCopy from "@/components/HeroCopy";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const featured = listProjects({ featured: true }).slice(0, 3);
  const projects = featured.length > 0 ? featured : listProjects().slice(0, 3);
  const testimonials = listTestimonials().slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="aurora-blob bg-cyan-500 w-[32rem] h-[32rem] -top-40 -left-32 animate-aurora" />
        <div className="aurora-blob bg-violet-600 w-[28rem] h-[28rem] top-0 right-0 animate-aurora [animation-delay:-6s]" />
        <div className="absolute inset-0 grid-fade" />

        <div className="container-px relative grid lg:grid-cols-2 gap-12 items-center py-20 md:py-28">
          <HeroCopy />

          <div className="relative h-80 md:h-[30rem]">
            <div className="absolute -inset-4 bg-accent-gradient opacity-20 blur-3xl rounded-full" />
            <div className="relative h-full rounded-2xl overflow-hidden border border-white/10">
              <Image
                src="/images/hero.jpg"
                alt="Meridian Realty flagship development"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090f] via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <StatsBand />

      {/* Category tiles */}
      <section className="container-px py-20">
        <Reveal>
          <SectionHeading eyebrow="What we build" title="Three categories. One standard of craft." />
        </Reveal>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {[
            { href: "/projects?category=residential", icon: HomeIcon, label: "Residential", copy: "Addresses designed around how families actually live." },
            { href: "/projects?category=commercial", icon: Building2, label: "Commercial", copy: "Workspaces and retail landmarks built for footfall and prestige." },
            { href: "/projects?category=industrial", icon: Factory, label: "Industrial", copy: "Logistics and manufacturing parks engineered for scale." },
          ].map((c, i) => (
            <Reveal key={c.label} delay={i * 0.1}>
              <Link href={c.href} className="group relative block border border-white/10 bg-stone-dark rounded-xl p-8 hover:border-cyan-400/40 transition-colors overflow-hidden h-full">
                <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-accent-gradient opacity-0 group-hover:opacity-20 blur-2xl transition-opacity" />
                <c.icon className="text-cyan-400" size={28} />
                <h3 className="font-display text-xl text-white mt-4">{c.label}</h3>
                <p className="text-sm text-white/50 mt-2 leading-relaxed">{c.copy}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-cyan-300 mt-4 group-hover:gap-2 transition-all">
                  View projects <ArrowRight size={14} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured projects */}
      {projects.length > 0 && (
        <section className="bg-stone-dark/40 py-20 border-y border-white/10">
          <div className="container-px">
            <div className="flex items-end justify-between flex-wrap gap-4">
              <Reveal><SectionHeading eyebrow="Currently open" title="Featured developments" /></Reveal>
              <Link href="/projects" className="text-sm font-semibold text-cyan-300 inline-flex items-center gap-1">
                View all projects <ArrowRight size={14} />
              </Link>
            </div>
            <div className="mt-10 grid md:grid-cols-3 gap-6">
              {projects.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.1}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="container-px py-20">
          <Reveal><SectionHeading eyebrow="What residents say" title="Trusted by thousands of families" align="center" /></Reveal>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.1}>
                <TestimonialCard t={t} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative py-20 overflow-hidden border-t border-white/10">
        <div className="aurora-blob bg-violet-600 w-96 h-96 -bottom-32 left-1/3 opacity-30" />
        <div className="container-px relative grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="eyebrow mb-3">Let&apos;s talk</div>
            <h2 className="font-display text-3xl md:text-4xl leading-tight text-white">
              Have a project in mind? Our sales team responds within 24 hours.
            </h2>
            <p className="mt-4 text-white/50 max-w-md">
              Share a few details and our team will help you find the right configuration,
              pricing and possession timeline.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="card-surface rounded-xl p-8">
              <LeadForm variant="enquiry" title="" />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
