# DocBrain Marketing Site

Early-access landing page for **DocBrain** — inspired by modern SaaS pages like [StorePix](https://storepix.app/).

Dark theme, **complete product walkthrough**, integrations detail, sales flow timeline, full feature list, **Stripe free-trial signup** (card on file, not charged until trial ends), and **[Anime.js](https://animejs.com/)** scroll-driven section animations.

## Quick start

```bash
cd plugins/docbrain-marketing
cp .env.example .env.local   # Stripe keys + DOCBRAIN_APP_URL (same as dashboard)
npm install
npm run dev
```

Open **http://localhost:3001**

Use the same Stripe test keys and `STRIPE_PRICE_ID_SILVER` as `docbrain/dashboard`. After a visitor completes the form, they are redirected to create a DocBrain account at `DOCBRAIN_APP_URL/signup`.

## Free trial flow (Stripe)

1. Visitor enters **name**, **email**, and optional **company**.
2. **Stripe Payment Element** collects a card via SetupIntent (same pattern as dashboard signup).
3. Server creates a Stripe **customer**, attaches the card, and starts a **trialing subscription** on DocBrain Silver.
4. Lead is saved to `data/leads.json` with Stripe IDs; visitor sees **Create your account** linking to the dashboard signup (`/signup?email=...`). On signup, the dashboard detects the saved card for that email and **skips asking for payment again**.

| Env var | Purpose |
|---------|---------|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Client-side Stripe.js |
| `STRIPE_SECRET_KEY` | Server SetupIntent + subscription |
| `STRIPE_PRICE_ID_SILVER` | Recurring price for trial subscription |
| `STRIPE_TRIAL_DAYS` | Trial length (default `10`) |
| `DOCBRAIN_APP_URL` | Dashboard base URL for post-trial signup link |

## Animations ([Anime.js](https://animejs.com/))

| Area | Behavior |
|------|----------|
| **Hero** | Timeline on load — label, headline, CTAs, and ambient orbs |
| **Sections** | `AnimateIn` — fade + directional slide when scrolling into view (`onScroll`) |
| **Grids** | `Stagger` — pipeline cards, integration tiles, FAQ items, and sales-flow steps |
| **Sales flow** | Timeline line draws on scroll; steps use a fixed grid so numbers align with the line on all breakpoints |
| **FAQ** | Card accordion with Anime.js height transitions and rotating +/× control |
| **Accessibility** | `prefers-reduced-motion` skips motion and shows content immediately |

Dependency: `animejs` (v4). Helpers live in `src/lib/motion.ts` and `src/components/ui/AnimateIn.tsx`.

## Page sections

| Section | What it explains |
|--------|------------------|
| **Hero** | Headline, live chat mockup, free-trial form |
| **One Agent. Four Outcomes.** | Catalog → chat → checkout → email pipeline |
| **5-step process** | Agent setup → channels → customer chat → sales → owner dashboard (StorePix-style UI mockups) |
| **Sales flow** | 7-step customer journey from first message to fulfillment |
| **Integrations** | WordPress, WhatsApp, Telegram, Messenger, Instagram — setup + features each |
| **Full feature list** | 24 detailed features in 4 groups (agent, checkout, dashboard, reliability) |
| **Workflow compare** | Manual sales vs DocBrain |
| **Pain points** | Relatable quotes |
| **FAQ** | 12 questions covering setup, channels, orders, email |
| **Early access CTA** | Footer free-trial form |

## Lead capture

`POST /api/early-access` with JSON:

```json
{
  "email": "you@company.com",
  "name": "Jane Doe",
  "company": "Optional",
  "source": "hero",
  "stripeSetupIntentId": "seti_..."
}
```

Leads are stored in `data/leads.json` (gitignored after first real signup), including `stripeCustomerId`, `stripeSubscriptionId`, and trial metadata.

### API routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/stripe/public` | GET | Publishable key + trial config for the form |
| `/api/stripe/setup-intent` | POST | Create SetupIntent before card step |
| `/api/early-access` | POST | Verify card, start trial subscription, save lead |

### Optional notifications

| Env var | Effect |
|---------|--------|
| `LEADS_WEBHOOK_URL` | POST each new lead to Zapier/Make/Slack |
| `RESEND_API_KEY` + `LEADS_NOTIFY_EMAIL` | Email you when someone starts free access |
| `LEADS_FROM_EMAIL` | Sender for notify emails |

## Deploy

### Recommended: Vercel (free, works with Stripe API routes)

GitHub Pages **cannot** run this app — it needs server routes for Stripe and lead capture.

1. Push this repo to GitHub (see below).
2. Go to [vercel.com/new](https://vercel.com/new) → **Import** your `docbrain-marketing` repository.
3. Add **Environment Variables** (same as `.env.local`):
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PRICE_ID_SILVER`
   - `DOCBRAIN_APP_URL` (your live dashboard URL, e.g. `https://app.docbrain.com`)
   - Optional: `STRIPE_TRIAL_DAYS`, `LEADS_WEBHOOK_URL`, `RESEND_API_KEY`, etc.
4. Deploy — Vercel auto-redeploys on every push to `main`. Production URL: **https://docbrain-agent.vercel.app**

### GitHub repository

```bash
cd plugins/docbrain-marketing
git init -b main
git add -A
git commit -m "Initial DocBrain marketing site"
gh repo create docbrain-marketing --public --source=. --remote=origin --push
```

### Local production build

```bash
npm run build
npm start
```

## Project structure

```
plugins/docbrain-marketing/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── early-access/route.ts
│   │   │   └── stripe/
│   │   │       ├── public/route.ts
│   │   │       └── setup-intent/route.ts
│   │   ├── globals.css          # theme + anime-reveal initial states
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── lib/
│   │   ├── motion.ts
│   │   ├── leads.ts
│   │   └── stripe/              # trial provisioning (mirrors dashboard)
│   ├── components/
│   │   ├── ui/AnimateIn.tsx
│   │   ├── EarlyAccessForm.tsx  # two-step form + Stripe Elements
│   │   └── ...
└── data/leads.json
```
