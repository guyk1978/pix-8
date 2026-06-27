import { readdirSync } from "node:fs";
import { join } from "node:path";
import { generateExampleImages } from "./generate-example-images-lib";

const output = generateExampleImages();
const count = readdirSync(join(process.cwd(), "public", "examples")).filter((name) =>
  /\.(webp|png|jpe?g|gif|avif)$/i.test(name),
).length;
console.log(`[example-images] ${count} image(s) → ${output}`);
