"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DashboardHome } from "@/components/dashboard/DashboardHome";
import { SplashPage } from "@/components/SplashPage";
import { getStoredLanguage, isLanguage } from "@/lib/language";

export function HomeEntry() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lang = searchParams.get("lang");
  const [bootstrapping, setBootstrapping] = useState(!isLanguage(lang));

  useEffect(() => {
    if (isLanguage(lang)) {
      setBootstrapping(false);
      return;
    }

    const stored = getStoredLanguage();
    if (!stored) {
      setBootstrapping(false);
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", stored);
    router.replace(`/?${params.toString()}`);
  }, [lang, router, searchParams]);

  if (isLanguage(lang)) {
    return <DashboardHome />;
  }

  if (bootstrapping) {
    return null;
  }

  return <SplashPage />;
}
