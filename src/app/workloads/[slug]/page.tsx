import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import WorkloadCover from "@/components/workloads/WorkloadCover";
import WorkloadPhotoCredit from "@/components/workloads/WorkloadPhotoCredit";
import WorkloadPageBackground from "@/components/workloads/WorkloadPageBackground";
import WorkloadRequirementsPage from "@/components/workloads/WorkloadRequirementsPage";
import SearchBar from "@/components/home/SearchBar";
import {
  getWorkloadBySlug,
  getWorkloadPageContent,
  getWorkloadSlugs,
} from "@/lib/workload-pages";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getWorkloadSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = getWorkloadPageContent(slug);
  const workload = getWorkloadBySlug(slug);

  if (!content || !workload) {
    return { title: "Workload Not Found" };
  }

  return {
    title: `${content.title} PC Requirements — 1080p, 1440p & 4K`,
    description: content.summary,
  };
}

export default async function WorkloadPage({ params }: Props) {
  const { slug } = await params;
  const workload = getWorkloadBySlug(slug);
  const content = getWorkloadPageContent(slug);

  if (!workload || !content) {
    notFound();
  }

  return (
    <div className="relative min-h-[100dvh]">
      <WorkloadPageBackground slug={content.slug} />

      <div className="section-container relative z-10 py-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-surface-200/50">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/workloads" className="hover:text-white">
            Workloads
          </Link>
          <span className="mx-2">/</span>
          <span className="text-surface-200">{workload.title}</span>
        </nav>

        <div className="mb-8 mt-2">
          <SearchBar />
        </div>

        <h1 className="section-title">{workload.title} — PC Requirements</h1>

        <WorkloadCover
          slug={content.slug}
          title={workload.title}
          alt={content.coverImageAlt}
        />
        <WorkloadPhotoCredit slug={content.slug} />

        <p className="mt-4 max-w-2xl text-surface-200/70">{workload.description}</p>

        <div className="mt-10">
          <WorkloadRequirementsPage content={content} />
        </div>
      </div>
    </div>
  );
}
