import Image from 'next/image';
import ConfigurationCards, { ConfigurationData } from '@/components/ConfigurationCards';
import AmenityGrid, { AmenityData } from '@/components/AmenityGrid';
import FeatureHighlights, { FeatureData } from '@/components/FeatureHighlights';
import LocationList, { LocationPointData } from '@/components/LocationList';
import GalleryGrid, { GalleryItemData } from '@/components/GalleryGrid';
import FaqAccordion, { FaqItem } from '@/components/FaqAccordion';
import EmiCalculator from '@/components/EmiCalculator';
import EnquiryForm from '@/components/EnquiryForm';
import BrochureButton from '@/components/BrochureButton';

export type ProjectPageData = {
  id: string; name: string; slug: string; developer: string; location: string; status: string;
  areaValue: number | null; areaUnit: string | null; towers: number | null; possessionDate: Date | null;
  reraNumber: string | null; reraAuthorityUrl: string | null; tagline: string | null; description: string;
  heroImageUrl: string | null; brochureUrl: string | null;
  configurations: ConfigurationData[]; amenities: AmenityData[]; features: FeatureData[];
  galleryItems: GalleryItemData[]; locationPoints: LocationPointData[]; faqs: FaqItem[];
};

export default function ProjectPage({ project }: { project: ProjectPageData }) {
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Residence', name: project.name, description: project.description,
    address: { '@type': 'PostalAddress', addressLocality: project.location, addressCountry: 'IN' },
  };
  const faqJsonLd = project.faqs.length > 0 ? {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: project.faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  } : null;

  return (
    <div>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqJsonLd && (
        // eslint-disable-next-line react/no-danger
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      <section className="relative flex min-h-[70vh] items-end bg-cover bg-center text-white" style={{ backgroundImage: project.heroImageUrl ? `url(${project.heroImageUrl})` : undefined }}>
        <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/60 to-deep/10" />
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-32">
          {project.reraNumber && (
            <p className="mb-2 text-xs text-white/70">
              RERA No. {project.reraNumber}
              {project.reraAuthorityUrl && (<> · <a href={project.reraAuthorityUrl} target="_blank" rel="noopener noreferrer" className="underline">Verify on MahaRERA</a></>)}
            </p>
          )}
          <h1 className="font-display text-4xl font-semibold md:text-6xl">{project.name}</h1>
          <p className="mt-2 max-w-xl text-white/80">{project.tagline}</p>
          <p className="mt-1 text-sm text-white/60">{project.location}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#enquire" className="btn-gold">Enquire Now</a>
            <BrochureButton brochureUrl={project.brochureUrl} projectId={project.id} />
            <a href="#callback" className="btn-outline border-white/40 text-white hover:bg-white/10">Request Callback</a>
          </div>
        </div>
      </section>

      <section id="overview" className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="eyebrow">Overview</p>
            <h2 className="section-title mt-1">{project.name} — Project Overview</h2>
            <p className="mt-4 max-w-3xl text-ink/70">{project.description}</p>
          </div>
          <div className="relative aspect-[16/9] overflow-hidden rounded-sm border border-ink/10 bg-ink/5 shadow-sm">
            <Image src="/images/exterior.jpg" alt="Skyline Bay Residences exterior" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-ink/10 pt-6 sm:grid-cols-4">
          <Stat label="Developer" value={project.developer} />
          <Stat label="Status" value={project.status.replace(/_/g, ' ')} />
          <Stat label="Project Area" value={project.areaValue ? `${project.areaValue} ${project.areaUnit || ''}` : '—'} />
          <Stat label="Towers" value={project.towers ? String(project.towers) : '—'} />
          <Stat label="Possession" value={project.possessionDate ? new Date(project.possessionDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : '—'} />
          <Stat label="Configurations" value={[...new Set(project.configurations.map((c) => c.type))].join(', ') || '—'} />
          <Stat label="Unit Size" value={project.configurations.length > 0 ? `${Math.min(...project.configurations.map((c) => c.carpetAreaSqft))}–${Math.max(...project.configurations.map((c) => c.carpetAreaSqft))} sq. ft.` : '—'} />
          <Stat label="RERA No." value={project.reraNumber || '—'} />
        </dl>
      </section>

      {project.features.length > 0 && (
        <section className="bg-white py-14">
          <div className="mx-auto max-w-6xl px-4">
            <p className="eyebrow">Highlights</p>
            <h2 className="section-title mt-1 mb-8">Everything is Within</h2>
            <FeatureHighlights features={project.features} />
          </div>
        </section>
      )}

      <section id="amenities" className="mx-auto max-w-6xl px-4 py-14">
        <p className="eyebrow">Amenities</p>
        <h2 className="section-title mt-1 mb-8">{project.amenities.length}+ Lifestyle Amenities</h2>
        <AmenityGrid amenities={project.amenities} />
      </section>

      <section id="configurations" className="bg-white py-14">
        <div className="mx-auto max-w-6xl px-4">
          <p className="eyebrow">Configurations</p>
          <h2 className="section-title mt-1 mb-8">Choose Your Home</h2>
          <ConfigurationCards configurations={project.configurations} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-4 md:grid-cols-3">
          <VisualCard image="/images/interior.jpg" eyebrow="Configurations" title="Spacious 2, 3 & 4 BHK Residences" text="Thoughtfully designed homes with abundant natural light and premium finishes." href="#configurations" cta="View Details" />
          <VisualCard image="/images/location.jpg" eyebrow="Prime Location" title="Andheri West, Mumbai" text="Excellent connectivity to business hubs, schools, hospitals and the airport." href="#location" cta="Explore Location" />
          <VisualCard image="/images/gallery.jpg" eyebrow="Gallery" title="Experience the Luxury" text="Explore the architecture, interiors, amenities and lifestyle at Skyline Bay Residences." href="#gallery" cta="View Gallery" />
        </div>
      </section>

      <section id="location" className="mx-auto max-w-6xl px-4 py-14">
        <p className="eyebrow">Location</p>
        <h2 className="section-title mt-1 mb-8">Address of Luxury</h2>
        <LocationList points={project.locationPoints} />
      </section>

      <section id="gallery" className="bg-white py-14">
        <div className="mx-auto max-w-6xl px-4">
          <p className="eyebrow">Gallery</p>
          <h2 className="section-title mt-1 mb-8">Explore the Project</h2>
          <GalleryGrid items={project.galleryItems} />
        </div>
      </section>

      <section id="emi" className="mx-auto max-w-6xl px-4 py-14">
        <p className="eyebrow">Financing</p>
        <h2 className="section-title mt-1 mb-8">EMI Calculator</h2>
        <EmiCalculator />
      </section>

      <section id="faq" className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-4">
          <p className="eyebrow">FAQ</p>
          <h2 className="section-title mt-1 mb-8">Frequently Asked Questions</h2>
          <FaqAccordion items={project.faqs} />
        </div>
      </section>

      <section id="enquire" className="mx-auto max-w-2xl px-4 py-14">
        <p className="eyebrow text-center">Get in Touch</p>
        <h2 className="section-title mt-1 mb-2 text-center">Looking for Your Dream Home?</h2>
        <p className="mb-8 text-center text-sm text-ink/60">Leave us a query and our representative will get back to you.</p>
        <EnquiryForm formType="ENQUIRY" configurations={project.configurations} />
      </section>

      <section id="callback" className="mx-auto max-w-2xl px-4 pb-14">
        <EnquiryForm formType="CALLBACK" title="Request a Callback" compact />
      </section>
    </div>
  );
}

function VisualCard({ image, eyebrow, title, text, href, cta }: { image: string; eyebrow: string; title: string; text: string; href: string; cta: string }) {
  return (
    <a href={href} className="group relative min-h-[300px] overflow-hidden rounded-sm bg-deep text-white shadow-sm">
      <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/70 to-transparent" />
      <div className="relative flex h-full min-h-[300px] flex-col justify-end p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-gold">{eyebrow}</p>
        <h3 className="mt-2 font-display text-2xl font-semibold leading-tight">{title}</h3>
        <p className="mt-2 max-w-sm text-sm text-white/75">{text}</p>
        <span className="mt-5 w-fit rounded-sm bg-gold px-4 py-2 text-xs font-semibold text-white">{cta}</span>
      </div>
    </a>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-ink/40">{label}</dt>
      <dd className="mt-1 font-medium capitalize">{value}</dd>
    </div>
  );
}
