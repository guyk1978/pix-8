export function invertImageData(imageData: ImageData): ImageData {
  const output = new ImageData(
    new Uint8ClampedArray(imageData.data),
    imageData.width,
    imageData.height,
  );

  for (let i = 0; i < output.data.length; i += 4) {
    output.data[i] = 255 - output.data[i];
    output.data[i + 1] = 255 - output.data[i + 1];
    output.data[i + 2] = 255 - output.data[i + 2];
  }

  return output;
}

export function renderInvertedCanvas(
  image: HTMLImageElement,
  imageWidth: number,
  imageHeight: number,
  inverted: boolean,
  canvas?: HTMLCanvasElement | null,
): HTMLCanvasElement {
  const target = canvas ?? document.createElement("canvas");
  target.width = imageWidth;
  target.height = imageHeight;

  const ctx = target.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context unavailable.");
  }

  ctx.clearRect(0, 0, imageWidth, imageHeight);
  ctx.drawImage(image, 0, 0, imageWidth, imageHeight);

  if (inverted) {
    const imageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
    ctx.putImageData(invertImageData(imageData), 0, 0);
  }

  return target;
}
