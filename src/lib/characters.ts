import type { Language } from "@/lib/language";

export const CHARACTERS = {
  base: "/characters/helper-base.png",
  resizer: "/characters/helper-resizer.png",
  blue: "/characters/helper-blue.png",
  robot: "/characters/Robot-Helper.png",
  upload: "/characters/helper-upload.png",
  /** helper-pointer-upload.png */
  uploadSmile: "/characters/helper-upload-smile.png",
  /** Character + stubby pointer arrow (upload drop zone) */
  uploadWithArrow: "/characters/helper-upload-with-arrow.png",
  width: "/characters/helper-width.png",
  /** helper-pointer-width.png */
  widthAlt: "/characters/helper-width-2.png",
  height: "/characters/helper-height.png",
  processing: "/characters/helper-processing.png",
  processingAlt: "/characters/helper-processing-2.png",
  download: "/characters/helper-download.png",
  error: "/characters/helper-error.png",
  read: "/characters/helper-read.png",
  read1: "/characters/helper-read-1.png",
} as const;

export type CharacterKey = keyof typeof CHARACTERS;

/** Display widths (px) — height follows image aspect ratio */
export const CHARACTER_SIZES = {
  dashboard: 172,
  hero: 156,
  heroMobile: 128,
  blueHero: 456,
  blueHeroMobile: 344,
  upload: 220,
  uploadActive: 252,
  field: 132,
  workflow: 100,
  workflowSm: 84,
  processing: { sm: 88, md: 116, lg: 144 },
  download: 112,
  error: 96,
  sidebar: 96,
  roster: 108,
  corner: 118,
  read: 192,
  readCard: 32,
} as const;

export const HOME_HEADER_IMAGES = {
  dark: {
    en: "/characters/heder-pix-8-dark-en.png",
    he: "/characters/heder-pix-8-dark-he.png",
  },
  light: {
    en: "/characters/heder-pix-8-light-en.png",
    he: "/characters/heder-pix-8-light-he.png",
  },
} as const satisfies Record<"dark" | "light", Record<Language, string>>;

export const CHARACTER_ROSTER = [
  "base",
  "resizer",
  "blue",
  "robot",
  "uploadSmile",
  "width",
  "height",
  "processing",
  "download",
  "error",
] as const satisfies readonly CharacterKey[];
