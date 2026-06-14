import type { ComponentType } from "react";
import { Base64Encoder } from "@/components/tools/Base64Encoder";
import { BackgroundRemover } from "@/components/tools/BackgroundRemover";
import { Compressor } from "@/components/tools/Compressor";
import { Converter } from "@/components/tools/Converter";
import { Cropper } from "@/components/tools/Cropper";
import { ColorPicker } from "@/components/tools/ColorPicker";
import { BorderGenerator } from "@/components/tools/BorderGenerator";
import { FaviconGenerator } from "@/components/tools/FaviconGenerator";
import { CssPaletteGenerator } from "@/components/tools/CssPaletteGenerator";
import { GrainGenerator } from "@/components/tools/GrainGenerator";
import { LensCorrector } from "@/components/tools/LensCorrector";
import { Denoiser } from "@/components/tools/Denoiser";
import { ImageCollageMaker } from "@/components/tools/ImageCollageMaker";
import { ImageFilters } from "@/components/tools/ImageFilters";
import { ImageInverter } from "@/components/tools/ImageInverter";
import { ImageToSvgConverter } from "@/components/tools/ImageToSvgConverter";
import { LightAdjuster } from "@/components/tools/LightAdjuster";
import { Sharpener } from "@/components/tools/Sharpener";
import { GrayscaleConverter } from "@/components/tools/GrayscaleConverter";
import { TextOverlay } from "@/components/tools/TextOverlay";
import { MemeGenerator } from "@/components/tools/MemeGenerator";
import { MetadataRemover } from "@/components/tools/MetadataRemover";
import { PaletteExtractor } from "@/components/tools/PaletteExtractor";
import { Resizer } from "@/components/tools/Resizer";
import { RotateFlip } from "@/components/tools/RotateFlip";
import { Watermark } from "@/components/tools/Watermark";
import { ToolShell } from "@/components/tools/ToolShell";
import { ToolJsonLd } from "@/components/tools/ToolJsonLd";
import { getArticleBundlesByToolId } from "@/lib/blog";
import { getToolRoute } from "@/lib/sidebarNav";
import { SITE_URL } from "@/lib/siteUrl";
import type { Tool, ToolId } from "@/lib/tools";
import type { Metadata } from "next";

export const TOOL_COMPONENTS: Partial<Record<ToolId, ComponentType>> = {
  resizer: Resizer,
  converter: Converter,
  compressor: Compressor,
  cropper: Cropper,
  "rotate-flip": RotateFlip,
  watermark: Watermark,
  "bg-remover": BackgroundRemover,
  "palette-extractor": PaletteExtractor,
  "metadata-remover": MetadataRemover,
  "color-picker": ColorPicker,
  "text-overlay": TextOverlay,
  "border-generator": BorderGenerator,
  "grayscale-converter": GrayscaleConverter,
  "favicon-generator": FaviconGenerator,
  sharpener: Sharpener,
  "light-adjuster": LightAdjuster,
  "image-inverter": ImageInverter,
  denoiser: Denoiser,
  "css-palette-gen": CssPaletteGenerator,
  "lens-corrector": LensCorrector,
  "grain-generator": GrainGenerator,
  "base64-encoder": Base64Encoder,
  "image-filters": ImageFilters,
  "image-to-svg": ImageToSvgConverter,
  "image-collage": ImageCollageMaker,
  "meme-generator": MemeGenerator,
};

export function buildToolPageMetadata(tool: Tool): Metadata {
  const canonicalPath = getToolRoute(tool.id);

  return {
    title: tool.name,
    description: tool.description,
    alternates: {
      canonical: `${SITE_URL}${canonicalPath}`,
    },
    openGraph: {
      title: tool.name,
      description: tool.description,
      url: `${SITE_URL}${canonicalPath}`,
    },
  };
}

export function ToolPageContent({ tool }: { tool: Tool }) {
  const ToolComponent = TOOL_COMPONENTS[tool.id];
  const { en: relatedArticlesEn, he: relatedArticlesHe } =
    getArticleBundlesByToolId(tool.id);

  return (
    <>
      <ToolJsonLd tool={tool} />
      <ToolShell
        tool={tool}
        relatedArticlesEn={relatedArticlesEn}
        relatedArticlesHe={relatedArticlesHe}
      >
      {ToolComponent ? (
        <ToolComponent />
      ) : (
        <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-center">
          <span className="font-label text-muted">Status</span>
          <p className="font-mono text-sm text-muted">
            Tool workspace — implementation pending
          </p>
        </div>
      )}
    </ToolShell>
    </>
  );
}
