"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import {
  ROTATE_FLIP_TOOL_HREF,
  type RotateFlipLandingId,
} from "@/lib/rotateFlipLandings";
import { getRotateFlipLandingEntry } from "@/lib/rotateFlipLandingsLocale";
import { SITE_URL } from "@/lib/siteUrl";

interface RotateFlipLandingJsonLdProps {
  landingId: RotateFlipLandingId;
}

export function RotateFlipLandingJsonLd({
  landingId,
}: RotateFlipLandingJsonLdProps) {
  const { language } = useLanguage();
  const landing = getRotateFlipLandingEntry(language, landingId);
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
        name: "Pix-8 Rotate & Flip",
        applicationCategory: "DesignApplication",
        operatingSystem: "Web Browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        url: `${SITE_URL}${ROTATE_FLIP_TOOL_HREF}`,
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
