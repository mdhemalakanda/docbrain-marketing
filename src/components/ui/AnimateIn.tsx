"use client";

import { animate, onScroll, stagger } from "animejs";
import { useEffect, useRef, type ReactNode } from "react";
import {
  getRevealKeyframes,
  prefersReducedMotion,
  REVEAL_DURATION,
  REVEAL_EASE,
  type RevealDirection,
} from "@/lib/motion";

type AnimateInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
  once?: boolean;
  duration?: number;
};

export function AnimateIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
  once = true,
  duration = REVEAL_DURATION,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.filter = "none";
      return;
    }

    const animation = animate(el, {
      opacity: [0, 1],
      ...getRevealKeyframes(direction),
      duration,
      delay,
      ease: REVEAL_EASE,
      autoplay: onScroll({
        target: el,
        enter: "bottom top-=8%",
        leave: once ? undefined : "top bottom+=5%",
        repeat: !once,
      }),
    });

    return () => {
      animation.revert();
    };
  }, [delay, direction, duration, once]);

  return (
    <div ref={ref} className={`anime-reveal ${className}`}>
      {children}
    </div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  staggerMs?: number;
  childClassName?: string;
  direction?: RevealDirection;
};

export function Stagger({
  children,
  className = "",
  staggerMs = 90,
  childClassName = "",
  direction = "scale",
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>("[data-stagger]");
    if (!items.length) return;

    if (prefersReducedMotion()) {
      items.forEach((item) => {
        item.style.opacity = "1";
        item.style.transform = "none";
        item.style.filter = "none";
      });
      return;
    }

    const animation = animate(items, {
      opacity: [0, 1],
      ...getRevealKeyframes(direction),
      duration: 880,
      delay: stagger(staggerMs),
      ease: REVEAL_EASE,
      autoplay: onScroll({
        target: container,
        enter: "bottom top-=8%",
      }),
    });

    return () => {
      animation.revert();
    };
  }, [direction, staggerMs]);

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div
              key={index}
              data-stagger
              className={`anime-reveal ${childClassName}`}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
}
