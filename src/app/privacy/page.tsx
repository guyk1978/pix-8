import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPageContent } from "@/components/legal/LegalPageContent";
import { getLegalPage } from "@/lib/legalPages";
import { SITE_URL } from "@/lib/siteUrl";

export function generateMetadata(): Metadata {
  const page = getLegalPage("privacy", "en");

  if (!page) {
    return { title: "Privacy Policy" };
  }

  return {
    title: page.title,
    description:
      "How Pix-8 handles your data: client-side image processing, optional analytics cookies, and local browser storage.",
    alternates: {
      canonical: `${SITE_URL}/privacy`,
    },
    openGraph: {
      title: page.title,
      url: `${SITE_URL}/privacy`,
    },
  };
}

export default function PrivacyPage() {
  const pageEn = getLegalPage("privacy", "en");
  const pageHe = getLegalPage("privacy", "he");

  if (!pageEn) {
    notFound();
  }

  return (
    <LegalPageContent
      pageEn={pageEn}
      pageHe={pageHe}
      homeLabelKey="nav.dashboard"
    />
  );
}
