/**
 * Pix-8 side of the ecosystem bridge: receive JoinMyPDF handoffs and helpers
 * to export the current canvas into JoinMyPDF tools.
 */

import { canvasToBlob, buildDownloadFilename } from "@/hooks/useImageProcessor";
import {
  announceEcosystemReady,
  sendFilesToJoinMyPdf,
} from "@/lib/ecosystem/sendHandoff";
import {
  ECOSYSTEM_CHANNEL,
  handoffPayloadToFile,
  isAllowedPartnerOrigin,
  isEcosystemMessage,
  type EcosystemAckMessage,
  type EcosystemHandoffMessage,
} from "@/lib/ecosystem/protocol";
import {
  clearPix8PendingUpload,
  consumePix8PendingUpload,
  writePix8PendingUpload,
} from "@/lib/ecosystem/pendingUpload";

export const PIX8_HANDOFF_EVENT = "pix8:ecosystem-handoff";

export function consumeStoredHandoffFiles(): File[] | null {
  return consumePix8PendingUpload();
}

function postAck(target: Window, origin: string, ok: boolean, error?: string) {
  const message: EcosystemAckMessage = {
    channel: ECOSYSTEM_CHANNEL,
    type: "ack",
    app: "pix-8",
    ok,
    error,
  };
  target.postMessage(message, origin);
}

function isHandoffLanding(): boolean {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  return (
    params.get("ecosystem") === "1" || params.get("ecosystemHandoff") === "1"
  );
}

async function handleIncomingHandoff(
  message: EcosystemHandoffMessage,
  event: MessageEvent,
): Promise<void> {
  if (message.from !== "joinmypdf") return;
  if (!isAllowedPartnerOrigin(event.origin, "joinmypdf")) return;

  const sourceWindow = event.source as Window | null;
  try {
    const files = message.files.map(handoffPayloadToFile);
    if (!files.length) throw new Error("Empty handoff");
    await writePix8PendingUpload(files);
    if (sourceWindow) postAck(sourceWindow, event.origin, true);
    window.dispatchEvent(new CustomEvent(PIX8_HANDOFF_EVENT));

    const url = new URL(window.location.href);
    url.searchParams.delete("ecosystem");
    url.searchParams.delete("ecosystemHandoff");
    url.searchParams.delete("from");
    url.searchParams.delete("intent");
    if (!url.searchParams.get("lang")) url.searchParams.set("lang", "en");
    window.history.replaceState(null, "", url.toString());
  } catch (error) {
    if (sourceWindow) {
      postAck(
        sourceWindow,
        event.origin,
        false,
        error instanceof Error ? error.message : "handoff_failed",
      );
    }
  }
}

/** Start listening for JoinMyPDF → Pix-8 handoffs. Returns cleanup. */
export function startPix8EcosystemBridge(): () => void {
  if (typeof window === "undefined") return () => undefined;

  if (isHandoffLanding()) {
    announceEcosystemReady("pix-8");
  }

  const onMessage = (event: MessageEvent) => {
    if (!isEcosystemMessage(event.data)) return;
    if (event.data.type !== "handoff") return;
    void handleIncomingHandoff(event.data, event);
  };

  window.addEventListener("message", onMessage);
  return () => window.removeEventListener("message", onMessage);
}

export async function sendCanvasToJoinMyPdf(options: {
  canvas: HTMLCanvasElement;
  filename: string;
  mimeType?: "image/png" | "image/jpeg";
  intent?: string;
  locale?: string;
}): Promise<void> {
  const format = options.mimeType === "image/jpeg" ? "jpeg" : "png";
  const blob = await canvasToBlob(options.canvas, format, 0.92);
  const name = buildDownloadFilename(
    options.filename.replace(/\.[^.]+$/, "") || "pix8-export",
    format,
  );
  const file = new File([blob], name, {
    type: options.mimeType ?? "image/png",
    lastModified: Date.now(),
  });

  const intent =
    options.intent === "pdf-merge" || options.intent === "merge-pdf"
      ? "pdf-merge"
      : (options.intent ?? "jpg-to-pdf");

  await sendFilesToJoinMyPdf({
    files: [file],
    intent,
    locale: options.locale ?? "en",
  });
}

export { clearPix8PendingUpload };
