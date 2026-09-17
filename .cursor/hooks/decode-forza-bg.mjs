import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const b64Path = path.join(root, "scripts", "forza.b64");
const dest = path.join(root, "public", "games", "forza-horizon-3-bg.jpg");
const expectedLen = 692520;

if (!fs.existsSync(b64Path)) process.exit(0);
const b64 = fs.readFileSync(b64Path, "utf8").trim();
if (b64.length < expectedLen) process.exit(0);

fs.mkdirSync(path.dirname(dest), { recursive: true });
const buf = Buffer.from(b64, "base64");
fs.writeFileSync(dest, buf);
console.log(`Saved ${dest} (${buf.length} bytes)`);
