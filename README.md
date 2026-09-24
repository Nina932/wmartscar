# WayMart Recruit & Win

Mobile-first Georgian recruitment rewards app. SELF remains the applicant and employee source of truth; this app owns the wheel, referral attribution, rewards and recruiter review.

## Current campaign
- Anonymous visitor spins once for coffee OR a hot dog, then once for a 50 GEL voucher.
- Both prizes stay locked until application submission and hiring are confirmed.
- The application button opens the configured SELF application directly.
- Each visitor receives a random server-generated referral code. A referred friend completing one calendar month of employment unlocks a separate 250 GEL bonus. This pilot supports one referral bonus per referrer per campaign.
- Candidate login is not required. An HttpOnly cookie keeps the browser session. Clearing it loses access; cross-device recovery is not implemented.

## Run locally
Requires Node 22.13+.

```sh
npm ci
npm run dev
```

Open http://localhost:5173. Local persistence uses `.data/waymart-v2.sqlite` (never commit it). Add `?mode=demo` for an isolated demonstration namespace.

```sh
node --experimental-transform-types --test tests/engine.test.mjs
npm run build
```

## Vercel
Set DATABASE_URL to a Neon Postgres connection string, ADMIN_ACCESS_KEY to a random secret of at least 32 characters, and SELF_WEBHOOK_SECRET to a separate random secret when the adapter is enabled. Copy `.env.example` to `.env.local` for local configuration. Never commit credentials.

```sh
node scripts/migrate-postgres.mjs
```

Deploy using the Next.js preset and the included vercel.json. Storage deliberately fails closed on Vercel when DATABASE_URL is absent. The recruiter dashboard requires ADMIN_ACCESS_KEY. It supports evidence-backed manual confirmations, holds, revocation and one-time redemption.

## Integration and release status
The application builds locally. Native SELF API/webhook availability is NOT verified; the supplied signed contract is an adapter contract, not a claim that SELF sends it. Candidates can copy a CLAIM code into SELF's comment field; recruiters must independently verify the application and employment before activation. Unknown query parameters must not be relied on for attribution.

This is a working pilot, not a production certification. Before launch: provision the production database, configure secrets, establish SELF mapping or a documented manual review process, validate privacy/campaign terms, backups, rate limits and operational monitoring. Anonymous cookie resets cannot be prevented from creating additional visitors; confirmed SELF/employee identities are checked for duplicate reward activation. Rewards currently redeem by code, not QR/barcode. Campaign storage is bounded to 1,000 candidates and fewer than 20,000 audit events; load testing remains outstanding.

See docs/SELF-CONTRACT.md and docs/DATA-MODEL.md.
