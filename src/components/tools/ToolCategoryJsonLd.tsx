import { TOOL_CATEGORY_FAQ_LD, TOOL_CATEGORY_SEO } from "@/lib/toolCategoryPages";
import type { SidebarNavCategoryId } from "@/lib/sidebarNav";

interface ToolCategoryJsonLdProps {
  categoryId: SidebarNavCategoryId;
}

export function ToolCategoryJsonLd({ categoryId }: ToolCategoryJsonLdProps) {
  const seo = TOOL_CATEGORY_SEO[categoryId];
  const faqs = TOOL_CATEGORY_FAQ_LD[categoryId];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: seo.title,
        description: seo.description,
        isPartOf: {
          "@type": "WebSite",
          name: "Pix-8",
          url: "https://pix-8.com",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
