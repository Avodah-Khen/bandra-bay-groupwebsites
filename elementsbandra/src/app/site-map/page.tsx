import Link from "next/link";

export const metadata = { title: "Sitemap | Elements Realty" };

const links = [
  ["/", "Home"],
  ["/about", "About"],
  ["/projects", "Projects"],
  ["/contact", "Contact"],
  ["/faqs", "FAQs"],
  ["/buyers-guide", "Buyer's Guide"],
  ["/nri-corner", "NRI Corner"],
  ["/privacy", "Privacy"],
  ["/disclaimer", "Disclaimer"],
  ["/admin/login", "Admin CRM"],
];

export default function SitemapPage() {
  return (
    <section className="section-pad mx-auto max-w-3xl pt-32">
      <h1 className="font-display text-5xl">Sitemap</h1>
      <ul className="mt-10 space-y-3">
        {links.map(([href, label]) => (
          <li key={href}>
            <Link href={href} className="text-[var(--sea)] hover:underline">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
