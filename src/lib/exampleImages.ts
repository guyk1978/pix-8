import type { ExampleImage } from "@/lib/exampleImages.generated";

export {
  EXAMPLE_IMAGES,
  type ExampleImage,
  type ExampleImageId,
} from "@/lib/exampleImages.generated";

/** Max thumbnails visible at once; additional examples use carousel paging. */
export const EXAMPLE_IMAGES_PAGE_SIZE = 6;

export async function loadExampleImageAsFile(
  example: ExampleImage,
): Promise<File> {
  const response = await fetch(example.src);
  if (!response.ok) {
    throw new Error("Failed to load example image.");
  }

  const blob = await response.blob();
  const type = blob.type || "image/webp";

  return new File([blob], example.fileName, { type });
}
