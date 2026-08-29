import { ProjectGrid } from "@/components/ProjectGrid";
import { getProperties } from "@/lib/api";

export const dynamic = "force-dynamic";
export const metadata = { title: "Projects | Elements Realty" };

export default async function ProjectsPage() {
  const properties = await getProperties().catch(() => []);

  return (
    <>
      <section className="bg-[var(--ink)] px-5 pb-10 pt-32 md:px-10 lg:px-16">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--brass-soft)]">
          Projects Coming Soon
        </p>
        <h1 className="mt-3 font-display text-5xl text-white md:text-6xl">
          Bandra Bay &amp; Mumbai
        </h1>
        <p className="mt-4 max-w-2xl text-white/65">
          Explore 9 Elements, 7 Elements and upcoming addresses at Union Park,
          Turner Road and Malabar Hill — with imagery and full project details.
        </p>
      </section>
      <ProjectGrid properties={properties} title="All Projects" subtitle="" />
    </>
  );
}
