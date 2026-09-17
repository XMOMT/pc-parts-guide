import type { Metadata } from "next";
import LegalDocumentLayout from "@/components/legal/LegalDocumentLayout";
import AdChoicesContent from "@/components/legal/AdChoicesContent";
import { legalLastUpdated } from "@/lib/legal/constants";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Ad Choices",
  description: `Advertising and opt-out choices for ${siteConfig.name}.`,
};

export default function AdChoicesPage() {
  return (
    <LegalDocumentLayout
      title="Ad Choices"
      description="How to control personalized advertising and related cookies on this site."
      lastUpdated={legalLastUpdated}
    >
      <AdChoicesContent />
    </LegalDocumentLayout>
  );
}
