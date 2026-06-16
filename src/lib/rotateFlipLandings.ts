export const ROTATE_FLIP_TOOL_HREF = "/tools/editor-studio/rotate-flip";

export const ROTATE_FLIP_LANDING_ACCENT = "#8E977D";

export const ROTATE_FLIP_ARTICLE = {
  href: "/articles/perfect-orientation-rotation-flipping",
  title: "The Art of Orientation: Why Proper Rotation and Flipping Matters",
  excerpt:
    "From correcting accidental upside-down shots to creating creative mirror effects, learn why mastering image orientation is essential.",
} as const;

/** What Rotate & Flip actually supports — use for intent-accurate copy. */
export const ROTATE_FLIP_CAPABILITIES = [
  "Rotate 90° clockwise or counter-clockwise",
  "Flip horizontal or vertical",
  "Live output size preview after transform",
  "Download or copy transformed output",
  "Optional EXIF metadata stripping before export",
  "On-device processing — images never uploaded",
] as const;

/**
 * Add new Rotate & Flip SEO landing IDs here.
 * Landing pages belong in this registry — not cropperLandings,
 * customCutterLandings, resizerLandings, or imageAnnotatorLandings.
 */
export type RotateFlipLandingId =
  | "rotate-image-online"
  | "flip-image-online"
  | "mirror-image-online"
  | "free-photo-rotator-and-flipper"
  | "flip-photo-horizontally-and-vertically"
  | "rotate-image-90-degrees"
  | "fix-upside-down-pictures-online"
  | "mirror-selfie-online"
  | "batch-rotate-images-online"
  | "lossless-image-rotation-tool"
  | "batch-flip-photos-tool"
  | "client-side-image-rotator"
  | "no-upload-photo-flip-tool"
  | "private-browser-image-mirror"
  | "secure-image-rotation-online";

export interface RotateFlipLandingEntry {
  id: RotateFlipLandingId;
  path: string;
  linkTitle: string;
  linkExcerpt: string;
  seo: {
    title: string;
    description: string;
  };
  faq: readonly { question: string; answer: string }[];
}

export const ROTATE_FLIP_LANDINGS: Record<
  RotateFlipLandingId,
  RotateFlipLandingEntry
