# Swarm stickers

Chibi stickers of the GameCult swarm cast, built by a small rig instead of drawn one by one.
Every sticker is a standalone SVG under `stickers/<character>/<pose>-<expression>.svg`;
`gallery.html` shows them all with character and pose filters; `CAST.md` lists who is who.

Open `gallery.html` in a browser to browse. To use a sticker, copy its SVG. The white die-cut
edge is not in the file; it is CSS, so it can be dropped where it does not suit:

```css
img.sticker { filter: drop-shadow(3px 0 0 #fff) drop-shadow(-3px 0 0 #fff)
  drop-shadow(0 3px 0 #fff) drop-shadow(0 -3px 0 #fff) drop-shadow(0 8px 10px rgba(0,0,0,.45)); }
```

## Layout

| Path | What it is |
|---|---|
| `rig/rig.mjs` | The rig: bases, poses, expressions, hair, accessories, props, emblems, `render()` |
| `rig/characters.mjs` | One trait sheet per character, and which characters get every pose |
| `rig/build.mjs` | Writes the SVGs, `gallery.html` and `CAST.md` |
| `rig/shot.sh` | Screenshots the gallery with Edge headless, for checking renders |
| `stickers/`, `gallery.html`, `CAST.md` | Generated; never edit by hand |
| `PROCESS.md` | How the rig works, its coordinate conventions, how to check renders, known weak spots |
| `process/` | Before/after renders referenced from `PROCESS.md` |

## Regenerate

Node 18 or newer, no packages:

```sh
node cast/rig/build.mjs              # everyone
node cast/rig/build.mjs kiko eve     # only these characters (the gallery is rebuilt from disk)
```

## Add a character

1. Append a trait sheet to `CAST` in `rig/characters.mjs`. Copy the nearest existing one.
   - `id` (folder name, lowercase), `name`, `role` (one line from the repo README), `source`
     (path of the avatar or self-description the look comes from, or a string starting with
     `invented`), optional `note` for a design decision worth keeping.
   - `base`: `humanoid`, `raven` or `horse`. Raven needs `beak`; horse needs `muzzle`.
   - `skin`, `eyes` (iris colour), `accent` (pose sparkles), optional `hands`, `faceInk`
     (eye and mouth lines on a dark face), `noBlush`.
   - `hair: { style, color, accent? }` — a key of `HAIR` in `rig.mjs`.
   - `outfit: { shape, main, trim, collar, belt? }` — shapes `tunic`, `dress`, `robe`, `coat`
     (ravens always use `egg`, with `belly` and `wing`); collars `v`, `round`, `high`, `none`.
   - `legs`, `shoes`, optional `cape`, `sleeve`, `extraLegs` (0-4).
   - `acc`: list of `[name, ...colours]`, keys of `ACC`. `prop`: `[name, ...colours]`, a key of
     `PROPS`, or `null`. `emblem`: `{ shape, color, disc? }`, a key of `EMBLEMS`, or `null`.
   - `full: true` renders every pose and expression; otherwise neutral pose with the three
     expressions in `COMMON_EXPRESSIONS`.
2. Run the build, then check the render at sticker size (see "Checking renders" in `PROCESS.md`).
3. Commit the trait sheet together with the generated files.

## Add a pose

Add an entry to `POSES` in `rig/rig.mjs`: hop height, head offset and tilt, elbow and hand points
for each arm (`front: true` draws that arm over the head), feet offsets, where the prop sits
(or `null`), and an optional effect from `fx()`. Coordinates are in `PROCESS.md`. Every `full`
character picks it up on the next build. Check hands against long hair and twintails: a hand
inside the head outline disappears behind the hair.

## Add an expression

Add a `case` to `face()` in `rig/rig.mjs` and the name to `EXPRESSIONS`. Draw relative to the
base's anchors (`BASES[...].eyeX/eyeY/mouthY/browY/cheekX/cheekY`), never fixed numbers, so the
raven and horse faces follow. If ravens should open their beak for it, add it to `beak()`.

## Licence

All art here is the project's own: drawn as hand-written SVG shapes by this rig, not traced or
derived from any third-party asset. The avatars named in `CAST.md` are GameCult's own images and
served only as reference for colours and traits. The repository has no licence file at the time of
writing, so the stickers carry no licence grant beyond GameCult's own; add one here if they are
meant to be reused outside GameCult.
