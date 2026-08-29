"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { SITE } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function Header({ onInquire }: { onInquire?: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-[var(--ink)]/95 backdrop-blur-md shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
        <Link href="/" className="group flex flex-col leading-none">
          <span className="font-display text-2xl tracking-tight text-white md:text-[1.7rem]">
            {SITE.name}
          </span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.35em] text-[var(--brass-soft)]">
            Mumbai · Bandra Bay
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-white/80 transition hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={onInquire}
            className="btn-primary !py-2.5 !px-5"
          >
            Inquire Now
          </button>
        </nav>

        <button
          type="button"
          className="text-white md:hidden"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[var(--ink)] px-5 py-6 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-lg text-white"
              >
                {l.label}
              </Link>
            ))}
            <button
              type="button"
              className="btn-primary mt-2 w-full"
              onClick={() => {
                setOpen(false);
                onInquire?.();
              }}
            >
              Inquire Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
