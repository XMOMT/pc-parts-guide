import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { FALLBACK_COVER_URLS, STEAM_ID_FIXES } from "./cover-sources.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "games");

const STEAM_CDN = (id) =>
  `https://cdn.akamai.steamstatic.com/steam/apps/${id}/header.jpg`;

async function download(url, dest) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      Accept: "image/*,*/*",
    },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const type = res.headers.get("content-type") || "";
  if (!type.includes("image") && !type.includes("octet-stream")) {
    throw new Error(`Not an image (${type})`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 5000) throw new Error(`Too small (${buf.length} bytes)`);
  fs.writeFileSync(dest, buf);
}

// Read missing slugs
const gamesSrc = fs.readFileSync(path.join(__dirname, "..", "src", "lib", "games.ts"), "utf8");
const allSlugs = [...gamesSrc.matchAll(/slug: "([a-z0-9-]+)"/g)].map((m) => m[1]);
const existing = new Set(
  fs.existsSync(outDir)
    ? fs.readdirSync(outDir).filter((f) => f.endsWith(".jpg")).map((f) => f.replace(".jpg", ""))
    : []
);
const missing = allSlugs.filter((s) => !existing.has(s));

console.log(`Attempting ${missing.length} missing covers...\n`);

let ok = 0;
let fail = 0;

for (const slug of missing) {
  const dest = path.join(outDir, `${slug}.jpg`);
  const urls = [];

  if (FALLBACK_COVER_URLS[slug]) urls.push(FALLBACK_COVER_URLS[slug]);
  if (STEAM_ID_FIXES[slug]) urls.push(STEAM_CDN(STEAM_ID_FIXES[slug]));

  // Try classify.ts steam id as last resort
  const classifySrc = fs.readFileSync(
    path.join(__dirname, "..", "src", "lib", "game-pages", "classify.ts"),
    "utf8"
  );
  const match = classifySrc.match(new RegExp(`"${slug}":\\s*(\\d+)`));
  if (match && Number(match[1]) > 0) {
    urls.push(STEAM_CDN(match[1]));
  }

  let saved = false;
  for (const url of [...new Set(urls)]) {
    try {
      await download(url, dest);
      console.log(`✓ ${slug} ← ${url}`);
      ok++;
      saved = true;
      break;
    } catch (e) {
      // try next source
    }
  }
  if (!saved) {
    console.log(`✗ ${slug} (all sources failed)`);
    fail++;
  }
}

console.log(`\nDone: ${ok} downloaded, ${fail} still missing`);
