"use client";
import ProjectCard from "./ProjectCard";
export default function ProjectGrid({ projects }: { projects: any[] }) {
  return <div className="grid">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>;
}
