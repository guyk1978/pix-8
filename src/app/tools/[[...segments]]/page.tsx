import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PreserveQueryRedirect } from "@/components/routing/PreserveQueryRedirect";
import {
  buildToolPageMetadata,
  ToolPageContent,
} from "@/lib/toolPage";
import {
  getToolCategoryId,
  getToolRoute,
  isSidebarNavCategoryId,
  SIDEBAR_NAV_CATEGORIES,
} from "@/lib/sidebarNav";
import { SITE_URL } from "@/lib/siteUrl";
import { getToolById, tools, type ToolId } from "@/lib/tools";

interface ToolSegmentsPageProps {
  params: Promise<{ segments?: string[] }>;
}

export function generateStaticParams() {
  const legacy = tools.map((tool) => ({ segments: [tool.id] }));
  const canonical = SIDEBAR_NAV_CATEGORIES.flatMap((category) =>
    category.toolIds.map((toolId) => ({
      segments: [category.id, toolId],
    })),
  );

  return [...legacy, ...canonical];
}

async function resolveToolFromSegments(segments: string[]) {
  if (segments.length === 1) {
    return {
      kind: "legacy" as const,
      tool: getToolById(segments[0] as ToolId),
    };
  }

  if (segments.length === 2) {
    const [category, toolId] = segments;
    const tool = getToolById(toolId as ToolId);

    if (
      !tool ||
      !isSidebarNavCategoryId(category) ||
      getToolCategoryId(tool.id) !== category
    ) {
      return { kind: "canonical" as const, tool: undefined };
    }

    return { kind: "canonical" as const, tool };
  }

  return { kind: "unknown" as const, tool: undefined };
}

export async function generateMetadata({
  params,
}: ToolSegmentsPageProps): Promise<Metadata> {
  const { segments = [] } = await params;
  const resolved = await resolveToolFromSegments(segments);

  if (!resolved.tool) {
    return { title: "Tool not found" };
  }

  if (resolved.kind === "legacy") {
    return {
      ...buildToolPageMetadata(resolved.tool),
      robots: {
        index: false,
        follow: true,
      },
      alternates: {
        canonical: `${SITE_URL}${getToolRoute(resolved.tool.id)}`,
      },
    };
  }

  return buildToolPageMetadata(resolved.tool);
}

export default async function ToolSegmentsPage({ params }: ToolSegmentsPageProps) {
  const { segments = [] } = await params;
  const resolved = await resolveToolFromSegments(segments);

  if (!resolved.tool) {
    notFound();
  }

  if (resolved.kind === "legacy") {
    return (
      <Suspense fallback={null}>
        <PreserveQueryRedirect href={getToolRoute(resolved.tool.id)} />
      </Suspense>
    );
  }

  return <ToolPageContent tool={resolved.tool} />;
}
