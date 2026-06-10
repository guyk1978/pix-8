"use client";

import { Share2 } from "lucide-react";
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
    showToast(copied ? "Link copied!" : "Could not copy link");
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="flex h-9 w-9 items-center justify-center rounded-sm border border-border bg-background text-muted transition-colors hover:border-muted hover:text-foreground"
      aria-label="Share this page"
      title="Share"
    >
      <Share2 className="h-4 w-4" strokeWidth={1.5} aria-hidden />
    </button>
  );
}
