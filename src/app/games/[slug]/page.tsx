import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GameCover from "@/components/games/GameCover";
import GamePageBackground from "@/components/games/GamePageBackground";
import EditorialDisclaimer from "@/components/legal/EditorialDisclaimer";
import GameRequirementsPage from "@/components/games/GameRequirementsPage";
import SearchBar from "@/components/home/SearchBar";
import { getGameCoverImage } from "@/lib/game-images";
import { getGamePageContent } from "@/lib/game-pages";
import { getGameBySlug, getGameSlugs } from "@/lib/games";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getGameSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  const content = getGamePageContent(slug);

  if (!game) {
    return { title: "Game Not Found" };
  }

  if (content) {
    return {
      title: `${content.title} PC Requirements — 60 & 120 FPS at 1080p, 1440p & 4K`,
      description: content.summary,
    };
  }

  return {
    title: `${game.title} PC Requirements`,
    description: `Find the right PC hardware to run ${game.title} at your target settings and frame rate. ${game.description}`,
  };
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  const content = getGamePageContent(slug);

  if (!game) {
    notFound();
  }

  return (
    <div className="relative min-h-[100dvh]">
      <GamePageBackground slug={slug} />

      <div className="section-container relative z-10 py-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-surface-200/50">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/games" className="hover:text-white">
            Games
          </Link>
          <span className="mx-2">/</span>
          <span className="text-surface-200">{game.title}</span>
        </nav>

        <div className="mb-8 mt-2">
          <SearchBar />
        </div>

        <h1 className="section-title">{game.title} — PC Requirements</h1>

        <GameCover
          slug={slug}
          title={game.title}
          src={getGameCoverImage(slug, content)}
          alt={content?.coverImageAlt}
        />

        <EditorialDisclaimer className="mt-4 max-w-3xl" />

        {content ? (
          <div className="mt-10">
            <GameRequirementsPage content={content} />
          </div>
        ) : (
          <>
            <p className="mt-4 max-w-2xl text-surface-200/70">{game.description}</p>
            <p className="mt-8 rounded-lg border border-dashed border-surface-800 bg-surface-900/50 p-6 text-sm text-surface-200/50">
              Detailed hardware tiers and build recommendations coming soon.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
