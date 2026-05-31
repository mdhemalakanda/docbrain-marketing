"use client";

import { animate } from "animejs";
import { useEffect, useRef } from "react";
import { DEMO_VIDEO_TITLE, getDemoVideoUrl } from "@/lib/demo-video";
import { prefersReducedMotion } from "@/lib/motion";

type DemoVideoModalProps = {
  open: boolean;
  onClose: () => void;
};

export function DemoVideoModal({ open, onClose }: DemoVideoModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    const backdrop = backdropRef.current;
    const panel = panelRef.current;
    if (backdrop && panel && !prefersReducedMotion()) {
      animate(backdrop, {
        opacity: [0, 1],
        duration: 280,
        ease: "out(3)",
      });
      animate(panel, {
        opacity: [0, 1],
        scale: [0.92, 1],
        y: [24, 0],
        duration: 420,
        ease: "out(4)",
      });
    }

    const video = videoRef.current;
    if (video) {
      void video.play().catch(() => {
        // Autoplay may require user gesture on some browsers; controls remain available.
      });
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={backdropRef}
      className="demo-video-modal-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={DEMO_VIDEO_TITLE}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        className="demo-video-modal-panel relative w-full max-w-5xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-2 right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/80 transition hover:border-white/30 hover:bg-black/80 hover:text-white sm:-top-12"
          aria-label="Close video"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_32px_120px_rgba(0,0,0,0.65)]">
          <div className="border-b border-white/10 px-4 py-3 sm:px-5">
            <p className="text-sm font-medium text-white/90">{DEMO_VIDEO_TITLE}</p>
            <p className="mt-0.5 text-xs text-white/45">
              Catalog browse → checkout → order saved in dashboard
            </p>
          </div>
          <div className="relative aspect-video bg-black">
            <video
              ref={videoRef}
              className="h-full w-full object-contain"
              src={getDemoVideoUrl()}
              controls
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
