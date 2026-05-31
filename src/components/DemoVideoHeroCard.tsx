"use client";

import { animate } from "animejs";
import { useEffect, useRef, useState } from "react";
import { DEMO_VIDEO_TITLE, getDemoVideoUrl } from "@/lib/demo-video";
import { prefersReducedMotion } from "@/lib/motion";

type DemoVideoHeroCardProps = {
  className?: string;
};

export function DemoVideoHeroCard({ className = "" }: DemoVideoHeroCardProps) {
  const [playing, setPlaying] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const auroraRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

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
    if (!video) return;
    setPlaying(true);
    try {
      await video.play();
    } catch {
      // Controls remain available if autoplay is blocked after click (rare).
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
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
          <video
            ref={videoRef}
            className="aspect-video w-full bg-black object-cover"
            src={getDemoVideoUrl()}
            preload="metadata"
            playsInline
            controls={playing}
            onEnded={() => setPlaying(false)}
          />

          {!playing ? (
            <button
              ref={playBtnRef}
              type="button"
              onClick={() => void startPlayback()}
              className="demo-video-hero-overlay absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-black/20 via-black/35 to-black/55 transition-opacity duration-300"
              aria-label={`Play ${DEMO_VIDEO_TITLE}`}
            >
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-emerald-300/40 bg-emerald-500/15 shadow-[0_0_40px_rgba(16,185,129,0.35)] backdrop-blur-md transition-transform duration-300 group-hover:scale-105 sm:h-[4.5rem] sm:w-[4.5rem]">
                <span
                  className="ml-1 block h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-white drop-shadow"
                  aria-hidden
                />
              </span>
              <span className="text-sm font-medium text-white/85 sm:text-base">
                Watch the sales agent demo
              </span>
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
