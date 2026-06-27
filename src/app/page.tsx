import { SplashPage } from "@/components/SplashPage";
import { DashboardHome } from "@/components/dashboard/DashboardHome";
import { isLanguage } from "@/lib/language";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;

  if (isLanguage(lang)) {
    return <DashboardHome />;
  }

  return <SplashPage />;
}
