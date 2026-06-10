import { spawn, type ChildProcess } from "node:child_process";
import { watch } from "node:fs";
import { join } from "node:path";
import { generateInventory } from "./generate-inventory";

const WATCH_PATHS = [
  join("src", "lib", "tools.ts"),
  join("src", "content", "articles"),
];

let debounce: ReturnType<typeof setTimeout> | null = null;
let nextDev: ChildProcess | null = null;

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
  debounce = setTimeout(() => refreshInventory(reason), 250);
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

refreshInventory("startup");
startWatcher();
startNextDev();

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
