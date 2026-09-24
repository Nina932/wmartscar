# SELF integration adapter

POST /api/self/webhook accepts JSON: eventId, type, candidateId, optional selfId, employeeId, startedAt, endedAt. Supported types: application.submitted, candidate.hired, employment.month_completed.

Use x-waymart-timestamp (Unix seconds) and x-waymart-signature (lowercase hex HMAC-SHA256 of timestamp + '.' + exact request body, using SELF_WEBHOOK_SECRET). Requests older/newer than five minutes are rejected. Replayed event IDs are idempotent. The adapter must resolve the candidate ID from verified CLAIM/SELF mapping; never trust an unverified candidate claim.

Application requires a unique selfId; hire requires prior application and a unique employeeId. A completed month requires matching employeeId and start/end dates covering one calendar month, with no future end date. Each event is audited. Invalid/out-of-order events are rejected and must be reconciled by the integration operator.

Candidate application links include `waymart_claim`, `waymart_referral_code`, and, when applicable, `waymart_referred_by`. The same values are shown as a copyable comment string for SELF's comment field because SELF may ignore or discard unknown query parameters. Recruiters can search and export CLAIM, REF, and referrer REF values in the dashboard.

Native SELF API availability is unverified. Until agreed with SELF, use the authenticated recruiter dashboard to confirm independently verified facts with an evidence reason. Sharing a referral link, clicking SELF, or returning from SELF does not establish application or employment.
