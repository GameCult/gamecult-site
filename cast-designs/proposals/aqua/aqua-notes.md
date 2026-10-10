# Aqua: designer's notes, round 1

## Canon change

Aqua already has an established design: the character sheet at
`F:\Projects\gamecult-site\GameCult\static\interactive\cotsc-praxis\character-sheets\aqua-sheet.png`
(and the sprites in `sprites\aqua\`). The brief in `../../aqua.md` missed it.
Canon overrides the brief, so A, B and C are three takes on that one goldfish,
not three reinventions. The brief's Bowl Helmet and Goldfish Hood girls are
dropped. The two pre-canon sheets are kept for the record:
`aqua-old-A.svg` (the first idol fish) and `aqua-old-B.svg` (the bowl-helmet girl,
which was still mid-revision: its twin tails had just been redrawn and it was
never re-checked).

What every take keeps from canon: a round body, a yellow face under an orange
crown and back that meet in a V between the eyes, an orange crest fin, a
duck-lip snout over an open mouth, small dark brows, big round blue eyes,
ribbed orange pectoral fins, a forked tail, rows of belly scales, and black
headphones with cyan-ringed cups. They differ in pose, prop and framing.

Files: `aqua-<A|B|C>.svg` are the sheets and `aqua-<A|B|C>.png` the full-size
renders. `aqua-gen.py` writes all three from one set of hand-drawn parts, so a
fix to the shared fish reaches every take.

## A: Listening

- **What it does:** a three-quarter bust turned toward the text box, with the near fin pressed
  to the ear cup and the eyes up and bright. Note bubbles rise screen right. This
  is the canon "listen" and "idle" poses at portrait size: the baseline the
  expression set would be drawn on.
- **Changed after looking:** I moved the face right so the three-quarter turn reads, because
  the first pass looked straight at the camera. The pre-canon "bangs" crown became the canon V.
  The snout was first a flat pale plate that read as a moustache, so I redrew it as an
  outline-only rounded upper lip over a w-shaped mouth. I raised the fin so it
  actually sits on the cup. The belly scales were moved off the mouth area so
  they stop reading as a second mouth.
- **Round 2:** give the eye a canon-style iris sparkle and test the cyan rim against
  ember-orange Eureka in the cast-wide 48 px lineup. The fish ball shape is
  shared by all three takes, so the hook in silhouette is only the ear cups,
  the band gap, the crest and the tail fork.

## B: Conductor

- **What it does:** she conducts the dings. A baton is raised in her far fin, her eyes are
  squeezed shut in a big laugh, and a ribbon of water loops round her body like a
  staff line. The whole bust is tilted 7 degrees for energy. It comes from the canon
  "conduct" pose.
- **Changed after looking:** the first ribbon cut across her cheek and mouth and read
  as a cyan tube. It now passes behind her upper left and sweeps in front
  of the belly, below the face, then curls into the baton fin. The snout fix
  carried over.
- **Round 2:** the baton is the only silhouette feature of the three takes that
  breaks the circle at 48 px, so it is worth keeping. Draw the ribbon as water,
  with a thinner, tapering, broken stroke and a few droplets, instead of a uniform hose.
  The baton star could become a note head.

## C: Patch Steward

- **What it does:** this is the steward under the cuteness. A patch cable is plugged into the
  bottom of her near cup and loops across her belly to a jack she holds up beside
  her mouth. The lids are half down, the brows are hard and the mouth is a wobbly pout. She is
  framed 6 percent closer. It comes from the canon "patch" and "boundary" poses.
- **Changed after looking:** a second gold cable and a jack held at the far cup made
  the cable read as going *into* the far cup. I cut that cable and moved the jack in front of the far
  cheek on a raised fin.
- **Round 2:** at 48 px the silhouette is the same as A's, because the cable
  stays inside the body outline. Push the jack and fin out past the right
  contour, or bring in the canon holo patch panel as a hard rectangle at the
  card edge. The loop also half reads as a headset microphone. A coiled
  patch-cable texture (two tones, a twist) would fix that. The raised fin is
  mostly hidden behind the cable, so it needs to come forward.

## Strongest

B. It has the most personality and the only silhouette break, and it is the
clearest statement of "her synth is the voice of the dings". A is the right
baseline for the expression set. C has the best face but needs its silhouette fixed.
