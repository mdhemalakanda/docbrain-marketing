import {
  FieldLabel,
  MockInput,
  MockupCard,
  StackedMockup,
} from "./ui/MockupCard";
import { AnimateIn } from "./ui/AnimateIn";

const STEPS = [
  {
    num: "01",
    title: "Define your sales agent",
    desc: "Create a Sales agent in DocBrain. Name it, set a welcome message, upload your product catalog (JSON, CSV, or XLSX), and add training docs. This is the brain that powers every channel.",
    bullets: [
      "Sales action + required product catalog upload",
      "Up to 10 training documents (PDF, DOCX, TXT, CSV, XLSX, JSON)",
      "Custom instructions — tone, upsells, policies",
      "Profile image shown in every chat widget",
    ],
    mockup: (
      <MockupCard
        title="Agent identity"
        subtitle="Define the core DNA. This context fuels your sales AI."
        tip="Be specific about your products and audience. The more catalog detail you upload, the more accurate quotes and orders will be."
      >
        <div className="space-y-4">
          <div>
            <FieldLabel>Agent name *</FieldLabel>
            <MockInput value="Product Sales Agent" />
          </div>
          <div>
            <FieldLabel>Action *</FieldLabel>
            <MockInput value="Sales — product catalog required" />
          </div>
          <div>
            <FieldLabel>Instructions</FieldLabel>
            <MockInput
              multiline
              value="Be warm and helpful. Search the catalog first. Guide customers to order. Never invent prices."
            />
          </div>
          <div>
            <FieldLabel>Product catalog *</FieldLabel>
            <div className="flex items-center justify-between rounded-lg border border-dashed border-emerald-500/30 bg-emerald-500/[0.06] px-3 py-3">
              <span className="text-xs text-emerald-300">products_catalog.xlsx</span>
              <span className="text-[10px] text-white/40">248 products</span>
            </div>
          </div>
        </div>
      </MockupCard>
    ),
  },
  {
    num: "02",
    title: "Connect your channels",
    desc: "Turn on integrations from your dashboard — WordPress plugin, WhatsApp, Telegram, Facebook Messenger, or Instagram. One agent, same sales logic everywhere.",
    bullets: [
      "WordPress — floating chat widget on your store",
      "WhatsApp & Telegram — customers DM your business number/bot",
      "Messenger & Instagram — Meta Page / Professional account webhooks",
      "Enable/disable any channel without rebuilding the agent",
    ],
    mockup: (
      <MockupCard
        title="Integrations hub"
        subtitle="Connect where your customers already are."
        tip="Start with WordPress for your website, then add WhatsApp for mobile shoppers. Each channel shares the same catalog and checkout flow."
      >
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { name: "WordPress", status: "Connected", color: "emerald" },
            { name: "WhatsApp", status: "Connected", color: "emerald" },
            { name: "Telegram", status: "Ready", color: "white" },
            { name: "Messenger", status: "Ready", color: "white" },
            { name: "Instagram", status: "Ready", color: "white" },
          ].map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2.5"
            >
              <span className="text-xs font-medium">{item.name}</span>
              <span
                className={`text-[10px] ${
                  item.color === "emerald" ? "text-emerald-400" : "text-white/40"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-white/[0.03] px-3 py-2 text-[11px] text-white/45">
          WordPress: paste connection key → plugin activates → chat widget goes live
        </div>
      </MockupCard>
    ),
  },
  {
    num: "03",
    title: "Customers talk to your agent",
    desc: "Shoppers open chat on your site or message you on social. The agent searches your catalog, answers in a human tone, suggests products, and handles follow-up questions — 24/7.",
    bullets: [
      "Catalog browse: “show menu”, “suggest products”, category search",
      "Product cards with name, price, brand — no internal SKUs exposed",
      "Voice, images, and long conversations supported",
      "Each visitor gets their own private chat session",
    ],
    mockup: (
      <MockupCard
        title="Live customer chat"
        subtitle="WordPress widget · WhatsApp · Telegram · Messenger · Instagram"
      >
        <div className="space-y-2.5 text-xs">
          <div className="max-w-[88%] rounded-2xl rounded-bl-md bg-white/[0.06] px-3 py-2 text-white/75">
            Hi! I can help you browse our catalog and place an order. What are you looking for?
          </div>
          <div className="ml-auto max-w-[70%] rounded-2xl rounded-br-md bg-emerald-600 px-3 py-2 text-white">
            Show me red nail polish
          </div>
          <div className="max-w-[92%] rounded-2xl rounded-bl-md bg-white/[0.06] px-3 py-2">
            <p className="mb-2 font-medium text-white/90">Here&apos;s what I found:</p>
            <div className="rounded-lg border border-white/[0.08] bg-black/40 p-2.5">
              <p className="font-medium">Red Nail Polish</p>
              <p className="text-emerald-400">$8.99 · Nail Couture</p>
              <p className="mt-1 text-[10px] text-white/45">Rich glossy red, quick-drying</p>
            </div>
          </div>
        </div>
      </MockupCard>
    ),
  },
  {
    num: "04",
    title: "Sales are generated automatically",
    desc: "When a customer says “I’ll order”, the agent starts checkout — collects name, email, address, saves the order, and sends a confirmation email. No copy-paste into spreadsheets.",
    bullets: [
      "Order intent detected server-side — “Red Nail Polish i’ll order” works",
      "Checkout prompts for shipping details step by step",
      "✓ Saved confirmation in chat with order number and total",
      "Branded HTML confirmation email via Resend",
    ],
    mockup: (
      <MockupCard
        title="Checkout → order saved"
        subtitle="Server-side sales flow — works even when AI limits are hit."
        tip="Catalog search, checkout, and order email run on DocBrain servers first — so sales don't stop during traffic spikes."
      >
        <div className="space-y-2.5 text-xs">
          <div className="ml-auto max-w-[65%] rounded-2xl rounded-br-md bg-emerald-600 px-3 py-2 text-white">
            Red Nail Polish i&apos;ll order
          </div>
          <div className="max-w-[95%] rounded-2xl rounded-bl-md bg-white/[0.06] px-3 py-2 text-white/75">
            Great choice! <strong>Red Nail Polish</strong> — <strong>$8.99</strong>
            <br />
            <span className="text-white/50">Please share: name, email, shipping address</span>
          </div>
          <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-3">
            <p className="font-medium text-emerald-300">✓ Saved — order #12</p>
            <p className="mt-1 text-white/60">Red Nail Polish · 1 × $8.99 = $8.99</p>
            <p className="mt-1 text-white/45">📦 Ships to: Dhaka, Bangladesh</p>
            <p className="mt-1 text-white/45">📧 Confirmation sent to customer@email.com</p>
          </div>
        </div>
      </MockupCard>
    ),
  },
  {
    num: "05",
    title: "You manage everything in one dashboard",
    desc: "Every order lands in your Orders page. Reply manually from Chats when needed. Track status (Processing, Completed, etc.), resend emails, and see all conversations per channel.",
    bullets: [
      "Orders list with product, qty, total, customer details",
      "Per-channel inbox: WordPress, WhatsApp, Telegram, Messenger, Instagram",
      "WooCommerce-style order status updates",
      "Notifications when new messages or orders arrive",
    ],
    mockup: (
      <MockupCard
        title="Owner dashboard"
        subtitle="Orders, chats, and integrations — one place."
      >
        <div className="space-y-3">
          <div className="rounded-lg border border-white/[0.08] overflow-hidden">
            <div className="bg-white/[0.04] px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-white/40">
              Recent orders
            </div>
            {[
              { id: "#12", product: "Red Nail Polish", total: "$8.99", status: "Processing" },
              { id: "#11", product: "Beef Steak", total: "$12.99", status: "Completed" },
            ].map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between border-t border-white/[0.06] px-3 py-2.5 text-xs"
              >
                <div>
                  <span className="text-emerald-400">{order.id}</span>
                  <span className="mx-2 text-white/30">·</span>
                  <span>{order.product}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white/60">{order.total}</span>
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-400">
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 text-[10px] text-white/40">
            {["Chats", "Integrations", "Agents", "Billing"].map((tab) => (
              <span key={tab} className="rounded-md bg-white/[0.04] px-2 py-1">
                {tab}
              </span>
            ))}
          </div>
        </div>
      </MockupCard>
    ),
  },
];

export function ProductWalkthrough() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnimateIn className="mx-auto max-w-2xl text-center">
          <span className="section-label">Complete process</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            From setup to confirmed sale
            <br />
            in 5 steps
          </h2>
          <p className="mt-4 text-white/55">
            Exactly how DocBrain works — agent creation, channel connections,
            customer chat, automated checkout, and your owner dashboard.
          </p>
        </AnimateIn>

        <div className="mt-20 space-y-28">
          {STEPS.map((step, index) => (
            <AnimateIn
              key={step.num}
              delay={80}
              direction={index % 2 === 0 ? "up" : "up"}
            >
              <div
                className={`grid items-center gap-12 lg:grid-cols-2 ${
                  index % 2 === 1 ? "lg:[direction:rtl]" : ""
                }`}
              >
              <div className={index % 2 === 1 ? "lg:[direction:ltr]" : ""}>
                <span className="text-7xl font-bold text-white/[0.05]">{step.num}</span>
                <h3 className="mt-1 text-2xl font-semibold sm:text-3xl">{step.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">
                  {step.desc}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {step.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-2.5 text-sm text-white/60"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={index % 2 === 1 ? "lg:[direction:ltr]" : ""}>
                <StackedMockup depth={index === 0 ? 3 : 2}>{step.mockup}</StackedMockup>
              </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
