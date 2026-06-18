import type { Metadata } from "next";
import { BackgroundRemoverLandingJsonLd } from "@/components/landing/BackgroundRemoverLandingJsonLd";
import { BackgroundRemoverLandingView } from "@/components/landing/BackgroundRemoverLandingView";
import { ImageAnnotatorLandingJsonLd } from "@/components/landing/ImageAnnotatorLandingJsonLd";
import { ImageAnnotatorLandingView } from "@/components/landing/ImageAnnotatorLandingView";
import { CustomCutterLandingJsonLd } from "@/components/landing/CustomCutterLandingJsonLd";
import { CustomCutterLandingView } from "@/components/landing/CustomCutterLandingView";
import { RotateFlipLandingJsonLd } from "@/components/landing/RotateFlipLandingJsonLd";
import { RotateFlipLandingView } from "@/components/landing/RotateFlipLandingView";
import { TextOverlayLandingJsonLd } from "@/components/landing/TextOverlayLandingJsonLd";
import { TextOverlayLandingView } from "@/components/landing/TextOverlayLandingView";
import { ImageOverlayLandingJsonLd } from "@/components/landing/ImageOverlayLandingJsonLd";
import { ImageOverlayLandingView } from "@/components/landing/ImageOverlayLandingView";
import { WatermarkLandingJsonLd } from "@/components/landing/WatermarkLandingJsonLd";
import { WatermarkLandingView } from "@/components/landing/WatermarkLandingView";
import { MemeGeneratorLandingJsonLd } from "@/components/landing/MemeGeneratorLandingJsonLd";
import { MemeGeneratorLandingView } from "@/components/landing/MemeGeneratorLandingView";
import { ImageCollageLandingJsonLd } from "@/components/landing/ImageCollageLandingJsonLd";
import { ImageCollageLandingView } from "@/components/landing/ImageCollageLandingView";
import { ImageFiltersLandingJsonLd } from "@/components/landing/ImageFiltersLandingJsonLd";
import { ImageFiltersLandingView } from "@/components/landing/ImageFiltersLandingView";
import { MagnifierLandingJsonLd } from "@/components/landing/MagnifierLandingJsonLd";
import { MagnifierLandingView } from "@/components/landing/MagnifierLandingView";
import { CropperLandingJsonLd } from "@/components/landing/CropperLandingJsonLd";
import { CropperLandingView } from "@/components/landing/CropperLandingView";
import { ResizerLandingJsonLd } from "@/components/landing/ResizerLandingJsonLd";
import { ResizerLandingView } from "@/components/landing/ResizerLandingView";
import { Base64EncoderLandingJsonLd } from "@/components/landing/Base64EncoderLandingJsonLd";
import { Base64EncoderLandingView } from "@/components/landing/Base64EncoderLandingView";
import { ImageToSvgLandingJsonLd } from "@/components/landing/ImageToSvgLandingJsonLd";
import { ImageToSvgLandingView } from "@/components/landing/ImageToSvgLandingView";
import { PaletteExtractorLandingJsonLd } from "@/components/landing/PaletteExtractorLandingJsonLd";
import { PaletteExtractorLandingView } from "@/components/landing/PaletteExtractorLandingView";
import { ColorPickerLandingJsonLd } from "@/components/landing/ColorPickerLandingJsonLd";
import { ColorPickerLandingView } from "@/components/landing/ColorPickerLandingView";
import { CssPaletteGenLandingJsonLd } from "@/components/landing/CssPaletteGenLandingJsonLd";
import { CssPaletteGenLandingView } from "@/components/landing/CssPaletteGenLandingView";
import {
  getAllLandingStaticParams,
  getLandingSeoBySlug,
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
  const landing = getLandingSeoBySlug(landingSlug);

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

  if (resolved.family === "background-remover") {
    return (
      <>
        <BackgroundRemoverLandingJsonLd landingId={resolved.id} />
        <BackgroundRemoverLandingView landingId={resolved.id} />
      </>
    );
  }

  if (resolved.family === "resizer") {
    return (
      <>
        <ResizerLandingJsonLd landingId={resolved.id} />
        <ResizerLandingView landingId={resolved.id} />
      </>
    );
  }

  if (resolved.family === "cropper") {
    return (
      <>
        <CropperLandingJsonLd landingId={resolved.id} />
        <CropperLandingView landingId={resolved.id} />
      </>
    );
  }

  if (resolved.family === "custom-cutter") {
    return (
      <>
        <CustomCutterLandingJsonLd landingId={resolved.id} />
        <CustomCutterLandingView landingId={resolved.id} />
      </>
    );
  }

  if (resolved.family === "rotate-flip") {
    return (
      <>
        <RotateFlipLandingJsonLd landingId={resolved.id} />
        <RotateFlipLandingView landingId={resolved.id} />
      </>
    );
  }

  if (resolved.family === "text-overlay") {
    return (
      <>
        <TextOverlayLandingJsonLd landingId={resolved.id} />
        <TextOverlayLandingView landingId={resolved.id} />
      </>
    );
  }

  if (resolved.family === "image-overlay") {
    return (
      <>
        <ImageOverlayLandingJsonLd landingId={resolved.id} />
        <ImageOverlayLandingView landingId={resolved.id} />
      </>
    );
  }

  if (resolved.family === "watermark") {
    return (
      <>
        <WatermarkLandingJsonLd landingId={resolved.id} />
        <WatermarkLandingView landingId={resolved.id} />
      </>
    );
  }

  if (resolved.family === "meme-generator") {
    return (
      <>
        <MemeGeneratorLandingJsonLd landingId={resolved.id} />
        <MemeGeneratorLandingView landingId={resolved.id} />
      </>
    );
  }

  if (resolved.family === "image-collage") {
    return (
      <>
        <ImageCollageLandingJsonLd landingId={resolved.id} />
        <ImageCollageLandingView landingId={resolved.id} />
      </>
    );
  }

  if (resolved.family === "image-filters") {
    return (
      <>
        <ImageFiltersLandingJsonLd landingId={resolved.id} />
        <ImageFiltersLandingView landingId={resolved.id} />
      </>
    );
  }

  if (resolved.family === "image-magnifier") {
    return (
      <>
        <MagnifierLandingJsonLd landingId={resolved.id} />
        <MagnifierLandingView landingId={resolved.id} />
      </>
    );
  }

  if (resolved.family === "base64-encoder") {
    return (
      <>
        <Base64EncoderLandingJsonLd landingId={resolved.id} />
        <Base64EncoderLandingView landingId={resolved.id} />
      </>
    );
  }

  if (resolved.family === "image-to-svg") {
    return (
      <>
        <ImageToSvgLandingJsonLd landingId={resolved.id} />
        <ImageToSvgLandingView landingId={resolved.id} />
      </>
    );
  }

  if (resolved.family === "palette-extractor") {
    return (
      <>
        <PaletteExtractorLandingJsonLd landingId={resolved.id} />
        <PaletteExtractorLandingView landingId={resolved.id} />
      </>
    );
  }

  if (resolved.family === "color-picker") {
    return (
      <>
        <ColorPickerLandingJsonLd landingId={resolved.id} />
        <ColorPickerLandingView landingId={resolved.id} />
      </>
    );
  }

  if (resolved.family === "css-palette-gen") {
    return (
      <>
        <CssPaletteGenLandingJsonLd landingId={resolved.id} />
        <CssPaletteGenLandingView landingId={resolved.id} />
      </>
    );
  }

  notFound();
}
