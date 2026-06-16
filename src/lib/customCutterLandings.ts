export const CUSTOM_CUTTER_TOOL_HREF = "/tools/editor-studio/custom-cutter";

export const CUSTOM_CUTTER_LANDING_ACCENT = "#8E977D";

/** Wire a guide article here when the blog post is published. */
export const CUSTOM_CUTTER_ARTICLE = {
  href: "/articles/privacy-first-custom-cutting",
  title: "Privacy-first custom image cutting guide",
  excerpt:
    "Why client-side keep-or-remove cutouts protect your images and keep transparent exports fast.",
} as const;

/** What Custom Cutter actually supports — use for intent-accurate copy. */
export const CUSTOM_CUTTER_CAPABILITIES = [
  "Draw a rectangular selection by dragging on the image",
  "Keep selection or remove selection with transparent PNG output",
  "Drag and resize the selection with corner handles",
  "Download or copy cutout output",
  "Optional EXIF metadata stripping before export",
  "On-device processing — images never uploaded",
] as const;

/**
 * Add new Custom Cutter SEO landing IDs here.
 * Landing pages belong in this registry — not cropperLandings,
 * imageAnnotatorLandings, backgroundRemoverLandings, or resizerLandings.
 */
export type CustomCutterLandingId =
  | "custom-image-cutter"
  | "freeform-image-cropping"
  | "cut-out-shapes-from-images"
  | "custom-shape-photo-cutter"
  | "precision-image-cutter-tool"
  | "client-side-custom-image-cutter"
  | "browser-based-custom-cropper"
  | "no-upload-custom-shape-cutter"
  | "cut-image-to-custom-size"
  | "custom-crop-for-digital-design"
  | "easy-custom-photo-cutter"
  | "creative-image-cutting-tool";

export interface CustomCutterLandingEntry {
  id: CustomCutterLandingId;
  path: string;
  linkTitle: string;
  linkExcerpt: string;
  seo: {
    title: string;
    description: string;
  };
  faq: readonly { question: string; answer: string }[];
}

export const CUSTOM_CUTTER_LANDINGS: Record<
  CustomCutterLandingId,
  CustomCutterLandingEntry
