# Cast portraits, round 1

Round 1 of portraits for the shortlisted swarm members, rendered with FLUX 3 Image as
takes on their canon designs. These are raster portraits; vectorising comes later.
The drawings from the earlier rounds (`self/cast-stickers`, `self/cast-designs`) are
not used.

`contact-r1.png` shows all 16 renders, labelled. Each `<name>/<name>-r1a|b.txt`
holds that render's hypothesis, its variable, its render record and its exact prompt.

## Canon

Canon is the pixel-art character sheets in
`GameCult/static/interactive/cotsc-praxis/character-sheets/<name>-sheet.png` (six poses
each), plus `AquaSynth/icon.png` for Aqua and the Eureka skill's
`docs/assets/eureka-mascot-clean.png` for Eureka. All the sheets are chibi (a large head
on a small body) and drawn on near-black with neon glow accents. These notes come from
looking at the sheets. Where the `cast-designs` briefs disagree with them, the sheets win:
for example, the briefs give Libby reading-lamp green, but on her sheet she is lavender
and violet.

- **Libby**: long wavy lavender hair with a swept fringe, a white crossed-bone hair clip,
  a dark purple diamond-patterned ribbon bow, round thin black glasses, grey-violet eyes and
  gold drop earrings. She wears a high-collared black scholar's robe with mauve diamond and
  rune embroidery and a violet gem brooch. Her props are books, a wand, a skull, a stamp and
  glowing violet panels. She is cheerful and open-mouthed.
- **Heimdall**: dark brown skin and messy dark curly hair with gold highlights. His eyes glow
  gold and he frowns sternly. He wears a black coat with royal blue lapels and cape, gold
  filigree, blue gem studs, a gold key clasp at the throat and keys on his belt. He holds a
  large gold key. His motifs are gates, glowing blue circuitry and red denial cards.
- **Kiko**: messy white hair, white fox ears with pink insides, and a white kitsune mask with
  red and magenta markings worn on top of her head. Her hair ornaments are black with gold
  bells and magenta tassels. She has cyan eyes and a fang grin. She wears a black kimono-jacket
  with magenta and teal trim and a gold bell. She has white fox tails with pink tips, several
  in some poses. Her motifs are a neon magenta and cyan stream UI.
- **Aqua**: a round goldfish with a golden-yellow face, an orange body, scales, an orange crest
  fin and big blue eyes. He wears black over-ear headphones with cyan rings. His motifs are
  bubbles, music notes, a synth and a blue holographic panel. The icon shows the same fish in a
  glossy painted style inside a glass tank.
- **Weksa**: warm brown skin and messy dark hair in a half-up topknot with turquoise and amber
  beads and feathers. Weksa wears large round gold glasses, turquoise earrings, a cream robe with
  teal embroidered trim, a brown vest, layered bead necklaces and bracelets, and a leather
  backpack stuffed with scrolls and a carved idol. The props are glyph cards, a magnifier, maps
  and a field notebook. The sheet does not state Weksa's gender, so these notes use no pronoun.
- **Nibu**: very long pale lavender hair with a swept fringe, a pink connector-shaped hair clip,
  a pink ribbon bow and half-lidded violet eyes. She looks calm and serious and folds her arms.
  She wears a lilac frilled blouse, detached dark purple sleeves with circuit embroidery, a cyan
  ring device at the shoulder and a long dark purple coat. Her motifs are glitch dissolve and
  blue worldbuilding panels.
- **Eureka**: a young woman in a neon-noir dark trenchcoat whose edges are piped in glowing
  orange. She wears tactical straps and pouches and fingerless gloves, and she holds an orange
  probe and a lantern. Her eyes are blue-grey. The mascot shows her hair as dark with a blue cast;
  the operator ruled on 2026-10-10 that it is black with an orange highlight. In the mascot the
  hood is down behind a high collar.
