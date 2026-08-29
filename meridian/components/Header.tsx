"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const NAV = [
  { href: "/projects?category=residential", label: "Residential" },
  { href: "/projects?category=commercial", label: "Commercial" },
  { href: "/projects?category=industrial", label: "Industrial" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? "bg-[#08090f]/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-px flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-2 h-2 rounded-full bg-accent-gradient group-hover:scale-125 transition-transform" />
          <span className="font-display font-semibold text-xl tracking-tight text-white">{siteConfig.name}</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[13px] font-medium uppercase tracking-widest3 text-white/60 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`} className="flex items-center gap-2 text-sm text-white/60 hover:text-cyan-300 transition-colors">
            <Phone size={15} />
            {siteConfig.phone}
          </a>
          <Link href="/contact" className="btn-brass !py-2.5 !px-5 text-xs">
            Enquire Now <ArrowUpRight size={14} />
          </Link>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="lg:hidden text-white"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-[#08090f]">
          <nav className="container-px flex flex-col py-4">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium uppercase tracking-wide text-white/70 border-b border-white/5 last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="btn-brass mt-4 w-full">
              Enquire Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
