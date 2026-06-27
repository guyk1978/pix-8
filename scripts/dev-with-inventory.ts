import { spawn, type ChildProcess } from "node:child_process";
import { watch } from "node:fs";
import { join } from "node:path";
import { generateInventory } from "./generate-inventory";
import { generateExampleImages } from "./generate-example-images-lib";
import { setupMlAssets } from "./setup-ml-assets-lib";

const WATCH_PATHS = [
  join("src", "lib", "tools.ts"),
  join("src", "lib", "blog.ts"),
  join("src", "content", "articles"),
  join("public", "examples"),
];

let debounce: ReturnType<typeof setTimeout> | null = null;
let nextDev: ChildProcess | null = null;

function refreshExampleImages(reason: string) {
  try {
    const output = generateExampleImages();
    console.log(`[example-images] updated (${reason}) → ${output}`);
  } catch (error) {
    console.error("[example-images] failed to regenerate:", error);
  }
}

function refreshInventory(reason: string) {
  try {
    const output = generateInventory();
    console.log(`[inventory] updated (${reason}) → ${output}`);
  } catch (error) {
    console.error("[inventory] failed to regenerate:", error);
  }
}

function scheduleRefresh(reason: string) {
  if (debounce) clearTimeout(debounce);
  debounce = setTimeout(() => {
    if (reason.includes("examples")) {
      refreshExampleImages(reason);
      return;
    }
    refreshInventory(reason);
  }, 250);
}

function startWatcher() {
  for (const target of WATCH_PATHS) {
    watch(target, { recursive: true }, (_event, fileName) => {
      const label = fileName ? `${target}/${fileName}` : target;
      scheduleRefresh(label);
    });
  }
}

function startNextDev() {
  nextDev = spawn("npx", ["next", "dev"], {
    stdio: "inherit",
    shell: true,
    cwd: process.cwd(),
  });

  nextDev.on("exit", (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }
    process.exit(code ?? 0);
  });
}

function shutdown(signal: NodeJS.Signals) {
  if (nextDev && !nextDev.killed) {
    nextDev.kill(signal);
  }
  process.exit(0);
}

void setupMlAssets()
  .then(() => {
    console.log("[ml-assets] ready");
    refreshInventory("startup");
    refreshExampleImages("startup");
    startWatcher();
    startNextDev();
  })
  .catch((error) => {
    console.error("[ml-assets] setup failed:", error);
    process.exit(1);
  });

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
