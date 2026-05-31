import { getSilverPriceId, getStripeTrialDays } from "@/lib/stripe/plans";
import { getStripeServerClient } from "@/lib/stripe/server";

export type EarlyAccessTrialResult = {
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  subscriptionStatus: string;
  trialEnd: string | null;
  trialDays: number;
  cardBrand: string;
  cardLast4: string;
};

export class EarlyAccessTrialError extends Error {
  constructor(
    message: string,
    readonly code:
      | "PAYMENT_NOT_VERIFIED"
      | "MISSING_PAYMENT_METHOD"
      | "MISSING_STRIPE_PRICE"
      | "STRIPE_ERROR"
  ) {
    super(message);
    this.name = "EarlyAccessTrialError";
  }
}

export async function provisionEarlyAccessTrial(input: {
  email: string;
  name: string;
  company?: string;
  setupIntentId: string;
}): Promise<EarlyAccessTrialResult> {
  const stripe = getStripeServerClient();

  let setupIntent;
  try {
    setupIntent = await stripe.setupIntents.retrieve(input.setupIntentId);
  } catch {
    throw new EarlyAccessTrialError(
      "Payment verification failed. Please submit your card again.",
      "PAYMENT_NOT_VERIFIED"
    );
  }

  if (setupIntent.status !== "succeeded") {
    throw new EarlyAccessTrialError(
      "Payment verification failed. Please submit your card again.",
      "PAYMENT_NOT_VERIFIED"
    );
  }

  const paymentMethodId =
    typeof setupIntent.payment_method === "string"
      ? setupIntent.payment_method
      : setupIntent.payment_method?.id ?? "";

  if (!paymentMethodId) {
    throw new EarlyAccessTrialError(
      "Payment verification failed. Missing payment method.",
      "MISSING_PAYMENT_METHOD"
    );
  }

  let priceId: string;
  try {
    priceId = getSilverPriceId();
  } catch {
    throw new EarlyAccessTrialError(
      "Billing is not configured yet. Please contact support.",
      "MISSING_STRIPE_PRICE"
    );
  }

  const trialDays = getStripeTrialDays();
  let cardBrand = "";
  let cardLast4 = "";

  try {
    const customer = await stripe.customers.create({
      name: input.name,
      email: input.email,
      metadata: {
        source: "docbrain_early_access",
        company: input.company ?? "",
      },
    });

    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customer.id,
    });
    await stripe.customers.update(customer.id, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
    if (paymentMethod.type === "card") {
      cardBrand = paymentMethod.card?.brand ?? "";
      cardLast4 = paymentMethod.card?.last4 ?? "";
    } else if (paymentMethod.type === "us_bank_account") {
      cardBrand = paymentMethod.us_bank_account?.bank_name ?? "bank";
      cardLast4 = paymentMethod.us_bank_account?.last4 ?? "";
    }

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      default_payment_method: paymentMethodId,
      metadata: {
        source: "docbrain_early_access",
        email: input.email,
        company: input.company ?? "",
      },
      payment_settings: {
        save_default_payment_method: "on_subscription",
      },
      ...(trialDays > 0 ? { trial_period_days: trialDays } : {}),
    });

    return {
      stripeCustomerId: customer.id,
      stripeSubscriptionId: subscription.id,
      subscriptionStatus: subscription.status,
      trialEnd: subscription.trial_end
        ? new Date(subscription.trial_end * 1000).toISOString()
        : null,
      trialDays,
      cardBrand,
      cardLast4,
    };
  } catch (error) {
    console.error("[early-access-trial]", error);
    throw new EarlyAccessTrialError(
      "Could not start your free access. Please check your card and try again.",
      "STRIPE_ERROR"
    );
  }
}
