import { NextResponse } from "next/server";
import { saveEarlyAccessLead } from "@/lib/leads";

export const runtime = "nodejs";

type Body = {
  email?: string;
  name?: string;
  company?: string;
  source?: string;
  stripeSetupIntentId?: string;
};

export async function POST(request: Request) {
  let body: Body;

  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const result = await saveEarlyAccessLead({
    email: body.email ?? "",
    name: body.name,
    company: body.company,
    source: body.source,
    stripeSetupIntentId: body.stripeSetupIntentId,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    trialDays: result.trialDays,
    signupUrl: result.signupUrl,
    alreadyEnrolled: result.alreadyEnrolled ?? false,
  });
}
