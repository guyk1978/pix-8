import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { getAllArticles } from "../src/lib/blog";
import { dashboardSections, tools, type ToolCategory } from "../src/lib/tools";

const OUTPUT_DIR = "local";
const OUTPUT_FILE = join(OUTPUT_DIR, "inventory.html");
const DEV_BASE = "http://localhost:3000";

const categoryLabels: Record<ToolCategory, string> = {
  "basic-editing": "Basic Editing",
  optimization: "Optimization",
  advanced: "Advanced",
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(value: string): string {
  return escapeHtml(value).replace(/'/g, "&#39;");
}

function renderCopyButton(names: string[], label: string): string {
  if (names.length === 0) return "";

  return `<button type="button" class="copy-btn" data-names="${escapeAttr(JSON.stringify(names))}" title="${escapeHtml(label)}">${escapeHtml(label)}</button>`;
}

function renderToolsSection(): string {
  return dashboardSections
    .map((section) => {
      const sectionTools = tools.filter((tool) =>
        section.categories.includes(tool.category),
      );

      const rows = sectionTools
        .map(
          (tool) => `
        <tr>
          <td><a href="${DEV_BASE}${tool.href}">${escapeHtml(tool.name)}</a></td>
          <td><code>${escapeHtml(tool.id)}</code></td>
          <td>${escapeHtml(categoryLabels[tool.category])}</td>
          <td><span class="tag">${escapeHtml(tool.tag)}</span></td>
          <td><span class="status status-${tool.status ?? "ready"}">${escapeHtml(tool.status ?? "ready")}</span></td>
          <td class="desc">${escapeHtml(tool.description)}</td>
        </tr>`,
        )
        .join("");

      const copyLabel =
        section.id === "advanced" ? "Copy advanced names" : "Copy tool names";

      return `
      <section class="block">
        <h2>
          <span class="h2-title">${escapeHtml(section.label)} <span class="count">${sectionTools.length}</span></span>
          ${renderCopyButton(
            sectionTools.map((tool) => tool.name),
            copyLabel,
          )}
        </h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Category</th>
              <th>Tag</th>
              <th>Status</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </section>`;
    })
    .join("");
}

function renderBlogSection(): string {
  const articles = getAllArticles();

  if (articles.length === 0) {
    return `
      <section class="block">
        <h2>Articles <span class="count">0</span></h2>
        <p class="empty">No articles yet. Add markdown files to <code>src/content/articles/</code>.</p>
      </section>`;
  }

  const rows = articles
    .map(
      (article) => `
      <tr>
        <td><a href="${DEV_BASE}/articles/${escapeHtml(article.slug)}">${escapeHtml(article.title)}</a></td>
        <td><code>${escapeHtml(article.slug)}</code></td>
        <td><code>${escapeHtml(article.toolId)}</code></td>
        <td>${escapeHtml(article.date)}</td>
        <td class="desc">${escapeHtml(article.excerpt)}</td>
      </tr>`,
    )
    .join("");

  return `
    <section class="block">
      <h2>
        <span class="h2-title">Articles <span class="count">${articles.length}</span></span>
        ${renderCopyButton(
          articles.map((article) => article.title),
          "Copy article names",
        )}
      </h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Slug</th>
            <th>Tool</th>
            <th>Date</th>
            <th>Excerpt</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`;
}

export function generateInventory(): string {
  const articles = getAllArticles();

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <title>pix-8 — Local Inventory</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, sans-serif;
      background: #121212;
      color: #e8e8e8;
      line-height: 1.5;
      padding: 2rem 1.5rem 3rem;
    }
    .wrap { max-width: 1100px; margin: 0 auto; }
    .label {
      font-family: ui-monospace, monospace;
      font-size: 0.6875rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #737373;
    }
    h1 { font-size: 1.5rem; font-weight: 500; margin: 0.5rem 0 0.25rem; }
    .sub { color: #737373; font-size: 0.875rem; margin-bottom: 2rem; }
    .notice {
      border: 1px solid #333;
      background: #161616;
      padding: 0.75rem 1rem;
      font-family: ui-monospace, monospace;
      font-size: 0.75rem;
      color: #737373;
      margin-bottom: 2rem;
    }
    .block { margin-bottom: 2.5rem; }
    h2 {
      font-family: ui-monospace, monospace;
      font-size: 0.75rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #e8e8e8;
      border-bottom: 1px solid #333;
      padding-bottom: 0.75rem;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .h2-title { display: inline-flex; align-items: center; gap: 0.5rem; }
    .count { color: #737373; font-weight: 400; }
    .copy-btn {
      margin-left: auto;
      flex-shrink: 0;
      border: 1px solid #333;
      background: #161616;
      color: #a3a3a3;
      font-family: ui-monospace, monospace;
      font-size: 0.625rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      padding: 0.375rem 0.625rem;
      cursor: pointer;
      transition: border-color 0.15s, color 0.15s, background 0.15s;
    }
    .copy-btn:hover {
      border-color: #525252;
      color: #e8e8e8;
      background: #1a1a1a;
    }
    .copy-btn.copied {
      color: #e8e8e8;
      border-color: #525252;
    }
    table { width: 100%; border-collapse: collapse; font-size: 0.8125rem; }
    th, td {
      border: 1px solid #333;
      padding: 0.625rem 0.75rem;
      text-align: left;
      vertical-align: top;
    }
    th {
      font-family: ui-monospace, monospace;
      font-size: 0.625rem;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #737373;
      background: #161616;
    }
    tr:hover td { background: #1a1a1a; }
    a { color: #e8e8e8; }
    a:hover { color: #fff; }
    code { font-family: ui-monospace, monospace; font-size: 0.75rem; color: #a3a3a3; }
    .tag {
      font-family: ui-monospace, monospace;
      font-size: 0.625rem;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #737373;
    }
    .status {
      font-family: ui-monospace, monospace;
      font-size: 0.625rem;
      text-transform: uppercase;
      padding: 0.125rem 0.375rem;
      border: 1px solid #333;
    }
    .status-ready, .status-published { color: #e8e8e8; }
    .status-draft, .status-planned, .status-pending { color: #737373; }
    .desc { color: #737373; max-width: 28rem; }
    .empty { color: #737373; font-size: 0.875rem; }
    .summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 0.75rem;
      margin-bottom: 2rem;
    }
    .stat {
      border: 1px solid #333;
      background: #161616;
      padding: 1rem;
    }
    .stat .label { margin-bottom: 0.25rem; }
    .stat .value { font-family: ui-monospace, monospace; font-size: 1.25rem; }
  </style>
</head>
<body>
  <div class="wrap">
    <p class="label">Local only</p>
    <h1>pix-8 Inventory</h1>
    <p class="sub">Generated ${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC — not deployed</p>
    <p class="notice">This file lives in <code>local/</code> (gitignored). It regenerates on <code>npm run dev</code> startup and whenever <code>src/lib/tools.ts</code> or <code>src/content/articles/</code> changes — reload this page in your browser to see updates. Tool links assume <code>npm run dev</code> on port 3000.</p>
    <div class="summary">
      <div class="stat"><p class="label">Tools</p><p class="value">${tools.length}</p></div>
      <div class="stat"><p class="label">Articles</p><p class="value">${articles.length}</p></div>
      <div class="stat"><p class="label">Ready</p><p class="value">${tools.filter((t) => t.status === "ready").length}</p></div>
    </div>
    ${renderToolsSection()}
    ${renderBlogSection()}
  </div>
  <script>
    document.querySelectorAll(".copy-btn").forEach((button) => {
      button.addEventListener("click", async () => {
        const names = JSON.parse(button.dataset.names || "[]");
        const text = names.join("\\n");
        const original = button.textContent || "Copy";

        try {
          await navigator.clipboard.writeText(text);
          button.textContent = "Copied!";
          button.classList.add("copied");
          window.setTimeout(() => {
            button.textContent = original;
            button.classList.remove("copied");
          }, 1500);
        } catch {
          button.textContent = "Copy failed";
          window.setTimeout(() => {
            button.textContent = original;
          }, 1500);
        }
      });
    });
  </script>
</body>
</html>`;

  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, html, "utf8");

  return OUTPUT_FILE;
}

const isDirectRun =
  process.argv[1]?.replace(/\\/g, "/").endsWith("generate-inventory.ts") ??
  false;

if (isDirectRun) {
  const output = generateInventory();
  console.log(`Inventory written to ${output}`);
  console.log(
    `Open: file://${join(process.cwd(), output).replace(/\\/g, "/")}`,
  );
}
