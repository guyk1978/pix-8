export type OverlayPresetId =
  | "stars"
  | "flowers"
  | "birds"
  | "sparkles"
  | "hearts";

export interface OverlayPreset {
  id: OverlayPresetId;
  src: string;
}

export const OVERLAY_PRESETS: OverlayPreset[] = [
  { id: "stars", src: "/overlays/stars.svg" },
  { id: "flowers", src: "/overlays/flowers.svg" },
  { id: "birds", src: "/overlays/birds.svg" },
  { id: "sparkles", src: "/overlays/sparkles.svg" },
  { id: "hearts", src: "/overlays/hearts.svg" },
];

const imageCache = new Map<string, Promise<HTMLImageElement>>();

export function loadOverlayImage(src: string): Promise<HTMLImageElement> {
  const cached = imageCache.get(src);
  if (cached) {
    return cached;
  }

  const promise = new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Failed to load overlay: ${src}`));
    image.src = src;
  });

  imageCache.set(src, promise);
  return promise;
}
