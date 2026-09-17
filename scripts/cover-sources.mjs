/** Steam CDN only — no third-party scrapers (IGDB, Fandom, Epic promo URLs, etc.). */
export const FALLBACK_COVER_URLS = {};

/** In-game screenshot fallbacks — empty; use Steam API screenshots in download-covers.mjs only. */
export const FALLBACK_BACKGROUND_URLS = {};

/** Corrected Steam app IDs (also update STEAM_APP_IDS in classify.ts when adding). */
export const STEAM_ID_FIXES = {
  ghostrunner: 1139900,
  "call-of-duty-modern-warfare-2-2022": 1938090,
  "call-of-duty-modern-warfare-3-2023": 2519060,
  "final-fantasy-xvi": 2515020,
  "ea-sports-fc-23": 1811260,
  "marvels-avengers": 997070,
  "battlefield-v": 1238810,
  "call-of-duty-vanguard": 1985820,
  "split-fiction": 2001120,
  "f1-22": 1692250,
  "death-stranding-2": 3280350,
  "ninja-gaiden-4": 2627260,
};
