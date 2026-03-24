"use client";

import { useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { ease } from "@/lib/motion";

interface ExpandableCardProps {
  preview: ReactNode;
  details?: ReactNode;
  ghostImage?: string;
  accentBg?: boolean;
}

export function ExpandableCard({
  preview,
  details,
  ghostImage,
  accentBg = false,
}: ExpandableCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const expandable = !!details;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 20 });
  const sy = useSpring(my, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [1.5, -1.5]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-1.5, 1.5]);

  const onMove = (e: React.MouseEvent) => {
    if (open) return;
    const rect = tiltRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const toggle = () => {
    if (!expandable) return;
    const willOpen = !open;
    setOpen(willOpen);
    if (willOpen) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 350);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && open) {
      e.preventDefault();
      setOpen(false);
    }
    if ((e.key === "Enter" || e.key === " ") && expandable) {
      e.preventDefault();
      toggle();
    }
  };

  const bgFrom = accentBg ? "from-accent/30" : "from-background";
  const bgVia = accentBg ? "via-accent/30" : "via-background/80";
  const bgTo = accentBg ? "to-accent/30" : "to-background/60";

  return (
    <div ref={cardRef} className="border-b border-border">
      <motion.div
        ref={tiltRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={toggle}
        role={expandable ? "button" : undefined}
        tabIndex={expandable ? 0 : undefined}
        onKeyDown={handleKeyDown}
        aria-expanded={expandable ? open : undefined}
        style={open ? {} : { rotateX, rotateY, transformPerspective: 800 }}
        className={`py-8 px-6 -mx-6 ${
          expandable
            ? "cursor-pointer group hover:bg-accent/50 transition-colors duration-200"
            : ""
        }`}
      >
        <div className="relative">
          {ghostImage && !open && (
            <div className="absolute right-0 top-0 bottom-0 w-2/5 hidden sm:block pointer-events-none overflow-hidden opacity-[0.07] group-hover:opacity-[0.14] transition-opacity duration-300">
              <Image
                src={ghostImage}
                alt=""
                fill
                className="object-cover object-center"
                sizes="300px"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${bgFrom} ${bgVia} to-transparent`} />
              <div className={`absolute inset-0 bg-gradient-to-t ${bgFrom} via-transparent ${bgTo}`} />
            </div>
          )}

          <div className="relative flex items-start justify-between gap-6">
            <div className="flex-1 min-w-0">
              {preview}
            </div>

            {expandable && (
              <div className="shrink-0">
                <motion.div
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-150" />
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: ease.inOut }}
            className="overflow-hidden"
          >
            <div className="px-6 -mx-6 pb-8 space-y-6">
              {details}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
