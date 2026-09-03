export type FaqItem = { id: string; question: string; answer: string };

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  if (items.length === 0) {
    return <p className="text-sm text-ink/50">FAQs will appear here once added in the admin CMS.</p>;
  }

  return (
    <div className="divide-y divide-ink/10 rounded-sm border border-ink/10 bg-white">
      {items.map((item) => (
        <details key={item.id} className="group p-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-ink marker:content-none">
            {item.question}
            <span aria-hidden className="shrink-0 text-lg text-ink/40 transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
