# AGENTS.md

This repo contains an Astro Starlight site for a _Technical Writer's Guide to AI_.

## Design system

This project uses [the Impeccable design system](https://impeccable.style/), with corresponding [PRODUCT](./PRODUCT.md) and [DESIGN](./DESIGN.md) files.

## Astro: development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Astro: documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Linting + Formatting

- Vale linter for MD/MDX prose.
  - `.vale.ini` config file in root
  - Vale styles are in `.config/styles`
- Rumdl linter for MD/MDX structure. Config file is in `.config/rumdl.toml`

## Link checking

Link checking is split into two layers by responsibility.

- **Internal links and heading anchors** are validated by [starlight-links-validator](https://starlight-links-validator.vercel.app/), configured in `astro.config.mjs`.
  It runs as part of `astro build` and fails the build on any broken internal link or invalid heading anchor.
- **External (http/https) links** are checked by [lychee](https://lychee.cli.rs/) in CI.
  This keeps flaky or rate-limited third-party sites from blocking a build.
  Config is in `.config/lychee.toml`, and permanent exclusions go in `.lycheeignore`.
  Run locally with `pnpm lint:links`.

Both layers run in the `Links` GitHub Actions workflow (`.github/workflows/links.yml`) on pushes to `main` and on pull requests.
On PRs, broken external links are posted as a sticky comment before the job fails.

A `changes` job detects which files changed and gates the two link jobs.
The external (lychee) job runs only when content prose changes.
The build (internal link) job runs when content, config, or components change, since those can break internal links too.

Workflow actions are SHA-pinned with a trailing `# vX.Y.Z` version comment.
Dependabot (`.github/dependabot.yml`) keeps both the pinned SHA and the comment current.

## CI: Node and pnpm setup

Any CI job that needs Node or pnpm must use the local composite action `./.github/actions/setup-node-pnpm` (after `actions/checkout`) rather than `setup-node`/`pnpm/action-setup` with hardcoded versions.
The composite action installs Node and pnpm via [mise-action](https://github.com/jdx/mise-action) from `mise.production.toml`, so CI versions are controlled from a central location.
It also restores the pnpm store cache and runs `pnpm install --frozen-lockfile`.

## Deployment

The site deploys to [Cloudflare Workers](https://developers.cloudflare.com/workers/) as
[static assets](https://developers.cloudflare.com/workers/static-assets/).
Astro's static build output (`dist/`) is uploaded and served from the edge — there is
no Worker script and no SSR adapter. Config is in `wrangler.jsonc`.

Deployment is **manual**: the `Deploy` GitHub Actions workflow
(`.github/workflows/deploy.yml`) runs only via `workflow_dispatch` ("Run workflow" in the
Actions tab). A commented-out `push` trigger is left in place as a placeholder for a
future deploy-on-merge-to-`main` flow.

Deploy locally with `pnpm run deploy` (builds, then `wrangler deploy`).

The workflow authenticates with two repository secrets, set under
**Settings → Secrets and variables → Actions**:

- `CLOUDFLARE_ACCOUNT_ID` — the Cloudflare account ID.
- `CLOUDFLARE_API_TOKEN` — an API token created from the **Edit Cloudflare Workers**
  template (Workers Scripts: Edit + Account Settings: Read; add the zone permissions only
  once a custom domain is attached).
