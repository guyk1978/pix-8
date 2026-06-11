import type { Language } from "@/lib/language";

export const SHARE_HEADER_IMAGES = {
  dark: {
    en: "/share-heder-pix-8-dark-en.png",
    he: "/share-heder-pix-8-dark-he.png",
  },
  light: {
    en: "/share-heder-pix-8-light-en.png",
    he: "/share-heder-pix-8-light-he.png",
  },
} as const satisfies Record<"dark" | "light", Record<Language, string>>;

export const DEFAULT_SHARE_IMAGE = SHARE_HEADER_IMAGES.dark.en;

export function getShareHeaderImage(
  language: Language,
  isDark: boolean,
): string {
  return SHARE_HEADER_IMAGES[isDark ? "dark" : "light"][language];
}

export function resolveShareImageUrl(path: string, origin: string): string {
  return new URL(path, origin).href;
}
