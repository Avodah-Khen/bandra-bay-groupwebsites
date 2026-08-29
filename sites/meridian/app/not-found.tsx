import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#08090f] text-center px-6 relative overflow-hidden">
      <div className="aurora-blob bg-violet-600 w-96 h-96 top-1/3 left-1/2 -translate-x-1/2 opacity-30" />
      <div className="relative">
        <div className="font-display text-7xl text-gradient font-semibold">404</div>
        <p className="text-white/50 mt-3">This page doesn&apos;t exist or has been moved.</p>
        <Link href="/" className="btn-brass inline-flex mt-6">Back to Home</Link>
      </div>
    </div>
  );
}
