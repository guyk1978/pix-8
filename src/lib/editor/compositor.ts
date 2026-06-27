import {
  canvasToBlob,
  getTransformedDimensions,
  hasActiveTransform,
  transformImage,
  type CropRegion,
} from "@/hooks/useImageProcessor";
import { resolveRelativeCropRegion } from "@/lib/editor/cropRegion";
import type {
  EditorDimensions,
  EditorLayer,
  EditorSource,
  ImageOverlayLayer,
  CollageLayer,
  ExportSvgLayer,
} from "@/lib/editor/layerTypes";
import { layerToTransform } from "@/lib/editor/layerTypes";
import { renderLightAdjustedCanvas } from "@/lib/lightAdjustRender";
import { renderFilteredCanvasAsync } from "@/lib/filterRender";
import { removeImageBackground, blobToImage } from "@/lib/backgroundRemoval";
import { renderSharpenedCanvas } from "@/lib/sharpenRender";
import { renderDenoisedCanvasAsync } from "@/lib/denoiseRender";
import { getBorderedCanvasSize, renderBorderedCanvas } from "@/lib/borderRender";
import { renderInvertedCanvas } from "@/lib/invertRender";
import { renderGrainCanvas } from "@/lib/grainRender";
import { renderLensCorrectedCanvas } from "@/lib/lensCorrectorRender";
import { renderGrayscaleCanvas } from "@/lib/grayscaleRender";
import { renderTextOverlayCanvas } from "@/lib/textOverlayRender";
import { renderImageOverlayCanvas } from "@/lib/imageOverlayRender";
import { renderMemeCanvas } from "@/lib/memeRender";
import {
  COLLAGE_CELL_SIZE,
  drawCollage,
  loadImageElement,
} from "@/lib/collageRender";
import { traceImageToSvgAsync } from "@/lib/svgTraceRender";
import {
  renderKeepSelectionCanvas,
  renderRemoveSelectionCanvas,
} from "@/lib/customCutterRender";
import { OVERLAY_PRESETS, loadOverlayImage } from "@/lib/overlayAssets";

class ComposePipeline {
  private readSource: CanvasImageSource;
  private width: number;
  private height: number;
  private readonly bufferA: HTMLCanvasElement;
  private readonly bufferB: HTMLCanvasElement;
  private writeToA = true;

  constructor(image: HTMLImageElement, width: number, height: number) {
    this.readSource = image;
    this.width = width;
    this.height = height;
    this.bufferA = document.createElement("canvas");
    this.bufferB = document.createElement("canvas");
  }

  get dimensions(): EditorDimensions {
    return { width: this.width, height: this.height };
  }

  private writeCanvas(): HTMLCanvasElement {
    return this.writeToA ? this.bufferA : this.bufferB;
  }

  private commit(writeCanvas: HTMLCanvasElement, newWidth: number, newHeight: number): void {
    this.readSource = writeCanvas;
    this.width = newWidth;
    this.height = newHeight;
    this.writeToA = !this.writeToA;
  }

  private blitToWrite(): HTMLCanvasElement {
    const target = this.writeCanvas();
    target.width = this.width;
    target.height = this.height;
    const ctx = target.getContext("2d");
    if (!ctx) throw new Error("Canvas context unavailable.");
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.drawImage(this.readSource, 0, 0, this.width, this.height);
    this.commit(target, this.width, this.height);
    return target;
  }

  async toImageElement(): Promise<HTMLImageElement> {
    if (this.readSource instanceof HTMLImageElement) {
      return this.readSource;
    }
    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context unavailable.");
    ctx.drawImage(this.readSource, 0, 0, this.width, this.height);
    const blob = await canvasToBlob(canvas, "png");
    return blobToImage(blob);
  }

  drawToOutput(output: HTMLCanvasElement): void {
    output.width = this.width;
    output.height = this.height;
    const ctx = output.getContext("2d");
    if (!ctx) throw new Error("Canvas context unavailable.");
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.drawImage(this.readSource, 0, 0, this.width, this.height);
  }

