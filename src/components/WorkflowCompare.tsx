import { AnimateIn } from "./ui/AnimateIn";

const MANUAL_STEPS = [
  { step: "Reply to every DM and email manually", time: "Hours daily" },
  { step: "Look up products and prices yourself", time: "15 min each" },
  { step: "Copy order details into a spreadsheet", time: "10 min" },
  { step: "Send confirmation emails one by one", time: "5 min each" },
  { step: "Miss messages after hours → lost sales", time: "Every night" },
];

export function WorkflowCompare() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnimateIn className="mx-auto max-w-2xl text-center">
          <span className="section-label">Compare</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Your current workflow
            <br />
            vs. what it could be
          </h2>
        </AnimateIn>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <AnimateIn delay={100} direction="left">
            <div className="card-interactive h-full rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white/70">
                  The usual process
                </h3>
                <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400">
                  ~Hours/day
                </span>
              </div>
              <ol className="mt-6 space-y-4">
                {MANUAL_STEPS.map((item, index) => (
                  <li
                    key={item.step}
                    className="flex gap-4 transition-transform duration-300 hover:translate-x-1"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-xs font-bold text-red-400">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm text-white/70">{item.step}</p>
                      <p className="mt-0.5 text-xs text-white/35">{item.time}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-6 border-t border-white/[0.06] pt-4 text-sm text-white/40">
                …and you still lose customers who expect instant replies
              </p>
            </div>
          </AnimateIn>

          <AnimateIn delay={200} direction="right">
            <div className="card-interactive relative h-full overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6 sm:p-8">
              <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl transition-all duration-700 group-hover:bg-emerald-500/20" />
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">With DocBrain</h3>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-400">
                  ~2 min setup
                </span>
              </div>
              <ol className="mt-6 space-y-5">
                {[
                  "Upload your product catalog",
                  "Configure your sales agent",
                  "Embed chat on your site or connect WhatsApp",
                ].map((step, index) => (
                  <li
                    key={step}
                    className="flex items-center gap-4 transition-transform duration-300 hover:translate-x-2"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-400">
                      {index + 1}
                    </span>
                    <p className="text-sm">{step}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-8 rounded-xl border border-emerald-500/20 bg-black/30 p-4 transition-colors duration-300 hover:border-emerald-500/40 hover:bg-black/40">
                <p className="text-sm font-medium text-emerald-300">
                  Agent handles the rest
                </p>
                <p className="mt-2 text-xs leading-relaxed text-white/50">
                  Browse → order → checkout → confirmation email. Automatically.
                </p>
              </div>

              <p className="mt-6 text-sm font-medium text-emerald-400">
                24/7 sales · Zero copy-paste · Every channel
              </p>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
