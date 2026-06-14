"use client";

import { AppWindow, Download } from "lucide-react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useToast } from "@/components/ui/ToastProvider";
import { usePwaInstall } from "@/hooks/usePwaInstall";

interface PwaInstallButtonProps {
  className?: string;
}

export function PwaInstallButton({ className = "" }: PwaInstallButtonProps) {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const { mounted, isStandalone, canOpenInstalled, install } = usePwaInstall();

  if (!mounted || isStandalone) {
    return null;
  }

  const tooltip = canOpenInstalled
    ? t("header.openAsApplication")
    : t("header.installAsApplication");

  const handleClick = async () => {
    const outcome = await install();

    if (outcome === "unavailable") {
      showToast(t("home.installAppUnavailable"));
    }
  };

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
      {canOpenInstalled ? (
        <AppWindow className="h-4 w-4" strokeWidth={1.5} aria-hidden />
      ) : (
        <Download className="h-4 w-4" strokeWidth={1.5} aria-hidden />
      )}
    </button>
  );
}
