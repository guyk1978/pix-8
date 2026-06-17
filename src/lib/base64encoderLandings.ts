export const BASE64_ENCODER_TOOL_HREF = "/tools/dev-tools/base64-encoder";

export const BASE64_ENCODER_LANDING_ACCENT = "#5B7FA6";

export const BASE64_ENCODER_ARTICLE = {
  href: "/articles/base64-encoder",
  title: "Optimize Performance: Convert Images to Base64",
  excerpt:
    "Learn how to embed small images directly into your CSS or HTML code by converting them to Base64 for faster load times.",
} as const;

/** What Base64 Encoder actually supports — use for intent-accurate copy. */
export const BASE64_ENCODER_CAPABILITIES = [
  "Load image files locally from your device",
  "Generate Base64 strings with optional data URL prefix",
  "Copy output ready for CSS, HTML, or email templates",
  "Character and byte size readout for the encoded output",
  "On-device processing — images never uploaded to a server",
] as const;

/**
 * Add new Base64 Encoder SEO landing IDs here as union members.
 * Landing pages belong in this registry — not imageAnnotatorLandings,
 * converter landings, or other tool families.
 */
export type Base64EncoderLandingId =
  | "base64-encoder-online"
  | "base64-decoder-online"
  | "convert-text-to-base64"
  | "decode-base64-to-text"
  | "base64-encode-image"
  | "base64-file-encoder"
  | "online-base64-tool-for-developers"
  | "instant-base64-conversion"
  | "client-side-base64-encoder"
  | "secure-base64-decoder"
  | "no-upload-base64-tool"
  | "private-base64-converter"
  | "base64-string-to-image-converter"
  | "batch-base64-encoder"
  | "human-readable-to-base64-converter"
  | "base64-url-safe-encoder";

export interface Base64EncoderLandingEntry {
  id: Base64EncoderLandingId;
  path: string;
  linkTitle: string;
  linkExcerpt: string;
  seo: {
    title: string;
    description: string;
  };
  faq: readonly { question: string; answer: string }[];
}

export const BASE64_ENCODER_LANDINGS: Record<
  Base64EncoderLandingId,
  Base64EncoderLandingEntry
