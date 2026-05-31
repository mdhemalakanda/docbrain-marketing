import { AnimateIn } from "./ui/AnimateIn";
import { EarlyAccessForm } from "./EarlyAccessForm";

export function EarlyAccessSection() {
  return (
    <section id="early-access" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 glow-brand" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <AnimateIn direction="scale">
          <div className="border-glow cta-glow card-interactive overflow-hidden rounded-3xl border-emerald-500/20 bg-gradient-to-b from-emerald-500/[0.08] to-transparent p-8 sm:p-12 lg:p-16">
            <div className="mx-auto max-w-2xl text-center">
              <span className="section-label">Early access</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Automate your sales
                <br />
                before your competitors do
              </h2>
              <p className="mt-4 text-white/55">
                Start your free trial today. Add a card to unlock DocBrain — you
                won&apos;t be charged until the trial ends. Full sales automation
                from catalog to checkout to order email.
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-md">
              <EarlyAccessForm source="footer-cta" />
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
