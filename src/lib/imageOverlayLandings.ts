export const IMAGE_OVERLAY_TOOL_HREF = "/tools/editor-studio/image-overlay";

export const IMAGE_OVERLAY_LANDING_ACCENT = "#8E977D";

export const IMAGE_OVERLAY_ARTICLE = {
  href: "/articles/online-photo-overlay-editor",
  title:
    "Online Photo Overlay Editor: Add Stars, Flowers & Effects to Your Photos",
  excerpt:
    "Learn why transparent overlays boost Instagram and TikTok posts, and how to use Pix-8's free Online Photo Overlay Editor to add stars, flowers, birds, and more — privately in your browser.",
} as const;

/** What Image Overlay actually supports — use for intent-accurate copy. */
export const IMAGE_OVERLAY_CAPABILITIES = [
  "Preset transparent overlays (stars, flowers, birds, sparkles, hearts)",
  "Drag to position overlay on the canvas",
  "Opacity, size, and rotation controls",
  "Download or copy flattened output",
  "Optional EXIF metadata stripping before export",
  "On-device processing — images never uploaded",
] as const;

/**
 * Add new Image Overlay SEO landing IDs here as union members.
 * Landing pages belong in this registry — not textOverlayLandings,
 * imageAnnotatorLandings, watermark landings, or other tool families.
 */
export type ImageOverlayLandingId =
  | "add-image-overlay-online"
  | "overlay-images-online"
  | "put-one-image-over-another"
  | "image-merger-tool"
  | "add-transparent-image-overlay"
  | "client-side-image-overlay-tool"
  | "browser-based-image-overlay"
  | "privacy-focused-image-compositor"
  | "combine-two-images-online"
  | "overlay-images-with-transparency"
  | "image-layer-editor-online";

export interface ImageOverlayLandingEntry {
  id: ImageOverlayLandingId;
  path: string;
  linkTitle: string;
  linkExcerpt: string;
  seo: {
    title: string;
    description: string;
  };
  faq: readonly { question: string; answer: string }[];
}

export const IMAGE_OVERLAY_LANDINGS: Record<
  ImageOverlayLandingId,
  ImageOverlayLandingEntry
