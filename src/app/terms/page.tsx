import type { Metadata } from "next";
import LegalDocumentLayout from "@/components/legal/LegalDocumentLayout";
import TermsOfServiceContent from "@/components/legal/TermsOfServiceContent";
import { legalLastUpdated } from "@/lib/legal/constants";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms for using ${siteConfig.name} — informational content, affiliate disclosure, advertising, and limitations of liability.`,
};

export default function TermsPage() {
  return (
    <LegalDocumentLayout
      title="Terms of Service"
      description="Rules and disclaimers for using our hardware guides, including affiliate links and third-party advertising."
      lastUpdated={legalLastUpdated}
    >
      <TermsOfServiceContent />
    </LegalDocumentLayout>
  );
}
