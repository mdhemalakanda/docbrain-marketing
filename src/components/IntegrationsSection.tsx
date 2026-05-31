"use client";

import { AnimateIn, Stagger } from "./ui/AnimateIn";

const CHANNELS = [
  {
    name: "WordPress",
    icon: "🌐",
    tagline: "Floating chat widget on your store",
    setup: [
      "Generate a connection key in DocBrain",
      "Install the DocBrain WordPress plugin",
      "Paste key → activate → widget goes live",
    ],
    features: [
      "Visitor chat on any page",
      "Typing indicators + session history",
      "Manual support replies from dashboard",
      "Sales orders saved per visitor session",
    ],
  },
  {
    name: "WhatsApp",
    icon: "💬",
    tagline: "Business number → AI sales agent",
    setup: [
      "Connect Meta access token + Phone number ID",
      "Set webhook URL in Meta dashboard",
      "Customers message your business number",
    ],
    features: [
      "Text + image messages",
      "Same catalog & checkout as website",
      "Reply from Chats → WhatsApp inbox",
      "Order confirmation email still sent",
    ],
  },
  {
    name: "Telegram",
    icon: "✈️",
    tagline: "Bot that sells while you sleep",
    setup: [
      "Paste bot token from @BotFather",
      "Connect in Integrations → Telegram",
      "DM the bot or @mention in groups",
    ],
    features: [
      "Photos and voice notes supported",
      "Group chat with @mention trigger",
      "Dashboard inbox for manual replies",
      "Full sales flow in Telegram DMs",
    ],
  },
  {
    name: "Facebook Messenger",
    icon: "📘",
    tagline: "Page inbox powered by DocBrain",
    setup: [
      "Page access token + Page ID",
      "Meta webhook callback URL",
      "Visitors message your Facebook Page",
    ],
    features: [
      "Messenger webhook integration",
      "Product Q&A from your catalog",
      "Checkout in Messenger thread",
      "Chats → Messenger support panel",
    ],
  },
  {
    name: "Instagram",
    icon: "📸",
    tagline: "DM sales for Instagram Professional accounts",
    setup: [
      "Meta access token + Instagram account ID",
      "Configure webhook in Meta app",
      "Manage threads in Chats → Instagram",
    ],
    features: [
      "Instagram DM automation",
      "Same agent brain as other channels",
      "Professional account required",
      "Unified order tracking in dashboard",
    ],
  },
];

export function IntegrationsSection() {
  return (
    <section id="integrations" className="section-glow py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnimateIn className="mx-auto max-w-2xl text-center">
          <span className="section-label">Integrations</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Sell everywhere your customers are
          </h2>
          <p className="mt-4 text-white/55">
            One sales agent. Five channels. Same catalog, checkout, orders, and
            confirmation emails — whether they chat on your site, WhatsApp, or
            Instagram.
          </p>
        </AnimateIn>

        <Stagger
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:gap-6"
          staggerMs={100}
        >
          {CHANNELS.map((channel, index) => (
            <div
              key={channel.name}
              className={`integration-card card-glow-hover group ${
                index === CHANNELS.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <span className="integration-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-2xl">
                  {channel.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold sm:text-xl">
                    {channel.name}
                  </h3>
                  <p className="mt-1 text-sm text-emerald-400/90">
                    {channel.tagline}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-6 border-t border-white/[0.06] pt-6 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/35">
                    How to connect
                  </p>
                  <ol className="mt-3 space-y-2">
                    {channel.setup.map((step, stepIndex) => (
                      <li
                        key={step}
                        className="flex gap-3 text-sm text-white/60"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[10px] font-bold text-white/50">
                          {stepIndex + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/35">
                    What you get
                  </p>
                  <ul className="mt-3 space-y-2">
                    {channel.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex gap-2 text-sm text-white/60"
                      >
                        <span className="text-emerald-400">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
