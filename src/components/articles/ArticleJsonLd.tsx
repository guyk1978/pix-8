import { buildTechArticleSchema } from "@/lib/articleJsonLd";
import type { Article } from "@/lib/blog";

interface ArticleJsonLdProps {
  article: Article;
}

export function ArticleJsonLd({ article }: ArticleJsonLdProps) {
  const schema = buildTechArticleSchema(article);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
