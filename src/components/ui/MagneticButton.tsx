"use client";

import { animate } from "animejs";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { HOVER_EASE, prefersReducedMotion } from "@/lib/motion";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  strength?: number;
};

export function MagneticButton({
  children,
  className = "",
  href,
  strength = 0.35,
}: MagneticButtonProps) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const innerRef = useRef<HTMLAnchorElement>(null);

  function handleMove(event: MouseEvent<HTMLSpanElement>) {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner || prefersReducedMotion()) return;

    const rect = wrap.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    animate(inner, {
      x: x * strength,
      y: y * strength,
      duration: 350,
      ease: HOVER_EASE,
    });
  }

  function handleLeave() {
    const inner = innerRef.current;
    if (!inner || prefersReducedMotion()) return;

    animate(inner, {
      x: 0,
      y: 0,
      duration: 550,
      ease: "out(3)",
    });
  }

  return (
    <span
      ref={wrapRef}
      className="magnetic-wrap inline-flex"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <a ref={innerRef} href={href} className={`magnetic-inner ${className}`}>
        {children}
      </a>
    </span>
  );
}
