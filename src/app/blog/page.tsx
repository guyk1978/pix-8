import type { Metadata } from "next";
import { BlogPageContent } from "@/components/articles/BlogPageContent";
import { BlogManager } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides and deep-dives on privacy-first, client-side image processing.",
};

export default function BlogPage() {
  const articlesEn = BlogManager.getAllArticles("en");
  const articlesHe = BlogManager.getAllArticles("he");

  return (
    <BlogPageContent articlesEn={articlesEn} articlesHe={articlesHe} />
  );
}
