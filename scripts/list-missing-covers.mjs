import fs from "fs";

const gamesSrc = fs.readFileSync("src/lib/games.ts", "utf8");
const allSlugs = [...gamesSrc.matchAll(/slug: "([a-z0-9-]+)"/g)].map((m) => m[1]);

const coverDir = "public/games";
const existing = new Set(
  fs.readdirSync(coverDir).filter((f) => f.endsWith(".jpg")).map((f) => f.replace(".jpg", ""))
);

const missing = allSlugs.filter((s) => !existing.has(s));
console.log(`Missing covers (${missing.length}):`);
missing.forEach((s) => console.log(s));
