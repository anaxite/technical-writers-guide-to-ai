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
- Rumdl linter for MD/MDX structure. Config file is in `.config/.rumdl.toml`