export const LANGUAGE_STORAGE_KEY = "pix-8-language";

export type Language = "en" | "he";

export const DEFAULT_LANGUAGE: Language = "en";

export const SUPPORTED_LANGUAGES: Language[] = ["en", "he"];

export function isLanguage(value: string | null | undefined): value is Language {
  return value === "en" || value === "he";
}

export function getStoredLanguage(): Language | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return isLanguage(stored) ? stored : null;
}

export function storeLanguage(language: Language): void {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
}

export function getDocumentDirection(language: Language): "ltr" | "rtl" {
  return language === "he" ? "rtl" : "ltr";
}
