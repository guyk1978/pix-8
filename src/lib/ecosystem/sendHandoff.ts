import {
  ECOSYSTEM_CHANNEL,
  EcosystemPopupBlockedError,
  buildJoinMyPdfHandoffUrl,
  buildPix8HandoffUrl,
  ecosystemLog,
  fileToHandoffPayload,
  isAllowedPartnerOrigin,
  isEcosystemMessage,
  type EcosystemAppId,
  type EcosystemHandoffMessage,
  type EcosystemReadyMessage,
  type EcosystemRequestHandoffMessage,
} from "@/lib/ecosystem/protocol";

const READY_WAIT_MS = 8_000;
const READY_RETRY_MS = [50, 200, 500, 1000, 2000, 4000, 7000] as const;
const HANDOFF_RETRY_MS = [0, 300, 800, 1600, 3000, 5000] as const;

type PendingDelivery = {
  message: EcosystemHandoffMessage;
  targetOrigin: string;
  child: Window;
};

let pendingDelivery: PendingDelivery | null = null;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function postHandoff(delivery: PendingDelivery, reason: string): void {
  if (delivery.child.closed) {
    ecosystemLog("warn", "cannot post handoff — child closed", reason);
    return;
  }
  try {
    delivery.child.postMessage(delivery.message, delivery.targetOrigin);
    ecosystemLog("log", "postMessage(handoff) sent", {
      reason,
      targetOrigin: delivery.targetOrigin,
      intent: delivery.message.intent,
      fileCount: delivery.message.files.length,
    });
  } catch (error) {
    ecosystemLog("error", "postMessage(handoff) threw", error);
  }
}

function waitForPartnerSignal(
  target: Window,
  expectedApp: EcosystemAppId,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => {
      window.removeEventListener("message", onMessage);
      reject(new Error(`ready-timeout:${expectedApp}`));
    }, READY_WAIT_MS);

    function onMessage(event: MessageEvent) {
      if (!isEcosystemMessage(event.data)) return;
      if (
        event.data.type !== "ready" &&
        event.data.type !== "request-handoff"
      ) {
        return;
      }
      if (event.data.app !== expectedApp) return;
      if (!isAllowedPartnerOrigin(event.origin, expectedApp)) {
        ecosystemLog("warn", "partner signal from disallowed origin", event.origin);
        return;
      }

      ecosystemLog("log", `partner signal: ${event.data.type}`, event.origin);

      // If we already have a pending payload, answer pull requests immediately.
      if (
        event.data.type === "request-handoff" &&
        pendingDelivery &&
        !pendingDelivery.child.closed
      ) {
        pendingDelivery.targetOrigin = event.origin;
        postHandoff(pendingDelivery, "request-handoff");
      }

      window.clearTimeout(timer);
      window.removeEventListener("message", onMessage);
      resolve(event.origin);
    }

    window.addEventListener("message", onMessage);
  });
}

/**
 * Keep answering late request-handoff signals until ack or timeout.
 */
function watchForPullRequests(
  expectedApp: EcosystemAppId,
  delivery: PendingDelivery,
): () => void {
  const onMessage = (event: MessageEvent) => {
    if (!isEcosystemMessage(event.data)) return;
    if (event.data.type !== "request-handoff") return;
    if (event.data.app !== expectedApp) return;
    if (!isAllowedPartnerOrigin(event.origin, expectedApp)) return;
    delivery.targetOrigin = event.origin;
    postHandoff(delivery, "late-request-handoff");
  };
  window.addEventListener("message", onMessage);
  return () => window.removeEventListener("message", onMessage);
}

