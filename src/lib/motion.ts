export type RevealDirection = "up" | "down" | "left" | "right" | "none" | "scale";

export const REVEAL_DURATION = 920;
export const REVEAL_STAGGER = 85;
export const REVEAL_EASE = "out(4)";
export const HERO_EASE = "out(3)";
export const HOVER_EASE = "out(2)";

type RevealKeyframes = Record<string, [number | string, number | string]>;

export function getRevealKeyframes(direction: RevealDirection): RevealKeyframes {
  const blur: RevealKeyframes = { filter: ["blur(12px)", "blur(0px)"] };

  switch (direction) {
    case "up":
      return { ...blur, y: [52, 0] };
    case "down":
      return { ...blur, y: [-52, 0] };
    case "left":
      return { ...blur, x: [-52, 0] };
    case "right":
      return { ...blur, x: [52, 0] };
    case "scale":
      return {
        filter: ["blur(14px)", "blur(0px)"],
        scale: [0.86, 1],
        y: [24, 0],
      };
    default:
      return blur;
  }
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function setSpotlightPosition(
  element: HTMLElement,
  clientX: number,
  clientY: number
) {
  const rect = element.getBoundingClientRect();
  const x = ((clientX - rect.left) / rect.width) * 100;
  const y = ((clientY - rect.top) / rect.height) * 100;
  element.style.setProperty("--mouse-x", `${x}%`);
  element.style.setProperty("--mouse-y", `${y}%`);
}
