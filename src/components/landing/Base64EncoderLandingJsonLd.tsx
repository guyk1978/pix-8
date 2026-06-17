"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import {
  BASE64_ENCODER_TOOL_HREF,
  type Base64EncoderLandingId,
} from "@/lib/base64encoderLandings";
import { getBase64EncoderLandingEntry } from "@/lib/base64encoderLandingsLocale";
import { SITE_URL } from "@/lib/siteUrl";

interface Base64EncoderLandingJsonLdProps {
  landingId: Base64EncoderLandingId;
}

export function Base64EncoderLandingJsonLd({
  landingId,
}: Base64EncoderLandingJsonLdProps) {
  const { language } = useLanguage();
  const landing = getBase64EncoderLandingEntry(language, landingId);
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
        name: "Pix-8 Base64 Encoder",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web Browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        url: `${SITE_URL}${BASE64_ENCODER_TOOL_HREF}`,
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
