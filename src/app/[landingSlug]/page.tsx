import type { Metadata } from "next";
import { ImageAnnotatorLandingJsonLd } from "@/components/landing/ImageAnnotatorLandingJsonLd";
import { ImageAnnotatorLandingView } from "@/components/landing/ImageAnnotatorLandingView";
import {
  getLandingBySlug,
  IMAGE_ANNOTATOR_LANDINGS,
} from "@/lib/imageAnnotatorLandings";
import { SITE_URL } from "@/lib/siteUrl";
import { notFound } from "next/navigation";

interface ImageAnnotatorLandingPageProps {
  params: Promise<{ landingSlug: string }>;
}

export function generateStaticParams() {
  return Object.values(IMAGE_ANNOTATOR_LANDINGS).map((entry) => ({
    landingSlug: entry.path.slice(1),
  }));
}

export async function generateMetadata({
  params,
}: ImageAnnotatorLandingPageProps): Promise<Metadata> {
  const { landingSlug } = await params;
  const landing = getLandingBySlug(landingSlug);

  if (!landing) {
    return { title: "Page not found" };
  }

  return {
    title: landing.seo.title,
    description: landing.seo.description,
    alternates: {
      canonical: `${SITE_URL}${landing.path}`,
    },
    openGraph: {
      title: landing.seo.title,
      description: landing.seo.description,
      url: `${SITE_URL}${landing.path}`,
    },
  };
}

export default async function ImageAnnotatorLandingPage({
  params,
}: ImageAnnotatorLandingPageProps) {
  const { landingSlug } = await params;
  const landing = getLandingBySlug(landingSlug);

  if (!landing) {
    notFound();
  }

  return (
    <>
      <ImageAnnotatorLandingJsonLd landingId={landing.id} />
      <ImageAnnotatorLandingView landingId={landing.id} />
    </>
  );
}
