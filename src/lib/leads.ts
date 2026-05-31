import { promises as fs } from "fs";
import path from "path";
import {
  EarlyAccessTrialError,
  provisionEarlyAccessTrial,
} from "@/lib/stripe/early-access-trial";
import { getStripeTrialDays } from "@/lib/stripe/plans";
import { isStripeConfigured } from "@/lib/stripe/server";

export type EarlyAccessLead = {
  email: string;
  name?: string;
  company?: string;
  source?: string;
  createdAt: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  subscriptionStatus?: string;
  trialEnd?: string;
  cardBrand?: string;
  cardLast4?: string;
};

const LEADS_FILE = path.join(process.cwd(), "data", "leads.json");

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getSignupUrl(email: string): string {
  const base =
    process.env.DOCBRAIN_APP_URL?.trim() ||
    process.env.NEXT_PUBLIC_DOCBRAIN_APP_URL?.trim() ||
    "http://localhost:3000";
  const url = new URL("/signup", base.replace(/\/$/, ""));
  url.searchParams.set("email", email);
  return url.toString();
}

async function ensureLeadsFile(): Promise<void> {
  const dir = path.dirname(LEADS_FILE);
  await fs.mkdir(dir, { recursive: true });
  try {
    await fs.access(LEADS_FILE);
  } catch {
    await fs.writeFile(LEADS_FILE, "[]", "utf8");
  }
}

async function readLeads(): Promise<EarlyAccessLead[]> {
  await ensureLeadsFile();
  const raw = await fs.readFile(LEADS_FILE, "utf8");
  return JSON.parse(raw) as EarlyAccessLead[];
}

async function writeLeads(leads: EarlyAccessLead[]): Promise<void> {
  await ensureLeadsFile();
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf8");
}

async function notifyWebhook(lead: EarlyAccessLead): Promise<void> {
  const url = process.env.LEADS_WEBHOOK_URL?.trim();
  if (!url) return;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  }).catch((error) => {
    console.error("[leads:webhook]", error);
  });
}

async function notifyByEmail(lead: EarlyAccessLead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.LEADS_NOTIFY_EMAIL?.trim();
  const from =
    process.env.LEADS_FROM_EMAIL?.trim() ?? "DocBrain <onboarding@resend.dev>";

  if (!apiKey || !to) return;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New DocBrain early access: ${lead.email}`,
      html: `<p><strong>Email:</strong> ${lead.email}</p>
             <p><strong>Name:</strong> ${lead.name ?? "—"}</p>
             <p><strong>Company:</strong> ${lead.company ?? "—"}</p>
             <p><strong>Source:</strong> ${lead.source ?? "landing"}</p>
             <p><strong>Stripe customer:</strong> ${lead.stripeCustomerId ?? "—"}</p>
             <p><strong>Subscription:</strong> ${lead.stripeSubscriptionId ?? "—"} (${lead.subscriptionStatus ?? "—"})</p>
             <p><strong>Time:</strong> ${lead.createdAt}</p>`,
    }),
  }).catch((error) => {
    console.error("[leads:email]", error);
  });
}

export async function saveEarlyAccessLead(input: {
  email: string;
  name?: string;
  company?: string;
  source?: string;
  stripeSetupIntentId?: string;
}): Promise<
  | {
      ok: true;
      trialDays: number;
      signupUrl: string;
      alreadyEnrolled?: boolean;
    }
  | { ok: false; error: string }
> {
  const email = input.email.trim().toLowerCase();
  const name = input.name?.trim();
  const company = input.company?.trim();
  const setupIntentId = input.stripeSetupIntentId?.trim() ?? "";

  if (!email || !isValidEmail(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (!name) {
    return { ok: false, error: "Please enter your name." };
  }

  if (!isStripeConfigured()) {
    return {
      ok: false,
      error: "Free access is not available yet. Please try again later.",
    };
  }

  if (!setupIntentId) {
    return {
      ok: false,
      error: "Payment details are required to start free access.",
    };
  }

  const leads = await readLeads();
  const existingIndex = leads.findIndex((lead) => lead.email === email);
  const existing = existingIndex >= 0 ? leads[existingIndex] : undefined;

  if (existing?.stripeSubscriptionId) {
    return {
      ok: true,
      trialDays: getStripeTrialDays(),
      signupUrl: getSignupUrl(email),
      alreadyEnrolled: true,
    };
  }

  let trial;
  try {
    trial = await provisionEarlyAccessTrial({
      email,
      name,
      company,
      setupIntentId,
    });
  } catch (error) {
    if (error instanceof EarlyAccessTrialError) {
      return { ok: false, error: error.message };
    }
    return {
      ok: false,
      error: "Could not start free access. Please try again.",
    };
  }

  const lead: EarlyAccessLead = {
    email,
    name,
    company: company || undefined,
    source: input.source?.trim() || "landing",
    createdAt: existing?.createdAt ?? new Date().toISOString(),
    stripeCustomerId: trial.stripeCustomerId,
    stripeSubscriptionId: trial.stripeSubscriptionId,
    subscriptionStatus: trial.subscriptionStatus,
    trialEnd: trial.trialEnd ?? undefined,
    cardBrand: trial.cardBrand || undefined,
    cardLast4: trial.cardLast4 || undefined,
  };

  if (existingIndex >= 0) {
    leads[existingIndex] = lead;
  } else {
    leads.push(lead);
  }

  await writeLeads(leads);
  await Promise.all([notifyWebhook(lead), notifyByEmail(lead)]);

  return {
    ok: true,
    trialDays: trial.trialDays,
    signupUrl: getSignupUrl(email),
  };
}
