import type { Metadata } from "next";
import Link from "next/link";
import GamesList from "@/components/games/GamesList";
import EditorialDisclaimer from "@/components/legal/EditorialDisclaimer";
import { games } from "@/lib/games";

export const metadata: Metadata = {
  title: "AAA PC Games",
  description: `Browse PC hardware requirements for ${games.length} AAA games released since 2015.`,
};

export default function GamesHubPage() {
  return (
    <div className="section-container py-16">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-surface-200/50">
        <Link href="/" className="hover:text-white">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-surface-200">Games</span>
      </nav>

      <h1 className="section-title">AAA PC Games Since 2015</h1>
      <p className="mt-4 max-w-2xl text-surface-200/70">
        {games.length} major PC releases and ports — select a title for hardware
        requirements and build recommendations.
      </p>
      <EditorialDisclaimer className="mt-4 max-w-2xl" />

      <div className="mt-10">
        <GamesList games={games} />
      </div>
    </div>
  );
}
