import {
  computeFitScale,
  MAX_USER_ZOOM,
  MIN_USER_ZOOM,
  type MagnifierViewState,
} from "@/lib/imageMagnifierView";
import {
  DEFAULT_REFINEMENT_SETTINGS,
  type RefinementSettings,
  type SharpenType,
} from "@/lib/sharpenRender";

const SHARPEN_TYPES: SharpenType[] = ["adaptive", "high-pass", "unsharp-mask"];

export interface MagnifierPanSettings {
  x: number;
  y: number;
}

export interface MagnifierProjectSettings extends Record<string, unknown> {
  zoomLevel: number;
  pan: MagnifierPanSettings;
  sharpenSettings: RefinementSettings;
  stripMetadata?: boolean;
  cornerRadius?: number;
}

export function getSourceFileKey(file: File): string {
  return `${file.name}:${file.size}:${file.lastModified}`;
}

function clampZoom(zoom: number): number {
  return Math.min(MAX_USER_ZOOM, Math.max(MIN_USER_ZOOM, zoom));
}

function parseSharpenSettings(value: unknown): RefinementSettings {
  if (!value || typeof value !== "object") {
    return { ...DEFAULT_REFINEMENT_SETTINGS };
  }

  const raw = value as Record<string, unknown>;
  const type =
    typeof raw.type === "string" &&
    SHARPEN_TYPES.includes(raw.type as SharpenType)
      ? (raw.type as SharpenType)
      : DEFAULT_REFINEMENT_SETTINGS.type;

  return {
    enabled:
      typeof raw.enabled === "boolean"
        ? raw.enabled
        : DEFAULT_REFINEMENT_SETTINGS.enabled,
    intensity:
      typeof raw.intensity === "number"
        ? raw.intensity
        : DEFAULT_REFINEMENT_SETTINGS.intensity,
    type,
  };
}

export function buildMagnifierToolState(
  viewState: MagnifierViewState,
  refinement: RefinementSettings,
  stripMetadata: boolean,
  cornerRadius = 0,
): MagnifierProjectSettings {
  return {
    zoomLevel: viewState.userZoom,
    pan: { x: viewState.translateX, y: viewState.translateY },
    sharpenSettings: { ...refinement },
    stripMetadata,
    cornerRadius,
  };
}

/** @deprecated Use buildMagnifierToolState with the global project envelope. */
export function buildMagnifierProjectPayload(
  viewState: MagnifierViewState,
  refinement: RefinementSettings,
  _isResultMarked: boolean,
  stripMetadata: boolean,
) {
  return {
    settings: buildMagnifierToolState(viewState, refinement, stripMetadata),
  };
}

export function parseMagnifierProjectSettings(
  settings: Record<string, unknown>,
): MagnifierProjectSettings | null {
  if (settings.zoomLevel !== undefined || settings.pan || settings.sharpenSettings) {
    const panRaw = settings.pan;
    const pan =
      panRaw && typeof panRaw === "object"
        ? {
            x:
              typeof (panRaw as Record<string, unknown>).x === "number"
                ? ((panRaw as Record<string, unknown>).x as number)
                : 0,
            y:
              typeof (panRaw as Record<string, unknown>).y === "number"
                ? ((panRaw as Record<string, unknown>).y as number)
                : 0,
          }
        : { x: 0, y: 0 };

    return {
      zoomLevel:
        typeof settings.zoomLevel === "number"
          ? clampZoom(settings.zoomLevel)
          : MIN_USER_ZOOM,
      pan,
      sharpenSettings: parseSharpenSettings(settings.sharpenSettings),
      stripMetadata:
        typeof settings.stripMetadata === "boolean"
          ? settings.stripMetadata
          : undefined,
      cornerRadius:
        typeof settings.cornerRadius === "number"
          ? settings.cornerRadius
          : undefined,
    };
  }

  if (
    settings.refinement ||
    settings.sharpenEnabled !== undefined
  ) {
    let sharpenSettings = parseSharpenSettings(settings.refinement);

    if (typeof settings.sharpenEnabled === "boolean") {
      sharpenSettings = { ...sharpenSettings, enabled: settings.sharpenEnabled };
    }

    if (typeof settings.sharpenIntensity === "number") {
      sharpenSettings = {
        ...sharpenSettings,
        intensity: settings.sharpenIntensity,
      };
    }

    if (typeof settings.sharpenType === "string") {
      sharpenSettings = parseSharpenSettings({
        ...sharpenSettings,
        type: settings.sharpenType,
      });
    }

    return {
      zoomLevel: MIN_USER_ZOOM,
      pan: { x: 0, y: 0 },
      sharpenSettings,
      stripMetadata:
        typeof settings.stripMetadata === "boolean"
          ? settings.stripMetadata
          : undefined,
      cornerRadius:
        typeof settings.cornerRadius === "number"
          ? settings.cornerRadius
          : undefined,
    };
  }

  return null;
}

/** @deprecated Use parseMagnifierProjectSettings on envelope settings. */
export function parseMagnifierProjectPayload(
  payload: Record<string, unknown>,
): MagnifierProjectSettings | null {
  if (payload.settings && typeof payload.settings === "object") {
    return parseMagnifierProjectSettings(
      payload.settings as Record<string, unknown>,
    );
  }

  return parseMagnifierProjectSettings(payload);
}

export function buildRestoredViewState(
  settings: MagnifierProjectSettings,
  viewportWidth: number,
  viewportHeight: number,
  imageWidth: number,
  imageHeight: number,
): MagnifierViewState {
  const fitScale = computeFitScale(
    viewportWidth,
    viewportHeight,
    imageWidth,
    imageHeight,
  );

  return {
    fitScale,
    userZoom: clampZoom(settings.zoomLevel),
    translateX: settings.pan.x,
    translateY: settings.pan.y,
  };
}
