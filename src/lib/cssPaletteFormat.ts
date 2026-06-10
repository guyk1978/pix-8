import type { PaletteColor } from "@/lib/paletteExtraction";

export type PaletteRole =
  | "dominant"
  | "secondary"
  | "accent"
  | "muted"
  | "surface"
  | "highlight";

export type CodeFormat = "css" | "scss" | "json" | "tailwind";

const ROLE_LABELS: PaletteRole[] = [
  "dominant",
  "secondary",
  "accent",
  "muted",
  "surface",
  "highlight",
];

export interface PaletteSwatch extends PaletteColor {
  role: PaletteRole;
}

export function toPaletteSwatches(colors: PaletteColor[]): PaletteSwatch[] {
  return colors.map((color, index) => ({
    ...color,
    role: ROLE_LABELS[index] ?? "highlight",
  }));
}

export function buildCssVariables(swatch: PaletteSwatch[]): string {
  const lines = swatch.map(
    (color) => `  --${color.role}: ${color.hex};`,
  );
  return `:root {\n${lines.join("\n")}\n}`;
}

export function buildScssVariables(swatch: PaletteSwatch[]): string {
  return swatch.map((color) => `$${color.role}: ${color.hex};`).join("\n");
}

export function buildJsonPalette(swatch: PaletteSwatch[]): string {
  const palette = Object.fromEntries(
    swatch.map((color) => [color.role, color.hex]),
  );
  return JSON.stringify({ palette }, null, 2);
}

export function buildTailwindConfig(swatch: PaletteSwatch[]): string {
  const colorLines = swatch
    .map((color) => `        ${color.role}: "${color.hex}",`)
    .join("\n");

  return `// tailwind.config.ts\nexport default {\n  theme: {\n    extend: {\n      colors: {\n${colorLines}\n      },\n    },\n  },\n};`;
}

export function buildCodeSnippet(
  swatch: PaletteSwatch[],
  format: CodeFormat,
): string {
  switch (format) {
    case "css":
      return buildCssVariables(swatch);
    case "scss":
      return buildScssVariables(swatch);
    case "json":
      return buildJsonPalette(swatch);
    case "tailwind":
      return buildTailwindConfig(swatch);
  }
}

export const CODE_FORMAT_OPTIONS: { value: CodeFormat; label: string }[] = [
  { value: "css", label: "CSS Variables" },
  { value: "scss", label: "SCSS" },
  { value: "json", label: "JSON" },
  { value: "tailwind", label: "Tailwind" },
];
