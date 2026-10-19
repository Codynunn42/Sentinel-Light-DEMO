# GitHub handoff — Sentinel Light DIRKS v0.2

This ZIP contains the current application source, tests and NunnPay integration record.

## Add to GitHub

1. Extract the ZIP.
2. Open the `sentinel-light-dirks` folder.
3. In your intended repository, upload this folder's contents, including `dist/`. Upload the extracted files rather than the ZIP itself. For a new repository, keep it private unless you explicitly decide to publish the source.
4. If updating an existing repository, compare the files before replacing existing work. This handoff does not change the repository automatically.

## Run the prototype locally

From the extracted project folder, run:

```bash
python3 -m http.server 8000 --directory dist
```

Open http://localhost:8000. No dependency installation or build is required. Google Fonts are optional external presentation resources; the app has local font fallbacks.

## Verify

With Node.js installed:

```bash
npm test
```

## Scope and deployment

- The existing layout, colors and prompt composer are preserved.
- Grocery ordering, Sentinel governance and NunnPay handoff are simulations.
- No live AI, speech recognition, banking, wallet or grocery service is connected.
- No credentials or private hosting identity are included. There is no `.git` history in the ZIP.
- Receipts are saved in the user's browser localStorage, not a server ledger.
- See `NUNNPAY-INTEGRATION.md` for the verified source findings and live integration requirements.
- Static hosts should serve the `dist/` directory. This package has no automatic deployment workflow.

Source snapshot: `afe11efde0a6206964a5e36c736da750a7459f19` from the private prototype's source repository.
Export prepared October 18, 2026 (America/Phoenix).
