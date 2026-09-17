import type { Metadata } from "next";
import LegalDocumentLayout from "@/components/legal/LegalDocumentLayout";
import PrivacyPolicyContent from "@/components/legal/PrivacyPolicyContent";
import { legalLastUpdated } from "@/lib/legal/constants";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your information — including contact forms, cookies, ads, and affiliate links.`,
};

export default function PrivacyPage() {
  return (
    <LegalDocumentLayout
      title="Privacy Policy"
      description="How we handle personal data when you browse the site, use the contact form, view ads, or follow affiliate links."
      lastUpdated={legalLastUpdated}
    >
      <PrivacyPolicyContent />
    </LegalDocumentLayout>
  );
}
