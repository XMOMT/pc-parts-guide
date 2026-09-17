import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const url =
  "https://store-images.s-microsoft.com/image/apps.55625.13510798886196618.9c98f0f8-cdcd-4a05-b38b-77dc6ca48ee2.c4cc33f6-394c-49a1-a250-d8881abd00a8?q=90&w=1920&h=1080";
const dest = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
  "games",
  "forza-horizon-3-bg.jpg"
);

fs.mkdirSync(path.dirname(dest), { recursive: true });

const res = await fetch(url, {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept: "image/*,*/*",
    Referer: "https://www.xbox.com/",
  },
  redirect: "follow",
});

if (!res.ok) {
  console.error(`HTTP ${res.status}`);
  process.exit(1);
}

const buf = Buffer.from(await res.arrayBuffer());
fs.writeFileSync(dest, buf);
console.log(`Saved ${dest}`);
console.log(`Size: ${buf.length} bytes`);
