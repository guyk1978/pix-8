import { copyFileSync, existsSync } from "node:fs";

const workerSrc = ".open-next/worker.js";
const workerDest = ".open-next/_worker.js";

if (!existsSync(workerSrc)) {
  console.error("ERROR: .open-next/worker.js not found after OpenNext build.");
  process.exit(1);
}

copyFileSync(workerSrc, workerDest);
console.log("Copied worker.js to _worker.js for Cloudflare Pages Advanced Mode.");

if (!existsSync(".open-next/assets")) {
  console.warn("WARN: .open-next/assets directory not found.");
}

console.log("Deploy output: .open-next (worker + static assets)");
