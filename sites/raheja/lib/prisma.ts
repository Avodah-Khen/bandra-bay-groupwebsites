import { blogPosts, leads, projects } from "./data";

function projectWhere(where: any = {}) {
  return projects.filter((p) => {
    if (where.published !== undefined && p.published !== where.published) return false;
    if (where.featured !== undefined && p.featured !== where.featured) return false;
    if (where.category && p.category !== where.category) return false;
    if (where.slug && p.slug !== where.slug) return false;
    if (where.id && p.id !== where.id) return false;
    return true;
  });
}

export const prisma = {
  project: {
    async findMany({ where = {}, take, include }: any = {}) {
      let rows = [...projectWhere(where)].sort((a,b) => b.createdAt.localeCompare(a.createdAt));
      if (take) rows = rows.slice(0, take);
      return rows.map((p) => include?._count ? { ...p, _count: { units: p.units.length } } : p);
    },
    async findUnique({ where, include }: any) {
      const p = projectWhere(where)[0];
      if (!p) return null;
      return include?.units ? p : p;
    },
    async count({ where = {} }: any = {}) { return projectWhere(where).length; },
  },
  blogPost: {
    async findMany({ where = {}, take }: any = {}) {
      let rows = blogPosts.filter((p) => where.published === undefined || p.published === where.published);
      rows = rows.sort((a,b) => b.createdAt.localeCompare(a.createdAt));
      return take ? rows.slice(0, take) : rows;
    },
    async findUnique({ where }: any) { return blogPosts.find((p) => p.slug === where.slug) || null; },
  },
  lead: {
    async count({ where = {} }: any = {}) { return leads.filter((l) => !where.status || l.status === where.status).length; },
    async findMany({ take }: any = {}) { return take ? leads.slice(0, take) : leads; },
  },
};
