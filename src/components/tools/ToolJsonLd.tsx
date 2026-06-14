import { buildToolSoftwareApplicationSchema } from "@/lib/toolJsonLd";
import { getSeedRating, getToolJsonLdScriptId, toAggregateRating } from "@/lib/toolRatings";
import type { Tool } from "@/lib/tools";

interface ToolJsonLdProps {
  tool: Tool;
}

export function ToolJsonLd({ tool }: ToolJsonLdProps) {
  const schema = buildToolSoftwareApplicationSchema(
    tool,
    toAggregateRating(getSeedRating(tool.id)),
  );

  return (
    <script
      id={getToolJsonLdScriptId(tool.id)}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
