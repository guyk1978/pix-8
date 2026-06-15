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

export type LandingPageFamily = "image-annotator" | "background-remover";

export type ResolvedLandingPage =
  | { family: "image-annotator"; id: ImageAnnotatorLandingId }
  | { family: "background-remover"; id: BackgroundRemoverLandingId };

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

  return undefined;
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

  return [...annotatorParams, ...removerParams];
}
