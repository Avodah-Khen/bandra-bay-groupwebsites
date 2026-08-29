import { Suspense } from "react";
import InquiriesClient from "./InquiriesClient";

export default function InquiriesPage() {
  return (
    <Suspense fallback={<p className="text-sm text-slate-500">Loading CRM...</p>}>
      <InquiriesClient />
    </Suspense>
  );
}
