"use client";

import {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import { translate, type TranslationParams } from "@/i18n";
import {
  DEFAULT_LANGUAGE,
  getDocumentDirection,
  getStoredLanguage,
  isLanguage,
  storeLanguage,
  type Language,
} from "@/lib/language";

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, params?: TranslationParams) => string;
  dir: "ltr" | "rtl";
  isReady: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function LanguageUrlSync({
  onResolved,
}: {
  onResolved: (language: Language) => void;
}) {
  const searchParams = useSearchParams();

  useLayoutEffect(() => {
    const urlLang = searchParams.get("lang");

    if (isLanguage(urlLang)) {
      onResolved(urlLang);
      storeLanguage(urlLang);
      return;
    }

    const stored = getStoredLanguage();
    onResolved(stored ?? DEFAULT_LANGUAGE);
  }, [onResolved, searchParams]);

  return null;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);
  const [isReady, setIsReady] = useState(false);

  const resolveLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const dir = getDocumentDirection(language);
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language, isReady]);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    storeLanguage(next);
  }, []);

  const t = useCallback(
    (key: string, params?: TranslationParams) => translate(language, key, params),
    [language],
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      dir: getDocumentDirection(language),
      isReady,
    }),
    [language, setLanguage, t, isReady],
  );

  return (
    <LanguageContext.Provider value={value}>
      <Suspense fallback={null}>
        <LanguageUrlSync onResolved={resolveLanguage} />
      </Suspense>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider.");
  }

  return context;
}
