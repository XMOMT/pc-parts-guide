import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  FALLBACK_BACKGROUND_URLS,
  FALLBACK_COVER_URLS,
  headersForUrl,
} from "./cover-sources.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "games");

async function download(url, dest) {
  const res = await fetch(url, {
    headers: headersForUrl(url),
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 5000) throw new Error(`Too small (${buf.length} bytes)`);
  fs.writeFileSync(dest, buf);
  console.log(`✓ ${path.basename(dest)} (${buf.length} bytes)`);
}

const jobs = [
  ["fortnite.jpg", FALLBACK_COVER_URLS.fortnite],
  ["forza-horizon-3-bg.jpg", FALLBACK_BACKGROUND_URLS["forza-horizon-3"]],
  [
    "call-of-duty-black-ops-4-bg.jpg",
    FALLBACK_BACKGROUND_URLS["call-of-duty-black-ops-4"],
  ],
  ["gears-of-war-4-bg.jpg", FALLBACK_BACKGROUND_URLS["gears-of-war-4"]],
];

for (const [file, url] of jobs) {
  await download(url, path.join(outDir, file));
}

console.log("Done.");
