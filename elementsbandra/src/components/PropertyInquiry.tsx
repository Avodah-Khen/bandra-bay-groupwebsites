"use client";

import { InquiryForm } from "./InquiryForm";

export function PropertyInquiry({
  propertyId,
  propertySlug,
  propertyName,
}: {
  propertyId: string;
  propertySlug: string;
  propertyName: string;
}) {
  return (
    <InquiryForm
      source={`project:${propertyName}`}
      propertyId={propertyId}
      propertySlug={propertySlug}
      compact={false}
    />
  );
}
