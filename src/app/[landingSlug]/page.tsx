import type { Metadata } from "next";
import { BackgroundRemoverLandingJsonLd } from "@/components/landing/BackgroundRemoverLandingJsonLd";
import { BackgroundRemoverLandingView } from "@/components/landing/BackgroundRemoverLandingView";
import { ImageAnnotatorLandingJsonLd } from "@/components/landing/ImageAnnotatorLandingJsonLd";
import { ImageAnnotatorLandingView } from "@/components/landing/ImageAnnotatorLandingView";
import {
  getBackgroundRemoverLandingBySlug,
} from "@/lib/backgroundRemoverLandings";
import {
  getLandingBySlug,
  IMAGE_ANNOTATOR_LANDINGS,
} from "@/lib/imageAnnotatorLandings";
import {
  getAllLandingStaticParams,
  resolveLandingPageBySlug,
} from "@/lib/landingPages";
import { SITE_URL } from "@/lib/siteUrl";
import { notFound } from "next/navigation";

interface ToolLandingPageProps {
  params: Promise<{ landingSlug: string }>;
}

export function generateStaticParams() {
  return getAllLandingStaticParams();
}

export async function generateMetadata({
  params,
}: ToolLandingPageProps): Promise<Metadata> {
  const { landingSlug } = await params;
  const annotatorLanding = getLandingBySlug(landingSlug);
  const removerLanding = getBackgroundRemoverLandingBySlug(landingSlug);
  const landing = annotatorLanding ?? removerLanding;

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

export default async function ToolLandingPage({ params }: ToolLandingPageProps) {
  const { landingSlug } = await params;
  const resolved = resolveLandingPageBySlug(landingSlug);

  if (!resolved) {
    notFound();
  }

  if (resolved.family === "image-annotator") {
    return (
      <>
        <ImageAnnotatorLandingJsonLd landingId={resolved.id} />
        <ImageAnnotatorLandingView landingId={resolved.id} />
      </>
    );
  }

  return (
    <>
      <BackgroundRemoverLandingJsonLd landingId={resolved.id} />
      <BackgroundRemoverLandingView landingId={resolved.id} />
    </>
  );
}
