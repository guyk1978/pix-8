import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/articles/ArticleBody";
import { getAllArticles, getArticleBySlug } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "Article not found" };
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const tool = getToolById(article.toolId);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/blog"
          className="font-label text-muted transition-colors hover:text-foreground"
        >
          ← Blog
        </Link>
        <span className="text-border">/</span>
        <Link
          href={tool?.href ?? "/"}
          className="font-label text-muted transition-colors hover:text-foreground"
        >
          {tool?.name ?? "Tool"}
        </Link>
        <span className="text-border">/</span>
        <span className="font-label text-muted">Article</span>
      </div>

      <article className="border border-border bg-card p-6 sm:p-8">
        <header className="space-y-3 border-b border-border pb-6">
          <p className="font-label text-muted">Related to {tool?.name}</p>
          <h1 className="text-2xl font-medium tracking-tight text-foreground">
            {article.title}
          </h1>
          <p className="text-sm leading-relaxed text-muted">{article.excerpt}</p>
          <time
            dateTime={article.date}
            className="block font-mono text-xs text-muted"
          >
            {article.date}
          </time>
        </header>

        <ArticleBody content={article.content} />
      </article>
    </div>
  );
}
