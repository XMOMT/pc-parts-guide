import type { Metadata } from "next";
import Link from "next/link";
import WorkloadsList from "@/components/workloads/WorkloadsList";
import { workloads } from "@/lib/workload-pages";

export const metadata: Metadata = {
  title: "Creative Workloads",
  description:
    "PC hardware guides for photo editing, video editing, and 3D rendering at 1080p, 1440p, and 4K.",
};

export default function WorkloadsHubPage() {
  return (
    <div className="section-container py-16">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-surface-200/50">
        <Link href="/" className="hover:text-white">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-surface-200">Workloads</span>
      </nav>

      <h1 className="section-title">Creative Workloads</h1>
      <p className="mt-4 max-w-2xl text-surface-200/70">
        Hardware recommendations for photo, video, and 3D workflows — pick a category to
        see minimum and recommended specs at 1080p, 1440p, and 4K output targets.
      </p>

      <div className="mt-10">
        <WorkloadsList workloads={workloads} />
      </div>
    </div>
  );
}
