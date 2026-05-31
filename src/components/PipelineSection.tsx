import { AnimateIn, Stagger } from "./ui/AnimateIn";
import { TiltCard } from "./ui/TiltCard";

const ASSETS = [
  {
    title: "Product catalog",
    size: "Upload once",
    desc: "JSON, CSV, or XLSX — your agent learns every product, price, and detail.",
    icon: "📦",
  },
  {
    title: "Sales chat agent",
    size: "24/7",
    desc: "Answers questions, suggests products, and guides customers to purchase.",
    icon: "💬",
  },
  {
    title: "Checkout & orders",
    size: "Auto-saved",
    desc: "Collects details, saves orders, and confirms totals — no manual entry.",
    icon: "🛒",
  },
  {
    title: "Order confirmation",
    size: "Email + chat",
    desc: "Branded confirmation emails and in-chat receipts for every order.",
    icon: "✉️",
  },
];

export function PipelineSection() {
  return (
    <section className="section-glow py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnimateIn className="mx-auto max-w-2xl text-center" direction="scale">
          <span className="section-label">Full pipeline</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            One Agent. Four Outcomes.
          </h2>
          <p className="mt-4 text-white/55">
            Every DocBrain setup gives you a complete sales automation stack — not
            just a chatbot.
          </p>
        </AnimateIn>

        <Stagger
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          staggerMs={100}
          direction="scale"
        >
          {ASSETS.map((item) => (
            <TiltCard key={item.title} className="h-full rounded-2xl" intensity={12}>
              <div className="card-interactive group h-full rounded-2xl p-6">
                <span className="icon-pop text-2xl">{item.icon}</span>
                <p className="mt-4 text-xs font-medium uppercase tracking-wider text-emerald-400">
                  {item.size}
                </p>
                <h3 className="mt-2 text-lg font-semibold transition-colors group-hover:text-emerald-300">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {item.desc}
                </p>
              </div>
            </TiltCard>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
