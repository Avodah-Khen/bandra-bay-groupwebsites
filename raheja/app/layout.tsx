import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "RahejaSpaces | Premium Real Estate",
  description: "RahejaSpaces — a modern real-estate developer platform with projects and enquiry management."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>
    <header className="nav">
      <div className="container navin">
        <Link className="brand" href="/">RAHEJASPACES</Link>
        <nav className="navlinks">
          <Link href="/about">About</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/projects?category=RESIDENTIAL">Residential</Link>
          <Link href="/projects?category=COMMERCIAL">Commercial</Link>
          <Link href="/projects?category=INDUSTRIAL">Industrial</Link>
          <Link href="/blog">Insights</Link>
          <Link href="/contact">Contact</Link>
          <Link className="btn" href="/contact">Enquire</Link>
        </nav>
      </div>
    </header>
    {children}
    <footer className="footer">
      <div className="container footergrid">
        <div><div className="brand">RAHEJASPACES</div><p className="small">Independent real-estate developer website and CRM implementation inspired by the information architecture of the supplied public reference website.</p></div>
        <div><b>Explore</b><p className="small"><Link href="/projects">Projects</Link><br/><Link href="/about">About</Link><br/><Link href="/blog">Insights</Link></p></div>
        <div><b>Connect</b><p className="small">Mumbai, Maharashtra<br/>India<br/><br/><Link href="/contact">Send an enquiry →</Link></p></div>
      </div>
    </footer>
  </>;
}
