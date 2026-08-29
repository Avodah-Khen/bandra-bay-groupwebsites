import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { listBlogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Blog" };
export const dynamic = "force-dynamic";

export default function BlogListPage() {
  const posts = listBlogPosts();
  return (
    <div className="container-px py-16">
      <SectionHeading eyebrow="Insights" title="From the Blog" description="Market perspectives, project updates and homebuying guides from our team." />

      {posts.length === 0 ? (
        <p className="text-ink/50 mt-12">No articles published yet.</p>
      ) : (
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <Link key={p.id} href={`/blog/${p.slug}`} className="group block bg-stone-dark border border-ink/10 rounded-xl hover:border-brass/50 transition-colors">
              <div className="relative h-48">
                <Image src={p.image || "/images/placeholder.jpg"} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6">
                <div className="text-[11px] uppercase tracking-wide text-ink/40">{formatDate(p.created_at)}</div>
                <h3 className="font-display text-lg text-ink mt-2 group-hover:text-brass transition-colors">{p.title}</h3>
                {p.excerpt && <p className="text-sm text-ink/60 mt-2 line-clamp-2">{p.excerpt}</p>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
