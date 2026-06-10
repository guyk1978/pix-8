import Link from "next/link";

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-medium text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isInternal = href.startsWith("/");
      if (isInternal) {
        return (
          <Link
            key={index}
            href={href}
            className="text-foreground underline decoration-border underline-offset-2 hover:decoration-muted"
          >
            {label}
          </Link>
        );
      }
      return (
        <a
          key={index}
          href={href}
          className="text-foreground underline decoration-border underline-offset-2 hover:decoration-muted"
          rel="noopener noreferrer"
          target="_blank"
        >
          {label}
        </a>
      );
    }

    return <span key={index}>{part}</span>;
  });
}

function renderTable(block: string) {
  const rows = block
    .trim()
    .split("\n")
    .filter((line) => line.trim().startsWith("|"));

  if (rows.length < 2) return null;

  const parseRow = (row: string) =>
    row
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim());

  const header = parseRow(rows[0]);
  const bodyRows = rows.slice(2).map(parseRow);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr>
            {header.map((cell) => (
              <th
                key={cell}
                className="border border-border bg-card-hover px-3 py-2 text-left font-label text-muted"
              >
                {renderInline(cell)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((row) => (
            <tr key={row.join("-")}>
              {row.map((cell) => (
                <td
                  key={cell}
                  className="border border-border px-3 py-2 text-muted"
                >
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface ArticleBodyProps {
  content: string;
}

export function ArticleBody({ content }: ArticleBodyProps) {
  const blocks = content.split("\n\n");

  return (
    <div className="mt-6 space-y-4 text-sm leading-relaxed">
      {blocks.map((block, index) => {
        const trimmed = block.trim();
        if (!trimmed || trimmed === "---") return null;

        if (trimmed.startsWith("# ")) {
          return (
            <h2 key={index} className="text-xl font-medium text-foreground">
              {trimmed.replace(/^# /, "")}
            </h2>
          );
        }

        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={index} className="pt-2 font-label text-foreground">
              {trimmed.replace(/^## /, "")}
            </h2>
          );
        }

        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={index} className="pt-1 text-sm font-medium text-foreground">
              {trimmed.replace(/^### /, "")}
            </h3>
          );
        }

        if (trimmed.startsWith("|")) {
          return <div key={index}>{renderTable(trimmed)}</div>;
        }

        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          return (
            <ul
              key={index}
              className="list-inside list-disc space-y-1 text-muted"
            >
              {trimmed.split("\n").map((item) => (
                <li key={item}>
                  {renderInline(item.replace(/^[-*] /, ""))}
                </li>
              ))}
            </ul>
          );
        }

        if (/^\d+\.\s/.test(trimmed)) {
          return (
            <ol
              key={index}
              className="list-inside list-decimal space-y-1 text-muted"
            >
              {trimmed.split("\n").map((item) => (
                <li key={item}>
                  {renderInline(item.replace(/^\d+\.\s/, ""))}
                </li>
              ))}
            </ol>
          );
        }

        if (trimmed.startsWith("*") && trimmed.endsWith("*")) {
          return (
            <p key={index} className="border-l-2 border-border pl-4 italic text-muted">
              {renderInline(trimmed.replace(/^\*|\*$/g, ""))}
            </p>
          );
        }

        return (
          <p key={index} className="text-muted">
            {renderInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
