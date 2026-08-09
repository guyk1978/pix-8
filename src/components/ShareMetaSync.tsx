"use client";

import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { isSplashEntry } from "@/lib/routes";
import {
  getShareHeaderImage,
  getShareTheme,
  resolveShareImageUrl,
  withShareParams,
} from "@/lib/shareImages";

function upsertMetaProperty(property: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(
    `meta[property="${property}"]`,
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertMetaName(name: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

export function ShareMetaSync() {
  const { language, isReady } = useLanguage();
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const isDark = resolvedTheme !== "light";

  useEffect(() => {
    if (!isReady) return;

    const imagePath = getShareHeaderImage(language, isDark);
    const imageUrl = resolveShareImageUrl(imagePath, window.location.origin);
    const theme = getShareTheme(isDark);

    upsertMetaProperty("og:image", imageUrl);
    upsertMetaName("twitter:image", imageUrl);

    const current = new URL(window.location.href);
    if (isSplashEntry(pathname, current.searchParams.get("lang"))) {
      return;
    }

    const url = withShareParams(current, language, theme);
    if (url.href !== window.location.href) {
      window.history.replaceState(null, "", url.href);
    }
  }, [language, isDark, pathname, isReady]);

  return null;
}
