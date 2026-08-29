import type { MetadataRoute } from "next";
import { listProjects, listBlogPosts } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const staticRoutes = ["", "/about", "/projects", "/contact", "/faq", "/careers", "/blog", "/policies/privacy", "/policies/terms"].map(
    (route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
    })
  );

  const projectRoutes = listProjects().map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    lastModified: p.updated_at,
  }));

  const blogRoutes = listBlogPosts().map((b) => ({
    url: `${siteUrl}/blog/${b.slug}`,
    lastModified: b.created_at,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
