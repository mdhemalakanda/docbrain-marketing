"use client";

import { animate } from "animejs";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, REVEAL_EASE } from "@/lib/motion";
import { AnimateIn, Stagger } from "./ui/AnimateIn";

const FAQS = [
  {
    q: "What is DocBrain?",
    a: "DocBrain is an AI sales platform for businesses. You create a Sales agent, upload your product catalog, connect channels (WordPress, WhatsApp, Telegram, Messenger, Instagram), and the agent handles product questions, checkout, order saving, and confirmation emails — automatically.",
  },
  {
    q: "How do I create a sales agent?",
    a: "Sign in to DocBrain → Create Agent → choose Sales action → upload product catalog (JSON, CSV, or XLSX) → add instructions and optional training docs → save. Test in dashboard chat, then connect your channels.",
  },
  {
    q: "Which channels are supported?",
    a: "WordPress (floating chat widget), WhatsApp Business, Telegram bot, Facebook Messenger, and Instagram DMs (Professional accounts). One agent powers all channels with the same catalog and checkout logic.",
  },
  {
    q: "How does a customer place an order?",
    a: "They chat naturally — browse products, pick an item, say “I’ll order” or “Red Nail Polish i’ll order”. The agent collects name, email, and shipping address, saves the order, shows a ✓ Saved receipt in chat, and sends a confirmation email.",
  },
  {
    q: "Will the AI make up prices or products?",
    a: "No. Product search, browse, and checkout run from your uploaded catalog on DocBrain servers. The AI answers general questions from your docs, but prices and product names come from your real data.",
  },
  {
    q: "What happens when AI usage limits are hit?",
    a: "Critical sales actions — catalog lists, product search, checkout, order save, and email resend — are handled server-side without calling the AI. Your store keeps selling even during traffic spikes or limit events.",
  },
  {
    q: "Can I reply manually to customers?",
    a: "Yes. Chats → WordPress / WhatsApp / Telegram / Messenger / Instagram lets you read conversations and send manual support replies alongside the AI agent.",
  },
  {
    q: "Where do I see orders?",
    a: "Orders page in your dashboard — every sale from every channel. Click any order for full details: product, qty, total, customer name, email, phone, address. Update status inline (Processing, Completed, etc.).",
  },
  {
    q: "Do customers get email confirmations?",
    a: "Yes, when Resend is configured. Branded HTML confirmation after create/update. Customers can ask the agent to resend (“mail me order”) and it uses the email on their order.",
  },
  {
    q: "Is customer data private?",
    a: "Each chat session only accesses its own orders. The agent refuses requests for other customers’ data, store-wide stats, or internal admin information.",
  },
  {
    q: "Do I need developers?",
    a: "No for most setups. Upload catalog, create agent, paste WordPress key or Meta webhook credentials. WordPress plugin handles the widget; Meta handles WhatsApp/Instagram/Messenger webhooks.",
  },
  {
    q: "When does early access open?",
    a: "Start free access on this page — add a card for your trial, then create your DocBrain account. You won't be charged until the trial ends.",
  },
];

function FaqChevron({ open }: { open: boolean }) {
  return (
    <span
      className={`faq-chevron flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-emerald-400/80 ${open ? "faq-chevron-open" : ""}`}
      aria-hidden
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M7 2.5v9M2.5 7h9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function FaqItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof FAQS)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const inner = innerRef.current;
    const wrapper = contentRef.current;
    if (!inner || !wrapper) return;

    if (prefersReducedMotion()) {
      wrapper.style.height = isOpen ? "auto" : "0px";
      wrapper.style.opacity = isOpen ? "1" : "0";
      return;
    }

    const targetHeight = isOpen ? inner.offsetHeight : 0;
    const animation = animate(wrapper, {
      height: targetHeight,
      opacity: isOpen ? [0, 1] : [1, 0],
      duration: isOpen ? 420 : 320,
      ease: REVEAL_EASE,
    });

    return () => {
      animation.revert();
    };
  }, [isOpen]);

  return (
    <div
      className={`faq-card rounded-2xl border px-4 py-4 sm:px-5 sm:py-5 ${
        isOpen
          ? "border-emerald-500/25 bg-emerald-500/[0.04]"
          : "border-white/[0.08] bg-white/[0.02]"
      }`}
    >
      <button
        type="button"
        className="flex w-full items-start justify-between gap-3 text-left sm:gap-4"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span
          className={`min-w-0 flex-1 text-[15px] font-medium leading-snug sm:text-base ${
            isOpen ? "text-white" : "text-white/90"
          }`}
        >
          {item.q}
        </span>
        <FaqChevron open={isOpen} />
      </button>

      <div
        ref={contentRef}
        className="faq-answer overflow-hidden"
        style={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
      >
        <p
          ref={innerRef}
          className="pt-3 text-sm leading-relaxed text-white/55 sm:pt-4 sm:text-[15px]"
        >
          {item.a}
        </p>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <AnimateIn className="text-center">
          <span className="section-label">FAQ</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/55 sm:text-lg">
            Everything you need to know before you buy — setup, channels, sales
            flow, orders, and email.
          </p>
        </AnimateIn>

        <Stagger className="mt-10 space-y-3 sm:mt-12 sm:space-y-4" staggerMs={70}>
          {FAQS.map((item, index) => (
            <div key={item.q} data-stagger>
              <FaqItem
                item={item}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
