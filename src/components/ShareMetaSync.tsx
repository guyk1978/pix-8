"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
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
  const { language } = useLanguage();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  useEffect(() => {
    const imagePath = getShareHeaderImage(language, isDark);
    const imageUrl = resolveShareImageUrl(imagePath, window.location.origin);
    const theme = getShareTheme(isDark);

    upsertMetaProperty("og:image", imageUrl);
    upsertMetaName("twitter:image", imageUrl);

    const url = withShareParams(
      new URL(window.location.href),
      language,
      theme,
    );
    if (url.href !== window.location.href) {
      window.history.replaceState(null, "", url.href);
    }
  }, [language, isDark]);

  return null;
}
