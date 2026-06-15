export const CROPPER_TOOL_HREF = "/tools/editor-studio/cropper";

export const CROPPER_LANDING_ACCENT = "#8E977D";

export const CROPPER_ARTICLE = {
  href: "/articles/privacy-first-cropping",
  title: "Privacy-first image cropping guide",
  excerpt:
    "Why client-side cropping protects your photos and keeps framing workflows fast.",
} as const;

/** What Cropper actually supports — use for intent-accurate copy. */
export const CROPPER_CAPABILITIES = [
  "Drag-and-resize crop selection in the browser",
  "Aspect ratio presets (free, 1:1, 16:9, 4:3, 9:16, 4:5)",
  "Social media presets for common platform ratios",
  "Live crop size preview",
  "Download or copy cropped output",
  "Optional EXIF metadata stripping before export",
  "On-device processing — images never uploaded",
] as const;

/**
 * Add new Cropper SEO landing IDs here.
 * Landing pages belong in this registry — not imageAnnotatorLandings,
 * backgroundRemoverLandings, or resizerLandings.
 */
export type CropperLandingId =
  | "crop-image-online"
  | "free-image-cropper"
  | "crop-photos-to-size"
  | "image-cutter-online"
  | "crop-image-to-square"
  | "crop-image-to-16-9"
  | "crop-image-to-4-3"
  | "free-aspect-ratio-image-cropper"
  | "crop-image-without-quality-loss"
  | "precision-image-cropper"
  | "crop-image-for-ecommerce-product-photos"
  | "professional-photo-cropper"
  | "client-side-image-cropper"
  | "privacy-focused-image-cutter"
  | "no-upload-image-cropper"
  | "browser-based-image-cropper-tool";

export interface CropperLandingEntry {
  id: CropperLandingId;
  path: string;
  linkTitle: string;
  linkExcerpt: string;
  seo: {
    title: string;
    description: string;
  };
  faq: readonly { question: string; answer: string }[];
}

