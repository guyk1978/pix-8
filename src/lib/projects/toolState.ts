export const TOOL_STATE_VERSION = 1;

export interface ToolProjectPayload extends Record<string, unknown> {
  version: number;
  isResultMarked: boolean;
  settings: Record<string, unknown>;
}

export interface ParsedToolProjectPayload {
  isResultMarked: boolean;
  settings: Record<string, unknown>;
}

export function buildToolProjectPayload(
  isResultMarked: boolean,
  settings: Record<string, unknown>,
): ToolProjectPayload {
  return {
    version: TOOL_STATE_VERSION,
    isResultMarked,
    settings,
  };
}

export function parseToolProjectPayload(
  payload: Record<string, unknown>,
): ParsedToolProjectPayload {
  if (
    payload.version === TOOL_STATE_VERSION &&
    payload.settings &&
    typeof payload.settings === "object"
  ) {
    return {
      isResultMarked:
        typeof payload.isResultMarked === "boolean" ? payload.isResultMarked : false,
      settings: payload.settings as Record<string, unknown>,
    };
  }

  if (payload.settings && typeof payload.settings === "object") {
    const settings = payload.settings as Record<string, unknown>;
    return {
      isResultMarked: resolveLegacyResultMarked(payload, settings),
      settings,
    };
  }

  const { isResultMarked: _marked, resultLocked: _locked, version: _v, ...settings } =
    payload;

  return {
    isResultMarked: resolveLegacyResultMarked(payload, settings),
    settings,
  };
}

function resolveLegacyResultMarked(
  payload: Record<string, unknown>,
  settings: Record<string, unknown>,
): boolean {
  if (typeof payload.isResultMarked === "boolean") {
    return payload.isResultMarked;
  }

  if (typeof payload.resultLocked === "boolean") {
    return payload.resultLocked;
  }

  if (typeof settings.isResultMarked === "boolean") {
    return settings.isResultMarked;
  }

  if (typeof settings.resultLocked === "boolean") {
    return settings.resultLocked;
  }

  return false;
}
