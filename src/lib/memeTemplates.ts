export type MemeTemplateId =
  | "distracted-boyfriend"
  | "drake-hotline-bling"
  | "change-my-mind"
  | "two-buttons";

export interface MemeTemplate {
  id: MemeTemplateId;
  fileName: string;
  /** Public path served from /meme-templates */
  src: string;
  thumbnailSrc: string;
  width: number;
  height: number;
}

export const MEME_TEMPLATES: MemeTemplate[] = [
  {
    id: "distracted-boyfriend",
    fileName: "distracted-boyfriend",
    src: "/meme-templates/distracted-boyfriend.svg",
    thumbnailSrc: "/meme-templates/distracted-boyfriend.svg",
    width: 800,
    height: 533,
  },
  {
    id: "drake-hotline-bling",
    fileName: "drake-hotline-bling",
    src: "/meme-templates/drake-hotline-bling.svg",
    thumbnailSrc: "/meme-templates/drake-hotline-bling.svg",
    width: 600,
    height: 600,
  },
  {
    id: "change-my-mind",
    fileName: "change-my-mind",
    src: "/meme-templates/change-my-mind.svg",
    thumbnailSrc: "/meme-templates/change-my-mind.svg",
    width: 800,
    height: 533,
  },
  {
    id: "two-buttons",
    fileName: "two-buttons",
    src: "/meme-templates/two-buttons.svg",
    thumbnailSrc: "/meme-templates/two-buttons.svg",
    width: 600,
    height: 600,
  },
];

export async function loadMemeTemplateAsFile(
  template: MemeTemplate,
): Promise<File> {
  const response = await fetch(template.src);
  if (!response.ok) {
    throw new Error("Failed to load meme template.");
  }

  const blob = await response.blob();
  const type = blob.type || "image/webp";

  const extension = template.src.endsWith(".svg") ? "svg" : "webp";
  const mimeType =
    extension === "svg" ? "image/svg+xml" : type || "image/webp";

  return new File([blob], `${template.fileName}.${extension}`, {
    type: mimeType,
  });
}
