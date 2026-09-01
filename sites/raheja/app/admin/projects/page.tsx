import { redirect } from "next/navigation";
import Link from "next/link";

import { getAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminProjects() {
  const admin = await getAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      units: true,
    },
  });

  return (
    <main className="admin">
      <div className="adminnav">
        <b>RAHEJASPACES / PROJECTS</b>

        <Link href="/admin">Dashboard</Link>
      </div>

      <div className="adminwrap">
        <h1>Projects</h1>

        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Published</th>
                <th>Units</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>

                  <td>{project.category}</td>

                  <td>{project.status}</td>

                  <td>
                    {project.published ? "Yes" : "No"}
                  </td>

                  <td>{project.units.length}</td>
                </tr>
              ))}

              {projects.length === 0 && (
                <tr>
                  <td colSpan={5}>
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}