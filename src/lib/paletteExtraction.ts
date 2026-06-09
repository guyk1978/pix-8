export interface PaletteColor {
  r: number;
  g: number;
  b: number;
  hex: string;
  count: number;
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b]
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("")}`;
}

function colorDistance(a: PaletteColor, b: PaletteColor): number {
  return Math.sqrt(
    (a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2,
  );
}

export function extractDominantColors(
  image: HTMLImageElement,
  colorCount = 6,
  maxSampleSize = 160,
): PaletteColor[] {
  const canvas = document.createElement("canvas");
  const naturalWidth = image.naturalWidth;
  const naturalHeight = image.naturalHeight;

  if (naturalWidth === 0 || naturalHeight === 0) {
    return [];
  }

  const scale = Math.min(1, maxSampleSize / Math.max(naturalWidth, naturalHeight));
  canvas.width = Math.max(1, Math.round(naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(naturalHeight * scale));

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context unavailable.");
  }

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

  const buckets = new Map<
    number,
    { r: number; g: number; b: number; count: number }
  >();

  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] < 128) continue;

    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    const qr = Math.round(r / 16) * 16;
    const qg = Math.round(g / 16) * 16;
    const qb = Math.round(b / 16) * 16;
    const key = (qr << 16) | (qg << 8) | qb;

    const bucket = buckets.get(key);
    if (bucket) {
      bucket.r += r;
      bucket.g += g;
      bucket.b += b;
      bucket.count += 1;
    } else {
      buckets.set(key, { r, g, b, count: 1 });
    }
  }

  const ranked = Array.from(buckets.values())
    .map((bucket) => {
      const r = Math.round(bucket.r / bucket.count);
      const g = Math.round(bucket.g / bucket.count);
      const b = Math.round(bucket.b / bucket.count);

      return {
        r,
        g,
        b,
        hex: rgbToHex(r, g, b),
        count: bucket.count,
      };
    })
    .sort((a, b) => b.count - a.count);

  const selected: PaletteColor[] = [];

  for (const color of ranked) {
    if (selected.length >= colorCount) break;

    const isDuplicate = selected.some(
      (existing) => colorDistance(existing, color) < 36,
    );

    if (!isDuplicate) {
      selected.push(color);
    }
  }

  return selected;
}
