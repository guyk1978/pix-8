import { Suspense } from "react";
import { HomeEntry } from "@/components/HomeEntry";
import { SplashPage } from "@/components/SplashPage";

export default function Home() {
  return (
    <Suspense fallback={<SplashPage />}>
      <HomeEntry />
    </Suspense>
  );
}
