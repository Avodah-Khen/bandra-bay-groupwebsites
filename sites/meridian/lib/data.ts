import type { AdminUser, Faq, Lead, LeadActivity, Project, Testimonial } from "./types";

const now = new Date().toISOString();
const projects: Project[] = [
  {
    id: 1, slug: "meridian-heights", title: "Meridian Heights", category: "residential", status: "ongoing",
    short_description: "Refined residences in the heart of Mumbai.", description: "A contemporary residential address with generous homes, landscaped spaces and thoughtful amenities.",
    location: "Worli", city: "Mumbai", address: "Worli, Mumbai, Maharashtra", starting_price: 28500000, price_unit: "INR", area_range: "850 – 2200 sq.ft",
    configurations: ["2 BHK", "3 BHK", "4 BHK"], amenities: ["Infinity Pool", "Gymnasium", "Club House", "Landscaped Garden"], highlights: ["Sea-facing residences", "Premium clubhouse", "South Mumbai connectivity"],
    hero_image: "/images/hero.jpg", gallery: ["/images/gallery-1.jpg", "/images/gallery-2.jpg", "/images/gallery-3.jpg"], rera_number: "P51900012345", possession_date: "2027-12-01", featured: true, published: true,
    seo_title: "Meridian Heights | Premium Residences", seo_description: "Premium residences in Worli, Mumbai.", created_at: now, updated_at: now,
  },
  {
    id: 2, slug: "meridian-business-park", title: "Meridian Business Park", category: "commercial", status: "new_launch",
    short_description: "Grade-A commercial spaces for ambitious businesses.", description: "Flexible offices and retail frontage designed for modern enterprises and high-visibility brands.",
    location: "Andheri East", city: "Mumbai", address: "Andheri East, Mumbai, Maharashtra", starting_price: 12500000, price_unit: "INR", area_range: "650 – 5000 sq.ft",
    configurations: ["Office", "Retail", "Showroom"], amenities: ["Business Lounge", "Conference Centre", "Parking"], highlights: ["Airport connectivity", "High street visibility", "Flexible floor plates"],
    hero_image: "/images/project-commercial-a.jpg", gallery: ["/images/project-commercial-b.jpg"], rera_number: "P51900023456", possession_date: "2028-06-01", featured: true, published: true,
    seo_title: "Meridian Business Park", seo_description: "Grade-A commercial spaces in Andheri East.", created_at: now, updated_at: now,
  },
  {
    id: 3, slug: "meridian-industrial-hub", title: "Meridian Industrial Hub", category: "industrial", status: "ready_to_move",
    short_description: "Scalable industrial infrastructure near key logistics corridors.", description: "Modern industrial and warehousing spaces built for efficient movement, storage and manufacturing.",
    location: "Bhiwandi", city: "Thane", address: "Bhiwandi, Thane, Maharashtra", starting_price: 65000000, price_unit: "INR", area_range: "10,000 – 100,000 sq.ft",
    configurations: ["Warehouse", "Manufacturing", "Logistics"], amenities: ["Truck Court", "24/7 Security", "Loading Bays"], highlights: ["Expressway access", "Large floor plates", "Logistics-ready"],
    hero_image: "/images/project-industrial-a.jpg", gallery: ["/images/project-industrial-b.jpg"], rera_number: "P51700034567", possession_date: "2026-03-01", featured: false, published: true,
    seo_title: "Meridian Industrial Hub", seo_description: "Industrial and logistics spaces in Bhiwandi.", created_at: now, updated_at: now,
  },
];

