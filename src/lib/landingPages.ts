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
  getCropperLandingBySlug,
  listCropperLandings,
  type CropperLandingId,
} from "@/lib/cropperLandings";
import {
  getResizerLandingBySlug,
  listResizerLandings,
  type ResizerLandingId,
} from "@/lib/resizerLandings";

export type LandingPageFamily =
  | "image-annotator"
  | "background-remover"
  | "cropper"
  | "custom-cutter"
  | "resizer"
  | "rotate-flip"
  | "text-overlay"
  | "image-overlay"
  | "watermark";

export type ResolvedLandingPage =
  | { family: "image-annotator"; id: ImageAnnotatorLandingId }
  | { family: "background-remover"; id: BackgroundRemoverLandingId }
  | { family: "cropper"; id: CropperLandingId }
  | { family: "custom-cutter"; id: CustomCutterLandingId }
  | { family: "resizer"; id: ResizerLandingId }
  | { family: "rotate-flip"; id: RotateFlipLandingId }
  | { family: "text-overlay"; id: TextOverlayLandingId }
  | { family: "image-overlay"; id: ImageOverlayLandingId }
  | { family: "watermark"; id: WatermarkLandingId };

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
  ];
}
