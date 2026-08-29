import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import ProjectGrid from "@/components/ProjectGrid";
import Reveal from "@/components/Reveal";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const projects = await prisma.project.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
  });

  return (
    <main>
      <Hero />

      <Stats />

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="eyebrow">
              RAHEJASPACES DEVELOPMENTS
            </div>

            <h2>
              Spaces that define
              <br />
              the future.
            </h2>
          </Reveal>

          <ProjectGrid projects={projects} />
        </div>
      </section>

      <section className="future-section">
        {/* Parallax architecture section */}
      </section>

      <section className="dark">
        {/* Why RahejaSpaces */}
      </section>

      <section>
        {/* CTA */}
      </section>
    </main>
  );
}