import { isStripeConfigured, getStripeServerClient } from "@/lib/stripe/server";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Body = {
  name?: string;
  email?: string;
  company?: string;
};

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "Payment setup is not available right now." },
      { status: 503 }
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = body.name?.trim() || undefined;
  const email = body.email?.trim().toLowerCase() || undefined;
  const company = body.company?.trim() || undefined;

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required before adding a card." },
      { status: 400 }
    );
  }

  try {
    const stripe = getStripeServerClient();
    const setupIntent = await stripe.setupIntents.create({
      payment_method_types: ["card", "us_bank_account"],
      usage: "off_session",
      metadata: {
        source: "docbrain_early_access",
        name,
        email,
        company: company ?? "",
      },
    });

    if (!setupIntent.client_secret) {
      return NextResponse.json(
        { error: "Could not initialize payment setup." },
        { status: 500 }
      );
    }

    return NextResponse.json({ clientSecret: setupIntent.client_secret });
  } catch (error) {
    console.error("[stripe setup-intent]", error);
    return NextResponse.json(
      { error: "Could not initialize payment setup. Please try again." },
      { status: 500 }
    );
  }
}
