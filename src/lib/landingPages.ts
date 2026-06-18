import {
  getBackgroundRemoverLandingBySlug,
  listBackgroundRemoverLandings,
  type BackgroundRemoverLandingId,
} from "@/lib/backgroundRemoverLandings";
import {
  getLandingBySlug,
  IMAGE_ANNOTATOR_LANDINGS,
  type ImageAnnotatorLandingId,
} from "@/lib/imageAnnotatorLandings";
import {
  getCustomCutterLandingBySlug,
  listCustomCutterLandings,
  type CustomCutterLandingId,
} from "@/lib/customCutterLandings";
import {
  getRotateFlipLandingBySlug,
  listRotateFlipLandings,
  type RotateFlipLandingId,
} from "@/lib/rotateFlipLandings";
import {
  getImageOverlayLandingBySlug,
  listImageOverlayLandings,
  type ImageOverlayLandingId,
} from "@/lib/imageOverlayLandings";
import {
  getTextOverlayLandingBySlug,
  listTextOverlayLandings,
  type TextOverlayLandingId,
} from "@/lib/textOverlayLandings";
import {
  getWatermarkLandingBySlug,
  listWatermarkLandings,
  type WatermarkLandingId,
} from "@/lib/watermarkLandings";
import {
  getMemeGeneratorLandingBySlug,
  listMemeGeneratorLandings,
  type MemeGeneratorLandingId,
} from "@/lib/memeGeneratorLandings";
import {
  getImageCollageLandingBySlug,
  listImageCollageLandings,
  type ImageCollageLandingId,
} from "@/lib/imageCollageLandings";
import {
  getImageFiltersLandingBySlug,
  listImageFiltersLandings,
  type ImageFiltersLandingId,
} from "@/lib/imagefiltersLandings";
import {
  getCropperLandingBySlug,
  listCropperLandings,
  type CropperLandingId,
} from "@/lib/cropperLandings";
import {
  getResizerLandingBySlug,
  listResizerLandings,
  type ResizerLandingId,
} from "@/lib/resizerLandings";
import {
  getMagnifierLandingBySlug,
  listMagnifierLandings,
  type MagnifierLandingId,
} from "@/lib/magnifierLandings";
import {
  getBase64EncoderLandingBySlug,
  listBase64EncoderLandings,
  type Base64EncoderLandingId,
} from "@/lib/base64encoderLandings";
import {
  getImageToSvgLandingBySlug,
  listImageToSvgLandings,
  type ImageToSvgLandingId,
} from "@/lib/imagetosvgLandings";
import {
  getPaletteExtractorLandingBySlug,
  listPaletteExtractorLandings,
  type PaletteExtractorLandingId,
} from "@/lib/paletteextractorLandings";
import {
  getColorPickerLandingBySlug,
  listColorPickerLandings,
  type ColorPickerLandingId,
} from "@/lib/colorpickerLandings";
import {
  getCssPaletteGenLandingBySlug,
  listCssPaletteGenLandings,
  type CssPaletteGenLandingId,
} from "@/lib/csspalettegenLandings";

export type LandingPageFamily =
  | "image-annotator"
  | "background-remover"
  | "cropper"
  | "custom-cutter"
  | "resizer"
  | "rotate-flip"
  | "text-overlay"
  | "image-overlay"
  | "watermark"
  | "meme-generator"
  | "image-collage"
  | "image-filters"
  | "image-magnifier"
  | "base64-encoder"
  | "image-to-svg"
  | "palette-extractor"
  | "color-picker"
  | "css-palette-gen";

