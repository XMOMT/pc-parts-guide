/**
 * Downloads cover + background for non-Steam games via RAWG API.
 * Free key: https://rawg.io/apidocs — set RAWG_API_KEY in .env.local
 *
 * RAWG requires visible attribution (see /credits and footer).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadEnvLocal } from "./load-env-local.mjs";
import { RAWG_GAME_SLUGS } from "./rawg-cover-map.mjs";

loadEnvLocal();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "games");
const sourcesPath = path.join(outDir, "image-sources.json");

const apiKey = process.env.RAWG_API_KEY;
if (!apiKey) {
  console.error(
    "Missing RAWG_API_KEY. Create .env.local with:\n  RAWG_API_KEY=your_key\nGet a free key at https://rawg.io/apidocs",
  );
  process.exit(1);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function download(url, dest) {
  const res = await fetch(url, {
    headers: { "User-Agent": "PC-Parts-Guide/1.0", Accept: "image/*,*/*" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 4000) throw new Error(`Too small (${buf.length} bytes)`);
  fs.writeFileSync(dest, buf);
}

async function fetchRawgGame(rawgSlug) {
  const url = `https://api.rawg.io/api/games/${encodeURIComponent(rawgSlug)}?key=${encodeURIComponent(apiKey)}`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`RAWG HTTP ${res.status} for ${rawgSlug}`);
  return res.json();
}

function loadSources() {
  if (!fs.existsSync(sourcesPath)) return {};
  return JSON.parse(fs.readFileSync(sourcesPath, "utf8"));
}

function saveSources(sources) {
  fs.writeFileSync(sourcesPath, `${JSON.stringify(sources, null, 2)}\n`, "utf8");
}

function pickBackgroundScreenshot(game) {
  const shots = game.short_screenshots ?? [];
  if (shots.length >= 2) return shots[1].image;
  if (shots.length >= 1) return shots[0].image;
  return game.background_image;
}

fs.mkdirSync(outDir, { recursive: true });
const sources = loadSources();

let ok = 0;
let fail = 0;

for (const [siteSlug, rawgSlug] of Object.entries(RAWG_GAME_SLUGS)) {
  const coverDest = path.join(outDir, `${siteSlug}.jpg`);
  const bgDest = path.join(outDir, `${siteSlug}-bg.jpg`);

  try {
    const game = await fetchRawgGame(rawgSlug);
    const coverUrl = game.background_image;
    if (!coverUrl) throw new Error("No background_image");

    await download(coverUrl, coverDest);
    console.log(`✓ RAWG cover ${siteSlug}`);

    const bgUrl = pickBackgroundScreenshot(game);
    if (bgUrl) {
      await download(bgUrl, bgDest);
      console.log(`✓ RAWG bg ${siteSlug}`);
    }

    sources[siteSlug] = {
      provider: "rawg",
      rawgId: game.id,
      rawgSlug: game.slug,
      rawgName: game.name,
      rawgUrl: `https://rawg.io/games/${game.slug}`,
      coverUrl,
      backgroundUrl: bgUrl ?? null,
      fetchedAt: new Date().toISOString().slice(0, 10),
    };
    saveSources(sources);
    ok++;
  } catch (err) {
    console.log(`✗ RAWG ${siteSlug}: ${err.message}`);
    fail++;
  }

  await sleep(400);
}

console.log(`\nRAWG done: ${ok} ok, ${fail} failed`);
console.log(`Attribution saved to ${path.relative(process.cwd(), sourcesPath)}`);
