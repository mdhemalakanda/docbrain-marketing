"use client";

import { animate } from "animejs";
import { useEffect, useRef, useState } from "react";
import { HERO_EASE, prefersReducedMotion } from "@/lib/motion";
import { MagneticButton } from "./ui/MagneticButton";

const NAV = [
  { label: "Process", href: "#how-it-works" },
  { label: "Sales Flow", href: "#sales-flow" },
  { label: "Integrations", href: "#integrations" },
  { label: "Features", href: "#features" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header || prefersReducedMotion()) return;

    animate(header, {
      opacity: [0, 1],
      y: [-24, 0],
      filter: ["blur(8px)", "blur(0px)"],
      duration: 900,
      ease: HERO_EASE,
    });
  }, []);

  return (
    <header
      ref={headerRef}
      className={`header-bar anime-hero-pending fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#050505]/80 backdrop-blur-xl ${scrolled ? "scrolled" : ""}`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2.5">
          <span className="logo-mark flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 text-sm font-bold text-black">
            D
          </span>
          <span className="text-lg font-semibold tracking-tight transition-colors hover:text-emerald-300">
            DocBrain
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <MagneticButton
            href="#early-access"
            className="btn-primary btn-shimmer px-5 py-2.5"
            strength={0.3}
          >
            Get Early Access
          </MagneticButton>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-white/70 transition hover:bg-white/5 hover:text-white md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeWidth="2" d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/[0.06] bg-[#050505] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="py-2 text-sm text-white/70 transition hover:text-emerald-400"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <MagneticButton
              href="#early-access"
              className="btn-primary btn-shimmer mt-2 justify-center py-3"
              strength={0.25}
            >
              Get Early Access
            </MagneticButton>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
