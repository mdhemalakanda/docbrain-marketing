"use client";

import { animate, createTimeline, stagger } from "animejs";
import { useEffect, useRef } from "react";
import { HERO_EASE, prefersReducedMotion } from "@/lib/motion";
import { ChatMockup } from "./ChatMockup";
import { DemoVideoHeroCard } from "./DemoVideoHeroCard";
import { EarlyAccessForm } from "./EarlyAccessForm";
import { AnimateIn } from "./ui/AnimateIn";
import { MagneticButton } from "./ui/MagneticButton";
import { TiltCard } from "./ui/TiltCard";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const orbs = section.querySelectorAll<HTMLElement>(".hero-orb");
    const grid = section.querySelector<HTMLElement>(".hero-grid");
    const label = section.querySelector<HTMLElement>("[data-hero-label]");
    const headline = section.querySelector<HTMLElement>("[data-hero-headline]");
    const gradientLine = section.querySelector<HTMLElement>("[data-hero-gradient]");
    const sub = section.querySelector<HTMLElement>("[data-hero-sub]");
    const ctas = section.querySelectorAll<HTMLElement>("[data-hero-cta]");
    const play = section.querySelector<HTMLElement>("[data-hero-play-wrap]");
    const fine = section.querySelector<HTMLElement>("[data-hero-fine]");

    if (!label || !headline || !sub) return;

    orbs.forEach((orb, index) => {
      animate(orb, {
        translateX: index === 0 ? [0, 30, -20, 0] : [0, -25, 15, 0],
        translateY: index === 0 ? [0, -20, 15, 0] : [0, 25, -10, 0],
        scale: [1, 1.08, 0.95, 1],
        duration: 14000 + index * 2000,
        ease: "inOut(2)",
        loop: true,
      });
    });

    if (grid) {
      animate(grid, {
        opacity: [0, 0.6],
        duration: 2000,
        ease: HERO_EASE,
      });
    }

    const tl = createTimeline({ defaults: { ease: HERO_EASE } });

    tl.add(label, { opacity: [0, 1], y: [20, 0], duration: 700 }, 0)
      .add(
        headline,
        {
          opacity: [0, 1],
          y: [40, 0],
          filter: ["blur(16px)", "blur(0px)"],
          duration: 1000,
        },
        150
      );

    if (gradientLine) {
      tl.add(
        gradientLine,
        {
          opacity: [0, 1],
          scale: [0.9, 1],
          filter: ["blur(20px)", "blur(0px)"],
          duration: 900,
        },
        350
      );
    }

    tl.add(
      sub,
      { opacity: [0, 1], y: [24, 0], filter: ["blur(8px)", "blur(0px)"], duration: 800 },
      450
    );

    if (play) {
      tl.add(
        play,
        {
          opacity: [0, 1],
          y: [18, 0],
          scale: [0.9, 1],
          duration: 700,
        },
        580
      );
    }

    tl.add(
      ctas,
      {
        opacity: [0, 1],
        y: [20, 0],
        scale: [0.94, 1],
        duration: 650,
        delay: stagger(100),
      },
      720
    );

    if (fine) {
      tl.add(fine, { opacity: [0, 1], duration: 500 }, 950);
    }

    return () => {
      tl.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="glow-hero relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28"
    >
      <div className="hero-aurora pointer-events-none absolute inset-0" />
      <div className="hero-grid anime-hero-pending pointer-events-none absolute inset-0 opacity-0" />
      <div className="hero-orb hero-orb-1 anime-hero-pending" />
      <div className="hero-orb hero-orb-2 anime-hero-pending" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span
            data-hero-label
            className="section-label anime-hero-pending inline-flex"
          >
            Early access open
          </span>
          <h1
            data-hero-headline
            className="anime-hero-pending mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.08]"
          >
            Your Business Is Great.
            <br />
            <span data-hero-gradient className="gradient-text anime-hero-pending inline-block">
              Your Sales Process Isn&apos;t.
            </span>
          </h1>
          <p
            data-hero-sub
            className="anime-hero-pending mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl"
          >
            DocBrain is your AI agent that automates your full sales process — from
            catalog to checkout to order confirmation. On your site, WhatsApp,
            Telegram, and more.
          </p>

          <div
            data-hero-play-wrap
            className="anime-hero-pending mx-auto mt-10 w-full max-w-4xl"
          >
            <DemoVideoHeroCard />
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row">
            <MagneticButton
              href="#early-access"
              className="btn-primary btn-shimmer anime-hero-pending w-full sm:w-auto"
              strength={0.28}
            >
              <span data-hero-cta>Get Early Access</span>
            </MagneticButton>
            <MagneticButton
              href="#how-it-works"
              className="btn-secondary anime-hero-pending w-full sm:w-auto"
              strength={0.22}
            >
              <span data-hero-cta>See How It Works</span>
            </MagneticButton>
          </div>

          <p data-hero-fine className="anime-hero-pending mt-5 text-sm text-white/40">
            Free trial · Card on file · Cancel anytime
          </p>
        </div>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <AnimateIn className="order-2 lg:order-1" delay={100} direction="left">
            <p className="mb-4 text-center text-xs uppercase tracking-wider text-white/40 lg:text-left">
              Customer chat → order saved → email sent
            </p>
            <TiltCard intensity={10}>
              <ChatMockup />
            </TiltCard>
          </AnimateIn>

          <AnimateIn className="order-1 lg:order-2" delay={200} direction="right">
            <TiltCard className="rounded-2xl" intensity={8}>
              <div className="card-interactive spotlight-card rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl font-semibold">Start free access</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  Add your card to start a free trial. Create your DocBrain account
                  right after — no charge until the trial ends.
                </p>
                <div className="mt-6">
                  <EarlyAccessForm source="hero" />
                </div>
              </div>
            </TiltCard>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
