"use client";

import { useRef } from "react";
import { Mail, FileText } from "lucide-react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ease, duration, stagger } from "@/lib/motion";
import type { Contact } from "@/lib/schemas";
import type { ComponentType, SVGProps } from "react";
import { GithubIcon, LinkedinIcon } from "./icons";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>
const ICON_MAP: Record<string, IconComponent> = {
  mail: Mail,
  linkedin: LinkedinIcon,
  github: GithubIcon,
  "file-text": FileText,
};

function MagneticLink({
  href,
  icon,
  label,
  value,
  index,
}: {
  href: string;
  icon: string;
  label: string;
  value: string;
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const Icon = ICON_MAP[icon] ?? Mail;

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.15);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={`${label}: ${value}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: duration.normal,
        delay: index * stagger.wide,
        ease: ease.out,
      }}
      className="group flex items-center gap-4 py-4 border-b border-border hover:border-foreground transition-colors duration-200"
    >
      <Icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-150" />
      <div className="flex-1">
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="text-lg group-hover:underline underline-offset-4">{value}</div>
      </div>
    </motion.a>
  );
}

export function ContactSection({ contact }: { contact: Contact }) {
  return (
    <section id="contact" className="py-24 px-6 lg:px-8 flex items-center min-h-[70vh]">
      <div className="max-w-4xl mx-auto w-full">
        <motion.h2
          className="text-sm tracking-wider text-muted-foreground mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: duration.slow }}
        >
          GET IN TOUCH
        </motion.h2>

        <div>
          <motion.h3
            className="text-3xl md:text-5xl mb-12 max-w-2xl leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: duration.slow, ease: ease.out }}
          >
            {contact.headline}
          </motion.h3>

          <div className="space-y-6">
            {contact.links.map((link, i) => (
              <MagneticLink
                key={link.label}
                href={link.href}
                icon={link.icon}
                label={link.label}
                value={link.value}
                index={i}
              />
            ))}
          </div>

          <motion.div
            className="mt-16 pt-8 border-t border-border text-sm text-muted-foreground flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: duration.reveal, delay: 0.4 }}
          >
            <p>{contact.footer}</p>
            <motion.a
              href="/jottossonportfolio/case-study"
              className="relative hover:text-foreground transition-colors duration-150"
              initial={{ opacity: 0, y: 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: duration.slow, delay: 0.8, ease: ease.out }}
            >
              How this site was built
              <motion.span
                className="absolute left-0 right-0 bottom-[-2px] h-px bg-current origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.4, ease: ease.out }}
              />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
