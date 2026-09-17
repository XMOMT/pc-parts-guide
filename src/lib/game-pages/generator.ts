import type { Game } from "@/lib/games";
import type { GamePageContent } from "./types";
import { classifyGame, STEAM_APP_IDS } from "./classify";
import {
  getBottlenecks,
  getPageSummary,
  getPerformanceNotes,
  getSettingsPreset,
} from "./game-content";
import { buildTierConfig } from "./hardware-templates";

export function generateGamePage(game: Game): GamePageContent {
  const meta = classifyGame(game.slug, game.year);
  const demand = meta.demandTier;

  const resolutions = ["1080p", "1440p", "4K"] as const;

  const tiers = resolutions.map((resolution) => ({
    id: `${resolution}-60`,
    resolution,
    targetFps: 60,
    rtOff: buildTierConfig(demand, resolution, false, game.title, game.genre),
    rtOn: buildTierConfig(demand, resolution, true, game.title, game.genre),
  }));

  const steamId = meta.steamAppId ?? STEAM_APP_IDS[game.slug];
  const coverImage = steamId ? `/games/${game.slug}.jpg` : undefined;

  return {
    slug: game.slug,
    title: game.title,
    coverImage,
    coverImageAlt: `${game.title} cover art`,
    summary: getPageSummary(game, meta),
    lastUpdated: "2026-03-06",
    settingsPreset: getSettingsPreset(game.genre, demand, meta.supportsRayTracing),
    upscalingSupport: meta.upscalingSupport,
    supportsRayTracing: meta.supportsRayTracing,
    performanceNotes: getPerformanceNotes(game, meta),
    tiers,
    bottlenecks: getBottlenecks(game.genre),
  };
}
