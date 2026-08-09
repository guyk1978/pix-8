"use client";

import { usePathname } from "next/navigation";
import { getToolIdFromPathname } from "@/lib/routes";
import type { ToolId } from "@/lib/tools";

export function useActiveToolId(): ToolId | null {
  const pathname = usePathname();
  return getToolIdFromPathname(pathname);
}

export function isToolLinkActive(
  pathname: string,
  _searchParams: URLSearchParams | null,
  toolId: ToolId,
): boolean {
  return getToolIdFromPathname(pathname) === toolId;
}
