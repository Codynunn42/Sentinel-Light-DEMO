# DIRKS → NunnPay integration record

Date: October 18, 2026 (America/Phoenix). Status: private simulated handoff implemented; live connection not established.

## Design constraint

Preserve the Sentinel Light layout, colors and prompt composer. Add only a compact NunnPay disclosure to basket review, simulated payment outcome selection, independent payment status in receipts, and a connections entry. The stylesheet is unchanged.

Principles: ask first; show the exact amount and recipient; invalidate approval when the plan changes; distinguish order evidence from payment evidence; retain a receipt; check uncertain outcomes before resubmission.

## Source findings

Read-only GitHub inspection found real NunnPay source:

- `Codynunn42/nunnpay/backend/src/services/walletServiceEnhanced.ts`, blob `c5d933ea96978cdab98c49832d48c9db3fcedaad`: Coinbase wallet transfers; risk checks; optional sensitive-action approval loop; Sentinel approval-token validation; audit events. The service accepts ETH or USDC and uses simplified USD valuation. It is not a fiat grocery checkout adapter.
- `Codynunn42/nunnpay/backend/src/routes/walletEnhanced.ts`, blob `f6049bd6229a7bc79663de891913df31f569c15c`: wallet send route expects `to`, `amount`, `asset`; accepts ETH/USDC. No live endpoint was called.
- `Codynunn42/nunnpay/backend/src/services/sentinelApiClient.ts`, blob `ac51a67b3c39859caf95a07549c60f2bfc0c9c19`: approval request, polling and token-validation client. Source presence does not establish runtime availability, authenticated caller binding or end-to-end enforcement.
- `Codynunn42/nunncorp-global-mono/packages/nunnpay-sdk/README.md` documents a `NunnPayClient` API, but inspected `src/index.ts`, blob `4f8feaacb0d18790f235a5123ec915105ee3c519`, exports only a version string. The documented client cannot be assumed available from that entrypoint.
- Historical NunnPay wallet architecture describes kernel, guard and modules. These are design/source references, not deployment or transaction proof.

Source URLs:

- https://github.com/Codynunn42/nunnpay/blob/main/backend/src/services/walletServiceEnhanced.ts
- https://github.com/Codynunn42/nunnpay/blob/main/backend/src/routes/walletEnhanced.ts
- https://github.com/Codynunn42/nunnpay/blob/main/backend/src/services/sentinelApiClient.ts
- https://github.com/Codynunn42/nunncorp-global-mono/blob/f6a285cee8cb990d8ff3e5fe2683698e64183502/packages/nunnpay-sdk/README.md

## Implemented seam

`dist/nunnpay.js` is a NEW proposed DIRKS handoff contract and local simulator, not the production SDK. No copied wallet service executes in the browser. It includes task/action identity, integer minor-unit amount, USD currency, fixed demo recipient/funding source, revision-specific idempotency identity, exact-plan binding, independent payment state, mock evidence and local events. These client-side checks demonstrate behavior; they are not a live security boundary.

Pipeline modeled: DIRKS preparation → Sentinel/user approval boundary → proposed NunnPay handoff → mock payment outcome → independent order/payment reconciliation → local simulated receipt.

No live payment request, wallet connection, seed, token, processor secret or account balance is used. No real endpoint is guessed. No automatic conversion of a grocery USD amount to USDC/ETH occurs. The prompt composer still uses a deterministic grocery demo, not a live AI model.

## Requirements for a real connection

1. Identify the authorized deployed NunnPay service, environment, current source revision and supported payment rail. Establish its health and read-only integration contract before writes.
2. Establish the actual merchant/order/payment relationship. A crypto transfer route alone cannot confirm grocery acceptance, fiat settlement, refunds or delivery.
3. Enforce authenticated user/tenant and funding-source ownership on the server. Bind required approval to exact task, amount, currency, recipient, funding source and expiry; reject replay, altered plans and disabled policy paths.
4. Put credentials in server-side runtime secrets. Add durable idempotency and transaction records, verified provider confirmation/webhook handling and independent order/payment reconciliation, including paid-without-order recovery.
5. Verify in a dedicated non-production environment, obtain independent review and explicit release authorization, and retain current public-execution holds until those decisions are recorded.

The next missing source is the deployed NunnPay service/environment contract and intended grocery payment rail, not a request for credentials in chat.
