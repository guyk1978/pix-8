import type {
  Base64EncoderLandingChrome,
  Base64EncoderLandingDisplayFields,
} from "@/lib/base64encoderLandingTypes";
import type { Base64EncoderLandingId } from "@/lib/base64encoderLandings";

export const BASE64_ENCODER_LANDING_CHROME_EN: Base64EncoderLandingChrome = {
  privacyNote:
    "Client-side processing only — your image never leaves the browser.",
  relatedUseCasesHeading: "Related use cases",
  guidesHeading: "Guides",
  toolCardTitle: "Base64 Encoder tool",
  toolCardExcerpt:
    "Open the workspace — convert images to Base64 strings locally in seconds.",
};

export const BASE64_ENCODER_LANDING_DISPLAY_EN: Record<
  Base64EncoderLandingId,
  Omit<Base64EncoderLandingDisplayFields, "capabilities">
> = {
  "base64-encoder-online": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Base64 encoder online",
    titleAccent: "image-to-string in the browser",
    heroSubtitle:
      "Use a Base64 encoder online in your browser — no upload, no account, no cloud queue. Load an image locally, generate a Base64 string with an optional data URL prefix, and copy output ready for CSS, HTML, or email — all encoded on-device without sending your file to a server.",
    primaryCta: "Encode images — Free",
    ctaNote: "No upload · No server · Copy-ready output",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "On-device encoding — not a cloud converter",
      body: "Pix-8 Base64 Encoder reads your image file locally and produces a Base64 string in the browser — not a remote service that ingests files first. Toggle the data URL prefix, review character and byte size, then copy the output in one step. It does not batch-encode folders, resize images, or compress files before encoding.",
    },
    benefitsHeading: "Why use a Base64 encoder online in the browser?",
    benefitsIntro:
      "Cloud encoders route every file through a remote server before you can copy a string. Pix-8 processes locally — the practical fit when you need a ",
    benefitsKeyword: "Base64 encoder online",
    benefitsIntroAfter:
      " for icons, logos, and small assets without moving source files off-device.",
    benefits: [
      {
        title: "Client-side by default",
        body: "Your image is read from your device and encoded in the browser tab. Pix-8 never receives your pixel data during encoding or copy.",
      },
      {
        title: "Copy-ready output",
        body: "Generate a Base64 string with an optional data:image/…;base64, prefix — formatted for inline CSS, HTML img src, or email templates.",
      },
      {
        title: "Size before you paste",
        body: "Character and byte readout helps you judge whether the encoded string fits your use case before embedding it in production code.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Base64 Encoder",
        body: "Navigate to Pix-8 Base64 Encoder in your browser — no install, no account, and no upload dialog before you encode.",
      },
      {
        title: "Load and encode locally",
        body: "Choose an image from your device. The file is read on-device and converted to a Base64 string with an optional data URL prefix.",
      },
      {
        title: "Copy the output",
        body: "Review character and byte size, then copy the encoded string to your clipboard — ready for CSS, HTML, or email.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to encode images without uploading?",
      body: "Open Base64 Encoder, load a local file, and copy your string — privately, entirely on-device.",
      button: "Open Base64 Encoder",
    },
  },
  "base64-decoder-online": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Base64 decoder online",
    titleAccent: "image encoding in the browser",
    heroSubtitle:
      "Searching for a Base64 decoder online? Pix-8 encodes image files to Base64 strings in your browser — no upload, no account, no cloud queue. Load a local image, generate a copy-ready Base64 string with an optional data URL prefix, and embed it in CSS or HTML — all processed on-device. This tool does not decode pasted Base64 back into image files.",
    primaryCta: "Encode images — Free",
    ctaNote: "No upload · No server · Image-to-Base64",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Image-to-Base64 — not string-to-image decoding",
      body: "Pix-8 Base64 Encoder reads a local image file and outputs a Base64 string in the browser — not a decoder that ingests pasted Base64 and exports a decoded image. Toggle the data URL prefix, review character and byte size, then copy in one step. It does not accept Base64 text input, batch-decode folders, or reconstruct images from clipboard strings.",
    },
    benefitsHeading: "Why use Base64 for images online in the browser?",
    benefitsIntro:
      "Cloud Base64 tools often upload files before encoding or decoding. Pix-8 keeps image-to-Base64 conversion local — the practical fit when you need ",
    benefitsKeyword: "Base64 for images online",
    benefitsIntroAfter:
      " without routing source files through a remote server.",
    benefits: [
      {
        title: "Honest image-to-Base64 flow",
        body: "Load an image file from your device and get a Base64 string — the encoding direction developers need for inline assets. Pix-8 does not decode pasted Base64 back into downloadable images.",
      },
      {
        title: "Client-side by default",
        body: "Your image is read and encoded in the browser tab. Pix-8 never receives your pixel data during encoding or copy.",
      },
      {
        title: "Copy-ready output",
        body: "Optional data:image/…;base64, prefix, character and byte readout, and one-click copy — formatted for CSS, HTML, or email templates.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Base64 Encoder",
        body: "Navigate to Pix-8 Base64 Encoder in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Load an image locally",
        body: "Choose an image file from your device. The browser reads it on-device and converts it to a Base64 string with an optional data URL prefix.",
      },
      {
        title: "Copy the encoded string",
        body: "Review character and byte size, then copy the output — ready to embed in CSS, HTML, or email. Not a decode-to-image export.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Need a Base64 string from an image?",
      body: "Open Base64 Encoder, load a local file, and copy your string — privately, entirely on-device.",
      button: "Open Base64 Encoder",
    },
  },
  "convert-text-to-base64": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Convert text to Base64",
    titleAccent: "image files, not plain text",
    heroSubtitle:
      "Searching to convert text to Base64? Pix-8 Base64 Encoder converts image files to Base64 strings in your browser — no upload, no account, no cloud queue. Load a local image, generate a copy-ready string with an optional data URL prefix, and embed it in CSS or HTML — all on-device. This tool does not accept typed or pasted plain text for Base64 encoding.",
    primaryCta: "Encode images — Free",
    ctaNote: "No upload · No server · Image files only",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Image-to-Base64 — not a plain-text encoder",
      body: "Pix-8 Base64 Encoder reads a local image file and outputs a Base64 string in the browser — not a text box that converts strings or paragraphs to Base64. Toggle the data URL prefix, review character and byte size, then copy in one step. It does not encode plain text, batch-process folders, or decode Base64 back to images.",
    },
    benefitsHeading: "Why use image-to-Base64 in the browser?",
    benefitsIntro:
      "Generic Base64 converters often upload files or mix text and image workflows in one cloud form. Pix-8 keeps image encoding local — the practical fit when you need to ",
    benefitsKeyword: "convert assets to Base64",
    benefitsIntroAfter:
      " for inline CSS or HTML without routing image files through a remote server.",
    benefits: [
      {
        title: "Clear scope: image files",
        body: "Load a PNG, JPEG, WebP, or GIF from your device and get a Base64 string — the workflow for embedding icons and small graphics. Pix-8 does not encode plain text input.",
      },
      {
        title: "Client-side by default",
        body: "Your image is read and encoded in the browser tab. Pix-8 never receives your pixel data during encoding or copy.",
      },
      {
        title: "Copy-ready output",
        body: "Optional data:image/…;base64, prefix, character and byte readout, and one-click copy — formatted for CSS, HTML, or email templates.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Base64 Encoder",
        body: "Navigate to Pix-8 Base64 Encoder in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Load an image file",
        body: "Choose an image from your device — not a text field. The browser reads the file on-device and converts it to a Base64 string.",
      },
      {
        title: "Copy the encoded string",
        body: "Review character and byte size, then copy the output for CSS, HTML, or email. Plain-text Base64 encoding is not supported.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Need Base64 from an image file?",
      body: "Open Base64 Encoder, load a local image, and copy your string — privately, entirely on-device.",
      button: "Open Base64 Encoder",
    },
  },
  "decode-base64-to-text": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Decode Base64 to text",
    titleAccent: "image encoding, not decoding",
    heroSubtitle:
      "Searching to decode Base64 to text? Pix-8 Base64 Encoder converts image files to Base64 strings in your browser — no upload, no account, no cloud queue. Load a local image, generate a copy-ready string with an optional data URL prefix, and embed it in CSS or HTML — all on-device. This tool does not accept pasted Base64 and decode it back into plain text or image files.",
    primaryCta: "Encode images — Free",
    ctaNote: "No upload · No server · Image-to-Base64",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Image-to-Base64 — not Base64-to-text decoding",
      body: "Pix-8 Base64 Encoder reads a local image file and outputs a Base64 string in the browser — not a decoder that ingests pasted Base64 and reveals plain text or exports a decoded file. Toggle the data URL prefix, review character and byte size, then copy in one step. It does not decode Base64 input, encode plain text, or batch-process folders.",
    },
    benefitsHeading: "Why use image-to-Base64 in the browser?",
    benefitsIntro:
      "Cloud Base64 decoders often upload strings before processing. Pix-8 keeps image encoding local — the practical fit when you need to ",
    benefitsKeyword: "work with Base64 for images",
    benefitsIntroAfter:
      " without sending source files or encoded strings through a remote server.",
    benefits: [
      {
        title: "Honest encoding scope",
        body: "Load an image file and get a Base64 string — the forward direction for inline assets. Pix-8 does not decode pasted Base64 back into text or downloadable images.",
      },
      {
        title: "Client-side by default",
        body: "Your image is read and encoded in the browser tab. Pix-8 never receives your pixel data or pasted Base64 strings during use.",
      },
      {
        title: "Copy-ready output",
        body: "Optional data:image/…;base64, prefix, character and byte readout, and one-click copy — formatted for CSS, HTML, or email templates.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Base64 Encoder",
        body: "Navigate to Pix-8 Base64 Encoder in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Load an image file",
        body: "Choose an image from your device. The browser encodes it on-device to a Base64 string — not a paste field for decoding existing Base64.",
      },
      {
        title: "Copy the encoded string",
        body: "Review character and byte size, then copy the output for CSS, HTML, or email. Base64-to-text decoding is not supported.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Need a Base64 string from an image?",
      body: "Open Base64 Encoder, load a local file, and copy your string — privately, entirely on-device.",
      button: "Open Base64 Encoder",
    },
  },
  "base64-encode-image": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Base64 encode image",
    titleAccent: "data URLs in the browser",
    heroSubtitle:
      "Base64 encode image files in your browser — no upload, no account, no cloud queue. Load a local PNG, JPEG, WebP, or GIF, generate a copy-ready Base64 string with an optional data URL prefix, and embed it in CSS or HTML — all encoded on-device without sending your file to a server.",
    primaryCta: "Encode images — Free",
    ctaNote: "No upload · No server · Copy-ready output",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Image file to Base64 string — on-device",
      body: "Pix-8 Base64 Encoder reads your image file locally and produces a Base64 string in the browser — not a remote converter that ingests uploads first. Toggle the data URL prefix, review character and byte size, then copy in one step. It does not batch-encode folders, resize images before encoding, or decode Base64 back to files.",
    },
    benefitsHeading: "Why Base64 encode images in the browser?",
    benefitsIntro:
      "Cloud converters route every image through a remote server before you can copy a string. Pix-8 processes locally — the direct fit when you need to ",
    benefitsKeyword: "Base64 encode image",
    benefitsIntroAfter:
      " files for inline CSS, HTML img src, or email templates without moving assets off-device.",
    benefits: [
      {
        title: "Client-side by default",
        body: "Your image is read from your device and encoded in the browser tab. Pix-8 never receives your pixel data during encoding or copy.",
      },
      {
        title: "Data URL ready",
        body: "Optional data:image/…;base64, prefix outputs a string formatted for inline CSS background-image or HTML img src — or copy raw Base64 only.",
      },
      {
        title: "Size before you paste",
        body: "Character and byte readout helps you judge whether the encoded string fits your use case before embedding icons or small graphics in production code.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Base64 Encoder",
        body: "Navigate to Pix-8 Base64 Encoder in your browser — no install, no account, and no upload dialog before you encode.",
      },
      {
        title: "Load your image file",
        body: "Choose a PNG, JPEG, WebP, or GIF from your device. The browser reads the file on-device and converts it to a Base64 string.",
      },
      {
        title: "Copy the encoded output",
        body: "Review character and byte size, toggle the data URL prefix if needed, then copy the string — ready for CSS, HTML, or email.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to Base64 encode an image?",
      body: "Open Base64 Encoder, load a local file, and copy your string — privately, entirely on-device.",
      button: "Open Base64 Encoder",
    },
  },
  "base64-file-encoder": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Base64 file encoder",
    titleAccent: "image files in the browser",
    heroSubtitle:
      "Use a Base64 file encoder in your browser — no upload, no account, no cloud queue. Load a local image file (PNG, JPEG, WebP, or GIF), generate a copy-ready Base64 string with an optional data URL prefix, and embed it in CSS or HTML — all encoded on-device. This tool encodes image files only — not PDF, ZIP, plain text, or video.",
    primaryCta: "Encode image files — Free",
    ctaNote: "No upload · No server · Image files only",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Image file encoder — not a generic file converter",
      body: "Pix-8 Base64 Encoder reads a local image file and outputs a Base64 string in the browser — not a universal file encoder for PDF, ZIP, or arbitrary binary types. Toggle the data URL prefix, review character and byte size, then copy in one step. It does not batch-encode folders or decode Base64 back to files.",
    },
    benefitsHeading: "Why use a Base64 file encoder in the browser?",
    benefitsIntro:
      "Cloud file encoders route uploads through remote servers before you can copy a string. Pix-8 keeps image-file encoding local — the practical fit when you need a ",
    benefitsKeyword: "Base64 file encoder",
    benefitsIntroAfter:
      " for icons, logos, and small graphics without sending source files off-device.",
    benefits: [
      {
        title: "Image files, clearly scoped",
        body: "Load a PNG, JPEG, WebP, or GIF from your device and get a Base64 string. Pix-8 does not encode PDF, ZIP, plain text, or video files.",
      },
      {
        title: "Client-side by default",
        body: "Your image file is read and encoded in the browser tab. Pix-8 never receives your pixel data during encoding or copy.",
      },
      {
        title: "Copy-ready output",
        body: "Optional data:image/…;base64, prefix, character and byte readout, and one-click copy — formatted for CSS, HTML, or email templates.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Base64 Encoder",
        body: "Navigate to Pix-8 Base64 Encoder in your browser — no install, no account, and no upload dialog before you encode.",
      },
      {
        title: "Select an image file",
        body: "Choose an image file from your device — PNG, JPEG, WebP, or GIF. The browser reads and encodes it on-device to a Base64 string.",
      },
      {
        title: "Copy the encoded string",
        body: "Review character and byte size, toggle the data URL prefix if needed, then copy — ready for CSS, HTML, or email.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to encode an image file to Base64?",
      body: "Open Base64 Encoder, load a local image file, and copy your string — privately, entirely on-device.",
      button: "Open Base64 Encoder",
    },
  },
  "online-base64-tool-for-developers": {
    eyebrow: "Developers · Client-side · No upload",
    titleMain: "Online Base64 tool for developers",
    titleAccent: "image data URLs in the browser",
    heroSubtitle:
      "Use an online Base64 tool for developers in your browser — no upload, no API key, no cloud queue. Load a local image file, generate a copy-ready Base64 string with an optional data URL prefix, and paste into CSS, HTML, or email templates — all encoded on-device without routing assets through a remote server.",
    primaryCta: "Encode images — Free",
    ctaNote: "No upload · No server · Copy-paste ready",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Browser-side encoding — not a cloud API or CLI",
      body: "Pix-8 Base64 Encoder reads a local image file and outputs a Base64 string in the browser — not a hosted API endpoint or npm package. Toggle the data URL prefix, review character and byte size before you commit to inline assets, then copy in one step. It does not batch-encode folders, decode Base64, or wire into CI pipelines automatically.",
    },
    benefitsHeading: "Why developers use a client-side Base64 tool?",
    benefitsIntro:
      "Hosted Base64 services add upload steps and latency to a task that should take seconds. Pix-8 keeps encoding local — the practical fit when you need an ",
    benefitsKeyword: "online Base64 tool for developers",
    benefitsIntroAfter:
      " to inline icons, placeholders, and small graphics without exposing source files to a remote encoder.",
    benefits: [
      {
        title: "Paste-ready for front-end work",
        body: "Optional data:image/…;base64, prefix outputs strings formatted for CSS background-image or HTML img src — copy directly into your codebase or email template.",
      },
      {
        title: "Payload size before commit",
        body: "Character and byte readout helps you decide whether an inline Base64 asset is appropriate before inflating your stylesheet or HTML bundle.",
      },
      {
        title: "Client-side by default",
        body: "Your image file is read and encoded in the browser tab. Pix-8 never receives your pixel data — useful for client proofs and local prototyping.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Base64 Encoder",
        body: "Navigate to Pix-8 Base64 Encoder in your browser — no install, no account, and no API credentials required.",
      },
      {
        title: "Load an image file locally",
        body: "Choose a PNG, JPEG, WebP, or GIF from your device. The browser encodes it on-device to a Base64 string with an optional data URL prefix.",
      },
      {
        title: "Copy into your project",
        body: "Review character and byte size, toggle the prefix if needed, then copy the string — ready for CSS, HTML, or email markup.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to inline an image as Base64?",
      body: "Open Base64 Encoder, load a local file, and copy your string — privately, entirely on-device.",
      button: "Open Base64 Encoder",
    },
  },
  "instant-base64-conversion": {
    eyebrow: "Instant · Client-side · No upload",
    titleMain: "Instant Base64 conversion",
    titleAccent: "image files in the browser",
    heroSubtitle:
      "Get instant Base64 conversion in your browser — no upload queue, no account, no cloud wait. Load a local image file, and the browser encodes it on-device to a copy-ready Base64 string with an optional data URL prefix — ready for CSS, HTML, or email without routing your file through a remote server.",
    primaryCta: "Convert images — Free",
    ctaNote: "No upload · No server · On-device speed",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Instant because it stays local — not a cloud queue",
      body: "Pix-8 Base64 Encoder converts your image on a client-side canvas path via the FileReader API — not a remote service where you wait for an upload to finish first. Toggle the data URL prefix, review character and byte size, then copy when the string is ready. It does not batch-convert folders, resize before encoding, or decode Base64 back to files.",
    },
    benefitsHeading: "Why instant Base64 conversion in the browser?",
    benefitsIntro:
      "Cloud converters add upload latency before encoding even begins. Pix-8 skips the server entirely — the practical fit when you need ",
    benefitsKeyword: "instant Base64 conversion",
    benefitsIntroAfter:
      " for icons, logos, and small inline assets without a cloud processing queue.",
    benefits: [
      {
        title: "No upload wait",
        body: "Your image is read and encoded in the browser tab. There is no server round-trip — conversion starts as soon as the local file is loaded.",
      },
      {
        title: "Copy when ready",
        body: "Optional data:image/…;base64, prefix, character and byte readout, and one-click copy — paste directly into CSS, HTML, or email templates.",
      },
      {
        title: "Client-side by default",
        body: "Pix-8 never receives your pixel data during encoding or copy — instant conversion without exposing source files to a remote encoder.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Base64 Encoder",
        body: "Navigate to Pix-8 Base64 Encoder in your browser — no install, no account, and no upload dialog before conversion.",
      },
      {
        title: "Load an image file",
        body: "Choose a PNG, JPEG, WebP, or GIF from your device. The browser reads and encodes it on-device — conversion begins immediately.",
      },
      {
        title: "Copy the Base64 string",
        body: "Review character and byte size, toggle the data URL prefix if needed, then copy — ready for CSS, HTML, or email.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for instant Base64 conversion?",
      body: "Open Base64 Encoder, load a local image, and copy your string — privately, entirely on-device.",
      button: "Open Base64 Encoder",
    },
  },
  "client-side-base64-encoder": {
    eyebrow: "Client-side · No upload · Private",
    titleMain: "Client-side Base64 encoder",
    titleAccent: "image encoding in the browser",
    heroSubtitle:
      "Use a client-side Base64 encoder in your browser — no upload, no account, no cloud queue. Load a local image file, and the FileReader API encodes it on-device to a copy-ready Base64 string with an optional data URL prefix — ready for CSS, HTML, or email without sending pixel data to a remote server.",
    primaryCta: "Encode images — Free",
    ctaNote: "No upload · No server · Browser-native",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Browser-native encoding — not a cloud converter",
      body: "Pix-8 Base64 Encoder reads your image file locally and outputs a Base64 string in the browser tab — not a hosted service that ingests uploads first. Toggle the data URL prefix, review character and byte size, then copy in one step. It does not batch-encode folders, decode Base64, or encode plain text.",
    },
    benefitsHeading: "Why use a client-side Base64 encoder?",
    benefitsIntro:
      "Cloud Base64 tools route every file through a remote server before you can copy a string. Pix-8 keeps encoding in the browser — the direct fit when you need a ",
    benefitsKeyword: "client-side Base64 encoder",
    benefitsIntroAfter:
      " for inline icons, logos, and small graphics without exposing source files to a remote encoder.",
    benefits: [
      {
        title: "Encoding stays in the tab",
        body: "Your image file is read and converted via the FileReader API in your browser. Pix-8 never receives your pixel data during encoding or copy.",
      },
      {
        title: "Copy-ready data URLs",
        body: "Optional data:image/…;base64, prefix outputs strings formatted for CSS background-image or HTML img src — one-click copy when ready.",
      },
      {
        title: "Size before you paste",
        body: "Character and byte readout helps you judge whether an inline Base64 asset fits your stylesheet or HTML before you commit to the payload.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Base64 Encoder",
        body: "Navigate to Pix-8 Base64 Encoder in your browser — no install, no account, and no upload dialog before encoding.",
      },
      {
        title: "Load an image locally",
        body: "Choose a PNG, JPEG, WebP, or GIF from your device. The browser reads the file on-device and encodes it to Base64 via FileReader.",
      },
      {
        title: "Copy the encoded string",
        body: "Review character and byte size, toggle the data URL prefix if needed, then copy — ready for CSS, HTML, or email.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to encode images client-side?",
      body: "Open Base64 Encoder, load a local file, and copy your string — privately, entirely in the browser.",
      button: "Open Base64 Encoder",
    },
  },
  "secure-base64-decoder": {
    eyebrow: "Secure · Client-side · No upload",
    titleMain: "Secure Base64 decoder",
    titleAccent: "private image encoding in the browser",
    heroSubtitle:
      "Searching for a secure Base64 decoder? Pix-8 encodes image files to Base64 strings in your browser — no upload, no account, no cloud queue. Load a local image, generate a copy-ready string with an optional data URL prefix, and embed it in CSS or HTML — all on-device so your files are never sent to a remote server. This tool encodes images to Base64; it does not decode pasted Base64 back into files.",
    primaryCta: "Encode images — Free",
    ctaNote: "No upload · No server · On-device only",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Secure because it stays local — not a cloud decoder",
      body: "Pix-8 Base64 Encoder reads your image file locally and outputs a Base64 string in the browser — not a hosted decoder that ingests uploads first. Your pixel data is not transmitted to Pix-8 during encoding or copy. Toggle the data URL prefix, review character and byte size, then copy in one step. It does not decode Base64 input, batch-process folders, or encode plain text.",
    },
    benefitsHeading: "Why a secure, client-side Base64 workflow?",
    benefitsIntro:
      "Hosted Base64 decoders and encoders often upload files before processing — exposing source assets to a remote system. Pix-8 keeps work local — the practical fit when you need a ",
    benefitsKeyword: "secure Base64 decoder",
    benefitsIntroAfter:
      " workflow that encodes images on-device without routing sensitive files through a third-party server.",
    benefits: [
      {
        title: "No server upload step",
        body: "Your image file is read and encoded in the browser tab via FileReader. Pix-8 never receives your pixel data — there is no cloud ingestion before you copy a string.",
      },
      {
        title: "Honest encoding scope",
        body: "Load a PNG, JPEG, WebP, or GIF and get a Base64 string for inline CSS or HTML. Pix-8 does not decode pasted Base64 back into downloadable images or plain text.",
      },
      {
        title: "Copy-ready output",
        body: "Optional data:image/…;base64, prefix, character and byte readout, and one-click copy — formatted for CSS, HTML, or email templates.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Base64 Encoder",
        body: "Navigate to Pix-8 Base64 Encoder in your browser — no install, no account, and no upload dialog before encoding.",
      },
      {
        title: "Load an image locally",
        body: "Choose an image file from your device. The browser reads and encodes it on-device — your file is not sent to a remote server.",
      },
      {
        title: "Copy the encoded string",
        body: "Review character and byte size, toggle the data URL prefix if needed, then copy — ready for CSS, HTML, or email. Base64-to-file decoding is not supported.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Need secure image-to-Base64 encoding?",
      body: "Open Base64 Encoder, load a local file, and copy your string — privately, entirely on-device.",
      button: "Open Base64 Encoder",
    },
  },
  "no-upload-base64-tool": {
    eyebrow: "No upload · Client-side · Private",
    titleMain: "No-upload Base64 tool",
    titleAccent: "image encoding without a server",
    heroSubtitle:
      "Use a no-upload Base64 tool in your browser — load a local image, encode on-device, and copy a Base64 string without sending files to a remote server. Pix-8 Base64 Encoder reads your image via FileReader, outputs an optional data URL prefix, and shows character and byte size before you paste into CSS, HTML, or email. It encodes image files to Base64; it does not decode pasted strings or encode plain text.",
    primaryCta: "Encode images — Free",
    ctaNote: "No upload · No server · Browser-native",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "No upload step — encoding stays in the browser",
      body: "Pix-8 Base64 Encoder reads your image file locally and outputs a Base64 string in your browser tab — not a hosted service that ingests uploads first. Toggle the data URL prefix, review character and byte size, then copy in one step. It does not batch-encode folders, decode Base64, or encode plain text.",
    },
    benefitsHeading: "Why use a no-upload Base64 tool?",
    benefitsIntro:
      "Most online Base64 converters route every file through a remote server before you can copy a string. Pix-8 keeps encoding local — the direct fit when you need a ",
    benefitsKeyword: "no-upload Base64 tool",
    benefitsIntroAfter:
      " for inline icons, logos, and small graphics without exposing source files to a cloud encoder.",
    benefits: [
      {
        title: "Zero server upload",
        body: "Your image file is read and converted via FileReader in your browser. Pix-8 never receives your pixel data — there is no cloud ingestion step.",
      },
      {
        title: "Copy-ready data URLs",
        body: "Optional data:image/…;base64, prefix outputs strings formatted for CSS background-image or HTML img src — one-click copy when ready.",
      },
      {
        title: "Size before you paste",
        body: "Character and byte readout helps you judge whether an inline Base64 asset fits your stylesheet or HTML before you commit to the payload.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Base64 Encoder",
        body: "Navigate to Pix-8 Base64 Encoder in your browser — no install, no account, and no upload dialog before encoding.",
      },
      {
        title: "Load an image locally",
        body: "Choose a PNG, JPEG, WebP, or GIF from your device. The browser reads the file on-device and encodes it to Base64 via FileReader.",
      },
      {
        title: "Copy the encoded string",
        body: "Review character and byte size, toggle the data URL prefix if needed, then copy — ready for CSS, HTML, or email.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for no-upload Base64 encoding?",
      body: "Open Base64 Encoder, load a local image, and copy your string — privately, entirely in the browser.",
      button: "Open Base64 Encoder",
    },
  },
  "private-base64-converter": {
    eyebrow: "Private · Client-side · No upload",
    titleMain: "Private Base64 converter",
    titleAccent: "image encoding without leaving your device",
    heroSubtitle:
      "Use a private Base64 converter in your browser — load a local image, encode on-device, and copy a Base64 string without sending files to a remote server or creating an account. Pix-8 Base64 Encoder reads your image via FileReader, outputs an optional data URL prefix, and shows character and byte size before you paste into CSS, HTML, or email. It encodes image files to Base64; it does not decode pasted strings or convert plain text.",
    primaryCta: "Encode images — Free",
    ctaNote: "Private · No upload · Browser-native",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Private because it stays local — not a cloud converter",
      body: "Pix-8 Base64 Encoder reads your image file locally and outputs a Base64 string in your browser tab — not a hosted service that ingests uploads first. Your pixel data is not transmitted to Pix-8 during encoding or copy. Toggle the data URL prefix, review character and byte size, then copy in one step. It does not batch-encode folders, decode Base64, or encode plain text.",
    },
    benefitsHeading: "Why use a private Base64 converter?",
    benefitsIntro:
      "Hosted Base64 converters route every file through a remote server before you can copy a string — exposing source assets to a third-party system. Pix-8 keeps encoding local — the direct fit when you need a ",
    benefitsKeyword: "private Base64 converter",
    benefitsIntroAfter:
      " for inline icons, logos, and small graphics without routing sensitive files through a cloud encoder.",
    benefits: [
      {
        title: "Your files stay on-device",
        body: "Your image file is read and converted via FileReader in your browser. Pix-8 never receives your pixel data — there is no server upload or account required.",
      },
      {
        title: "Copy-ready data URLs",
        body: "Optional data:image/…;base64, prefix outputs strings formatted for CSS background-image or HTML img src — one-click copy when ready.",
      },
      {
        title: "Size before you paste",
        body: "Character and byte readout helps you judge whether an inline Base64 asset fits your stylesheet or HTML before you commit to the payload.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Base64 Encoder",
        body: "Navigate to Pix-8 Base64 Encoder in your browser — no install, no account, and no upload dialog before encoding.",
      },
      {
        title: "Load an image locally",
        body: "Choose a PNG, JPEG, WebP, or GIF from your device. The browser reads the file on-device and encodes it to Base64 via FileReader.",
      },
      {
        title: "Copy the encoded string",
        body: "Review character and byte size, toggle the data URL prefix if needed, then copy — ready for CSS, HTML, or email.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for private image-to-Base64 encoding?",
      body: "Open Base64 Encoder, load a local file, and copy your string — privately, entirely on-device.",
      button: "Open Base64 Encoder",
    },
  },
  "base64-string-to-image-converter": {
    eyebrow: "Client-side · No upload · Image encoding",
    titleMain: "Base64 string to image converter",
    titleAccent: "image-to-Base64, not decoding",
    heroSubtitle:
      "Searching for a Base64 string to image converter? Pix-8 Base64 Encoder converts image files to Base64 strings in your browser — no upload, no account, no cloud queue. Load a local PNG, JPEG, WebP, or GIF, generate a copy-ready string with an optional data URL prefix, and embed it in CSS or HTML — all on-device. This tool does not accept pasted Base64 and decode it back into image files.",
    primaryCta: "Encode images — Free",
    ctaNote: "No upload · No server · Image-to-Base64",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Image-to-Base64 — not Base64 string to image decoding",
      body: "Pix-8 Base64 Encoder reads a local image file and outputs a Base64 string in the browser — not a converter that ingests pasted Base64 and exports a decoded image. Toggle the data URL prefix, review character and byte size, then copy in one step. It does not decode Base64 input, encode plain text, or batch-process folders.",
    },
    benefitsHeading: "Why use image-to-Base64 in the browser?",
    benefitsIntro:
      "Cloud Base64 converters often upload strings or files before processing. Pix-8 keeps image encoding local — the practical fit when you need to ",
    benefitsKeyword: "work with Base64 for images",
    benefitsIntroAfter:
      " without sending source files or encoded strings through a remote server.",
    benefits: [
      {
        title: "Honest encoding scope",
        body: "Load an image file and get a Base64 string — the forward direction for inline assets. Pix-8 does not decode pasted Base64 strings back into downloadable images.",
      },
      {
        title: "Client-side by default",
        body: "Your image is read and encoded in the browser tab via FileReader. Pix-8 never receives your pixel data or pasted Base64 strings during use.",
      },
      {
        title: "Copy-ready output",
        body: "Optional data:image/…;base64, prefix, character and byte readout, and one-click copy — formatted for CSS, HTML, or email templates.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Base64 Encoder",
        body: "Navigate to Pix-8 Base64 Encoder in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Load an image locally",
        body: "Choose a PNG, JPEG, WebP, or GIF from your device. The browser reads the file on-device and encodes it to Base64 via FileReader.",
      },
      {
        title: "Copy the encoded string",
        body: "Review character and byte size, toggle the data URL prefix if needed, then copy — ready for CSS, HTML, or email. Base64-to-image decoding is not supported.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Need a Base64 string from a local image?",
      body: "Open Base64 Encoder, load your image file, and copy the string — privately, entirely on-device.",
      button: "Open Base64 Encoder",
    },
  },
  "batch-base64-encoder": {
    eyebrow: "Client-side · No upload · Image encoding",
    titleMain: "Batch Base64 encoder",
    titleAccent: "one image at a time, on-device",
    heroSubtitle:
      "Searching for a batch Base64 encoder? Pix-8 Base64 Encoder converts image files to Base64 strings in your browser — no upload, no account, no cloud queue. Load a local PNG, JPEG, WebP, or GIF, generate a copy-ready string with an optional data URL prefix, and copy for CSS, HTML, or email — all on-device. This tool encodes one image file per session; it does not batch-process entire folders or multiple files in a single run.",
    primaryCta: "Encode images — Free",
    ctaNote: "No upload · No server · One file per session",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Single-file encoding — not folder batch processing",
      body: "Pix-8 Base64 Encoder reads one local image file and outputs a Base64 string in the browser — not a batch pipeline that ingests entire directories at once. Toggle the data URL prefix, review character and byte size, then copy in one step. Repeat for additional images as needed. It does not batch-encode folders, decode Base64, or encode plain text.",
    },
    benefitsHeading: "Why encode images to Base64 on-device?",
    benefitsIntro:
      "Cloud batch encoders route every file through a remote server before you can copy strings. Pix-8 keeps encoding local — the practical fit when you need a ",
    benefitsKeyword: "batch Base64 encoder",
    benefitsIntroAfter:
      " workflow for individual images without uploading folders or exposing source files to a third-party service.",
    benefits: [
      {
        title: "Honest single-file scope",
        body: "Load one image at a time and get a copy-ready Base64 string. Pix-8 does not batch-encode folders or process multiple files in a single session.",
      },
      {
        title: "Client-side by default",
        body: "Each image is read and encoded in the browser tab via FileReader. Pix-8 never receives your pixel data — no server upload per file.",
      },
      {
        title: "Copy-ready output",
        body: "Optional data:image/…;base64, prefix, character and byte readout, and one-click copy — formatted for CSS, HTML, or email templates.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Base64 Encoder",
        body: "Navigate to Pix-8 Base64 Encoder in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Load one image locally",
        body: "Choose a PNG, JPEG, WebP, or GIF from your device. The browser reads the file on-device and encodes it to Base64 via FileReader.",
      },
      {
        title: "Copy and repeat if needed",
        body: "Review character and byte size, toggle the data URL prefix if needed, then copy. Load the next image for another string — folder batching is not supported.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to encode images to Base64 on-device?",
      body: "Open Base64 Encoder, load a local image, and copy your string — privately, one file at a time.",
      button: "Open Base64 Encoder",
    },
  },
  "human-readable-to-base64-converter": {
    eyebrow: "Client-side · No upload · Image encoding",
    titleMain: "Human-readable to Base64 converter",
    titleAccent: "image files, not plain text",
    heroSubtitle:
      "Searching for a human-readable to Base64 converter? Pix-8 Base64 Encoder converts image files to Base64 strings in your browser — no upload, no account, no cloud queue. Load a local PNG, JPEG, WebP, or GIF, generate a copy-ready string with an optional data URL prefix, and embed it in CSS or HTML — all on-device. This tool does not accept typed, pasted, or human-readable plain text for Base64 encoding.",
    primaryCta: "Encode images — Free",
    ctaNote: "No upload · No server · Image files only",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Image-to-Base64 — not a human-readable text encoder",
      body: "Pix-8 Base64 Encoder reads a local image file and outputs a Base64 string in the browser — not a text field that converts human-readable strings or paragraphs to Base64. Toggle the data URL prefix, review character and byte size, then copy in one step. It does not encode plain text, batch-process folders, or decode Base64 back to images.",
    },
    benefitsHeading: "Why use image-to-Base64 in the browser?",
    benefitsIntro:
      "Generic human-readable to Base64 converters often run in the cloud and mix text and file workflows in one form. Pix-8 keeps image encoding local — the practical fit when you need to ",
    benefitsKeyword: "convert visual assets to Base64",
    benefitsIntroAfter:
      " for inline CSS or HTML without routing image files through a remote server.",
    benefits: [
      {
        title: "Clear scope: image files",
        body: "Load a PNG, JPEG, WebP, or GIF from your device and get a Base64 string — the workflow for embedding icons and small graphics. Pix-8 does not encode human-readable text input.",
      },
      {
        title: "Client-side by default",
        body: "Your image is read and encoded in the browser tab via FileReader. Pix-8 never receives your pixel data during encoding or copy.",
      },
      {
        title: "Copy-ready output",
        body: "Optional data:image/…;base64, prefix, character and byte readout, and one-click copy — formatted for CSS, HTML, or email templates.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Base64 Encoder",
        body: "Navigate to Pix-8 Base64 Encoder in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Load an image locally",
        body: "Choose a PNG, JPEG, WebP, or GIF from your device. The browser reads the file on-device and encodes it to Base64 via FileReader.",
      },
      {
        title: "Copy the encoded string",
        body: "Review character and byte size, toggle the data URL prefix if needed, then copy — ready for CSS, HTML, or email. Plain-text encoding is not supported.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Need a Base64 string from a local image?",
      body: "Open Base64 Encoder, load your image file, and copy the string — privately, entirely on-device.",
      button: "Open Base64 Encoder",
    },
  },
  "base64-url-safe-encoder": {
    eyebrow: "Client-side · No upload · Standard Base64",
    titleMain: "Base64 URL-safe encoder",
    titleAccent: "standard Base64 from images, on-device",
    heroSubtitle:
      "Searching for a Base64 URL-safe encoder? Pix-8 Base64 Encoder converts image files to standard Base64 strings in your browser — no upload, no account, no cloud queue. Load a local PNG, JPEG, WebP, or GIF, generate a copy-ready string with an optional data:image/…;base64, prefix, and embed in CSS or HTML — all on-device. This tool outputs standard Base64 (+ and /); it does not produce the Base64url alphabet (- and _) or encode plain text.",
    primaryCta: "Encode images — Free",
    ctaNote: "No upload · No server · Standard Base64",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Standard Base64 — not Base64url output",
      body: "Pix-8 Base64 Encoder reads a local image file and outputs a standard Base64 string via FileReader — not a Base64url encoder that swaps + and / for - and _. Toggle the data URL prefix for inline CSS or HTML, review character and byte size, then copy in one step. It does not batch-encode folders, decode Base64, or encode plain text.",
    },
    benefitsHeading: "Why encode images to Base64 on-device?",
    benefitsIntro:
      "Cloud Base64 tools often upload files before encoding and mix URL-safe variants in one form. Pix-8 keeps image encoding local — the practical fit when you need a ",
    benefitsKeyword: "Base64 URL-safe encoder",
    benefitsIntroAfter:
      " workflow clarified: standard Base64 from local images, privately in the browser, without routing files through a remote server.",
    benefits: [
      {
        title: "Honest output format",
        body: "Standard Base64 strings from image files — with an optional data URL prefix for inline assets. Pix-8 does not output Base64url (- and _) or provide an alphabet toggle.",
      },
      {
        title: "Client-side by default",
        body: "Your image is read and encoded in the browser tab via FileReader. Pix-8 never receives your pixel data during encoding or copy.",
      },
      {
        title: "Copy-ready output",
        body: "Optional data:image/…;base64, prefix, character and byte readout, and one-click copy — formatted for CSS, HTML, or email templates.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Base64 Encoder",
        body: "Navigate to Pix-8 Base64 Encoder in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Load an image locally",
        body: "Choose a PNG, JPEG, WebP, or GIF from your device. The browser reads the file on-device and encodes it to standard Base64 via FileReader.",
      },
      {
        title: "Copy the encoded string",
        body: "Review character and byte size, toggle the data URL prefix if needed, then copy — ready for CSS, HTML, or email. Base64url output is not supported.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Need standard Base64 from a local image?",
      body: "Open Base64 Encoder, load your image file, and copy the string — privately, entirely on-device.",
      button: "Open Base64 Encoder",
    },
  },
};
