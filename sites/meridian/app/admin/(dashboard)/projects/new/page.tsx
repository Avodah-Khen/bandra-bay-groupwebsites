import ProjectForm from "@/components/admin/ProjectForm";

export const metadata = { title: "New Project" };

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-ink mb-6">New Project</h1>
      <ProjectForm />
    </div>
  );
}