export const CROPPER_LANDINGS: Record<CropperLandingId, CropperLandingEntry> = {
  "crop-image-online": {
    id: "crop-image-online",
    path: "/crop-image-online",
    linkTitle: "Crop image online",
    linkExcerpt:
      "Crop images in your browser — client-side, no upload.",
    seo: {
      title: "Crop Image Online",
      description:
        "Crop image online in your browser. On-device processing — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I crop an image online without uploading it?",
        answer:
          "Yes. Pix-8 Cropper runs entirely in your browser. Your file is read locally, the crop selection is applied on a client-side canvas, and you download or copy the result. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What can this online image cropper do?",
        answer:
          "Drag and resize a crop selection, choose aspect-ratio presets (free, 1:1, 16:9, 4:3, 9:16, 4:5), apply social media presets for common platform ratios, preview crop dimensions, then download or copy the output. Optional EXIF metadata stripping is available before export. It does not include AI auto-crop, batch cropping, or server-side optimization.",
      },
      {
        question: "How is this different from cloud image croppers?",
        answer:
          "Cloud croppers require uploading your file before any pixels are cropped. Pix-8 processes on-device in your browser tab and exports in seconds — free, with no account and no server round-trip.",
      },
    ],
  },
  "free-image-cropper": {
    id: "free-image-cropper",
    path: "/free-image-cropper",
    linkTitle: "Free image cropper",
    linkExcerpt:
      "Free image cropping in your browser — no watermark, no upload.",
    seo: {
      title: "Free Image Cropper",
      description:
        "Free image cropper in your browser. Crop on-device — no watermark, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Is this image cropper really free?",
        answer:
          "Yes. Pix-8 Cropper is free with no account, no watermark, and no export limits. Drag your crop selection, choose aspect-ratio or social media presets, and download or copy the cropped output at no cost.",
      },
      {
        question: "Are my images uploaded when I use this free image cropper?",
        answer:
          "No. Your file is read locally via the browser File API and all cropping runs on-device. It is never transmitted to Pix-8 or any third-party server — the privacy advantage of a free tool that keeps processing client-side.",
      },
      {
        question: "What can this free image cropper do — and what does it not include?",
        answer:
          "Cropper supports drag-and-resize selection, aspect-ratio presets, social media ratio presets, live crop size preview, and download or copy export with optional EXIF stripping. It does not include paid tiers, AI auto-crop, batch cropping, or cloud storage sync.",
      },
    ],
  },
  "crop-photos-to-size": {
    id: "crop-photos-to-size",
    path: "/crop-photos-to-size",
    linkTitle: "Crop photos to size",
    linkExcerpt:
      "Frame photos to target size in your browser — client-side, no upload.",
    seo: {
      title: "Crop Photos to Size",
      description:
        "Crop photos to size in your browser. Frame to pixel dimensions on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I crop photos to a specific size without uploading?",
        answer:
          "Yes. Pix-8 Cropper runs entirely in your browser. Load a photo locally, drag the crop selection, and preview output width and height in pixels before export — your file is read on-device and is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "How do I crop a photo to a target size?",
        answer:
          "Drag and resize the crop area while the live size preview shows output width and height in pixels. Lock an aspect-ratio preset (1:1, 16:9, 4:3, 9:16, 4:5) or apply a social media preset to hold a platform ratio, then fine-tune the selection until the preview matches your target. Download or copy the cropped output. It does not include a typed width-and-height input field — use Pix-8 Resizer if you need to scale an image to exact pixel dimensions without reframing.",
      },
      {
        question: "How is cropping to size different from resizing in Pix-8?",
        answer:
          "Cropper reframes your photo — it cuts the selection to the dimensions shown in the crop preview. Resizer scales the full image to typed width and height without changing composition. Both run client-side in your browser tab — free, with no account and no server round-trip.",
      },
    ],
  },
  "image-cutter-online": {
    id: "image-cutter-online",
    path: "/image-cutter-online",
    linkTitle: "Image cutter online",
    linkExcerpt:
      "Cut and frame images in your browser — client-side, no upload.",
    seo: {
      title: "Image Cutter Online",
      description:
        "Image cutter online in your browser. Cut to selection on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I cut an image online without uploading it?",
        answer:
          "Yes. Pix-8 Cropper runs entirely in your browser. Your file is read locally, you drag a crop selection to define what to keep, and the cut is applied on a client-side canvas — then you download or copy the result. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What can this online image cutter do?",
        answer:
          "Draw a rectangular crop selection by dragging, resize the cut area, choose aspect-ratio presets (free, 1:1, 16:9, 4:3, 9:16, 4:5), apply social media presets for common platform ratios, preview output dimensions, then download or copy. Optional EXIF stripping is available before export. It does not include freeform cut-out removal, AI auto-crop, or batch cutting — Pix-8 Custom Cutter handles keep-or-remove region cutouts with transparent PNG output.",
      },
      {
        question: "How is this different from cloud image cutters?",
        answer:
          "Cloud cutters require uploading your file before any cut runs. Pix-8 processes on-device in your browser tab and exports in seconds — free, with no account and no server round-trip.",
      },
    ],
  },
  "crop-image-to-square": {
    id: "crop-image-to-square",
    path: "/crop-image-to-square",
    linkTitle: "Crop image to square",
    linkExcerpt:
      "Square crop in your browser — 1:1 ratio, client-side, no upload.",
    seo: {
      title: "Crop Image to Square",
      description:
        "Crop image to square in your browser. Lock 1:1 on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I crop an image to a square without uploading it?",
        answer:
          "Yes. Pix-8 Cropper runs entirely in your browser. Load an image locally, select the 1:1 aspect-ratio preset or the Instagram square social preset, position your crop selection, and export — your file is read on-device and is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "How do I crop a photo to a square?",
        answer:
          "Open Cropper, load your image, and choose the 1:1 aspect-ratio preset to lock a square crop. Alternatively, use the Instagram square social preset for the same 1:1 ratio. Drag and resize the selection to frame your subject while the live size preview shows output width and height in pixels, then download or copy. It does not include one-click platform size templates, AI subject centering, or batch square cropping.",
      },
      {
        question: "What square output size will I get?",
        answer:
          "The exported square matches the pixel width and height shown in the crop preview — both dimensions stay equal when 1:1 is locked. Position and resize the selection until the preview reflects your target size. For scaling a full image to typed dimensions without reframing, use Pix-8 Resizer instead.",
      },
    ],
  },
  "crop-image-to-16-9": {
    id: "crop-image-to-16-9",
    path: "/crop-image-to-16-9",
    linkTitle: "Crop image to 16:9",
    linkExcerpt:
      "Widescreen crop in your browser — 16:9 ratio, client-side, no upload.",
    seo: {
      title: "Crop Image to 16:9",
      description:
        "Crop image to 16:9 in your browser. Lock widescreen ratio on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I crop an image to 16:9 without uploading it?",
        answer:
          "Yes. Pix-8 Cropper runs entirely in your browser. Load an image locally, select the 16:9 aspect-ratio preset or the landscape cover social preset, position your crop selection, and export — your file is read on-device and is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "How do I crop a photo to 16:9?",
        answer:
          "Open Cropper, load your image, and choose the 16:9 aspect-ratio preset to lock a widescreen crop. Alternatively, use the landscape cover social preset for the same 16:9 ratio. Drag and resize the selection to frame your subject while the live size preview shows output width and height in pixels, then download or copy. It does not include one-click YouTube thumbnail templates, AI subject centering, or batch widescreen cropping.",
      },
      {
        question: "What 16:9 output size will I get?",
        answer:
          "The exported image matches the pixel width and height shown in the crop preview — height equals width divided by 16/9 when the ratio is locked. Position and resize the selection until the preview reflects your target dimensions. For scaling a full image to typed width and height without reframing, use Pix-8 Resizer instead.",
      },
    ],
  },
  "crop-image-to-4-3": {
    id: "crop-image-to-4-3",
    path: "/crop-image-to-4-3",
    linkTitle: "Crop image to 4:3",
    linkExcerpt:
      "Classic ratio crop in your browser — 4:3 lock, client-side, no upload.",
    seo: {
      title: "Crop Image to 4:3",
      description:
        "Crop image to 4:3 in your browser. Lock classic ratio on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I crop an image to 4:3 without uploading it?",
        answer:
          "Yes. Pix-8 Cropper runs entirely in your browser. Load an image locally, select the 4:3 aspect-ratio preset, position your crop selection, and export — your file is read on-device and is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "How do I crop a photo to 4:3?",
        answer:
          "Open Cropper, load your image, and choose the 4:3 aspect-ratio preset to lock a classic landscape crop. Drag and resize the selection to frame your subject while the live size preview shows output width and height in pixels, then download or copy. It does not include one-click platform size templates, AI subject centering, or batch 4:3 cropping.",
      },
      {
        question: "What 4:3 output size will I get?",
        answer:
          "The exported image matches the pixel width and height shown in the crop preview — height equals width multiplied by 3/4 when the ratio is locked. Position and resize the selection until the preview reflects your target dimensions. For scaling a full image to typed width and height without reframing, use Pix-8 Resizer instead.",
      },
    ],
  },
  "free-aspect-ratio-image-cropper": {
    id: "free-aspect-ratio-image-cropper",
    path: "/free-aspect-ratio-image-cropper",
    linkTitle: "Free aspect ratio cropper",
    linkExcerpt:
      "Lock crop ratios in your browser — free presets, client-side, no upload.",
    seo: {
      title: "Free Aspect Ratio Image Cropper",
      description:
        "Free aspect ratio image cropper in your browser. Lock 1:1, 16:9, 4:3, and more on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Is this aspect ratio image cropper free?",
        answer:
          "Yes. Pix-8 Cropper is free with no account, no watermark, and no export limits. Choose an aspect-ratio preset or social media ratio, frame your crop selection, and download or copy the output at no cost.",
      },
      {
        question: "What aspect ratios can I lock when cropping?",
        answer:
          "Cropper includes aspect-ratio presets for free (unlocked), 1:1, 16:9, 4:3, 9:16, and 4:5, plus social media presets that apply common platform ratios such as Instagram square, Story/Reel, landscape cover, and Instagram portrait. Drag and resize the selection while the live size preview shows output width and height in pixels. It does not include custom typed ratio fields, AI auto-crop, or batch cropping.",
      },
      {
        question: "Are my images uploaded when I crop by aspect ratio?",
        answer:
          "No. Your file is read locally via the browser File API and all cropping runs on-device. It is never transmitted to Pix-8 or any third-party server — ratio locking and export happen entirely in your browser tab.",
      },
    ],
  },
  "crop-image-without-quality-loss": {
    id: "crop-image-without-quality-loss",
    path: "/crop-image-without-quality-loss",
    linkTitle: "Crop without quality loss",
    linkExcerpt:
      "Client-side crop in your browser — one on-device pass, no upload.",
    seo: {
      title: "Crop Image Without Quality Loss",
      description:
        "Crop image without quality loss in your browser. Client-side canvas crop on-device — no upload, no server. Private tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I crop an image without uploading it to a server?",
        answer:
          "Yes. Pix-8 Cropper runs entirely in your browser. Your file is read locally and cropped on a client-side canvas — it is never transmitted to Pix-8 or any third-party server. Keeping processing on-device avoids extra compression cycles from cloud upload and download.",
      },
      {
        question: "Does this tool guarantee zero quality loss when cropping?",
        answer:
          "No tool can guarantee zero quality loss — cropping removes pixels outside your selection, and canvas export may re-encode JPEG or WebP at browser defaults. Pix-8 extracts your crop region at the selection's natural pixel dimensions in a single on-device pass, without a server recompression step. It does not include AI enhancement, lossless algorithm presets, or a quality slider for output compression.",
      },
      {
        question: "How is cropping different from resizing for quality?",
        answer:
          "Cropper reframes your image — it cuts the selected region to the dimensions shown in the crop preview. Resizer scales the full image to typed width and height. Both run client-side in your browser tab. Use Cropper when you need to trim composition; use Resizer when you need to change overall pixel dimensions without reframing.",
      },
    ],
  },
  "precision-image-cropper": {
    id: "precision-image-cropper",
    path: "/precision-image-cropper",
    linkTitle: "Precision image cropper",
    linkExcerpt:
      "Pixel-readout crop in your browser — precise framing, client-side, no upload.",
    seo: {
      title: "Precision Image Cropper",
      description:
        "Precision image cropper in your browser. Drag-and-resize with live pixel preview on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I crop images precisely without uploading them?",
        answer:
          "Yes. Pix-8 Cropper runs entirely in your browser. Load an image locally, drag and resize the crop selection with corner handles, and read output width and height in pixels from the live preview before export — your file is read on-device and is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "How does this precision image cropper help me frame accurately?",
        answer:
          "Drag the crop area to position your subject, resize from corner handles, and lock aspect ratio with presets (free, 1:1, 16:9, 4:3, 9:16, 4:5) or social media ratios. The live size preview shows output width and height in pixels as you adjust the selection, then download or copy the crop. It does not include typed width-and-height fields, on-image ruler overlays, snap-to-grid guides, or AI subject detection.",
      },
      {
        question: "Is precise cropping different from resizing in Pix-8?",
        answer:
          "Cropper reframes by cutting the selected region to the pixel dimensions shown in the preview. Resizer scales the full image to typed width and height without changing composition. Both run client-side in your browser tab — free, with no account and no server round-trip.",
      },
    ],
  },
  "crop-image-for-ecommerce-product-photos": {
    id: "crop-image-for-ecommerce-product-photos",
    path: "/crop-image-for-ecommerce-product-photos",
    linkTitle: "E-commerce product crop",
    linkExcerpt:
      "Frame product shots in your browser — square presets, client-side, no upload.",
    seo: {
      title: "Crop Image for E-Commerce Product Photos",
      description:
        "Crop image for e-commerce product photos in your browser. Frame listings on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I crop product photos for e-commerce without uploading them?",
        answer:
          "Yes. Pix-8 Cropper runs entirely in your browser. Load a product shot locally, drag and resize the crop selection, and preview output width and height in pixels before export — your file is read on-device and is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "How do I crop images for e-commerce product listings?",
        answer:
          "Open Cropper, load your product photo, and frame the item with the crop selection. Lock a square ratio with the 1:1 preset or Instagram square social preset for consistent catalog thumbnails, or use other aspect-ratio and social presets as your storefront requires. The live size preview shows output dimensions in pixels — adjust until they match your target, then download or copy. It does not include marketplace size templates, batch catalog cropping, AI product centering, or automatic white-backdrop generation.",
      },
      {
        question: "Should I crop or remove the background for product photos?",
        answer:
          "Cropper reframes your shot — it cuts the selected region to the dimensions shown in the crop preview. Pix-8 Background Remover isolates the product and exports a transparent or solid-color PNG. Both run client-side in your browser tab. Crop when you need tighter framing; remove the background when you need a cut-out for compositing or a flat backdrop listing.",
      },
    ],
  },
  "professional-photo-cropper": {
    id: "professional-photo-cropper",
    path: "/professional-photo-cropper",
    linkTitle: "Professional photo cropper",
    linkExcerpt:
      "Client-side photo crop in your browser — precise framing, no upload.",
    seo: {
      title: "Professional Photo Cropper",
      description:
        "Professional photo cropper in your browser. Frame shots on-device with live pixel preview — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I crop photos professionally without uploading client files?",
        answer:
          "Yes. Pix-8 Cropper runs entirely in your browser. Load a photo locally, drag and resize the crop selection, and read output width and height in pixels from the live preview before export — files are read on-device and are never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What makes this a professional photo cropper?",
        answer:
          "Cropper provides handle-based framing with a live pixel readout, aspect-ratio and social media presets, and download or copy export with optional EXIF stripping — all on a client-side canvas with no watermark and no account. It does not include RAW processing, non-destructive layer editing, batch studio workflows, color grading, or AI retouch tools.",
      },
      {
        question: "Is this professional photo cropper free and private?",
        answer:
          "Yes. The tool is free with no watermark and no export limits. All cropping runs client-side in your browser tab — portrait, editorial, and client deliverables stay on your machine throughout the workflow, with no cloud upload step.",
      },
    ],
  },
  "client-side-image-cropper": {
    id: "client-side-image-cropper",
    path: "/client-side-image-cropper",
    linkTitle: "Client-side cropper",
    linkExcerpt:
      "Crop images in your browser tab — on-device canvas, no upload.",
    seo: {
      title: "Client-Side Image Cropper",
      description:
        "Client-side image cropper in your browser. On-device canvas cropping — no upload, no server. Private tool by Pix-8.",
    },
    faq: [
      {
        question: "What does client-side image cropping mean?",
        answer:
          "Your image is read locally through the browser File API and cropped on a canvas in your browser tab. Pixel data is not sent to Pix-8 or any third-party server for processing. You frame a selection, export the result, and the file stays on your device throughout.",
      },
      {
        question: "How is a client-side cropper different from cloud image croppers?",
        answer:
          "Cloud croppers require uploading your file before any crop runs. Pix-8 Cropper processes on a client-side canvas — drag and resize the selection, choose aspect-ratio or social media presets, preview output dimensions, then download or copy. It does not include server-side APIs, cloud storage sync, batch cropping, or account-based file retention.",
      },
      {
        question: "Is this client-side image cropper free and private?",
        answer:
          "Yes. The tool is free with no account required. All cropping runs in your browser — your images are never uploaded as part of the crop workflow.",
      },
    ],
  },
  "privacy-focused-image-cutter": {
    id: "privacy-focused-image-cutter",
    path: "/privacy-focused-image-cutter",
    linkTitle: "Privacy-focused cutter",
    linkExcerpt:
      "Cut images privately in your browser — on-device, no upload.",
    seo: {
      title: "Privacy-Focused Image Cutter",
      description:
        "Privacy-focused image cutter in your browser. On-device cutting — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Is this image cutter private — does it upload my images?",
        answer:
          "Yes, it is private by design. Pix-8 Cropper runs entirely in your browser. Your file is read locally, you define a rectangular cut with a draggable selection, and the cut is applied on a client-side canvas — it is never transmitted to Pix-8 or any third-party server. No account is required, and there is no cloud file retention.",
      },
      {
        question: "What privacy features does this image cutter include?",
        answer:
          "Client-side processing keeps your image on your device throughout the workflow. Optional EXIF metadata stripping removes location and camera data before export. Drag and resize the cut area, choose aspect-ratio or social presets, preview output dimensions, then download or copy. It does not include end-to-end encryption, compliance certifications, or enterprise audit logging. For freeform keep-or-remove cutouts with transparent PNG output, use Pix-8 Custom Cutter.",
      },
      {
        question: "Is a privacy-focused image cutter free to use?",
        answer:
          "Yes. The tool is free with no account required. All cutting runs client-side in your browser — your images stay on your device, with no cloud upload step.",
      },
    ],
  },
  "no-upload-image-cropper": {
    id: "no-upload-image-cropper",
    path: "/no-upload-image-cropper",
    linkTitle: "No-upload cropper",
    linkExcerpt:
      "Crop images without uploading — client-side in your browser.",
    seo: {
      title: "No-Upload Image Cropper",
      description:
        "No-upload image cropper in your browser. Crop on-device — no server, no cloud queue. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Does this image cropper require an upload?",
        answer:
          "No. Pix-8 Cropper runs entirely in your browser. Your image is read locally through the File API and cropped on a client-side canvas — it is never uploaded to Pix-8 or any third-party server. There is no cloud queue, no account, and no server-side processing step.",
      },
      {
        question: "How is a no-upload cropper different from cloud image croppers?",
        answer:
          "Cloud croppers require sending your file to a remote server before any crop runs. Pix-8 processes on-device — drag and resize the selection, choose aspect-ratio or social media presets, preview output dimensions, then download or copy. It does not include drag-to-cloud workflows, server APIs, batch cropping, or stored file history.",
      },
      {
        question: "Is this no-upload image cropper free?",
        answer:
          "Yes. The tool is free with no account required. All cropping runs client-side in your browser — your images stay on your device throughout, with no upload step.",
      },
    ],
  },
  "browser-based-image-cropper-tool": {
    id: "browser-based-image-cropper-tool",
    path: "/browser-based-image-cropper-tool",
    linkTitle: "Browser cropper tool",
    linkExcerpt:
      "Crop images in your browser — no install, client-side, no upload.",
    seo: {
      title: "Browser-Based Image Cropper Tool",
      description:
        "Browser-based image cropper tool in your browser. Crop on-device — no install, no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "What does a browser-based image cropper tool mean?",
        answer:
          "All cropping runs in your web browser on a client-side canvas — no desktop install, no account, and no file upload to a server. Drag and resize a crop selection, choose aspect-ratio or social media presets, preview output dimensions, then download or copy. It does not include AI auto-crop, batch cropping, or offline PWA guarantees beyond standard browser behavior.",
      },
      {
        question: "Are my images uploaded when I use this browser cropper?",
        answer:
          "No. Your file is read locally via the browser File API and cropped on-device. It is never transmitted to Pix-8 or any third-party server — the core privacy advantage of a browser-based image cropper tool that keeps processing client-side.",
      },
      {
        question:
          "How is this different from a desktop app or cloud image cropper?",
        answer:
          "Desktop apps require installation; cloud croppers upload your image before any crop runs. Pix-8 runs entirely in the tab — load an image, frame your selection, and export in seconds — free, with no server round-trip and no app download.",
      },
    ],
  },
};

export function listCropperLandings(): CropperLandingEntry[] {
  return Object.values(CROPPER_LANDINGS);
}

export function getCropperLandingByPath(
  path: string,
): CropperLandingEntry | undefined {
  return listCropperLandings().find((entry) => entry.path === path);
}

export function getCropperLandingBySlug(
  slug: string,
): CropperLandingEntry | undefined {
  const normalized = slug.replace(/^\/+/, "");
  return listCropperLandings().find(
    (entry) => entry.path === `/${normalized}`,
  );
}
