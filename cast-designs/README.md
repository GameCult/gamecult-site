# Cast designs: the shortlist

Seven characters get real designs before anyone else in the swarm does.
The operator, 2026-10-10: "none of these guys are gonna make it to the swarm.
I want Libby, Heimdall, Kiko, Aqua, Weksa, Nibu, Eureka."

| Character | Body (repo) | Key colour | File |
|---|---|---|---|
| Eureka | the Mind herself | ember orange `#ff8a2a` | [eureka.md](eureka.md) |
| Libby | CultLib | reading-lamp green `#2fbf71` | [libby.md](libby.md) |
| Heimdall | Heimdall | cobalt `#3466ff` | [heimdall.md](heimdall.md) |
| Kiko | StreamPixels | stream magenta `#ff3fa4` | [kiko.md](kiko.md) |
| Aqua | AquaSynth | tank cyan `#22d3e6` | [aqua.md](aqua.md) |
| Weksa | weksa | terracotta `#d9483b` | [weksa.md](weksa.md) |
| Nibu | AetheriaLore | violet `#9a6bff` | [nibu.md](nibu.md) |

Each file holds three design directions (A, B, C) that differ in silhouette
and concept, a ready-to-run design-sheet prompt per direction, and the
portrait set spec. Facts behind the style rules are in
[research/style-prior-art.md](research/style-prior-art.md).

## What failed, so it is not repeated

The sticker rig (`self/cast-stickers`) drew every character on one shared body
and swapped hair and props. At thumbnail size all 24 read as the same figure in
different wigs: tiny full bodies, no dominant shape, no hook. These designs
start from the opposite end: silhouette first, one hook per character, and the
face large enough to carry the expression.

## Style target

Chibi anime **bust portraits** in the manner of Persona dialogue UI: head and
shoulders, angled toward the text box, one expression per line of dialogue,
inside a graphic frame keyed to the character's colour. Persona Q is the
series' own precedent for this: Soejima redrew the P3/P4 casts as
super-deformed and kept each character's standout features exaggerated so
they survived the shrink.

- Proportions: 2.5 heads tall on the full-body sheet (the 2 to 3 head chibi
  band). In the bust, the head fills 55 to 65 percent of frame height.
- The bust is the product. The full-body turnaround exists to lock the design;
  it is reference, not a sticker.

## Shared rules: what makes the set cohere

The set coheres by **rendering**; the characters differ by **shape and hue**.

1. **Line.** Bold dark outline, outer silhouette line about twice the weight of
   inner lines. Line colour is a dark shade of the character's key colour, never
   pure black.
2. **Rendering.** Flat cel shading: one base tone and one shadow tone per
   material, plus a single rim light in the key colour on the side away from
   the light. No gradients on skin, no texture, no painterly blending, no pixel
   art, no 3D look.
3. **Eyes.** Large anime eyes with two specular highlights, same construction
   for everyone. Eye shape (round, almond, sharp, hooded) is a per-character
   choice and part of the design.
4. **Framing.** Bust cropped at mid-chest, three-quarter view, character faces
   screen right toward the text box; light from upper left. The baseline (shoulder
   line, eye line) stays fixed across a character's whole expression set so the
   portrait does not jump between lines.
5. **Palette discipline.** Each character owns one key hue, fixed across all
   three directions, and no two characters share it. A direction's palette is 4
   to 6 colours: key, a dark of the key for line and deep shadow, one skin or
   body tone, one neutral, one accent. The accent may borrow another
   character's hue only if it covers under 10 percent of the figure.
6. **UI frame.** Portraits sit on the GameCult ground `#07111a` in a
   parallelogram card, edge-lit in the character's key colour, nameplate in IBM
   Plex Mono uppercase tracked wide (the brand label face). The frame is
   composited, never rendered into the image.

## What keeps them from being samey

- **One dominant shape language per character**, and each one different:
  Libby squares, Heimdall arcs and spikes, Kiko stepped pixels, Aqua circles,
  Weksa flowing lines, Nibu swept wedges, Eureka a spark on a circle.
- **The hook is above the shoulders.** A bust only shows head and shoulders, so
  every hook is hair, headwear, ears, a held prop raised to the face, or a
  collar. A hook on the boots does not exist in this product.
- **Silhouette test, cast-wide.** Fill each bust black, shrink to 48 px, put all
  seven side by side. Every one must be nameable. If two collide, the later
  direction changes, not the rendering rules.
- **No shared body.** Body type, head shape, eye shape and hair mass are
  per-character design decisions written into each direction.

## Render process

From `~/.claude/doctrine/images.md` and the concept-mill rule
(image-prompts-test-hypotheses):

1. **Every render tests one stated hypothesis.** Each prompt below states it.
   Record hypothesis, variable, observation and the operator's verdict in a
   results table beside the renders.
2. **One variable per variant, against a named baseline.** The first render of
   a direction is its baseline. A follow-up changes one thing (hook size, palette
   accent, the style block's line clause) and says which.
3. **The exact prompt is saved beside each image**, same base filename, `.md`
   with the generation mode or model recorded. An image without its prompt is
   not a deliverable.
4. **Renders are from scratch.** Carry what worked forward by rewriting the
   prompt, never by editing a prior render or feeding it back as a reference.
5. **The style block is not sacred.** When a round points at a clause, edit it,
   name the edit as that round's variable, and promote what holds back into this
   README.

Suggested layout: `cast-designs/renders/<character>/<direction>-r<round>-<variant>.png`
with its `.md` prompt twin, and `cast-designs/renders/<character>/results.md`.

### Style block v1 (inlined in every prompt)

> chibi anime character design, 2.5 heads tall super-deformed proportions,
> oversized head, large expressive anime eyes with two highlights, bold clean
> outline thicker on the outer silhouette than on inner lines, line colour a dark
> shade of the key colour, flat cel shading with one shadow tone and one rim
> light, no gradients, no texture, no pixel art, no 3D render. Character design
> sheet on a plain off-white background: on the left a large bust portrait, head
> and shoulders cropped at mid-chest, three-quarter view facing right; on the
> right a full-body chibi turnaround, front, three-quarter, side and back, neutral
> standing pose, all at the same height. No text, no logos, no watermark.

## Order of rendering

Round 1 renders one direction per character, chosen for the strongest
above-the-shoulder hook, to test the style block itself across the cast before
spending renders on alternatives. Each character file ends with its reason.

| Round 1 | Direction | What it tests |
|---|---|---|
| Aqua | A, Goldfish Idol | a non-humanoid under the shared rendering rules |
| Weksa | A, Speech Bubble | a symbol-shaped hair mass as the hook |
| Heimdall | A, Horn Bearer | an asymmetric arc surviving the bust crop |
| Libby | A, Card Catalogue | a worn object as the hook |
| Eureka | A, The Spark | the leader's read with no regalia |
| Nibu | B, Smeared Hostess | a doubled outline as the hook |
| Kiko | B, Screen Mask | a second face as the hook |

Then the cast-wide silhouette check on the seven baselines, before any
round 2.
