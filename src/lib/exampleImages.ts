/** Sample images served from `public/examples/`. Keep in sync with that folder. */
export type ExampleImageId =
  | "image1"
  | "image2"
  | "image3"
  | "image4"
  | "image5"
  | "image6";

export interface ExampleImage {
  id: ExampleImageId;
  fileName: string;
  src: string;
}

export const EXAMPLE_IMAGES: ExampleImage[] = [
  { id: "image1", fileName: "image1.webp", src: "/examples/image1.webp" },
  { id: "image2", fileName: "image2.webp", src: "/examples/image2.webp" },
  { id: "image3", fileName: "image3.webp", src: "/examples/image3.webp" },
  { id: "image4", fileName: "image4.webp", src: "/examples/image4.webp" },
  { id: "image5", fileName: "image5.webp", src: "/examples/image5.webp" },
  { id: "image6", fileName: "image6.webp", src: "/examples/image6.webp" },
];

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
