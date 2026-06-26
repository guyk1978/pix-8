"use client";

import { useLayoutEffect, type RefObject } from "react";
import { useOptionalToolExportSettings } from "@/hooks/ToolExportOptionsContext";

const FILMSTRIP_SELECTOR = ".workspace-image-filmstrip";
const FILMSTRIP_THUMB_SELECTOR = ".workspace-image-filmstrip-thumb";
const FILMSTRIP_ADD_SELECTOR = ".workspace-image-filmstrip-add";
const CAPTION_SELECTOR = ".embedded-preview-caption";

const PREVIEW_MEDIA_SELECTOR =
  ".embedded-preview-canvas img, .embedded-preview-canvas canvas, .tool-preview-canvas img, .tool-preview-canvas canvas";

type StyledElement = HTMLElement | HTMLImageElement | HTMLCanvasElement;

function getNaturalSize(element: HTMLImageElement | HTMLCanvasElement): {
  width: number;
  height: number;
} {
  if (element instanceof HTMLImageElement) {
    return {
      width: element.naturalWidth,
      height: element.naturalHeight,
    };
  }

  return {
    width: element.width,
    height: element.height,
  };
}

function isPreviewMedia(
  element: Element,
): element is HTMLImageElement | HTMLCanvasElement {
  if (
    !(element instanceof HTMLImageElement) &&
    !(element instanceof HTMLCanvasElement)
  ) {
    return false;
  }

  if (element.classList.contains("hidden")) return false;
  if (element.getAttribute("aria-hidden") === "true") return false;

  return element.clientWidth > 0 && element.clientHeight > 0;
}

function findPreviewMedia(root: HTMLElement): Array<HTMLImageElement | HTMLCanvasElement> {
  const candidates = root.querySelectorAll("img, canvas");
  return Array.from(candidates).filter(isPreviewMedia);
}

function getReferenceNaturalWidth(root: HTMLElement): number {
  const mainPreview = root.querySelector<HTMLImageElement | HTMLCanvasElement>(
    PREVIEW_MEDIA_SELECTOR,
  );

  if (mainPreview && isPreviewMedia(mainPreview)) {
    const { width } = getNaturalSize(mainPreview);
    if (width > 0) return width;
  }

  const fallback = findPreviewMedia(root).find(
    (element) => !element.closest(FILMSTRIP_SELECTOR),
  );

  if (fallback) {
    const { width } = getNaturalSize(fallback);
    if (width > 0) return width;
  }

  return 0;
}

function computeDisplayRadius(
  element: HTMLImageElement | HTMLCanvasElement,
  cornerRadius: number,
): number {
  const { width: naturalWidth, height: naturalHeight } = getNaturalSize(element);
  const displayWidth = element.clientWidth;
  const displayHeight = element.clientHeight;

  if (naturalWidth <= 0 || naturalHeight <= 0 || displayWidth <= 0) {
    return 0;
  }

  const scale = displayWidth / naturalWidth;
  return Math.min(
    Math.round(cornerRadius * scale),
    Math.floor(displayWidth / 2),
    Math.floor(displayHeight / 2),
  );
}

function computeUiRadius(
  cornerRadius: number,
  referenceNaturalWidth: number,
  displayWidth: number,
  displayHeight: number,
  maxRadius = 24,
): number {
  if (cornerRadius <= 0 || referenceNaturalWidth <= 0 || displayWidth <= 0) {
    return 0;
  }

  const scale = displayWidth / referenceNaturalWidth;
  return Math.min(
    Math.round(cornerRadius * scale),
    Math.floor(displayWidth / 2),
    Math.floor(displayHeight / 2),
    maxRadius,
  );
}

function clearElementRadius(element: StyledElement): void {
  element.style.borderRadius = "";
  element.style.border = "";
  element.style.background = "";
  element.style.padding = "";
  element.style.marginTop = "";
}

