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
    (msg.type === "ready" || msg.type === "handoff" || msg.type === "ack")
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

export function resolveJoinMyPdfBaseUrl(): string {
  if (typeof window !== "undefined" && isLocalOrigin(window.location.origin)) {
    const override = process.env.NEXT_PUBLIC_JOINMYPDF_URL;
    if (override) return override.replace(/\/$/, "");
    // Common local JoinMyPDF ports when Pix-8 occupies 3003.
    return "http://localhost:3000";
  }
  return "https://joinmypdf.com";
}

export function resolvePix8BaseUrl(): string {
  if (typeof window !== "undefined" && isLocalOrigin(window.location.origin)) {
    const override = process.env.NEXT_PUBLIC_PIX8_URL;
    if (override) return override.replace(/\/$/, "");
    return "http://localhost:3003";
  }
  return "https://pix-8.com";
}

export function buildJoinMyPdfHandoffUrl(intent: string, locale = "en"): string {
  const base = resolveJoinMyPdfBaseUrl();
  const tool = intent.replace(/^\//, "").replace(/\/$/, "") || "jpg-to-pdf";
  const slug = tool.startsWith("tools/") ? tool.slice("tools/".length) : tool;
  return `${base}/${locale}/tools/${slug}/?ecosystem=1&from=pix-8`;
}

export function buildPix8HandoffUrl(): string {
  const base = resolvePix8BaseUrl();
  return `${base}/?lang=en&ecosystem=1&from=joinmypdf`;
}
