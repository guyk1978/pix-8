export const MAGNIFIER_TOOL_HREF = "/tools/editor-studio/magnifier";

export const MAGNIFIER_LANDING_ACCENT = "#6B8E9E";

export const MAGNIFIER_ARTICLE = {
  href: "/articles/online-image-magnifier",
  title:
    "Online Image Magnifier: Zoom, Pan, and Sharpen to Discover Hidden Details",
  excerpt:
    "Learn how to inspect fine print, product labels, textures, and screenshot details with Pix-8's free Online Image Magnifier — up to 32× zoom with client-side sharpening, all in your browser.",
} as const;

/** What Image Magnifier actually supports — use for intent-accurate copy. */
export const MAGNIFIER_CAPABILITIES = [
  "Mouse-wheel zoom up to 32× with drag-to-pan navigation",
  "Mini-map viewport indicator for large images",
  "Non-destructive sharpening (adaptive, high-pass, unsharp mask)",
  "Compare-original toggle while refining",
  "Export or copy the current magnified view",
  "On-device processing — images never uploaded to a server",
] as const;

/**
 * Add new Image Magnifier SEO landing IDs here as union members.
 * Landing pages belong in this registry — not imageAnnotatorLandings,
 * sharpener landings, cropper landings, or other tool families.
 */
export type MagnifierLandingId =
  | "free-image-magnifier"
  | "photo-zoom-tool"
  | "inspect-image-details-online"
  | "high-resolution-image-inspector"
  | "pixel-perfect-image-viewer"
  | "examine-photo-details-online"
  | "magnify-image-for-design-review"
  | "client-side-image-magnifier"
  | "privacy-first-photo-zoom-tool"
  | "no-upload-image-inspector"
  | "browser-magnifying-glass-for-photos"
  | "zoom-into-photo-online"
  | "detailed-image-viewer-tool"
  | "magnify-small-text-on-images";

export interface MagnifierLandingEntry {
  id: MagnifierLandingId;
  path: string;
  linkTitle: string;
  linkExcerpt: string;
  seo: {
    title: string;
    description: string;
  };
  faq: readonly { question: string; answer: string }[];
}

export const MAGNIFIER_LANDINGS: Record<
  MagnifierLandingId,
  MagnifierLandingEntry
