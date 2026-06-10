import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePageContent } from "@/components/articles/ArticlePageContent";
import { getAllArticles, getArticleBySlug } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllArticles("en").map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug, "en");

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
  const articleEn = getArticleBySlug(slug, "en");

  if (!articleEn) {
    notFound();
  }

  const articleHe = getArticleBySlug(slug, "he");
  const tool = getToolById(articleEn.toolId);

  return (
    <ArticlePageContent
      articleEn={articleEn}
      articleHe={articleHe}
      tool={tool}
    />
  );
}
