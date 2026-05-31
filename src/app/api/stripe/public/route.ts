import {
  getStripePublishableKey,
  getStripeSecretKeyFromEnv,
  isStripeConfigured,
} from "@/lib/stripe/server";
import { getStripeTrialDays } from "@/lib/stripe/plans";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!isStripeConfigured()) {
    return NextResponse.json({
      configured: false,
      publishableKey: "",
      trialDays: getStripeTrialDays(),
    });
  }

  try {
    return NextResponse.json({
      configured: true,
      publishableKey: getStripePublishableKey(),
      trialDays: getStripeTrialDays(),
      hasPrice: Boolean(
        process.env.STRIPE_PRICE_ID_SILVER?.trim() ||
          process.env.STRIPE_SILVER_PRICE_ID?.trim()
      ),
    });
  } catch {
    try {
      getStripeSecretKeyFromEnv();
    } catch {
      return NextResponse.json({
        configured: false,
        publishableKey: "",
        trialDays: getStripeTrialDays(),
      });
    }
    return NextResponse.json({
      configured: false,
      publishableKey: "",
      trialDays: getStripeTrialDays(),
    });
  }
}
