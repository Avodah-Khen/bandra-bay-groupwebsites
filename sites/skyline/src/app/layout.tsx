import type { Metadata } from 'next';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import StickyMobileCta from '@/components/StickyMobileCta';

export const metadata: Metadata = {
  title: {
    default: 'Skyline Bay Residences — 2, 3 & 4 BHK in Andheri West, Mumbai (Demo)',
    template: '%s | Skyline Bay Residences',
  },
  description:
    'Demo real-estate project microsite: 2, 3 & 4 BHK residences in Andheri West, Mumbai. Placeholder content for platform demonstration purposes.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: { type: 'website' },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 pb-14 md:pb-0">{children}</main>
        <SiteFooter />
        <StickyMobileCta />
      </body>
    </html>
  );
}
