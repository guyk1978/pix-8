import type { Metadata } from "next";
import { ProjectsPageContent } from "@/components/projects/ProjectsPageContent";

export const metadata: Metadata = {
  title: "My Projects",
  description:
    "Saved Pix-8 tool sessions — reopen your images and settings locally in your browser.",
};

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
