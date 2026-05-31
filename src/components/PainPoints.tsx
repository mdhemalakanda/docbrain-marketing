import { AnimateIn } from "./ui/AnimateIn";

const QUOTES = [
  {
    platform: "DM",
    text: "I can't reply to every message fast enough — customers leave before I respond.",
  },
  {
    platform: "Email",
    text: "I copy order details from chat into spreadsheets. One typo and the whole order is wrong.",
  },
  {
    platform: "WhatsApp",
    text: "After hours I lose sales. People want to order at night but nobody's online.",
  },
  {
    platform: "Store",
    text: "My team answers the same product questions 50 times a day. There has to be a better way.",
  },
  {
    platform: "Ops",
    text: "Confirmation emails get forgotten. Customers ask 'did my order go through?' constantly.",
  },
];

export function PainPoints() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnimateIn className="mx-auto max-w-2xl text-center">
          <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-400 transition-all duration-300 hover:bg-orange-500/20">
            Sound familiar?
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            The struggle is real
          </h2>
          <p className="mt-4 text-white/55">
            Every growing business hits the same wall — manual sales don&apos;t scale.
          </p>
        </AnimateIn>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {QUOTES.map((quote, index) => (
            <AnimateIn key={quote.text} delay={index * 60}>
              <blockquote className="card-interactive h-full rounded-2xl p-5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/30">
                  {quote.platform}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  &ldquo;{quote.text}&rdquo;
                </p>
              </blockquote>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn className="mt-12 text-center" delay={300}>
          <p className="text-lg font-medium">
            We built <span className="gradient-text">DocBrain</span> for you.
          </p>
          <p className="mt-2 text-sm text-white/50">
            Automate the full sales loop — so every customer gets a perfect reply.
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
