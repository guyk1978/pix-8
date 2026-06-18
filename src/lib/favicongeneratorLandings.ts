export const FAVICON_GENERATOR_TOOL_HREF = "/tools/dev-tools/favicon-generator";

export const FAVICON_GENERATOR_LANDING_ACCENT = "#5B7A6E";

export const FAVICON_GENERATOR_ARTICLE = {
  href: "/articles/favicon-generator",
  title: "Branding Your Browser: The Importance of a Custom Favicon",
  excerpt:
    "Learn why a favicon is vital for your brand identity and how to create one easily from any image.",
} as const;

/** What Favicon Generator actually supports — use for intent-accurate copy. */
export const FAVICON_GENERATOR_CAPABILITIES = [
  "Load images locally from your device",
  "Preview favicon at 16×16, 32×32, and 48×48 before export",
  "Export multi-size favicon.ico or a 32×32 PNG",
  "Adjust zoom framing for small-icon clarity",
  "On-device processing — images never uploaded to a server",
] as const;

/**
 * Add new Favicon Generator SEO landing IDs here as union members.
 * Landing pages belong in this registry — not paletteextractorLandings,
 * colorpickerLandings, cssPaletteGenLandings, or other tool families.
 */
export type FaviconGeneratorLandingId =
  | "favicon-generator-online"
  | "create-favicon-from-image"
  | "free-favicon-maker"
  | "convert-image-to-favicon"
  | "generate-favicon-for-website"
  | "favicon-icon-maker-for-web"
  | "create-favicon-sizes-online"
  | "client-side-favicon-generator"
  | "no-upload-favicon-creator"
  | "privacy-first-favicon-tool"
  | "browser-based-icon-generator"
  | "best-online-tool-to-create-favicon"
  | "make-favicon-for-wordpress"
  | "professional-favicon-maker-for-business"
  | "favicon-converter-for-all-browsers";

export interface FaviconGeneratorLandingEntry {
  id: FaviconGeneratorLandingId;
  path: string;
  linkTitle: string;
  linkExcerpt: string;
  seo: {
    title: string;
    description: string;
  };
  faq: readonly { question: string; answer: string }[];
}

export const FAVICON_GENERATOR_LANDINGS: Record<
  FaviconGeneratorLandingId,
  FaviconGeneratorLandingEntry
