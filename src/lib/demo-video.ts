export function getDemoVideoUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_DEMO_VIDEO_URL?.trim();
  if (explicit) return explicit;

  // Bundled with the marketing site (public/demo/) after copy from dashboard recorder
  return "/demo/docbrain-sales-agent-demo.mp4";
}

export const DEMO_VIDEO_TITLE = "DocBrain Sales Agent — full walkthrough";
