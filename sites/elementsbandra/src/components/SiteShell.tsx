"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { InquireModal } from "./InquireModal";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const [open, setOpen] = useState(false);

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header onInquire={() => setOpen(true)} />
      <main>{children}</main>
      <Footer />
      <InquireModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
