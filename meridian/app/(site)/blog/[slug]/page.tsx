import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt || undefined };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post || !post.published) notFound();

  return (
    <div className="container-px py-16 max-w-3xl mx-auto">
      <Link href="/blog" className="text-sm text-brass font-semibold">&larr; Back to blog</Link>
      <div className="text-[11px] uppercase tracking-wide text-ink/40 mt-6">{formatDate(post.created_at)}</div>
      <h1 className="font-display text-3xl md:text-4xl text-ink mt-3">{post.title}</h1>
      {post.image && (
        <div className="relative h-72 md:h-96 mt-8">
          <Image src={post.image} alt={post.title} fill className="object-cover" />
        </div>
      )}
      <div className="prose prose-sm md:prose-base mt-8 text-ink/70 leading-relaxed whitespace-pre-line">
        {post.content}
      </div>
    </div>
  );
}
