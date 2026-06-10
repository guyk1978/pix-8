export const CHARACTERS = {
  base: "/characters/helper-base.png",
  upload: "/characters/helper-upload.png",
  width: "/characters/helper-width.png",
  height: "/characters/helper-height.png",
  processing: "/characters/helper-processing.png",
  download: "/characters/helper-download.png",
  error: "/characters/helper-error.png",
} as const;

export type CharacterKey = keyof typeof CHARACTERS;

/** Display widths (px) — height follows image aspect ratio */
export const CHARACTER_SIZES = {
  dashboard: 172,
  hero: 156,
  heroMobile: 128,
  upload: 192,
  uploadActive: 216,
  field: 136,
  processing: { sm: 88, md: 116, lg: 144 },
  download: 112,
  error: 96,
  sidebar: 96,
  roster: 108,
  corner: 118,
} as const;

/** All seven helpers — order matches dashboard roster */
export const CHARACTER_ROSTER: CharacterKey[] = [
  "base",
  "upload",
  "width",
  "height",
  "processing",
  "download",
  "error",
];
