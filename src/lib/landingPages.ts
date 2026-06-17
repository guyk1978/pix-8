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
  | "image-magnifier";

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
  | { family: "image-magnifier"; id: MagnifierLandingId };

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
  }
}

export function getAllLandingStaticParams(): { landingSlug: string }[] {
  const annotatorParams = Object.values(IMAGE_ANNOTATOR_LANDINGS).map(
    (entry) => ({
      landingSlug: entry.path.slice(1),
    }),
  );

  const removerParams = listBackgroundRemoverLandings().map((entry) => ({
    landingSlug: entry.path.slice(1),
  }));

  const resizerParams = listResizerLandings().map((entry) => ({
    landingSlug: entry.path.slice(1),
  }));

  const cropperParams = listCropperLandings().map((entry) => ({
    landingSlug: entry.path.slice(1),
  }));

  const customCutterParams = listCustomCutterLandings().map((entry) => ({
    landingSlug: entry.path.slice(1),
  }));

  const rotateFlipParams = listRotateFlipLandings().map((entry) => ({
    landingSlug: entry.path.slice(1),
  }));

  const textOverlayParams = listTextOverlayLandings().map((entry) => ({
    landingSlug: entry.path.slice(1),
  }));

  const imageOverlayParams = listImageOverlayLandings().map((entry) => ({
    landingSlug: entry.path.slice(1),
  }));

  const watermarkParams = listWatermarkLandings().map((entry) => ({
    landingSlug: entry.path.slice(1),
  }));

  const memeGeneratorParams = listMemeGeneratorLandings().map((entry) => ({
    landingSlug: entry.path.slice(1),
  }));

  const imageCollageParams = listImageCollageLandings().map((entry) => ({
    landingSlug: entry.path.slice(1),
  }));

  const imageFiltersParams = listImageFiltersLandings().map((entry) => ({
    landingSlug: entry.path.slice(1),
  }));

  const magnifierParams = listMagnifierLandings().map((entry) => ({
    landingSlug: entry.path.slice(1),
  }));

  return [
    ...annotatorParams,
    ...removerParams,
    ...resizerParams,
    ...cropperParams,
    ...customCutterParams,
    ...rotateFlipParams,
    ...textOverlayParams,
    ...imageOverlayParams,
    ...watermarkParams,
    ...memeGeneratorParams,
    ...imageCollageParams,
    ...imageFiltersParams,
    ...magnifierParams,
  ];
}
