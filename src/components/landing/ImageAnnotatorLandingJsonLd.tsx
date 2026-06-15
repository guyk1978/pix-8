"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import {
  IMAGE_ANNOTATOR_TOOL_HREF,
  type ImageAnnotatorLandingId,
} from "@/lib/imageAnnotatorLandings";
import { getImageAnnotatorLandings } from "@/lib/imageAnnotatorLandingsLocale";
import { SITE_URL } from "@/lib/siteUrl";

interface ImageAnnotatorLandingJsonLdProps {
  landingId: ImageAnnotatorLandingId;
}

export function ImageAnnotatorLandingJsonLd({
  landingId,
}: ImageAnnotatorLandingJsonLdProps) {
  const { language } = useLanguage();
  const landing = getImageAnnotatorLandings(language)[landingId];
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
        name: "Pix-8 Image Annotator",
        applicationCategory: "DesignApplication",
        operatingSystem: "Web Browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        url: `${SITE_URL}${IMAGE_ANNOTATOR_TOOL_HREF}`,
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
