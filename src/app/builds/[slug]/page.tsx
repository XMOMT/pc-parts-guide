import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BuildGuidePage from "@/components/builds/BuildGuidePage";
import { getBuildPageContent, getAllBuildSlugs } from "@/lib/build-pages";
import { cpuBuildCards, gpuBuildCards } from "@/lib/data";

const buildPages = [...gpuBuildCards, ...cpuBuildCards];

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllBuildSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = getBuildPageContent(slug);

  if (!content) {
    return { title: "Build Guide Not Found" };
  }

  return {
    title: `${content.title} — 2026 Gaming Picks`,
    description: content.summary,
  };
}

export default async function BuildPage({ params }: Props) {
  const { slug } = await params;
  const content = getBuildPageContent(slug);
  const card = buildPages.find((b) => b.href === `/builds/${slug}`);

  if (!content || !card) {
    notFound();
  }

  return (
    <div className="section-container py-16">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-surface-200/50">
        <Link href="/" className="hover:text-white">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/#gaming-heading" className="hover:text-white">
          Gaming
        </Link>
        <span className="mx-2">/</span>
        <span className="text-surface-200">{content.title}</span>
      </nav>

      <h1 className="section-title">{content.title}</h1>
      <p className="mt-2 text-sm text-surface-200/50">{card.description}</p>

      <div className="mt-10">
        <BuildGuidePage content={content} />
      </div>
    </div>
  );
}
