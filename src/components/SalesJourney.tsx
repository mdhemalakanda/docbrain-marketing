"use client";

import { animate, onScroll } from "animejs";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { AnimateIn, Stagger } from "./ui/AnimateIn";

const FLOW = [
  {
    step: "1",
    title: "Customer opens chat",
    channel: "Website · WhatsApp · Instagram · etc.",
    detail:
      "Visitor taps the widget or sends a DM. Agent greets with your welcome message.",
  },
  {
    step: "2",
    title: "Browse or search catalog",
    channel: "Server-side · no AI required",
    detail:
      "“Show menu”, “I want lipstick”, “suggest 5 products” — agent lists real items from your upload.",
  },
  {
    step: "3",
    title: "Ask questions",
    channel: "AI + your documents",
    detail:
      "Shipping, ingredients, sizing, policies — answered from catalog + training docs only.",
  },
  {
    step: "4",
    title: "Customer orders",
    channel: "Order intent → checkout",
    detail:
      "“I’ll order” or “Red Nail Polish i’ll order” — agent collects name, email, address.",
  },
  {
    step: "5",
    title: "Order saved",
    channel: "Database + chat receipt",
    detail:
      "✓ Saved with order number, line total, shipping address. Visible in your Orders dashboard.",
  },
  {
    step: "6",
    title: "Email confirmation",
    channel: "Resend · branded HTML",
    detail:
      "Customer receives order confirmation. Can ask agent to resend (“mail me order”).",
  },
  {
    step: "7",
    title: "You fulfill",
    channel: "Orders dashboard",
    detail:
      "Update status to Processing → Completed. Customer can ask about their order in the same chat.",
  },
];

export function SalesJourney() {
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    const track = trackRef.current;
    if (!line || !track) return;

    if (prefersReducedMotion()) {
      line.style.transform = "scaleY(1)";
      line.style.opacity = "1";
      return;
    }

    const animation = animate(line, {
      scaleY: [0, 1],
      opacity: [0.4, 1],
      duration: 1200,
      ease: "out(3)",
      autoplay: onScroll({
        target: track,
        enter: "bottom top-=15%",
      }),
    });

    return () => {
      animation.revert();
    };
  }, []);

  return (
    <section id="sales-flow" className="section-glow py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <AnimateIn className="mx-auto max-w-2xl text-center">
          <span className="section-label">Sales flow</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            How a sale actually happens
          </h2>
          <p className="mt-4 text-base text-white/55 sm:text-lg">
            End-to-end customer journey — from first message to confirmed order and
            email. This is what your buyers experience.
          </p>
        </AnimateIn>

        <div ref={trackRef} className="journey-track relative mt-12 sm:mt-14">
          <div
            ref={lineRef}
            className="journey-line pointer-events-none absolute top-5 bottom-5 left-[1.25rem] w-px origin-top bg-gradient-to-b from-emerald-400/70 via-emerald-500/35 to-emerald-500/10 sm:left-[1.5rem]"
            aria-hidden
          />

          <Stagger className="relative space-y-4 sm:space-y-5" staggerMs={85}>
            {FLOW.map((item, index) => (
              <div
                key={item.step}
                data-stagger
                className="journey-row grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-3 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-5"
              >
                <div className="flex justify-center pt-1 sm:pt-0.5">
                  <div
                    className={`journey-num relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-500/35 bg-[#050505] text-xs font-bold text-emerald-400 sm:h-10 sm:w-10 ${
                      index === FLOW.length - 1 ? "journey-num-active" : ""
                    }`}
                  >
                    {item.step}
                  </div>
                </div>

                <article
                  className={`journey-step min-w-0 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 sm:p-6 ${
                    index === FLOW.length - 1
                      ? "border-emerald-500/25 bg-emerald-500/[0.04]"
                      : ""
                  }`}
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <h3 className="text-base font-semibold leading-snug sm:text-lg">
                      {item.title}
                    </h3>
                    <span className="journey-tag inline-flex max-w-full shrink-0 self-start rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-2.5 py-1 text-[10px] font-medium leading-tight text-emerald-300/90 sm:text-xs">
                      {item.channel}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/50 sm:mt-3">
                    {item.detail}
                  </p>
                </article>
              </div>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