> = {
  "add-image-overlay-online": {
    id: "add-image-overlay-online",
    path: "/add-image-overlay-online",
    linkTitle: "Add image overlay",
    linkExcerpt:
      "Add transparent overlays to images in your browser — client-side, no upload.",
    seo: {
      title: "Add Image Overlay Online",
      description:
        "Add image overlay online in your browser. Layer preset transparent graphics on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I add an image overlay online without uploading my photo?",
        answer:
          "Yes. Pix-8 Image Overlay runs entirely in your browser. Your base image is read locally, the overlay is composited on a client-side canvas, and you export from your device. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "Can I upload my own overlay graphic?",
        answer:
          "Image Overlay uses a built-in preset library — stars, flowers, birds, sparkles, and hearts — that you position on your photo. It does not accept custom overlay file uploads. For a logo or image watermark from your device, use Pix-8 Watermark. For typed text, use Pix-8 Text Overlay.",
      },
      {
        question: "How is Image Overlay different from Watermark or Text Overlay?",
        answer:
          "Image Overlay layers transparent preset graphics with drag positioning, opacity, size, and rotation controls — ideal for decorative effects on social posts. Watermark places your own logo or image file with opacity and position controls. Text Overlay adds draggable typed text with font and color controls. Image Overlay does not include pin-style callouts, arrows, or multi-annotation markup.",
      },
    ],
  },
  "overlay-images-online": {
    id: "overlay-images-online",
    path: "/overlay-images-online",
    linkTitle: "Overlay images online",
    linkExcerpt:
      "Overlay images online in your browser — preset layers, client-side, no upload.",
    seo: {
      title: "Overlay Images Online",
      description:
        "Overlay images online in your browser. Merge transparent preset graphics on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I overlay images online without uploading to a server?",
        answer:
          "Yes. Pix-8 Image Overlay runs entirely in your browser. Your base photo is read locally, a transparent preset graphic is composited on a client-side canvas, and you export from your device. Your files are never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "Can I stack multiple overlay layers at once?",
        answer:
          "Image Overlay composites one preset transparent graphic per export — stars, flowers, birds, sparkles, or hearts — with drag positioning, opacity, size, and rotation controls. It does not support multi-layer stacking or blending multiple custom images in one session. For a logo or image file from your device, use Pix-8 Watermark.",
      },
      {
        question: "Is this the same as Photoshop layer blending?",
        answer:
          "No. Image Overlay is a lightweight browser tool for placing a single preset transparent graphic on a photo and exporting a flattened result. It does not include layer panels, blend modes, masks, or advanced compositing. For typed text on images, use Pix-8 Text Overlay. For screenshot markup with pins and callouts, use Pix-8 Image Annotator.",
      },
    ],
  },
  "put-one-image-over-another": {
    id: "put-one-image-over-another",
    path: "/put-one-image-over-another",
    linkTitle: "Image over image",
    linkExcerpt:
      "Put one image over another in your browser — preset overlay, client-side, no upload.",
    seo: {
      title: "Put One Image Over Another",
      description:
        "Put one image over another in your browser. Place a transparent preset graphic on your photo on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I put one image over another without uploading to a server?",
        answer:
          "Yes. Pix-8 Image Overlay runs entirely in your browser. Your base photo is read locally, a transparent preset graphic is placed on top via a client-side canvas, and you export from your device. Your files are never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "Can I use any image file as the top layer?",
        answer:
          "Image Overlay places a transparent preset graphic — stars, flowers, birds, sparkles, or hearts — on top of your base photo. It does not accept a second custom image file as the overlay layer. To put your own logo or image file over a photo, use Pix-8 Watermark.",
      },
      {
        question: "How is this different from placing text or annotations on an image?",
        answer:
          "Image Overlay composites one preset transparent graphic over your base photo with drag positioning, opacity, size, and rotation controls. Text Overlay adds draggable typed text with font and color controls. Image Annotator attaches pin-style callout labels for screenshot markup. Image Overlay does not include arrows, numbered markers, or multi-annotation layers.",
      },
    ],
  },
  "image-merger-tool": {
    id: "image-merger-tool",
    path: "/image-merger-tool",
    linkTitle: "Image merger",
    linkExcerpt:
      "Merge a preset overlay onto your photo in your browser — client-side, no upload.",
    seo: {
      title: "Image Merger Tool",
      description:
        "Image merger tool in your browser. Flatten a preset transparent graphic onto your photo on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Does this image merger tool upload my photos to a server?",
        answer:
          "No. Pix-8 Image Overlay runs entirely in your browser. Your base photo is read locally, merged with a preset transparent graphic on a client-side canvas, and exported from your device. Your files are never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "Can this tool merge two full photos side by side?",
        answer:
          "Image Overlay merges one preset transparent graphic — stars, flowers, birds, sparkles, or hearts — onto your base photo and exports a single flattened file. It does not arrange multiple full photos in a grid or collage layout. For multi-photo collages, use Pix-8 Image Collage Maker. To merge your own logo or image file onto a photo, use Pix-8 Watermark.",
      },
      {
        question: "Does it support batch merging multiple images at once?",
        answer:
          "No. Image Overlay processes one base photo and one preset overlay per export, with drag positioning, opacity, size, and rotation controls. It does not include batch queues, folder imports, or automated multi-file merging. For repeated exports, load each image locally in your browser tab.",
      },
    ],
  },
  "add-transparent-image-overlay": {
    id: "add-transparent-image-overlay",
    path: "/add-transparent-image-overlay",
    linkTitle: "Transparent image overlay",
    linkExcerpt:
      "Add transparent image overlays in your browser — preset layers, client-side, no upload.",
    seo: {
      title: "Add Transparent Image Overlay",
      description:
        "Add transparent image overlay in your browser. Layer preset graphics on-device — no upload, no server. Private client-side Image Overlay tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I add a transparent image overlay without uploading my photo?",
        answer:
          "Yes. Pix-8 Image Overlay runs entirely in your browser. Your base image is read locally, a transparent preset graphic is composited on a client-side canvas, and you export from your device. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "Can I upload my own transparent PNG as the overlay?",
        answer:
          "Image Overlay uses a built-in preset library — stars, flowers, birds, sparkles, and hearts — with transparency baked in. It does not accept custom overlay file uploads. To place your own logo or image file on a photo, use Pix-8 Watermark. For typed text overlays, use Pix-8 Text Overlay.",
      },
      {
        question: "How do I control how the transparent overlay looks on my photo?",
        answer:
          "After selecting a preset, drag it into position on the canvas. Adjust opacity, size, and rotation on-device, then download or copy one flattened export. Image Overlay does not include blend modes, layer masks, or multi-overlay stacking in a single session.",
      },
    ],
  },
  "client-side-image-overlay-tool": {
    id: "client-side-image-overlay-tool",
    path: "/client-side-image-overlay-tool",
    linkTitle: "Client-side image overlay",
    linkExcerpt:
      "Client-side image overlay tool in your browser — preset layers, no upload.",
    seo: {
      title: "Client-Side Image Overlay Tool",
      description:
        "Client-side image overlay tool in your browser. Layer preset graphics on-device — no upload, no server. Private Image Overlay by Pix-8.",
    },
    faq: [
      {
        question: "What does client-side mean for this image overlay tool?",
        answer:
          "Your base photo is read from your device, composited with a preset transparent graphic on a canvas inside your browser tab, and exported locally. Pix-8 does not receive your image data, and no remote server processes your files during overlay placement or export.",
      },
      {
        question: "Can I use my own overlay image file with this tool?",
        answer:
          "Image Overlay uses a built-in preset library — stars, flowers, birds, sparkles, and hearts — that you drag into position on your photo. It does not accept custom overlay file uploads. To place your own logo or image file, use Pix-8 Watermark. For typed text overlays, use Pix-8 Text Overlay.",
      },
      {
        question: "How is this different from cloud-based overlay editors?",
        answer:
          "Cloud overlay editors typically require uploading your photo before you can place a graphic. Pix-8 Image Overlay composites on-device with opacity, size, rotation, and drag positioning controls, then exports one flattened file. It does not include batch folders, multi-layer stacks, blend modes, or server-side filters.",
      },
    ],
  },
  "browser-based-image-overlay": {
    id: "browser-based-image-overlay",
    path: "/browser-based-image-overlay",
    linkTitle: "Browser-based overlay",
    linkExcerpt:
      "Browser-based image overlay in your browser — preset layers, no install, no upload.",
    seo: {
      title: "Browser-Based Image Overlay",
      description:
        "Browser-based image overlay in your browser. Layer preset graphics on-device — no install, no upload, no server. Private Image Overlay by Pix-8.",
    },
    faq: [
      {
        question: "Do I need to install software for this browser-based image overlay?",
        answer:
          "No. Pix-8 Image Overlay runs entirely in your browser tab. Open the tool, load your base photo locally, place a preset transparent graphic, and export — no desktop install, no plugin, and no account required. Your image is composited on a client-side canvas and is never uploaded to Pix-8 or a remote server.",
      },
      {
        question: "Can I upload my own overlay graphic in the browser?",
        answer:
          "Image Overlay uses a built-in preset library — stars, flowers, birds, sparkles, and hearts — that you drag into position on your photo. It does not accept custom overlay file uploads. To place your own logo or image file, use Pix-8 Watermark. For typed text overlays, use Pix-8 Text Overlay.",
      },
      {
        question: "Which browsers support this image overlay tool?",
        answer:
          "Image Overlay runs in modern browsers that support client-side canvas compositing — including Chrome, Firefox, Safari, and Edge. Load your photo locally, adjust opacity, size, rotation, and drag positioning in the browser tab, then download or copy one flattened export. It does not include batch folders, multi-layer stacks, or server-side filters.",
      },
    ],
  },
  "privacy-focused-image-compositor": {
    id: "privacy-focused-image-compositor",
    path: "/privacy-focused-image-compositor",
    linkTitle: "Privacy image compositor",
    linkExcerpt:
      "Privacy-focused image compositor in your browser — preset layers, client-side, no upload.",
    seo: {
      title: "Privacy-Focused Image Compositor",
      description:
        "Privacy-focused image compositor in your browser. Composite preset graphics on-device — no upload, no server. Private Image Overlay by Pix-8.",
    },
    faq: [
      {
        question: "How does this image compositor protect my privacy?",
        answer:
          "Pix-8 Image Overlay runs entirely in your browser. Your base photo is read locally, composited with a preset transparent graphic on a client-side canvas, and exported from your device. Pix-8 does not receive your pixel data, and no remote server processes your files during compositing or export.",
      },
      {
        question: "Can I composite my own image file as the overlay layer?",
        answer:
          "Image Overlay composites one preset transparent graphic — stars, flowers, birds, sparkles, or hearts — onto your base photo per export. It does not accept custom overlay file uploads or multi-layer stacks. To composite your own logo or image file onto a photo, use Pix-8 Watermark. For typed text layers, use Pix-8 Text Overlay.",
      },
      {
        question: "Is this a full Photoshop-style compositor?",
        answer:
          "No. Image Overlay is a lightweight browser tool for placing a single preset graphic on a photo with drag positioning, opacity, size, and rotation controls, then exporting one flattened file. It does not include layer panels, blend modes, masks, batch folders, or server-side filters.",
      },
    ],
  },
  "combine-two-images-online": {
    id: "combine-two-images-online",
    path: "/combine-two-images-online",
    linkTitle: "Combine two images",
    linkExcerpt:
      "Combine two images online in your browser — base photo plus preset layer, client-side, no upload.",
    seo: {
      title: "Combine Two Images Online",
      description:
        "Combine two images online in your browser. Merge a preset graphic onto your photo on-device — no upload, no server. Private client-side Image Overlay by Pix-8.",
    },
    faq: [
      {
        question: "Can I combine two images online without uploading to a server?",
        answer:
          "Yes. Pix-8 Image Overlay runs entirely in your browser. Your base photo is read locally, combined with a preset transparent graphic on a client-side canvas, and exported from your device. Your files are never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "Can I combine any two image files from my device?",
        answer:
          "Image Overlay combines your base photo with one preset transparent graphic — stars, flowers, birds, sparkles, or hearts — per export. It does not accept a second custom image file as the top layer. To combine your own logo or image file over a photo, use Pix-8 Watermark. For multi-photo collages side by side, use Pix-8 Image Collage Maker.",
      },
      {
        question: "How is this different from a photo collage or merger app?",
        answer:
          "Image Overlay merges one preset graphic onto one base photo and exports a single flattened file with drag positioning, opacity, size, and rotation controls. It does not arrange multiple full photos in a grid, stack unlimited layers, or batch-process folders automatically.",
      },
    ],
  },
  "overlay-images-with-transparency": {
    id: "overlay-images-with-transparency",
    path: "/overlay-images-with-transparency",
    linkTitle: "Transparent overlays",
    linkExcerpt:
      "Overlay images with transparency in your browser — preset layers, client-side, no upload.",
    seo: {
      title: "Overlay Images with Transparency",
      description:
        "Overlay images with transparency in your browser. Layer preset graphics with opacity control on-device — no upload, no server. Private Image Overlay by Pix-8.",
    },
    faq: [
      {
        question: "Can I overlay images with transparency without uploading to a server?",
        answer:
          "Yes. Pix-8 Image Overlay runs entirely in your browser. Your base photo is read locally, a preset transparent graphic is composited on a client-side canvas, and you export from your device. Your image is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "Can I upload my own transparent PNG as the overlay?",
        answer:
          "Image Overlay uses a built-in preset library — stars, flowers, birds, sparkles, and hearts — with transparency baked in. You adjust opacity, size, rotation, and drag position on-device. It does not accept custom overlay file uploads. To place your own logo or image file on a photo, use Pix-8 Watermark.",
      },
      {
        question: "How do I control transparency on the overlay?",
        answer:
          "After selecting a preset, drag it into position on the canvas. Use the opacity slider to fine-tune how transparent the graphic appears over your base photo, then adjust size and rotation before export. Image Overlay does not include blend modes, layer masks, or multi-overlay stacking in a single session.",
      },
    ],
  },
  "image-layer-editor-online": {
    id: "image-layer-editor-online",
    path: "/image-layer-editor-online",
    linkTitle: "Image layer editor",
    linkExcerpt:
      "Image layer editor online in your browser — preset layers, client-side, no upload.",
    seo: {
      title: "Image Layer Editor Online",
      description:
        "Image layer editor online in your browser. Place preset transparent graphics on-device — no upload, no server. Private Image Overlay by Pix-8.",
    },
    faq: [
      {
        question: "Can I use this image layer editor online without uploading my photo?",
        answer:
          "Yes. Pix-8 Image Overlay runs entirely in your browser. Your base image is read locally, a preset transparent graphic is placed on a client-side canvas, and you export from your device. Your photo is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "Does this support multiple editable layers like Photoshop?",
        answer:
          "Image Overlay places one preset transparent graphic — stars, flowers, birds, sparkles, or hearts — on your base photo per export. You adjust drag positioning, opacity, size, and rotation, then download or copy one flattened file. It does not include a layer panel, unlimited stacks, blend modes, or masks.",
      },
      {
        question: "Can I add my own image file as a layer?",
        answer:
          "Image Overlay uses built-in preset graphics, not custom layer file uploads. To place your own logo or image file on a photo, use Pix-8 Watermark. For typed text layers with font controls, use Pix-8 Text Overlay. Image Overlay does not batch-process folders or queue multiple files automatically.",
      },
    ],
  },
};

export function listImageOverlayLandings(): ImageOverlayLandingEntry[] {
  return Object.values(IMAGE_OVERLAY_LANDINGS);
}

export function getImageOverlayLandingByPath(
  path: string,
): ImageOverlayLandingEntry | undefined {
  return listImageOverlayLandings().find((entry) => entry.path === path);
}

export function getImageOverlayLandingBySlug(
  slug: string,
): ImageOverlayLandingEntry | undefined {
  const normalized = slug.replace(/^\/+/, "");
  return listImageOverlayLandings().find(
    (entry) => entry.path === `/${normalized}`,
  );
}
