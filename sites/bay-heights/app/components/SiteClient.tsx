"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const PHONE = process.env.NEXT_PUBLIC_SITE_PHONE || "+918451919177";
const WA = process.env.NEXT_PUBLIC_WHATSAPP || "918451919177";

const gallery = [
  { src: "/images/gallery/gallery1.jpg", title: "Bay Heights — Horizon" },
  { src: "/images/gallery/gallery2.jpg", title: "Bay Heights — Waterfront" },
  { src: "/images/gallery/gallery3.jpg", title: "Bay Heights — Architecture" },
  { src: "/images/gallery/gallery4.jpg", title: "Bay Heights — Sunset" },
  { src: "/images/gallery/gallery5.jpg", title: "Bay Heights — Skyline" },
  { src: "/images/gallery/gallery6.jpg", title: "Bay Heights — Arrival" },
];

const nav = [
  ["about", "About"], ["offers", "Special Offers"], ["highlights", "Highlights"],
  ["gallery", "Gallery"], ["flagship", "Flagship Projects"], ["configurations", "Configurations"],
  ["contact", "Contact"], ["rera", "MahaRERA"],
];

export default function SiteClient() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [modal, setModal] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [sent, setSent] = useState(false);
  const [activeConfig, setActiveConfig] = useState("3 BHK");
  const [heroIndex, setHeroIndex] = useState(0);
  const heroImages = [
    "/images/hero/hero1.jpg",
    "/images/hero/hero2.jpg",
    "/images/hero/hero3.jpg",
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll(); window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setHeroIndex(i => (i + 1) % heroImages.length), 5500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setLightbox(null); setModal(false); }
      if (lightbox !== null && e.key === "ArrowRight") setLightbox((lightbox + 1) % gallery.length);
      if (lightbox !== null && e.key === "ArrowLeft") setLightbox((lightbox - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const res = await fetch(`${API_URL}/api/leads`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (res.ok) { setSent(true); form.reset(); setTimeout(() => setSent(false), 4500); }
  }

  const configData = useMemo(() => ({
    "2 BHK": { size: "1,250 sq.ft.*", note: "Elegant two-bedroom residences with bay-facing living spaces." },
    "3 BHK": { size: "1,750 sq.ft.*", note: "Generous three-bedroom residences designed for family living." },
    "4 BHK": { size: "2,400 sq.ft.*", note: "Expansive four-bedroom residences with premium entertaining zones." },
    "Penthouse": { size: "On Request", note: "Limited signature residences. Speak with the sales team for details." },
  } as Record<string, { size: string; note: string }>)[activeConfig], [activeConfig]);

  return (
    <main className="site-shell">
      <header className={`topbar ${scrolled ? "scrolled" : ""}`}>
        <a href="#home" className="brand"><img src="/images/logo/logo.jpg" alt="Bay Heights"/><span>HIRANANDANI BAY HEIGHTS</span></a>
        <button className="menu" onClick={() => setOpenMenu(v => !v)} aria-label="Open menu">☰</button>
        <nav className={`nav ${openMenu ? "open" : ""}`}>
          {nav.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setOpenMenu(false)}>{label}</a>)}
          <a href={`tel:${PHONE}`}>Call</a>
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-bg">
          <AnimatePresence mode="wait">
            <motion.img key={heroImages[heroIndex]} src={heroImages[heroIndex]} alt="Bay Heights waterfront architectural view" initial={{opacity:0,scale:1.04}} animate={{opacity:1,scale:1}} exit={{opacity:0}} transition={{duration:.7}} />
          </AnimatePresence>
          <div className="hero-dots" aria-label="Hero slides">
            {heroImages.map((_, i) => <button key={i} aria-label={`Show slide ${i+1}`} className={heroIndex === i ? "active" : ""} onClick={() => setHeroIndex(i)} />)}
          </div>
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9 }}>
            <div className="kicker">Bandra West · Mumbai · Hiranandani</div>
            <h1>Custodian of Bandra Bay&apos;s <em>First Horizon.</em></h1>
            <p>At the heart of Mumbai&apos;s western edge, a new expression of luxury emerges where architecture, wellness, community and the bay come together.</p>
            <div className="actions"><button className="btn primary" onClick={() => setModal(true)}>Make an Appointment</button><a className="btn" href={`https://wa.me/${WA}?text=Hi%2C%20I%20want%20details%20about%20Hiranandani%20Bay%20Heights`}>Price on Request</a></div>
          </motion.div>
        </div>
        <div className="hero-scroll">Scroll to explore <span>↓</span></div>
      </section>

      <section className="section" id="about">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow">About Hiranandani</div><h2>A new horizon, drawn by the bay.</h2></div><p className="lead">Across the world, water has called the future forward. Bandra Bay brings a global idea back to a local soul, creating a district where open promenades, cultural spaces and architectural harmony shape life by the water.</p></div>
          <div className="editorial-grid">
            <div className="image-panel tall"><img src="/images/about/about1.jpg" alt="Bay Heights overview" loading="lazy" /><span>01 / OVERVIEW</span></div>
            <div className="copy-panel"><div className="eyebrow">Hiranandani enters Bandra West</div><h3>Where the city meets the sea.</h3><p>Synonymous with architectural excellence and premium living, Hiranandani Group brings its legacy of innovation and quality to one of Mumbai&apos;s most iconic neighbourhoods.</p><p>Forty percent opens to light, air and calm, anchored by a green core and places of care.</p><button className="text-link" onClick={() => setModal(true)}>Request project details →</button></div>
          </div>
        </div>
      </section>

      <section className="section alt" id="offers">
        <div className="container offer-banner"><div><div className="eyebrow">Special Offers</div><h2>Priority access &amp; private presentation.</h2><p className="lead">Register your interest for current availability, launch benefits, floor plans and a private project presentation.</p></div><button className="btn dark" onClick={() => setModal(true)}>Register Interest</button></div>
      </section>

      <section className="section" id="highlights">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow">Highlights</div><h2>A coastline redefined.</h2></div><p className="lead">A landmark waterfront transformation supported by the Coastal Road, Metro and Sea Link — designed for a connected and enduring future.</p></div>
          <div className="highlight-grid">
            {[
              ["01","Waterfront district","Open promenades, cultural spaces and architectural harmony around the bay.","/images/highlights/highlight1.jpg"],
              ["02","Global connectivity","Coastal Road, Metro and Sea Link bring the address closer to the city.","/images/highlights/highlight2.jpg"],
              ["03","Green core","Space, light and calm create a more human waterfront environment.","/images/highlights/highlight3.jpg"],
              ["04","Premium arrival","A considered arrival experience with architecture and landscape working together.","/images/highlights/highlight4.jpg"],
              ["05","Bay-facing living","Designed around views, light and a more connected waterfront lifestyle.","/images/highlights/highlight5.jpg"],
              ["06","Landscape & wellness","Green spaces and amenity-led planning create room to pause and recharge.","/images/highlights/highlight6.jpg"]
            ].map(([n,t,d,img]) => <motion.div whileHover={{y:-8}} className="highlight-card" key={n}><img src={img} alt={t} loading="lazy"/><div><b>{n}</b><h3>{t}</h3><p>{d}</p></div></motion.div>)}
          </div>
          <div className="stat-row"><div className="stat"><strong>40%</strong><span>Open space</span></div><div className="stat"><strong>Bandra West</strong><span>Prime address</span></div><div className="stat"><strong>PR1180002501983</strong><span>MahaRERA</span></div></div>
        </div>
      </section>

      <section className="section gallery-section" id="gallery">
        <div className="container"><div className="section-head"><div><div className="eyebrow">Photos</div><h2>Life by the water&apos;s edge.</h2></div><p className="lead">Explore the project visual collection. Click any frame for the full-screen gallery.</p></div>
          <div className="gallery">{gallery.map((item, i) => <motion.button whileHover={{ scale: 1.015 }} className="gallery-card" key={item.src} onClick={() => setLightbox(i)}><img src={item.src} alt={item.title} loading={i < 3 ? "eager" : "lazy"}/><span>{String(i + 1).padStart(2, "0")}</span></motion.button>)}</div>
        </div>
      </section>

      <section className="section alt" id="configurations">
        <div className="container"><div className="section-head"><div><div className="eyebrow">Configurations</div><h2>Choose your residence.</h2></div><p className="lead">Configuration information is presented as a dynamic enquiry experience. Final areas, pricing and availability should be confirmed with the sales team.</p></div>
          <div className="config-wrap"><div className="config-tabs">{Object.keys(configData ? {"2 BHK":1,"3 BHK":1,"4 BHK":1,"Penthouse":1}:{}).map(x => <button key={x} className={activeConfig === x ? "active" : ""} onClick={() => setActiveConfig(x)}>{x}</button>)}</div><div className="config-result"><div><div className="eyebrow">Selected configuration</div><h3>{activeConfig}</h3><strong>{configData.size}</strong><p>{configData.note}</p><button className="btn dark" onClick={() => setModal(true)}>Get Price &amp; Floor Plan</button></div><img src="/images/configuration.jpg" alt="Residence configuration illustration" loading="lazy"/></div></div>
        </div>
      </section>

      <section className="section" id="flagship"><div className="container"><div className="section-head"><div><div className="eyebrow">Flagship Projects</div><h2>Explore the portfolio.</h2></div><p className="lead">Our flagship-project section is designed as an editable portfolio module for the CRM/CMS.</p></div><div className="flagship"><img src="/images/projects/flagship.jpg" alt="Flagship project illustration" loading="lazy"/><div><div className="eyebrow">Featured</div><h3>Vista Residences Oshiwara</h3><p>Book your online project presentation directly with the builder team.</p><div className="actions"><a className="btn dark" href="https://vistasresidences.com/" target="_blank" rel="noreferrer">Visit project</a><button className="btn dark" onClick={() => setModal(true)}>Book presentation</button></div></div></div></div></section>

      <section className="section appointment" id="contact"><div className="container"><div className="section-head"><div><div className="eyebrow">Make an Appointment</div><h2>Book a conversation.</h2></div><p className="lead light">Share your details. Every enquiry is stored in the CRM for sales follow-up.</p></div><LeadForm onSuccess={() => { setSent(true); setTimeout(() => setSent(false), 5000); }} />{sent && <div className="success">✓ Thank you — your enquiry has been recorded.</div>}</div></section>

      <section className="section alt" id="rera"><div className="container contact-grid"><div><div className="eyebrow">Experience Centre</div><h2>Come closer to the bay.</h2><p className="lead">4th floor, Bombay Art Gallery, Society, KC Marg, opp. Rang Sharda, Reclamation, Bandra West, Mumbai, Maharashtra 400050.</p><div className="contact-actions"><a className="btn dark" href={`tel:${PHONE}`}>Call {PHONE}</a><a className="btn dark" href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer">WhatsApp</a></div></div><div className="rera-card"><div className="eyebrow">MahaRERA</div><img src="/images/rera/rera.jpg" alt="MahaRERA information" loading="lazy"/><h3>PR1180002501983</h3><p>Verify project registration and approved information on the official MahaRERA portal.</p><a className="text-link" href="https://maharera.maharashtra.gov.in/" target="_blank" rel="noreferrer">Open MahaRERA →</a></div></div></section>

      <footer className="footer"><div className="footer-grid"><div><b>HIRANANDANI BAY HEIGHTS</b><span>BANDRA WEST · MUMBAI</span></div><div>© 2026 All rights reserved.</div><div><a href="#about">About</a><a href="#gallery">Gallery</a><a href="#contact">Contact</a><a href="#rera">MahaRERA</a></div></div></footer>
      <div className="floating-actions"><a href={`tel:${PHONE}`} aria-label="Call">☎</a><a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">◔</a></div>

      <AnimatePresence>{lightbox !== null && <motion.div className="lightbox" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setLightbox(null)}><button className="lb-close" onClick={() => setLightbox(null)}>×</button><button className="lb-prev" onClick={e => {e.stopPropagation();setLightbox((lightbox - 1 + gallery.length) % gallery.length)}}>‹</button><motion.img key={gallery[lightbox].src} initial={{scale:.94}} animate={{scale:1}} src={gallery[lightbox].src} alt={gallery[lightbox].title} onClick={e => e.stopPropagation()}/><button className="lb-next" onClick={e => {e.stopPropagation();setLightbox((lightbox + 1) % gallery.length)}}>›</button><div className="lb-caption">{gallery[lightbox].title} · {lightbox + 1}/{gallery.length}</div></motion.div>}</AnimatePresence>
      <AnimatePresence>{modal && <motion.div className="modal" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setModal(false)}><motion.div className="modal-card" initial={{y:25}} animate={{y:0}} onClick={e => e.stopPropagation()}><button className="close" onClick={() => setModal(false)}>×</button><div className="eyebrow">Private appointment</div><h2>Let&apos;s talk.</h2><p>Request pricing, floor plans, brochure or a private project presentation.</p><LeadForm onSuccess={() => { setModal(false); setSent(true); setTimeout(() => setSent(false), 5000); }} compact /></motion.div></motion.div>}</AnimatePresence>
    </main>
  );
}

function LeadForm({ onSuccess, compact = false }: { onSuccess: () => void; compact?: boolean }) {
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const form = e.currentTarget; const data = Object.fromEntries(new FormData(form).entries());
    const res = await fetch(`${API_URL}/api/leads`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (res.ok) { form.reset(); onSuccess(); }
  }
  return <form className={`form ${compact ? "compact" : ""}`} onSubmit={submit}><input name="name" required placeholder="Full Name *"/><input name="phone" required placeholder="Phone *"/><input name="email" type="email" placeholder="Email"/><select name="configuration" defaultValue=""><option value="" disabled>Preferred configuration</option><option>2 BHK</option><option>3 BHK</option><option>4 BHK</option><option>Penthouse</option></select>{!compact && <><input name="date" type="date"/><select name="source" defaultValue="website"><option value="website">Website</option><option value="google">Google</option><option value="social">Social</option><option value="referral">Referral</option></select></>}<textarea name="message" placeholder="Message / preferred requirement"/><button className="full">Submit Enquiry</button></form>;
}
