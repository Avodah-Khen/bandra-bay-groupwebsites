import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = { title:"Hiranandani Bay Heights Bandra", description:"Luxury residential project landing page with CRM." };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>;}
