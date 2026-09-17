import type { Metadata } from "next";
import PlaceholderPage from "@/components/layout/PlaceholderPage";

export const metadata: Metadata = {
  title: "High-End Builds",
  description: "High-end PC builds for 4K gaming, content creation, and max settings.",
};

export default function HighEndPage() {
  return (
    <PlaceholderPage
      title="High-End Builds"
      description="Top-tier builds for 4K gaming, ray tracing, and demanding creative workloads."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Budget", href: "/budget" },
        { label: "High-End", href: "/budget/high-end" },
      ]}
    />
  );
}
