# Cloudflare Workers static-assets deploy

**Date:** 2026-07-15
**Status:** Approved

## Summary

Deploy this Astro Starlight docs site to **Cloudflare Workers** using
[Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/).
The site keeps its current static build output; Wrangler uploads `dist/` and
Cloudflare serves it from the edge. There is **no Worker script** — this is an
assets-only Worker.

Deployment is **manual**, triggered from GitHub Actions via `workflow_dispatch`.
A commented-out `push` trigger is left in place as a placeholder for a future
"deploy on merge to `main`" flow.

## Goals

- Serve the built site on Cloudflare Workers static assets.
- Deploy only when a maintainer manually runs the workflow.
- Reuse the existing pnpm/Node CI setup and repo conventions (SHA-pinned
  actions, Dependabot-managed versions).
- Keep the change boring and explicit; add no tooling that isn't needed.

## Non-goals

- No SSR / no `@astrojs/cloudflare` adapter. The site stays static.
- No custom domain yet — ship on `*.workers.dev`. A domain is added later by
  editing `wrangler.jsonc`.
- No automatic deploy on push (only the commented placeholder).
- No secret bindings, KV, D1, or other Cloudflare resources.

## Components

### 1. `wrangler.jsonc` (new, repo root)

Assets-only Worker. `main` is intentionally omitted — with no Worker script,
Cloudflare serves the static assets directly.

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "technical-writers-guide-to-ai",
  // Set to the project's setup date; bump deliberately when adopting new
  // runtime behavior. See https://developers.cloudflare.com/workers/configuration/compatibility-dates/
  "compatibility_date": "2026-07-15",
  "assets": {
    "directory": "./dist"
  }
  // Future custom domain (must be a zone on this Cloudflare account):
  // "routes": [
  //   { "pattern": "docs.example.com", "custom_domain": true }
  // ]
}
```

- Worker name: `technical-writers-guide-to-ai` (matches the repo).
- Default URL: `https://technical-writers-guide-to-ai.<account>.workers.dev`.

### 2. `package.json` (edit)

- Add `wrangler` to `devDependencies`. Pinning it here means CI and local use
  the exact same Wrangler version, and Dependabot's existing `npm` group keeps
  it current. Requires Wrangler **4.34.0+** for current static-asset limits.
- Add a `deploy` script for one-command local deploys:

  ```json
  "deploy": "astro build && wrangler deploy"
  ```

  CI does **not** use this script — it runs build and deploy as separate steps
  (see below). The combined script is a local convenience only.

### 3. `.github/workflows/deploy.yml` (new)

```yaml
name: Deploy

on:
  workflow_dispatch:
  # Placeholder: enable to auto-deploy when a PR is merged to main.
  # push:
  #   branches: [main]

permissions:
  contents: read

# Prevent two manual deploys from racing each other.
concurrency:
  group: deploy-${{ github.ref }}
  cancel-in-progress: false

jobs:
  deploy:
    name: Deploy to Cloudflare Workers
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@<sha> # v7.0.0

      - uses: pnpm/action-setup@<sha> # v6.0.9
        with:
          version: 11

      - uses: actions/setup-node@<sha> # v7.0.0
        with:
          node-version: 26
          cache: pnpm

      - run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm build

      - name: Deploy
        run: pnpm exec wrangler deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

Notes:

- Actions are SHA-pinned with a trailing `# vX.Y.Z` comment, matching
  `links.yml`. The three actions and their versions are copied from `links.yml`
  so they stay consistent (Dependabot's `github-actions` group bumps them
  together).
- The deploy step is a plain `run:` — no `cloudflare/wrangler-action`. Wrangler
  reads `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` from the environment
  automatically. This avoids adding a fourth action to pin and uses the
  version-pinned Wrangler from `devDependencies`.
- Build and deploy are separate steps so a build failure is visually distinct
  from a deploy failure in the run log.

### 4. `.gitignore` (edit)

Add:

```gitignore
# wrangler local state
.wrangler/
# wrangler local secrets
.dev.vars
```

### 5. `AGENTS.md` (edit)

Add a short **Deployment** section documenting:

- The static-assets model (no adapter, no Worker script).
- The manual `workflow_dispatch` deploy and the commented push placeholder.
- The two required GitHub Actions secrets.

## Required GitHub Actions secrets (manual, out of band)

Set in **Settings → Secrets and variables → Actions**:

| Secret | Value |
| --- | --- |
| `CLOUDFLARE_ACCOUNT_ID` | The Cloudflare account ID (dashboard URL or `wrangler whoami`). |
| `CLOUDFLARE_API_TOKEN` | Scoped API token, see below. |

**API token scopes.** Create at
<https://dash.cloudflare.com/profile/api-tokens> using the **Edit Cloudflare
Workers** template, which grants the permissions Wrangler needs to upload and
deploy an assets Worker:

- **Account → Workers Scripts → Edit** (deploy the Worker / upload assets)
- **Account → Account Settings → Read** (resolve the account)
- **Zone → Workers Routes → Edit** and **Zone → Zone → Read** — only needed once
  a custom domain / route is added; harmless to include now.

Scope the token to the specific account (and, later, the specific zone) rather
than "All accounts".

## Data flow

```
maintainer clicks "Run workflow"
  -> checkout + pnpm install (frozen lockfile)
  -> pnpm build            (Astro static output to ./dist; also validates
                            internal links via starlight-links-validator)
  -> pnpm exec wrangler deploy
       reads CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID from env
       reads wrangler.jsonc -> uploads ./dist as static assets
  -> live at technical-writers-guide-to-ai.<account>.workers.dev
```

## Error handling / failure modes

- **Missing/invalid secrets:** `wrangler deploy` fails fast with an auth error;
  the workflow run fails. No partial deploy.
- **Build failure:** the separate build step fails before deploy runs; nothing
  is uploaded.
- **Broken internal links:** `astro build` (via starlight-links-validator)
  fails the build step, blocking deploy.
- **Concurrent manual runs:** the `concurrency` group serializes them
  (`cancel-in-progress: false`) so a later run waits rather than racing.

## Testing / verification

1. `pnpm build` succeeds locally and produces `dist/`.
2. `pnpm exec wrangler deploy --dry-run` validates `wrangler.jsonc` without
   deploying.
3. After secrets are set, a manual `workflow_dispatch` run deploys and the
   `*.workers.dev` URL serves the site.
