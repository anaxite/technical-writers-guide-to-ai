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
