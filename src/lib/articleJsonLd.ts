import { buildToolSoftwareApplicationSchema } from "@/lib/toolJsonLd";
import { SITE_URL } from "@/lib/siteUrl";
import type { Article } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

const PUBLISHER_NAME = "Pix-8";

export interface TechArticleSchema {
  "@context": "https://schema.org";
  "@type": "TechArticle";
  headline: string;
  description: string;
  datePublished: string;
  author: {
    "@type": "Organization";
    name: string;
  };
  publisher: {
    "@type": "Organization";
    name: string;
  };
  mainEntityOfPage: {
    "@type": "WebPage";
    "@id": string;
  };
  url: string;
  about?: ReturnType<typeof buildToolSoftwareApplicationSchema>;
}

export function buildTechArticleSchema(article: Article): TechArticleSchema {
  const articleUrl = `${SITE_URL}/articles/${article.slug}`;
  const tool = getToolById(article.toolId);

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: {
      "@type": "Organization",
      name: PUBLISHER_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: PUBLISHER_NAME,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    url: articleUrl,
    ...(tool ? { about: buildToolSoftwareApplicationSchema(tool) } : {}),
  };
}
