export function getStripeTrialDays(): number {
  const raw = process.env.STRIPE_TRIAL_DAYS?.trim();
  if (!raw) return 10;
  const n = Number(raw);
  return Number.isInteger(n) && n >= 0 ? n : 10;
}

export function getSilverPriceId(): string {
  const priceId =
    process.env.STRIPE_PRICE_ID_SILVER?.trim() ||
    process.env.STRIPE_SILVER_PRICE_ID?.trim() ||
    "";
  if (!priceId) {
    throw new Error("MISSING_STRIPE_PRICE");
  }
  return priceId;
}