  drawCrop(region: CropRegion): void {
    const target = this.writeCanvas();
    target.width = region.width;
    target.height = region.height;
    const ctx = target.getContext("2d");
    if (!ctx) throw new Error("Canvas context unavailable.");
    ctx.clearRect(0, 0, region.width, region.height);
    ctx.drawImage(
      this.readSource,
      region.x,
      region.y,
      region.width,
      region.height,
      0,
      0,
      region.width,
      region.height,
    );
    this.commit(target, region.width, region.height);
  }

  drawResize(newWidth: number, newHeight: number): void {
    const target = this.writeCanvas();
    target.width = newWidth;
    target.height = newHeight;
    const ctx = target.getContext("2d");
    if (!ctx) throw new Error("Canvas context unavailable.");
    ctx.clearRect(0, 0, newWidth, newHeight);
    ctx.drawImage(this.readSource, 0, 0, newWidth, newHeight);
    this.commit(target, newWidth, newHeight);
  }

  async drawTransform(rotation: 0 | 90 | 180 | 270, transform: ReturnType<typeof layerToTransform>): Promise<void> {
    const image = await this.toImageElement();
    const dims = getTransformedDimensions(this.width, this.height, rotation);
    const target = this.writeCanvas();
    transformImage(image, {
      width: dims.width,
      height: dims.height,
      transform,
      canvas: target,
    });
    this.commit(target, dims.width, dims.height);
  }

  async renderWithImage(
    render: (
      image: HTMLImageElement,
      target: HTMLCanvasElement,
      width: number,
      height: number,
    ) => void | Promise<void>,
    newWidth?: number,
    newHeight?: number,
  ): Promise<void> {
    const width = this.width;
    const height = this.height;
    const image = await this.toImageElement();
    const target = this.writeCanvas();
    await render(image, target, width, height);
    this.commit(target, newWidth ?? width, newHeight ?? height);
  }

  drawWatermark(
    text: string,
    opacity: number,
    fontSize: number,
    x: number,
    y: number,
  ): void {
    const width = this.width;
    const height = this.height;
    const target = this.blitToWrite();
    const ctx = target.getContext("2d");
    if (!ctx) throw new Error("Canvas context unavailable.");
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = "#ffffff";
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    ctx.textAlign = "right";
    ctx.textBaseline = "bottom";
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  drawMeme(settings: import("@/lib/memeRender").MemeSettings): void {
    const width = this.width;
    const height = this.height;
    const target = this.writeCanvas();
    renderMemeCanvas(this.readSource, width, height, settings, target);
    this.commit(target, width, height);
  }

  drawAnnotator(label: string, x: number, y: number): void {
    const target = this.blitToWrite();
    const ctx = target.getContext("2d");
    if (!ctx) throw new Error("Canvas context unavailable.");
    ctx.save();
    ctx.font = "bold 14px Arial, sans-serif";
    const metrics = ctx.measureText(label);
    const boxW = metrics.width + 16;
    const boxH = 20;
    ctx.fillStyle = "rgba(0, 123, 255, 0.9)";
    ctx.fillRect(x - boxW / 2, y - boxH / 2, boxW, boxH);
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, x, y);
    ctx.restore();
  }

  replaceSource(image: HTMLImageElement): void {
    this.readSource = image;
    this.width = image.naturalWidth || image.width;
    this.height = image.naturalHeight || image.height;
  }

  setSourceFromCanvas(canvas: HTMLCanvasElement): void {
    this.readSource = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
  }

  async snapshotBlob(): Promise<Blob> {
    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context unavailable.");
    ctx.drawImage(this.readSource, 0, 0, this.width, this.height);
    return canvasToBlob(canvas, "png");
  }
}

