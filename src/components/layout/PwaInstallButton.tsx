"use client";

import { AppWindow, Download } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

function isStandaloneDisplay(): boolean {
  if (typeof window === "undefined") return false;

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in window.navigator &&
      (window.navigator as Navigator & { standalone?: boolean }).standalone ===
        true)
  );
}

interface PwaInstallButtonProps {
  className?: string;
}

export function PwaInstallButton({ className = "" }: PwaInstallButtonProps) {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    setMounted(true);

    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker.register("/sw.js").catch(() => {
        // Non-fatal — install prompt may still appear on supporting browsers.
      });
    }

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

  const handleClick = useCallback(async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;

      if (choice.outcome === "accepted") {
        setIsInstalled(true);
      }

      setDeferredPrompt(null);
      return;
    }

    if (isInstalled) {
      const launchUrl = `${window.location.origin}/`;

      if (isStandaloneDisplay()) {
        window.location.assign(launchUrl);
        return;
      }

      window.open(launchUrl, "_blank", "noopener,noreferrer");
    }
  }, [deferredPrompt, isInstalled]);

  if (!mounted) {
    return null;
  }

  if (isStandaloneDisplay()) {
    return null;
  }

  const canInstall = Boolean(deferredPrompt);
  const canOpenInstalled = isInstalled && !canInstall;

  if (!canInstall && !canOpenInstalled) {
    return null;
  }

  const tooltip = canInstall
    ? t("header.installAsApplication")
    : t("header.openAsApplication");

  return (
    <button
      type="button"
      onClick={() => void handleClick()}
      className={
        className ||
        "flex h-9 w-9 items-center justify-center rounded-sm border border-border bg-background text-muted transition-colors hover:border-muted hover:text-foreground"
      }
      aria-label={tooltip}
      title={tooltip}
    >
      {canInstall ? (
        <Download className="h-4 w-4" strokeWidth={1.5} aria-hidden />
      ) : (
        <AppWindow className="h-4 w-4" strokeWidth={1.5} aria-hidden />
      )}
    </button>
  );
}
