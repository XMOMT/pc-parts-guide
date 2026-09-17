import type { GamePageContent } from "./types";

const gamePageRegistry: Record<string, GamePageContent> = {};

export function registerGamePage(content: GamePageContent) {
  gamePageRegistry[content.slug] = content;
}

export function getGamePageContent(slug: string): GamePageContent | undefined {
  return gamePageRegistry[slug];
}

export function getDetailedGameSlugs(): string[] {
  return Object.keys(gamePageRegistry);
}
