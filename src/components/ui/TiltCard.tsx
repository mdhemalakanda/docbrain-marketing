"use client";

import { animate } from "animejs";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { HOVER_EASE, prefersReducedMotion, setSpotlightPosition } from "@/lib/motion";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glow?: boolean;
};

export function TiltCard({
  children,
  className = "",
  intensity = 14,
  glow = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    if (glow) setSpotlightPosition(el, event.clientX, event.clientY);

    animate(el, {
      rotateY: x * intensity,
      rotateX: -y * intensity,
      translateY: -6,
      duration: 450,
      ease: HOVER_EASE,
    });
  }

  function handleLeave() {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    animate(el, {
      rotateY: 0,
      rotateX: 0,
      translateY: 0,
      duration: 650,
      ease: "out(3)",
    });
  }

  return (
    <div
      ref={ref}
      className={`tilt-card ${glow ? "spotlight-card" : ""} ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
}
