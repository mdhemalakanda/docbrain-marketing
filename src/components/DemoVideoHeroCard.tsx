"use client";

import { animate } from "animejs";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  DEMO_VIDEO_TITLE,
  getDemoVideoPosterUrl,
  getDemoVideoUrl,
} from "@/lib/demo-video";
import { prefersReducedMotion } from "@/lib/motion";

type DemoVideoHeroCardProps = {
  className?: string;
};

export function DemoVideoHeroCard({ className = "" }: DemoVideoHeroCardProps) {
  const [playing, setPlaying] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const auroraRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLButtonElement>(null);
  const playBtnRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || playing) return;

    const aurora = auroraRef.current;
    const playBtn = playBtnRef.current;
    if (!aurora) return;

    animate(aurora, {
      translateX: [0, 18, -12, 0],
      translateY: [0, -14, 10, 0],
      scale: [1, 1.06, 0.98, 1],
      duration: 12000,
      ease: "inOut(2)",
      loop: true,
    });

    if (playBtn) {
      animate(playBtn, {
        boxShadow: [
          "0 0 0 0 rgba(16, 185, 129, 0.4)",
          "0 0 0 16px rgba(16, 185, 129, 0)",
        ],
        duration: 2000,
        ease: "out(2)",
        loop: true,
      });
    }
  }, [playing]);

  const startPlayback = async () => {
    const video = videoRef.current;
    const banner = bannerRef.current;
    if (!video) return;

    if (banner && !prefersReducedMotion()) {
      await new Promise<void>((resolve) => {
        animate(banner, {
          opacity: [1, 0],
          scale: [1, 1.02],
          filter: ["blur(0px)", "blur(8px)"],
          duration: 320,
          ease: "in(2)",
          onComplete: () => resolve(),
        });
      });
    }

    setPlaying(true);
    try {
      await video.play();
    } catch {
      // Native controls remain available if play fails.
    }
  };

  return (
    <div
      ref={shellRef}
      data-hero-play
      className={`demo-video-hero-shell group relative mx-auto w-full ${className}`}
    >
      <div ref={auroraRef} className="demo-video-hero-aurora pointer-events-none" aria-hidden />
      <div className="demo-video-hero-ring pointer-events-none" aria-hidden />

      <div className="demo-video-glass relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-[border-color,box-shadow] duration-500 group-hover:border-emerald-400/25 group-hover:shadow-[0_28px_90px_rgba(16,185,129,0.12)] sm:rounded-3xl sm:p-2.5">
        <div className="relative aspect-video overflow-hidden rounded-xl bg-[#0a1218] sm:rounded-2xl">
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              playing ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            src={getDemoVideoUrl()}
            poster={getDemoVideoPosterUrl()}
            preload="none"
            playsInline
            controls={playing}
            onEnded={() => setPlaying(false)}
          />

          {!playing ? (
            <button
              ref={bannerRef}
              type="button"
              onClick={() => void startPlayback()}
              className="demo-video-banner absolute inset-0 overflow-hidden text-left transition-transform duration-500 group-hover:scale-[1.008]"
              aria-label={`Play ${DEMO_VIDEO_TITLE}`}
            >
              <Image
                src={getDemoVideoPosterUrl()}
                alt=""
                fill
                priority
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover object-top"
              />

              <div className="demo-video-banner-shine pointer-events-none" aria-hidden />
              <div className="demo-video-banner-gradient pointer-events-none" aria-hidden />

              <div className="relative z-[1] flex h-full flex-col justify-between p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="demo-video-banner-badge">Product demo</span>
                  <span className="demo-video-banner-badge demo-video-banner-badge-muted">
                    AI sales agent
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center py-2 text-center">
                  <span
                    ref={playBtnRef}
                    className="relative flex h-16 w-16 items-center justify-center rounded-full border border-emerald-300/45 bg-emerald-500/20 shadow-[0_0_48px_rgba(16,185,129,0.38)] backdrop-blur-md transition-transform duration-300 group-hover:scale-105 sm:h-[4.5rem] sm:w-[4.5rem]"
                  >
                    <span
                      className="ml-1 block h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-white drop-shadow"
                      aria-hidden
                    />
                  </span>
                  <p className="mt-4 text-sm font-semibold text-white sm:text-base">
                    Watch the sales agent demo
                  </p>
                  <p className="mt-1 max-w-sm text-xs text-white/65 sm:text-sm">
                    Full dashboard walkthrough — catalog, chat checkout, and orders
                  </p>
                </div>

                <div className="flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white/95">
                      DocBrain Store Agent
                    </p>
                    <p className="mt-0.5 text-[11px] text-white/55 sm:text-xs">
                      Browse → order → confirmation
                    </p>
                  </div>
                  <span className="demo-video-banner-cta shrink-0">Play video</span>
                </div>
              </div>
            </button>
          ) : null}
        </div>

        <div className="flex items-center justify-between gap-3 px-3 py-3 sm:px-4">
          <div className="min-w-0 text-left">
            <p className="truncate text-sm font-medium text-white/90">
              {DEMO_VIDEO_TITLE}
            </p>
            <p className="mt-0.5 text-xs text-white/45">
              Catalog browse → checkout → order saved
            </p>
          </div>
          {!playing ? (
            <span className="hidden shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-wider text-white/50 sm:inline">
              Click to play
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