export interface ComposeOptions {
  onBgRemoveProgress?: (layerId: string, processing: boolean) => void;
  onOverlayLoaded?: (layerId: string, image: HTMLImageElement) => void;
  onCollageImageLoaded?: (
    layerId: string,
    slotId: string,
    image: HTMLImageElement,
  ) => void;
  onSvgTraceStart?: (layerId: string) => void;
  onSvgTraced?: (layerId: string, svg: string) => void;
  onSvgTraceError?: (layerId: string, error: unknown) => void;
  shouldCancelCompose?: () => boolean;
  bgRemoveCache: Map<string, HTMLImageElement>;
  overlayCache: Map<string, HTMLImageElement>;
  collageCache: Map<string, HTMLImageElement>;
}

export async function composeLayers(
  source: EditorSource,
  layers: EditorLayer[],
  outputCanvas: HTMLCanvasElement,
  options: ComposeOptions,
): Promise<EditorDimensions> {
  const pipeline = new ComposePipeline(source.image, source.width, source.height);

  const activeLayers = layers.filter(
    (layer) => layer.visible && layer.type !== "source",
  );

  for (const layer of activeLayers) {
    switch (layer.type) {
      case "bg-remove": {
        if (!layer.enabled) break;

        let resultImage =
          layer.resultImage ?? options.bgRemoveCache.get(layer.id);

        if (!resultImage) {
          options.onBgRemoveProgress?.(layer.id, true);
          try {
            const blob = await removeImageBackground(await pipeline.snapshotBlob());
            resultImage = await blobToImage(blob);
            options.bgRemoveCache.set(layer.id, resultImage);
          } finally {
            options.onBgRemoveProgress?.(layer.id, false);
          }
        }

        pipeline.replaceSource(resultImage);
        break;
      }

      case "crop": {
        const region = resolveRelativeCropRegion(
          layer.region,
          pipeline.dimensions.width,
          pipeline.dimensions.height,
        );
        pipeline.drawCrop(region);
        break;
      }

      case "custom-cut": {
        const region = resolveRelativeCropRegion(
          layer.region,
          pipeline.dimensions.width,
          pipeline.dimensions.height,
        );
        const img = await pipeline.toImageElement();
        const result =
          layer.mode === "keep"
            ? renderKeepSelectionCanvas(img, region)
            : renderRemoveSelectionCanvas(img, region);
        pipeline.setSourceFromCanvas(result);
        break;
      }

      case "resize":
        pipeline.drawResize(layer.width, layer.height);
        break;

      case "transform": {
        const transform = layerToTransform(layer);
        if (!hasActiveTransform(transform)) break;
        await pipeline.drawTransform(layer.rotation, transform);
        break;
      }

      case "color-adjust":
        await pipeline.renderWithImage((image, target, width, height) => {
          renderLightAdjustedCanvas(image, width, height, layer.settings, target);
        });
        break;

      case "filter": {
        if (layer.filterId === "none") break;
        await pipeline.renderWithImage(async (image, target, width, height) => {
          await renderFilteredCanvasAsync(image, width, height, layer.filterId, target);
        });
        break;
      }

      case "sharpen":
        await pipeline.renderWithImage((image, target, width, height) => {
          renderSharpenedCanvas(image, width, height, layer.settings, target);
        });
        break;

      case "denoise":
        await pipeline.renderWithImage(async (image, target, width, height) => {
          await renderDenoisedCanvasAsync(image, width, height, layer.settings, target);
        });
        break;

      case "border": {
        const bordered = getBorderedCanvasSize(
          pipeline.dimensions.width,
          pipeline.dimensions.height,
          layer.settings.width,
        );
        await pipeline.renderWithImage(
          (image, target, width, height) => {
            renderBorderedCanvas(image, width, height, layer.settings, target);
          },
          bordered.width,
          bordered.height,
        );
        break;
      }

      case "invert":
        if (!layer.enabled) break;
        await pipeline.renderWithImage((image, target, width, height) => {
          renderInvertedCanvas(image, width, height, true, target);
        });
        break;

      case "grain":
        await pipeline.renderWithImage((image, target, width, height) => {
          renderGrainCanvas(image, width, height, layer.settings, target);
        });
        break;

      case "lens":
        await pipeline.renderWithImage((image, target, width, height) => {
          renderLensCorrectedCanvas(image, width, height, layer.settings, target);
        });
        break;

      case "grayscale":
        await pipeline.renderWithImage((image, target, width, height) => {
          renderGrayscaleCanvas(image, width, height, layer.settings, target);
        });
        break;

      case "watermark":
        pipeline.drawWatermark(
          layer.text,
          layer.opacity,
          layer.fontSize,
          layer.x,
          layer.y,
        );
        break;

      case "text-overlay":
        await pipeline.renderWithImage((image, target, width, height) => {
          renderTextOverlayCanvas(image, width, height, layer.settings, target);
        });
        break;

      case "meme":
        pipeline.drawMeme(layer.settings);
        break;

      case "image-overlay": {
        const overlayLayer = layer as ImageOverlayLayer;
        const preset = OVERLAY_PRESETS.find((p) => p.id === overlayLayer.presetId);
        if (!preset) break;

        let overlayImage =
          overlayLayer.loadedImage ?? options.overlayCache.get(layer.id);
        if (!overlayImage) {
          overlayImage = await loadOverlayImage(preset.src);
          options.overlayCache.set(layer.id, overlayImage);
          options.onOverlayLoaded?.(layer.id, overlayImage);
        }

        await pipeline.renderWithImage((image, target, width, height) => {
          renderImageOverlayCanvas(
            image,
            width,
            height,
            overlayImage,
            overlayLayer.transform,
            target,
          );
        });
        break;
      }

      case "collage": {
        const collageLayer = layer as CollageLayer;
        const collageImages: CanvasImageSource[] = [];

        if (collageLayer.includeSource) {
          collageImages.push(await pipeline.toImageElement());
        }

        for (const slot of collageLayer.images) {
          let slotImage =
            slot.loadedImage ?? options.collageCache.get(slot.id);
          if (!slotImage && slot.objectUrl) {
            slotImage = await loadImageElement(slot.objectUrl);
            options.collageCache.set(slot.id, slotImage);
            options.onCollageImageLoaded?.(layer.id, slot.id, slotImage);
          }
          if (slotImage) collageImages.push(slotImage);
        }

        if (collageImages.length === 0) break;

        const collageCanvas = document.createElement("canvas");
        const collageCtx = collageCanvas.getContext("2d");
        if (!collageCtx) break;

        drawCollage(collageCtx, collageImages, collageLayer.settings, COLLAGE_CELL_SIZE);
        pipeline.setSourceFromCanvas(collageCanvas);
        break;
      }

      case "annotator":
        pipeline.drawAnnotator(layer.label, layer.x, layer.y);
        break;

      case "export-svg": {
        const svgLayer = layer as ExportSvgLayer;
        options.onSvgTraceStart?.(layer.id);
        try {
          const img = await pipeline.toImageElement();
          const svg = await traceImageToSvgAsync(
            img,
            pipeline.dimensions.width,
            pipeline.dimensions.height,
            svgLayer.settings,
            options.shouldCancelCompose,
          );
          options.onSvgTraced?.(layer.id, svg);
        } catch (error) {
          if (error instanceof DOMException && error.name === "AbortError") {
            break;
          }
          options.onSvgTraceError?.(layer.id, error);
        }
        break;
      }

      case "compress":
      case "metadata":
      case "convert":
      case "magnifier":
      case "palette":
      case "export-favicon":
      case "export-base64":
        break;
    }
  }

  pipeline.drawToOutput(outputCanvas);
  return pipeline.dimensions;
}

export function invalidateBgRemoveCache(
  cache: Map<string, HTMLImageElement>,
  layerId: string,
): void {
  cache.delete(layerId);
}

export function invalidateCollageCache(
  cache: Map<string, HTMLImageElement>,
  slotId: string,
): void {
  cache.delete(slotId);
}

export function invalidateCollageLayerCache(
  cache: Map<string, HTMLImageElement>,
  layer: CollageLayer,
): void {
  for (const slot of layer.images) {
    cache.delete(slot.id);
  }
}

export function invalidateOverlayCache(
  cache: Map<string, HTMLImageElement>,
  layerId: string,
): void {
  cache.delete(layerId);
}
