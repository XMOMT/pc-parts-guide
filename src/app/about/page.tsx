import type { Metadata } from "next";
import LegalDocumentLayout from "@/components/legal/LegalDocumentLayout";
import AboutContent from "@/components/legal/AboutContent";
import EditorialDisclaimer from "@/components/legal/EditorialDisclaimer";
import { legalLastUpdated } from "@/lib/legal/constants";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name} — how we recommend PC hardware for games and workloads.`,
};

export default function AboutPage() {
  return (
    <LegalDocumentLayout
      title="About"
      description="Who we are and how we think about hardware recommendations."
      lastUpdated={legalLastUpdated}
    >
      <AboutContent />
      <EditorialDisclaimer className="mt-8 border-t border-surface-800 pt-6" />
    </LegalDocumentLayout>
  );
}
