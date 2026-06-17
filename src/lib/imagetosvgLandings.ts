export const IMAGE_TO_SVG_TOOL_HREF = "/tools/dev-tools/image-to-svg";

export const IMAGE_TO_SVG_LANDING_ACCENT = "#7C6BA8";

export const IMAGE_TO_SVG_ARTICLE = {
  href: "/articles/image-to-svg-guide",
  title:
    "The Complete Guide to Converting Images to SVG – The Future of Vector Design in the Browser",
  excerpt:
    "Learn how raster-to-SVG vectorization works, why SVG beats PNG for logos and icons, and how to trace images privately in your browser with Pix-8.",
} as const;

/** What Image to SVG Converter actually supports — use for intent-accurate copy. */
export const IMAGE_TO_SVG_CAPABILITIES = [
  "Trace PNG and JPEG images into scalable SVG vectors in the browser",
  "Color, grayscale, and black-and-white tracing modes",
  "Adjustable path complexity and optional path simplification",
  "Live preview before download",
  "Download traced SVG files or copy SVG markup locally",
  "On-device processing — images never uploaded to a server",
] as const;

/**
 * Add new Image to SVG Converter SEO landing IDs here as union members.
 * Landing pages belong in this registry — not imageAnnotatorLandings,
 * converter landings, or other tool families.
 */
export type ImageToSvgLandingId =
  | "image-to-svg-converter-online"
  | "convert-image-to-vector"
  | "png-to-svg-converter"
  | "jpg-to-svg-online"
  | "vectorize-image-online"
  | "free-image-to-vector-converter"
  | "svg-trace-online"
  | "high-quality-vector-converter"
  | "client-side-image-to-svg-converter"
  | "no-upload-vector-converter"
  | "privacy-first-svg-generator"
  | "browser-based-vectorization-tool"
  | "turn-logo-to-svg"
  | "convert-pixel-art-to-svg"
  | "smooth-image-to-vector-converter"
  | "svg-path-converter-online";

export interface ImageToSvgLandingEntry {
  id: ImageToSvgLandingId;
  path: string;
  linkTitle: string;
  linkExcerpt: string;
  seo: {
    title: string;
    description: string;
  };
  faq: readonly { question: string; answer: string }[];
}

export const IMAGE_TO_SVG_LANDINGS: Record<
  ImageToSvgLandingId,
  ImageToSvgLandingEntry
