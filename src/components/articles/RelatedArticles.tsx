import Link from "next/link";
import type { Article } from "@/lib/blog";

interface RelatedArticlesProps {
  articles: Article[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-8 border-t border-[#333] pt-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-label text-foreground">Related Articles</h2>
        <span className="font-mono text-xs text-muted">
          {articles.length} article{articles.length === 1 ? "" : "s"}
        </span>
      </div>

      <ul className="space-y-3">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link
              href={`/articles/${article.slug}`}
              className="group block border border-[#333] bg-[#161616] p-4 transition-colors hover:border-muted hover:bg-[#1a1a1a]"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-medium text-foreground transition-colors group-hover:text-foreground">
                  {article.title}
                </h3>
                <time
                  dateTime={article.date}
                  className="font-mono text-[10px] text-muted"
                >
                  {article.date}
                </time>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {article.excerpt}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
