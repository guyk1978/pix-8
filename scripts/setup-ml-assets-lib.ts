import { copyFile, mkdir, stat } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { dirname, join } from "node:path";
import { Readable } from "node:stream";

const MODEL_URL =
  "https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2netp.onnx";

const ORT_FILES = [
  "ort-wasm-simd-threaded.wasm",
  "ort-wasm-simd-threaded.mjs",
  "ort.wasm.bundle.min.mjs",
  "ort.wasm.min.mjs",
] as const;

async function fileExists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

export async function setupMlAssets(root = process.cwd()): Promise<void> {
  const modelPath = join(root, "public", "models", "u2netp.onnx");
  const ortSrc = join(root, "node_modules", "onnxruntime-web", "dist");
  const ortDest = join(root, "public", "ort");

  await mkdir(ortDest, { recursive: true });

  for (const file of ORT_FILES) {
    const source = join(ortSrc, file);
    const destination = join(ortDest, file);
    if (await fileExists(source)) {
      await copyFile(source, destination);
    }
  }

  if (await fileExists(modelPath)) {
    return;
  }

  await mkdir(dirname(modelPath), { recursive: true });

  const response = await fetch(MODEL_URL);
  if (!response.ok || !response.body) {
    throw new Error(`Model download failed (${response.status}).`);
  }

  await pipeline(
    Readable.fromWeb(response.body as import("node:stream/web").ReadableStream),
    createWriteStream(modelPath),
  );
}
