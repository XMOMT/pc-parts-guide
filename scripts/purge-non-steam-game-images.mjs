/**
 * Removes cover/background files only for games explicitly listed with Steam app ID 0.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "games");
const classifyPath = path.join(__dirname, "..", "src", "lib", "game-pages", "classify.ts");
const source = fs.readFileSync(classifyPath, "utf8");
const start = source.indexOf("export const STEAM_APP_IDS");
const end = source.indexOf("};", start);
const block = source.slice(start, end + 2);
const idMatches = [...block.matchAll(/"([a-z0-9-]+)":\s*(\d+)/g)];
const steamBySlug = Object.fromEntries(idMatches.map(([, slug, id]) => [slug, Number(id)]));

const gamesPath = path.join(__dirname, "..", "src", "lib", "games.ts");
const slugs = [...fs.readFileSync(gamesPath, "utf8").matchAll(/slug: "([a-z0-9-]+)"/g)].map(
  (m) => m[1],
);

let removed = 0;
for (const slug of slugs) {
  if (steamBySlug[slug] !== 0) continue;

  for (const suffix of ["", "-bg"]) {
    const file = path.join(outDir, `${slug}${suffix}.jpg`);
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      console.log(`removed ${path.basename(file)}`);
      removed++;
    }
  }
}

console.log(`Done. Removed ${removed} file(s).`);
