# Data model and persistence

Next.js route handlers execute an immutable campaign reducer. Neon Postgres in deployment and node:sqlite locally persist campaigns_v2(id, version, payload, updated_at). Each update uses compare-and-swap version checks and retries conflicts; reward redemption changes ACTIVE to REDEEMED once. No production filesystem fallback exists.

Campaign payload: schemaVersion, configuration, candidates, audit events and processed external event IDs. Candidates contain opaque ID, random referral and claim codes, immutable referrer, verified SELF/employee IDs, application/hiring/month flags, hold state and three rewards.

Meal: AVAILABLE -> LOCKED on first spin (coffee OR hotdog).
Voucher: UNAVAILABLE -> AVAILABLE after meal spin -> LOCKED on second spin (50 GEL).
Both: LOCKED -> ACTIVE only with confirmed application and hire.
Referral: UNAVAILABLE -> ACTIVE when the referred employee completes one calendar month (250 GEL, once per campaign).
ACTIVE rewards expire or redeem once. Operators may hold accounts or revoke unredeemed rewards with recorded reasons.

HttpOnly browser cookies carry a random token; its hash derives the candidate ID. Candidate APIs expose only the session owner's record. Operator access uses a separate signed, session-bound expiring cookie. Demo data uses an isolated session-specific namespace.

Limitations: campaign aggregate storage is bounded; anonymous session reset prevention and cross-device recovery are not implemented. Production database retention, backups and privacy policy need operator configuration.
