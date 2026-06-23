"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { resolveHomeToolId } from "@/lib/homeTool";
import { getToolIdFromPathname, normalizePathname } from "@/lib/routes";
import type { ToolId } from "@/lib/tools";

export function useActiveToolId(): ToolId | null {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fromPath = getToolIdFromPathname(pathname);
  if (fromPath) return fromPath;

  if (normalizePathname(pathname) === "/") {
    return resolveHomeToolId(searchParams.get("tool"));
  }

  return null;
}

export function isToolLinkActive(
  pathname: string,
  searchParams: URLSearchParams | null,
  toolId: ToolId,
): boolean {
  const fromPath = getToolIdFromPathname(pathname);
  if (fromPath === toolId) return true;

  if (normalizePathname(pathname) === "/") {
    return resolveHomeToolId(searchParams?.get("tool") ?? null) === toolId;
  }

  return false;
}
