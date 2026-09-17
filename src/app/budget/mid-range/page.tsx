import type { Metadata } from "next";
import PlaceholderPage from "@/components/layout/PlaceholderPage";

export const metadata: Metadata = {
  title: "Mid-Range Builds",
  description: "Mid-range PC builds for solid 1440p gaming and productivity.",
};

export default function MidRangePage() {
  return (
    <PlaceholderPage
      title="Mid-Range Builds"
      description="Balanced builds for 1440p gaming, streaming, and everyday productivity."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Budget", href: "/budget" },
        { label: "Mid-Range", href: "/budget/mid-range" },
      ]}
    />
  );
}
