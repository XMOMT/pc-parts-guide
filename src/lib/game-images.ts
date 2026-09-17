import { withBasePath } from "@/lib/base-path";
import type { GamePageContent } from "@/lib/game-pages/types";

function normalizeCoverPath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

/** Path under `public/` (no basePath). Use with Next.js APIs that add basePath automatically. */
export function getGameCoverPath(slug: string, content?: GamePageContent | null) {
  return normalizeCoverPath(content?.coverImage ?? `/games/${slug}.jpg`);
}

/** Full URL for `<img>` / CSS on GitHub Pages and local dev. */
export function getGameCoverImage(slug: string, content?: GamePageContent | null) {
  return withBasePath(getGameCoverPath(slug, content));
}

export function getGameBackgroundImage(slug: string) {
  return withBasePath(`/games/${slug}-bg.jpg`);
}
