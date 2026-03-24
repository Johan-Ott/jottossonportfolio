import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getCaseStudy } from "@/lib/content";

export default function CaseStudyPage() {
  const study = getCaseStudy();

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to portfolio
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 pt-28 pb-24">
        <header className="mb-16">
          <h1 className="text-3xl md:text-5xl tracking-tight leading-[1.1] mb-4">
            {study.title}
          </h1>
          <p className="text-lg text-muted-foreground" style={{ lineHeight: 1.65 }}>
            {study.subtitle}
          </p>
        </header>

        <div className="space-y-14">
          {study.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-sm tracking-wider text-muted-foreground mb-4">
                {section.heading.toUpperCase()}
              </h2>

              {section.body && (
                <p className="text-base md:text-lg" style={{ lineHeight: 1.75 }}>
                  {section.body}
                </p>
              )}

              {section.items && (
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-base md:text-lg"
                      style={{ lineHeight: 1.75 }}
                    >
                      <span className="text-muted-foreground shrink-0">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section>
            <h2 className="text-sm tracking-wider text-muted-foreground mb-6">
              STACK
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {study.stack.map((item) => (
                <div key={item.label} className="flex flex-col gap-0.5">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-base">{item.value}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
