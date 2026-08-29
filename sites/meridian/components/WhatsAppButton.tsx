import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function WhatsAppButton() {
  const phone = siteConfig.whatsapp.replace(/[^0-9]/g, "");
  return (
    <a
      href={`https://wa.me/${phone}?text=${encodeURIComponent("Hi, I'd like to know more about your projects.")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 transition-transform"
    >
      <MessageCircle size={26} />
    </a>
  );
}
