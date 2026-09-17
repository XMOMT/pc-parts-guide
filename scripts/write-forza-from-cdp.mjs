import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const cdpLog =
  process.argv[2] ||
  "C:\\Users\\Benas\\.cursor\\browser-logs\\cdp-response-Runtime.evaluate-2026-09-08T18-14-59-550Z.json";
const dest = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
  "games",
  "forza-horizon-3-bg.jpg"
);

const raw = fs.readFileSync(cdpLog, "utf8");
const outer = JSON.parse(raw);
const inner = JSON.parse(outer.result.result.value);
if (!inner.ok) throw new Error(`Fetch failed: ${inner.status ?? "unknown"}`);

fs.mkdirSync(path.dirname(dest), { recursive: true });
const buf = Buffer.from(inner.b64, "base64");
fs.writeFileSync(dest, buf);
console.log(`Saved ${dest}`);
console.log(`Size: ${buf.length} bytes`);
