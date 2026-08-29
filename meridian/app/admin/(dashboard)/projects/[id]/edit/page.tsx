import { notFound } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";
import { getProjectById } from "@/lib/data";

export const metadata = { title: "Edit Project" };

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProjectById(Number(id));
  if (!project) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl text-ink mb-6">Edit Project</h1>
      <ProjectForm project={project} />
    </div>
  );
}
