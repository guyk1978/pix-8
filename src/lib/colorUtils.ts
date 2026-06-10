export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface HslColor {
  h: number;
  s: number;
  l: number;
}

export interface SampledColor extends RgbColor {
  hex: string;
  rgb: string;
  hsl: string;
}

export function rgbToHex({ r, g, b }: RgbColor): string {
  return `#${[r, g, b]
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("")}`;
}

export function rgbToHsl({ r, g, b }: RgbColor): HslColor {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === rn) {
      h = ((gn - bn) / delta) % 6;
    } else if (max === gn) {
      h = (bn - rn) / delta + 2;
    } else {
      h = (rn - gn) / delta + 4;
    }
    h *= 60;
    if (h < 0) h += 360;
  }

  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function formatRgb(color: RgbColor): string {
  return `rgb(${color.r}, ${color.g}, ${color.b})`;
}

export function formatHsl(color: HslColor): string {
  return `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
}

export function sampleColorFromCanvas(
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
): SampledColor {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context unavailable.");
  }

  const { data } = ctx.getImageData(x, y, 1, 1);
  const rgb: RgbColor = { r: data[0], g: data[1], b: data[2] };
  const hex = rgbToHex(rgb);
  const hsl = rgbToHsl(rgb);

  return {
    ...rgb,
    hex,
    rgb: formatRgb(rgb),
    hsl: formatHsl(hsl),
  };
}
