import type { Metadata } from "next";
import LegalDocumentLayout from "@/components/legal/LegalDocumentLayout";
import ImageCreditsContent from "@/components/legal/ImageCreditsContent";
import { legalLastUpdated } from "@/lib/legal/constants";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Image Credits",
  description: `Trademark and image attribution for ${siteConfig.name} — game artwork and workload photography.`,
};

export default function CreditsPage() {
  return (
    <LegalDocumentLayout
      title="Image credits"
      description="Attribution for photography and policies for game artwork used on this site."
      lastUpdated={legalLastUpdated}
    >
      <ImageCreditsContent />
    </LegalDocumentLayout>
  );
}
