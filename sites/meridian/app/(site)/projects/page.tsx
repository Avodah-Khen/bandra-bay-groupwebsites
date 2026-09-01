import type { Metadata } from "next";
import { listProjects, getDistinctCities } from "@/lib/data";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import { CATEGORY_LABELS, STATUS_LABELS, type ProjectCategory, type ProjectStatus } from "@/lib/types";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse residential, commercial and industrial projects.",
};

interface SearchParams {
  category?: string;
  status?: string;
  city?: string;
  q?: string;
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const category = isProjectCategory(sp.category) ? sp.category : undefined;
  const status = isProjectStatus(sp.status) ? sp.status : undefined;

  const projects = listProjects({
    category,
    status,
    city: sp.city,
    q: sp.q,
  });
  const cities = getDistinctCities();

  function buildHref(overrides: Partial<SearchParams>) {
    const params = new URLSearchParams();
    const merged = { ...sp, ...overrides };
    Object.entries(merged).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    const qs = params.toString();
    return qs ? `/projects?${qs}` : "/projects";
  }

  return (
    <div>
      <section className="container-px pt-16 pb-8">
        <SectionHeading
          eyebrow="Our developments"
          title="All Projects"
          description="Filter by category, status or city to find the right development for you."
        />
      </section>

      {/* Filters */}
      <section className="container-px pb-8">
        <form className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 bg-stone-dark border border-ink/10 rounded-xl p-4">
          <input
            type="text"
            name="q"
            defaultValue={sp.q}
            placeholder="Search by name or location"
            className="input-field lg:col-span-2"
          />
          <select name="category" defaultValue={sp.category || ""} className="input-field">
            <option value="">All Categories</option>
            {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
          <select name="status" defaultValue={sp.status || ""} className="input-field">
            <option value="">All Statuses</option>
            {Object.entries(STATUS_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
          <select name="city" defaultValue={sp.city || ""} className="input-field">
            <option value="">All Cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button type="submit" className="btn-primary lg:col-span-5 sm:col-span-2">
            Apply Filters
          </button>
        </form>

        {(sp.category || sp.status || sp.city || sp.q) && (
          <div className="flex flex-wrap gap-2 mt-4 text-xs">
            {sp.category && <FilterPill label={CATEGORY_LABELS[sp.category as keyof typeof CATEGORY_LABELS] || sp.category} href={buildHref({ category: undefined })} />}
            {sp.status && <FilterPill label={STATUS_LABELS[sp.status as keyof typeof STATUS_LABELS] || sp.status} href={buildHref({ status: undefined })} />}
            {sp.city && <FilterPill label={sp.city} href={buildHref({ city: undefined })} />}
            {sp.q && <FilterPill label={`"${sp.q}"`} href={buildHref({ q: undefined })} />}
            <a href="/projects" className="text-ink/50 underline px-2 py-1">Clear all</a>
          </div>
        )}
      </section>

      {/* Results */}
      <section className="container-px pb-24">
        {projects.length === 0 ? (
          <div className="border border-dashed border-ink/20 py-20 text-center">
            <p className="text-ink/60">No projects match your filters yet.</p>
            <a href="/projects" className="text-brass font-semibold text-sm mt-2 inline-block">Reset filters</a>
          </div>
        ) : (
          <>
            <p className="text-sm text-ink/50 mb-6">{projects.length} project{projects.length !== 1 ? "s" : ""} found</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

function isProjectCategory(value: string | undefined): value is ProjectCategory {
  return value === "residential" || value === "commercial" || value === "industrial";
}

function isProjectStatus(value: string | undefined): value is ProjectStatus {
  return (
    value === "upcoming" ||
    value === "new_launch" ||
    value === "ongoing" ||
    value === "ready_to_move" ||
    value === "completed" ||
    value === "sold_out"
  );
}

function FilterPill({ label, href }: { label: string; href: string }) {
  return (
    <a href={href} className="bg-ink/5 hover:bg-ink/10 px-3 py-1 inline-flex items-center gap-2">
      {label} <span aria-hidden>&times;</span>
    </a>
  );
}
