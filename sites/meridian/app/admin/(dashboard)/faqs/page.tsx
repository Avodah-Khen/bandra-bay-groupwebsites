import { listFaqs } from "@/lib/data";
import FaqsManager from "@/components/admin/FaqsManager";

export const metadata = { title: "FAQs" };

export default function AdminFaqsPage() {
  const faqs = listFaqs(false);
  return <FaqsManager faqs={faqs} />;
}