const leads: Lead[] = [{ id: 1, name: "Demo Enquiry", phone: "+91 90000 00000", email: "demo@example.com", project_id: 1, project_title: "Meridian Heights", type: "enquiry", source: "website", status: "new", priority: "normal", preferred_date: "", preferred_time: "", message: "Demo lead for the frontend dashboard.", notes: "", created_at: now }];
const testimonials: Testimonial[] = [
  { id: 1, name: "Aarav Mehta", role: "Homeowner, Worli", content: "The process was transparent from the first conversation to handover.", rating: 5, image: null, published: true, created_at: now },
  { id: 2, name: "Nisha Shah", role: "Investor, Mumbai", content: "A thoughtful product with strong attention to detail and location.", rating: 5, image: null, published: true, created_at: now },
  { id: 3, name: "Rohan Kapoor", role: "Business Owner", content: "The commercial team understood our requirements quickly and clearly.", rating: 4, image: null, published: true, created_at: now },
];
const faqs: Faq[] = [
  { id: 1, question: "How can I schedule a site visit?", answer: "Use any enquiry form and select the schedule-a-visit option. Our sales team will contact you.", sort_order: 1, published: true },
  { id: 2, question: "Where are Meridian projects located?", answer: "Our portfolio focuses on Mumbai and the wider Mumbai Metropolitan Region.", sort_order: 2, published: true },
  { id: 3, question: "Can I request project pricing?", answer: "Yes. Submit an enquiry and the sales team can share current pricing and availability.", sort_order: 3, published: true },
];
const users: AdminUser[] = [{ id: 1, name: "Meridian Admin", email: "admin@meridianrealty.in", role: "SUPER_ADMIN", active: true, created_at: now }];
const activity: LeadActivity[] = [{ id: 1, lead_id: 1, note: "Demo lead created for frontend preview.", created_at: now }];

export function listProjects(options: { publishedOnly?: boolean; featured?: boolean; category?: Project["category"]; status?: Project["status"]; city?: string; q?: string } = {}) {
  const q = options.q?.trim().toLowerCase();
  return projects.filter((p) => (options.publishedOnly === false ? true : p.published) && (options.featured == null || p.featured === options.featured) && (!options.category || p.category === options.category) && (!options.status || p.status === options.status) && (!options.city || p.city === options.city) && (!q || [p.title, p.location, p.city, p.short_description].join(" ").toLowerCase().includes(q)));
}
export function getProjectById(id: number) { return projects.find((p) => p.id === id); }
export function getProjectBySlug(slug: string) { return projects.find((p) => p.slug === slug); }
export function getDistinctCities() { return [...new Set(projects.filter((p) => p.published).map((p) => p.city))]; }
export function listBlogPosts() { return [
  { id: 1, slug: "designing-for-the-next-generation", title: "Designing for the next generation", excerpt: "How thoughtful planning creates enduring urban addresses.", content: "Good real estate starts with context, proportion and long-term thinking.", image: "/images/blog-a.jpg", created_at: now, published: true },
  { id: 2, slug: "mumbai-commercial-outlook", title: "Mumbai commercial outlook", excerpt: "What modern occupiers expect from new workplaces.", content: "Flexibility, connectivity and experience increasingly shape commercial demand.", image: "/images/blog-b.jpg", created_at: now, published: true },
]; }
export function getBlogPostBySlug(slug: string) { return listBlogPosts().find((p) => p.slug === slug); }
export function listTestimonials(publishedOnly = true) { return testimonials.filter((t) => !publishedOnly || t.published); }
export function listFaqs(publishedOnly = true) { return faqs.filter((f) => !publishedOnly || f.published).sort((a,b) => a.sort_order-b.sort_order); }
export function listLeads(options: { status?: string; source?: string; project_id?: number; q?: string } = {}) {
  const q = options.q?.toLowerCase().trim();
  return leads.filter((l) => (!options.status || l.status === options.status) && (!options.source || l.source === options.source) && (options.project_id == null || l.project_id === options.project_id) && (!q || [l.name,l.phone,l.email,l.project_title].join(" ").toLowerCase().includes(q))).sort((a,b) => +new Date(b.created_at)-+new Date(a.created_at));
}
export function getLeadById(id: number) { return leads.find((l) => l.id === id); }
export function getLeadActivity(id: number) { return activity.filter((a) => a.lead_id === id); }
export function listAdminUsers() { return users; }
export function countAdminUsers() { return users.length; }
export function listAuditLog(limit = 200) { return activity.slice(0, limit).map((a) => ({ ...a, action: "LEAD_CREATED", actor_name: "Meridian Admin", entity: "lead" })); }
export function getDashboardStats() {
  const counts = (status: Lead["status"]) => leads.filter((l) => l.status === status).length;
  return { totalLeads: leads.length, newLeads: counts("new"), contactedLeads: counts("contacted"), qualifiedLeads: counts("qualified"), siteVisits: counts("site_visit"), negotiations: counts("negotiation"), converted: counts("converted"), lost: counts("lost"), conversionRate: leads.length ? Math.round((counts("converted") / leads.length) * 100) : 0, bySource: [{ source: "website", c: leads.length }], byProject: [{ project: "Meridian Heights", c: 1 }] };
}