- **Void**: a small figure in a pointed indigo-violet hooded robe. The face inside the hood is
  pure black, with two tall white oval eyes and no other features. Void wears a thick orange scarf
  with frayed trailing ends and dark gloves. The motifs are a spiral portal door and a glowing
  violet document.

## Shared style hypothesis (the r1a baseline)

A chibi bust is the baseline: head and shoulders, cropped at mid-chest, a three-quarter view
facing right, 4:5 at 2k. It is drawn in flat two-tone cel shading with a bold outline and a thin
rim light in the key colour, in a palette of five or six colours, on a flat dark navy ground.
The hypothesis is that this gives a take on the pixel canon that can be traced into vectors and
carries the canon's silhouette, palette and hooks. The ground follows the brand's `#07111a`, but
the prompt describes it in words, with no hex code. Each r1b changes one variable against its own
r1a.

## Results

| Render | Hypothesis | Variable (vs r1a) | Observation | Agent verdict | Operator verdict |
|---|---|---|---|---|---|
| libby-r1a | shared baseline | — | Every hook is there: bone clip, patterned bow, round glasses, gold earrings, rune-embroidered black robe, book. Ordinary anime proportions, not chibi. The ground came out a slate navy lighter than `#07111a`. No visible rim light. | Holds on canon. Misses chibi and rim light. | |
| libby-r1b | A pale ground separates a black robe | ground navy → pale off-white | The robe edge and hair outline read much more clearly. The clip became crossed bones, which is closer to the sheet, though that is chance and not caused by the variable. | Holds. The pale ground is better for tracing dark-clad characters. | |
| heimdall-r1a | shared baseline | — | Canon colours, key clasp, blue gems and gold key all present. Younger face, chunky bust. His hair is tamer than the sheet's wild mop. | Holds on canon. Only partly chibi. | |
| heimdall-r1b | Standard proportions read as generic | chibi → standard anime | Clearly older, taller and more of a generic bishonen. The key becomes a staff-length prop. | Holds: chibi is part of the canon read. Keep chibi. | |
| kiko-r1a | shared baseline | — | Strong canon match: mask on her head, bells and tassels, fang grin, wave, magenta and teal kimono, pink-tipped tail. The closest to chibi of the set. | Holds. The best of the round. | |
| kiko-r1b | Lineless vectorises more cleanly | outline → none | FLUX still drew thin dark contour lines, so the variable was only half applied. The figure also came out smaller in frame. | Does not hold: FLUX ignores "no outlines" when the prompt says "anime". | |
| aqua-r1a | shared baseline | — | Headphones with cyan rings, crest fin, blue eyes and bubbles are all present. The body reads more as a duckling or chick than the canon's round scaled goldfish: no scales, and a beak-like mouth. The key-colour rim outline shows. | Partial: the species read drifted. | |
| aqua-r1b | Glossy shading is truer to the icon | flat cel → glossy gradient | Barely different: slightly softer highlights and a rounder body. It is still not the icon's glossy look. | Inconclusive: the variable barely moved the output. | |
| weksa-r1a | shared baseline | — | Beaded feathered topknot, gold round glasses, turquoise earrings, cream robe with teal trim, scroll backpack, glyph card. A strong canon match, with the teal rim light visible. | Holds. | |
| weksa-r1b | A short prompt composes cleaner | long → two-sentence prompt | Cleaner and more frontal, but it dropped the card, the necklaces and the bracelets. The face reads more masculine and less like the sheet. | Does not hold: the long prompt keeps the canon. | |
| nibu-r1a | shared baseline | — | Long lavender hair, pink bow and clip, half-lidded eyes, folded arms, detached circuit sleeves with a cyan device. The clip is a plain pin, not the canon connector. Ordinary proportions. | Holds on canon, apart from the clip. | |
| nibu-r1b | A front view suits her still pose | three-quarter → front | Symmetrical and calm, and it suits her. The silhouette is about equal to r1a. | Weak hold: either view works. | |
| eureka-r1a | shared baseline | — | Black hair with an orange streak, as the operator ruled. Charcoal hooded coat with orange piping, chest rig, fingerless gloves, orange probe. Reads as a younger, cleaner version of the mascot. | Holds. | |
| eureka-r1b | Hood up gives a stronger silhouette | hood down → up | The hood framing her face makes a distinctive outline, and the orange lining and streak still show. | Holds, but it departs from the mascot (hood down). Needs an operator ruling. | |
| void-r1a | shared baseline | — | Pointed indigo hood, black face with two white oval eyes, frayed orange scarf, gloves. A faithful take, with an orange rim outline. | Holds. | |
| void-r1b | Square suits a wide hood and scarf | 4:5 → 1:1 | The figure came out smaller, with more empty ground. It reads the same and gains nothing. | Does not hold: keep 4:5. | |

