import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Language } from "@/lib/language";

export type LegalPageId = "privacy" | "terms";

export const LEGAL_PAGE_IDS: LegalPageId[] = ["privacy", "terms"];

export interface LegalPage {
  id: LegalPageId;
  title: string;
  lastUpdated: string;
  content: string;
}

function getLegalDir(language: Language): string {
  return join(process.cwd(), "src/content/legal", language);
}

function parseFrontmatter(raw: string): {
  data: Record<string, string>;
  content: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: raw.trim() };
  }

  const data: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line
      .slice(separator + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
    data[key] = value;
  }

  return { data, content: match[2].trim() };
}

export function getLegalPage(
  id: LegalPageId,
  language: Language = "en",
): LegalPage | null {
  const candidates: Language[] =
    language === "en" ? ["en"] : [language, "en"];

  for (const lang of candidates) {
    const filePath = join(getLegalDir(lang), `${id}.md`);
    if (!existsSync(filePath)) continue;

    const raw = readFileSync(filePath, "utf8");
    const { data, content } = parseFrontmatter(raw);

    if (!data.title || !content) {
      console.warn(`[legal] Skipping ${filePath}: missing title or content.`);
      continue;
    }

    return {
      id,
      title: data.title,
      lastUpdated: data.lastUpdated ?? "2026-06-26",
      content,
    };
  }

  return null;
}
