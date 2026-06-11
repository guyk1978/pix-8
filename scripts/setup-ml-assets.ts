import { setupMlAssets } from "./setup-ml-assets-lib";

setupMlAssets()
  .then(() => {
    console.log("[ml-assets] ready → public/models/u2netp.onnx, public/ort/");
  })
  .catch((error) => {
    console.error("[ml-assets] setup failed:", error);
    process.exit(1);
  });
