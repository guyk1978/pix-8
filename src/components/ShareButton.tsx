"use client";

import { Share2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useToast } from "@/components/ui/ToastProvider";
import { buildShareablePageUrl, getShareTheme } from "@/lib/shareImages";

async function copyUrl(url: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch {
    return false;
  }
}

interface ShareButtonProps {
  className?: string;
}

export function ShareButton({ className = "" }: ShareButtonProps) {
  const { language, t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const { showToast } = useToast();

  const handleShare = async () => {
    const title = document.title;
    const isDark = resolvedTheme !== "light";
    const url = buildShareablePageUrl(
      window.location.href,
      language,
      getShareTheme(isDark),
    );

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

    const copied = await copyUrl(url);
    showToast(
      copied ? t("share.linkCopied") : t("share.couldNotCopy"),
    );
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className={
        className ||
        "flex h-9 w-9 items-center justify-center rounded-sm border border-border bg-background text-muted transition-colors hover:border-muted hover:text-foreground"
      }
      aria-label={t("share.ariaLabel")}
      title={t("share.title")}
    >
      <Share2 className="h-4 w-4" strokeWidth={1.5} aria-hidden />
    </button>
  );
}
