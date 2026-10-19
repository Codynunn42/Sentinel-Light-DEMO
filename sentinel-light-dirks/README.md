# Sentinel Light · DIRKS

Private, browser-local grocery workflow prototype. Static HTML/CSS/JavaScript. No production Sentinel, banking, grocery, voice or AI services are connected. The voice example inserts a prerecorded example transcript as text; it does not access a microphone.

## Included

Request and budget, illustrative grocery basket, quantity editing, approval bound to basket revision and total, guarded simulated dispatch, confirmed/rejected/timeout outcomes, reconciliation without resubmission, cancellation before dispatch, and browser-local simulated receipts. Receipts persist in localStorage on the same browser and can be cleared. Task drafts do not persist across reloads.

## Verify

Run `node test-engine.cjs` and `node --check dist/app.js`.

## NunnPay handoff (0.2)

The existing design is preserved. A source-informed local NunnPay handoff adds amount/recipient review, independent payment and order outcomes, payment status reconciliation without resubmission, and simulated payment evidence in local receipts. It is not connected to the deployed NunnPay service. See `NUNNPAY-INTEGRATION.md` for inspected sources, the documented SDK/export mismatch and the concrete live integration requirements.

## Scope

This is an interaction prototype, not an enforcement boundary for live transactions. Client-side checks must be replaced by server-enforced identity, authorization, policy, approval integrity, idempotency and evidence reconciliation before any live integration. Current public operational holds are unchanged. Prices and provider identity are fictional. No claims of production readiness, independent review or gate closure.
