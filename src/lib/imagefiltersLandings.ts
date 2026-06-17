export const IMAGE_FILTERS_TOOL_HREF = "/tools/editor-studio/image-filters";

export const IMAGE_FILTERS_LANDING_ACCENT = "#8E977D";

export const IMAGE_FILTERS_ARTICLE = {
  href: "/articles/online-photo-filters",
  title:
    "How to Apply Stunning Photo Filters Online – Without Leaving Your Browser",
  excerpt:
    "Apply grayscale, sepia, vintage, blur, and vignette effects instantly in your browser. No uploads, no accounts, and your photos never leave your device.",
} as const;

/** What Image Filters & Effects actually supports — use for intent-accurate copy. */
export const IMAGE_FILTERS_CAPABILITIES = [
  "Load photos from your device locally",
  "Grayscale, sepia, vintage, blur, and vignette filter presets",
  "Live before/after comparison slider",
  "Download or copy filtered output",
  "Optional EXIF metadata stripping before export",
  "On-device processing — images never uploaded to a server",
] as const;

/**
 * Add new Image Filters & Effects SEO landing IDs here as union members.
 * Filter and effects landing pages belong in this registry — not
 * resizerLandings, imageAnnotatorLandings, rotateFlipLandings, or other
 * tool registries.
 */
export type ImageFiltersLandingId =
  | "add-image-filters-online"
  | "photo-effects-online"
  | "free-image-filter-tool"
  | "apply-filters-to-photos"
  | "vintage-photo-filters-online"
  | "black-and-white-photo-effect"
  | "apply-artistic-effects-to-photos"
  | "enhance-photo-colors-online"
  | "client-side-image-filters"
  | "no-upload-photo-effects-editor"
  | "privacy-first-photo-filter-tool"
  | "browser-based-image-processor"
  | "professional-photo-filters-for-social-media"
  | "apply-stunning-effects-to-images"
  | "quick-photo-styler-online";

export interface ImageFiltersLandingEntry {
  id: ImageFiltersLandingId;
  path: string;
  linkTitle: string;
  linkExcerpt: string;
  seo: {
    title: string;
    description: string;
  };
  faq: readonly { question: string; answer: string }[];
}

/**
 * Add new Image Filters & Effects SEO landing entries here.
 * Filter and effects landing pages belong in this registry — not
 * resizerLandings, imageAnnotatorLandings, rotateFlipLandings, or other
 * tool registries.
 */
export const IMAGE_FILTERS_LANDINGS: Record<
  ImageFiltersLandingId,
  ImageFiltersLandingEntry
