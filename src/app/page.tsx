import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Work } from "@/components/work";
import { ExperienceSection } from "@/components/experience";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { ContactSection } from "@/components/contact";
import { ScrollProgress } from "@/components/scroll-progress";
import { BackToTop } from "@/components/back-to-top";
import { getSite, getProjects, getExperience, getSkills, getContact } from "@/lib/content";

export default function Home() {
  const site = getSite();
  const projects = getProjects();
  const experiences = getExperience();
  const skills = getSkills();
  const contact = getContact();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Navigation />
      <main>
        <Hero hero={site.hero} />
        <Work projects={projects} />
        <ExperienceSection experiences={experiences} />
        <About about={site.about} />
        <Skills categories={skills} />
        <ContactSection contact={contact} />
      </main>
      <BackToTop />
    </div>
  );
}