> = {
  "rotate-image-online": {
    id: "rotate-image-online",
    path: "/rotate-image-online",
    linkTitle: "Rotate image online",
    linkExcerpt:
      "Rotate images in your browser — client-side, no upload.",
    seo: {
      title: "Rotate Image Online",
      description:
        "Rotate image online in your browser. 90° turns and flips on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I rotate an image online without uploading it?",
        answer:
          "Yes. Pix-8 Rotate & Flip runs entirely in your browser. Your file is read locally, rotation and flips are applied on a client-side canvas, and you download or copy the result. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What rotation options does this online tool support?",
        answer:
          "Rotate 90° clockwise or counter-clockwise, flip horizontal or vertical, preview the output dimensions after each transform, then download or copy. Optional EXIF metadata stripping is available before export. It does not include free-form angle rotation, auto-orient from EXIF only, or batch processing.",
      },
      {
        question: "How is this different from cloud image rotators?",
        answer:
          "Cloud rotators require uploading your file before any pixel is turned. Pix-8 processes on-device in your browser tab and exports in seconds — free, with no account and no server round-trip.",
      },
    ],
  },
  "flip-image-online": {
    id: "flip-image-online",
    path: "/flip-image-online",
    linkTitle: "Flip image online",
    linkExcerpt:
      "Flip images in your browser — client-side, no upload.",
    seo: {
      title: "Flip Image Online",
      description:
        "Flip image online in your browser. Horizontal and vertical flips on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I flip an image online without uploading it?",
        answer:
          "Yes. Pix-8 Rotate & Flip runs entirely in your browser. Your file is read locally, horizontal and vertical flips are applied on a client-side canvas, and you download or copy the result. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What flip options does this online tool support?",
        answer:
          "Flip images horizontally (mirror left/right) or vertically (flip top/bottom), preview the output dimensions after each transform, then download or copy. Optional EXIF metadata stripping is available before export. It does not include free-form warp, perspective corrections, or batch processing.",
      },
      {
        question: "How is this different from cloud image flippers?",
        answer:
          "Cloud flippers require uploading your file before any pixel is flipped. Pix-8 processes on-device in your browser tab and exports in seconds — free, with no account and no server round-trip.",
      },
    ],
  },
  "mirror-image-online": {
    id: "mirror-image-online",
    path: "/mirror-image-online",
    linkTitle: "Mirror image online",
    linkExcerpt:
      "Mirror images in your browser — client-side, no upload.",
    seo: {
      title: "Mirror Image Online",
      description:
        "Mirror image online in your browser. Horizontal reflection on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I mirror an image online without uploading it?",
        answer:
          "Yes. Pix-8 Rotate & Flip runs entirely in your browser. Your file is read locally, the horizontal flip is applied on a client-side canvas, and you download or copy the result. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "How does mirroring work in this online tool?",
        answer:
          "Mirroring is achieved with a horizontal flip — reflecting the image left to right. You can also flip vertically or rotate 90° when needed, preview output dimensions after each transform, then download or copy. Optional EXIF metadata stripping is available before export. It does not include free-form warp, perspective correction, or batch processing.",
      },
      {
        question: "How is this different from cloud image mirroring tools?",
        answer:
          "Cloud tools require uploading your file before any reflection is applied. Pix-8 processes on-device in your browser tab and exports in seconds — free, with no account and no server round-trip.",
      },
    ],
  },
  "free-photo-rotator-and-flipper": {
    id: "free-photo-rotator-and-flipper",
    path: "/free-photo-rotator-and-flipper",
    linkTitle: "Free rotator & flipper",
    linkExcerpt:
      "Rotate and flip photos free in your browser — client-side, no upload.",
    seo: {
      title: "Free Photo Rotator and Flipper",
      description:
        "Free photo rotator and flipper in your browser. 90° turns and flips on-device — no upload, no account. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Is this photo rotator and flipper really free?",
        answer:
          "Yes. Pix-8 Rotate & Flip is free with no account required. Your file is read locally, rotation and flips are applied on a client-side canvas, and you download or copy the result. There is no paid tier, watermark, or upload step.",
      },
      {
        question: "What can this free rotator and flipper do?",
        answer:
          "Rotate photos 90° clockwise or counter-clockwise, flip horizontal or vertical, preview output dimensions after each transform, then download or copy. Optional EXIF metadata stripping is available before export. It does not include free-form angle rotation, batch processing, or server-side optimization.",
      },
      {
        question: "Do I need to upload my photo to use this tool?",
        answer:
          "No. Pix-8 processes entirely in your browser tab. Your image is never transmitted to Pix-8 or any third-party server — a practical free rotator and flipper when privacy matters.",
      },
    ],
  },
  "flip-photo-horizontally-and-vertically": {
    id: "flip-photo-horizontally-and-vertically",
    path: "/flip-photo-horizontally-and-vertically",
    linkTitle: "Horizontal & vertical flip",
    linkExcerpt:
      "Flip photos both ways in your browser — client-side, no upload.",
    seo: {
      title: "Flip Photo Horizontally and Vertically",
      description:
        "Flip photo horizontally and vertically in your browser. Both-axis flips on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I flip a photo horizontally and vertically without uploading?",
        answer:
          "Yes. Pix-8 Rotate & Flip runs entirely in your browser. Your file is read locally, horizontal and vertical flips are applied on a client-side canvas, and you download or copy the result. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "Can I apply both horizontal and vertical flips to one photo?",
        answer:
          "Yes. Toggle horizontal flip for a left-to-right mirror, vertical flip for a top-to-bottom inversion, or combine both. You can also rotate 90° when needed, preview output dimensions after each transform, then download or copy. Optional EXIF metadata stripping is available before export. It does not include free-form warp, perspective correction, or batch processing.",
      },
      {
        question: "How is this different from cloud photo flippers?",
        answer:
          "Cloud tools require uploading your file before any flip is applied. Pix-8 processes on-device in your browser tab and exports in seconds — free, with no account and no server round-trip.",
      },
    ],
  },
  "rotate-image-90-degrees": {
    id: "rotate-image-90-degrees",
    path: "/rotate-image-90-degrees",
    linkTitle: "Rotate image 90°",
    linkExcerpt:
      "Rotate images 90° in your browser — client-side, no upload.",
    seo: {
      title: "Rotate Image 90 Degrees",
      description:
        "Rotate image 90 degrees in your browser. Clockwise and counter-clockwise turns on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I rotate an image 90 degrees without uploading it?",
        answer:
          "Yes. Pix-8 Rotate & Flip runs entirely in your browser. Your file is read locally, 90° rotation is applied on a client-side canvas, and you download or copy the result. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "How does 90-degree rotation work in this tool?",
        answer:
          "Rotate 90° clockwise or counter-clockwise in discrete steps — each click turns the image a quarter turn. Output dimensions update when width and height swap. You can also flip horizontal or vertical, preview dimensions after each transform, then download or copy. Optional EXIF metadata stripping is available before export. It does not include free-form angle rotation, auto-orient from EXIF only, or batch processing.",
      },
      {
        question: "How is this different from cloud image rotators?",
        answer:
          "Cloud rotators require uploading your file before any pixel is turned. Pix-8 processes on-device in your browser tab and exports in seconds — free, with no account and no server round-trip.",
      },
    ],
  },
  "fix-upside-down-pictures-online": {
    id: "fix-upside-down-pictures-online",
    path: "/fix-upside-down-pictures-online",
    linkTitle: "Fix upside-down photos",
    linkExcerpt:
      "Correct upside-down pictures in your browser — client-side, no upload.",
    seo: {
      title: "Fix Upside Down Pictures Online",
      description:
        "Fix upside down pictures online in your browser. Rotate 90° to correct orientation on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I fix upside-down pictures online without uploading them?",
        answer:
          "Yes. Pix-8 Rotate & Flip runs entirely in your browser. Your file is read locally, rotation is applied on a client-side canvas, and you download or copy the corrected result. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "How do I fix an upside-down photo with this tool?",
        answer:
          "Load the image and rotate 90° clockwise or counter-clockwise until it reads correctly — two quarter-turns correct a fully upside-down shot (180°). You can also flip vertical or horizontal if needed, preview output dimensions after each step, then download or copy. Optional EXIF metadata stripping is available before export. It does not include automatic EXIF orientation, free-form angle rotation, or batch processing.",
      },
      {
        question: "How is this different from cloud orientation tools?",
        answer:
          "Cloud tools require uploading your file before any correction. Pix-8 processes on-device in your browser tab and exports in seconds — free, with no account and no server round-trip.",
      },
    ],
  },
  "mirror-selfie-online": {
    id: "mirror-selfie-online",
    path: "/mirror-selfie-online",
    linkTitle: "Mirror selfie online",
    linkExcerpt:
      "Mirror selfies in your browser — client-side, no upload.",
    seo: {
      title: "Mirror Selfie Online",
      description:
        "Mirror selfie online in your browser. Horizontal flip for selfie photos on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I mirror a selfie online without uploading it?",
        answer:
          "Yes. Pix-8 Rotate & Flip runs entirely in your browser. Your selfie is read locally, a horizontal flip is applied on a client-side canvas, and you download or copy the result. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "How does mirroring a selfie work in this tool?",
        answer:
          "Apply a horizontal flip for a left-to-right mirror effect on your selfie — or flip again to correct a mirrored front-camera preview. You can also rotate 90° or flip vertically if needed, preview output dimensions, then download or copy. Optional EXIF metadata stripping is available before export. It does not include beauty filters, face retouching, background blur, or batch processing.",
      },
      {
        question: "How is this different from cloud selfie editors?",
        answer:
          "Cloud editors require uploading your selfie before any flip is applied. Pix-8 processes on-device in your browser tab and exports in seconds — free, with no account and no server round-trip.",
      },
    ],
  },
  "batch-rotate-images-online": {
    id: "batch-rotate-images-online",
    path: "/batch-rotate-images-online",
    linkTitle: "Batch rotate images",
    linkExcerpt:
      "Rotate images in sequence in your browser — client-side, no upload.",
    seo: {
      title: "Batch Rotate Images Online",
      description:
        "Batch rotate images online workflow in your browser. Apply 90° turns image-by-image on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I batch rotate images online without uploading them?",
        answer:
          "You can process multiple images one after another locally in Pix-8 Rotate & Flip without uploading. Each file is read on-device, rotated on a client-side canvas, then exported before moving to the next image. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "Does this tool support true multi-file batch processing?",
        answer:
          "No. Pix-8 Rotate & Flip currently processes one image at a time. For a practical batch workflow, apply the same 90° clockwise or counter-clockwise rotation to each file in sequence, then export. You also get horizontal/vertical flips, output-size preview, and optional EXIF stripping before export.",
      },
      {
        question: "How is this different from cloud batch rotators?",
        answer:
          "Cloud batch rotators require uploading entire sets before any correction. Pix-8 keeps every step on-device in your browser tab, so you can rotate each image privately and export immediately with no server round-trip.",
      },
    ],
  },
  "lossless-image-rotation-tool": {
    id: "lossless-image-rotation-tool",
    path: "/lossless-image-rotation-tool",
    linkTitle: "Lossless image rotation",
    linkExcerpt:
      "Rotate images with minimal recompression in your browser — client-side, no upload.",
    seo: {
      title: "Lossless Image Rotation Tool",
      description:
        "Lossless image rotation tool in your browser. 90° canvas rotation on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I rotate images without uploading them?",
        answer:
          "Yes. Pix-8 Rotate & Flip runs entirely in your browser. Your file is read locally, rotated on a client-side canvas, and exported in a single on-device pass. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "Is this rotation truly lossless?",
        answer:
          "No tool can guarantee zero quality loss for every format. Pix-8 applies 90° clockwise or counter-clockwise turns on a client-side canvas in one pass, without a server recompression step. JPEG and WebP exports may still be re-encoded by the browser at default quality settings. PNG output preserves pixel data without additional compression loss. It does not include arbitrary-angle rotation, batch automation, or a quality slider.",
      },
      {
        question: "How is this different from cloud image rotators?",
        answer:
          "Cloud rotators upload your file before any transform. Pix-8 processes on-device in your browser tab and exports immediately — free, with no account and no server round-trip.",
      },
    ],
  },
  "batch-flip-photos-tool": {
    id: "batch-flip-photos-tool",
    path: "/batch-flip-photos-tool",
    linkTitle: "Batch flip photos",
    linkExcerpt:
      "Flip photos in sequence in your browser — client-side, no upload.",
    seo: {
      title: "Batch Flip Photos Tool",
      description:
        "Batch flip photos tool in your browser. Apply horizontal or vertical flips image-by-image on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I batch flip photos without uploading them?",
        answer:
          "You can process multiple photos one after another locally in Pix-8 Rotate & Flip without uploading. Each file is read on-device, flipped on a client-side canvas, then exported before moving to the next image. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "Does this tool support true multi-file batch processing?",
        answer:
          "No. Pix-8 Rotate & Flip currently processes one image at a time. For a practical batch workflow, apply the same horizontal or vertical flip to each file in sequence, then export. You also get 90° rotation, output-size preview, and optional EXIF stripping before export.",
      },
      {
        question: "How is this different from cloud batch flip tools?",
        answer:
          "Cloud batch flip tools require uploading entire sets before any correction. Pix-8 keeps every step on-device in your browser tab, so you can flip each photo privately and export immediately with no server round-trip.",
      },
    ],
  },
  "client-side-image-rotator": {
    id: "client-side-image-rotator",
    path: "/client-side-image-rotator",
    linkTitle: "Client-side rotator",
    linkExcerpt:
      "Rotate images in your browser tab — on-device canvas, no upload.",
    seo: {
      title: "Client-Side Image Rotator",
      description:
        "Client-side image rotator in your browser. 90° rotation on an on-device canvas — no upload, no server. Private tool by Pix-8.",
    },
    faq: [
      {
        question: "What does client-side image rotation mean?",
        answer:
          "Your image is read locally through the browser File API and rotated on a canvas in your browser tab. Pixel data is not sent to Pix-8 or any third-party server for processing. You apply 90° turns or flips, export the result, and the file stays on your device throughout.",
      },
      {
        question: "How is a client-side rotator different from cloud image rotators?",
        answer:
          "Cloud rotators require uploading your file before any transform runs. Pix-8 Rotate & Flip processes on a client-side canvas — rotate 90° clockwise or counter-clockwise, flip horizontally or vertically, preview output dimensions, then download or copy. It does not include server-side APIs, cloud storage sync, batch automation, or arbitrary-angle rotation.",
      },
      {
        question: "Is this client-side image rotator free and private?",
        answer:
          "Yes. The tool is free with no account required. All rotation and flipping runs in your browser — your images are never uploaded as part of the workflow.",
      },
    ],
  },
  "no-upload-photo-flip-tool": {
    id: "no-upload-photo-flip-tool",
    path: "/no-upload-photo-flip-tool",
    linkTitle: "No-upload photo flip",
    linkExcerpt:
      "Flip photos without uploading in your browser — client-side, on-device.",
    seo: {
      title: "No-Upload Photo Flip Tool",
      description:
        "No-upload photo flip tool in your browser. Apply horizontal or vertical flips on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I flip photos without uploading them?",
        answer:
          "Yes. Pix-8 Rotate & Flip runs entirely in your browser. Your photo is read locally, flipped on a client-side canvas, and exported from your device. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What flip options does this no-upload tool support?",
        answer:
          "You can flip horizontal or vertical, and combine flips with 90° clockwise or counter-clockwise rotation. You also get output-size preview, download or copy export, and optional EXIF stripping before export. It does not include arbitrary-angle rotation, cloud sync, or multi-file batch automation.",
      },
      {
        question: "How is this different from cloud photo flip tools?",
        answer:
          "Cloud tools upload the image before applying a flip. Pix-8 processes on-device in your browser tab and exports immediately — private, free, and with no account or server round-trip.",
      },
    ],
  },
  "private-browser-image-mirror": {
    id: "private-browser-image-mirror",
    path: "/private-browser-image-mirror",
    linkTitle: "Private browser mirror",
    linkExcerpt:
      "Mirror images privately in your browser — client-side, no upload.",
    seo: {
      title: "Private Browser Image Mirror",
      description:
        "Private browser image mirror in your browser. Apply horizontal reflection on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Is this image mirror private — does it upload my files?",
        answer:
          "Yes, it is private by design. Pix-8 Rotate & Flip runs entirely in your browser. Your image is read locally, mirrored with a horizontal flip on a client-side canvas, and exported from your device. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "How does mirroring work in a private browser tool?",
        answer:
          "Mirroring is achieved with a horizontal flip — reflecting the image left to right. You can also flip vertically or rotate 90° when needed, preview output dimensions, then download or copy. Optional EXIF metadata stripping is available before export. It does not include free-form warp, perspective correction, or batch processing.",
      },
      {
        question: "How is this different from cloud image mirror tools?",
        answer:
          "Cloud mirror tools require uploading your file before any reflection is applied. Pix-8 processes on-device in your browser tab and exports immediately — free, with no account and no server round-trip.",
      },
    ],
  },
  "secure-image-rotation-online": {
    id: "secure-image-rotation-online",
    path: "/secure-image-rotation-online",
    linkTitle: "Secure image rotation",
    linkExcerpt:
      "Rotate images securely in your browser — client-side, no upload.",
    seo: {
      title: "Secure Image Rotation Online",
      description:
        "Secure image rotation online in your browser. Apply 90° rotation on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I rotate images securely online without uploading?",
        answer:
          "Yes. Pix-8 Rotate & Flip runs entirely in your browser. Your image is read locally, rotated on a client-side canvas, and exported from your device. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What makes this rotation workflow secure?",
        answer:
          "Security here comes from architecture: on-device processing, no cloud upload queue, and optional EXIF metadata stripping before export. You can rotate 90° clockwise or counter-clockwise, preview output dimensions, then download or copy. It does not include end-to-end encryption claims, cloud key management, or compliance certification guarantees.",
      },
      {
        question: "How is this different from cloud rotation tools?",
        answer:
          "Cloud rotation tools require uploading your file before any correction. Pix-8 keeps every step in your browser tab and exports immediately, with no account and no server round-trip.",
      },
    ],
  },
};

export function listRotateFlipLandings(): RotateFlipLandingEntry[] {
  return Object.values(ROTATE_FLIP_LANDINGS);
}

export function getRotateFlipLandingByPath(
  path: string,
): RotateFlipLandingEntry | undefined {
  return listRotateFlipLandings().find((entry) => entry.path === path);
}

export function getRotateFlipLandingBySlug(
  slug: string,
): RotateFlipLandingEntry | undefined {
  const normalized = slug.replace(/^\/+/, "");
  return listRotateFlipLandings().find(
    (entry) => entry.path === `/${normalized}`,
  );
}
