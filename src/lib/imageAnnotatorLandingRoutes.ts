import { ImageAnnotatorLandingJsonLd } from "@/components/landing/ImageAnnotatorLandingJsonLd";
import { ImageAnnotatorLandingView } from "@/components/landing/ImageAnnotatorLandingView";
import type { ImageAnnotatorLandingId } from "@/lib/imageAnnotatorLandings";

export const IMAGE_ANNOTATOR_LANDING_VIEW = {
  Landing: ImageAnnotatorLandingView,
  JsonLd: ImageAnnotatorLandingJsonLd,
} as const;

export function getImageAnnotatorLandingView(landingId: ImageAnnotatorLandingId) {
  return {
    landingId,
    ...IMAGE_ANNOTATOR_LANDING_VIEW,
  };
}
