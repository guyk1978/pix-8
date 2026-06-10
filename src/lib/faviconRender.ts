export const FAVICON_PREVIEW_SIZES = [16, 32, 48] as const;
export const FAVICON_EXPORT_SIZES = [16, 32, 48] as const;

export type FaviconPreviewSize = (typeof FAVICON_PREVIEW_SIZES)[number];
export type FaviconExportFormat = "png" | "ico";

export interface FaviconSettings {
  /** 0.5–2.0 — higher values crop tighter on the center square */
  zoom: number;
}

export const DEFAULT_FAVICON_SETTINGS: FaviconSettings = {
  zoom: 1,
};

export function drawSquareCover(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  size: number,
  zoom: number,
): void {
  const imgW = image.naturalWidth;
  const imgH = image.naturalHeight;
  const cropSize = Math.min(imgW, imgH) / zoom;
  const sx = (imgW - cropSize) / 2;
  const sy = (imgH - cropSize) / 2;

  ctx.clearRect(0, 0, size, size);
  ctx.drawImage(image, sx, sy, cropSize, cropSize, 0, 0, size, size);
}

export function renderFaviconCanvas(
  image: HTMLImageElement,
  size: number,
  settings: FaviconSettings,
  canvas?: HTMLCanvasElement | null,
): HTMLCanvasElement {
  const target = canvas ?? document.createElement("canvas");
  target.width = size;
  target.height = size;

  const ctx = target.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context unavailable.");
  }

  drawSquareCover(ctx, image, size, settings.zoom);
  return target;
}

export async function canvasToPngBuffer(
  canvas: HTMLCanvasElement,
): Promise<ArrayBuffer> {
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => {
      if (result) resolve(result);
      else reject(new Error("Failed to encode PNG."));
    }, "image/png");
  });

  return blob.arrayBuffer();
}

/** Encodes one or more PNG buffers into a Windows ICO container. */
export function encodeIco(
  images: { size: number; data: ArrayBuffer }[],
): ArrayBuffer {
  const count = images.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const directorySize = dirEntrySize * count;
  let offset = headerSize + directorySize;

  const totalSize =
    offset + images.reduce((sum, image) => sum + image.data.byteLength, 0);
  const buffer = new ArrayBuffer(totalSize);
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);

  view.setUint16(0, 0, true);
  view.setUint16(2, 1, true);
  view.setUint16(4, count, true);

  images.forEach((image, index) => {
    const entryOffset = headerSize + index * dirEntrySize;
    const dimension = image.size >= 256 ? 0 : image.size;

    view.setUint8(entryOffset, dimension);
    view.setUint8(entryOffset + 1, dimension);
    view.setUint8(entryOffset + 2, 0);
    view.setUint8(entryOffset + 3, 0);
    view.setUint16(entryOffset + 4, 1, true);
    view.setUint16(entryOffset + 6, 32, true);
    view.setUint32(entryOffset + 8, image.data.byteLength, true);
    view.setUint32(entryOffset + 12, offset, true);

    bytes.set(new Uint8Array(image.data), offset);
    offset += image.data.byteLength;
  });

  return buffer;
}

export async function buildFaviconExport(
  image: HTMLImageElement,
  settings: FaviconSettings,
  format: FaviconExportFormat,
): Promise<{ blob: Blob; filename: string }> {
  if (format === "png") {
    const canvas = renderFaviconCanvas(image, 32, settings);
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((result) => {
        if (result) resolve(result);
        else reject(new Error("Failed to encode PNG."));
      }, "image/png");
    });

    return { blob, filename: "favicon.png" };
  }

  const pngBuffers = await Promise.all(
    FAVICON_EXPORT_SIZES.map(async (size) => {
      const canvas = renderFaviconCanvas(image, size, settings);
      return {
        size,
        data: await canvasToPngBuffer(canvas),
      };
    }),
  );

  const icoBuffer = encodeIco(pngBuffers);
  return {
    blob: new Blob([icoBuffer], { type: "image/x-icon" }),
    filename: "favicon.ico",
  };
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
