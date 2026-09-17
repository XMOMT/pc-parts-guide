import type { Metadata } from "next";
import PlaceholderPage from "@/components/layout/PlaceholderPage";

export const metadata: Metadata = {
  title: "Budget Builds",
  description: "PC build recommendations by budget tier — from entry-level to high-end.",
};

export default function BudgetPage() {
  return (
    <PlaceholderPage
      title="Budget Builds"
      description="Compare build recommendations across budget tiers to find the best value for your needs."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Budget Builds", href: "/budget" }]}
    />
  );
}
