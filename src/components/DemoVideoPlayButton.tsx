"use client";

import { animate } from "animejs";
import { useEffect, useRef, useState } from "react";
import { DemoVideoModal } from "@/components/DemoVideoModal";
import { prefersReducedMotion } from "@/lib/motion";

type DemoVideoPlayButtonProps = {
  className?: string;
};

export function DemoVideoPlayButton({ className = "" }: DemoVideoPlayButtonProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const ring2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const button = buttonRef.current;
    const ring = ringRef.current;
    const ring2 = ring2Ref.current;
    if (!button || !ring || !ring2) return;

    animate(ring, {
      scale: [1, 1.22],
      opacity: [0.55, 0],
      duration: 2200,
      ease: "out(3)",
      loop: true,
    });

    animate(ring2, {
      scale: [1, 1.38],
      opacity: [0.35, 0],
      duration: 2200,
      delay: 500,
      ease: "out(3)",
      loop: true,
    });

    animate(button, {
      boxShadow: [
        "0 0 0 0 rgba(16, 185, 129, 0.35)",
        "0 0 0 14px rgba(16, 185, 129, 0)",
      ],
      duration: 1800,
      ease: "out(2)",
      loop: true,
    });
  }, []);

  return (
    <>
      <div className={`group flex flex-col items-center ${className}`}>
        <button
          ref={buttonRef}
          type="button"
          data-hero-play
          onClick={() => setOpen(true)}
          className="demo-play-btn relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-emerald-400/35 bg-gradient-to-br from-emerald-400/20 via-emerald-500/10 to-transparent text-white shadow-[0_0_40px_rgba(16,185,129,0.25)] transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] sm:h-20 sm:w-20"
          aria-label="Play DocBrain sales agent demo video"
        >
          <span
            ref={ringRef}
            className="pointer-events-none absolute inset-0 rounded-full border border-emerald-400/40"
            aria-hidden
          />
          <span
            ref={ring2Ref}
            className="pointer-events-none absolute inset-0 rounded-full border border-emerald-400/25"
            aria-hidden
          />
          <span
            className="relative ml-1 flex h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-white drop-shadow-sm transition group-hover:scale-110 sm:border-y-[10px] sm:border-l-[16px]"
            aria-hidden
          />
        </button>
        <p className="mt-4 text-sm font-medium text-white/70 transition group-hover:text-white/90">
          Watch the sales agent demo
        </p>
      </div>

      <DemoVideoModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
