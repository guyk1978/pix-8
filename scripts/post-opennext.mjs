import { copyFileSync, existsSync } from "node:fs";

const workerSrc = ".open-next/worker.js";
const workerDest = ".open-next/_worker.js";

if (!existsSync(workerSrc)) {
  console.error("ERROR: .open-next/worker.js not found after OpenNext build.");
  process.exit(1);
}

if (!existsSync(".open-next/assets")) {
  console.error("ERROR: .open-next/assets not found after OpenNext build.");
  process.exit(1);
}

copyFileSync(workerSrc, workerDest);
console.log("Pages: copied worker.js -> _worker.js (Advanced Mode)");
console.log("Output directory: .open-next");
