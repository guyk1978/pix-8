import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { ToolId } from "@/lib/tools";
import { getToolById } from "@/lib/tools";

export type Article = {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  toolId: ToolId;
  content: string;
};

const ARTICLES_DIR = join(process.cwd(), "src/content/articles");

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

function toArticle(
  data: Record<string, string>,
  content: string,
  source: string,
): Article | null {
  const { title, slug, excerpt, date, toolId } = data;

  if (!title || !slug || !excerpt || !date || !toolId) {
    console.warn(`[blog] Skipping ${source}: missing required fields.`);
    return null;
  }

  if (!getToolById(toolId as ToolId)) {
    console.warn(`[blog] Skipping ${source}: unknown toolId "${toolId}".`);
    return null;
  }

  return {
    title,
    slug,
    excerpt,
    date,
    toolId: toolId as ToolId,
    content,
  };
}

function loadMarkdownArticle(filePath: string, fileName: string): Article | null {
  const raw = readFileSync(filePath, "utf8");
  const { data, content } = parseFrontmatter(raw);
  return toArticle(data, content, fileName);
}

function loadJsonArticle(filePath: string, fileName: string): Article | null {
  const raw = readFileSync(filePath, "utf8");
  try {
    const parsed = JSON.parse(raw) as Partial<Article>;
    const { content, ...meta } = parsed;
    return toArticle(meta as Record<string, string>, content ?? "", fileName);
  } catch {
    console.warn(`[blog] Skipping ${fileName}: invalid JSON.`);
    return null;
  }
}

/** Central class for loading and querying markdown articles from disk. */
export class BlogManager {
  static getAllArticles(): Article[] {
    if (!existsSync(ARTICLES_DIR)) {
      return [];
    }

    return readdirSync(ARTICLES_DIR)
      .flatMap((fileName) => {
        const filePath = join(ARTICLES_DIR, fileName);
        if (fileName.endsWith(".md")) {
          return [loadMarkdownArticle(filePath, fileName)];
        }
        if (fileName.endsWith(".json")) {
          return [loadJsonArticle(filePath, fileName)];
        }
        return [];
      })
      .filter((article): article is Article => article !== null)
      .sort((a, b) => b.date.localeCompare(a.date));
  }

  static getArticleBySlug(slug: string): Article | undefined {
    return BlogManager.getAllArticles().find((article) => article.slug === slug);
  }

  static getArticlesByToolId(toolId: string): Article[] {
    return BlogManager.getAllArticles().filter(
      (article) => article.toolId === toolId,
    );
  }

  static getRecentArticles(limit = 5): Article[] {
    return BlogManager.getAllArticles().slice(0, limit);
  }
}

export const getAllArticles = () => BlogManager.getAllArticles();
export const getArticleBySlug = (slug: string) =>
  BlogManager.getArticleBySlug(slug);
export const getArticlesByToolId = (toolId: string) =>
  BlogManager.getArticlesByToolId(toolId);
export const getRecentArticles = (limit?: number) =>
  BlogManager.getRecentArticles(limit);
