export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
      {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
      <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight">{title}</h2>
      {description && <p className="mt-4 text-ink/60 leading-relaxed">{description}</p>}
    </div>
  );
}