function applyPreviewCornerRadius(
  root: HTMLElement,
  cornerRadius: number,
): () => void {
  const styledMedia = new Set<HTMLImageElement | HTMLCanvasElement>();
  const styledUi = new Set<HTMLElement>();

  const apply = () => {
    const referenceNaturalWidth = getReferenceNaturalWidth(root);
    const mediaElements = findPreviewMedia(root);

    for (const element of mediaElements) {
      styledMedia.add(element);

      if (element instanceof HTMLImageElement && !element.complete) {
        element.addEventListener("load", apply, { once: true });
      }

      if (cornerRadius <= 0) {
        element.style.borderRadius = "";
        continue;
      }

      const radius = computeDisplayRadius(element, cornerRadius);
      element.style.borderRadius = radius > 0 ? `${radius}px` : "";
    }

    for (const element of styledMedia) {
      if (!root.contains(element)) {
        element.style.borderRadius = "";
        styledMedia.delete(element);
      }
    }

    const filmstrip = root.querySelector<HTMLElement>(FILMSTRIP_SELECTOR);
    const captions = root.querySelectorAll<HTMLElement>(CAPTION_SELECTOR);
    const thumbs = root.querySelectorAll<HTMLElement>(FILMSTRIP_THUMB_SELECTOR);
    const addButtons = root.querySelectorAll<HTMLElement>(FILMSTRIP_ADD_SELECTOR);

    for (const element of [...captions, filmstrip, ...thumbs, ...addButtons].filter(
      Boolean,
    ) as HTMLElement[]) {
      styledUi.add(element);
    }

    if (cornerRadius <= 0 || !filmstrip) {
      for (const element of styledUi) {
        clearElementRadius(element);
      }
      return;
    }

    const filmstripRadius = computeUiRadius(
      cornerRadius,
      referenceNaturalWidth,
      filmstrip.clientWidth,
      filmstrip.clientHeight,
      28,
    );
    const thumbRadius = computeUiRadius(
      cornerRadius,
      referenceNaturalWidth,
      thumbs[0]?.clientWidth ?? 52,
      thumbs[0]?.clientHeight ?? 52,
      16,
    );
    const addRadius = computeUiRadius(
      cornerRadius,
      referenceNaturalWidth,
      addButtons[0]?.clientWidth ?? 52,
      addButtons[0]?.clientHeight ?? 52,
      16,
    );

    filmstrip.style.borderRadius =
      filmstripRadius > 0 ? `${filmstripRadius}px` : "";
    filmstrip.style.border =
      filmstripRadius > 0
        ? "1px solid color-mix(in srgb, var(--border) 80%, transparent)"
        : "";
    filmstrip.style.background =
      filmstripRadius > 0
        ? "color-mix(in srgb, var(--card) 88%, var(--background))"
        : "";
    filmstrip.style.padding = filmstripRadius > 0 ? "0.75rem 1rem 0.875rem" : "";

    for (const caption of captions) {
      const captionRadius = computeUiRadius(
        cornerRadius,
        referenceNaturalWidth,
        caption.clientWidth,
        caption.clientHeight,
        20,
      );

      caption.style.borderRadius =
        captionRadius > 0 ? `${captionRadius}px` : "";
      caption.style.border =
        captionRadius > 0
          ? "1px solid color-mix(in srgb, var(--border) 80%, transparent)"
          : "";
      caption.style.background =
        captionRadius > 0
          ? "color-mix(in srgb, var(--card) 88%, var(--background))"
          : "";
      caption.style.marginTop = captionRadius > 0 ? "0.5rem" : "";
    }

    for (const thumb of thumbs) {
      const radius =
        thumbRadius > 0
          ? thumbRadius
          : computeUiRadius(
              cornerRadius,
              referenceNaturalWidth,
              thumb.clientWidth,
              thumb.clientHeight,
              16,
            );
      thumb.style.borderRadius = radius > 0 ? `${radius}px` : "";

      const image = thumb.querySelector("img");
      if (image) {
        image.style.borderRadius = radius > 0 ? `${radius}px` : "";
      }
    }

    for (const addButton of addButtons) {
      const radius =
        addRadius > 0
          ? addRadius
          : computeUiRadius(
              cornerRadius,
              referenceNaturalWidth,
              addButton.clientWidth,
              addButton.clientHeight,
              16,
            );
      addButton.style.borderRadius = radius > 0 ? `${radius}px` : "";
    }
  };

  apply();

  const resizeObserver = new ResizeObserver(apply);
  resizeObserver.observe(root);

  const mutationObserver = new MutationObserver(apply);
  mutationObserver.observe(root, { childList: true, subtree: true });

  return () => {
    resizeObserver.disconnect();
    mutationObserver.disconnect();

    for (const element of styledMedia) {
      element.style.borderRadius = "";
    }

    for (const element of styledUi) {
      clearElementRadius(element);
      const image = element.querySelector("img");
      if (image) image.style.borderRadius = "";
    }
  };
}

interface PreviewCornerRadiusEffectProps {
  rootRef: RefObject<HTMLElement | null>;
}

/** Applies live corner-radius preview to images/canvases in the workspace. */
export function PreviewCornerRadiusEffect({
  rootRef,
}: PreviewCornerRadiusEffectProps) {
  const cornerRadius =
    useOptionalToolExportSettings()?.cornerRadius ?? 0;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    return applyPreviewCornerRadius(root, cornerRadius);
  }, [cornerRadius, rootRef]);

  return null;
}
