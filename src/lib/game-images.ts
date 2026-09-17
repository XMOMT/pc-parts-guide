import type { GamePageContent } from "@/lib/game-pages/types";

/** Main cover art shown in the page header card */
export function getGameCoverImage(slug: string, content?: GamePageContent | null) {
  return content?.coverImage ?? `/games/${slug}.jpg`;
}

/** Wide background art — separate from the header cover */
export function getGameBackgroundImage(slug: string) {
  return `/games/${slug}-bg.jpg`;
}