> = {
  "image-to-svg-converter-online": {
    id: "image-to-svg-converter-online",
    path: "/image-to-svg-converter-online",
    linkTitle: "Image to SVG converter online",
    linkExcerpt:
      "Image to SVG converter online in your browser — trace PNG and JPEG on-device, no upload.",
    seo: {
      title: "Image to SVG Converter Online",
      description:
        "Image to SVG converter online in your browser. Trace PNG and JPEG to scalable SVG with color, grayscale, or black-and-white modes — processed on-device, no upload, no server. Client-side tool by Pix-8.",
    },
    faq: [
      {
        question:
          "Does this image to SVG converter online upload my files to a server?",
        answer:
          "No. Pix-8 Image to SVG Converter runs entirely in your browser. Your image file is read locally, traced on-device with ImageTracer, and previewed as SVG markup before you download or copy. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question:
          "What image formats and tracing options does the online converter support?",
        answer:
          "Load a PNG or JPEG from your device, choose color, grayscale, or black-and-white tracing, adjust path complexity with a slider, and optionally enable path simplification. A live preview updates before you download the SVG file or copy the markup. The tool traces one image per session — it does not batch-convert folders, edit existing SVG files, or replace professional desktop vectorization suites.",
      },
      {
        question:
          "When should I use an online image to SVG converter instead of a cloud service?",
        answer:
          "Cloud converters typically require uploading your source file before tracing. Pix-8 keeps vectorization in the browser tab — suitable for logos, icons, and simple graphics you want as scalable SVG without routing originals through a remote server. Results depend on image complexity; very detailed photos may produce large path counts even with simplification enabled.",
      },
    ],
  },
  "convert-image-to-vector": {
    id: "convert-image-to-vector",
    path: "/convert-image-to-vector",
    linkTitle: "Convert image to vector",
    linkExcerpt:
      "Convert image to vector in your browser — trace PNG and JPEG to SVG on-device, no upload.",
    seo: {
      title: "Convert Image to Vector",
      description:
        "Convert image to vector in your browser. Trace PNG and JPEG to scalable SVG with color, grayscale, or black-and-white modes — processed on-device, no upload, no server. Client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I convert an image to vector without uploading it to a server?",
        answer:
          "Yes. Pix-8 Image to SVG Converter runs entirely in your browser. Your raster file is read locally, traced on-device, and previewed as SVG vector paths before you download or copy. Pix-8 does not receive your image data, and no remote server processes your file during conversion.",
      },
      {
        question: "What does convert image to vector mean with this tool?",
        answer:
          "Pix-8 traces a PNG or JPEG from your device into SVG markup — a scalable vector format built from paths rather than a fixed pixel grid. You can choose color, grayscale, or black-and-white tracing, adjust path complexity, and optionally simplify paths. A live preview shows the result before export. The tool converts one image per session; it does not auto-trace photos into illustration-grade vectors, batch-convert folders, or output formats other than SVG.",
      },
      {
        question: "What kinds of images convert well to vector?",
        answer:
          "Logos, icons, line art, and simple graphics with clear edges typically trace cleanly with adjustable complexity and path simplification. Detailed photographs may produce many paths and larger SVG files even after simplification. For those assets, review the live preview and tune settings before download — all tracing stays client-side in your browser tab.",
      },
    ],
  },
  "png-to-svg-converter": {
    id: "png-to-svg-converter",
    path: "/png-to-svg-converter",
    linkTitle: "PNG to SVG converter",
    linkExcerpt:
      "PNG to SVG converter in your browser — trace PNG files to scalable SVG on-device, no upload.",
    seo: {
      title: "PNG to SVG Converter",
      description:
        "PNG to SVG converter in your browser. Trace PNG files to scalable SVG with color, grayscale, or black-and-white modes — processed on-device, no upload, no server. Client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Does this PNG to SVG converter upload my PNG files to a server?",
        answer:
          "No. Pix-8 Image to SVG Converter runs entirely in your browser. Your PNG is read locally, traced on-device, and previewed as SVG markup before you download or copy. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "Can I convert PNG to SVG with transparency preserved?",
        answer:
          "Pix-8 traces your PNG into SVG path data in the browser. Transparent areas in the source PNG are reflected in the traced output according to how the tracer interprets edges and colors — results vary by artwork complexity. You can tune color mode, path complexity, and path simplification, then review the live preview before export. The tool also accepts JPEG files, but PNG is the typical choice when transparency matters.",
      },
      {
        question: "What PNG to SVG conversion options are available?",
        answer:
          "Load a PNG from your device, choose color, grayscale, or black-and-white tracing, adjust path complexity with a slider, and optionally enable path simplification. Preview the SVG output, then download the file or copy the markup. The tool converts one image per session — it does not batch-convert folders, edit existing SVG files, or replace dedicated desktop tracing software on every asset.",
      },
    ],
  },
  "jpg-to-svg-online": {
    id: "jpg-to-svg-online",
    path: "/jpg-to-svg-online",
    linkTitle: "JPG to SVG online",
    linkExcerpt:
      "JPG to SVG online in your browser — trace JPEG files to scalable SVG on-device, no upload.",
    seo: {
      title: "JPG to SVG Online",
      description:
        "JPG to SVG online in your browser. Trace JPEG files to scalable SVG with color, grayscale, or black-and-white modes — processed on-device, no upload, no server. Client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Does this JPG to SVG online tool upload my photos to a server?",
        answer:
          "No. Pix-8 Image to SVG Converter runs entirely in your browser. Your JPEG file is read locally, traced on-device, and previewed as SVG markup before you download or copy. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "Is JPG the same as JPEG for this converter?",
        answer:
          "Yes. JPG and JPEG refer to the same image format. Load a .jpg or .jpeg file from your device and Pix-8 traces it into SVG path data in the browser. PNG files are also supported if you need a different source format. The tool outputs SVG only — it does not save back to JPG or convert between raster formats.",
      },
      {
        question: "What JPG to SVG tracing options can I use online?",
        answer:
          "Choose a JPEG from your device, select color, grayscale, or black-and-white tracing, adjust path complexity with a slider, and optionally enable path simplification. A live preview updates before you download the SVG file or copy the markup. The tool converts one image per session — it does not batch-convert folders, remove JPEG compression artifacts automatically, or replace professional desktop tracing on detailed photographs.",
      },
    ],
  },
  "vectorize-image-online": {
    id: "vectorize-image-online",
    path: "/vectorize-image-online",
    linkTitle: "Vectorize image online",
    linkExcerpt:
      "Vectorize image online in your browser — trace PNG and JPEG to SVG on-device, no upload.",
    seo: {
      title: "Vectorize Image Online",
      description:
        "Vectorize image online in your browser. Trace PNG and JPEG to scalable SVG with color, grayscale, or black-and-white modes — processed on-device, no upload, no server. Client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I vectorize an image online without uploading it to a server?",
        answer:
          "Yes. Pix-8 Image to SVG Converter runs entirely in your browser. Your raster file is read locally, traced into SVG path data on-device, and previewed before you download or copy. Pix-8 does not receive your image data, and no remote server vectorizes your file during use.",
      },
      {
        question: "What does vectorize image online mean with Pix-8?",
        answer:
          "Pix-8 traces a PNG or JPEG from your device into SVG markup — converting a pixel-based raster into scalable vector paths in the browser. Choose color, grayscale, or black-and-white tracing, adjust path complexity, and optionally simplify paths. Review the live preview, then download or copy the SVG. The tool vectorizes one image per session; it does not batch-process folders, auto-vectorize complex photos into illustration-grade art, or output formats other than SVG.",
      },
      {
        question: "Which images vectorize best online with browser tracing?",
        answer:
          "Logos, icons, line art, and simple graphics with clear edges typically produce cleaner vector paths with adjustable complexity and simplification. Detailed photographs may generate many paths and larger SVG files. Tune settings and check the live preview before export — all vectorization stays client-side in your browser tab.",
      },
    ],
  },
  "free-image-to-vector-converter": {
    id: "free-image-to-vector-converter",
    path: "/free-image-to-vector-converter",
    linkTitle: "Free image to vector converter",
    linkExcerpt:
      "Free image to vector converter in your browser — trace PNG and JPEG on-device, no upload.",
    seo: {
      title: "Free Image to Vector Converter",
      description:
        "Free image to vector converter in your browser. Trace PNG and JPEG to scalable SVG with color, grayscale, or black-and-white modes — no subscription, processed on-device, no upload. Client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Is this free image to vector converter really free to use?",
        answer:
          "Yes. Pix-8 Image to SVG Converter is free to use in your browser — no subscription, no credit card, and no per-export fee. Load a PNG or JPEG locally, trace it to SVG with adjustable settings, preview the result, and download or copy the markup without paying or creating an account.",
      },
      {
        question: "Does free mean my images get uploaded to a server?",
        answer:
          "No. Free does not mean cloud-hosted. Image to SVG Converter runs entirely in your browser. Your file is read locally, traced on-device, and previewed as SVG before export. Pix-8 does not receive your image data, and no remote server processes your files during conversion.",
      },
      {
        question: "What does the free converter include — and what does it not do?",
        answer:
          "The free converter includes color, grayscale, and black-and-white tracing, adjustable path complexity, optional path simplification, live preview, and download or copy of SVG output — all client-side. It traces one PNG or JPEG per session. It does not batch-convert folders, edit existing SVG files, or replace professional desktop vectorization on every complex photograph.",
      },
    ],
  },
  "svg-trace-online": {
    id: "svg-trace-online",
    path: "/svg-trace-online",
    linkTitle: "SVG trace online",
    linkExcerpt:
      "SVG trace online in your browser — trace PNG and JPEG to paths on-device, no upload.",
    seo: {
      title: "SVG Trace Online",
      description:
        "SVG trace online in your browser. Trace PNG and JPEG to scalable SVG paths with color, grayscale, or black-and-white modes — processed on-device, no upload, no server. Client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I SVG trace online without uploading my image to a server?",
        answer:
          "Yes. Pix-8 Image to SVG Converter runs entirely in your browser. Your PNG or JPEG is read locally, traced into SVG path data on-device, and previewed before you download or copy. Pix-8 does not receive your image data, and no remote server runs the trace during use.",
      },
      {
        question: "What does SVG trace online mean with this tool?",
        answer:
          "Pix-8 traces a raster image from your device into SVG markup — building vector paths from pixels in the browser. Choose color, grayscale, or black-and-white tracing, adjust path complexity, and optionally simplify paths. A live preview shows the traced SVG before export. The tool traces one image per session; it does not accept existing SVG files as input for re-tracing, batch-trace folders, or replace manual vector redrawing in professional illustration software.",
      },
      {
        question: "Which images trace cleanly to SVG online?",
        answer:
          "Logos, icons, line art, and simple graphics with clear edges typically produce usable SVG paths with adjustable complexity and simplification. Detailed photographs may generate many paths and larger SVG files. Review the live preview and tune settings before download — all tracing stays client-side in your browser tab.",
      },
    ],
  },
  "high-quality-vector-converter": {
    id: "high-quality-vector-converter",
    path: "/high-quality-vector-converter",
    linkTitle: "High-quality vector converter",
    linkExcerpt:
      "High-quality vector converter in your browser — tune tracing paths on-device, no upload.",
    seo: {
      title: "High-Quality Vector Converter",
      description:
        "High-quality vector converter in your browser. Trace PNG and JPEG to scalable SVG with adjustable path complexity, simplification, and live preview — processed on-device, no upload, no server. Client-side tool by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I use a high-quality vector converter without uploading my image?",
        answer:
          "Yes. Pix-8 Image to SVG Converter runs entirely in your browser. Your PNG or JPEG is read locally, traced into SVG path data on-device, and previewed before you download or copy. Pix-8 does not receive your image data, and no remote server processes your file during conversion.",
      },
      {
        question:
          "What does high-quality mean with this vector converter?",
        answer:
          "Pix-8 gives you direct control over trace output: color, grayscale, or black-and-white modes, a path complexity slider, optional path simplification, and a live preview before export. That lets you tune vector paths for logos, icons, and simple graphics in the browser. It converts one PNG or JPEG per session to SVG — it does not auto-redraw complex photographs into illustration-grade vectors, batch-convert folders, edit existing SVG files, or replace dedicated desktop vectorization suites.",
      },
      {
        question:
          "Which images produce the cleanest vector output?",
        answer:
          "Logos, icons, line art, and simple graphics with clear edges typically trace into cleaner paths when you adjust complexity and simplification. Detailed photographs may produce many paths and larger SVG files even with tuning. Review the live preview and refine settings before download — all tracing stays client-side in your browser tab.",
      },
    ],
  },
  "client-side-image-to-svg-converter": {
    id: "client-side-image-to-svg-converter",
    path: "/client-side-image-to-svg-converter",
    linkTitle: "Client-side image to SVG",
    linkExcerpt:
      "Client-side image to SVG converter — trace PNG and JPEG in the browser, no upload.",
    seo: {
      title: "Client-Side Image to SVG Converter",
      description:
        "Client-side image to SVG converter in your browser. Trace PNG and JPEG to scalable SVG with color, grayscale, or black-and-white modes — processed on-device, no upload, no server. Pix-8.",
    },
    faq: [
      {
        question:
          "What does client-side mean for an image to SVG converter?",
        answer:
          "Client-side means tracing runs entirely in your browser tab. Pix-8 reads your PNG or JPEG from your device, builds SVG path data with ImageTracer on-device, and shows a live preview before you download or copy. Your image file is not sent to Pix-8 or any remote server during conversion.",
      },
      {
        question:
          "Does this client-side converter upload my files to a server?",
        answer:
          "No. Image to SVG Converter runs locally in the browser. Load a file from your device, choose color, grayscale, or black-and-white tracing, adjust path complexity, optionally simplify paths, preview the SVG, then download or copy — all without a server round-trip. Pix-8 does not receive your pixel data.",
      },
      {
        question:
          "What can the client-side image to SVG converter do — and what does it not do?",
        answer:
          "It traces one PNG or JPEG per session into downloadable or copyable SVG markup with adjustable tracing settings and a live preview — all client-side. It does not batch-convert folders, edit existing SVG files, output formats other than SVG, or replace professional desktop vectorization on every complex photograph.",
      },
    ],
  },
  "no-upload-vector-converter": {
    id: "no-upload-vector-converter",
    path: "/no-upload-vector-converter",
    linkTitle: "No-upload vector converter",
    linkExcerpt:
      "No-upload vector converter in your browser — trace PNG and JPEG on-device, no server.",
    seo: {
      title: "No-Upload Vector Converter",
      description:
        "No-upload vector converter in your browser. Trace PNG and JPEG to scalable SVG with color, grayscale, or black-and-white modes — processed on-device, no upload, no server. Client-side tool by Pix-8.",
    },
    faq: [
      {
        question:
          "Does this no-upload vector converter send my image to a server?",
        answer:
          "No. Pix-8 Image to SVG Converter runs entirely in your browser. Your PNG or JPEG is read locally, traced into SVG path data on-device, and previewed before you download or copy. Pix-8 does not receive your image data, and no remote server processes your file during conversion.",
      },
      {
        question: "What does no-upload mean for a vector converter?",
        answer:
          "No-upload means you load a raster file from your device and trace it to SVG without routing the original through a cloud service. Choose color, grayscale, or black-and-white tracing, adjust path complexity, optionally simplify paths, and review the live preview — all in the browser tab. The tool converts one PNG or JPEG per session to SVG; it does not batch-convert folders, edit existing vector files, or output formats other than SVG.",
      },
      {
        question:
          "When is a no-upload vector converter the right choice?",
        answer:
          "Use it when you need scalable SVG from logos, icons, or simple graphics and want to keep source files on-device — for client previews, internal assets, or sensitive artwork you prefer not to upload. Detailed photographs may produce many paths and larger SVG files; tune complexity and simplification and check the live preview before export. All tracing stays client-side in your browser.",
      },
    ],
  },
  "privacy-first-svg-generator": {
    id: "privacy-first-svg-generator",
    path: "/privacy-first-svg-generator",
    linkTitle: "Privacy-first SVG generator",
    linkExcerpt:
      "Privacy-first SVG generator in your browser — trace PNG and JPEG on-device, no upload.",
    seo: {
      title: "Privacy-First SVG Generator",
      description:
        "Privacy-first SVG generator in your browser. Trace PNG and JPEG to scalable SVG with color, grayscale, or black-and-white modes — processed on-device, no upload, no server. Client-side tool by Pix-8.",
    },
    faq: [
      {
        question:
          "What makes this a privacy-first SVG generator?",
        answer:
          "Privacy-first means tracing runs entirely in your browser tab. Pix-8 reads your PNG or JPEG from your device, builds SVG path data on-device, and shows a live preview before you download or copy. Your image file is not sent to Pix-8 or any remote server during conversion — no upload step, no cloud queue, and no server-side tracing.",
      },
      {
        question:
          "Does the privacy-first SVG generator upload my images?",
        answer:
          "No. Image to SVG Converter runs locally in the browser. Load a file from your device, choose color, grayscale, or black-and-white tracing, adjust path complexity, optionally simplify paths, preview the SVG, then download or copy — all without routing your raster through a remote server. Pix-8 does not receive your pixel data.",
      },
      {
        question:
          "What does SVG generator mean with this tool — and what does it not do?",
        answer:
          "Pix-8 generates SVG markup by tracing a PNG or JPEG from your device into scalable vector paths in the browser — one image per session with adjustable tracing settings and a live preview. It does not draw SVG from text prompts, batch-generate folders, edit existing SVG files, or replace professional desktop vectorization on every complex photograph.",
      },
    ],
  },
  "browser-based-vectorization-tool": {
    id: "browser-based-vectorization-tool",
    path: "/browser-based-vectorization-tool",
    linkTitle: "Browser vectorization tool",
    linkExcerpt:
      "Browser-based vectorization tool — trace PNG and JPEG to SVG on-device, no upload.",
    seo: {
      title: "Browser-Based Vectorization Tool",
      description:
        "Browser-based vectorization tool. Trace PNG and JPEG to scalable SVG with color, grayscale, or black-and-white modes — processed on-device in your browser tab, no upload, no server. Client-side tool by Pix-8.",
    },
    faq: [
      {
        question:
          "What does browser-based mean for a vectorization tool?",
        answer:
          "Browser-based means tracing runs entirely in your browser tab — no desktop install, no plugin, and no server upload before vectorization begins. Pix-8 reads your PNG or JPEG from your device, traces it into SVG path data on-device with ImageTracer, and shows a live preview before you download or copy. Your image file is not sent to Pix-8 or any remote server during use.",
      },
      {
        question:
          "Does this browser-based vectorization tool upload my images?",
        answer:
          "No. Image to SVG Converter runs locally in the browser. Load a file from your device, choose color, grayscale, or black-and-white tracing, adjust path complexity, optionally simplify paths, preview the SVG, then download or copy — all without routing your raster through a remote server. Pix-8 does not receive your pixel data.",
      },
      {
        question:
          "What can the browser-based tool vectorize — and what are its limits?",
        answer:
          "It traces one PNG or JPEG per session into downloadable or copyable SVG markup with adjustable tracing settings and a live preview — all in the browser. Logos, icons, line art, and simple graphics with clear edges typically vectorize cleanly. Detailed photographs may produce many paths and larger SVG files. It does not batch-vectorize folders, edit existing SVG files, or replace professional desktop vectorization suites on every complex asset.",
      },
    ],
  },
  "turn-logo-to-svg": {
    id: "turn-logo-to-svg",
    path: "/turn-logo-to-svg",
    linkTitle: "Turn logo to SVG",
    linkExcerpt:
      "Turn logo to SVG in your browser — trace PNG and JPEG logos on-device, no upload.",
    seo: {
      title: "Turn Logo to SVG",
      description:
        "Turn logo to SVG in your browser. Trace PNG and JPEG logo files to scalable SVG paths with color, grayscale, or black-and-white modes — processed on-device, no upload, no server. Client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I turn my logo to SVG without uploading it to a server?",
        answer:
          "Yes. Pix-8 Image to SVG Converter runs entirely in your browser. Your logo file is read locally, traced into SVG path data on-device, and previewed before you download or copy. Pix-8 does not receive your image data, and no remote server processes your logo during conversion.",
      },
      {
        question: "What logo files can I turn to SVG with this tool?",
        answer:
          "Load a PNG or JPEG logo from your device — a raster export of your mark, wordmark, or icon. Choose color, grayscale, or black-and-white tracing, adjust path complexity, optionally simplify paths, and review the live preview before export. The tool traces one logo file per session to SVG output; it does not accept native AI or EPS files, batch-convert folders, or auto-redraw complex logo artwork from scratch.",
      },
      {
        question: "Which logos trace cleanly to SVG?",
        answer:
          "Simple logos, flat icons, and marks with clear edges and limited colors typically produce usable SVG paths when you tune complexity and simplification. Logos with fine gradients, heavy photographic detail, or very small text may need setting adjustments or manual cleanup after export. Check the live preview before download — all tracing stays client-side in your browser tab.",
      },
    ],
  },
  "convert-pixel-art-to-svg": {
    id: "convert-pixel-art-to-svg",
    path: "/convert-pixel-art-to-svg",
    linkTitle: "Pixel art to SVG",
    linkExcerpt:
      "Convert pixel art to SVG in your browser — trace PNG and JPEG on-device, no upload.",
    seo: {
      title: "Convert Pixel Art to SVG",
      description:
        "Convert pixel art to SVG in your browser. Trace PNG and JPEG pixel art to scalable SVG paths with color, grayscale, or black-and-white modes — processed on-device, no upload, no server. Client-side tool by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I convert pixel art to SVG without uploading it to a server?",
        answer:
          "Yes. Pix-8 Image to SVG Converter runs entirely in your browser. Your pixel art file is read locally, traced into SVG path data on-device, and previewed before you download or copy. Pix-8 does not receive your image data, and no remote server processes your file during conversion.",
      },
      {
        question:
          "How does this tool convert pixel art to SVG?",
        answer:
          "Load a PNG or JPEG export of your pixel art from your device. Pix-8 traces the raster image into SVG path markup in the browser — choose color, grayscale, or black-and-white tracing, adjust path complexity, and optionally simplify paths. Review the live preview before export. The tool converts one image per session; it does not rebuild pixel art as a grid of individual square elements, batch-convert sprite sheets automatically, or edit existing SVG files.",
      },
      {
        question: "Which pixel art converts cleanly to SVG?",
        answer:
          "Pixel art with a limited palette, hard edges, and no heavy anti-aliasing typically traces into usable SVG paths when you tune complexity and simplification. JPEG exports, soft gradients, or heavily anti-aliased sprites may produce extra paths or softer edges than the original grid. Check the live preview and adjust settings before download — all tracing stays client-side in your browser tab.",
      },
    ],
  },
  "smooth-image-to-vector-converter": {
    id: "smooth-image-to-vector-converter",
    path: "/smooth-image-to-vector-converter",
    linkTitle: "Smooth image to vector",
    linkExcerpt:
      "Smooth image to vector converter in your browser — tune paths on-device, no upload.",
    seo: {
      title: "Smooth Image to Vector Converter",
      description:
        "Smooth image to vector converter in your browser. Trace PNG and JPEG to scalable SVG with path complexity and simplification controls — processed on-device, no upload, no server. Client-side tool by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I convert an image to vector smoothly without uploading it?",
        answer:
          "Yes. Pix-8 Image to SVG Converter runs entirely in your browser. Your PNG or JPEG is read locally, traced into SVG path data on-device, and previewed before you download or copy. Pix-8 does not receive your image data, and no remote server processes your file during conversion.",
      },
      {
        question:
          "What does smooth mean with this image to vector converter?",
        answer:
          "Smooth refers to the tracing controls you adjust in the browser: a path complexity slider to tune detail level, optional path simplification to reduce jagged path segments, and a live preview to check the result before export. Logos, icons, and simple graphics with clear edges typically produce cleaner paths when you tune these settings. The tool traces one PNG or JPEG per session — it does not apply a separate smoothing filter, auto-bezier every edge, or replace manual vector cleanup in professional illustration software.",
      },
      {
        question:
          "Which images convert to the smoothest vector paths?",
        answer:
          "Flat logos, line art, and simple graphics with limited colors typically trace into cleaner, simpler paths when you lower complexity or enable simplification. Detailed photographs may still produce many paths and uneven curves even after tuning. Review the live preview and adjust settings before download — all tracing stays client-side in your browser tab.",
      },
    ],
  },
  "svg-path-converter-online": {
    id: "svg-path-converter-online",
    path: "/svg-path-converter-online",
    linkTitle: "SVG path converter online",
    linkExcerpt:
      "SVG path converter online in your browser — trace PNG and JPEG to paths on-device, no upload.",
    seo: {
      title: "SVG Path Converter Online",
      description:
        "SVG path converter online in your browser. Trace PNG and JPEG to scalable SVG path markup with color, grayscale, or black-and-white modes — processed on-device, no upload, no server. Client-side tool by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I use an SVG path converter online without uploading my image?",
        answer:
          "Yes. Pix-8 Image to SVG Converter runs entirely in your browser. Your PNG or JPEG is read locally, traced into SVG path data on-device, and previewed before you download or copy. Pix-8 does not receive your image data, and no remote server builds paths during conversion.",
      },
      {
        question: "What does SVG path converter online mean with this tool?",
        answer:
          "Pix-8 traces a raster image from your device into SVG markup built from vector paths — converting pixels into path elements in the browser. Choose color, grayscale, or black-and-white tracing, adjust path complexity, optionally simplify paths, and review the live preview before export. The tool converts one PNG or JPEG per session to path-based SVG; it does not edit paths inside existing SVG files, convert between path formats, or batch-process folders.",
      },
      {
        question: "Which images produce usable SVG paths online?",
        answer:
          "Logos, icons, line art, and simple graphics with clear edges typically trace into usable SVG paths when you tune complexity and simplification. Detailed photographs may generate many paths and larger SVG files. Check the live preview and adjust settings before download — all path tracing stays client-side in your browser tab.",
      },
    ],
  },
};

export function listImageToSvgLandings(): ImageToSvgLandingEntry[] {
  return Object.values(IMAGE_TO_SVG_LANDINGS);
}

export function getImageToSvgLandingByPath(
  path: string,
): ImageToSvgLandingEntry | undefined {
  return listImageToSvgLandings().find((entry) => entry.path === path);
}

export function getImageToSvgLandingBySlug(
  slug: string,
): ImageToSvgLandingEntry | undefined {
  const normalized = slug.replace(/^\/+/, "");
  return listImageToSvgLandings().find(
    (entry) => entry.path === `/${normalized}`,
  );
}
