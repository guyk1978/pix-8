import { buildToolSoftwareApplicationSchema } from "@/lib/toolJsonLd";
import type { Tool } from "@/lib/tools";

interface ToolJsonLdProps {
  tool: Tool;
}

export function ToolJsonLd({ tool }: ToolJsonLdProps) {
  const schema = buildToolSoftwareApplicationSchema(tool);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
