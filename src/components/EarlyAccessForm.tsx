"use client";

import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js";
import { useCallback, useEffect, useMemo, useState } from "react";

type Props = {
  source?: string;
  compact?: boolean;
  className?: string;
};

type StripePublicConfig = {
  configured: boolean;
  publishableKey: string;
  trialDays: number;
  loaded?: boolean;
};

const stripeAppearance: StripeElementsOptions["appearance"] = {
  theme: "night",
  variables: {
    colorPrimary: "#10b981",
    colorBackground: "#0c0c0c",
    colorText: "#ffffff",
    borderRadius: "12px",
  },
};

function PaymentStep({
  className,
  source,
  name,
  email,
  company,
  trialDays,
  clientSecret,
  onBack,
}: {
  className: string;
  source: string;
  name: string;
  email: string;
  company: string;
  trialDays: number;
  clientSecret: string;
  onBack: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");
  const [signupUrl, setSignupUrl] = useState("");

  const trialLabel =
    trialDays > 0 ? `${trialDays}-day free trial` : "Free access";

  async function handlePaymentSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!stripe || !elements) {
      setStatus("error");
      setMessage("Payment form is still loading. Please wait a moment.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const submitResult = await elements.submit();
      if (submitResult.error) {
        throw new Error(
          submitResult.error.message ??
            "Please complete your payment details."
        );
      }

      const confirmResult = await stripe.confirmSetup({
        elements,
        clientSecret,
        redirect: "if_required",
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: name.trim(),
              email: email.trim().toLowerCase(),
            },
          },
        },
      });

      if (confirmResult.error) {
        throw new Error(
          confirmResult.error.message ??
            "Could not verify your payment details."
        );
      }

      const setupIntentId = confirmResult.setupIntent?.id;
      if (!setupIntentId) {
        throw new Error("Payment verification failed. Please try again.");
      }

      const response = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          company,
          source,
          stripeSetupIntentId: setupIntentId,
        }),
      });

      const data = (await response.json()) as {
        error?: string;
        signupUrl?: string;
        trialDays?: number;
        alreadyEnrolled?: boolean;
      };

      if (!response.ok) {
        throw new Error(data.error ?? "Could not start free access.");
      }

      setSignupUrl(data.signupUrl ?? "");
      setStatus("success");
      setMessage(
        data.alreadyEnrolled
          ? "You already have free access. Create your DocBrain account to get started."
          : `Your ${data.trialDays ?? trialDays}-day free trial is active. Create your account to start using DocBrain.`
      );
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    }
  }

  if (status === "success") {
    return (
      <div
        className={`rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center transition-all duration-500 ${className}`}
      >
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-2xl animate-[float_2s_ease-in-out_infinite]">
          ✓
        </div>
        <p className="font-medium text-emerald-300">{message}</p>
        {signupUrl ? (
          <a
            href={signupUrl}
            className="btn-submit mt-5 inline-flex w-full items-center justify-center rounded-xl bg-white py-3.5 text-sm font-semibold text-black no-underline"
          >
            Create your account
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={(event) => void handlePaymentSubmit(event)} className={className}>
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-sm font-medium text-white/90">
          Add a card for {trialLabel}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-white/45">
          You won&apos;t be charged until your trial ends. Cancel anytime from
          your dashboard.
        </p>
        <div className="mt-4">
          <PaymentElement options={{ layout: "tabs" }} />
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl border border-white/15 px-4 py-3.5 text-sm font-medium text-white/70 transition hover:border-white/25 hover:text-white"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={status === "loading" || !stripe}
          className="btn-submit flex-1 rounded-xl bg-white py-3.5 text-sm font-semibold text-black disabled:opacity-60"
        >
          {status === "loading" ? "Starting…" : `Start ${trialLabel}`}
        </button>
      </div>

      {message ? (
        <p className="mt-3 text-center text-sm text-red-400">{message}</p>
      ) : null}
    </form>
  );
}

function EarlyAccessFormFlow({
  source = "landing",
  compact = false,
  className = "",
  stripeConfigured,
  stripeConfigLoaded = true,
  trialDays,
  stripePromise,
}: Props & {
  stripeConfigured: boolean;
  stripeConfigLoaded?: boolean;
  trialDays: number;
  stripePromise: ReturnType<typeof loadStripe> | null;
}) {
  const [step, setStep] = useState<"details" | "payment">("details");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  const trialLabel =
    trialDays > 0 ? `${trialDays}-day free trial` : "Free access";

  const createSetupIntent = useCallback(async () => {
    const response = await fetch("/api/stripe/setup-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), email: email.trim(), company }),
    });
    const data = (await response.json()) as {
      clientSecret?: string;
      error?: string;
    };
    if (!response.ok || !data.clientSecret) {
      throw new Error(data.error ?? "Could not load payment form.");
    }
    setClientSecret(data.clientSecret);
    return data.clientSecret;
  }, [company, email, name]);

  async function handleContinue(event: React.FormEvent) {
    event.preventDefault();
    setMessage("");

    if (!name.trim()) {
      setStatus("error");
      setMessage("Please enter your name.");
      return;
    }
    if (!email.trim()) {
      setStatus("error");
      setMessage("Please enter your email.");
      return;
    }
    if (!stripeConfigured) {
      setStatus("error");
      setMessage(
        stripeConfigLoaded
          ? "Payment setup is not available right now. Please try again later."
          : "Payment setup is still loading. Please wait a moment."
      );
      return;
    }

    setStatus("loading");
    try {
      await createSetupIntent();
      setStep("payment");
      setStatus("idle");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Could not continue. Try again."
      );
    }
  }

  if (step === "payment" && clientSecret && stripePromise) {
    return (
      <Elements
        key={clientSecret}
        stripe={stripePromise}
        options={{ clientSecret, appearance: stripeAppearance }}
      >
        <PaymentStep
          className={className}
          source={source}
          name={name}
          email={email}
          company={company}
          trialDays={trialDays}
          clientSecret={clientSecret}
          onBack={() => {
            setStep("details");
            setClientSecret("");
            setStatus("idle");
            setMessage("");
          }}
        />
      </Elements>
    );
  }

  return (
    <form onSubmit={(event) => void handleContinue(event)} className={className}>
      <div className={`grid gap-3 ${compact ? "" : "sm:grid-cols-2"}`}>
        {!compact ? (
          <>
            <input
              type="text"
              required
              placeholder="Your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Company (optional)"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              className="input-field"
            />
          </>
        ) : (
          <input
            type="text"
            required
            placeholder="Your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="input-field"
          />
        )}
        <input
          type="email"
          required
          placeholder="you@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={`input-field ${compact ? "" : "sm:col-span-2"}`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading" || !stripeConfigLoaded || !stripeConfigured}
        className="btn-submit mt-4 w-full rounded-xl bg-white py-3.5 text-sm font-semibold text-black disabled:opacity-60"
      >
        {status === "loading"
          ? "Loading…"
          : !stripeConfigLoaded
            ? "Loading payment…"
            : "Continue to payment"}
      </button>

      {message ? (
        <p className="mt-3 text-center text-sm text-red-400">{message}</p>
      ) : (
        <p className="mt-3 text-center text-xs text-white/40">
          {!stripeConfigLoaded
            ? "Checking payment setup…"
            : stripeConfigured
              ? `${trialLabel} · Card required · Not charged until trial ends`
              : "Payment is temporarily unavailable. Refresh the page or contact support."}
        </p>
      )}
    </form>
  );
}

