import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-ink/10 bg-deep text-white/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <p className="font-display text-lg font-semibold text-white">Skyline Bay Residences</p>
          <p className="mt-2 text-sm">2, 3 &amp; 4 BHK residences in Andheri West, Mumbai. Demo project microsite.</p>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-white">Explore</p>
          <ul className="space-y-1 text-sm">
            <li><a href="#overview" className="hover:text-gold">Overview</a></li>
            <li><a href="#amenities" className="hover:text-gold">Amenities</a></li>
            <li><a href="#configurations" className="hover:text-gold">Configurations</a></li>
            <li><a href="#location" className="hover:text-gold">Location</a></li>
          </ul>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-white">Company</p>
          <ul className="space-y-1 text-sm">
            <li><Link href="/contact" className="hover:text-gold">Contact</Link></li>
            <li><Link href="/admin/login" className="hover:text-gold">Agent / Admin login</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-white">Connect</p>
          <ul className="space-y-1 text-sm">
            <li><a href="tel:+911800108009" className="hover:text-gold">1800 108 0009</a></li>
            <li><a href="mailto:sales@realty-platform.local" className="hover:text-gold">sales@realty-platform.local</a></li>
            <li>
              <a href="https://wa.me/919820000000" target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                WhatsApp us
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/50">
        Demo platform — placeholder content only, not a real, currently-marketed property. RERA
        numbers, prices, and specifications shown are illustrative.
      </div>
    </footer>
  );
}
