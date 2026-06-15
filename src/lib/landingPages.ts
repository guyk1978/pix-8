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
  getResizerLandingBySlug,
  listResizerLandings,
  type ResizerLandingId,
} from "@/lib/resizerLandings";

export type LandingPageFamily =
  | "image-annotator"
  | "background-remover"
  | "resizer";

export type ResolvedLandingPage =
  | { family: "image-annotator"; id: ImageAnnotatorLandingId }
  | { family: "background-remover"; id: BackgroundRemoverLandingId }
  | { family: "resizer"; id: ResizerLandingId };

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

  return [...annotatorParams, ...removerParams, ...resizerParams];
}
