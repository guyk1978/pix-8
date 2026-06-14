"use client";

import { useCallback, useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export type PwaInstallOutcome =
  | "accepted"
  | "dismissed"
  | "opened"
  | "unavailable";

function isStandaloneDisplay(): boolean {
  if (typeof window === "undefined") return false;

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in window.navigator &&
      (window.navigator as Navigator & { standalone?: boolean }).standalone ===
        true)
  );
}

export function registerPwaServiceWorker(): void {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

  void navigator.serviceWorker.register("/sw.js").catch(() => {
    // Non-fatal — install prompt may still appear on supporting browsers.
  });
}

export function usePwaInstall() {
  const [mounted, setMounted] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    setMounted(true);
    registerPwaServiceWorker();

    if (isStandaloneDisplay()) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const install = useCallback(async (): Promise<PwaInstallOutcome> => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;

      setDeferredPrompt(null);

      if (choice.outcome === "accepted") {
        setIsInstalled(true);
        return "accepted";
      }

      return "dismissed";
    }

    if (isInstalled) {
      const launchUrl = `${window.location.origin}/`;

      if (isStandaloneDisplay()) {
        window.location.assign(launchUrl);
      } else {
        window.open(launchUrl, "_blank", "noopener,noreferrer");
      }

      return "opened";
    }

    return "unavailable";
  }, [deferredPrompt, isInstalled]);

  const isStandalone = mounted && isStandaloneDisplay();
  const canInstall = Boolean(deferredPrompt);
  const canOpenInstalled = isInstalled && !canInstall;

  return {
    mounted,
    isStandalone,
    canInstall,
    canOpenInstalled,
    install,
  };
}
