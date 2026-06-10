import type { Metadata } from "next";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { BlogManager } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides and deep-dives on privacy-first, client-side image processing.",
};

export default function BlogPage() {
  const articles = BlogManager.getAllArticles();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <section className="mb-10 space-y-3">
        <p className="font-label text-muted">Blog</p>
        <h1 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          Guides & deep-dives
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          Long-form articles on privacy, performance, and how each pix-8 tool
          works — all processing stays in your browser.
        </p>
      </section>

      {articles.length === 0 ? (
        <div className="flex min-h-40 items-center justify-center border border-dashed border-[#333] bg-[#161616] p-8 text-center">
          <p className="text-sm text-muted">
            No articles yet. Add markdown files to{" "}
            <code className="font-mono text-xs">src/content/articles/</code>.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
