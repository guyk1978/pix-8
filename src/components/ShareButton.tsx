"use client";

import { Share2 } from "lucide-react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useToast } from "@/components/ui/ToastProvider";

async function copyPageUrl(): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(window.location.href);
    return true;
  } catch {
    return false;
  }
}

export function ShareButton() {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const handleShare = async () => {
    const title = document.title;
    const url = window.location.href;

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, url });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    const copied = await copyPageUrl();
    showToast(
      copied ? t("share.linkCopied") : t("share.couldNotCopy"),
    );
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="flex h-9 w-9 items-center justify-center rounded-sm border border-border bg-background text-muted transition-colors hover:border-muted hover:text-foreground"
      aria-label={t("share.ariaLabel")}
      title={t("share.title")}
    >
      <Share2 className="h-4 w-4" strokeWidth={1.5} aria-hidden />
    </button>
  );
}
