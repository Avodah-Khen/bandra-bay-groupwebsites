"use client";

import Link from "next/link";

type Props = {
  page: number;
  totalPages: number;
  basePath: string;
  query?: Record<string, string | undefined>;
};

export default function Pagination({ page, totalPages, basePath, query = {} }: Props) {
  if (totalPages <= 1) return null;
  const href = (target: number) => {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    params.set("page", String(target));
    return `${basePath}?${params.toString()}`;
  };
  return (
    <div className="flex items-center justify-between gap-3 border-t border-ink/5 px-4 py-3 text-sm">
      <span className="text-ink/50">Page {page} of {totalPages}</span>
      <div className="flex gap-2">
        <Link aria-disabled={page <= 1} className={`btn-outline ${page <= 1 ? "pointer-events-none opacity-40" : ""}`} href={href(Math.max(1, page - 1))}>Previous</Link>
        <Link aria-disabled={page >= totalPages} className={`btn-outline ${page >= totalPages ? "pointer-events-none opacity-40" : ""}`} href={href(Math.min(totalPages, page + 1))}>Next</Link>
      </div>
    </div>
  );
}
