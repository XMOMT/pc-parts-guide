import type { Metadata } from "next";
import BrowseCategories from "@/components/home/BrowseCategories";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: `${siteConfig.name} — PC Hardware for Your Games & Workloads`,
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <BrowseCategories />
      <HowItWorks />
    </>
  );
}
