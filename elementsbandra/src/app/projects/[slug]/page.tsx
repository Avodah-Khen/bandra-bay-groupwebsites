import { notFound } from "next/navigation";
import { getProperty } from "@/lib/api";
import { parseJsonArray } from "@/lib/site";
import { PropertyInquiry } from "@/components/PropertyInquiry";
import Link from "next/link";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const p = await getProperty(params.slug).catch(() => null);
  return { title: p ? `${p.name} | Elements Realty` : "Project | Elements Realty" };
}

export default async function PropertyPage({
  params,
}: {
  params: { slug: string };
}) {
  const property = await getProperty(params.slug).catch(() => null);
  if (!property || !property.published) notFound();

  const gallery = parseJsonArray(property.gallery);
  const configs = parseJsonArray(property.configurations);
  const amenities = parseJsonArray(property.amenities);

  return (
    <>
      <section className="relative min-h-[70vh] overflow-hidden pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${property.coverImage})` }}
        />
        <div className="hero-gradient absolute inset-0" />
        <div className="relative z-10 flex min-h-[60vh] flex-col justify-end px-5 pb-16 md:px-10 lg:px-16">
          <span className="w-fit bg-white/10 px-3 py-1 text-[11px] uppercase tracking-wider text-white backdrop-blur">
            {property.status}
          </span>
          <h1 className="mt-4 font-display text-5xl text-white md:text-7xl">
            {property.name}
          </h1>
          <p className="mt-3 text-lg text-white/75">{property.location}</p>
          {property.tagline && (
            <p className="mt-4 max-w-2xl text-white/70">{property.tagline}</p>
          )}
        </div>
      </section>

      <section className="section-pad bg-[var(--foam)]">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl">About this residence</h2>
            <p className="mt-4 leading-relaxed text-[var(--stone)]">
              {property.description}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {property.priceFrom && (
                <div className="border-t border-[var(--mist)] pt-4">
                  <p className="text-xs uppercase tracking-wider text-[var(--tide)]">
                    Price
                  </p>
                  <p className="mt-1 font-medium">{property.priceFrom}</p>
                </div>
              )}
              {property.possession && (
                <div className="border-t border-[var(--mist)] pt-4">
                  <p className="text-xs uppercase tracking-wider text-[var(--tide)]">
                    Possession
                  </p>
                  <p className="mt-1 font-medium">{property.possession}</p>
                </div>
              )}
              {property.rera && (
                <div className="border-t border-[var(--mist)] pt-4">
                  <p className="text-xs uppercase tracking-wider text-[var(--tide)]">
                    RERA
                  </p>
                  <p className="mt-1 font-medium">{property.rera}</p>
                </div>
              )}
              {property.area && (
                <div className="border-t border-[var(--mist)] pt-4">
                  <p className="text-xs uppercase tracking-wider text-[var(--tide)]">
                    Area
                  </p>
                  <p className="mt-1 font-medium">{property.area}</p>
                </div>
              )}
            </div>

            {configs.length > 0 && (
              <div className="mt-10">
                <h3 className="font-display text-2xl">Configurations</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {configs.map((c) => (
                    <span
                      key={c}
                      className="border border-[var(--mist)] px-4 py-2 text-sm"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {amenities.length > 0 && (
              <div className="mt-10">
                <h3 className="font-display text-2xl">Amenities</h3>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {amenities.map((a) => (
                    <li key={a} className="text-sm text-[var(--stone)] before:mr-2 before:text-[var(--brass)] before:content-['◆']">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {gallery.length > 0 && (
              <div className="mt-12">
                <h3 className="font-display text-2xl">Gallery</h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {gallery.map((src) => (
                    <div
                      key={src}
                      className="aspect-[4/3] bg-cover bg-center"
                      style={{ backgroundImage: `url(${src})` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="h-fit bg-[var(--ink)] p-6 text-white lg:sticky lg:top-28">
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--brass-soft)]">
              Inquire Now
            </p>
            <h3 className="mt-2 font-display text-2xl">
              Interested in {property.name}?
            </h3>
            <p className="mt-2 text-sm text-white/60">
              Submit your details — saved instantly to our CRM database.
            </p>
            <div className="mt-6 [&_.input-field]:border-white/25 [&_.input-field]:text-white [&_.input-field]:placeholder:text-white/40">
              <PropertyInquiry
                propertyId={property.id}
                propertySlug={property.slug}
                propertyName={property.name}
              />
            </div>
            <Link
              href="/projects"
              className="mt-6 inline-block text-sm text-[var(--brass-soft)] underline"
            >
              ← All projects
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
