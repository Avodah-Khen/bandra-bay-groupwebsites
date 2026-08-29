import { Star } from "lucide-react";
import type { Testimonial } from "@/lib/types";

export default function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="bg-stone-dark border border-ink/10 rounded-xl p-8 h-full flex flex-col">
      <div className="flex gap-1 text-brass mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={16} fill={i < t.rating ? "currentColor" : "none"} />
        ))}
      </div>
      <p className="text-ink/70 leading-relaxed flex-1">&ldquo;{t.content}&rdquo;</p>
      <div className="mt-6 pt-4 border-t border-ink/10">
        <div className="font-semibold text-ink text-sm">{t.name}</div>
        {t.role && <div className="text-xs text-ink/50">{t.role}</div>}
      </div>
    </div>
  );
}