> = {
  "add-image-filters-online": {
    id: "add-image-filters-online",
    path: "/add-image-filters-online",
    linkTitle: "Add image filters online",
    linkExcerpt:
      "Add image filters online in your browser — client-side, no upload.",
    seo: {
      title: "Add Image Filters Online",
      description:
        "Add image filters online in your browser. Apply grayscale, sepia, vintage, blur, and vignette on-device — no upload, no server. Private client-side Image Filters by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I add image filters online without uploading photos to a server?",
        answer:
          "Yes. Pix-8 Image Filters & Effects runs entirely in your browser. Your photo is read locally, filtered on a client-side canvas, and exported from your device. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What filters can I apply to an image?",
        answer:
          "Image Filters & Effects includes grayscale, sepia, vintage, blur, and vignette presets. Load a photo, select a filter, preview with the before/after slider, then download or copy one filtered export. It does not batch-process folders, apply custom LUTs, or add text, stickers, or pin-style annotation labels.",
      },
      {
        question:
          "How is this different from Grayscale Converter or Light Adjuster?",
        answer:
          "Image Filters & Effects applies mood presets — grayscale, sepia, vintage, blur, and vignette — with a live before/after comparison. Grayscale Converter focuses on black-and-white conversion with dedicated controls. Light Adjuster tunes brightness and contrast manually. Image Filters does not replace full tone curves, selective color edits, or layered compositing.",
      },
    ],
  },
  "photo-effects-online": {
    id: "photo-effects-online",
    path: "/photo-effects-online",
    linkTitle: "Photo effects online",
    linkExcerpt:
      "Photo effects online in your browser — client-side, no upload.",
    seo: {
      title: "Photo Effects Online",
      description:
        "Photo effects online in your browser. Apply grayscale, sepia, vintage, blur, and vignette on-device — no upload, no server. Private client-side Image Filters by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I apply photo effects online without uploading to a server?",
        answer:
          "Yes. Pix-8 Image Filters & Effects runs entirely in your browser. Your photo is read locally, effects are rendered on a client-side canvas, and the result is exported from your device. Your files are never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What photo effects are available?",
        answer:
          "Image Filters & Effects includes five presets: grayscale, sepia, vintage, blur, and vignette. Load a photo, pick an effect, compare with the before/after slider, then download or copy one export. It does not offer AI style transfer, animated effects, batch folders, or layered text and sticker overlays.",
      },
      {
        question:
          "Is this the same as a full photo editor with layers and retouching?",
        answer:
          "No. Image Filters & Effects applies single-preset mood effects with a live before/after preview and one-file export. It does not crop, resize, remove backgrounds, add pin-style annotation labels, or stack multiple adjustment layers. For cropping or background removal, use Pix-8 Cropper or Background Remover; for text, use Text Overlay.",
      },
    ],
  },
  "free-image-filter-tool": {
    id: "free-image-filter-tool",
    path: "/free-image-filter-tool",
    linkTitle: "Free image filter tool",
    linkExcerpt:
      "Free image filter tool in your browser — client-side, no upload.",
    seo: {
      title: "Free Image Filter Tool",
      description:
        "Free image filter tool in your browser. Apply grayscale, sepia, vintage, blur, and vignette on-device — no upload, no account, no server. Client-side Image Filters by Pix-8.",
    },
    faq: [
      {
        question: "Is this image filter tool really free?",
        answer:
          "Yes. Pix-8 Image Filters & Effects is free to use in your browser with no account, no subscription, and no per-export fee. Your photo is read locally, filtered on a client-side canvas, and exported from your device. Pix-8 does not charge for the presets or the download step.",
      },
      {
        question: "Does the free tool upload my photos to a server?",
        answer:
          "No. Image Filters & Effects runs entirely in your browser. Your image is processed on a client-side canvas in your tab and exported from your device. It is never transmitted to Pix-8 or any third-party server — there is no upload step behind the free access.",
      },
      {
        question: "What can the free tool do — and what does it not include?",
        answer:
          "The free tool loads one photo at a time and applies grayscale, sepia, vintage, blur, or vignette with a before/after slider, then lets you download or copy one export. It does not batch-process folders, remove backgrounds, add pin-style annotation labels, or stack multiple filters on one image. For cropping or background removal, use Pix-8 Cropper or Background Remover.",
      },
    ],
  },
  "apply-filters-to-photos": {
    id: "apply-filters-to-photos",
    path: "/apply-filters-to-photos",
    linkTitle: "Apply filters to photos",
    linkExcerpt:
      "Apply filters to photos in your browser — client-side, no upload.",
    seo: {
      title: "Apply Filters to Photos",
      description:
        "Apply filters to photos in your browser. Grayscale, sepia, vintage, blur, and vignette on-device — no upload, no server. Private client-side Image Filters by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I apply filters to photos without uploading them to a server?",
        answer:
          "Yes. Pix-8 Image Filters & Effects runs entirely in your browser. Each photo is read locally, filtered on a client-side canvas, and exported from your device. Your images are never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "Which filters can I apply to my photos?",
        answer:
          "Image Filters & Effects includes grayscale, sepia, vintage, blur, and vignette presets. Load a photo, select a filter, preview with the before/after slider, then download or copy one filtered export. It does not apply multiple filters at once, batch-process folders, or add text, stickers, or pin-style annotation labels.",
      },
      {
        question: "Can I filter multiple photos in one session?",
        answer:
          "Image Filters & Effects processes one photo per session. Load an image, apply a preset, export, then load the next photo if needed. It does not queue folders, apply bulk presets across files, or automate multi-image workflows.",
      },
    ],
  },
  "vintage-photo-filters-online": {
    id: "vintage-photo-filters-online",
    path: "/vintage-photo-filters-online",
    linkTitle: "Vintage photo filters online",
    linkExcerpt:
      "Vintage photo filters online in your browser — client-side, no upload.",
    seo: {
      title: "Vintage Photo Filters Online",
      description:
        "Vintage photo filters online in your browser. Apply the Vintage preset plus sepia, grayscale, blur, and vignette on-device — no upload, no server. Client-side Image Filters by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I use vintage photo filters online without uploading my pictures?",
        answer:
          "Yes. Pix-8 Image Filters & Effects runs entirely in your browser. Your photo is read locally, the Vintage preset is rendered on a client-side canvas, and the result is exported from your device. Your images are never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What vintage filters are included?",
        answer:
          "Image Filters & Effects includes one Vintage preset that warms and fades tones for a retro look. You can also try Sepia for a classic brown tint, or combine your export workflow with Grayscale, Blur, and Vignette presets — one preset at a time per export. It does not offer multiple vintage LUT packs, film-stock emulations, or adjustable vintage sliders beyond selecting the preset.",
      },
      {
        question: "How is Vintage different from Sepia in this tool?",
        answer:
          "Both are single-click presets in Image Filters & Effects. Vintage applies a faded, warm retro grade; Sepia shifts the image toward brown monochrome tones. Load your photo, switch between presets, and use the before/after slider to compare before you export one filtered file. The tool does not blend presets, batch-apply looks, or add pin-style annotation labels.",
      },
    ],
  },
  "black-and-white-photo-effect": {
    id: "black-and-white-photo-effect",
    path: "/black-and-white-photo-effect",
    linkTitle: "Black & white photo effect",
    linkExcerpt:
      "Black and white photo effect in your browser — client-side, no upload.",
    seo: {
      title: "Black and White Photo Effect",
      description:
        "Black and white photo effect in your browser. Apply the Grayscale preset on-device — no upload, no server. Private client-side Image Filters by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I add a black and white photo effect without uploading to a server?",
        answer:
          "Yes. Pix-8 Image Filters & Effects runs entirely in your browser. Your photo is read locally, the Grayscale preset is rendered on a client-side canvas, and the result is exported from your device. Your images are never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "How do I turn a photo black and white with this tool?",
        answer:
          "Load your image, select the Grayscale preset, preview the monochrome result with the before/after slider, then download or copy one export. Image Filters & Effects applies one preset at a time — it does not offer selective color, tone curves, or channel mixing. For a dedicated black-and-white conversion workflow, see Pix-8 Grayscale Converter.",
      },
      {
        question:
          "How is the Grayscale preset different from Grayscale Converter?",
        answer:
          "Image Filters & Effects applies a single Grayscale preset alongside sepia, vintage, blur, and vignette — useful when you want a quick monochrome look with before/after preview in one filter workspace. Grayscale Converter is a separate tool focused on black-and-white conversion. Image Filters does not batch-process folders or add pin-style annotation labels.",
      },
    ],
  },
  "apply-artistic-effects-to-photos": {
    id: "apply-artistic-effects-to-photos",
    path: "/apply-artistic-effects-to-photos",
    linkTitle: "Artistic photo effects",
    linkExcerpt:
      "Apply artistic effects to photos in your browser — client-side, no upload.",
    seo: {
      title: "Apply Artistic Effects to Photos",
      description:
        "Apply artistic effects to photos in your browser. Sepia, vintage, vignette, blur, and grayscale presets on-device — no upload, no server. Client-side Image Filters by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I apply artistic effects to photos without uploading to a server?",
        answer:
          "Yes. Pix-8 Image Filters & Effects runs entirely in your browser. Your photo is read locally, each preset is rendered on a client-side canvas, and the result is exported from your device. Your images are never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What artistic effects can I apply to photos?",
        answer:
          "Image Filters & Effects includes five mood presets: sepia, vintage, vignette, blur, and grayscale. Load a photo, select one preset, preview with the before/after slider, then download or copy one export. It does not generate AI art, oil-painting styles, sketch filters, or layered decorative overlays — for preset graphics on images, see Pix-8 Image Overlay.",
      },
      {
        question:
          "Can I stack multiple artistic effects on one photo?",
        answer:
          "Image Filters & Effects applies one preset per export. Switch between sepia, vintage, vignette, blur, and grayscale in the same session and compare with the before/after slider, but only one look exports at a time. It does not batch-process folders, blend presets, or add pin-style annotation labels.",
      },
    ],
  },
  "enhance-photo-colors-online": {
    id: "enhance-photo-colors-online",
    path: "/enhance-photo-colors-online",
    linkTitle: "Enhance photo colors online",
    linkExcerpt:
      "Enhance photo colors online in your browser — client-side, no upload.",
    seo: {
      title: "Enhance Photo Colors Online",
      description:
        "Enhance photo colors online in your browser. Warm sepia and vintage tones on-device — no upload, no server. Client-side Image Filters by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I enhance photo colors online without uploading to a server?",
        answer:
          "Yes. Pix-8 Image Filters & Effects runs entirely in your browser. Your photo is read locally, color-tone presets are rendered on a client-side canvas, and the result is exported from your device. Your images are never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "How can I enhance photo colors with this tool?",
        answer:
          "Image Filters & Effects shifts color mood with single-click presets — Sepia warms toward brown tones and Vintage fades and warms for a richer retro grade. Load a photo, switch between presets, and compare each look with the before/after slider before you export one file. It does not offer saturation, vibrance, or HSL sliders, selective color isolation, or tone curves. For manual brightness and contrast tuning, see Pix-8 Light Adjuster.",
      },
      {
        question:
          "Can I boost saturation or adjust individual color channels?",
        answer:
          "Image Filters & Effects applies one preset per export — sepia, vintage, grayscale, blur, or vignette. Grayscale removes color entirely; sepia and vintage reshape the overall tone rather than boosting channel saturation. It does not batch-process folders, stack presets, or add pin-style annotation labels.",
      },
    ],
  },
  "client-side-image-filters": {
    id: "client-side-image-filters",
    path: "/client-side-image-filters",
    linkTitle: "Client-side image filters",
    linkExcerpt:
      "Client-side image filters in your browser — no upload, no server.",
    seo: {
      title: "Client-Side Image Filters",
      description:
        "Client-side image filters in your browser. Grayscale, sepia, vintage, blur, and vignette on-device — no upload, no server. Private Image Filters by Pix-8.",
    },
    faq: [
      {
        question: "What does client-side mean for image filters?",
        answer:
          "Pix-8 Image Filters & Effects reads your photo locally via the browser File API, renders each preset on a client-side canvas in your tab, and exports the result from your device. Your pixel data is never transmitted to Pix-8 or any third-party server — filtering stays on your machine, not in a remote queue.",
      },
      {
        question:
          "Are client-side image filters the same as a cloud filter app?",
        answer:
          "No. Cloud filter apps upload your photo before you see a result. Image Filters & Effects applies grayscale, sepia, vintage, blur, and vignette presets entirely in the browser with a live before/after slider and one-file export. It does not require an account, store images on a server, or offer AI style transfer, custom LUT uploads, or batch folder processing.",
      },
      {
        question:
          "What filters are available in this client-side tool?",
        answer:
          "Image Filters & Effects includes five single-click presets: grayscale, sepia, vintage, blur, and vignette. Load one photo per session, select a preset, preview with the before/after slider, then download or copy one export. It does not stack multiple filters, apply pin-style annotation labels, or replace a full editor with layers and retouching brushes.",
      },
    ],
  },
  "no-upload-photo-effects-editor": {
    id: "no-upload-photo-effects-editor",
    path: "/no-upload-photo-effects-editor",
    linkTitle: "No-upload photo effects",
    linkExcerpt:
      "No-upload photo effects editor in your browser — client-side, on-device.",
    seo: {
      title: "No-Upload Photo Effects Editor",
      description:
        "No-upload photo effects editor in your browser. Grayscale, sepia, vintage, blur, and vignette on-device — no server, no account. Private Image Filters by Pix-8.",
    },
    faq: [
      {
        question:
          "Does this photo effects editor upload my images to a server?",
        answer:
          "No. Pix-8 Image Filters & Effects is a no-upload photo effects editor — your photo is read locally via the browser File API, each preset is rendered on a client-side canvas in your tab, and the result is exported from your device. Your images are never transmitted to Pix-8 or any third-party server.",
      },
      {
        question:
          "What photo effects can I apply without uploading?",
        answer:
          "Image Filters & Effects includes five presets: grayscale, sepia, vintage, blur, and vignette. Load a photo, select one effect, preview with the before/after slider, then download or copy one export. It is a focused filter workspace — not a full editor with layers, retouching brushes, text blocks, or pin-style annotation labels.",
      },
      {
        question:
          "How is this different from cloud photo effect apps?",
        answer:
          "Cloud effect apps queue your file on a remote server before you see a grade. Image Filters & Effects skips that step entirely — effects render on-device with a live before/after comparison and one-file export. It does not require an account, store photos on a backend, batch-process folders, or offer AI style transfer.",
      },
    ],
  },
  "privacy-first-photo-filter-tool": {
    id: "privacy-first-photo-filter-tool",
    path: "/privacy-first-photo-filter-tool",
    linkTitle: "Privacy-first photo filters",
    linkExcerpt:
      "Privacy-first photo filter tool in your browser — client-side, no upload.",
    seo: {
      title: "Privacy-First Photo Filter Tool",
      description:
        "Privacy-first photo filter tool in your browser. Grayscale, sepia, vintage, blur, and vignette on-device — no upload, no server. Private Image Filters by Pix-8.",
    },
    faq: [
      {
        question:
          "What makes this a privacy-first photo filter tool?",
        answer:
          "Pix-8 Image Filters & Effects processes photos entirely in your browser. Your image is read locally, each preset is rendered on a client-side canvas, and the export leaves your device — it is never transmitted to Pix-8 or any third-party server. Privacy comes from architecture, not a settings toggle.",
      },
      {
        question:
          "Does a privacy-first filter tool still need an account or upload step?",
        answer:
          "No. Image Filters & Effects requires no account and has no upload step. Load a photo from your device, apply grayscale, sepia, vintage, blur, or vignette, preview with the before/after slider, then download or copy one export. It does not store images on a backend, watermark downloads behind signup, or batch-process folders on a remote server.",
      },
      {
        question:
          "What filters are included in this privacy-first tool?",
        answer:
          "Image Filters & Effects includes five single-click presets: grayscale, sepia, vintage, blur, and vignette. One preset applies per export. It is a focused filter workspace — not a full editor with layers, retouching brushes, text blocks, pin-style annotation labels, or AI style transfer.",
      },
    ],
  },
  "browser-based-image-processor": {
    id: "browser-based-image-processor",
    path: "/browser-based-image-processor",
    linkTitle: "Browser-based image processor",
    linkExcerpt:
      "Browser-based image processor for photo filters — client-side, no install.",
    seo: {
      title: "Browser-Based Image Processor",
      description:
        "Browser-based image processor for photo filters in your browser. Grayscale, sepia, vintage, blur, and vignette on-device — no install, no upload. Image Filters by Pix-8.",
    },
    faq: [
      {
        question:
          "What does a browser-based image processor mean for this tool?",
        answer:
          "Pix-8 Image Filters & Effects runs entirely in your web browser — no desktop install, no browser extension, and no upload queue. Your photo is read locally, filter presets render on a client-side canvas in your tab, and the export leaves your device. Your images are never transmitted to Pix-8 or any third-party server.",
      },
      {
        question:
          "Is this a full browser-based image processor with crop, resize, and layers?",
        answer:
          "No. Image Filters & Effects is a focused browser-based processor for filter presets — grayscale, sepia, vintage, blur, and vignette — with a live before/after slider and one-file export. It does not crop, resize, remove backgrounds, stack adjustment layers, or add pin-style annotation labels. For cropping or resizing, see Pix-8 Cropper or Resizer; for text, see Text Overlay.",
      },
      {
        question:
          "What can I process in the browser with this tool?",
        answer:
          "Load one photo per session, select a single preset, preview with the before/after slider, then download or copy one filtered export. Image Filters & Effects does not batch-process folders, apply custom LUTs, run AI style transfer, or replace a full creative suite — it processes filter looks on-device in the browser tab you already have open.",
      },
    ],
  },
  "professional-photo-filters-for-social-media": {
    id: "professional-photo-filters-for-social-media",
    path: "/professional-photo-filters-for-social-media",
    linkTitle: "Social media photo filters",
    linkExcerpt:
      "Professional photo filters for social media in your browser — client-side, no upload.",
    seo: {
      title: "Professional Photo Filters for Social Media",
      description:
        "Professional photo filters for social media in your browser. Grayscale, sepia, vintage, blur, and vignette on-device — no upload, no server. Image Filters by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I apply professional photo filters for social media without uploading?",
        answer:
          "Yes. Pix-8 Image Filters & Effects runs entirely in your browser. Your photo is read locally, each preset is rendered on a client-side canvas, and the filtered file is exported from your device. Your images are never transmitted to Pix-8 or any third-party server — a practical fit when you want a polished look before posting.",
      },
      {
        question:
          "What filters work well for social media posts?",
        answer:
          "Image Filters & Effects includes five presets: grayscale, sepia, vintage, blur, and vignette. Load a photo, switch between looks, preview each grade with the before/after slider, then download or copy one export to upload to your feed, story, or chat. It does not publish directly to platforms, apply network-specific aspect ratios, or batch-style an entire content calendar.",
      },
      {
        question:
          "Is this a full social media editor with captions and scheduling?",
        answer:
          "No. Image Filters & Effects applies one filter preset per export with a live before/after preview — not a social scheduler, caption tool, or multi-layer creative suite. It does not add text blocks, pin-style annotation labels, or decorative sticker overlays. For captions on images, see Pix-8 Text Overlay; for cropping to platform sizes, see Cropper or Resizer.",
      },
    ],
  },
  "apply-stunning-effects-to-images": {
    id: "apply-stunning-effects-to-images",
    path: "/apply-stunning-effects-to-images",
    linkTitle: "Stunning image effects",
    linkExcerpt:
      "Apply stunning effects to images in your browser — client-side, no upload.",
    seo: {
      title: "Apply Stunning Effects to Images",
      description:
        "Apply stunning effects to images in your browser. Grayscale, sepia, vintage, blur, and vignette on-device — no upload, no server. Image Filters by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I apply stunning effects to images without uploading to a server?",
        answer:
          "Yes. Pix-8 Image Filters & Effects runs entirely in your browser. Your image is read locally, each effect preset is rendered on a client-side canvas, and the result is exported from your device. Your files are never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What stunning effects can I apply to images?",
        answer:
          "Image Filters & Effects includes five mood presets: grayscale for bold monochrome, sepia and vintage for warm retro grades, blur for soft focus, and vignette for edge drama. Load a photo, switch between presets, preview each look with the before/after slider, then download or copy one export. It does not generate AI art, animated effects, or layered decorative overlays — for graphics on images, see Pix-8 Image Overlay.",
      },
      {
        question:
          "Can I stack multiple stunning effects on one image?",
        answer:
          "Image Filters & Effects applies one preset per export. Compare grayscale, sepia, vintage, blur, and vignette in the same session with the before/after slider, but only one look exports at a time. It does not blend presets, batch-process folders, or add pin-style annotation labels.",
      },
    ],
  },
  "quick-photo-styler-online": {
    id: "quick-photo-styler-online",
    path: "/quick-photo-styler-online",
    linkTitle: "Quick photo styler",
    linkExcerpt:
      "Quick photo styler online in your browser — client-side, no upload.",
    seo: {
      title: "Quick Photo Styler Online",
      description:
        "Quick photo styler online in your browser. Apply grayscale, sepia, vintage, blur, or vignette on-device — no upload, no server. Image Filters by Pix-8.",
    },
    faq: [
      {
        question:
          "How fast is this quick photo styler online?",
        answer:
          "Pix-8 Image Filters & Effects loads your image locally, applies a single-click preset on a client-side canvas, and lets you export immediately — no account signup, no upload queue, and no wait for a remote server to process your file. Switch between five presets and compare with the before/after slider in the same browser session.",
      },
      {
        question: "What styles can I apply with this photo styler?",
        answer:
          "Image Filters & Effects includes five preset styles: grayscale, sepia, vintage, blur, and vignette. Pick one look, preview with the before/after slider, then download or copy one export. It is a fast filter styler — not a manual editor with tone curves, HSL sliders, retouching brushes, or pin-style annotation labels.",
      },
      {
        question:
          "Can I style multiple photos at once?",
        answer:
          "Image Filters & Effects styles one photo per session with one preset per export. Load an image, select a style, export, then start a new session for the next file. It does not batch-process folders, stack multiple presets, or replace a full creative suite with layers and compositing.",
      },
    ],
  },
};

export function listImageFiltersLandings(): ImageFiltersLandingEntry[] {
  return Object.values(IMAGE_FILTERS_LANDINGS);
}

export function getImageFiltersLandingByPath(
  path: string,
): ImageFiltersLandingEntry | undefined {
  return listImageFiltersLandings().find((entry) => entry.path === path);
}

export function getImageFiltersLandingBySlug(
  slug: string,
): ImageFiltersLandingEntry | undefined {
  const normalized = slug.replace(/^\/+/, "");
  return listImageFiltersLandings().find(
    (entry) => entry.path === `/${normalized}`,
  );
}