> = {
  "base64-encoder-online": {
    id: "base64-encoder-online",
    path: "/base64-encoder-online",
    linkTitle: "Base64 encoder online",
    linkExcerpt:
      "Base64 encoder online in your browser — convert images on-device, no upload.",
    seo: {
      title: "Base64 Encoder Online",
      description:
        "Base64 encoder online in your browser. Convert images to Base64 data URLs on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Does this Base64 encoder online upload my images to a server?",
        answer:
          "No. Pix-8 Base64 Encoder runs entirely in your browser. Your image file is read locally via the FileReader API, encoded on-device, and displayed as a copy-ready string. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "Can I copy a full data URL with the image prefix?",
        answer:
          "Yes. Base64 Encoder includes an optional data URL prefix toggle — output as data:image/…;base64,… for inline CSS or HTML, or copy the raw Base64 string only. Use one-click copy when the output is ready.",
      },
      {
        question: "What can I encode with this online Base64 tool?",
        answer:
          "Base64 Encoder converts image files from your device into Base64 strings — typically PNG, JPEG, WebP, or GIF loaded as a browser-readable data URL. It shows character and byte size for the encoded output. It does not batch-encode folders, encode plain text, or convert video files.",
      },
    ],
  },
  "base64-decoder-online": {
    id: "base64-decoder-online",
    path: "/base64-decoder-online",
    linkTitle: "Base64 decoder online",
    linkExcerpt:
      "Base64 for images online — encode files to strings on-device, no upload.",
    seo: {
      title: "Base64 Decoder Online",
      description:
        "Base64 for images online in your browser. Pix-8 encodes image files to Base64 data URLs on-device — not a string-to-image decoder. No upload, no server. Client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Is this a Base64 decoder that turns strings back into images?",
        answer:
          "No. Pix-8 Base64 Encoder converts image files into Base64 strings in your browser — it does not accept pasted Base64 input and decode it back into a downloadable image file. If you need a Base64 string from a local image for CSS, HTML, or email, this tool encodes on-device without uploading to a server.",
      },
      {
        question: "Does this Base64 tool upload my files to a server?",
        answer:
          "No. Pix-8 Base64 Encoder runs entirely in your browser. Your image file is read locally via the FileReader API, encoded on-device, and shown as a copy-ready string. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What output can I copy from this online Base64 tool?",
        answer:
          "Base64 Encoder produces a Base64 string from a local image file — with an optional data:image/…;base64, prefix for inline CSS or HTML. Character and byte size are shown before you copy. It does not decode existing Base64 text, batch-process folders, or encode plain text.",
      },
    ],
  },
  "convert-text-to-base64": {
    id: "convert-text-to-base64",
    path: "/convert-text-to-base64",
    linkTitle: "Text to Base64",
    linkExcerpt:
      "Convert images to Base64 on-device — not plain-text encoding.",
    seo: {
      title: "Convert Text to Base64",
      description:
        "Looking to convert text to Base64? Pix-8 encodes image files to Base64 data URLs on-device — not plain-text input. No upload, no server. Client-side image encoder by Pix-8.",
    },
    faq: [
      {
        question: "Can I convert plain text to Base64 with this tool?",
        answer:
          "No. Pix-8 Base64 Encoder converts image files from your device into Base64 strings — it does not accept typed or pasted plain text and encode it to Base64. If you need a Base64 string from a local PNG, JPEG, WebP, or GIF for CSS or HTML, load the image file and copy the encoded output on-device.",
      },
      {
        question: "Does converting to Base64 upload my files to a server?",
        answer:
          "No. Pix-8 Base64 Encoder runs entirely in your browser. Your image file is read locally via the FileReader API, encoded on-device, and displayed as a copy-ready string. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What can I convert to Base64 with Pix-8?",
        answer:
          "Base64 Encoder converts local image files into Base64 strings with an optional data:image/…;base64, prefix. Character and byte size are shown before you copy. It does not encode plain text, batch-process folders, decode Base64 back to images, or convert video files.",
      },
    ],
  },
  "decode-base64-to-text": {
    id: "decode-base64-to-text",
    path: "/decode-base64-to-text",
    linkTitle: "Base64 to text",
    linkExcerpt:
      "Encode images to Base64 on-device — not Base64-to-text decoding.",
    seo: {
      title: "Decode Base64 to Text",
      description:
        "Looking to decode Base64 to text? Pix-8 encodes image files to Base64 data URLs on-device — it does not decode pasted Base64 strings. No upload, no server. Client-side image encoder by Pix-8.",
    },
    faq: [
      {
        question: "Can I decode Base64 to text with this tool?",
        answer:
          "No. Pix-8 Base64 Encoder converts image files into Base64 strings in your browser — it does not accept pasted Base64 input and decode it back into plain text or a downloadable image. If you need a Base64 string from a local image for CSS, HTML, or email, load the image file and copy the encoded output on-device.",
      },
      {
        question: "Does decoding or encoding Base64 upload my data to a server?",
        answer:
          "No. Pix-8 Base64 Encoder runs entirely in your browser. Your image file is read locally via the FileReader API, encoded on-device, and displayed as a copy-ready string. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What does Pix-8 Base64 Encoder actually do?",
        answer:
          "Base64 Encoder converts local image files into Base64 strings with an optional data:image/…;base64, prefix. Character and byte size are shown before you copy. It does not decode Base64 to text, decode Base64 to images, encode plain text, or batch-process folders.",
      },
    ],
  },
  "base64-encode-image": {
    id: "base64-encode-image",
    path: "/base64-encode-image",
    linkTitle: "Base64 encode image",
    linkExcerpt:
      "Base64 encode image files in your browser — on-device, no upload.",
    seo: {
      title: "Base64 Encode Image",
      description:
        "Base64 encode image files in your browser. Convert PNG, JPEG, WebP, or GIF to data URLs on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I Base64 encode an image without uploading it to a server?",
        answer:
          "Yes. Pix-8 Base64 Encoder runs entirely in your browser. Your image file is read locally via the FileReader API, encoded on-device, and displayed as a copy-ready string. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What image formats can I Base64 encode?",
        answer:
          "Base64 Encoder accepts image files from your device — typically PNG, JPEG, WebP, or GIF. The browser reads the file and outputs a Base64 string with an optional data:image/…;base64, prefix. It does not batch-encode folders, encode plain text, decode Base64 back to images, or convert video files.",
      },
      {
        question: "Can I copy a data URL ready for CSS or HTML?",
        answer:
          "Yes. Toggle the optional data URL prefix to output data:image/…;base64,… for inline CSS background-image or HTML img src attributes. Character and byte size are shown before you copy. One-click copy when the output is ready.",
      },
    ],
  },
  "base64-file-encoder": {
    id: "base64-file-encoder",
    path: "/base64-file-encoder",
    linkTitle: "Base64 file encoder",
    linkExcerpt:
      "Base64 encode image files on-device — not PDF, ZIP, or generic files.",
    seo: {
      title: "Base64 File Encoder",
      description:
        "Base64 file encoder for image files in your browser. Convert PNG, JPEG, WebP, or GIF to data URLs on-device — not PDF or ZIP. No upload, no server. Client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can this Base64 file encoder encode any file type?",
        answer:
          "No. Pix-8 Base64 Encoder converts image files from your device into Base64 strings — typically PNG, JPEG, WebP, or GIF. It does not encode PDF documents, ZIP archives, plain text files, video files, or batch-process entire folders.",
      },
      {
        question: "Does this Base64 file encoder upload my files to a server?",
        answer:
          "No. Pix-8 Base64 Encoder runs entirely in your browser. Your image file is read locally via the FileReader API, encoded on-device, and displayed as a copy-ready string. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What output does the file encoder produce?",
        answer:
          "Base64 Encoder outputs a Base64 string from a local image file — with an optional data:image/…;base64, prefix for inline CSS or HTML. Character and byte size are shown before you copy. One-click copy when the output is ready.",
      },
    ],
  },
  "online-base64-tool-for-developers": {
    id: "online-base64-tool-for-developers",
    path: "/online-base64-tool-for-developers",
    linkTitle: "Base64 for developers",
    linkExcerpt:
      "Online Base64 tool for developers — encode images on-device, no upload.",
    seo: {
      title: "Online Base64 Tool for Developers",
      description:
        "Online Base64 tool for developers in your browser. Encode image files to data URLs on-device for CSS and HTML — no upload, no API, no server. Client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Is this Base64 tool suitable for embedding assets in CSS or HTML?",
        answer:
          "Yes. Pix-8 Base64 Encoder converts local image files into Base64 strings with an optional data:image/…;base64, prefix — formatted for inline background-image in CSS or img src in HTML. Character and byte size are shown before you copy. It does not provide a REST API, CLI, or batch folder encoding.",
      },
      {
        question: "Does this developer Base64 tool upload files to a server?",
        answer:
          "No. Pix-8 Base64 Encoder runs entirely in your browser. Your image file is read locally via the FileReader API, encoded on-device, and displayed as a copy-ready string. It is never transmitted to Pix-8 or any third-party server — suitable for client assets and local prototypes without cloud upload.",
      },
      {
        question: "What are the limits of this online Base64 tool for developers?",
        answer:
          "Base64 Encoder handles one image file per session — typically PNG, JPEG, WebP, or GIF. It outputs a copy-ready Base64 string with optional data URL prefix. It does not decode Base64, encode plain text, batch-process folders, resize images before encoding, or integrate with build pipelines automatically.",
      },
    ],
  },
  "instant-base64-conversion": {
    id: "instant-base64-conversion",
    path: "/instant-base64-conversion",
    linkTitle: "Instant Base64 conversion",
    linkExcerpt:
      "Instant Base64 conversion in your browser — image files, on-device, no upload.",
    seo: {
      title: "Instant Base64 Conversion",
      description:
        "Instant Base64 conversion in your browser. Encode image files to data URLs on-device — no upload queue, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "How is Base64 conversion instant with Pix-8?",
        answer:
          "Pix-8 Base64 Encoder reads your image file locally via the FileReader API and encodes it in the browser tab — there is no server upload step or cloud processing queue. For typical icons and small graphics, the string appears as soon as the file is read on-device. Large files may take longer depending on your device, but nothing is sent to a remote server.",
      },
      {
        question: "Does instant Base64 conversion upload my image to a server?",
        answer:
          "No. Pix-8 Base64 Encoder runs entirely in your browser. Your image file is read locally, encoded on-device, and displayed as a copy-ready string. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What can I convert instantly with this tool?",
        answer:
          "Base64 Encoder converts one image file per session — typically PNG, JPEG, WebP, or GIF — into a Base64 string with an optional data:image/…;base64, prefix. Character and byte size are shown before you copy. It does not batch-convert folders, encode plain text, decode Base64, or convert video files.",
      },
    ],
  },
  "client-side-base64-encoder": {
    id: "client-side-base64-encoder",
    path: "/client-side-base64-encoder",
    linkTitle: "Client-side Base64 encoder",
    linkExcerpt:
      "Client-side Base64 encoder in your browser — image files, no upload.",
    seo: {
      title: "Client-Side Base64 Encoder",
      description:
        "Client-side Base64 encoder in your browser. Encode image files to data URLs on-device via FileReader — no upload, no server. Private tool by Pix-8.",
    },
    faq: [
      {
        question: "What does client-side mean for this Base64 encoder?",
        answer:
          "Client-side means Pix-8 Base64 Encoder reads your image file and produces a Base64 string entirely in your browser tab — via the FileReader API on your device. Encoding and copy run locally. Your pixel data is not transmitted to Pix-8 or any third-party server during use.",
      },
      {
        question: "Does a client-side Base64 encoder upload my images?",
        answer:
          "No. Pix-8 Base64 Encoder runs entirely in your browser. Your image file is read locally, encoded on-device, and displayed as a copy-ready string. There is no server upload step, and Pix-8 does not receive your image data.",
      },
      {
        question: "What can this client-side encoder convert to Base64?",
        answer:
          "Base64 Encoder converts one image file per session — typically PNG, JPEG, WebP, or GIF — into a Base64 string with an optional data:image/…;base64, prefix. Character and byte size are shown before you copy. It does not batch-encode folders, encode plain text, decode Base64 back to images, or convert video files.",
      },
    ],
  },
  "secure-base64-decoder": {
    id: "secure-base64-decoder",
    path: "/secure-base64-decoder",
    linkTitle: "Secure Base64 decoder",
    linkExcerpt:
      "Secure Base64 for images — encode on-device, no server upload.",
    seo: {
      title: "Secure Base64 Decoder",
      description:
        "Looking for a secure Base64 decoder? Pix-8 encodes image files to Base64 on-device — no upload, no server. Private client-side image encoder by Pix-8.",
    },
    faq: [
      {
        question: "Is this a secure Base64 decoder that decodes strings to files?",
        answer:
          "No. Pix-8 Base64 Encoder converts image files into Base64 strings in your browser — it does not accept pasted Base64 input and decode it back into plain text or a downloadable image. Security here means your image file is read and encoded on-device via FileReader — never uploaded to Pix-8 or any third-party server.",
      },
      {
        question: "Why is client-side encoding more secure than cloud Base64 tools?",
        answer:
          "Cloud Base64 services typically require uploading your file before processing. Pix-8 Base64 Encoder keeps encoding in your browser tab — your pixel data is not transmitted to a remote server during encoding or copy. Suitable for sensitive icons, client proofs, and local assets you do not want routed through a third-party encoder.",
      },
      {
        question: "What can I securely convert with this tool?",
        answer:
          "Base64 Encoder converts one image file per session — typically PNG, JPEG, WebP, or GIF — into a Base64 string with an optional data:image/…;base64, prefix. Character and byte size are shown before you copy. It does not decode Base64, encode plain text, batch-process folders, or convert video files.",
      },
    ],
  },
  "no-upload-base64-tool": {
    id: "no-upload-base64-tool",
    path: "/no-upload-base64-tool",
    linkTitle: "No-upload Base64 tool",
    linkExcerpt:
      "No-upload Base64 tool — encode images on-device, never sent to a server.",
    seo: {
      title: "No-Upload Base64 Tool",
      description:
        "No-upload Base64 tool for images in your browser. Encode PNG, JPEG, WebP, or GIF to Base64 on-device — no server, no account. Private client-side encoder by Pix-8.",
    },
    faq: [
      {
        question: "Does this no-upload Base64 tool send my files to a server?",
        answer:
          "No. Pix-8 Base64 Encoder runs entirely in your browser. Your image file is read locally via the FileReader API, encoded on-device, and displayed as a copy-ready string. There is no upload step — Pix-8 never receives your pixel data.",
      },
      {
        question: "What does a no-upload Base64 tool actually do?",
        answer:
          "Pix-8 Base64 Encoder converts image files from your device into Base64 strings — typically PNG, JPEG, WebP, or GIF — with an optional data:image/…;base64, prefix. Character and byte size are shown before you copy. It does not decode Base64, encode plain text, batch-process folders, or convert video files.",
      },
      {
        question: "Why choose a no-upload Base64 tool over cloud converters?",
        answer:
          "Cloud Base64 tools usually require uploading your file before encoding. Pix-8 keeps the workflow local — your image is read and converted in the browser tab, so sensitive icons, client proofs, and local assets are not routed through a remote encoder.",
      },
    ],
  },
  "private-base64-converter": {
    id: "private-base64-converter",
    path: "/private-base64-converter",
    linkTitle: "Private Base64 converter",
    linkExcerpt:
      "Private Base64 converter — encode images on-device, no server upload.",
    seo: {
      title: "Private Base64 Converter",
      description:
        "Private Base64 converter for images in your browser. Encode PNG, JPEG, WebP, or GIF on-device — no upload, no account. Client-side image encoder by Pix-8.",
    },
    faq: [
      {
        question: "What makes this a private Base64 converter?",
        answer:
          "Pix-8 Base64 Encoder runs entirely in your browser. Your image file is read locally via the FileReader API, encoded on-device, and displayed as a copy-ready string. Your pixel data is not transmitted to Pix-8 or any third-party server — there is no cloud upload step.",
      },
      {
        question: "Does a private Base64 converter decode strings back to files?",
        answer:
          "No. Pix-8 Base64 Encoder converts image files from your device into Base64 strings — typically PNG, JPEG, WebP, or GIF — with an optional data:image/…;base64, prefix. It does not accept pasted Base64 input and decode it back into plain text or a downloadable image.",
      },
      {
        question: "What can I convert with this private Base64 tool?",
        answer:
          "Base64 Encoder converts one image file per session into a Base64 string. Character and byte size are shown before you copy. It does not batch-process folders, encode plain text, decode Base64, or convert video files.",
      },
    ],
  },
  "base64-string-to-image-converter": {
    id: "base64-string-to-image-converter",
    path: "/base64-string-to-image-converter",
    linkTitle: "Base64 string to image",
    linkExcerpt:
      "Encode images to Base64 on-device — not Base64 string to image decoding.",
    seo: {
      title: "Base64 String to Image Converter",
      description:
        "Looking for a Base64 string to image converter? Pix-8 encodes image files to Base64 data URLs on-device — it does not decode pasted Base64 strings to images. No upload, no server. Client-side encoder by Pix-8.",
    },
    faq: [
      {
        question: "Can I convert a Base64 string to an image with this tool?",
        answer:
          "No. Pix-8 Base64 Encoder converts image files into Base64 strings in your browser — it does not accept pasted Base64 input and decode it back into a downloadable image or preview file. If you need a Base64 string from a local image for CSS, HTML, or email, load the image file and copy the encoded output on-device.",
      },
      {
        question: "Does converting Base64 to image upload my data to a server?",
        answer:
          "No. Pix-8 Base64 Encoder runs entirely in your browser. Your image file is read locally via the FileReader API, encoded on-device, and displayed as a copy-ready string. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What does Pix-8 Base64 Encoder actually do?",
        answer:
          "Base64 Encoder converts local image files into Base64 strings with an optional data:image/…;base64, prefix. Character and byte size are shown before you copy. It does not decode Base64 strings to images, decode Base64 to text, encode plain text, or batch-process folders.",
      },
    ],
  },
  "batch-base64-encoder": {
    id: "batch-base64-encoder",
    path: "/batch-base64-encoder",
    linkTitle: "Batch Base64 encoder",
    linkExcerpt:
      "Encode images to Base64 on-device — one file per session, not batch folders.",
    seo: {
      title: "Batch Base64 Encoder",
      description:
        "Looking for a batch Base64 encoder? Pix-8 encodes image files to Base64 on-device — one file per session, not folder batching. No upload, no server. Client-side image encoder by Pix-8.",
    },
    faq: [
      {
        question: "Can this batch Base64 encoder process an entire folder at once?",
        answer:
          "No. Pix-8 Base64 Encoder converts one image file per session into a Base64 string — typically PNG, JPEG, WebP, or GIF. It does not batch-encode folders, zip archives, or multiple files in a single run. Load each image locally, copy the encoded output, then repeat for the next file — all on-device in your browser.",
      },
      {
        question: "Does batch Base64 encoding upload my files to a server?",
        answer:
          "No. Pix-8 Base64 Encoder runs entirely in your browser. Your image file is read locally via the FileReader API, encoded on-device, and displayed as a copy-ready string. It is never transmitted to Pix-8 or any third-party server — whether you encode one file or work through several images one at a time.",
      },
      {
        question: "What can I encode with this Base64 tool?",
        answer:
          "Base64 Encoder converts local image files into Base64 strings with an optional data:image/…;base64, prefix. Character and byte size are shown before you copy. It does not batch-process folders, encode plain text, decode Base64 back to images, or convert video files.",
      },
    ],
  },
  "human-readable-to-base64-converter": {
    id: "human-readable-to-base64-converter",
    path: "/human-readable-to-base64-converter",
    linkTitle: "Human-readable to Base64",
    linkExcerpt:
      "Encode images to Base64 on-device — not human-readable text input.",
    seo: {
      title: "Human-Readable to Base64 Converter",
      description:
        "Looking for a human-readable to Base64 converter? Pix-8 encodes image files to Base64 data URLs on-device — not typed or pasted plain text. No upload, no server. Client-side image encoder by Pix-8.",
    },
    faq: [
      {
        question: "Can I convert human-readable text to Base64 with this tool?",
        answer:
          "No. Pix-8 Base64 Encoder converts image files from your device into Base64 strings — it does not accept typed, pasted, or human-readable plain text and encode it to Base64. If you need a Base64 string from a local PNG, JPEG, WebP, or GIF for CSS or HTML, load the image file and copy the encoded output on-device.",
      },
      {
        question: "Does converting human-readable content to Base64 upload data to a server?",
        answer:
          "No. Pix-8 Base64 Encoder runs entirely in your browser. Your image file is read locally via the FileReader API, encoded on-device, and displayed as a copy-ready string. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What can this human-readable to Base64 converter actually encode?",
        answer:
          "Base64 Encoder converts local image files into Base64 strings with an optional data:image/…;base64, prefix. Character and byte size are shown before you copy. It does not encode human-readable text, batch-process folders, decode Base64 back to images, or convert video files.",
      },
    ],
  },
  "base64-url-safe-encoder": {
    id: "base64-url-safe-encoder",
    path: "/base64-url-safe-encoder",
    linkTitle: "URL-safe Base64 encoder",
    linkExcerpt:
      "Standard Base64 for images on-device — not Base64url (-/_) output.",
    seo: {
      title: "Base64 URL-Safe Encoder",
      description:
        "Looking for a Base64 URL-safe encoder? Pix-8 outputs standard Base64 from image files on-device — not Base64url with - and _. No upload, no server. Client-side image encoder by Pix-8.",
    },
    faq: [
      {
        question: "Does this Base64 URL-safe encoder output Base64url (- and _)?",
        answer:
          "No. Pix-8 Base64 Encoder produces standard Base64 strings from image files via the browser FileReader API — the typical + and / alphabet, not the Base64url variant that replaces them with - and _. Load a local PNG, JPEG, WebP, or GIF, copy the encoded string with an optional data:image/…;base64, prefix, and embed in CSS or HTML on-device.",
      },
      {
        question: "Does encoding Base64 upload my image to a server?",
        answer:
          "No. Pix-8 Base64 Encoder runs entirely in your browser. Your image file is read locally, encoded on-device, and displayed as a copy-ready string. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What output does this Base64 encoder produce?",
        answer:
          "Base64 Encoder converts one image file per session into a standard Base64 string with an optional data URL prefix. Character and byte size are shown before you copy. It does not output Base64url, encode plain text, batch-process folders, decode Base64, or convert video files.",
      },
    ],
  },
};

export function listBase64EncoderLandings(): Base64EncoderLandingEntry[] {
  return Object.values(BASE64_ENCODER_LANDINGS);
}

export function getBase64EncoderLandingByPath(
  path: string,
): Base64EncoderLandingEntry | undefined {
  return listBase64EncoderLandings().find((entry) => entry.path === path);
}

export function getBase64EncoderLandingBySlug(
  slug: string,
): Base64EncoderLandingEntry | undefined {
  const normalized = slug.replace(/^\/+/, "");
  return listBase64EncoderLandings().find(
    (entry) => entry.path === `/${normalized}`,
  );
}
