import { withBasePath } from "@/lib/base-path";
import type { GamePageContent } from "@/lib/game-pages/types";

function normalizeCoverPath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

/** Main cover art shown in the page header card */
export function getGameCoverImage(slug: string, content?: GamePageContent | null) {
  const path = content?.coverImage ?? `/games/${slug}.jpg`;
  return withBasePath(normalizeCoverPath(path));
}

/** Wide background art — separate from the header cover */
export function getGameBackgroundImage(slug: string) {
  return withBasePath(`/games/${slug}-bg.jpg`);
}
