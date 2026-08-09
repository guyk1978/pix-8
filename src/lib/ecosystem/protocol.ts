/**
 * Cross-origin handoff protocol between Pix-8 and JoinMyPDF.
 * localStorage cannot bridge different origins — use window.open + postMessage.
 */

export const ECOSYSTEM_CHANNEL = "pix8-joinmypdf-ecosystem-v1" as const;

export type EcosystemAppId = "pix-8" | "joinmypdf";

export type EcosystemHandoffFile = {
  name: string;
  type: string;
  lastModified: number;
  buffer: ArrayBuffer;
};

export type EcosystemReadyMessage = {
  channel: typeof ECOSYSTEM_CHANNEL;
  type: "ready";
  app: EcosystemAppId;
};

/** Child asks opener to (re)send the pending handoff after it finishes loading. */
export type EcosystemRequestHandoffMessage = {
  channel: typeof ECOSYSTEM_CHANNEL;
  type: "request-handoff";
  app: EcosystemAppId;
};

export type EcosystemHandoffMessage = {
  channel: typeof ECOSYSTEM_CHANNEL;
  type: "handoff";
  from: EcosystemAppId;
  intent: string;
  files: EcosystemHandoffFile[];
};

export type EcosystemAckMessage = {
  channel: typeof ECOSYSTEM_CHANNEL;
  type: "ack";
  app: EcosystemAppId;
  ok: boolean;
  error?: string;
};

export type EcosystemMessage =
  | EcosystemReadyMessage
  | EcosystemRequestHandoffMessage
  | EcosystemHandoffMessage
  | EcosystemAckMessage;

export const PIX8_PRODUCTION_ORIGINS = [
  "https://pix-8.com",
  "https://www.pix-8.com",
] as const;

export const JOINMYPDF_PRODUCTION_ORIGINS = [
  "https://joinmypdf.com",
  "https://www.joinmypdf.com",
] as const;

const LOG_PREFIX = "[ecosystem]";

export function ecosystemLog(
  level: "log" | "warn" | "error",
  message: string,
  detail?: unknown,
): void {
  if (typeof console === "undefined") return;
  if (detail !== undefined) {
    console[level](LOG_PREFIX, message, detail);
  } else {
    console[level](LOG_PREFIX, message);
  }
}

export function isLocalOrigin(origin: string): boolean {
  return (
    origin.startsWith("http://localhost:") ||
    origin.startsWith("http://127.0.0.1:")
  );
}

export function isAllowedPartnerOrigin(
  origin: string,
  partner: EcosystemAppId,
): boolean {
  if (isLocalOrigin(origin)) return true;
  const list =
    partner === "pix-8" ? PIX8_PRODUCTION_ORIGINS : JOINMYPDF_PRODUCTION_ORIGINS;
  return (list as readonly string[]).includes(origin);
}

export function isEcosystemMessage(data: unknown): data is EcosystemMessage {
  if (!data || typeof data !== "object") return false;
  const msg = data as Partial<EcosystemMessage>;
  return (
    msg.channel === ECOSYSTEM_CHANNEL &&
    (msg.type === "ready" ||
      msg.type === "request-handoff" ||
      msg.type === "handoff" ||
      msg.type === "ack")
  );
}

export async function fileToHandoffPayload(
  file: File,
): Promise<EcosystemHandoffFile> {
  const buffer = await file.arrayBuffer();
  return {
    name: file.name,
    type: file.type || "application/octet-stream",
    lastModified: file.lastModified,
    buffer,
  };
}

export function handoffPayloadToFile(payload: EcosystemHandoffFile): File {
  return new File([payload.buffer], payload.name, {
    type: payload.type,
    lastModified: payload.lastModified,
  });
}

function stripTrailingSlash(url: string): string {
  return url.replace(/\/$/, "");
}

function isCurrentOriginLocal(): boolean {
  return (
    typeof window !== "undefined" && isLocalOrigin(window.location.origin)
  );
}

/**
 * Prefer NEXT_PUBLIC_JOINMYPDF_URL; otherwise local vs production fallback.
 */
export function resolveJoinMyPdfBaseUrl(): string {
  const override = process.env.NEXT_PUBLIC_JOINMYPDF_URL?.trim();
  if (override) return stripTrailingSlash(override);
  return isCurrentOriginLocal()
    ? "http://localhost:3000"
    : "https://joinmypdf.com";
}

/**
 * Prefer NEXT_PUBLIC_PIX8_URL; otherwise local vs production fallback.
 */
export function resolvePix8BaseUrl(): string {
  const override = process.env.NEXT_PUBLIC_PIX8_URL?.trim();
  if (override) return stripTrailingSlash(override);
  return isCurrentOriginLocal()
    ? "http://localhost:3003"
    : "https://pix-8.com";
}

export function buildJoinMyPdfHandoffUrl(intent: string, locale = "en"): string {
  const base = resolveJoinMyPdfBaseUrl();
  const tool = intent.replace(/^\//, "").replace(/\/$/, "") || "jpg-to-pdf";
  const slug = tool.startsWith("tools/") ? tool.slice("tools/".length) : tool;
  // JoinMyPDF uses trailingSlash: false — a trailing slash causes a redirect
  // that drops early postMessage deliveries.
  return `${base}/${locale}/tools/${slug}?ecosystem=1&from=pix-8`;
}

export function buildPix8HandoffUrl(locale = "en"): string {
  const base = resolvePix8BaseUrl();
  const lang = locale === "he" ? "he" : "en";
  return `${base}/?lang=${lang}&ecosystem=1&from=joinmypdf`;
}

export class EcosystemPopupBlockedError extends Error {
  readonly code = "POPUP_BLOCKED" as const;
  readonly fallbackUrl: string;
  readonly partnerLabel: string;

  constructor(fallbackUrl: string, partnerLabel: string) {
    super(
      `Popup blocked — allow popups for this site to send files to ${partnerLabel}.`,
    );
    this.name = "EcosystemPopupBlockedError";
    this.fallbackUrl = fallbackUrl;
    this.partnerLabel = partnerLabel;
  }
}

export function isPopupBlockedError(
  error: unknown,
): error is EcosystemPopupBlockedError {
  return (
    error instanceof EcosystemPopupBlockedError ||
    (typeof error === "object" &&
      error !== null &&
      (error as { code?: string }).code === "POPUP_BLOCKED")
  );
}
