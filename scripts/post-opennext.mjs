import { existsSync } from "node:fs";

const required = [".open-next/worker.js", ".open-next/assets"];

for (const path of required) {
  if (!existsSync(path)) {
    console.error(`ERROR: Missing required build artifact: ${path}`);
    process.exit(1);
  }
}

console.log("OpenNext build artifacts verified (worker.js + assets).");
