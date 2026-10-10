# Eureka: designer's notes, round 1

## Change of direction

The first pass drew the A/B/C concepts in `../../eureka.md` (Spark, Waking
Colossus, Inspectable). Only The Spark was drawn before the operator redirected:
"I kinda liked the Eureka from the readme art, kind of a neon noir hooded
trenchcoat and tactical gear for extreme bug hunting. I'd give her black hair
with an orange highlight." That sheet is kept as `eureka-old-A.svg` / `.png`.
B and C of the old set were never drawn.

The new A/B/C are three variations on one canon, not three concepts. Every
sheet keeps: hooded neon-noir trenchcoat with orange neon piping, tactical
harness (crossed straps, buckle, pouch, a status LED), dark gloves, black hair
with exactly one orange streak lock on the near side, orange neon as the key
colour, brand-blue eyes (taken from the readme art; the only blue on her).
What changes is the hook, the expression and the prop.

## A: Hood + Lantern

- Hood up, with a tall peak leaning back; the hood's inner rim is piped in
  neon and frames the face like a portrait window. Lantern raised beside her
  far cheek (toward the text box), so the lantern is the warm rim light on her
  face. Orange pry bar over the near shoulder, its crook breaking the
  silhouette on the left. Half-dropped lids and a crooked half smile: dry.
- Changed after looking: the pry bar first sat behind the hood and read as a
  cat's tail, so it moved in front of the shoulder; the lantern was hidden by
  the sleeve, so the arm now comes in from the right and the lantern is drawn
  over it; the hood's lower edge made a bar across her neck, so the hood now
  drapes behind the coat and only its upper rim sits over the face.
- Round 2: the raising arm is long and stiff, so foreshorten it or hang the
  lantern from a shorter grip. Try the peak at two heights to see how much
  hood the 48 px read needs.

## B: Streak + Specimen

- Hood down and bunched at the neck, so the hair is the hook: a wild spiky
  black mass with a wider orange streak running from crown to cheek. She holds
  up a specimen jar with a mutant beetle (orange eyes, extra legs) and a label
  reading SURVIVED, a callback to the readme's specimen case. Proud fanged grin.
- Changed after looking: almost nothing; this one worked on the first render.
- Round 2: the jar label is the only text in a portrait; check it at dialogue
  size, and test a version where the bug is out of the jar on her glove.

## C: HUD Visor

- Hood down, with a translucent orange visor across the eyes: a reticle on the
  far eye, scan bars, a tiny "MUT 03" readout, sensor pods at the temples and
  swept fins at both sides. Long tweezers raised with a wriggling mutant.
  Focused, tongue-tip concentration face.
- Changed after looking: the visor's lower rim cut through both irises, so the
  visor drops below the eyes; the tint went from 0.28 to 0.16 opacity because
  the eyes went muddy; the fins were small and the 48 px silhouette read as a
  plain round head, so they roughly doubled in length.
- Round 2: the visor hides the eye shape, which is the face's main expressive
  tool; try pushing the visor up onto the hair in neutral lines and down only
  in the "Eureka!" line.

## All three

- Checks run: the bust at 128 px (streak, hood, jar and visor all read) and the
  filled bust at 48 px. Silhouettes: A is a peaked wedge with a hooked bar, B a
  spiky burst with a jar, C a circle with horizontal fins. All three differ
  from each other; C is the weakest.
- The three sheets share one face and one full-body build on purpose: this is
  one character in three outfits. In round 2 the strongest direction should get
  its own five portrait-set expressions (`../../eureka.md`, Portrait set).
- Palette per sheet: neon `#ff8a2a`, line `#2b1408` (a darker ember than the
  old `#4a1e05`, which disappeared against black hair), hair `#1d2029`, coat
  `#2c323e`, skin `#ffd6a8`, eyes `#59b7ff`. Each has one shadow tone; steel
  `#9aa3ae` appears only on buckles and tweezers.
- The bust card adds a lighter navy band (`#0f2131`) behind the head, because
  black hair on the brand ground `#07111a` loses its outline. The cast frame
  rule should carry this lighter band if Eureka keeps black hair.
