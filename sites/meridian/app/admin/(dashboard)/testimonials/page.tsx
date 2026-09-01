import { listTestimonials } from "@/lib/data";
import TestimonialsManager from "@/components/admin/TestimonialsManager";

export const metadata = { title: "Testimonials" };

export default function AdminTestimonialsPage() {
  const testimonials = listTestimonials(false);
  return <TestimonialsManager testimonials={testimonials} />;
}
