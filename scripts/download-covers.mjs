import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { FALLBACK_BACKGROUND_URLS, FALLBACK_COVER_URLS, STEAM_ID_FIXES } from "./cover-sources.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "games");
const forceBackgrounds = process.argv.includes("--force-bg");
const forceCovers = process.argv.includes("--force-cover");

const STEAM_COVER_LEGACY = (id) =>
  `https://cdn.akamai.steamstatic.com/steam/apps/${id}/header.jpg`;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const appDetailsCache = new Map();

async function fetchSteamAppDetails(steamId) {
  if (appDetailsCache.has(steamId)) {
    return appDetailsCache.get(steamId);
  }

  const apiUrl = `https://store.steampowered.com/api/appdetails?appids=${steamId}&l=english`;
  const res = await fetch(apiUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      Accept: "application/json,*/*",
    },
  });

  if (!res.ok) throw new Error(`Steam API HTTP ${res.status}`);

  const json = await res.json();
  const entry = json[String(steamId)];
  if (!entry?.success) throw new Error("Steam app not found");

  appDetailsCache.set(steamId, entry.data);
  await sleep(300);
  return entry.data;
}

async function steamCoverUrls(steamId) {
  const urls = [STEAM_COVER_LEGACY(steamId)];
  try {
    const data = await fetchSteamAppDetails(steamId);
    if (data?.header_image) urls.unshift(data.header_image);
  } catch {
    // legacy only
  }
  return [...new Set(urls)];
}

async function download(url, dest) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      Accept: "image/*,*/*",
    },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 5000) throw new Error(`Too small (${buf.length} bytes)`);
  fs.writeFileSync(dest, buf);
}

/** Pick an in-game screenshot — skip the first when more are available. */
function pickSteamScreenshot(screenshots) {
  if (!screenshots?.length) return null;
  const index =
    screenshots.length >= 3 ? 2 : screenshots.length >= 2 ? 1 : 0;
  return screenshots[index].path_full;
}

const screenshotCache = new Map();

async function fetchSteamScreenshotUrl(steamId) {
  if (screenshotCache.has(steamId)) {
    return screenshotCache.get(steamId);
  }

  const data = await fetchSteamAppDetails(steamId);
  const screenshotUrl = pickSteamScreenshot(data?.screenshots);
  if (!screenshotUrl) throw new Error("No Steam screenshots");

  screenshotCache.set(steamId, screenshotUrl);
  return screenshotUrl;
}

const idsPath = path.join(__dirname, "..", "src", "lib", "game-pages", "classify.ts");
const source = fs.readFileSync(idsPath, "utf8");
const matches = [...source.matchAll(/"([a-z0-9-]+)":\s*(\d+)/g)];
const steamEntries = matches
  .filter(([, , id]) => Number(id) > 0)
  .map(([, slug, id]) => [slug, Number(id)]);

const gamesSrc = fs.readFileSync(path.join(__dirname, "..", "src", "lib", "games.ts"), "utf8");
const allSlugs = [...gamesSrc.matchAll(/slug: "([a-z0-9-]+)"/g)].map((m) => m[1]);

fs.mkdirSync(outDir, { recursive: true });

let ok = 0;
let fail = 0;

for (const slug of allSlugs) {
  const dest = path.join(outDir, `${slug}.jpg`);
  if (fs.existsSync(dest) && !forceCovers) {
    ok++;
  } else {
    const steamId =
      STEAM_ID_FIXES[slug] ?? steamEntries.find(([s]) => s === slug)?.[1];
    const urls = [];
    if (steamId) {
      try {
        urls.push(...(await steamCoverUrls(steamId)));
      } catch {
        urls.push(STEAM_COVER_LEGACY(steamId));
      }
    }
    if (FALLBACK_COVER_URLS[slug]) urls.push(FALLBACK_COVER_URLS[slug]);

    let saved = false;
    for (const url of [...new Set(urls)]) {
      try {
        await download(url, dest);
        console.log(`✓ cover ${slug}`);
        ok++;
        saved = true;
        break;
      } catch {
        // try next
      }
    }

    if (!saved) {
      console.log(`✗ cover ${slug}`);
      fail++;
    }
  }
}

let bgOk = 0;
let bgFail = 0;

console.log("\nDownloading in-game screenshot backgrounds...");

for (const slug of allSlugs) {
  const dest = path.join(outDir, `${slug}-bg.jpg`);
  if (fs.existsSync(dest) && !forceBackgrounds) {
    bgOk++;
    continue;
  }

  const steamId =
    STEAM_ID_FIXES[slug] ?? steamEntries.find(([s]) => s === slug)?.[1];

  const urls = [];
  if (steamId) {
    try {
      urls.push(await fetchSteamScreenshotUrl(steamId));
    } catch {
      // fall through to manual fallbacks
    }
  }
  if (FALLBACK_BACKGROUND_URLS[slug]) urls.push(FALLBACK_BACKGROUND_URLS[slug]);

  let saved = false;
  for (const url of [...new Set(urls)]) {
    try {
      await download(url, dest);
      console.log(`✓ bg ${slug}`);
      bgOk++;
      saved = true;
      break;
    } catch {
      // try next source
    }
  }

  if (!saved) {
    console.log(`✗ bg ${slug}`);
    bgFail++;
  }
}

console.log(`\nDone: ${ok} covers, ${fail} cover failures`);
console.log(`Backgrounds: ${bgOk} saved, ${bgFail} failed`);
