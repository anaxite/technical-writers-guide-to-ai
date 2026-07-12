---
name: The technical writer's guide to AI
description: A living, collaborative guide to AI for technical writers, built on the Exquisitus Starlight theme.
extends: ../starlight-theme-exquisitus/DESIGN.md
---

# Design system: the technical writer's guide to AI

## 1. Source of truth

**This site does not define a visual system. It inherits one.**

The colors, typography, elevation, component styling, and named rules all come from
[Exquisitus](https://raw.githubusercontent.com/anaxite/starlight-theme-exquisitus/refs/heads/main/DESIGN.md), which is
this project's theme and the single source of truth for all of it. That file is
canonical; read it before doing any visual work here.

This document deliberately carries **no token frontmatter** — no color values, no type
scale, no radii. Duplicating them would guarantee drift the first time Exquisitus
changes, and a stale copy is worse than no copy. If you need a value, read the theme.

What lives here instead: the decisions that are this *site's* and not the theme's.

The short version of what you're inheriting: honey-amber for emphasis and active state,
petrol-teal for the information and code register, ink on a pure-white or near-black
surface (never a cream one), Spectral for structure against Atkinson Hyperlegible Next
for the reading column, a flat reading surface with the technical register letterpressed
into it, and WCAG 2.2 AA as a floor in both modes.

## 2. Register per surface

The project default is **product** — documentation is functional reading, and the design
serves the reader's task rather than being the thing on display. A small number of
surfaces can be documented **brand** exceptions.

| Surface | Register | Why |
| --- | --- | --- |
| Guide / reference pages | product | Task-oriented; information consumption |
| Sidebar, TOC, search, nav | product | Standard navigation; consistency outranks novelty |
| Landing / home page | brand | Selling the guide; recruiting readers and contributors |
| Marketing one-pagers | brand | The impression *is* the deliverable |

Pick the register from this table, not from the project default. Anything unlisted is
product. The full rationale is in [PRODUCT.md](./PRODUCT.md).

## 3. Site-specific surfaces

### Landing page (the one brand surface)

**Status: unbuilt.** The site currently ships Starlight's untouched demo splash — the
Houston mascot, "Congrats on setting up a new Starlight project!", and a five-card
`CardGrid`. All of it is scaffold and none of it is a design decision.

When it is built, it inherits Exquisitus's splash conventions (the hero, the doorway
cards, the closing colophon) and must satisfy two jobs that the theme's own splash does
not have to: orient a reader who does not yet know what this project is, and make an
unfinished, collaborative guide look like an invitation rather than an abandoned one.

The theme's `FeatureGrid` (`lead` and `alternating` layouts) is the sanctioned
alternative to the identical card grid. Use it rather than a raw `CardGrid`.

### Content pages

Pure Exquisitus, unmodified. The theme's reading column *is* the design; this project's
job is to put good writing in it. Do not restyle the reading surface.

Two content-shape conventions follow from PRODUCT.md's *Build for a half-life* principle,
and both need a home in the page furniture rather than in prose:

- **Durable vs perishable.** Pages separate the durable layer (principles, mechanisms,
  open questions) from the perishable layer (specific tools, models, screenshots), so the
  perishable layer can be cut without collapsing the page.
- **Dated claims.** Specific claims carry a date and can be superseded. The mechanism for
  showing that is not yet designed.

### Custom components

None yet. Anything added must earn its place against the theme's existing vocabulary
first — Exquisitus already supplies asides, cards, code blocks, file trees, tabs, and the
`FeatureGrid`, and the reflex to build a new component is usually the reflex to avoid.

## 4. Do's and don'ts

Everything in [Exquisitus's Do's and Don'ts](/home/cleverbuns/git/anaxite/starlight-theme-exquisitus/DESIGN.md)
applies in full. These are the additions specific to this project.

### Do

- **Do** read the theme's DESIGN.md before any visual work. It is the source of truth.
- **Do** pick the register from the table in §2, per surface.
- **Do** design content structures that let stale specifics be excised cleanly.
- **Do** make unanswered questions read as open invitations. The site is a skeleton on
  purpose; emptiness that looks *intentional* recruits contributors, and emptiness that
  looks accidental repels them.

### Don't

- **Don't** copy theme tokens into this repo. Read them from Exquisitus.
- **Don't** restyle the reading column. If it needs changing, it needs changing in the
  theme.
- **Don't** ship anything that reads as AI-written — this is the project's existential
  anti-reference, and it applies to interface copy as much as to prose. No eyebrow above
  every section, no "it's not just X, it's Y", no hero-metric template.
- **Don't** let the guide's *design* argue a position its *content* refuses to argue. The
  site describes practice; it does not sell or scold. Visual enthusiasm is a form of
  advocacy.