## Carried to round 2

- The chibi wording did not land for most of the cast. Only Kiko and Aqua came out chibi. Round 2
  should test a stronger proportion statement (for example a head-height ratio) as its single
  variable.
- The rim light appeared only where the outline took on the key colour (Aqua, Weksa, Void).
- The flat navy ground renders lighter than `#07111a`. A pale ground traces better for dark-clad
  characters. Choosing the ground per character, or one shared choice, is a ruling for the operator.
- Negative style instructions ("no outlines") are weak against the word "anime".

# Round 2

Operator verdict on round 1 (ruling `site-masthead:ruling:cast-portrait-canon-r1`): "Hood up, blue-grey
eyes, push Libby further from Nibu, Weksa is a girl (if tomboyish, she's kind of an indiana jones type after
all). No backgrounds. See if you can get a consistent batch now." The hood and the eyes are Eureka's.

Files are in `r2/<name>/`: `<name>-r2a|b.webp` (lossless, 1024 px), `<name>-r2a|b-cutout.png` (transparent,
1024 px) and `<name>-r2a|b.txt` (hypothesis, variable, render record, exact prompt). The 2k originals stay out
of git in `F:\Projects\cast-art-originals\r2\`. `r2/contact-r2-A.png` and `r2/contact-r2-B.png` show each
batch's eight cutouts at one scale on mid-grey.

## Canon changes in round 2

- **Eureka**: hood up, framing her face, piped in ember orange; blue-grey eyes; black hair with one orange streak.
- **Libby, pushed away from Nibu** using levers from her own sheet and none of Nibu's. Changed: her hair is a
  deeper, warmer dusky violet-lavender (Nibu stays pale lavender), gathered into one loose, fat wavy braid over
  her right shoulder with the diamond-pattern bow at the top of the braid. The braid replaces the sheet's loose
  fall of hair and gives her a different silhouette from Nibu's long straight curtain. Emphasised: black and gold
  as her palette (gold embroidery, gold-set brooch, gold earrings, gold-cornered book) against Nibu's lilac,
  pink and cyan; round glasses; an open, happy smile against Nibu's half-lidded calm; a book hugged to her
  chest against Nibu's folded arms. Nibu is unchanged apart from her clip.
- **Weksa** is a tomboyish young woman, a field archaeologist of the Indiana Jones type: a confident lopsided
  grin, dust on one cheek, robe sleeves rolled to the elbows, a weathered leather vest and a chest strap. Her
  sheet's canon is kept: gold round glasses, beaded and feathered topknot, cream robe with teal trim, scroll
  backpack with a carved idol, glyph card. She has no hat, so the topknot stays visible.
- **Nibu**: the clip is described as a small data-connector plug, a rectangular body with a pink bead at each end.
- **Aqua**: overlapping scales are drawn on the body, with a round fish mouth and no beak, legs or feet. Aqua's
  canon is a whole fish, so his prompt asks for the whole body instead of a bust.

## Shared style block and ground

Every prompt is one shared style block, byte-identical within a batch, then a blank line, then a block that
describes only the character. The style block fixes:

- the framing: a bust cut at mid-chest by the bottom edge, three-quarter view turned right, head centred, 4:5 at 2k
- the proportions, as a head count
- the line: one bold dark outline of even weight, thinner inner lines
- the shading: flat cel, one base tone and one shadow tone per material, light from the upper left
- the palette rule: five or six flat colours from the character's key colours
- the ground

Round 1's rim light is dropped. It took only where the outline turned the key colour, and a coloured rim at
the matte edge makes the key less clean.

The ground is one flat chroma-key green, because green is the only hue no character uses. FLUX cannot emit
transparency, so `matte_r2.py` (Pillow only, no models) keys the ground out deterministically:

- Greenness is G - max(R, B).
- Alpha ramps from opaque at a greenness of 40 to clear at 110, so ground enclosed between an arm and the body
  is keyed too.
- G is clamped to max(R, B) only in a thin band at the edge (despill).
- The alpha edge gets a 0.8 px feather.

All 16 grounds came out flat: corner standard deviation was 1 to 3 per channel, with one corner of void-r2a at 7.
The strength of the green varied between renders. After the key, no pixel above half opacity is still strongly
green, and no halo shows on a dark or a light checker. FLUX drew a thin light sticker border outside the dark
outline on several figures (Kiko, Nibu, Eureka). The border is part of the drawing, not left over from the key,
and it stays in the cutout.

## Hypotheses

- **r2a (batch A)**: a byte-identical shared block that states the proportions as a head count ("two heads
  tall") instead of the bare word "chibi" gives a consistent chibi batch. A flat green ground gives clean,
  deterministic cutouts.
- **r2b (batch B)**: identical to r2a except for "three heads tall", to test whether a milder ratio is followed
  more evenly. Each render changes one variable against the same character's r2a.

## Results

| Render | Observation | Agent verdict | Operator verdict |
|---|---|---|---|
| libby-r2a | Deep violet braid over the shoulder, bone clip, diamond bow, round glasses, gold earrings, black and gold robe, book. Clearly chibi. | Holds. She reads apart from Nibu. | |
| libby-r2b | The same design, with a slightly smaller head. The braid and the black and gold palette carry the separation. | Holds. | |
| heimdall-r2a | Chibi, curly hair with gold highlights, black and blue coat with gold filigree, gold key. | Holds. | |
| heimdall-r2b | Older and longer-faced, closer to round 1's standard proportions. The hair is less curly. | Weaker: the ratio pulls him toward generic. | |
| kiko-r2a | Mask, bells, tassels, fang grin, wave, magenta and teal kimono, pink-tipped tail. | Holds. | |
| kiko-r2b | Almost the same as r2a. | Holds. | |
| aqua-r2a | Round goldfish with headphones, crest fin and a small fish mouth, no beak. The body is smooth, with no scales. He is smaller in frame than the busts. | Partial: the species is fixed, the scales are missing. | |
| aqua-r2b | Clearly drawn scales, fish mouth, forked tail, headphones with cyan rings. | Holds. Closest to canon so far. | |
| weksa-r2a | Reads as a young woman: topknot, gold glasses, teal trim, scroll backpack, chest strap, glyph card. The grin is soft, not lopsided. | Holds. | |
| weksa-r2b | A tomboyish young woman with a grimy field look, an idol in the backpack and a glyph card. The dust smudge reads as heavy grime on her cheek. | Holds. The grime may be too much. | |
| nibu-r2a | Calm, arms folded, pale lavender hair, cyan device. The clip is a plain pin and the bow is small. | Partial: the clip is still not the connector. | |
| nibu-r2b | The clip is a rectangular plug with a bead at each end, the first time it reads as the connector. Her body is longer and more adult. | Holds on canon. Less chibi. | |
| eureka-r2a | Hood up and piped in orange, black hair with an orange streak, blue-grey eyes, chest rig, probe. | Holds. | |
| eureka-r2b | The same design, slightly less chibi. | Holds. | |
| void-r2a | Pointed hood, black face with white oval eyes, frayed orange scarf, gloves. | Holds. | |
| void-r2b | The same design, smaller in frame. | Holds. | |

## Consistency

Both batches are far more uniform than round 1: one line weight, one shading model, one crop and one turn
across all eight characters. Batch A is the more consistent one. "Two heads tall" put the human busts on one
chibi scale. "Three heads tall" let Heimdall and Nibu drift back toward round 1's ordinary anime proportions,
while Kiko and Libby stayed chibi. The wording of the ratio decides how consistent the batch is: a milder ratio
leaves FLUX room to fall back on each character's default proportions. Batch B's gains (Nibu's connector clip,
Aqua's scales) are per-render chance, not an effect of the ratio. Neither batch matched the scale of the
non-human figures: Aqua and Void sit smaller in frame than the busts.

## Open for round 3

- Getting batch A's style block together with Nibu's connector clip and Aqua's scales from batch B needs a re-render.
- The scale of Aqua and Void needs a framing statement in their character blocks, for example "fills the frame
  as fully as the others".
- Weksa's dust smudge may need toning down.

# Round 3

Operator direction: "keep the renders that are already fine, no?" Batch A is the set: libby-r2a,
heimdall-r2a, kiko-r2a, weksa-r2a and eureka-r2a stay as they are. Only the misses are re-rendered, with
batch A's shared block byte for byte (two heads tall), so the new renders match the kept ones. There are four
renders and no re-rolls. Files are in `r3/<name>/` in the same layout as round 2, and the 2k originals are in
`F:\Projects\cast-art-originals\r3\`. `r3/render_r3.py` and `r3/matte_r3.py` hold the prompts and the same
matte as round 2. `r3/contact-final.png` shows the chosen set of eight at one scale.

- **aqua-r3a**: the character block says he fills the frame like the busts and draws the scales as rows of
  outlined curved shapes.
- **void-r3a**: the character block says he fills the frame like the busts.
- **nibu-r3a**: the same prompt as nibu-r2a, a fresh render. It is the baseline for r3b.
- **nibu-r3b**: one variable against r3a, the way the clip is described. The geometric description ("a short
  rectangular plug body with a round pink bead at each end") became a named object ("shaped exactly like a tiny
  USB cable plug, a rectangular metal-and-pink connector head with a short cable stub").

| Render | Observation | Agent verdict | Operator verdict |
|---|---|---|---|
| aqua-r3a | Scales all over the body, clearly outlined. He is larger in frame than aqua-r2a but still smaller than the busts, with the lower part of the frame empty. The mouth came out as a small pointed beak again, despite "no beak". | Partial: scales fixed; the beak is back and the scale is only partly fixed. | |
| nibu-r3a | Under A's proportions, the clip is a pink rectangular plug with a bead at each end, matching the sheet's connector clip. Calm, arms folded, circuit sleeves, cyan device. | Holds. Chosen for the set. | |
| nibu-r3b | The clip is a recognisable USB plug with a cable stub, but it is grey and pink and drops the sheet's pink end beads. | Holds on the variable (a recognisable connector), but further from canon than r3a. | |
| void-r3a | The hood and scarf now fill the frame like the busts, cut at mid-chest. Canon kept: black face, white oval eyes, frayed orange scarf, gloves. | Holds. | |

The set in `contact-final.png` is libby-r2a, heimdall-r2a, kiko-r2a, aqua-r3a, weksa-r2a, nibu-r3a,
eureka-r2a and void-r3a. No halo shows on any of the round-3 cutouts on a dark or a light checker.

Still open: Aqua's mouth. A negative ("no beak") does not hold. A positive description of the shape may do
better, for example the icon's wide open smile, or a mouth drawn as a small round "o" with no point.
