"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { COLLAGE_LAYOUT_IDS } from "@/lib/collageRender";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { SliderControl } from "@/components/ui/SliderControl";
import { useEditor } from "@/hooks/useEditorState";
import { IMAGE_FILTER_IDS } from "@/lib/filterRender";
import { OVERLAY_PRESETS } from "@/lib/overlayAssets";
import { extractDominantColors, type PaletteColor } from "@/lib/paletteExtraction";
import { buildCssVariables, toPaletteSwatches } from "@/lib/cssPaletteFormat";
import { useToast } from "@/components/ui/ToastProvider";
import type { RotationDegrees } from "@/hooks/useImageProcessor";
import {
  buildSvgDownloadFilename,
  downloadSvgFile,
} from "@/lib/svgTraceRender";
import { percentToRelativeCrop, relativeCropToPercent } from "@/lib/editor/cropRegion";
import type { EditorLayer } from "@/lib/editor/layerTypes";

interface EditorLayerParamsProps {
  layer: EditorLayer;
}

export function EditorLayerParams({ layer }: EditorLayerParamsProps) {
  const { t } = useLanguage();
  const {
    updateLayer,
    source,
    previewCanvasRef,
    addCollageImages,
    removeCollageImage,
    addWorkspaceImagesToCollage,
    workspaceImages,
    activeWorkspaceImageId,
  } = useEditor();
  const collageUploadId = useId();
  const { showToast } = useToast();
  const [palette, setPalette] = useState<PaletteColor[]>([]);

  useEffect(() => {
    if (layer.type !== "palette" || !previewCanvasRef.current) {
      setPalette([]);
      return;
    }
    const canvas = previewCanvasRef.current;
    const image = new Image();
    image.onload = () => {
      setPalette(
        extractDominantColors(
          image,
          layer.type === "palette" ? layer.colorCount : 6,
        ),
      );
    };
    image.src = canvas.toDataURL("image/png");
  }, [layer, previewCanvasRef]);

  const cssOutput = useMemo(() => {
    if (layer.type !== "palette" || layer.mode !== "css") return "";
    return buildCssVariables(toPaletteSwatches(palette));
  }, [layer, palette]);

  const patch = (updater: (l: EditorLayer) => EditorLayer) => {
    updateLayer(layer.id, updater);
  };

  if (!source) return null;

  switch (layer.type) {
    case "bg-remove":
      return (
        <>
          <label className="unified-editor-toggle">
            <input
              type="checkbox"
              checked={layer.enabled}
              onChange={(e) =>
                patch((l) =>
                  l.type === "bg-remove" ? { ...l, enabled: e.target.checked } : l,
                )
              }
            />
            <span className="unified-editor-toggle-track" />
            <span>{t("editor.params.bgRemoveEnabled")}</span>
          </label>
          <SliderControl
            label={t("editor.params.advancedEdges")}
            value={layer.advancedEdges}
            onChange={(v) =>
              patch((l) => (l.type === "bg-remove" ? { ...l, advancedEdges: v } : l))
            }
          />
          <SliderControl
            label={t("editor.params.subjectMasking")}
            value={layer.subjectMasking}
            onChange={(v) =>
              patch((l) =>
                l.type === "bg-remove" ? { ...l, subjectMasking: v } : l,
              )
            }
          />
          <SliderControl
            label={t("editor.params.depthEstimation")}
            value={layer.depthEstimation}
            onChange={(v) =>
              patch((l) =>
                l.type === "bg-remove" ? { ...l, depthEstimation: v } : l,
              )
            }
          />
        </>
      );

    case "resize":
      return (
        <>
          <SliderControl
            label={t("editor.params.width")}
            value={layer.width}
            min={1}
            max={Math.max(source.width * 4, 4096)}
            step={1}
            suffix="px"
            onChange={(v) =>
              patch((l) => (l.type === "resize" ? { ...l, width: v } : l))
            }
          />
          <SliderControl
            label={t("editor.params.height")}
            value={layer.height}
            min={1}
            max={Math.max(source.height * 4, 4096)}
            step={1}
            suffix="px"
            onChange={(v) =>
              patch((l) => (l.type === "resize" ? { ...l, height: v } : l))
            }
          />
        </>
      );

    case "crop":
    case "custom-cut": {
      const percent = relativeCropToPercent(layer.region);
      return (
        <>
          {layer.type === "custom-cut" ? (
            <div className="unified-editor-segment-group">
              {(["keep", "remove"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  className={`unified-editor-segment ${layer.mode === mode ? "is-active" : ""}`}
                  onClick={() =>
                    patch((l) => (l.type === "custom-cut" ? { ...l, mode } : l))
                  }
                >
                  {t(`editor.params.cut${mode === "keep" ? "Keep" : "Remove"}`)}
                </button>
              ))}
            </div>
          ) : null}
          {(["x", "y", "width", "height"] as const).map((key) => (
            <SliderControl
              key={key}
              label={t(
                `editor.params.crop${key.charAt(0).toUpperCase()}${key.slice(1)}`,
              )}
              value={percent[key]}
              min={0}
              max={key === "width" || key === "height" ? 100 : 90}
              step={1}
              suffix="%"
              onChange={(v) =>
                patch((l) => {
                  if (l.type !== "crop" && l.type !== "custom-cut") return l;
                  const next = { ...percent, [key]: v };
                  return {
                    ...l,
                    region: percentToRelativeCrop(
                      next.x,
                      next.y,
                      Math.max(5, next.width),
                      Math.max(5, next.height),
                    ),
                  };
                })
              }
            />
          ))}
        </>
      );
    }

    case "transform":
      return (
        <>
          <div className="unified-editor-segment-group">
            {([0, 90, 180, 270] as RotationDegrees[]).map((deg) => (
              <button
                key={deg}
                type="button"
                className={`unified-editor-segment ${layer.rotation === deg ? "is-active" : ""}`}
                onClick={() =>
                  patch((l) =>
                    l.type === "transform" ? { ...l, rotation: deg } : l,
                  )
                }
              >
                {deg}°
              </button>
            ))}
          </div>
          <div className="unified-editor-segment-group">
            <button
              type="button"
              className={`unified-editor-segment ${layer.flipHorizontal ? "is-active" : ""}`}
              onClick={() =>
                patch((l) =>
                  l.type === "transform"
                    ? { ...l, flipHorizontal: !l.flipHorizontal }
                    : l,
                )
              }
            >
              {t("editor.params.flipH")}
            </button>
            <button
              type="button"
              className={`unified-editor-segment ${layer.flipVertical ? "is-active" : ""}`}
              onClick={() =>
                patch((l) =>
                  l.type === "transform"
                    ? { ...l, flipVertical: !l.flipVertical }
                    : l,
                )
              }
            >
              {t("editor.params.flipV")}
            </button>
          </div>
        </>
      );

    case "color-adjust":
      return (
        <>
          <SliderControl
            label={t("editor.params.brightness")}
            value={layer.settings.brightness}
            min={-50}
            max={50}
            step={1}
            suffix=""
            onChange={(v) =>
              patch((l) =>
                l.type === "color-adjust"
                  ? { ...l, settings: { ...l.settings, brightness: v } }
                  : l,
              )
            }
          />
          <SliderControl
            label={t("editor.params.contrast")}
            value={layer.settings.contrast}
            min={50}
            max={150}
            step={1}
            suffix=""
            onChange={(v) =>
              patch((l) =>
                l.type === "color-adjust"
                  ? { ...l, settings: { ...l.settings, contrast: v } }
                  : l,
              )
            }
          />
        </>
      );

    case "filter":
      return (
        <div className="unified-editor-filter-grid">
          {IMAGE_FILTER_IDS.filter((id) => id !== "none").map((filterId) => (
            <button
              key={filterId}
              type="button"
              className={`unified-editor-filter-btn ${layer.filterId === filterId ? "is-active" : ""}`}
              onClick={() =>
                patch((l) => (l.type === "filter" ? { ...l, filterId } : l))
              }
            >
              {t(`toolUi.imageFilters.filterNames.${filterId}`)}
            </button>
          ))}
        </div>
      );

    case "watermark":
      return (
        <>
          <label className="unified-editor-field">
            <span>{t("editor.params.watermarkText")}</span>
            <input
              type="text"
              className="unified-editor-input"
              value={layer.text}
              onChange={(e) =>
                patch((l) =>
                  l.type === "watermark" ? { ...l, text: e.target.value } : l,
                )
              }
            />
          </label>
          <SliderControl
            label={t("editor.params.opacity")}
            value={Math.round(layer.opacity * 100)}
            min={10}
            max={100}
            onChange={(v) =>
              patch((l) =>
                l.type === "watermark" ? { ...l, opacity: v / 100 } : l,
              )
            }
          />
          <SliderControl
            label={t("editor.params.fontSize")}
            value={layer.fontSize}
            min={12}
            max={120}
            step={1}
            suffix="px"
            onChange={(v) =>
              patch((l) => (l.type === "watermark" ? { ...l, fontSize: v } : l))
            }
          />
          <SliderControl
            label="X"
            value={layer.x}
            min={0}
            max={source.width}
            suffix="px"
            onChange={(v) =>
              patch((l) => (l.type === "watermark" ? { ...l, x: v } : l))
            }
          />
          <SliderControl
            label="Y"
            value={layer.y}
            min={0}
            max={source.height}
            suffix="px"
            onChange={(v) =>
              patch((l) => (l.type === "watermark" ? { ...l, y: v } : l))
            }
          />
        </>
      );

    case "text-overlay":
      return (
        <>
          <label className="unified-editor-field">
            <span>{t("editor.params.watermarkText")}</span>
            <textarea
              className="unified-editor-input min-h-20 resize-y"
              value={layer.settings.text}
              onChange={(e) =>
                patch((l) =>
                  l.type === "text-overlay"
                    ? {
                        ...l,
                        settings: { ...l.settings, text: e.target.value },
                      }
                    : l,
                )
              }
            />
          </label>
          <SliderControl
            label={t("editor.params.fontSize")}
            value={layer.settings.fontSizePercent}
            min={2}
            max={20}
            step={0.5}
            suffix="%"
            onChange={(v) =>
              patch((l) =>
                l.type === "text-overlay"
                  ? {
                      ...l,
                      settings: { ...l.settings, fontSizePercent: v },
                    }
                  : l,
              )
            }
          />
          <label className="unified-editor-field">
            <span>{t("editor.params.textColor")}</span>
            <input
              type="color"
              className="unified-editor-input h-10"
              value={layer.settings.color}
              onChange={(e) =>
                patch((l) =>
                  l.type === "text-overlay"
                    ? {
                        ...l,
                        settings: { ...l.settings, color: e.target.value },
                      }
                    : l,
                )
              }
            />
          </label>
        </>
      );

    case "compress":
      return (
        <SliderControl
          label={t("editor.params.quality")}
          value={layer.quality}
          min={10}
          max={100}
          onChange={(v) =>
            patch((l) => (l.type === "compress" ? { ...l, quality: v } : l))
          }
        />
      );

    case "metadata":
      return (
        <label className="unified-editor-toggle">
          <input
            type="checkbox"
            checked={layer.stripMetadata}
            onChange={(e) =>
              patch((l) =>
                l.type === "metadata"
                  ? { ...l, stripMetadata: e.target.checked }
                  : l,
              )
            }
          />
          <span className="unified-editor-toggle-track" />
          <span>{t("editor.params.stripMetadata")}</span>
        </label>
      );

    case "convert":
      return (
        <div className="unified-editor-segment-group">
          {(["png", "jpeg", "webp"] as const).map((format) => (
            <button
              key={format}
              type="button"
              className={`unified-editor-segment ${layer.format === format ? "is-active" : ""}`}
              onClick={() =>
                patch((l) => (l.type === "convert" ? { ...l, format } : l))
              }
            >
              {format.toUpperCase()}
            </button>
          ))}
        </div>
      );

    case "sharpen":
      return (
        <SliderControl
          label={t("editor.params.intensity")}
          value={layer.settings.intensity}
          min={0}
          max={100}
          onChange={(v) =>
            patch((l) =>
              l.type === "sharpen"
                ? { ...l, settings: { ...l.settings, intensity: v } }
                : l,
            )
          }
        />
      );

    case "denoise":
      return (
        <SliderControl
          label={t("editor.params.strength")}
          value={layer.settings.strength}
          min={0}
          max={100}
          onChange={(v) =>
            patch((l) =>
              l.type === "denoise"
                ? { ...l, settings: { ...l.settings, strength: v } }
                : l,
            )
          }
        />
      );

    case "border":
      return (
        <>
          <SliderControl
            label={t("editor.params.borderWidth")}
            value={layer.settings.width}
            min={0}
            max={120}
            suffix="px"
            onChange={(v) =>
              patch((l) =>
                l.type === "border"
                  ? { ...l, settings: { ...l.settings, width: v } }
                  : l,
              )
            }
          />
          <label className="unified-editor-field">
            <span>{t("editor.params.borderColor")}</span>
            <input
              type="color"
              className="unified-editor-input h-10"
              value={layer.settings.color}
              onChange={(e) =>
                patch((l) =>
                  l.type === "border"
                    ? { ...l, settings: { ...l.settings, color: e.target.value } }
                    : l,
                )
              }
            />
          </label>
          <SliderControl
            label={t("editor.params.cornerRadius")}
            value={layer.settings.cornerRadius}
            min={0}
            max={80}
            suffix="px"
            onChange={(v) =>
              patch((l) =>
                l.type === "border"
                  ? { ...l, settings: { ...l.settings, cornerRadius: v } }
                  : l,
              )
            }
          />
        </>
      );

    case "invert":
      return (
        <label className="unified-editor-toggle">
          <input
            type="checkbox"
            checked={layer.enabled}
            onChange={(e) =>
              patch((l) =>
                l.type === "invert" ? { ...l, enabled: e.target.checked } : l,
              )
            }
          />
          <span className="unified-editor-toggle-track" />
          <span>{t("editor.params.invertEnabled")}</span>
        </label>
      );

    case "grain":
      return (
        <SliderControl
          label={t("editor.params.intensity")}
          value={layer.settings.intensity}
          min={0}
          max={100}
          onChange={(v) =>
            patch((l) =>
              l.type === "grain"
                ? { ...l, settings: { ...l.settings, intensity: v } }
                : l,
            )
          }
        />
      );

    case "lens":
      return (
        <SliderControl
          label={t("editor.params.lensCorrection")}
          value={layer.settings.correction}
          min={-100}
          max={100}
          onChange={(v) =>
            patch((l) =>
              l.type === "lens"
                ? { ...l, settings: { ...l.settings, correction: v } }
                : l,
            )
          }
        />
      );

    case "grayscale":
      return (
        <>
          <SliderControl
            label={t("editor.params.brightness")}
            value={layer.settings.brightness}
            min={-50}
            max={50}
            suffix=""
            onChange={(v) =>
              patch((l) =>
                l.type === "grayscale"
                  ? { ...l, settings: { ...l.settings, brightness: v } }
                  : l,
              )
            }
          />
          <SliderControl
            label={t("editor.params.contrast")}
            value={layer.settings.contrast}
            min={50}
            max={150}
            suffix=""
            onChange={(v) =>
              patch((l) =>
                l.type === "grayscale"
                  ? { ...l, settings: { ...l.settings, contrast: v } }
                  : l,
              )
            }
          />
        </>
      );

    case "image-overlay":
      return (
        <>
          <div className="unified-editor-filter-grid">
            {OVERLAY_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className={`unified-editor-filter-btn ${layer.presetId === preset.id ? "is-active" : ""}`}
                onClick={() =>
                  patch((l) =>
                    l.type === "image-overlay" ? { ...l, presetId: preset.id } : l,
                  )
                }
              >
                {preset.id}
              </button>
            ))}
          </div>
          <SliderControl
            label={t("editor.params.opacity")}
            value={Math.round(layer.transform.opacity * 100)}
            min={10}
            max={100}
            onChange={(v) =>
              patch((l) =>
                l.type === "image-overlay"
                  ? {
                      ...l,
                      transform: { ...l.transform, opacity: v / 100 },
                    }
                  : l,
              )
            }
          />
          <SliderControl
            label={t("editor.params.overlayScale")}
            value={Math.round(layer.transform.scale * 100)}
            min={5}
            max={80}
            suffix="%"
            onChange={(v) =>
              patch((l) =>
                l.type === "image-overlay"
                  ? {
                      ...l,
                      transform: { ...l.transform, scale: v / 100 },
                    }
                  : l,
              )
            }
          />
        </>
      );

    case "collage": {
      const imageCount =
        (layer.includeSource ? 1 : 0) + layer.images.length;
      const workspaceCollageCandidates = workspaceImages.filter((image) => {
        if (layer.images.some((slot) => slot.file === image.file)) return false;
        if (layer.includeSource && image.id === activeWorkspaceImageId) return false;
        return true;
      });

      return (
        <>
          <label className="unified-editor-toggle">
            <input
              type="checkbox"
              checked={layer.includeSource}
              onChange={(e) =>
                patch((l) =>
                  l.type === "collage" ? { ...l, includeSource: e.target.checked } : l,
                )
              }
            />
            <span className="unified-editor-toggle-track" />
            <span>{t("editor.params.collageIncludeSource")}</span>
          </label>

          <p className="font-mono text-[10px] text-muted">
            {t("editor.params.collageImageCount", { count: imageCount })}
          </p>

          <label className="unified-editor-field">
            <span>{t("editor.params.collageAddImages")}</span>
            <input
              id={collageUploadId}
              type="file"
              accept="image/*"
              multiple
              className="unified-editor-input"
              onChange={(e) => {
                const files = e.target.files;
                if (files?.length) addCollageImages(layer.id, files);
                e.target.value = "";
              }}
            />
          </label>

          {workspaceCollageCandidates.length > 0 ? (
            <button
              type="button"
              className="unified-editor-secondary-btn"
              onClick={() => addWorkspaceImagesToCollage(layer.id)}
            >
              {t("editor.params.collageAddFromWorkspace", {
                count: workspaceCollageCandidates.length,
              })}
            </button>
          ) : null}

          {layer.images.length > 0 ? (
            <ul className="unified-editor-collage-list">
              {layer.images.map((slot, index) => (
                <li key={slot.id} className="unified-editor-collage-item">
                  <span className="truncate">
                    {index + 1 + (layer.includeSource ? 1 : 0)}. {slot.fileName}
                  </span>
                  <button
                    type="button"
                    className="unified-editor-collage-remove"
                    onClick={() => removeCollageImage(layer.id, slot.id)}
                  >
                    {t("editor.params.collageRemoveImage")}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}

          <p className="font-label text-xs text-muted">{t("toolUi.collage.layout")}</p>
          <div className="unified-editor-collage-layouts">
            {COLLAGE_LAYOUT_IDS.map((layoutId) => (
              <button
                key={layoutId}
                type="button"
                className={`unified-editor-collage-layout-btn ${
                  layer.settings.layout === layoutId ? "is-active" : ""
                }`}
                onClick={() =>
                  patch((l) =>
                    l.type === "collage"
                      ? {
                          ...l,
                          settings: { ...l.settings, layout: layoutId },
                        }
                      : l,
                  )
                }
              >
                <span>{t(`toolUi.collage.layouts.${layoutId}.title`)}</span>
                <small>{t(`toolUi.collage.layouts.${layoutId}.hint`)}</small>
              </button>
            ))}
          </div>

          <SliderControl
            label={t("toolUi.collage.gap")}
            value={layer.settings.gap}
            min={0}
            max={48}
            suffix="px"
            onChange={(v) =>
              patch((l) =>
                l.type === "collage"
                  ? { ...l, settings: { ...l.settings, gap: v } }
                  : l,
              )
            }
          />

          <label className="unified-editor-field">
            <span>{t("toolUi.collage.background")}</span>
            <input
              type="color"
              className="unified-editor-input h-10"
              value={layer.settings.backgroundColor}
              onChange={(e) =>
                patch((l) =>
                  l.type === "collage"
                    ? {
                        ...l,
                        settings: { ...l.settings, backgroundColor: e.target.value },
                      }
                    : l,
                )
              }
            />
          </label>
        </>
      );
    }

    case "meme":
      return (
        <>
          <label className="unified-editor-field">
            <span>{t("editor.params.memeTop")}</span>
            <input
              type="text"
              className="unified-editor-input"
              value={layer.settings.topText}
              onChange={(e) =>
                patch((l) =>
                  l.type === "meme"
                    ? {
                        ...l,
                        settings: { ...l.settings, topText: e.target.value },
                      }
                    : l,
                )
              }
            />
          </label>
          <label className="unified-editor-field">
            <span>{t("editor.params.memeBottom")}</span>
            <input
              type="text"
              className="unified-editor-input"
              value={layer.settings.bottomText}
              onChange={(e) =>
                patch((l) =>
                  l.type === "meme"
                    ? {
                        ...l,
                        settings: { ...l.settings, bottomText: e.target.value },
                      }
                    : l,
                )
              }
            />
          </label>
        </>
      );

    case "magnifier":
      return (
        <SliderControl
          label={t("editor.params.zoom")}
          value={layer.zoom}
          min={1}
          max={4}
          step={0.25}
          suffix="×"
          onChange={(v) =>
            patch((l) => (l.type === "magnifier" ? { ...l, zoom: v } : l))
          }
        />
      );

    case "annotator":
      return (
        <>
          <label className="unified-editor-field">
            <span>{t("editor.params.annotatorLabel")}</span>
            <input
              type="text"
              className="unified-editor-input"
              value={layer.label}
              onChange={(e) =>
                patch((l) =>
                  l.type === "annotator" ? { ...l, label: e.target.value } : l,
                )
              }
            />
          </label>
          <SliderControl
            label="X"
            value={layer.x}
            min={0}
            max={source.width}
            suffix="px"
            onChange={(v) =>
              patch((l) => (l.type === "annotator" ? { ...l, x: v } : l))
            }
          />
          <SliderControl
            label="Y"
            value={layer.y}
            min={0}
            max={source.height}
            suffix="px"
            onChange={(v) =>
              patch((l) => (l.type === "annotator" ? { ...l, y: v } : l))
            }
          />
        </>
      );

    case "palette":
      return (
        <>
          <SliderControl
            label={t("editor.params.colorCount")}
            value={layer.colorCount}
            min={3}
            max={12}
            step={1}
            suffix=""
            onChange={(v) =>
              patch((l) => (l.type === "palette" ? { ...l, colorCount: v } : l))
            }
          />
          <div className="unified-editor-palette-grid">
            {palette.map((color) => (
              <button
                key={color.hex}
                type="button"
                className="unified-editor-palette-swatch"
                style={{ background: color.hex }}
                title={color.hex}
                onClick={() => {
                  void navigator.clipboard.writeText(color.hex);
                  showToast(color.hex, { title: t("editor.params.copied") });
                }}
              />
            ))}
          </div>
          {layer.mode === "css" && cssOutput ? (
            <pre className="unified-editor-code-block">{cssOutput}</pre>
          ) : null}
        </>
      );

    case "export-base64":
      return (
        <button
          type="button"
          className="unified-editor-action-btn"
          onClick={() => {
            const canvas = previewCanvasRef.current;
            if (!canvas) return;
            const dataUrl = canvas.toDataURL("image/png");
            void navigator.clipboard.writeText(dataUrl).then(() => {
              showToast(t("editor.params.base64Copied"));
            });
          }}
        >
          {t("editor.params.copyBase64")}
        </button>
      );

    case "export-svg":
      return (
        <>
          <SliderControl
            label={t("toolUi.imageToSvg.complexity")}
            value={layer.settings.complexity}
            min={0}
            max={100}
            step={1}
            suffix="%"
            disabled={layer.processing}
            onChange={(v) =>
              patch((l) =>
                l.type === "export-svg"
                  ? { ...l, settings: { ...l.settings, complexity: v } }
                  : l,
              )
            }
          />

          <p className="font-label text-xs text-muted">{t("toolUi.imageToSvg.colorMode")}</p>
          <div className="unified-editor-segment-group">
            {(["color", "grayscale", "bw"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                className={`unified-editor-segment ${
                  layer.settings.colorMode === mode ? "is-active" : ""
                }`}
                disabled={layer.processing}
                onClick={() =>
                  patch((l) =>
                    l.type === "export-svg"
                      ? { ...l, settings: { ...l.settings, colorMode: mode } }
                      : l,
                  )
                }
              >
                {t(`toolUi.imageToSvg.colorModes.${mode}`)}
              </button>
            ))}
          </div>

          <label className="unified-editor-toggle">
            <input
              type="checkbox"
              checked={layer.settings.simplifyPaths}
              disabled={layer.processing}
              onChange={(e) =>
                patch((l) =>
                  l.type === "export-svg"
                    ? {
                        ...l,
                        settings: { ...l.settings, simplifyPaths: e.target.checked },
                      }
                    : l,
                )
              }
            />
            <span className="unified-editor-toggle-track" />
            <span>{t("toolUi.imageToSvg.simplifyPaths")}</span>
          </label>

          {layer.processing ? (
            <p className="font-mono text-[10px] text-muted">
              {t("toolUi.imageToSvg.converting")}
            </p>
          ) : layer.svgOutput ? (
            <div
              className="unified-editor-svg-preview"
              dangerouslySetInnerHTML={{ __html: layer.svgOutput }}
            />
          ) : (
            <p className="unified-editor-params-hint">{t("editor.params.exportSvgHint")}</p>
          )}

          <div className="unified-editor-action-row">
            <button
              type="button"
              className="unified-editor-action-btn"
              disabled={!layer.svgOutput || layer.processing}
              onClick={() => {
                if (!layer.svgOutput || !source) return;
                void downloadSvgFile(
                  layer.svgOutput,
                  buildSvgDownloadFilename(source.name),
                );
              }}
            >
              {t("toolUi.imageToSvg.downloadSvg")}
            </button>
            <button
              type="button"
              className="unified-editor-action-btn"
              disabled={!layer.svgOutput || layer.processing}
              onClick={() => {
                if (!layer.svgOutput) return;
                void navigator.clipboard.writeText(layer.svgOutput).then(
                  () => showToast(t("editor.params.svgCopied")),
                  () => showToast(t("toolUi.imageToSvg.copyFailed")),
                );
              }}
            >
              {t("toolUi.imageToSvg.copySvg")}
            </button>
          </div>
        </>
      );

    case "export-favicon":
      return (
        <>
          <div className="unified-editor-segment-group">
            {([16, 32, 48, 64, 128, 256] as const).map((size) => (
              <button
                key={size}
                type="button"
                className={`unified-editor-segment ${layer.size === size ? "is-active" : ""}`}
                onClick={() =>
                  patch((l) => (l.type === "export-favicon" ? { ...l, size } : l))
                }
              >
                {size}px
              </button>
            ))}
          </div>
          <button
            type="button"
            className="unified-editor-action-btn"
            onClick={() => {
              const canvas = previewCanvasRef.current;
              if (!canvas || layer.type !== "export-favicon") return;
              const fav = document.createElement("canvas");
              fav.width = layer.size;
              fav.height = layer.size;
              const ctx = fav.getContext("2d");
              if (!ctx) return;
              ctx.drawImage(canvas, 0, 0, layer.size, layer.size);
              fav.toBlob((blob) => {
                if (!blob) return;
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `favicon-${layer.size}.png`;
                a.click();
                URL.revokeObjectURL(url);
              }, "image/png");
            }}
          >
            {t("editor.params.downloadFavicon")}
          </button>
        </>
      );

    default:
      return null;
  }
}
