import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { WORKLOAD_IMAGE_SOURCES } from "./workload-cover-sources.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "workloads");

async function download(url, dest) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      Accept: "image/*,*/*",
    },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 3000) throw new Error(`Too small (${buf.length} bytes)`);
  fs.writeFileSync(dest, buf);
  console.log(`  wrote ${dest} (${buf.length} bytes)`);
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  const credits = [
    "Workload page images — Unsplash License (https://unsplash.com/license)",
    "",
  ];

  for (const [slug, sources] of Object.entries(WORKLOAD_IMAGE_SOURCES)) {
    console.log(slug);
    await download(sources.cover, path.join(outDir, `${slug}.jpg`));
    await download(sources.background, path.join(outDir, `${slug}-bg.jpg`));
    credits.push(`${slug}: ${sources.credit}`);
  }

  fs.writeFileSync(path.join(outDir, "CREDITS.txt"), credits.join("\n") + "\n");
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