> = {
  "custom-image-cutter": {
    id: "custom-image-cutter",
    path: "/custom-image-cutter",
    linkTitle: "Custom image cutter",
    linkExcerpt:
      "Cut images with keep-or-remove selection — client-side, no upload.",
    seo: {
      title: "Custom Image Cutter",
      description:
        "Custom image cutter in your browser. Keep or remove regions on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "What is a custom image cutter?",
        answer:
          "A custom image cutter lets you draw a rectangular selection on your image and export either the region inside the selection (keep) or outside it (remove) — with transparent PNG output for cutouts. Pix-8 Custom Cutter runs entirely in your browser on a client-side canvas. Your file is read locally and is never uploaded to Pix-8 or any third-party server.",
      },
      {
        question: "How is Custom Cutter different from Pix-8 Cropper?",
        answer:
          "Cropper reframes your image to a rectangular crop with aspect-ratio and social media presets. Custom Cutter focuses on keep-or-remove region cutouts — draw a selection, choose keep or remove, and export a transparent PNG. It does not include aspect-ratio presets, social media ratios, or batch cutting. Use Cropper when you need to frame to a fixed ratio; use Custom Cutter when you need a cutout or isolated region.",
      },
      {
        question: "Is this custom image cutter free and private?",
        answer:
          "Yes. The tool is free with no account required. All cutting runs client-side in your browser — your images stay on your device throughout, with optional EXIF stripping before export.",
      },
    ],
  },
  "freeform-image-cropping": {
    id: "freeform-image-cropping",
    path: "/freeform-image-cropping",
    linkTitle: "Freeform cropping",
    linkExcerpt:
      "Draw any crop region — keep or remove, client-side, no upload.",
    seo: {
      title: "Freeform Image Cropping",
      description:
        "Freeform image cropping in your browser. Draw any region on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "What does freeform image cropping mean in Pix-8?",
        answer:
          "You draw a rectangular selection at any position and size on your image — without locking to aspect-ratio presets — then export the region inside (keep) or outside (remove) with transparent PNG output. Pix-8 Custom Cutter runs entirely in your browser on a client-side canvas. Your file is read locally and is never uploaded to Pix-8 or any third-party server. It does not include lasso, pen-path, polygon, or arbitrary-shape cropping tools.",
      },
      {
        question: "How is freeform cropping different from Pix-8 Cropper?",
        answer:
          "Cropper reframes your full image to a rectangular crop and offers aspect-ratio and social media presets with a live size preview. Custom Cutter focuses on unconstrained region selection with keep-or-remove export — ideal when you need a cutout or isolated area rather than a ratio-locked reframe. It does not include aspect-ratio presets, social media ratios, or batch cropping.",
      },
      {
        question: "Is this freeform image cropping free and private?",
        answer:
          "Yes. The tool is free with no account required. All cropping runs client-side in your browser — your images stay on your device throughout, with optional EXIF stripping before export.",
      },
    ],
  },
  "cut-out-shapes-from-images": {
    id: "cut-out-shapes-from-images",
    path: "/cut-out-shapes-from-images",
    linkTitle: "Cut out shapes",
    linkExcerpt:
      "Isolate regions from images — transparent PNG, client-side, no upload.",
    seo: {
      title: "Cut Out Shapes From Images",
      description:
        "Cut out shapes from images in your browser. Isolate regions on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I cut out shapes from an image without uploading?",
        answer:
          "Yes. Pix-8 Custom Cutter runs entirely in your browser. Draw a rectangular selection around the area you want to isolate, choose keep selection to export that region or remove selection to cut it out with transparent PNG output — your file is read locally and is never uploaded to Pix-8 or any third-party server.",
      },
      {
        question: "What shapes can this tool cut out?",
        answer:
          "Custom Cutter uses rectangular selections — draw and resize a box around the subject or region you want to keep or remove, then export with transparent background on cutouts. It does not include circle, polygon, lasso, pen-path, or custom vector shape tools. For full background removal across the entire image, use Pix-8 Background Remover.",
      },
      {
        question: "Is cutting out shapes from images free and private?",
        answer:
          "Yes. The tool is free with no account required. All processing runs client-side in your browser — your images stay on your device throughout, with optional EXIF stripping before export.",
      },
    ],
  },
  "custom-shape-photo-cutter": {
    id: "custom-shape-photo-cutter",
    path: "/custom-shape-photo-cutter",
    linkTitle: "Custom shape cutter",
    linkExcerpt:
      "Cut photos with custom regions — transparent PNG, client-side, no upload.",
    seo: {
      title: "Custom Shape Photo Cutter",
      description:
        "Custom shape photo cutter in your browser. Cut photo regions on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "What is a custom shape photo cutter?",
        answer:
          "A custom shape photo cutter lets you draw a rectangular selection on a photo and export either the region inside (keep) or outside (remove) — with transparent PNG output for cutouts. Pix-8 Custom Cutter runs entirely in your browser on a client-side canvas. Your file is read locally and is never uploaded to Pix-8 or any third-party server. It does not include circle, polygon, lasso, or pen-path shape tools.",
      },
      {
        question: "How is this different from Pix-8 Cropper for photos?",
        answer:
          "Cropper reframes your full photo to a rectangular crop with aspect-ratio and social media presets. Custom Cutter isolates a region with keep-or-remove export — useful for product shots, portraits, or compositing elements with transparent backgrounds. It does not include aspect-ratio presets, social media ratios, or batch cutting.",
      },
      {
        question: "Is this custom shape photo cutter free and private?",
        answer:
          "Yes. The tool is free with no account required. All cutting runs client-side in your browser — your photos stay on your device throughout, with optional EXIF stripping before export.",
      },
    ],
  },
  "precision-image-cutter-tool": {
    id: "precision-image-cutter-tool",
    path: "/precision-image-cutter-tool",
    linkTitle: "Precision cutter",
    linkExcerpt:
      "Precise region cutting in your browser — pixel readout, client-side, no upload.",
    seo: {
      title: "Precision Image Cutter Tool",
      description:
        "Precision image cutter tool in your browser. Drag-and-resize with pixel readout on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I cut images precisely without uploading them?",
        answer:
          "Yes. Pix-8 Custom Cutter runs entirely in your browser. Load an image locally, drag and resize the selection with corner handles, and read selection width and height in pixels before export — your file is read on-device and is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "How does this precision image cutter help me cut accurately?",
        answer:
          "Drag the selection to position your cut area, resize from corner handles, and read width and height in pixels from the on-screen readout as you adjust. Choose keep selection or remove selection, then export transparent PNG output. It does not include typed coordinate fields, on-image ruler overlays, snap-to-grid guides, or AI edge detection.",
      },
      {
        question: "How is this different from Pix-8 Cropper precision cropping?",
        answer:
          "Cropper reframes your image to a rectangular crop with aspect-ratio presets and a live crop size preview. Custom Cutter focuses on precise region definition for keep-or-remove cutouts with transparent PNG export. Use Cropper when you need ratio-locked reframing; use Custom Cutter when you need an isolated region cut to exact pixel dimensions.",
      },
    ],
  },
  "client-side-custom-image-cutter": {
    id: "client-side-custom-image-cutter",
    path: "/client-side-custom-image-cutter",
    linkTitle: "Client-side custom cutter",
    linkExcerpt:
      "Cut images in your browser tab — on-device canvas, no upload.",
    seo: {
      title: "Client-Side Custom Image Cutter",
      description:
        "Client-side custom image cutter in your browser. On-device canvas cutting — no upload, no server. Private tool by Pix-8.",
    },
    faq: [
      {
        question: "What does client-side custom image cutting mean?",
        answer:
          "Your image is read locally through the browser File API and cut on a canvas in your browser tab. Draw a rectangular selection, choose keep or remove, and export transparent PNG output — pixel data is not sent to Pix-8 or any third-party server for processing. Your file stays on your device throughout.",
      },
      {
        question: "How is a client-side custom cutter different from cloud image cutters?",
        answer:
          "Cloud cutters require uploading your file before any cut runs. Pix-8 Custom Cutter processes on a client-side canvas — drag and resize the selection, choose keep or remove, then download or copy. It does not include server-side APIs, cloud storage sync, batch cutting, or account-based file retention.",
      },
      {
        question: "How is this different from Pix-8 Cropper client-side cropping?",
        answer:
          "Cropper reframes your image to a rectangular crop with aspect-ratio and social media presets on a client-side canvas. Custom Cutter focuses on keep-or-remove region cutouts with transparent PNG export — draw a selection, isolate or remove the area, and export. Use Cropper for ratio-locked reframing; use Custom Cutter for cutout workflows.",
      },
    ],
  },
  "browser-based-custom-cropper": {
    id: "browser-based-custom-cropper",
    path: "/browser-based-custom-cropper",
    linkTitle: "Browser custom cropper",
    linkExcerpt:
      "Cut images in your browser — no install, client-side, no upload.",
    seo: {
      title: "Browser-Based Custom Cropper",
      description:
        "Browser-based custom cropper in your browser. Cut on-device — no install, no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "What does a browser-based custom cropper mean?",
        answer:
          "All custom cutting runs in your web browser on a client-side canvas — no desktop install, no account, and no file upload to a server. Draw a rectangular selection, choose keep or remove, and export transparent PNG output. It does not include AI auto-cutout, batch cutting, or offline PWA guarantees beyond standard browser behavior.",
      },
      {
        question: "Are my images uploaded when I use this browser custom cropper?",
        answer:
          "No. Your file is read locally via the browser File API and cut on-device. It is never transmitted to Pix-8 or any third-party server — the core privacy advantage of a browser-based custom cropper that keeps processing client-side.",
      },
      {
        question: "How is this different from Pix-8 Cropper browser-based cropping?",
        answer:
          "Cropper reframes your image to a rectangular crop with aspect-ratio and social media presets in the browser tab. Custom Cutter focuses on keep-or-remove region cutouts with transparent PNG export — draw a selection, isolate or remove the area, and export. Use Cropper for ratio-locked reframing; use Custom Cutter for cutout workflows.",
      },
    ],
  },
  "no-upload-custom-shape-cutter": {
    id: "no-upload-custom-shape-cutter",
    path: "/no-upload-custom-shape-cutter",
    linkTitle: "No-upload shape cutter",
    linkExcerpt:
      "Cut custom shapes without uploading — client-side in your browser.",
    seo: {
      title: "No-Upload Custom Shape Cutter",
      description:
        "No-upload custom shape cutter in your browser. Cut regions on-device — no server, no cloud queue. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Does this custom shape cutter require an upload?",
        answer:
          "No. Pix-8 Custom Cutter runs entirely in your browser. Your image is read locally through the File API and cut on a client-side canvas — it is never uploaded to Pix-8 or any third-party server. Draw a rectangular selection, choose keep or remove, and export transparent PNG output. There is no cloud queue, no account, and no server-side processing step.",
      },
      {
        question: "How is a no-upload custom shape cutter different from cloud image cutters?",
        answer:
          "Cloud cutters require sending your file to a remote server before any cut runs. Pix-8 processes on-device — drag and resize the selection, choose keep or remove, then download or copy transparent PNG output. It does not include drag-to-cloud workflows, server APIs, batch cutting, circle or polygon shape tools, or stored file history.",
      },
      {
        question: "How is this different from Pix-8 Cropper no-upload cropping?",
        answer:
          "Cropper reframes your image to a rectangular crop with aspect-ratio and social media presets without uploading. Custom Cutter focuses on keep-or-remove region cutouts with transparent PNG export — draw a selection, isolate or remove the area, and export. Use Cropper for ratio-locked reframing; use Custom Cutter for shape cutout workflows without an upload step.",
      },
    ],
  },
  "cut-image-to-custom-size": {
    id: "cut-image-to-custom-size",
    path: "/cut-image-to-custom-size",
    linkTitle: "Cut to custom size",
    linkExcerpt:
      "Cut images to target dimensions in your browser — pixel readout, client-side, no upload.",
    seo: {
      title: "Cut Image to Custom Size",
      description:
        "Cut image to custom size in your browser. Frame cutouts to pixel dimensions on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I cut an image to a custom size without uploading?",
        answer:
          "Yes. Pix-8 Custom Cutter runs entirely in your browser. Load an image locally, drag and resize the selection, and read width and height in pixels from the on-screen readout as you adjust — your file is read on-device and is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "How do I cut an image to a target size?",
        answer:
          "Drag and resize the selection while the live readout shows width and height in pixels. Fine-tune with corner handles until the dimensions match your target, then choose keep selection or remove selection and export transparent PNG output. It does not include typed width-and-height input fields or aspect-ratio presets — use Pix-8 Cropper for ratio-locked reframing or Pix-8 Resizer to scale a full image to exact pixel dimensions without reframing.",
      },
      {
        question: "How is cutting to custom size different from Pix-8 Cropper?",
        answer:
          "Cropper reframes your full image to a rectangular crop with aspect-ratio and social media presets. Custom Cutter isolates a region with keep-or-remove export — useful when you need a cutout at specific pixel dimensions with a transparent background. Both show output dimensions as you adjust; Custom Cutter is built for cutout workflows, not full-image reframing.",
      },
    ],
  },
  "custom-crop-for-digital-design": {
    id: "custom-crop-for-digital-design",
    path: "/custom-crop-for-digital-design",
    linkTitle: "Digital design crop",
    linkExcerpt:
      "Custom crop for digital design in your browser — transparent PNG, client-side, no upload.",
    seo: {
      title: "Custom Crop for Digital Design",
      description:
        "Custom crop for digital design in your browser. Isolate assets on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "How does Custom Cutter help digital design workflows?",
        answer:
          "Draw a rectangular selection around a graphic element, product shot, or UI asset, then export keep-or-remove cutouts with transparent PNG output — ready to drop into Figma, slides, or mockups. Pix-8 runs entirely in your browser on a client-side canvas. Your file is read locally and is never uploaded to Pix-8 or any third-party server. It does not include vector editing, layer stacks, or AI auto-cutout.",
      },
      {
        question: "Can I crop design assets without uploading client files?",
        answer:
          "Yes. Load an image locally, define your cut region with drag-and-resize handles, choose keep selection or remove selection, and export transparent PNG output — all on-device in your browser tab. There is no cloud queue, no account, and no server-side processing step.",
      },
      {
        question: "How is this different from Pix-8 Cropper for design work?",
        answer:
          "Cropper reframes your full image to a rectangular crop with aspect-ratio and social media presets. Custom Cutter isolates a region with keep-or-remove export — useful when you need a design asset cutout with a transparent background for compositing. Use Cropper when you need ratio-locked reframing; use Custom Cutter when you need an isolated element for digital design layouts.",
      },
    ],
  },
  "easy-custom-photo-cutter": {
    id: "easy-custom-photo-cutter",
    path: "/easy-custom-photo-cutter",
    linkTitle: "Easy photo cutter",
    linkExcerpt:
      "Cut photos easily in your browser — drag selection, client-side, no upload.",
    seo: {
      title: "Easy Custom Photo Cutter",
      description:
        "Easy custom photo cutter in your browser. Cut photos on-device — no install, no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "How easy is it to cut photos with Custom Cutter?",
        answer:
          "Open Custom Cutter in your browser, load a photo locally, draw a rectangular selection by dragging, choose keep or remove, and export transparent PNG output — no install, no account, and no upload step. Resize from corner handles and reset to redraw if needed. Pix-8 runs entirely on a client-side canvas; your photo is never uploaded to Pix-8 or any third-party server.",
      },
      {
        question: "What can this easy custom photo cutter do — and what does it not include?",
        answer:
          "Draw and resize a selection on any photo, choose keep selection or remove selection, read width and height in pixels as you adjust, then download or copy transparent PNG cutouts with optional EXIF stripping. It does not include circle or polygon shape tools, AI auto-cutout, batch cutting, or typed coordinate fields.",
      },
      {
        question: "How is this different from Pix-8 Cropper for photos?",
        answer:
          "Cropper reframes your full photo to a rectangular crop with aspect-ratio and social media presets. Custom Cutter isolates a region with keep-or-remove export — a straightforward path when you need a photo cutout with a transparent background. Use Cropper for ratio-locked reframing; use Custom Cutter for simple keep-or-remove photo cutouts.",
      },
    ],
  },
  "creative-image-cutting-tool": {
    id: "creative-image-cutting-tool",
    path: "/creative-image-cutting-tool",
    linkTitle: "Creative cutting tool",
    linkExcerpt:
      "Creative image cutting in your browser — cutouts, client-side, no upload.",
    seo: {
      title: "Creative Image Cutting Tool",
      description:
        "Creative image cutting tool in your browser. Cut and isolate on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "What is a creative image cutting tool?",
        answer:
          "A creative image cutting tool lets you draw a rectangular selection on an image and export keep-or-remove cutouts with transparent PNG output — useful for compositing, collages, and visual projects. Pix-8 Custom Cutter runs entirely in your browser on a client-side canvas. Your file is read locally and is never uploaded to Pix-8 or any third-party server. It does not include lasso, polygon, pen-path, or AI auto-cutout tools.",
      },
      {
        question: "Can I cut images for creative projects without uploading them?",
        answer:
          "Yes. Load an image locally, drag and resize your selection, choose keep selection or remove selection, and export transparent PNG output — all on-device in your browser tab. There is no cloud queue, no account, and no server-side processing step.",
      },
      {
        question: "How is this different from Pix-8 Background Remover for creative cutouts?",
        answer:
          "Background Remover strips the full image background automatically. Custom Cutter lets you define exactly which region to keep or remove with a drag-and-resize selection — better when you need a specific creative cutout, not full-image background removal. Use Background Remover for whole-subject isolation; use Custom Cutter for targeted region cutouts.",
      },
    ],
  },
};

export function listCustomCutterLandings(): CustomCutterLandingEntry[] {
  return Object.values(CUSTOM_CUTTER_LANDINGS);
}

export function getCustomCutterLandingByPath(
  path: string,
): CustomCutterLandingEntry | undefined {
  return listCustomCutterLandings().find((entry) => entry.path === path);
}

export function getCustomCutterLandingBySlug(
  slug: string,
): CustomCutterLandingEntry | undefined {
  const normalized = slug.replace(/^\/+/, "");
  return listCustomCutterLandings().find(
    (entry) => entry.path === `/${normalized}`,
  );
}