export type ResolvedLandingPage =
  | { family: "image-annotator"; id: ImageAnnotatorLandingId }
  | { family: "background-remover"; id: BackgroundRemoverLandingId }
  | { family: "cropper"; id: CropperLandingId }
  | { family: "custom-cutter"; id: CustomCutterLandingId }
  | { family: "resizer"; id: ResizerLandingId }
  | { family: "rotate-flip"; id: RotateFlipLandingId }
  | { family: "text-overlay"; id: TextOverlayLandingId }
  | { family: "image-overlay"; id: ImageOverlayLandingId }
  | { family: "watermark"; id: WatermarkLandingId }
  | { family: "meme-generator"; id: MemeGeneratorLandingId }
  | { family: "image-collage"; id: ImageCollageLandingId }
  | { family: "image-filters"; id: ImageFiltersLandingId }
  | { family: "image-magnifier"; id: MagnifierLandingId }
  | { family: "base64-encoder"; id: Base64EncoderLandingId }
  | { family: "image-to-svg"; id: ImageToSvgLandingId }
  | { family: "palette-extractor"; id: PaletteExtractorLandingId }
  | { family: "color-picker"; id: ColorPickerLandingId }
  | { family: "css-palette-gen"; id: CssPaletteGenLandingId };

export function resolveLandingPageBySlug(
  slug: string,
): ResolvedLandingPage | undefined {
  const annotatorLanding = getLandingBySlug(slug);
  if (annotatorLanding) {
    return { family: "image-annotator", id: annotatorLanding.id };
  }

  const removerLanding = getBackgroundRemoverLandingBySlug(slug);
  if (removerLanding) {
    return { family: "background-remover", id: removerLanding.id };
  }

  const resizerLanding = getResizerLandingBySlug(slug);
  if (resizerLanding) {
    return { family: "resizer", id: resizerLanding.id };
  }

  const cropperLanding = getCropperLandingBySlug(slug);
  if (cropperLanding) {
    return { family: "cropper", id: cropperLanding.id };
  }

  const customCutterLanding = getCustomCutterLandingBySlug(slug);
  if (customCutterLanding) {
    return { family: "custom-cutter", id: customCutterLanding.id };
  }

  const rotateFlipLanding = getRotateFlipLandingBySlug(slug);
  if (rotateFlipLanding) {
    return { family: "rotate-flip", id: rotateFlipLanding.id };
  }

  const textOverlayLanding = getTextOverlayLandingBySlug(slug);
  if (textOverlayLanding) {
    return { family: "text-overlay", id: textOverlayLanding.id };
  }

  const imageOverlayLanding = getImageOverlayLandingBySlug(slug);
  if (imageOverlayLanding) {
    return { family: "image-overlay", id: imageOverlayLanding.id };
  }

  const watermarkLanding = getWatermarkLandingBySlug(slug);
  if (watermarkLanding) {
    return { family: "watermark", id: watermarkLanding.id };
  }

  const memeGeneratorLanding = getMemeGeneratorLandingBySlug(slug);
  if (memeGeneratorLanding) {
    return { family: "meme-generator", id: memeGeneratorLanding.id };
  }

  const imageCollageLanding = getImageCollageLandingBySlug(slug);
  if (imageCollageLanding) {
    return { family: "image-collage", id: imageCollageLanding.id };
  }

  const imageFiltersLanding = getImageFiltersLandingBySlug(slug);
  if (imageFiltersLanding) {
    return { family: "image-filters", id: imageFiltersLanding.id };
  }

  const magnifierLanding = getMagnifierLandingBySlug(slug);
  if (magnifierLanding) {
    return { family: "image-magnifier", id: magnifierLanding.id };
  }

  const base64EncoderLanding = getBase64EncoderLandingBySlug(slug);
  if (base64EncoderLanding) {
    return { family: "base64-encoder", id: base64EncoderLanding.id };
  }

  const imageToSvgLanding = getImageToSvgLandingBySlug(slug);
  if (imageToSvgLanding) {
    return { family: "image-to-svg", id: imageToSvgLanding.id };
  }

  const paletteExtractorLanding = getPaletteExtractorLandingBySlug(slug);
  if (paletteExtractorLanding) {
    return { family: "palette-extractor", id: paletteExtractorLanding.id };
  }

  const colorPickerLanding = getColorPickerLandingBySlug(slug);
  if (colorPickerLanding) {
    return { family: "color-picker", id: colorPickerLanding.id };
  }

  const cssPaletteGenLanding = getCssPaletteGenLandingBySlug(slug);
  if (cssPaletteGenLanding) {
    return { family: "css-palette-gen", id: cssPaletteGenLanding.id };
  }

  return undefined;
}

