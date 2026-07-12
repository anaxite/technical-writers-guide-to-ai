# Product

## Register

product

Documentation is functional reading, not experiential reading. The reader came to
find something out, and the design's job is to get out of the way while they do.
That is the product register, and it governs every guide and reference page.

**Documented brand exceptions.** The register is per-surface, and a small number of
surfaces exist to make an impression rather than to serve a task:

| Surface | Register | Why |
| --- | --- | --- |
| Guide / reference pages | product | Task-oriented; information consumption |
| Sidebar, TOC, search, nav | product | Standard navigation; consistency outranks novelty |
| Landing / home page | brand | Selling the guide; recruiting readers and contributors |
| Marketing one-pagers | brand | The impression *is* the deliverable |

When working on a surface, pick the register from this table, not from the project
default. Anything not listed is product.

## Users

**Primary: the newcomer needing a map.** A technical writer who knows AI is arriving
in their discipline and does not know where to start. They need orientation before
they need technique — something like docsbydesign's three-way split (AI supporting
content creation, AI generating and publishing content, AI reading your content) to
hang everything else on.

**Primary: the ambivalent professional.** A writer who is uneasy about AI — about the
labour questions, the slop, the message that engaging with it sends — but who has
concluded they need to understand it honestly rather than ignore it. Their ambivalence
is reasonable and is treated as such. They are not a conversion target. If this site
reads as advocacy, they leave, and they are right to.

**Secondary: the practitioner comparing notes.** Already using AI in documentation
work; here to see how others approached the same problem, what it cost, and what went
wrong. Well served by the descriptive spine, but they mostly arrive already competent.

Contributors are a real constituency — this is a collaborative project — but they are
not yet a designed-for audience. See *Design principles*, principle 5.

## Product Purpose

A living, collaborative guide to AI for technical writers.

The project exists because the topic is too wide, moves too fast, and matters too much
for any single author or any printed artifact to hold. A book would be obsolete in a
month. A blog post is one person's take. What the profession lacks is a shared,
durable place to record the questions of the moment and how people have actually
answered them.

The spine is **descriptive, on principled grounding**. Durable, model-agnostic
principles ("don't let the AI do more than you understand and can validate"; "instead
of having the AI do the work, have it interview you about the work"; "trust a little,
verify a lot") form the grounding layer readers launch from. Behind that, the body of
the guide is question-led: each page poses a real question the profession is asking,
and collects the approaches people have taken, with their reasoning and their process.
It documents how the practice *is*, not how it *ought to be*.

This spine is a starting position, not a commitment. It may change with experimentation.

Success looks like: a technical writer who is uncertain about AI arrives, leaves with
a clearer map and no sense that they were sold anything, and comes back later to add
what they learned.

## Brand Personality

Confident, masterful, useful — the senior-colleague register inherited from
[Exquisitus](/home/cleverbuns/git/anaxite/starlight-theme-exquisitus/PRODUCT.md).

Someone who explains a hard thing well. No hedging, no decoration, no performance, but
plainly someone who cares — about the reader, about the craft, and about being straight
with people. Assumes competence. Willing to say "this is a bad idea", and equally
willing to say "we don't know yet", which on this topic is often the honest answer.

The credibility bet is that the guide practices what it preaches. A guide to AI for
writers that is visibly AI-slop is worthless, and would deserve to be.

## Anti-references

- **The AI hype guide.** Breathless, evangelical, 10x-your-productivity. LinkedIn
  thought-leader energy, prompt-pack listicles, anything that functions as marketing
  for the technology.
- **The doomer counter-guide.** Reflexively anti-AI, moralising, contemptuous of the
  readers who use these tools. The mirror image of hype and just as useless to someone
  trying to make a decision.
- **Obviously AI-written.** No vibe-written prose, and nothing that reads as vibe-written:
  no "it's not just X, it's Y", no em-dash slop, no eyebrow above every section, no
  triads-of-three cadence, no summary paragraph restating what was just said. This is
  the one anti-reference that is also an existential threat to the project.
- **Tool-of-the-month churn.** Screenshot-driven, vendor-specific, obsolete on a
  one-month horizon. Specific advice has a short half-life; the more specific the
  advice, the shorter its lifespan.
- Inherited from Exquisitus: the hacker/terminal aesthetic; generic SaaS docs
  (Mintlify/Docusaurus clean-white-plus-blue); cream/sand body backgrounds; side-stripe
  borders; gradient text; glassmorphism.

## Design Principles

1. **Orientation before technique.** The primary reader is lost, not unskilled. Every
   surface should answer "where am I and what is this?" before it answers "how do I do
   it?" A reader who cannot place a page in the larger map will not trust its contents.

2. **Describe, don't advocate.** The site reports what people do and why, including
   when it went badly. It does not sell the technology, and it does not scold anyone
   for using it. Neutrality here is not fence-sitting; it is the only posture that
   keeps the ambivalent reader in the room.

3. **Build for a half-life.** Assume any specific claim is decaying from the moment it
   is written. Structure content so the durable layer (principles, mechanisms, questions)
   outlives the perishable layer (tools, models, screenshots), and so the perishable
   layer can be excised without collapsing the page. Date things. Let them be superseded.

4. **Practice what we preach.** The guide is its own worked example. If we recommend
   human review, this content is human-reviewed. If we warn about a failure mode, we do
   not exhibit it. Credibility on this topic cannot be claimed, only demonstrated.

5. **A shape that invites filling in.** The project is collaborative, and its skeleton
   is being built before its contributors arrive. Structure the site so an unanswered
   question reads as an open invitation rather than a gap — and so that adding an
   approach is an obvious, low-ceremony act once contribution surfaces land.

## Accessibility & Inclusion

- WCAG 2.2 AA minimum on every surface, light and dark. Inherited from Exquisitus and
  non-negotiable here.
- Motion gated behind `prefers-reduced-motion`; no information carried by color alone.
- The generous type scale (~18px body, 1.75 line-height, ~70ch measure) is itself an
  accessibility decision and must not be traded away to fit more above the fold.
- The audience includes people reading in a second language and people reading under
  time pressure. Plain language is an accessibility feature, not a stylistic one.
