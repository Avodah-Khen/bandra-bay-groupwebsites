import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aurelia Realty | Discover the Difference',
  description: 'Premium real estate website with integrated CRM.',
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}