async function openAndDeliverHandoff(options: {
  targetUrl: string;
  partner: EcosystemAppId;
  from: EcosystemAppId;
  intent: string;
  prepareFiles: () => Promise<File[]>;
  child?: Window | null;
}): Promise<void> {
  const { targetUrl, partner, from, intent } = options;
  const partnerLabel = partner === "pix-8" ? "Pix-8" : "JoinMyPDF";
  const inferredOrigin = new URL(targetUrl).origin;

  ecosystemLog("log", "handoff start", {
    targetUrl,
    partner,
    from,
    intent,
    inferredOrigin,
  });

  let child =
    options.child && !options.child.closed ? options.child : null;

  if (!child) {
    child = window.open(targetUrl, "_blank");
  }

  if (!child) {
    ecosystemLog("warn", "window.open returned null (popup blocked)", targetUrl);
    throw new EcosystemPopupBlockedError(targetUrl, partnerLabel);
  }

  ecosystemLog("log", "popup opened", targetUrl);

  const signalPromise = waitForPartnerSignal(child, partner);

  try {
    const files = await options.prepareFiles();
    if (!files.length) throw new Error("No files to hand off.");

    ecosystemLog("log", "files prepared", {
      count: files.length,
      names: files.map((file) => file.name),
      sizes: files.map((file) => file.size),
    });

    const payloads = await Promise.all(files.map(fileToHandoffPayload));
    const message: EcosystemHandoffMessage = {
      channel: ECOSYSTEM_CHANNEL,
      type: "handoff",
      from,
      intent,
      files: payloads,
    };

    let targetOrigin = inferredOrigin;
    try {
      targetOrigin = await signalPromise;
    } catch (error) {
      ecosystemLog(
        "warn",
        "partner signal not received — posting with inferred origin",
        { inferredOrigin, error },
      );
    }

    const delivery: PendingDelivery = { message, targetOrigin, child };
    pendingDelivery = delivery;
    const stopPullWatch = watchForPullRequests(partner, delivery);

    try {
      for (const delay of HANDOFF_RETRY_MS) {
        if (delay) await sleep(delay);
        if (child.closed) {
          throw new Error(`${partnerLabel} window was closed before handoff.`);
        }
        postHandoff(delivery, `retry-${delay}ms`);
      }
    } finally {
      window.setTimeout(() => {
        stopPullWatch();
        if (pendingDelivery === delivery) pendingDelivery = null;
      }, 15_000);
    }
  } catch (error) {
    ecosystemLog("error", "handoff failed", error);
    throw error;
  }
}

export async function sendFilesToJoinMyPdf(options: {
  files?: File[];
  prepareFiles?: () => Promise<File[]>;
  intent?: string;
  locale?: string;
  child?: Window | null;
}): Promise<void> {
  const intent = options.intent ?? "jpg-to-pdf";
  const url = buildJoinMyPdfHandoffUrl(intent, options.locale ?? "en");
  await openAndDeliverHandoff({
    targetUrl: url,
    partner: "joinmypdf",
    from: "pix-8",
    intent,
    child: options.child,
    prepareFiles:
      options.prepareFiles ??
      (async () => {
        if (!options.files?.length) {
          throw new Error("No files to hand off.");
        }
        return options.files;
      }),
  });
}

export async function sendFilesToPix8(options: {
  files?: File[];
  prepareFiles?: () => Promise<File[]>;
  intent?: string;
  locale?: string;
  child?: Window | null;
}): Promise<void> {
  const intent = options.intent ?? "editor";
  const url = buildPix8HandoffUrl(options.locale ?? "en");
  await openAndDeliverHandoff({
    targetUrl: url,
    partner: "pix-8",
    from: "joinmypdf",
    intent,
    child: options.child,
    prepareFiles:
      options.prepareFiles ??
      (async () => {
        if (!options.files?.length) {
          throw new Error("No files to hand off.");
        }
        return options.files;
      }),
  });
}

/**
 * Announce readiness + explicitly request the pending handoff from opener.
 * Retries survive parent timing and trailing-slash redirects.
 */
export function announceEcosystemReady(app: EcosystemAppId): () => void {
  if (typeof window === "undefined") return () => undefined;

  const opener = window.opener as Window | null;
  if (!opener || opener.closed) {
    ecosystemLog("log", "skip ready announce — no opener", app);
    return () => undefined;
  }

  const ready: EcosystemReadyMessage = {
    channel: ECOSYSTEM_CHANNEL,
    type: "ready",
    app,
  };
  const request: EcosystemRequestHandoffMessage = {
    channel: ECOSYSTEM_CHANNEL,
    type: "request-handoff",
    app,
  };

  const send = () => {
    if (opener.closed) return;
    ecosystemLog("log", "announce ready + request-handoff → opener", app);
    try {
      opener.postMessage(ready, "*");
      opener.postMessage(request, "*");
    } catch (error) {
      ecosystemLog("warn", "ready/request announce failed", error);
    }
  };

  send();
  const timers = READY_RETRY_MS.map((ms) => window.setTimeout(send, ms));
  return () => {
    for (const id of timers) window.clearTimeout(id);
  };
}
