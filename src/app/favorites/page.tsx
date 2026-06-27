import { Suspense } from "react";
import { PreserveQueryRedirect } from "@/components/routing/PreserveQueryRedirect";

export default function FavoritesRedirectPage() {
  return (
    <Suspense fallback={null}>
      <PreserveQueryRedirect href="/" />
    </Suspense>
  );
}
