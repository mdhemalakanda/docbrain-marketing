"use client";

import { animate, onScroll, stagger } from "animejs";
import { useEffect, useRef } from "react";
import { prefersReducedMotion, REVEAL_EASE } from "@/lib/motion";

export function ChatMockup() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const bubbles = root.querySelectorAll<HTMLElement>("[data-chat-bubble]");
    const floatAnim = animate(root, {
      translateY: [0, -10, 0],
      duration: 5000,
      ease: "inOut(2)",
      loop: true,
    });

    const chatAnim = animate(bubbles, {
      opacity: [0, 1],
      scale: [0.92, 1],
      y: [20, 0],
      duration: 650,
      delay: stagger(120, { start: 400 }),
      ease: REVEAL_EASE,
      autoplay: onScroll({
        target: root,
        enter: "bottom top-=5%",
      }),
    });

    return () => {
      floatAnim.revert();
      chatAnim.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="mockup-glow relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0c] will-change-transform"
    >
      <div className="mockup-shine pointer-events-none absolute inset-0 z-10" />

      <div className="relative flex items-center justify-between border-b border-white/[0.06] bg-[#111] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-400">
            AI
          </span>
          <div>
            <p className="text-sm font-medium">Product Sales Agent</p>
            <p className="text-[11px] text-white/40">DocBrain · Online</p>
          </div>
        </div>
        <span className="live-pulse rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
          Live
        </span>
      </div>

      <div className="relative space-y-3 p-4 text-[13px] leading-relaxed">
        <div
          data-chat-bubble
          className="chat-bubble anime-reveal max-w-[85%] rounded-2xl rounded-bl-md bg-white/[0.06] px-3.5 py-2.5 text-white/80"
        >
          Hi! I can help you browse our catalog, place an order, and send confirmation — all in this chat.
        </div>
        <div
          data-chat-bubble
          className="chat-bubble anime-reveal ml-auto max-w-[75%] rounded-2xl rounded-br-md bg-emerald-600 px-3.5 py-2.5 text-white"
        >
          Show me red nail polish
        </div>
        <div
          data-chat-bubble
          className="chat-bubble anime-reveal max-w-[90%] rounded-2xl rounded-bl-md bg-white/[0.06] px-3.5 py-2.5 text-white/80"
        >
          <p className="mb-2 font-medium text-white">Here&apos;s what I found:</p>
          <div className="rounded-lg border border-white/[0.08] bg-black/40 p-2.5">
            <p className="font-medium">Red Nail Polish</p>
            <p className="text-emerald-400">$8.99 · Nail Couture</p>
            <p className="mt-1 text-[11px] text-white/50">
              Rich glossy red hue, quick-drying formula
            </p>
          </div>
        </div>
        <div
          data-chat-bubble
          className="chat-bubble anime-reveal ml-auto max-w-[70%] rounded-2xl rounded-br-md bg-emerald-600 px-3.5 py-2.5 text-white"
        >
          I&apos;ll order that
        </div>
        <div
          data-chat-bubble
          className="chat-bubble anime-reveal max-w-[92%] rounded-2xl rounded-bl-md border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-2.5"
        >
          <p className="font-medium text-emerald-300">✓ Saved — order #12</p>
          <p className="mt-1 text-[11px] text-white/60">
            Red Nail Polish · 1 × $8.99 = $8.99
          </p>
          <p className="mt-1 text-[11px] text-white/50">
            📧 Confirmation sent to customer
          </p>
        </div>
      </div>

      <div className="relative border-t border-white/[0.06] p-3">
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
          <span className="flex-1 text-xs text-white/30">Ask your agent…</span>
          <span className="rounded-lg bg-emerald-500 px-3 py-1 text-xs font-medium text-black">
            Send
          </span>
        </div>
      </div>
    </div>
  );
}
