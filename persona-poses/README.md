# Persona poses

Expression sheets for the eight cast members, cropped into pose cutouts. Canon for the look is the chosen Flux bust
of each character (`cast-portraits` r2a/r3a/r4a), the pixel sheets, the Aqua icon and the Eureka mascot.

## Round 1

`r1/contact-r1.webp` shows all sheets that exist, cropped and keyed on a grey checker (row pairs: r1a then r1b).
Per character: `r1/<name>/<name>-r1a|r1b.txt` is the render record (hypothesis, variable, request id, cost, exact prompt)
and `.webp` is the labelled 12-cell contact image. 2k sheets and full-size cutouts are in
`F:\Projects\cast-art-originals\poses-r1\<name>\` (not in git). `r1/run-log-r1.txt` is the key-free request log.

Each sheet is one FLUX 3 Image render (`aspect_ratio 4:3`, `resolution 2k`, output 2368x1776), a 4x3 grid of busts on flat
chroma green. Cells in reading order: neutral, happy, amused, thinking, concerned, annoyed, surprised, determined, then the
character's four signatures. The prompt is the busts' batch-A style block adapted for a sheet, one sheet sentence, the
character's canon block copied verbatim from its bust record, then twelve cell sentences.

- **r1a hypothesis:** a sheet keeps the character consistent across twelve cells from the prompt alone.
- **r1b hypothesis:** adding the canon bust as a reference holds canon details the prompt alone drifts on, without pulling
  every cell into the bust's pose.
- **Variable (r1b against r1a, one per character):** the canon bust cutout on its chroma green is passed as `images` and
  cited as image 1 by one prepended clause. Nothing else differs (`r1/check_r1.py` proves it).

Scripts: `r1/render_r1.py` (renders), `r1/matte_crop_r1.py` (crop and matte; the matte rule is `matte_r2.py`'s, unchanged),
`r1/check_r1.py` (record, count, matte and key checks).

### Results

14 of the 16 sheets exist. `weksa-r1b` and `void-r1a` hit server-side HTTP 500 failures and were not re-submitted: the
request allowance (16 plus two transport retries) was spent. Reading the table: "canon" means the bust in
`cast-portraits/r3/contact-final.png`. Labels below are the declared cell labels; where a cell's drawn expression does not
match its label that is stated.

| Sheet | Observation | Agent verdict | Operator verdict |
|---|---|---|---|
| libby-r1a | Held: violet braid over the right shoulder, bone clip, gold earrings, black robe with gold and mauve trim, violet brooch, book hugged. Drifted: the diamond ribbon moved from the clip to a bow at the collar; glasses are a thicker black than canon's thin frame. Cell 3 (amused) is an open smile with a fist at the mouth; cells 6 and 7 are swapped (annoyed shows an O mouth, surprised shows a worried frown). Cell 11 (shush) has no finger at the lips (open book only). The book is hugged in every cell. Expressions differ clearly in cells 1 to 5, less after. Matte clean; divider lines found and trimmed. | Usable for neutral, happy, thinking, concerned, stamp, schema; labels 6, 7, 8, 11 unreliable. | |
| libby-r1b | Canon held better: thin glasses, the ribbon beside the clip, brooch, braid. Label order drifted: cell 4 (thinking) is a plain neutral; the chin-hand pose is at cells 5 and 6; cell 7 (surprised) is a flat frown; the O-mouth faces sit at cells 8, 9 and 10. Cell 11 (shush) is a smirk with a scroll, no finger; cell 12 (schema) holds the diagram and raises a finger. Book hugged in every cell, so the bust's pose pulls the core cells. Matte clean. | Better canon, worse label fidelity than r1a; usable only by picking cells by look, not by label. | |
| heimdall-r1a | Held: dark brown skin, gold eyes, frown, gold earring, black coat with blue cape and gold filigree, key clasp. Drifted: hair has orange streaks instead of the bust's gold ovals; the shoulder armour with blue gems is plain; the raised golden key of the bust is absent from the core cells. Core labels hold in order (grin, wink, chin hand, O mouth). Concerned, annoyed and determined are near-identical frowns. Signatures: badge shows the key, not a badge (miss); barrier strong; protect (cape sweep) good; revoke (two keys crossed) good. Divider lines found and trimmed. | Good. Core cells 5, 6, 8 barely differ; badge missed. | |
| heimdall-r1b | Closest to the bust: gold oval hair highlights, armour with blue gems, earring, key raised beside the shoulder. The bust's key stays in the hand in 6 of 12 cells including core ones. Label order drifted by one: cell 4 (thinking) is a smirk, the chin-hand pose is at cell 5. Cell 9 (badge) is a gold badge with an O mouth, good; cells 10 and 11 are both a hand-and-cyan-shield (no cape protect); cell 12 (revoke) is the key with a drawn X beside it. Matte clean. | Best canon fidelity of the pair; label order and prop leak are the cost. | |
| kiko-r1a | Held: tall white ears with pink insides, kitsune mask on the head, bells and tassels, black kimono with magenta and teal trim, pink-tipped tail. Drifted: no pink headband, eyes read brighter blue than cyan, mask sits over one ear. A fist stays raised near the chest in cells 1 to 8. Cell 3 (amused) is a gritted-teeth grimace, a miss; the rest of the core differ readably. Signatures are the strongest set here: tinker (gadget, tongue out), confetti, sprint (arms out, speed lines), debug (magnifier, wink). Cutout dropped to the nominal grid (5 column runs); crop looks correct. | Good. | |
| kiko-r1b | Matches the bust: pink headband, black ornaments with gold bells and magenta tassels on both sides, pink-tipped tail, mask. The core cells share one torso and pose, so the expressions carry everything and several are close (cells 3 and 4 are both soft smiles; the chin-hand pose is at cell 5). Signatures are weaker than r1a: tinker holds a device, confetti and sprint cells are both a closed-eye cheer with confetti and a raised finger (no sprint), debug has the magnifier. | Better canon, less pose variety than r1a; sprint missed. | |
| aqua-r1a | Whole-body goldfish with scales, crest fin, big blue eyes and black over-ear headphones with cyan rings. Drifted: the face is orange, not the canon golden yellow; the headphones read navy. The clearest expression set of the batch (cells 1 to 8 all differ: smile, tongue, brow-raised smirk, O mouth, droop, glare). Signatures: conduct is a thin baton, not the fin; listen, patch and flourish read. Matte clean. | Good. | |
| aqua-r1b | **Cell-count failure:** the model drew a 4x4 sheet (16 cells), not 4x3. The 12 declared labels cannot be mapped; the cutouts are labelled c01 to c16. Golden-yellow face and cyan-ringed headphones match canon. Expressions are distinct (smile, tongue, droop, glare, O mouth, closed eyes with patch cable). Rows were cropped on the nominal 4x4 grid because no row gutters exist; slivers of the row above show at the top of cells c05 to c16. | Canon colours held; sheet contract failed; labels lost. | |
| weksa-r1a | Held: topknot with turquoise and amber beads and a feather, round gold glasses, turquoise earrings, dust smudge, cream robe with rolled sleeves over a leather vest, bead necklaces, backpack with scrolls and idol, a glyph card in hand. Expressions differ readably (grin, smirk, chin hand, worry, lidded annoyance, O mouth, narrowed). Signatures good: map, fieldwork (brush and idol), argue (finger, card), interlingua (two cards). The card is in hand in several core cells. Divider lines found and trimmed. | Good. | |
| weksa-r1b | Not rendered (server error, allowance spent). | none | |
| nibu-r1a | Held: very long pale lavender hair, violet eyes, calm face, arms folded in cells 1 to 8, frilled lilac blouse, circuit sleeves, cyan ring on the shoulder. Drifted: two pink ribbons, one each side, where canon has one bow on the right; the clip is a small pink and cyan bar. Expressions are readable but subtle. Signatures: console (floating panel) good, glitch (black horizontal lines across the face, not offset slices), lore good, triumph (wink and fist) good. | Good, with the double-ribbon drift. | |
| nibu-r1b | Matches the bust: one large pink bow on the right, the pink two-bead connector clip on the left, frilled collar, cyan ring. Label order drifted by one from cell 4: cell 4 is a grin, the chin-hand pose is at 5, O mouth at 8, determined at 9; cell 10 (glitch) shows a handheld device, cell 11 shows the glitch smear, cell 12 shows the closed-eye fist, so console and triumph are mislabelled. | Better canon, label order unreliable. | |
| eureka-r1a | Held: black hair with an orange streak, blue-grey eyes, charcoal jacket with orange piping, chest straps and pouches, fingerless gloves. Drifted: the hood is down in 11 of 12 cells (canon has it up framing the face); only cell 12 shows a hood. Expressions are clear and distinct. Signatures: probe (held, not pointed), inspect (pointing finger), report (tablet), hood (eyes shadowed, smirk) good. | Good expressions; the defining hood is lost. | |
| eureka-r1b | Hood up with orange piping, orange streak, orange probe held in nearly every cell from cell 2 on: canon holds, and the bust's prop leaks into the core cells. Expressions differ readably (grin, smirk, worry, glare, O mouth). Signatures: probe at the chin (not pointed), inspect (finger point), report (notebook), hood (eyes shadowed, smirk). | Best canon fidelity of the eight pairs; the probe in every cell limits reuse. | |
| void-r1a | Not rendered (server error, allowance spent). | none | |
| void-r1b | **Cell-count failure:** 16 cells (4x4), labelled c01 to c16. Hood, scarf and white eyes hold canon exactly. Expression is carried only by the eye shapes; c01 to c04, c08 and c10 are indistinguishable neutral faces. c05 to c07 are closed-arc eyes (one with a gloved hand at the hood), c09 half-lids, c11 and c12 angry, c13 welcome, c14 document, c15 point, c16 flat slits. Matte clean. | Canon held; sheet contract failed; labels lost. | |

### What round 1 says about the hypotheses

- r1a: the character stays recognisable across the twelve cells for every sheet, and the expression cells differ in most. It
  drifts on small canon details (Libby's ribbon, Kiko's headband, Heimdall's hair highlights, Nibu's second ribbon, Aqua's
  face colour) and on the one defining feature of Eureka (the hood).
- r1b: the reference restores those details on all six comparable pairs (libby, heimdall, kiko, aqua, nibu, eureka). It
  costs three things: the bust's pose and prop leak into cells (Heimdall's key, Eureka's probe, Libby's book, Nibu's folded
  arms), cell diversity drops (Kiko), and the cell order or grid drifts on six of the seven r1b sheets rendered
  (label shift on libby, heimdall, kiko, nibu; a 4x4 grid on aqua and void; only eureka-r1b holds the order). Whether the label shift is the image-1 clause
  confusing the cell numbering is a conjecture, untested here.
- Both variants shift labels somewhere (libby-r1a swaps 6 and 7; heimdall-r1a does not), so a cell is best chosen by looking,
  not by its declared label, until a round fixes the order.
- Not tested: whether a sheet at 12 cells of about 590 px is enough resolution for the report cutout size.

### Process notes

- The sheet asked for padding and no dividers; the model drew thin black divider lines in three r1a sheets (heimdall, weksa, eureka) and one r1b sheet
  (libby), none in the rest. The crop trims them, using the line positions when found.
- Request failures, all recorded in `r1/run-log-r1.txt`: the first `libby-r1b` attempt (id `936bb7bb-48f3-4770-836e-8e02e19892ea`)
  never became pollable; the first `kiko-r1b` (`419a1e26-f247-4a31-b61c-6265457a22d4`), `weksa-r1b`
  (`044ad25e-87c2-4c79-9c84-28b355501f78`) and `void-r1a` (`30a333e2-db14-4610-b749-26dadbe5d187`) returned HTTP 500. The first
  two were re-submitted (the two allowed retries); the last two were not. One submit (`heimdall-r1b`) was refused with HTTP 429
  (credit balance low: one active task per organisation); no task was created, and it was submitted afterwards.
