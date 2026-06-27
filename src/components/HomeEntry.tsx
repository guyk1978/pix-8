"use client";

import { useSearchParams } from "next/navigation";
import { DashboardHome } from "@/components/dashboard/DashboardHome";
import { SplashPage } from "@/components/SplashPage";
import { isLanguage } from "@/lib/language";

export function HomeEntry() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");

  if (isLanguage(lang)) {
    return <DashboardHome />;
  }

  return <SplashPage />;
}
