export type ProjectCategory = "residential" | "commercial" | "industrial";
export type ProjectStatus = "upcoming" | "new_launch" | "ongoing" | "ready_to_move" | "completed" | "sold_out";
export type LeadStatus = "new" | "contacted" | "qualified" | "site_visit" | "negotiation" | "converted" | "lost";
export type LeadType = "enquiry" | "callback" | "schedule_visit" | "contact";
export type AdminRole = "ADMIN" | "SUPER_ADMIN";

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: ProjectCategory;
  status: ProjectStatus;
  short_description: string;
  description: string;
  location: string;
  city: string;
  address: string;
  starting_price: number | null;
  price_unit: string;
  area_range: string;
  configurations: string[] | string;
  amenities: string[] | string;
  highlights: string[] | string;
  hero_image: string;
  gallery: string[] | string;
  rera_number: string;
  possession_date: string | null;
  featured: boolean;
  published: boolean;
  seo_title: string;
  seo_description: string;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string;
  project_id: number | null;
  project_title: string;
  type: LeadType;
  source: string;
  status: LeadStatus;
  priority: string;
  preferred_date: string;
  preferred_time: string;
  message: string;
  notes: string;
  created_at: string;
}

export interface LeadActivity { id: number; lead_id: number; note: string; created_at: string; }
export interface Testimonial { id: number; name: string; role: string; content: string; rating: number; image: string | null; published: boolean; created_at: string; }
export interface Faq { id: number; question: string; answer: string; sort_order: number; published: boolean; }
export interface AdminUser { id: number; name: string; email: string; role: AdminRole; active: boolean; created_at: string; }
export interface SessionPayload { id: number; name: string; email: string; role: AdminRole; }

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  residential: "Residential", commercial: "Commercial", industrial: "Industrial",
};
export const STATUS_LABELS: Record<ProjectStatus, string> = {
  upcoming: "Upcoming", new_launch: "New Launch", ongoing: "Under Construction", ready_to_move: "Ready to Move", completed: "Completed", sold_out: "Sold Out",
};
export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New", contacted: "Contacted", qualified: "Qualified", site_visit: "Site Visit", negotiation: "Negotiation", converted: "Converted", lost: "Lost",
};
export const LEAD_STATUS_COLORS: Record<LeadStatus, string> = {
  new: "bg-blue-500/15 text-blue-700 rounded-full", contacted: "bg-cyan-500/15 text-cyan-700 rounded-full", qualified: "bg-amber-500/15 text-amber-700 rounded-full", site_visit: "bg-violet-500/15 text-violet-700 rounded-full", negotiation: "bg-orange-500/15 text-orange-700 rounded-full", converted: "bg-emerald-500/15 text-emerald-700 rounded-full", lost: "bg-red-500/15 text-red-700 rounded-full",
};
export const ROLE_LABELS: Record<AdminRole, string> = { ADMIN: "Admin", SUPER_ADMIN: "Super Admin" };
