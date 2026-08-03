import { ProjectsHero } from "@/components/projects/projects-hero";
import { ProjectsGallery } from "@/components/projects/projects-gallery";
import { ProjectVideoShowcase } from "@/components/projects/project-video-showcase";

export const metadata = {
  title: "Projects | PowerMetz",
  description: "Browse our solar and battery energy storage projects portfolio.",
};

export default function ProjectsPage() {
  return (
    <main className="w-full overflow-hidden">
      <ProjectsHero />
      <ProjectsGallery />
      <ProjectVideoShowcase />
    </main>
  );
}
