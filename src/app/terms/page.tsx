import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPageContent } from "@/components/legal/LegalPageContent";
import { getLegalPage } from "@/lib/legalPages";
import { SITE_URL } from "@/lib/siteUrl";

export function generateMetadata(): Metadata {
  const page = getLegalPage("terms", "en");

  if (!page) {
    return { title: "Terms of Use" };
  }

  return {
    title: page.title,
    description:
      "Terms of use for Pix-8 — free client-side image tools that run in your browser without uploading your files.",
    alternates: {
      canonical: `${SITE_URL}/terms`,
    },
    openGraph: {
      title: page.title,
      url: `${SITE_URL}/terms`,
    },
  };
}

export default function TermsPage() {
  const pageEn = getLegalPage("terms", "en");
  const pageHe = getLegalPage("terms", "he");

  if (!pageEn) {
    notFound();
  }

  return (
    <LegalPageContent pageEn={pageEn} pageHe={pageHe} homeLabelKey="nav.dashboard" />
  );
}
