import { EXAMPLE_IMAGES, loadExampleImageAsFile, type ExampleImageId } from "@/lib/exampleImages";

export interface BackgroundColorPreset {
  id: string;
  color: string;
  nameKey: string;
}

export interface BackgroundGradientPreset {
  id: string;
  angle: number;
  stops: { color: string; pos: number }[];
  nameKey: string;
}

export interface BackgroundImageLoaded {
  key: string;
  file: File;
  image: HTMLImageElement;
  objectUrl: string;
}

export const BACKGROUND_COLOR_PRESETS: BackgroundColorPreset[] = [
  { id: "white", color: "#ffffff", nameKey: "toolUi.bgRemover.presets.white" },
  { id: "studio-gray", color: "#e8e8e8", nameKey: "toolUi.bgRemover.presets.studioGray" },
  { id: "black", color: "#000000", nameKey: "toolUi.bgRemover.presets.black" },
  { id: "soft-pink", color: "#fce4ec", nameKey: "toolUi.bgRemover.presets.softPink" },
  { id: "mint", color: "#e0f2f1", nameKey: "toolUi.bgRemover.presets.mint" },
  { id: "sky-blue", color: "#e3f2fd", nameKey: "toolUi.bgRemover.presets.skyBlue" },
  { id: "warm-beige", color: "#f5f0e8", nameKey: "toolUi.bgRemover.presets.warmBeige" },
  { id: "dark", color: "#121212", nameKey: "toolUi.bgRemover.presets.dark" },
];

export const BACKGROUND_GRADIENT_PRESETS: BackgroundGradientPreset[] = [
  {
    id: "sky",
    angle: 180,
    stops: [
      { color: "#4facfe", pos: 0 },
      { color: "#e8f7ff", pos: 1 },
    ],
    nameKey: "toolUi.bgRemover.presets.gradientSky",
  },
  {
    id: "sunset",
    angle: 135,
    stops: [
      { color: "#ff6b35", pos: 0 },
      { color: "#f7c59f", pos: 0.5 },
      { color: "#ff8fab", pos: 1 },
    ],
    nameKey: "toolUi.bgRemover.presets.gradientSunset",
  },
  {
    id: "ocean",
    angle: 160,
    stops: [
      { color: "#0f4c75", pos: 0 },
      { color: "#3282b8", pos: 0.5 },
      { color: "#bbe1fa", pos: 1 },
    ],
    nameKey: "toolUi.bgRemover.presets.gradientOcean",
  },
  {
    id: "forest",
    angle: 145,
    stops: [
      { color: "#1b4332", pos: 0 },
      { color: "#40916c", pos: 0.55 },
      { color: "#d8f3dc", pos: 1 },
    ],
    nameKey: "toolUi.bgRemover.presets.gradientForest",
  },
  {
    id: "purple-haze",
    angle: 120,
    stops: [
      { color: "#5b247a", pos: 0 },
      { color: "#c77dff", pos: 0.5 },
      { color: "#f8e1ff", pos: 1 },
    ],
    nameKey: "toolUi.bgRemover.presets.gradientPurple",
  },
  {
    id: "neutral",
    angle: 180,
    stops: [
      { color: "#9e9e9e", pos: 0 },
      { color: "#f5f5f5", pos: 1 },
    ],
    nameKey: "toolUi.bgRemover.presets.gradientNeutral",
  },
];

export function gradientPresetCss(preset: BackgroundGradientPreset): string {
  const stops = preset.stops
    .map((stop) => `${stop.color} ${Math.round(stop.pos * 100)}%`)
    .join(", ");
  return `linear-gradient(${preset.angle}deg, ${stops})`;
}

function angleToGradientEndpoints(
  angleDeg: number,
  width: number,
  height: number,
): [number, number, number, number] {
  const angle = ((angleDeg - 90) * Math.PI) / 180;
  const centerX = width / 2;
  const centerY = height / 2;
  const length =
    Math.abs(width * Math.sin(angle)) + Math.abs(height * Math.cos(angle));
  const x0 = centerX - (Math.cos(angle) * length) / 2;
  const y0 = centerY - (Math.sin(angle) * length) / 2;
  const x1 = centerX + (Math.cos(angle) * length) / 2;
  const y1 = centerY + (Math.sin(angle) * length) / 2;
  return [x0, y0, x1, y1];
}

function loadImageElement(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load image."));
    image.src = url;
  });
}

export async function createGradientBackgroundImage(
  preset: BackgroundGradientPreset,
  width: number,
  height: number,
): Promise<BackgroundImageLoaded> {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context unavailable.");
  }

  const [x0, y0, x1, y1] = angleToGradientEndpoints(preset.angle, width, height);
  const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
  for (const stop of preset.stops) {
    gradient.addColorStop(stop.pos, stop.color);
  }

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((value) => {
      if (value) resolve(value);
      else reject(new Error("Failed to encode background."));
    }, "image/png");
  });

  const objectUrl = URL.createObjectURL(blob);
  const image = await loadImageElement(objectUrl);
  const file = new File([blob], `bg-${preset.id}.png`, { type: "image/png" });

  return {
    key: `gradient:${preset.id}`,
    file,
    image,
    objectUrl,
  };
}

export async function loadExampleBackgroundImage(
  exampleId: ExampleImageId,
): Promise<BackgroundImageLoaded> {
  const example = EXAMPLE_IMAGES.find((entry) => entry.id === exampleId);
  if (!example) {
    throw new Error("Example image not found.");
  }

  const file = await loadExampleImageAsFile(example);
  const objectUrl = URL.createObjectURL(file);
  const image = await loadImageElement(objectUrl);

  return {
    key: `example:${exampleId}`,
    file,
    image,
    objectUrl,
  };
}

export function inferBackgroundImageKey(
  fileName: string | null | undefined,
): string | null {
  if (!fileName) return null;

  const gradientMatch = fileName.match(/^bg-(.+)\.png$/);
  if (gradientMatch?.[1]) {
    return `gradient:${gradientMatch[1]}`;
  }

  const example = EXAMPLE_IMAGES.find((entry) => entry.fileName === fileName);
  if (example) {
    return `example:${example.id}`;
  }

  return `upload:${fileName}`;
}