export function EarlyAccessForm(props: Props) {
  const [config, setConfig] = useState<StripePublicConfig>({
    configured: false,
    publishableKey: "",
    trialDays: 10,
    loaded: false,
  });

  useEffect(() => {
    let cancelled = false;

    async function loadConfig() {
      try {
        const response = await fetch("/api/stripe/public", { cache: "no-store" });
        const data = (await response.json()) as StripePublicConfig;
        if (cancelled) return;

        setConfig({
          configured: Boolean(
            response.ok && data.configured && data.publishableKey?.trim()
          ),
          publishableKey: data.publishableKey?.trim() ?? "",
          trialDays: data.trialDays ?? 10,
          loaded: true,
        });
      } catch {
        if (!cancelled) {
          setConfig({
            configured: false,
            publishableKey: "",
            trialDays: 10,
            loaded: true,
          });
        }
      }
    }

    void loadConfig();
    return () => {
      cancelled = true;
    };
  }, []);

  const stripePromise = useMemo(
    () => (config.publishableKey ? loadStripe(config.publishableKey) : null),
    [config.publishableKey]
  );

  return (
    <EarlyAccessFormFlow
      {...props}
      stripeConfigured={config.configured}
      stripeConfigLoaded={config.loaded}
      trialDays={config.trialDays}
      stripePromise={stripePromise}
    />
  );
}
