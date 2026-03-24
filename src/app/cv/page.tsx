import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { getSite, getExperience, getSkills, getContact, getCV } from "@/lib/content";
import { PrintButton } from "./print-button";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export default function CVPage() {
  const site = getSite();
  const experiences = getExperience();
  const skills = getSkills();
  const contact = getContact();
  const cv = getCV();

  const email = contact.links.find((l) => l.icon === "mail");
  const linkedin = contact.links.find((l) => l.icon === "linkedin");
  const github = contact.links.find((l) => l.icon === "github");

  return (
    <div className="min-h-screen bg-background">
      <div className="print:hidden fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to portfolio
            </Link>
            <PrintButton />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-24 print:py-12">
        <div className="bg-background print:bg-white">
          <header className="mb-12 print:mb-8">
            <h1 className="text-4xl md:text-5xl mb-4 print:text-4xl font-medium">
              {cv.name}
            </h1>
            <p
              className="text-xl text-muted-foreground mb-6 print:text-lg"
              style={{ lineHeight: 1.65 }}
            >
              {cv.title}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {email && (
                <a
                  href={email.href}
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {email.value}
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin.href}
                  className="flex items-center gap-2 hover:text-foreground transition-colors print:text-foreground"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  {linkedin.value}
                </a>
              )}
              {github && (
                <a
                  href={github.href}
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  {github.value}
                </a>
              )}
            </div>
          </header>

          <section className="mb-12 print:mb-8 print:break-inside-avoid">
            <h2 className="text-sm tracking-wider text-muted-foreground mb-4 print:text-black">
              SUMMARY
            </h2>
            <div className="space-y-4 text-base" style={{ lineHeight: 1.65 }}>
              {site.about.paragraphs.slice(0, 2).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          <section className="mb-12 print:mb-8">
            <h2 className="text-sm tracking-wider text-muted-foreground mb-6 print:text-black">
              EXPERIENCE
            </h2>
            <div className="space-y-8">
              {experiences.map((exp) => (
                <div key={exp.company} className="print:break-inside-avoid">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-medium">{exp.role}</h3>
                      <p className="text-muted-foreground">
                        {exp.company} · {exp.location}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-2" style={{ lineHeight: 1.65 }}>
                    {exp.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Tools: {exp.tools.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 print:mb-8 print:break-inside-avoid">
            <h2 className="text-sm tracking-wider text-muted-foreground mb-6 print:text-black">
              SKILLS & TOOLS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:gap-4">
              {skills.map((cat) => (
                <div key={cat.category}>
                  <h3 className="text-sm font-medium mb-2">{cat.category}</h3>
                  <p className="text-sm text-muted-foreground" style={{ lineHeight: 1.8 }}>
                    {cat.skills.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="print:break-inside-avoid">
            <h2 className="text-sm tracking-wider text-muted-foreground mb-4 print:text-black">
              ADDITIONAL
            </h2>
            <div className="space-y-4 text-sm" style={{ lineHeight: 1.65 }}>
              {cv.additional.map((item) => (
                <div key={item.heading}>
                  <h3 className="font-medium mb-1">{item.heading}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
