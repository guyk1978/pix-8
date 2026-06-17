"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import {
  IMAGE_TO_SVG_TOOL_HREF,
  type ImageToSvgLandingId,
} from "@/lib/imagetosvgLandings";
import { getImageToSvgLandingEntry } from "@/lib/imagetosvgLandingsLocale";
import { SITE_URL } from "@/lib/siteUrl";

interface ImageToSvgLandingJsonLdProps {
  landingId: ImageToSvgLandingId;
}

export function ImageToSvgLandingJsonLd({
  landingId,
}: ImageToSvgLandingJsonLdProps) {
  const { language } = useLanguage();
  const landing = getImageToSvgLandingEntry(language, landingId);
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
        name: "Pix-8 Image to SVG Converter",
        applicationCategory: "DesignApplication",
        operatingSystem: "Web Browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        url: `${SITE_URL}${IMAGE_TO_SVG_TOOL_HREF}`,
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
