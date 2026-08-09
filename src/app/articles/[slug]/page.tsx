import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleJsonLd } from "@/components/articles/ArticleJsonLd";
import { ArticlePageContent } from "@/components/articles/ArticlePageContent";
import { getAllArticles, getArticleBySlug, getArticlesByToolId } from "@/lib/blog";
import { SITE_URL } from "@/lib/siteUrl";
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
    alternates: {
      canonical: `${SITE_URL}/articles/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `${SITE_URL}/articles/${article.slug}`,
    },
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
  const relatedEn = getArticlesByToolId(articleEn.toolId, "en").filter(
    (article) => article.slug !== articleEn.slug,
  );
  const relatedHe = getArticlesByToolId(articleEn.toolId, "he").filter(
    (article) => article.slug !== articleEn.slug,
  );

  return (
    <>
      <ArticleJsonLd article={articleEn} />
      <ArticlePageContent
        articleEn={articleEn}
        articleHe={articleHe}
        tool={tool}
        relatedEn={relatedEn}
        relatedHe={relatedHe}
      />
    </>
  );
}