> = {
  "favicon-generator-online": {
    id: "favicon-generator-online",
    path: "/favicon-generator-online",
    linkTitle: "Favicon generator online",
    linkExcerpt:
      "Favicon generator online in your browser — ICO or PNG, 16–48px preview, client-side, no upload.",
    seo: {
      title: "Favicon Generator Online",
      description:
        "Favicon generator online in your browser. Preview tab icons at 16×16, 32×32, and 48×48, then export favicon.ico or PNG on-device — no upload, no server. Private client-side Favicon Generator by Pix-8.",
    },
    faq: [
      {
        question:
          "Does this favicon generator online upload my logo to a server?",
        answer:
          "No. Pix-8 Favicon Generator runs entirely in your browser. Your image is read locally, rendered on a client-side canvas, and exported on-device. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What file formats and sizes can I export?",
        answer:
          "Favicon Generator previews icons at 16×16, 32×32, and 48×48 pixels. You can download a multi-size favicon.ico (16, 32, and 48 embedded) or a single 32×32 PNG. It does not generate Apple touch icons, web app manifests, or additional PWA asset packs.",
      },
      {
        question:
          "How is this different from a desktop icon editor or cloud favicon service?",
        answer:
          "Pix-8 processes one source image per session in the browser tab with a zoom slider to frame the center square before export — no install and no account. Cloud favicon tools typically upload your logo first. Favicon Generator does not batch-convert folders, trace vectors, or resize unrelated image assets.",
      },
    ],
  },
  "create-favicon-from-image": {
    id: "create-favicon-from-image",
    path: "/create-favicon-from-image",
    linkTitle: "Create favicon from image",
    linkExcerpt:
      "Create a favicon from any image in your browser — square crop, ICO or PNG, client-side, no upload.",
    seo: {
      title: "Create Favicon from Image",
      description:
        "Create a favicon from any image in your browser. Load a logo or photo locally, preview 16×16–48×48 tab sizes, and export favicon.ico or PNG on-device — no upload, no server. Private client-side Favicon Generator by Pix-8.",
    },
    faq: [
      {
        question: "Can I create a favicon from an image without uploading it?",
        answer:
          "Yes. Pix-8 Favicon Generator reads your image locally in the browser, crops it to a center square with an adjustable zoom slider, and exports favicon files on-device. Your source image is never sent to Pix-8 or any third-party server.",
      },
      {
        question: "What image types work as a favicon source?",
        answer:
          "Favicon Generator accepts common raster formats your browser can decode — typically PNG, JPEG, and WebP. The tool crops to a square and renders previews at 16×16, 32×32, and 48×48. It does not trace vectors from SVG sources or batch-convert multiple files at once.",
      },
      {
        question: "What do I get when I export?",
        answer:
          "You can download a multi-size favicon.ico (16, 32, and 48 px embedded) or a single 32×32 PNG. A browser-tab preview helps you judge legibility before export. Favicon Generator does not produce Apple touch icons, site manifests, or additional PWA asset sizes.",
      },
    ],
  },
  "free-favicon-maker": {
    id: "free-favicon-maker",
    path: "/free-favicon-maker",
    linkTitle: "Free favicon maker",
    linkExcerpt:
      "Free favicon maker in your browser — no account, ICO or PNG export, client-side, no upload.",
    seo: {
      title: "Free Favicon Maker",
      description:
        "Free favicon maker in your browser. No account, no upload — load an image locally, preview 16×16–48×48 tab sizes, and export favicon.ico or PNG on-device. Private client-side Favicon Generator by Pix-8.",
    },
    faq: [
      {
        question: "Is this favicon maker really free to use?",
        answer:
          "Yes. Pix-8 Favicon Generator is free to open in your browser with no account, subscription, or export credit limit. Processing runs client-side on your device. Pix-8 does not charge per download or gate ICO and PNG export behind a paywall.",
      },
      {
        question: "Does the free favicon maker upload my logo?",
        answer:
          "No. Your image is read locally, rendered on a client-side canvas, and exported on-device. It is never transmitted to Pix-8 or any third-party server. There is no cloud queue or hosted storage step.",
      },
      {
        question: "What can I export with the free maker?",
        answer:
          "You can preview favicons at 16×16, 32×32, and 48×48, then download a multi-size favicon.ico or a 32×32 PNG. A zoom slider helps frame the center square. The free maker does not generate Apple touch icons, web app manifests, or batch-convert multiple files.",
      },
    ],
  },
  "convert-image-to-favicon": {
    id: "convert-image-to-favicon",
    path: "/convert-image-to-favicon",
    linkTitle: "Convert image to favicon",
    linkExcerpt:
      "Convert an image to favicon in your browser — ICO or PNG output, 16–48px preview, client-side, no upload.",
    seo: {
      title: "Convert Image to Favicon",
      description:
        "Convert an image to favicon in your browser. Load PNG, JPEG, or WebP locally, preview 16×16–48×48 tab sizes, and export favicon.ico or PNG on-device — no upload, no server. Private client-side Favicon Generator by Pix-8.",
    },
    faq: [
      {
        question: "How do I convert an image to a favicon without uploading it?",
        answer:
          "Open Pix-8 Favicon Generator in your browser, load an image from your device, and the tool crops it to a center square with an adjustable zoom slider. Previews render at 16×16, 32×32, and 48×48 before you download favicon.ico or PNG — all on-device. Your file is never sent to Pix-8 or any third-party server.",
      },
      {
        question: "What output formats does the conversion produce?",
        answer:
          "You can export a multi-size favicon.ico with 16, 32, and 48 px embedded, or a single 32×32 PNG. A browser-tab preview helps you check legibility after conversion. Favicon Generator does not output SVG favicons, Apple touch icons, or web app manifest files.",
      },
      {
        question: "Can I convert multiple images or SVG files at once?",
        answer:
          "No. Favicon Generator converts one raster image per browser session — typically PNG, JPEG, or WebP formats your browser can decode. It does not batch-convert folders, trace SVG artwork into favicons, or resize unrelated assets in bulk.",
      },
    ],
  },
  "generate-favicon-for-website": {
    id: "generate-favicon-for-website",
    path: "/generate-favicon-for-website",
    linkTitle: "Generate favicon for website",
    linkExcerpt:
      "Generate a favicon for your website in the browser — ICO or PNG, tab preview, client-side, no upload.",
    seo: {
      title: "Generate Favicon for Website",
      description:
        "Generate a favicon for your website in the browser. Load a logo locally, preview 16×16–48×48 tab sizes, and export favicon.ico or PNG on-device — no upload, no server. Private client-side Favicon Generator by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I generate a website favicon without uploading my logo?",
        answer:
          "Yes. Pix-8 Favicon Generator runs in your browser. Your image is read locally, cropped to a center square with zoom control, and exported as favicon.ico or PNG on-device. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What files should I add to my website after export?",
        answer:
          "Most sites place favicon.ico in the site root or reference a PNG in the HTML head. Favicon Generator exports favicon.ico (16, 32, and 48 px embedded) or a 32×32 PNG ready to drop into your project. It does not edit your HTML, inject link tags, or generate a full PWA manifest.",
      },
      {
        question:
          "Does this replace a designer or full icon kit for every platform?",
        answer:
          "Favicon Generator produces browser-tab favicon files from one raster source with previews at 16×16, 32×32, and 48×48. It does not create Apple touch icons, Android adaptive icons, Open Graph images, or batch assets for an entire design system.",
      },
    ],
  },
  "favicon-icon-maker-for-web": {
    id: "favicon-icon-maker-for-web",
    path: "/favicon-icon-maker-for-web",
    linkTitle: "Favicon icon maker for web",
    linkExcerpt:
      "Favicon icon maker for web in your browser — tab preview, ICO or PNG, client-side, no upload.",
    seo: {
      title: "Favicon Icon Maker for Web",
      description:
        "Favicon icon maker for web in your browser. Load a logo locally, preview 16×16–48×48 tab icons, and export favicon.ico or PNG on-device — no upload, no server. Private client-side Favicon Generator by Pix-8.",
    },
    faq: [
      {
        question:
          "Is this favicon icon maker for web free and private to use?",
        answer:
          "Yes. Pix-8 Favicon Generator is free to open in your browser with no account required. Your image is processed on a client-side canvas and exported on-device. It is never uploaded to Pix-8 or any third-party server.",
      },
      {
        question: "What web icon sizes does the maker output?",
        answer:
          "Favicon Generator previews tab icons at 16×16, 32×32, and 48×48 pixels, then exports a multi-size favicon.ico or a 32×32 PNG. A browser-tab mockup shows legibility before download. It does not generate 192×192 PWA icons, Apple touch icons, or maskable adaptive icons.",
      },
      {
        question:
          "How is this different from a general image editor or icon font tool?",
        answer:
          "Favicon Generator is purpose-built for small browser-tab icons — center-square crop, zoom framing, and tab-size previews from one raster source. It does not draw vector icons from scratch, manage icon font libraries, or batch-export a full web asset kit.",
      },
    ],
  },
  "create-favicon-sizes-online": {
    id: "create-favicon-sizes-online",
    path: "/create-favicon-sizes-online",
    linkTitle: "Create favicon sizes online",
    linkExcerpt:
      "Create favicon sizes online in your browser — 16, 32, 48px preview, ICO or PNG, client-side, no upload.",
    seo: {
      title: "Create Favicon Sizes Online",
      description:
        "Create favicon sizes online in your browser. Preview 16×16, 32×32, and 48×48 tab icons, then export multi-size favicon.ico or PNG on-device — no upload, no server. Private client-side Favicon Generator by Pix-8.",
    },
    faq: [
      {
        question: "Which favicon sizes can I create online with Pix-8?",
        answer:
          "Favicon Generator previews icons at 16×16, 32×32, and 48×48 pixels before export. favicon.ico bundles those three sizes in one file. PNG export is a single 32×32 image. It does not generate 180×180 Apple touch icons, 192×192 PWA tiles, or custom size grids beyond these outputs.",
      },
      {
        question:
          "Do I need to upload my logo to create favicon sizes online?",
        answer:
          "No. Your image is read locally in the browser, rendered on a client-side canvas, and exported on-device. Pix-8 never receives your file during preview or download. There is no cloud conversion queue.",
      },
      {
        question: "ICO or PNG — which should I export for multiple sizes?",
        answer:
          "Choose favicon.ico when you want one file with 16, 32, and 48 px embedded — a common pattern for site roots. Choose PNG when you need a single 32×32 asset for a head link tag. Favicon Generator does not export separate PNG files for every preview size or write your HTML for you.",
      },
    ],
  },
  "client-side-favicon-generator": {
    id: "client-side-favicon-generator",
    path: "/client-side-favicon-generator",
    linkTitle: "Client-side favicon generator",
    linkExcerpt:
      "Client-side favicon generator in your browser — no upload, ICO or PNG export, 16–48px preview.",
    seo: {
      title: "Client-Side Favicon Generator",
      description:
        "Client-side favicon generator in your browser. Load an image locally, preview 16×16–48×48 tab icons, and export favicon.ico or PNG on-device — no upload, no server. Private Favicon Generator by Pix-8.",
    },
    faq: [
      {
        question: "What does client-side mean for this favicon generator?",
        answer:
          "Client-side means your image is decoded, cropped, previewed, and exported entirely inside your browser tab using a local canvas. Pix-8 does not receive your file during load, preview, or download. No cloud queue, hosted storage, or server-side conversion step is involved.",
      },
      {
        question:
          "Is a client-side favicon generator as private as desktop software?",
        answer:
          "For a single favicon from one raster image, yes — processing stays on your device in the browser session. Your logo is not uploaded for conversion. Pix-8 Favicon Generator does not install as native desktop software, sync projects to an account, or batch-process folders offline.",
      },
      {
        question: "What can I export from the client-side generator?",
        answer:
          "You can preview favicons at 16×16, 32×32, and 48×48, adjust zoom on a center-square crop, then download multi-size favicon.ico or a 32×32 PNG. It does not generate PWA icon grids, Apple touch icons, or automatically deploy files to your web host.",
      },
    ],
  },
  "no-upload-favicon-creator": {
    id: "no-upload-favicon-creator",
    path: "/no-upload-favicon-creator",
    linkTitle: "No-upload favicon creator",
    linkExcerpt:
      "No-upload favicon creator in your browser — load locally, ICO or PNG export, client-side only.",
    seo: {
      title: "No-Upload Favicon Creator",
      description:
        "No-upload favicon creator in your browser. Load an image from your device, preview 16×16–48×48 tab icons, and export favicon.ico or PNG on-device — no server, no cloud queue. Private client-side Favicon Generator by Pix-8.",
    },
    faq: [
      {
        question: "Does this favicon creator require an upload step?",
        answer:
          "No. Pix-8 Favicon Generator reads your image locally in the browser, renders previews on a client-side canvas, and exports favicon files on-device. Your logo is never transmitted to Pix-8 or any third-party server for conversion or storage.",
      },
      {
        question: "How is no-upload different from drag-and-drop cloud converters?",
        answer:
          "Cloud converters typically send your file to a remote server before generating favicon.ico or PNG outputs. Pix-8 keeps decode, crop, preview, and export inside your browser tab with a zoom slider and tab-size previews. It does not offer hosted project folders, team asset libraries, or email delivery of converted files.",
      },
      {
        question: "What can I create without uploading?",
        answer:
          "From one raster image per session, you can preview 16×16, 32×32, and 48×48 tab icons, then download multi-size favicon.ico or a 32×32 PNG. It does not batch-convert multiple logos, trace SVG artwork, or generate Apple touch icons or PWA manifest packs.",
      },
    ],
  },
  "privacy-first-favicon-tool": {
    id: "privacy-first-favicon-tool",
    path: "/privacy-first-favicon-tool",
    linkTitle: "Privacy-first favicon tool",
    linkExcerpt:
      "Privacy-first favicon tool in your browser — no upload, on-device ICO or PNG, 16–48px preview.",
    seo: {
      title: "Privacy-First Favicon Tool",
      description:
        "Privacy-first favicon tool in your browser. Load a logo locally, preview 16×16–48×48 tab icons, and export favicon.ico or PNG on-device — no upload, no server. Private client-side Favicon Generator by Pix-8.",
    },
    faq: [
      {
        question: "What makes this a privacy-first favicon tool?",
        answer:
          "Pix-8 Favicon Generator processes your image entirely in the browser tab on a client-side canvas. Your logo is read from your device, previewed locally, and exported on-device. It is not uploaded to Pix-8 or a third-party conversion server, and there is no cloud storage step.",
      },
      {
        question: "Who should use a privacy-first favicon workflow?",
        answer:
          "Teams handling unreleased brands, client logos under NDA, or internal mockups often want favicon files without routing assets through a remote converter. Pix-8 fits that need for one raster source per session. It does not provide enterprise SSO, audit logs, or on-premise server deployment.",
      },
      {
        question: "What does the tool export while keeping files local?",
        answer:
          "You can preview 16×16, 32×32, and 48×48 tab icons, adjust zoom on a center-square crop, then download multi-size favicon.ico or a 32×32 PNG. It does not anonymize metadata beyond local processing, scan files on a server, or generate full PWA or Apple touch icon sets.",
      },
    ],
  },
  "browser-based-icon-generator": {
    id: "browser-based-icon-generator",
    path: "/browser-based-icon-generator",
    linkTitle: "Browser-based icon generator",
    linkExcerpt:
      "Browser-based icon generator for tab favicons — load locally, preview 16–48px, export ICO or PNG in-browser.",
    seo: {
      title: "Browser-Based Icon Generator",
      description:
        "Browser-based icon generator for tab favicons. Load an image locally, preview 16×16–48×48 in your browser, and export favicon.ico or PNG on-device — no install, no upload. Client-side Favicon Generator by Pix-8.",
    },
    faq: [
      {
        question: "What does this browser-based icon generator create?",
        answer:
          "Pix-8 Favicon Generator builds browser tab favicons from one raster image per session. You can preview 16×16, 32×32, and 48×48 tab icons, adjust zoom on a center-square crop, then download multi-size favicon.ico or a 32×32 PNG. It is not a general app-icon studio for iOS, Android, or full PWA icon grids.",
      },
      {
        question: "Does it run entirely in the browser?",
        answer:
          "Yes. Decoding, cropping, preview, and export run on a client-side canvas in your browser tab. Your image is read from your device and processed locally — it is not uploaded to Pix-8 or a remote conversion server. There is no desktop installer or plugin required.",
      },
      {
        question: "What browsers can use this workflow?",
        answer:
          "Any modern browser that supports local file input and canvas export can run the tool in a standard tab. Processing stays on-device for that session. Pix-8 does not ship a browser extension, offline desktop app, or automated CI favicon pipeline.",
      },
    ],
  },
  "best-online-tool-to-create-favicon": {
    id: "best-online-tool-to-create-favicon",
    path: "/best-online-tool-to-create-favicon",
    linkTitle: "Best online favicon tool",
    linkExcerpt:
      "Best online tool to create a favicon — load locally, preview 16–48px tab icons, export ICO or PNG client-side.",
    seo: {
      title: "Best Online Tool to Create a Favicon",
      description:
        "Best online tool to create a favicon in your browser. Load a logo locally, preview 16×16–48×48 tab icons, and export favicon.ico or PNG on-device — no upload, no account. Client-side Favicon Generator by Pix-8.",
    },
    faq: [
      {
        question: "What should you look for in an online favicon tool?",
        answer:
          "A practical online favicon workflow should let you preview tab sizes before export, output the formats your site needs, and keep your logo local when privacy matters. Pix-8 Favicon Generator previews 16×16, 32×32, and 48×48, exports multi-size favicon.ico or a 32×32 PNG, and processes everything client-side in the browser — without uploading your image to a server.",
      },
      {
        question: "How is Pix-8 different from typical upload-first converters?",
        answer:
          "Many online favicon tools route your file through a remote server before download. Pix-8 decodes, crops, previews, and exports on a client-side canvas in your browser tab. Your image is read from your device and stays on-device for that session. It does not offer hosted project libraries, team asset sync, or automated PWA icon packs.",
      },
      {
        question: "What can this tool create — and what is outside scope?",
        answer:
          "From one raster image per session, you can adjust zoom on a center-square crop, review tab mockups, then download multi-size favicon.ico or a 32×32 PNG. It does not batch-convert multiple logos, trace SVG artwork, generate Apple touch icons, or publish full multi-platform app-icon grids.",
      },
    ],
  },
  "make-favicon-for-wordpress": {
    id: "make-favicon-for-wordpress",
    path: "/make-favicon-for-wordpress",
    linkTitle: "Make favicon for WordPress",
    linkExcerpt:
      "Make a favicon for WordPress in your browser — load locally, preview 16–48px, export ICO or PNG client-side.",
    seo: {
      title: "Make Favicon for WordPress",
      description:
        "Make a favicon for WordPress in your browser. Load a logo locally, preview 16×16–48×48 tab icons, and export favicon.ico or PNG on-device — no upload to Pix-8. Client-side Favicon Generator by Pix-8.",
    },
    faq: [
      {
        question: "Can Pix-8 install a favicon directly in WordPress?",
        answer:
          "No. Pix-8 Favicon Generator creates favicon files on your device — it does not connect to your WordPress admin, install a plugin, or push files to your server. After export, you upload favicon.ico or PNG through your normal WordPress workflow, such as Appearance → Customize → Site Identity or your theme settings.",
      },
      {
        question: "What should I export for a WordPress site favicon?",
        answer:
          "WordPress Site Identity accepts common image formats including PNG. Favicon Generator exports multi-size favicon.ico (16, 32, and 48 px) or a 32×32 PNG from one local raster source per session, with tab-size previews before download. It does not generate Apple touch icons, Android app icons, or a full PWA manifest pack.",
      },
      {
        question: "Does my logo get uploaded when I make a WordPress favicon?",
        answer:
          "Not to Pix-8. Decoding, cropping, preview, and export run on a client-side canvas in your browser tab. Your image is read from your device and stays on-device for that session. Only you choose when and where to upload the finished file into WordPress.",
      },
    ],
  },
  "professional-favicon-maker-for-business": {
    id: "professional-favicon-maker-for-business",
    path: "/professional-favicon-maker-for-business",
    linkTitle: "Professional business favicon maker",
    linkExcerpt:
      "Professional favicon maker for business — load locally, preview 16–48px tab icons, export ICO or PNG client-side.",
    seo: {
      title: "Professional Favicon Maker for Business",
      description:
        "Professional favicon maker for business in your browser. Load a company logo locally, preview 16×16–48×48 tab icons, and export favicon.ico or PNG on-device — no upload, no account. Client-side Favicon Generator by Pix-8.",
    },
    faq: [
      {
        question: "Is this a full brand-management platform for businesses?",
        answer:
          "No. Pix-8 Favicon Generator is a focused tool for browser-tab favicon files from one raster logo per session. It previews 16×16, 32×32, and 48×48, exports multi-size favicon.ico or a 32×32 PNG, and processes everything client-side in your browser. It does not provide brand guidelines, team asset libraries, SSO, invoicing, or multi-platform app-icon suites.",
      },
      {
        question: "Why use a client-side favicon maker for a business logo?",
        answer:
          "Business marks often should not pass through a third-party upload pipeline before launch. Pix-8 reads your logo from your device, renders tab-size previews on a client-side canvas, and exports on-device — your image is not sent to Pix-8 during preview or download. That fits confidential client work, pre-release sites, and local-only design handoffs.",
      },
      {
        question: "What files can a business site export from this tool?",
        answer:
          "You can adjust zoom on a center-square crop, review tab mockups, then download multi-size favicon.ico (16, 32, and 48 px) or a 32×32 PNG for your company website. It does not batch-produce icons for iOS, Android, social profiles, or email signatures, and it does not edit your site HTML.",
      },
    ],
  },
  "favicon-converter-for-all-browsers": {
    id: "favicon-converter-for-all-browsers",
    path: "/favicon-converter-for-all-browsers",
    linkTitle: "Favicon converter for browsers",
    linkExcerpt:
      "Favicon converter for all browsers — multi-size ICO or PNG, 16–48px preview, client-side, no upload.",
    seo: {
      title: "Favicon Converter for All Browsers",
      description:
        "Favicon converter for all browsers in your browser tab. Load an image locally, preview 16×16–48×48 tab icons, and export multi-size favicon.ico or PNG on-device — no upload. Client-side Favicon Generator by Pix-8.",
    },
    faq: [
      {
        question: "Does this create separate favicon files per browser?",
        answer:
          "No. Pix-8 Favicon Generator exports one multi-size favicon.ico (16, 32, and 48 px embedded) or a 32×32 PNG from one raster source per session. Major browsers select the appropriate size from a standard ICO or PNG reference — Pix-8 does not build browser-specific packages, pinned-tab SVG masks, or legacy Internet Explorer-only formats.",
      },
      {
        question: "Which browsers can display the exported favicon?",
        answer:
          "Modern desktop and mobile browsers that read favicon.ico or PNG in the site head or root generally support these exports — including Chromium, Firefox, Safari, and Edge. Pix-8 previews tab icons at 16×16, 32×32, and 48×48 before download. It does not certify compatibility with every browser version or generate full PWA icon grids.",
      },
      {
        question: "Is conversion handled locally?",
        answer:
          "Yes. Decoding, cropping, preview, and export run on a client-side canvas in your browser tab. Your image is read from your device and processed locally — it is not uploaded to Pix-8 or a remote conversion server during preview or download.",
      },
    ],
  },
};

export function listFaviconGeneratorLandings(): FaviconGeneratorLandingEntry[] {
  return Object.values(FAVICON_GENERATOR_LANDINGS);
}

export function getFaviconGeneratorLandingByPath(
  path: string,
): FaviconGeneratorLandingEntry | undefined {
  return listFaviconGeneratorLandings().find((entry) => entry.path === path);
}

export function getFaviconGeneratorLandingBySlug(
  slug: string,
): FaviconGeneratorLandingEntry | undefined {
  const normalized = slug.replace(/^\/+/, "");
  return listFaviconGeneratorLandings().find(
    (entry) => entry.path === `/${normalized}`,
  );
}