> = {
  "free-image-magnifier": {
    id: "free-image-magnifier",
    path: "/free-image-magnifier",
    linkTitle: "Free image magnifier",
    linkExcerpt:
      "Free image magnifier in your browser — zoom up to 32×, pan, and sharpen client-side, no upload.",
    seo: {
      title: "Free Image Magnifier",
      description:
        "Free image magnifier in your browser. Zoom up to 32× with mouse-wheel control and drag-to-pan — processed on-device, no upload, no account. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Is this image magnifier really free to use?",
        answer:
          "Yes. Pix-8 Image Magnifier is free to use in your browser — no subscription, no credit card, and no per-export fee. Load an image locally, zoom up to 32×, pan, optionally sharpen, and export the current view without paying or creating an account.",
      },
      {
        question: "Does a free image magnifier mean my photos get uploaded?",
        answer:
          "No. Free does not mean cloud-hosted. Image Magnifier runs entirely in your browser. Your file is read locally, rendered on a client-side canvas, and magnified on-device. Pix-8 does not receive your image data, and no remote server processes your files.",
      },
      {
        question: "What does the free magnifier include — and what does it not do?",
        answer:
          "Image Magnifier includes mouse-wheel zoom up to 32×, drag-to-pan, a mini-map viewport indicator, optional non-destructive sharpening, compare-original viewing, and export or copy of the current magnified view. It does not crop frames, resize dimensions, add pin-style labels, or draw annotation markup. For labeled callouts on screenshots, use Pix-8 Image Annotator.",
      },
    ],
  },
  "photo-zoom-tool": {
    id: "photo-zoom-tool",
    path: "/photo-zoom-tool",
    linkTitle: "Photo zoom tool",
    linkExcerpt:
      "Zoom photos up to 32× in your browser — wheel zoom, pan, and client-side sharpening.",
    seo: {
      title: "Photo Zoom Tool",
      description:
        "Free photo zoom tool in your browser. Magnify up to 32× with mouse-wheel zoom and drag-to-pan — processed on-device, no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Does this photo zoom tool upload my images to a server?",
        answer:
          "No. Pix-8 Image Magnifier runs entirely in your browser. Your photo is read locally, rendered on a client-side canvas, and zoomed on-device. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "How much can I zoom in with this photo zoom tool?",
        answer:
          "Image Magnifier supports mouse-wheel zoom up to 32×. Scroll to magnify, drag to pan when zoomed in, and use the mini-map viewport indicator to stay oriented on large images. Sharpening is optional and non-destructive — it renders on the preview canvas only.",
      },
      {
        question: "How is this different from cropping, resizing, or annotating a photo?",
        answer:
          "Image Magnifier is built for inspection — zoom, pan, optional sharpening, and export of the current view. It does not crop frames, change pixel dimensions, add pin-style labels, or draw markup. For cropping, use Pix-8 Cropper. For dimension changes, use Pix-8 Resizer. For labeled callouts on screenshots, use Pix-8 Image Annotator.",
      },
    ],
  },
  "inspect-image-details-online": {
    id: "inspect-image-details-online",
    path: "/inspect-image-details-online",
    linkTitle: "Inspect image details",
    linkExcerpt:
      "Inspect image details online in your browser — zoom up to 32×, pan, and sharpen client-side.",
    seo: {
      title: "Inspect Image Details Online",
      description:
        "Inspect image details online in your browser. Zoom up to 32×, pan across the canvas, and refine sharpness on-device — no upload, no server. Private client-side Image Magnifier by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I inspect image details online without uploading my file?",
        answer:
          "Yes. Pix-8 Image Magnifier runs entirely in your browser. Your image is read locally, rendered on a client-side canvas, and magnified on-device. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What kinds of details can I inspect with this tool?",
        answer:
          "Image Magnifier is designed for close inspection — fine print in documents, serial numbers on product labels, UI elements in screenshots, compression artifacts in social exports, and surface textures in photos. Scroll to zoom up to 32×, drag to pan, and optionally apply non-destructive sharpening on the preview.",
      },
      {
        question:
          "Do I need pin labels or markup to inspect image details?",
        answer:
          "No. Image Magnifier focuses on magnification and clarity — zoom, pan, optional sharpening, and export of the current view. It does not add pin-style labels, callout text, or drawn annotations. If you need to mark specific areas with labeled tags for feedback or documentation, use Pix-8 Image Annotator after your inspection.",
      },
    ],
  },
  "high-resolution-image-inspector": {
    id: "high-resolution-image-inspector",
    path: "/high-resolution-image-inspector",
    linkTitle: "Hi-res image inspector",
    linkExcerpt:
      "Inspect high-resolution images in your browser — zoom up to 32×, mini-map, and client-side sharpening.",
    seo: {
      title: "High-Resolution Image Inspector",
      description:
        "High-resolution image inspector in your browser. Zoom up to 32×, pan large files, and refine sharpness on-device — no upload, no server. Private client-side Image Magnifier by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I inspect high-resolution images without uploading them to a server?",
        answer:
          "Yes. Pix-8 Image Magnifier runs entirely in your browser. Your high-resolution file is read locally, rendered on a client-side canvas, and magnified on-device. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question:
          "Does this tool increase the native resolution of my image?",
        answer:
          "No. Image Magnifier is built for inspection, not upscaling. It renders your file at its native resolution on a client-side canvas, then lets you zoom up to 32×, pan across the image, and optionally sharpen the preview. It does not add pixels, interpolate to a higher megapixel count, or perform AI super-resolution.",
      },
      {
        question:
          "How do I navigate very large or high-resolution images?",
        answer:
          "Load the file locally, then use mouse-wheel zoom up to 32× and drag-to-pan to sweep across the canvas. The mini-map viewport indicator helps you stay oriented on wide or tall high-resolution images. For marking specific areas with labeled tags after inspection, use Pix-8 Image Annotator.",
      },
    ],
  },
  "pixel-perfect-image-viewer": {
    id: "pixel-perfect-image-viewer",
    path: "/pixel-perfect-image-viewer",
    linkTitle: "Pixel-perfect viewer",
    linkExcerpt:
      "Pixel-perfect image viewer in your browser — zoom up to 32×, pan, and inspect client-side.",
    seo: {
      title: "Pixel-Perfect Image Viewer",
      description:
        "Pixel-perfect image viewer in your browser. Zoom up to 32× for precise pixel inspection, pan with drag controls, and sharpen on-device — no upload, no server. Private client-side Image Magnifier by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I view images at pixel level without uploading to a server?",
        answer:
          "Yes. Pix-8 Image Magnifier runs entirely in your browser. Your image is read locally, rendered on a client-side HTML5 canvas, and magnified on-device. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What does pixel-perfect mean in this viewer?",
        answer:
          "Image Magnifier lets you zoom up to 32× and pan across the canvas to inspect individual pixels, edges, and fine detail at magnification — not by upscaling or interpolating new pixels. Optional sharpening clarifies edges on the preview only. It does not include measurement rulers, color-profile proofing, or vector overlay guides.",
      },
      {
        question:
          "Can I mark specific pixels or areas with labels in this viewer?",
        answer:
          "Image Magnifier is built for magnification and inspection — zoom, pan, optional sharpening, and export of the current view. It does not add pin-style labels, callout text, or drawn markup on the image. If you need to tag specific areas with labeled markers for feedback or documentation, use Pix-8 Image Annotator.",
      },
    ],
  },
  "examine-photo-details-online": {
    id: "examine-photo-details-online",
    path: "/examine-photo-details-online",
    linkTitle: "Examine photo details",
    linkExcerpt:
      "Examine photo details online in your browser — zoom up to 32×, pan, and sharpen client-side.",
    seo: {
      title: "Examine Photo Details Online",
      description:
        "Examine photo details online in your browser. Zoom up to 32×, pan across the canvas, and refine sharpness on-device — no upload, no server. Private client-side Image Magnifier by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I examine photo details online without uploading my file?",
        answer:
          "Yes. Pix-8 Image Magnifier runs entirely in your browser. Your photo is read locally, rendered on a client-side canvas, and magnified on-device. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What photo details can I examine with this tool?",
        answer:
          "Image Magnifier is designed for close examination — fine print in scanned documents, label text on product photos, skin texture in portraits, UI elements in screenshots, and compression artifacts in social exports. Scroll to zoom up to 32×, drag to pan, and optionally apply non-destructive sharpening on the preview.",
      },
      {
        question:
          "Do I need to add labels or markup to examine photo details?",
        answer:
          "No. Image Magnifier focuses on magnification and clarity — zoom, pan, optional sharpening, and export of the current view. It does not add pin-style labels, callout text, or drawn annotations. If you need to mark specific areas with labeled tags after examination, use Pix-8 Image Annotator.",
      },
    ],
  },
  "magnify-image-for-design-review": {
    id: "magnify-image-for-design-review",
    path: "/magnify-image-for-design-review",
    linkTitle: "Magnify for design review",
    linkExcerpt:
      "Magnify images for design review in your browser — zoom up to 32×, pan, and sharpen client-side.",
    seo: {
      title: "Magnify Image for Design Review",
      description:
        "Magnify images for design review in your browser. Zoom up to 32× on UI mockups and exports, pan with drag controls, and sharpen on-device — no upload, no server. Private client-side Image Magnifier by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I magnify design exports for review without uploading to a server?",
        answer:
          "Yes. Pix-8 Image Magnifier runs entirely in your browser. Your mockup or export is read locally, rendered on a client-side canvas, and magnified on-device. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What can I check when magnifying images for design review?",
        answer:
          "Image Magnifier supports close review of UI spacing, typography edges, icon sharpness, compression artifacts in social exports, and fine detail in product mockups. Scroll to zoom up to 32×, drag to pan, and optionally apply non-destructive sharpening on the preview. It does not include side-by-side version comparison, collaborative comment threads, or Figma-style overlay guides.",
      },
      {
        question:
          "How do I leave labeled feedback on a design after magnifying?",
        answer:
          "Image Magnifier is built for magnification and clarity — zoom, pan, optional sharpening, and export of the current view. It does not add pin-style labels, callout text, or drawn markup on the image. For labeled tags on specific areas during design feedback, use Pix-8 Image Annotator.",
      },
    ],
  },
  "client-side-image-magnifier": {
    id: "client-side-image-magnifier",
    path: "/client-side-image-magnifier",
    linkTitle: "Client-side magnifier",
    linkExcerpt:
      "Client-side image magnifier in your browser — zoom up to 32×, pan, and sharpen without uploading to a server.",
    seo: {
      title: "Client-Side Image Magnifier",
      description:
        "Client-side image magnifier in your browser. Zoom up to 32×, pan with drag controls, and sharpen on a local canvas — your image never uploads to a server. Private on-device Image Magnifier by Pix-8.",
    },
    faq: [
      {
        question:
          "What does client-side mean for an image magnifier?",
        answer:
          "Client-side means Pix-8 Image Magnifier decodes your image and renders magnification entirely in your browser tab — on a local HTML5 canvas. Zoom, pan, sharpening, and export run on your device. Your pixel data is not transmitted to Pix-8 or any third-party server.",
      },
      {
        question:
          "How is a client-side image magnifier different from cloud zoom tools?",
        answer:
          "Cloud zoom tools typically upload your file to a remote server before you can magnify. Pix-8 Image Magnifier keeps processing local: scroll to zoom up to 32×, drag to pan, use the mini-map for navigation, and optionally apply non-destructive sharpening on the preview. It does not upscale resolution, run AI super-resolution, or add pin-style labels or drawn annotations.",
      },
      {
        question:
          "Can I annotate an image after magnifying it client-side?",
        answer:
          "Image Magnifier is built for magnification and clarity — zoom, pan, optional sharpening, and export of the current view. It does not add pin-style labels, callout text, or markup on the image. For labeled tags on specific areas, use Pix-8 Image Annotator.",
      },
    ],
  },
  "privacy-first-photo-zoom-tool": {
    id: "privacy-first-photo-zoom-tool",
    path: "/privacy-first-photo-zoom-tool",
    linkTitle: "Privacy-first zoom",
    linkExcerpt:
      "Privacy-first photo zoom tool in your browser — magnify up to 32× on-device without uploading photos to a server.",
    seo: {
      title: "Privacy-First Photo Zoom Tool",
      description:
        "Privacy-first photo zoom tool in your browser. Magnify up to 32×, pan with drag controls, and sharpen on-device — your photos never upload to a server. Private client-side Image Magnifier by Pix-8.",
    },
    faq: [
      {
        question:
          "Is this photo zoom tool private — does it upload my photos?",
        answer:
          "Yes. Pix-8 Image Magnifier is privacy-first by design. Your photo is read locally, rendered on a client-side canvas in your browser, and magnified on-device. Pix-8 does not receive your pixel data during zoom, pan, sharpening, or export, and there is no server upload step.",
      },
      {
        question:
          "What can I do with a privacy-first photo zoom tool?",
        answer:
          "Image Magnifier lets you scroll to zoom up to 32×, drag to pan across the photo, navigate large images with the mini-map, and optionally apply non-destructive sharpening on the preview. It is suited for inspecting portraits, product shots, screenshots, and documents without routing files through a remote server. It does not upscale resolution, run AI enhancement, or add pin-style labels or drawn annotations.",
      },
      {
        question:
          "How do I mark specific areas on a photo after zooming?",
        answer:
          "Image Magnifier focuses on magnification and clarity — zoom, pan, optional sharpening, and export of the current view. It does not add pin-style labels, callout text, or markup on the photo. For labeled tags on specific areas, use Pix-8 Image Annotator.",
      },
    ],
  },
  "no-upload-image-inspector": {
    id: "no-upload-image-inspector",
    path: "/no-upload-image-inspector",
    linkTitle: "No-upload inspector",
    linkExcerpt:
      "No-upload image inspector in your browser — zoom up to 32×, pan, and sharpen on-device without sending files to a server.",
    seo: {
      title: "No-Upload Image Inspector",
      description:
        "No-upload image inspector in your browser. Inspect images at up to 32× zoom, pan with drag controls, and sharpen on-device — your file never uploads to a server. Private client-side Image Magnifier by Pix-8.",
    },
    faq: [
      {
        question:
          "Does this image inspector require uploading my file?",
        answer:
          "No. Pix-8 Image Magnifier is a no-upload image inspector. Your file is read locally, rendered on a client-side canvas in your browser, and inspected on-device. There is no server upload step, and Pix-8 does not receive your pixel data during zoom, pan, sharpening, or export.",
      },
      {
        question: "What can I inspect with a no-upload image inspector?",
        answer:
          "Image Magnifier supports close inspection of fine print, product labels, UI elements in screenshots, compression artifacts, and edge clarity in photos. Scroll to zoom up to 32×, drag to pan, use the mini-map on large images, and optionally apply non-destructive sharpening on the preview. It does not upscale resolution, run AI analysis, or add pin-style labels or drawn annotations.",
      },
      {
        question:
          "How do I add labels after inspecting an image without uploading?",
        answer:
          "Image Magnifier is built for magnification and clarity — zoom, pan, optional sharpening, and export of the current view. It does not add pin-style labels, callout text, or markup on the image. For labeled tags on specific areas after inspection, use Pix-8 Image Annotator.",
      },
    ],
  },
  "browser-magnifying-glass-for-photos": {
    id: "browser-magnifying-glass-for-photos",
    path: "/browser-magnifying-glass-for-photos",
    linkTitle: "Browser magnifying glass",
    linkExcerpt:
      "Browser-based magnifying glass for photos — zoom up to 32× on a client-side canvas, no upload, no install.",
    seo: {
      title: "Browser-Based Magnifying Glass for Photos",
      description:
        "Browser-based magnifying glass for photos. Zoom up to 32× with mouse-wheel control, pan with drag, and sharpen on-device — your photos never upload to a server. Private client-side Image Magnifier by Pix-8.",
    },
    faq: [
      {
        question:
          "Is this a physical magnifying glass or a browser tool?",
        answer:
          "Pix-8 Image Magnifier is a browser-based digital magnifier — not a physical loupe. Your photo is read locally, rendered on a client-side canvas, and magnified with scroll-to-zoom up to 32×. All processing runs in your browser tab on-device. Your pixel data is not uploaded to Pix-8 or any server.",
      },
      {
        question:
          "What can I do with a browser magnifying glass for photos?",
        answer:
          "Image Magnifier lets you scroll to zoom up to 32×, drag to pan across the photo, navigate large images with the mini-map, and optionally apply non-destructive sharpening on the preview. It suits inspecting fine print, product labels, textures, and screenshot detail. It does not upscale resolution, run AI enhancement, or add pin-style labels or drawn annotations.",
      },
      {
        question:
          "How do I mark areas on a photo after magnifying in the browser?",
        answer:
          "Image Magnifier focuses on magnification and clarity — zoom, pan, optional sharpening, and export of the current view. It does not add pin-style labels, callout text, or markup on the photo. For labeled tags on specific areas, use Pix-8 Image Annotator.",
      },
    ],
  },
  "zoom-into-photo-online": {
    id: "zoom-into-photo-online",
    path: "/zoom-into-photo-online",
    linkTitle: "Zoom into photo",
    linkExcerpt:
      "Zoom into photo online in your browser — magnify up to 32× on-device with pan and optional sharpening, no upload.",
    seo: {
      title: "Zoom Into Photo Online",
      description:
        "Zoom into photo online in your browser. Magnify up to 32× with mouse-wheel control, pan with drag, and sharpen on-device — your photo never uploads to a server. Private client-side Image Magnifier by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I zoom into a photo online without uploading it to a server?",
        answer:
          "Yes. Pix-8 Image Magnifier lets you zoom into a photo online entirely in your browser. Your file is read locally, rendered on a client-side canvas, and magnified on-device. There is no server upload step, and Pix-8 does not receive your pixel data during zoom, pan, sharpening, or export.",
      },
      {
        question: "How far can I zoom into a photo online?",
        answer:
          "Image Magnifier supports scroll-to-zoom up to 32× with drag-to-pan navigation and a mini-map for large images. You can optionally apply non-destructive sharpening on the preview to clarify edges. It does not upscale resolution beyond the original file, run AI super-resolution, or add pin-style labels or drawn annotations.",
      },
      {
        question:
          "How do I mark specific areas after zooming into a photo?",
        answer:
          "Image Magnifier is built for magnification and clarity — zoom, pan, optional sharpening, and export of the current view. It does not add pin-style labels, callout text, or markup on the photo. For labeled tags on specific areas, use Pix-8 Image Annotator.",
      },
    ],
  },
  "detailed-image-viewer-tool": {
    id: "detailed-image-viewer-tool",
    path: "/detailed-image-viewer-tool",
    linkTitle: "Detailed image viewer",
    linkExcerpt:
      "Detailed image viewer tool in your browser — zoom up to 32×, pan, and sharpen on-device without uploading to a server.",
    seo: {
      title: "Detailed Image Viewer Tool",
      description:
        "Detailed image viewer tool in your browser. View images at up to 32× zoom, pan with drag controls, and sharpen on-device — your file never uploads to a server. Private client-side Image Magnifier by Pix-8.",
    },
    faq: [
      {
        question:
          "Is this a detailed image viewer that uploads my files to a server?",
        answer:
          "No. Pix-8 Image Magnifier is a detailed image viewer that runs entirely in your browser. Your file is read locally, rendered on a client-side canvas, and viewed at magnification on-device. There is no server upload step, and Pix-8 does not receive your pixel data during zoom, pan, sharpening, or export.",
      },
      {
        question:
          "What detail can I view with this image viewer tool?",
        answer:
          "Image Magnifier supports close viewing of fine print, product labels, textures, UI elements in screenshots, compression artifacts, and edge clarity in photos. Scroll to zoom up to 32×, drag to pan, use the mini-map on large images, and optionally apply non-destructive sharpening on the preview. It does not provide slideshow galleries, EXIF panels, AI analysis, or pin-style labels and drawn annotations.",
      },
      {
        question:
          "How do I annotate an image after viewing it in detail?",
        answer:
          "Image Magnifier is built for magnification and clarity — zoom, pan, optional sharpening, and export of the current view. It does not add pin-style labels, callout text, or markup on the image. For labeled tags on specific areas after viewing, use Pix-8 Image Annotator.",
      },
    ],
  },
  "magnify-small-text-on-images": {
    id: "magnify-small-text-on-images",
    path: "/magnify-small-text-on-images",
    linkTitle: "Magnify small text",
    linkExcerpt:
      "Magnify small text on images in your browser — zoom up to 32×, pan, and sharpen on-device without uploading to a server.",
    seo: {
      title: "Magnify Small Text on Images",
      description:
        "Magnify small text on images in your browser. Zoom up to 32× on labels, screenshots, and documents, pan with drag controls, and sharpen on-device — no upload, no server. Private client-side Image Magnifier by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I magnify small text on images without uploading to a server?",
        answer:
          "Yes. Pix-8 Image Magnifier runs entirely in your browser. Your image is read locally, rendered on a client-side canvas, and magnified on-device so you can read small text more easily. Pix-8 does not receive your pixel data during zoom, pan, sharpening, or export, and there is no server upload step.",
      },
      {
        question:
          "Does this tool extract or copy text from images?",
        answer:
          "No. Image Magnifier is a magnification tool — not OCR. It lets you scroll to zoom up to 32×, drag to pan to the text region, and optionally apply non-destructive sharpening on the preview to clarify letter edges. It does not run text recognition, translate content, or convert images to editable text.",
      },
      {
        question:
          "How do I highlight or label small text on an image after magnifying?",
        answer:
          "Image Magnifier focuses on magnification and clarity — zoom, pan, optional sharpening, and export of the current view. It does not add pin-style labels, callout text, or drawn markup on the image. For labeled tags pointing to specific text areas, use Pix-8 Image Annotator.",
      },
    ],
  },
};

export function listMagnifierLandings(): MagnifierLandingEntry[] {
  return Object.values(MAGNIFIER_LANDINGS);
}

export function getMagnifierLandingByPath(
  path: string,
): MagnifierLandingEntry | undefined {
  return listMagnifierLandings().find((entry) => entry.path === path);
}

export function getMagnifierLandingBySlug(
  slug: string,
): MagnifierLandingEntry | undefined {
  const normalized = slug.replace(/^\/+/, "");
  return listMagnifierLandings().find(
    (entry) => entry.path === `/${normalized}`,
  );
}
