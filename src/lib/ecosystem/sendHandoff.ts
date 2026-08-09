import {
  ECOSYSTEM_CHANNEL,
  buildJoinMyPdfHandoffUrl,
  buildPix8HandoffUrl,
  fileToHandoffPayload,
  isAllowedPartnerOrigin,
  isEcosystemMessage,
  type EcosystemAppId,
  type EcosystemHandoffMessage,
  type EcosystemReadyMessage,
} from "@/lib/ecosystem/protocol";

const READY_TIMEOUT_MS = 20_000;

function waitForReady(
  target: Window,
  expectedApp: EcosystemAppId,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => {
      window.removeEventListener("message", onMessage);
      reject(new Error("Partner app did not become ready in time."));
    }, READY_TIMEOUT_MS);

    function onMessage(event: MessageEvent) {
      if (!isEcosystemMessage(event.data)) return;
      if (event.data.type !== "ready") return;
      if (event.data.app !== expectedApp) return;
      if (!isAllowedPartnerOrigin(event.origin, expectedApp)) return;
      if (event.source !== target) return;

      window.clearTimeout(timer);
      window.removeEventListener("message", onMessage);
      resolve(event.origin);
    }

    window.addEventListener("message", onMessage);
  });
}

async function sendHandoffToWindow(options: {
  targetUrl: string;
  partner: EcosystemAppId;
  from: EcosystemAppId;
  intent: string;
  files: File[];
}): Promise<void> {
  const payloads = await Promise.all(options.files.map(fileToHandoffPayload));
  const child = window.open(options.targetUrl, "_blank");
  if (!child) {
    throw new Error("Popup blocked — allow popups to send files to the partner app.");
  }

  const targetOrigin = await waitForReady(child, options.partner);

  const message: EcosystemHandoffMessage = {
    channel: ECOSYSTEM_CHANNEL,
    type: "handoff",
    from: options.from,
    intent: options.intent,
    files: payloads,
  };

  const transferables = payloads.map((file) => file.buffer);
  child.postMessage(message, targetOrigin, transferables);
}

/** Open JoinMyPDF tool and deliver image files via postMessage. */
export async function sendFilesToJoinMyPdf(options: {
  files: File[];
  intent?: string;
  locale?: string;
}): Promise<void> {
  const intent = options.intent ?? "jpg-to-pdf";
  const url = buildJoinMyPdfHandoffUrl(intent, options.locale ?? "en");
  await sendHandoffToWindow({
    targetUrl: url,
    partner: "joinmypdf",
    from: "pix-8",
    intent,
    files: options.files,
  });
}

/** Open Pix-8 studio and deliver image files via postMessage. */
export async function sendFilesToPix8(options: {
  files: File[];
  intent?: string;
}): Promise<void> {
  await sendHandoffToWindow({
    targetUrl: buildPix8HandoffUrl(),
    partner: "pix-8",
    from: "joinmypdf",
    intent: options.intent ?? "editor",
    files: options.files,
  });
}

/** Announce readiness to opener (call once on partner landing pages). */
export function announceEcosystemReady(app: EcosystemAppId): void {
  if (typeof window === "undefined") return;
  const opener = window.opener as Window | null;
  if (!opener || opener.closed) return;

  const message: EcosystemReadyMessage = {
    channel: ECOSYSTEM_CHANNEL,
    type: "ready",
    app,
  };

  // Opener may be localhost or production — try both via '*' only after
  // verifying ecosystem query flag is present (caller responsibility).
  opener.postMessage(message, "*");
}
