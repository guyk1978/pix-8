import type { EditorLayerType } from "@/lib/editor/layerTypes";

/** Client-safe article slugs for editor layer panels (no filesystem). */
export const EDITOR_LAYER_ARTICLE_SLUGS: Partial<
  Record<EditorLayerType, { slug: string; titleKey: string }>
> = {
  crop: { slug: "the-art-of-cropping", titleKey: "editor.layerArticles.crop" },
  transform: {
    slug: "perfect-orientation-rotation-flipping",
    titleKey: "editor.layerArticles.transform",
  },
  "bg-remove": {
    slug: "ai-background-removal",
    titleKey: "editor.layerArticles.bgRemove",
  },
  watermark: {
    slug: "protecting-your-work-with-watermarks",
    titleKey: "editor.layerArticles.watermark",
  },
  "text-overlay": {
    slug: "adding-text-to-images",
    titleKey: "editor.layerArticles.textOverlay",
  },
  filter: {
    slug: "online-photo-filters",
    titleKey: "editor.layerArticles.filter",
  },
  resize: {
    slug: "privacy-and-speed-local-resizing",
    titleKey: "editor.layerArticles.resize",
  },
  compress: {
    slug: "lossy-vs-lossless-compression",
    titleKey: "editor.layerArticles.compress",
  },
  meme: {
    slug: "meme-generator-guide",
    titleKey: "editor.layerArticles.meme",
  },
  collage: {
    slug: "image-collage-guide",
    titleKey: "editor.layerArticles.collage",
  },
  "image-overlay": {
    slug: "online-photo-overlay-editor",
    titleKey: "editor.layerArticles.imageOverlay",
  },
};
