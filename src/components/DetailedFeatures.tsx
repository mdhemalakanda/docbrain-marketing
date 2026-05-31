import { AnimateIn } from "./ui/AnimateIn";

const FEATURE_GROUPS = [
  {
    title: "AI sales agent",
    desc: "The core that talks to customers and closes sales.",
    items: [
      {
        title: "Sales action mode",
        desc: "Dedicated Sales agents with required product catalog. Answers from your data — never invented prices or SKUs.",
      },
      {
        title: "Warm, human replies",
        desc: "Natural chat style — not robotic scripts. Markdown formatting for product lists, code, and tables.",
      },
      {
        title: "Catalog-first search",
        desc: "Browse, suggest, and keyword search run server-side from your uploaded catalog — up to 120 products per request.",
      },
      {
        title: "Training documents",
        desc: "Upload PDF, DOCX, TXT, CSV, XLSX, JSON (up to 10 files). Agent searches docs + catalog before answering.",
      },
      {
        title: "Vision & voice",
        desc: "Customers can send images or use voice input. Agent understands photos and spoken questions.",
      },
      {
        title: "Smart routing",
        desc: "Groq for fast text, Z.AI for images and fallback. Auto model rotation on errors or limits.",
      },
    ],
  },
  {
    title: "Automated checkout & orders",
    desc: "From “I want to order” to saved order — no manual data entry.",
    items: [
      {
        title: "Order intent detection",
        desc: "Recognizes “I’ll order”, “buy Red Nail Polish”, and product names from prior chat — starts checkout, not another search.",
      },
      {
        title: "Step-by-step checkout",
        desc: "Collects name, email, shipping address, optional phone. Prompts only for missing fields.",
      },
      {
        title: "Order confirmation in chat",
        desc: "✓ Saved — order #N | product | qty × price = total. Ships-to and email status shown clearly.",
      },
      {
        title: "Confirmation email",
        desc: "Branded HTML email via Resend after every create/update. Resend on request (“mail me order”).",
      },
      {
        title: "Order updates",
        desc: "Customers can update quantity or details in chat. Existing session order updates instead of duplicating.",
      },
      {
        title: "Privacy by session",
        desc: "Each visitor only sees their own orders. Admin stats and other customers’ data are refused in chat.",
      },
    ],
  },
  {
    title: "Owner dashboard",
    desc: "Run your AI sales operation from one panel.",
    items: [
      {
        title: "Orders page",
        desc: "All sales from every channel. Product, unit price, qty, total, customer name, email, phone, address.",
      },
      {
        title: "Order status tracking",
        desc: "WooCommerce-style statuses: Pending, Processing, On hold, Completed, Cancelled, Refunded, Failed.",
      },
      {
        title: "Multi-channel inbox",
        desc: "Chats → WordPress, WhatsApp, Telegram, Messenger, Instagram. Reply manually when you want to take over.",
      },
      {
        title: "Agent management",
        desc: "Create, edit, enable/disable agents. Test in dashboard chat before going live on channels.",
      },
      {
        title: "Live notifications",
        desc: "Bell alerts for new visitor messages, orders, and support events. Realtime updates via Supabase.",
      },
      {
        title: "Sites & integrations",
        desc: "Manage WordPress sites, connection keys, and per-channel credentials from Integrations hub.",
      },
    ],
  },
  {
    title: "Reliability at scale",
    desc: "Built for real businesses with real traffic.",
    items: [
      {
        title: "Sales without AI",
        desc: "Catalog browse, checkout, and order email run server-side first — sales continue when LLM limits are hit.",
      },
      {
        title: "Rate limiting",
        desc: "Per-visitor caps on WordPress, WhatsApp, Telegram, Messenger — friendly errors, not crashes.",
      },
      {
        title: "Long chat support",
        desc: "40+ message threads still work. History trimmed smartly, not blocked.",
      },
      {
        title: "Safe product display",
        desc: "Customers see name, price, brand, short description only — no internal ids, SKUs, reviews, or emails in lists.",
      },
      {
        title: "Webhook dedupe",
        desc: "Meta and messaging webhooks deduplicated at DB level — no double replies at scale.",
      },
      {
        title: "BYOK option",
        desc: "Bring your own Groq/Z.AI keys for unlimited usage outside platform billing caps.",
      },
    ],
  },
];

export function DetailedFeatures() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnimateIn className="mx-auto max-w-2xl text-center">
          <span className="section-label">Full feature list</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Every detail of how DocBrain works
          </h2>
          <p className="mt-4 text-white/55">
            Not a generic chatbot — a complete sales automation platform with
            agent, channels, checkout, orders, email, and owner tools.
          </p>
        </AnimateIn>

        <div className="mt-16 space-y-16">
          {FEATURE_GROUPS.map((group, groupIndex) => (
            <AnimateIn key={group.title} delay={groupIndex * 60}>
              <div>
              <div className="mb-8 border-b border-white/[0.06] pb-6">
                <h3 className="text-xl font-semibold sm:text-2xl">{group.title}</h3>
                <p className="mt-2 text-sm text-white/50">{group.desc}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <div key={item.title} className="feature-tile">
                    <h4 className="font-medium text-white/90">{item.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-white/45">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
