import Stripe from "stripe";

const stripeClientByKey = new Map<string, Stripe>();

export function getStripeSecretKeyFromEnv(): string {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }
  return key;
}

export function getStripePublishableKey(): string {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim();
  if (!key) {
    throw new Error("Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY");
  }
  return key;
}

export function isStripeConfigured(): boolean {
  return Boolean(
    process.env.STRIPE_SECRET_KEY?.trim() &&
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim()
  );
}

export function getStripeServerClient(secretKey?: string): Stripe {
  const key = secretKey?.trim() || getStripeSecretKeyFromEnv();
  const cached = stripeClientByKey.get(key);
  if (cached) return cached;
  const client = new Stripe(key);
  stripeClientByKey.set(key, client);
  return client;
}
