import { games } from "@/lib/games";
import { generateGamePage } from "./generator";
import { registerGamePage } from "./registry";

const CUSTOM_PAGES = new Set(["the-witcher-3"]);

for (const game of games) {
  if (CUSTOM_PAGES.has(game.slug)) continue;
  registerGamePage(generateGamePage(game));
}
