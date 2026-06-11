import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolCategoryJsonLd } from "@/components/tools/ToolCategoryJsonLd";
import { ToolCategoryPageContent } from "@/components/tools/ToolCategoryPageContent";
import {
  isToolCategoryId,
  TOOL_CATEGORY_SEO,
} from "@/lib/toolCategoryPages";
import { SIDEBAR_CATEGORY_IDS } from "@/lib/sidebarNav";

interface ToolCategoryPageProps {
  params: Promise<{ categoryId: string }>;
}

export function generateStaticParams() {
  return SIDEBAR_CATEGORY_IDS.map((categoryId) => ({ categoryId }));
}

export async function generateMetadata({
  params,
}: ToolCategoryPageProps): Promise<Metadata> {
  const { categoryId } = await params;

  if (!isToolCategoryId(categoryId)) {
    return { title: "Category" };
  }

  const seo = TOOL_CATEGORY_SEO[categoryId];

  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
    },
  };
}

export default async function ToolCategoryPage({ params }: ToolCategoryPageProps) {
  const { categoryId } = await params;

  if (!isToolCategoryId(categoryId)) {
    notFound();
  }

  return (
    <>
      <ToolCategoryJsonLd categoryId={categoryId} />
      <ToolCategoryPageContent categoryId={categoryId} />
    </>
  );
}
