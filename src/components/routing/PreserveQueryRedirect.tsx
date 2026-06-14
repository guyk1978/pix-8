"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface PreserveQueryRedirectProps {
  href: string;
}

export function PreserveQueryRedirect({ href }: PreserveQueryRedirectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    const target = query ? `${href}?${query}` : href;
    router.replace(target);
  }, [href, router, searchParams]);

  return null;
}
