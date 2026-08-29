import Link from "next/link";
import { Plus } from "lucide-react";
import { listProjects } from "@/lib/data";
import { CATEGORY_LABELS, STATUS_LABELS } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import ProjectRowActions from "@/components/admin/ProjectRowActions";

export const metadata = { title: "Projects" };

export default function AdminProjectsPage() {
  const projects = listProjects({ publishedOnly: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-ink">Projects</h1>
          <p className="text-sm text-ink/50 mt-1">{projects.length} total</p>
        </div>
        <Link href="/admin/projects/new" className="btn-primary">
          <Plus size={16} /> New Project
        </Link>
      </div>

      <div className="bg-stone-dark border border-ink/10 rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wide text-ink/40 border-b border-ink/10">
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Status</th>
              <th className="p-4">Starting Price</th>
              <th className="p-4">Published</th>
              <th className="p-4">Featured</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b border-ink/5 last:border-0">
                <td className="p-4">
                  <div className="font-medium text-ink">{p.title}</div>
                  <div className="text-xs text-ink/40">/{p.slug}</div>
                </td>
                <td className="p-4 text-ink/60">{CATEGORY_LABELS[p.category]}</td>
                <td className="p-4 text-ink/60">{STATUS_LABELS[p.status]}</td>
                <td className="p-4 text-ink/60">{formatPrice(p.starting_price, p.price_unit || "INR")}</td>
                <td className="p-4"><ProjectRowActions id={p.id} field="published" active={Boolean(p.published)} /></td>
                <td className="p-4"><ProjectRowActions id={p.id} field="featured" active={Boolean(p.featured)} /></td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/projects/${p.id}/edit`} className="text-brass font-semibold">Edit</Link>
                    <ProjectRowActions id={p.id} field="delete" active={false} />
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-ink/40">No projects yet. Create your first one.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
