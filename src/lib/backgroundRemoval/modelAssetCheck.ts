import { SEGMENTATION_MODEL } from "@/lib/backgroundRemoval/constants";

export const SEGMENTATION_MODEL_FILENAME = "modnet_photographic.onnx";
export const SEGMENTATION_MODEL_PUBLIC_DIR = "public/models";

export function getSegmentationModelMissingMessage(): string {
  return (
    `[Pix-8] Segmentation model missing: ${SEGMENTATION_MODEL_PUBLIC_DIR}/${SEGMENTATION_MODEL_FILENAME} ` +
    `was not found. Run "npm run setup-ml-assets" (or "npm install") to download it. ` +
    `Background removal is blocked until this file is available at ${SEGMENTATION_MODEL.url}.`
  );
}

let assetCheckPromise: Promise<boolean> | null = null;

async function probeModelAsset(url: string): Promise<Response> {
  let response = await fetch(url, { method: "HEAD", cache: "no-store" });

  if (response.status === 405 || response.status === 501) {
    response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: { Range: "bytes=0-0" },
    });
  }

  return response;
}

/**
 * Verifies the MODNet ONNX file is served from /models (backed by public/models).
 * Logs a clear console error when missing so you don't need the network tab.
 */
export async function isSegmentationModelAssetPresent(): Promise<boolean> {
  if (assetCheckPromise) return assetCheckPromise;

  assetCheckPromise = (async () => {
    try {
      const response = await probeModelAsset(SEGMENTATION_MODEL.url);
      if (response.ok) return true;

      console.error(getSegmentationModelMissingMessage());
      console.error(
        `[Pix-8] Asset check failed for ${SEGMENTATION_MODEL.url} (HTTP ${response.status}).`,
      );
      return false;
    } catch (cause) {
      console.error(getSegmentationModelMissingMessage());
      console.error("[Pix-8] Asset check could not reach the model URL:", cause);
      return false;
    }
  })();

  return assetCheckPromise;
}

export async function assertSegmentationModelAssetPresent(): Promise<void> {
  const present = await isSegmentationModelAssetPresent();
  if (!present) {
    throw new Error(getSegmentationModelMissingMessage());
  }
}

export function resetSegmentationModelAssetCheck(): void {
  assetCheckPromise = null;
}