export function getLandingSeoBySlug(slug: string) {
  const resolved = resolveLandingPageBySlug(slug);
  if (!resolved) {
    return undefined;
  }

  switch (resolved.family) {
    case "image-annotator":
      return IMAGE_ANNOTATOR_LANDINGS[resolved.id];
    case "background-remover":
      return listBackgroundRemoverLandings().find(
        (entry) => entry.id === resolved.id,
      );
    case "resizer":
      return listResizerLandings().find((entry) => entry.id === resolved.id);
    case "cropper":
      return listCropperLandings().find((entry) => entry.id === resolved.id);
    case "custom-cutter":
      return listCustomCutterLandings().find(
        (entry) => entry.id === resolved.id,
      );
    case "rotate-flip":
      return listRotateFlipLandings().find(
        (entry) => entry.id === resolved.id,
      );
    case "text-overlay":
      return listTextOverlayLandings().find(
        (entry) => entry.id === resolved.id,
      );
    case "image-overlay":
      return listImageOverlayLandings().find(
        (entry) => entry.id === resolved.id,
      );
    case "watermark":
      return listWatermarkLandings().find(
        (entry) => entry.id === resolved.id,
      );
    case "meme-generator":
      return listMemeGeneratorLandings().find(
        (entry) => entry.id === resolved.id,
      );
    case "image-collage":
      return listImageCollageLandings().find(
        (entry) => entry.id === resolved.id,
      );
    case "image-filters":
      return listImageFiltersLandings().find(
        (entry) => entry.id === resolved.id,
      );
    case "image-magnifier":
      return listMagnifierLandings().find(
        (entry) => entry.id === resolved.id,
      );
    case "base64-encoder":
      return listBase64EncoderLandings().find(
        (entry) => entry.id === resolved.id,
      );
    case "image-to-svg":
      return listImageToSvgLandings().find(
        (entry) => entry.id === resolved.id,
      );
    case "palette-extractor":
      return listPaletteExtractorLandings().find(
        (entry) => entry.id === resolved.id,
      );
    case "color-picker":
      return listColorPickerLandings().find(
        (entry) => entry.id === resolved.id,
      );
    case "css-palette-gen":
      return listCssPaletteGenLandings().find(
        (entry) => entry.id === resolved.id,
      );
  }
}

export interface LandingPageRef {
  path: string;
  linkTitle: string;
}

/** All SEO landing pages across every tool family — single source for sitemap and static params. */
export function listAllLandingPages(): LandingPageRef[] {
  return [
    ...Object.values(IMAGE_ANNOTATOR_LANDINGS),
    ...listBackgroundRemoverLandings(),
    ...listResizerLandings(),
    ...listCropperLandings(),
    ...listCustomCutterLandings(),
    ...listRotateFlipLandings(),
    ...listTextOverlayLandings(),
    ...listImageOverlayLandings(),
    ...listWatermarkLandings(),
    ...listMemeGeneratorLandings(),
    ...listImageCollageLandings(),
    ...listImageFiltersLandings(),
    ...listMagnifierLandings(),
    ...listBase64EncoderLandings(),
    ...listImageToSvgLandings(),
    ...listPaletteExtractorLandings(),
    ...listColorPickerLandings(),
    ...listCssPaletteGenLandings(),
  ];
}

export function getAllLandingStaticParams(): { landingSlug: string }[] {
  return listAllLandingPages().map((entry) => ({
    landingSlug: entry.path.slice(1),
  }));
}
