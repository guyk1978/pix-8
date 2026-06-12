/**
 * Generates OG/Twitter share PNGs from the typographic Pix-8 brand (replaces legacy mascot art).
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

type Theme = "dark" | "light";
type Lang = "en" | "he";

const WIDTH = 1200;
const HEIGHT = 630;

const TAGLINES: Record<Lang, { primary: string; muted: string }> = {
  en: {
    primary: "Process images locally.",
    muted: "Nothing leaves your browser.",
  },
  he: {
    primary: "עיבוד תמונות מקומי.",
    muted: "שום דבר לא עוזב את הדפדפן.",
  },
};

const PALETTES: Record<
  Theme,
  {
    bg0: string;
    bg1: string;
    glow: string;
    glass: string;
    glassBorder: string;
    foreground: string;
    muted: string;
    pixel0: string;
    pixel1: string;
    eight0: string;
    eight1: string;
  }
> = {
  dark: {
    bg0: "#0d0f14",
    bg1: "#121620",
    glow: "rgba(13, 148, 136, 0.22)",
    glass: "rgba(18, 22, 32, 0.72)",
    glassBorder: "rgba(232, 232, 232, 0.1)",
    foreground: "#e8e8e8",
    muted: "#8b93a7",
    pixel0: "#0d9488",
    pixel1: "#2563eb",
    eight0: "#e8e8e8",
    eight1: "#0d9488",
  },
  light: {
    bg0: "#f4f4f4",
    bg1: "#ffffff",
    glow: "rgba(13, 148, 136, 0.14)",
    glass: "rgba(255, 255, 255, 0.82)",
    glassBorder: "rgba(26, 26, 26, 0.08)",
    foreground: "#1a1a1a",
    muted: "#6b7280",
    pixel0: "#0d9488",
    pixel1: "#2563eb",
    eight0: "#1a1a1a",
    eight1: "#0d9488",
  },
};

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildShareSvg(theme: Theme, lang: Lang): string {
  const palette = PALETTES[theme];
  const tagline = TAGLINES[lang];
  const isRtl = lang === "he";
  const textAnchor = isRtl ? "end" : "start";
  const taglineX = isRtl ? 780 : 420;
  const dirAttr = isRtl ? ' direction="rtl"' : "";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${palette.bg0}" />
      <stop offset="100%" stop-color="${palette.bg1}" />
    </linearGradient>
    <radialGradient id="heroGlow" cx="50%" cy="35%" r="55%">
      <stop offset="0%" stop-color="${palette.glow}" />
      <stop offset="100%" stop-color="transparent" />
    </radialGradient>
    <linearGradient id="pixelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${palette.pixel0}" />
      <stop offset="100%" stop-color="${palette.pixel1}" />
    </linearGradient>
    <linearGradient id="eightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${palette.eight0}" />
      <stop offset="100%" stop-color="${palette.eight1}" />
    </linearGradient>
    <filter id="pixelGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#heroGlow)" />

  <rect x="220" y="118" width="760" height="394" rx="28" fill="${palette.glass}" stroke="${palette.glassBorder}" stroke-width="1.5" />

  <text x="600" y="300" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="132" font-weight="700" letter-spacing="-4">
    <tspan fill="${palette.foreground}">P</tspan>
    <tspan fill="${palette.foreground}">i</tspan>
    <tspan fill="${palette.muted}">-</tspan>
    <tspan fill="url(#eightGrad)">8</tspan>
  </text>

  <rect x="548" y="198" width="28" height="28" rx="6" fill="url(#pixelGrad)" transform="rotate(12 562 212)" filter="url(#pixelGlow)" />

  <text x="${taglineX}" y="390"${dirAttr} text-anchor="${textAnchor}" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="500">
    <tspan fill="${palette.foreground}">${escapeXml(tagline.primary)}</tspan>
    <tspan dx="${isRtl ? "-12" : "12"}" fill="${palette.muted}">${escapeXml(tagline.muted)}</tspan>
  </text>

  <text x="600" y="470" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="500" fill="${palette.muted}" letter-spacing="0.12em">
    CLIENT-SIDE IMAGE UTILITIES
  </text>
</svg>`;
}

async function main() {
  const publicDir = path.join(process.cwd(), "public");
  const brandDir = path.join(publicDir, "brand");
  await mkdir(brandDir, { recursive: true });

  let sharp: typeof import("sharp") | null = null;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.warn("[share-assets] sharp not installed — writing SVG only");
  }

  const variants: Array<{ theme: Theme; lang: Lang }> = [
    { theme: "dark", lang: "en" },
    { theme: "dark", lang: "he" },
    { theme: "light", lang: "en" },
    { theme: "light", lang: "he" },
  ];

  for (const { theme, lang } of variants) {
    const baseName = `share-pix-8-${theme}-${lang}`;
    const svg = buildShareSvg(theme, lang);
    const svgPath = path.join(brandDir, `${baseName}.svg`);
    await writeFile(svgPath, svg, "utf8");

    if (sharp) {
      const pngPath = path.join(publicDir, `${baseName}.png`);
      await sharp(Buffer.from(svg)).png({ quality: 92 }).toFile(pngPath);
      console.log(`[share-assets] wrote ${path.relative(process.cwd(), pngPath)}`);
    } else {
      console.log(`[share-assets] wrote ${path.relative(process.cwd(), svgPath)}`);
    }
  }

  if (!sharp) {
    console.warn(
      "[share-assets] Install sharp (npm i -D sharp) and re-run to emit PNGs for social crawlers.",
    );
  }
}

void main();
