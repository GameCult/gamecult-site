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
