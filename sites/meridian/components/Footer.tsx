import Link from "next/link";
import { Instagram, Facebook, Linkedin, Youtube, MapPin, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="relative bg-[#050609] text-white/70 mt-24 overflow-hidden">
      <div className="absolute inset-0 grid-fade opacity-40" />
      <div className="container-px py-16 grid gap-12 md:grid-cols-4 relative">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-accent-gradient" />
            <span className="font-display font-semibold text-xl text-white">{siteConfig.name}</span>
          </div>
          <p className="text-sm leading-relaxed text-white/40 max-w-xs">{siteConfig.description}</p>
          <div className="flex gap-4 mt-6">
            <a href={siteConfig.social.instagram} aria-label="Instagram" className="hover:text-cyan-300 transition-colors"><Instagram size={18} /></a>
            <a href={siteConfig.social.facebook} aria-label="Facebook" className="hover:text-cyan-300 transition-colors"><Facebook size={18} /></a>
            <a href={siteConfig.social.linkedin} aria-label="LinkedIn" className="hover:text-cyan-300 transition-colors"><Linkedin size={18} /></a>
            <a href={siteConfig.social.youtube} aria-label="YouTube" className="hover:text-cyan-300 transition-colors"><Youtube size={18} /></a>
          </div>
        </div>

        <div>
          <div className="eyebrow mb-4">Projects</div>
          <ul className="space-y-2 text-sm text-white/50">
            <li><Link href="/projects?category=residential" className="hover:text-white transition-colors">Residential</Link></li>
            <li><Link href="/projects?category=commercial" className="hover:text-white transition-colors">Commercial</Link></li>
            <li><Link href="/projects?category=industrial" className="hover:text-white transition-colors">Industrial</Link></li>
            <li><Link href="/projects?status=ready_to_move" className="hover:text-white transition-colors">Ready to Move</Link></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow mb-4">Company</div>
          <ul className="space-y-2 text-sm text-white/50">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/about#milestones" className="hover:text-white transition-colors">Milestones</Link></li>
            <li><Link href="/about#csr" className="hover:text-white transition-colors">CSR</Link></li>
            <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow mb-4">Get in Touch</div>
          <ul className="space-y-3 text-sm text-white/50">
            <li className="flex gap-2"><MapPin size={16} className="shrink-0 mt-0.5 text-cyan-400" />{siteConfig.address}</li>
            <li className="flex gap-2"><Phone size={16} className="shrink-0 mt-0.5 text-cyan-400" />{siteConfig.phone}</li>
            <li className="flex gap-2"><Mail size={16} className="shrink-0 mt-0.5 text-cyan-400" />{siteConfig.email}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 relative">
        <div className="container-px py-6 flex flex-col sm:flex-row justify-between gap-2 text-xs text-white/30">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/policies/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/policies/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/admin" className="hover:text-white transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
