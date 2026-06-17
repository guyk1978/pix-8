"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import {
  IMAGE_COLLAGE_TOOL_HREF,
  type ImageCollageLandingId,
} from "@/lib/imageCollageLandings";
import { getImageCollageLandingEntry } from "@/lib/imageCollageLandingsLocale";
import { SITE_URL } from "@/lib/siteUrl";

interface ImageCollageLandingJsonLdProps {
  landingId: ImageCollageLandingId;
}

export function ImageCollageLandingJsonLd({
  landingId,
}: ImageCollageLandingJsonLdProps) {
  const { language } = useLanguage();
  const landing = getImageCollageLandingEntry(language, landingId);
  const pageUrl = `${SITE_URL}${landing.path}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: landing.seo.title,
        description: landing.seo.description,
        url: pageUrl,
        inLanguage: language === "he" ? "he" : "en",
        isPartOf: {
          "@type": "WebSite",
          name: "Pix-8",
          url: SITE_URL,
        },
      },
      {
        "@type": "SoftwareApplication",
        name: "Pix-8 Image Collage Maker",
        applicationCategory: "DesignApplication",
        operatingSystem: "Web Browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        url: `${SITE_URL}${IMAGE_COLLAGE_TOOL_HREF}`,
        description: landing.seo.description,
      },
      {
        "@type": "FAQPage",
        mainEntity: landing.faq.map((item) => ({
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
