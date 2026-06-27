import { setupMlAssets } from "./setup-ml-assets-lib";

setupMlAssets()
  .then(() => {
    console.log("[ml-assets] ready → public/models/modnet_photographic.onnx, public/ort/");
  })
  .catch((error) => {
    console.error("[ml-assets] setup failed:", error);
    process.exit(1);
  });
