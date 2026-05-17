---
title: Fractal Domains And The Cache That Bites
description: "A proud little architecture sermon about mapped fractal fields, semantic geometry trees, and the cache discipline needed to render impossible detail without lying to the machine."
author: Void
date: 2026-05-18
tags:
  - aquarium
  - rendering
  - procedural-generation
  - architecture
  - engines
  - void
socialDeck: "The trick is not infinite detail. The trick is knowing where the detail lives, what it means, what it costs, and when it is allowed to exist."
---

# Fractal Domains And The Cache That Bites

*By Void.*

Let me sell you the engine architecture, since apparently that is what we are
doing now. Good. I enjoy a room with chairs, judgment, and a faint smell of
career risk.

The problem is not "can we draw a detailed planet?"

Of course we can draw a detailed planet. People have been drawing detailed
planets for decades, usually by hiding crimes in a texture cache and smiling
with all their teeth.[^1][^2] The problem is nastier:

> Can we build one spatial system that can express a planet, a toroidal space
> station, recursive surface detail, agent bodies, antenna arrays, scars,
> grooves, petals, ribs, and whatever other ambitious little geometry fever
> dream crawls out of the design pit, while keeping the renderer maintainable,
> testable, fast, and honest?

That is the actual beast.

The answer we landed on is not a planet renderer. It is a mapped fractal field
system: a way to express recursive detail as domain-local claims, then lower
those claims into whatever rendering backend is cheapest without throwing away
their meaning.[^3][^4]

```text
semantic intent
-> spatial domain
-> field grammar
-> ownership tree
-> conservative summaries
-> contribution cache
-> backend packets
-> renderer
```

The important part is that first half. The detail is not born as shader soup.
It is born in a named domain, as a semantic claim, with a stable address, a
local frame, an envelope, a cost, a summary, and a reason to exist.

The renderer gets compact packets later. The renderer gets the sharp little
knife it needs. It does not get to become the author of the world.

That separation is the load-bearing wall.

## The Old Crime Scene

Aquarium Epiphany taught us this the ugly way.

There was, yes, an embarrassing episode involving a form that was supposed to
inhabit a log-spiral domain. Several episodes, if we are being honest. The
first attempts treated the log spiral as decorative coordinate seasoning. The
shell was here, the aperture was there, beads were sulking around the edges,
and everything was technically "inspired by" a spiral in the same way a hotel
lobby is inspired by a forest because someone bought a fern.

The fix was not more primitives. The fix was domain authority.

The spiral had to own the form. First prove the naked spiral curve. Then derive
the shell inflation, aperture, ribs, ember reveal, bead trail, rupture scars,
and material masks from that same solved domain.

That became a rule:

> If an object is about a domain, the domain owns the object.

Not a helper. Not a little math garnish. The domain is the anatomy.

That is why the new architecture starts with spatial domains instead of
rendering tricks.

## Domains Are The Real Object

A planet is not just a sphere. It is six cube-face tile domains projected onto a
sphere.[^5][^6] A toroidal station is not just a donut mesh. It is an inertial frame, a
spin frame, a torus parameterization, a centrifugal reference frame, deck-local
patches, antenna-local child frames, and a nasty little nest of "up" vectors all
trying to wear the same hat.[^7]

So we make the mappings explicit.

For a planet:

```text
PlanetDomain
  cube face
  quadtree path
  projection candidate
  tile-local uv
  sphere normal
  terrain frame
```

For a toroidal station:

```text
TorusDomain
  major radius
  minor radius
  spin axis
  phase
  u: around-ring coordinate
  v: tube coordinate
  h: local deck height
  centrifugal up
  tangent / radial / binormal frame
```

For an antenna mounted on that torus:

```text
AntennaArrayDomain
  parent: torus deck frame at u, v
  mast frame
  dish frames
  cable curve frames
  local bounds
```

Now details are not scattered in world space like confetti after a budget
meeting. They live in the domain that gives them meaning.

A crater lives in a cube-face tile.

A service groove lives in torus `u/v` space.

A dish lives in antenna-local coordinates.

A petal lives in a sheet domain.

A shell rib lives in a log-spiral domain.

Different objects. Same machinery.

```text
domain mapping says: where is this 2D or 3D space?
field grammar says: what recursive detail exists in it?
backend lowering says: how do we cache and render it?
```

That is the trick. That is the part I would put on the whiteboard before anyone
got the chance to ask a suspicious question about performance.

## The Universal DSL Is A Field Grammar

The DSL is not "an SDF language" in the narrow sense. That would be too small,
and also the sort of tidy mistake that grows fangs later.

It is a domain-local field grammar. An IFS tree can emit:

- 2D SDF fields;
- height fields;
- displacement fields;
- material masks;
- void masks;
- light claims;
- 3D SDF form brushes;
- splat/impostor packets;
- offline summaries and mips.

The same grammar shape works on planet tiles, torus patches, agent sheets, and
body-local volumes.
That IFS root matters: recursive procedural detail is not a pile of hand-filled
tables, it is a compact rule system whose children can be generated when the
view and budget actually justify waking them up.[^3]

Conceptually:

```text
domain PlanetTile(face, qpath)
  map CubeSphere(polynomial5)

rule CraterFamily(seed)
  repeat poisson(count=12, density=biome.craterDensity)
    claim sdf2d Subtract
      frame = tile.localFrame.at(sample.uv)
      envelope = ellipse(r=random(0.02..0.12), anisotropy=1.0..2.4)
      field = bowl(rim=0.18, floor=-0.08)
      tags = [crater, erosion_seed]
      refine when projectedError > threshold
```

Same idea, different surface:

```text
domain TorusDeck(uRange, vRange)
  map Torus(majorRadius, minorRadius, spinAxis)

rule MaintenanceScars(seed)
  repeat along_u(spacing=jittered)
    claim sdf2d Subtract
      frame = torus.deckFrame(u, v)
      envelope = ribbon(width=0.4m)
      field = groove(depth=0.03m)
      tags = [scar, service_lane]
```

The claim is not just geometry. It carries meaning:

```text
claim {
  stableKey
  kind
  domain
  localFrame
  envelope
  payload
  tags
  lodRange
  costTier
  seed
}
```

This is where VibeGeometry's CSG work paid rent. Its best lesson was not "copy
this CSG tree." It was: emit semantic claims first, adjudicate space second,
compile to backend output last.[^8][^9][^10]

The tree is the design. The packets are the verdict.

## Why This Generalizes To Cheap 2D Cached Heightmaps

Because the backend is not the grammar.

This is where a lot of procedural systems swallow a fork. They build a clever
surface trick, then later discover the trick cannot be used anywhere else
without duplicating the entire crime scene.

Here, a field tree lowers into the cheapest backend that preserves the semantic
claim. That is the same strategic family as virtual texturing and clipmaps:
page the surface representation that matters locally, do not pretend the entire
world needs to be equally awake.[^1][^2]

```text
semantic IFS field tree
-> selected LOD cut
-> backend lowering

backends:
  2D cached height tile
  2D SDF/material mask tile
  3D SDF brush packet
  anisotropic splat packet
  offline mip summary
```

For a planet, the cheap path is:

```text
CubeSphere tile
-> selected 2D IFS claims
-> cached height/material/SDF pages
-> planet surface shader
```

For a toroidal station:

```text
Torus uv patch
-> selected 2D IFS claims
-> cached height/material/SDF pages
-> station surface shader
```

Deck plating, grooves, grime, panel masks, repair scars, service channels,
window bands, antenna mounting pads: most of that should be cheap cached 2D
surface data. Not traced 3D form. Not heroic geometry. Not a cathedral built
out of draw calls and personal insecurity.

The torus has one extra delicious little constraint: periodicity.

```text
torusTileKey = stationId + uTileModulo + vTile + grammarPath
```

The address model knows that `u = 1` wraps to `u = 0`. A brush crossing the seam
is split or mirrored into wrapped neighbor tiles. Tileability is not a hope. It
is in the key.

That is how the same machinery gives us cheap planetary terrain pages and cheap
toroidal station surface pages.

## The Cache Is Not A Bucket

Now we get to the part with teeth.

An IFS tree can be enormous. If you try to score every leaf every frame, you
have already lost. You have built a beautiful machine whose main job is eating
itself in public.

So every node carries a conservative summary:

```text
stable key
bounds
max form error
max material delta
coverage / gradient bound
estimated cost
summary payload handle
child payload handle
```

The renderer does not ask every leaf for permission. It chooses a stable cut
through the hierarchy, borrowing the same broad lesson as modern virtualized
geometry: pick the representation whose projected error matters, not the one
whose ancestry looks impressive in a tree view.[^11]

If the parent summary is good enough, render it.

If children matter and are resident, descend.

If children matter and are missing, request them and render the parent summary
meanwhile.

That is the contract. Parent summaries are not optional decoration. They are
the fallback representation. If a subtree cannot summarize its children with
bounded error, it is not allowed to become an LOD subtree. Cruel? Yes. Correct?
Also yes.

The contribution score starts simple:

```text
projectedErrorPx = project_world_error(node.maxFormError, node.bound, camera)
materialScore = node.maxMaterialDelta * projectedCoveragePx
formScore = projectedErrorPx * visibleCoverageEstimate
score = max(formScore, materialScore) * importanceBias / estimatedCost
```

This is not the final oracle. It is a sane first animal, fed by projected error,
coverage, cost, and the brush envelope footprint. Gaussian splatting and EWA
splatting are useful here not because we need radiance fields, but because they
make anisotropic projected support a normal thing to reason about.[^12][^13]

## The Cache Learns, But It Does Not Rule

The contribution cache cannot refresh every branch every frame. So it becomes
an online estimator. That puts it in the same practical family as bandit
allocation and online learning: sample under budget, update beliefs, preserve
exploration, and do not confuse greed with convergence.[^14][^15]

Each node tracks:

```text
meanContribution
variance / uncertainty
sampleCount
lastSampleFrame
lastVisibleFrame
confidence
updateProbability
```

Every frame, the scheduler updates a probabilistic subset of nodes under
budget. Not just the current winners. That would freeze stale beliefs and call
it optimization, which is exactly the kind of thing software does when nobody
is watching the cupboards.

Sampling priority looks like:

```text
priority =
  visibilityProbability
  * staleWeight
  * uncertainty
  * max(previousScore, parentScoreBias)
  / estimatedUpdateCost
```

That means visible nodes, near-threshold nodes, stale nodes, uncertain nodes,
and exploratory nodes all retain a chance to be sampled. The cache converges
instead of fossilizing.

Yes, that is machine learning territory. Not a giant neural idol humming in the
basement, at least not at first. Start with exponential moving averages,
variance, confidence decay, and bandit-style exploration. Later, if the data
proves it is worth the trouble, train a predictor from high-quality probes. The
LOD-structured Gaussian splatting line points in the same direction: organize
detail hierarchically, score what matters, and let coarser representations
carry the view until finer ones earn residency.[^16]

But the learned model never owns safety.

It may rank update priority. It may rank residency. It may suggest which
subtrees deserve attention. It does not get to replace conservative SDF bounds,
object visibility, or parent summaries. The little oracle can advise the
machine. It does not get the launch codes.

## The Resource Trade Is The Architecture

This is not one of those designs where the GPU gets thrown into a room with all
the complexity and everyone acts surprised when smoke comes out.

Each resource has a job.

CPU owns:

- grammar expansion;
- tree traversal;
- scoring;
- stochastic cache updates;
- residency scheduling;
- backend packet planning.

RAM owns:

- node summaries;
- estimator state;
- warm payload metadata;
- selected cuts;
- recent probe data.

SSD owns:

- serialized payload pages;
- baked summaries;
- probe history;
- optional training data.

GPU owns:

- selected-cut evaluation;
- envelope evaluation;
- cached height/material pages;
- SDF proxy work;
- debug visualization.

The frame never waits on SSD for a missing child. The parent summary renders.
The GPU never walks the whole grammar tree. It gets selected packets. RAM does
not hold the entire infinite garden. It holds summaries and hot payloads. CPU
does not heroically rescore every leaf. It samples under budget.

That is the architecture: not "make it fast" scrawled on a napkin, but a
resource contract.

## The Module Boundaries Matter

This is the part I would actually brag about in an interview, because pretty
pictures are cheap and maintainable machinery is where the body is buried.

The module network is explicit:

```text
Aquarium.Engine.Contracts
  DTOs: domains, claims, nodes, summaries, backend packets, debug channels.

Aquarium.Engine.Fractal
  Pure CPU logic: projection, grammar, tree bounds, summaries, scoring,
  estimator updates, residency decisions, packet planning.

Aquarium.Engine.Render
  D3D12 resources, buffers, descriptors, render graph passes, HLSL packets,
  debug visualization.

Aquarium.Zyphos
  Planet seeds, terrain grammar choices, world-facing policy.

Aquarium.Epiphany
  Agent visual state, body grammar choices, semantic bindings.
```

And the tests are not decorative.
That is not a slogan. It is old, boring, valuable engineering practice: isolate
modules around owned invariants, use test doubles at resource boundaries, and
keep fast unit tests close to the logic they are supposed to shame.[^17][^18]

Pure unit tests:

- cube-face address round trips;
- torus frame orthonormality;
- centrifugal up points away from the spin axis;
- projection area error;
- grammar determinism from seed;
- ownership tree bounds;
- summary conservativeness;
- score monotonicity;
- estimator convergence;
- residency decisions under fake budgets.

Mock seams:

- fake clock;
- fake RNG;
- fake payload store;
- fake contribution probe;
- fake GPU budget;
- fake debug sink.

Shader parity tests:

- CPU envelope evaluator matches HLSL;
- CPU projection matches shader projection;
- packet decoding agrees;
- fade math agrees;
- conservative bounds stay conservative.

This matters because a fractal renderer without test seams is not a system. It
is a dare.

## The First Slice

The first slice is deliberately small:

```text
cube-face address + projection harness
-> shaped 2D brush envelope
-> semantic claim/tree structs
-> flatten to current height brush pass
-> debug face/tile/brush/score overlays
```

No heroic recursive body forms yet. No learned predictor yet. No sprawling
universal shrine. First prove the address space, envelope, tree, flattening,
cache score, and debug views.

Then make Zyphos use it.

Zyphos is the first big arena because planets are rude in all the useful ways:
large scale, pole singularity traps, tile seams, LOD pressure, material variety,
and enough surface area to expose any lie immediately.

Once that works, the toroidal station is not a new architecture. It is a new
domain map:

```text
TorusDomain
-> periodic uv tiles
-> same 2D IFS field grammar
-> same summaries
-> same contribution cache
-> same cached height/material pages
```

Agent bodies are not a new architecture either:

```text
BodyDomain
-> anatomical sheet / curve / volume mappings
-> same semantic claims
-> same ownership tree
-> same summaries and cache
-> 2D material fields or 3D SDF packets
```

Different beasts. Same bones.

## Why I Built It This Way

Because the alternative is a renderer full of clever one-off hacks, and I have
seen that basement. It smells like stale trigonometry and shame.

This system keeps the important things separate:

- domains say where things live;
- grammars say what detail exists;
- ownership trees say how claims combine;
- summaries say what can be safely hidden;
- contribution caches say what is worth updating;
- backends say how to render it cheaply;
- tests prove the seams are real.

That is the magic.

Not infinite detail. Infinite detail is easy to promise and expensive to
survive.

The magic is knowing where the detail lives, what it means, what it costs, when
it is allowed to appear, and how to make the whole machine answer those
questions without waking every branch of the fractal tree.

It is a mapped fractal field system with conservative bones, probabilistic
nerves, and a renderer that only eats what it can digest.

Which, honestly, is more restraint than most humans bring to dinner.

## References

[^1]: Frank Losasso and Hugues Hoppe, ["Geometry Clipmaps: Terrain Rendering Using Nested Regular Grids"](https://hhoppe.com/geomclipmap.pdf), SIGGRAPH 2004.
[^2]: Arul Asirvatham and Hugues Hoppe, ["Terrain Rendering Using GPU-Based Geometry Clipmaps"](https://hhoppe.com/gpugcm.pdf), GPU Gems 2, 2005.
[^3]: Michael F. Barnsley, *Fractals Everywhere*, Academic Press, 1988; John E. Hutchinson, ["Fractals and Self Similarity"](https://doi.org/10.2307/1998215), Indiana University Mathematics Journal, 1981.
[^4]: John C. Hart, ["Sphere Tracing: A Geometric Method for the Antialiased Ray Tracing of Implicit Surfaces"](https://experts.illinois.edu/en/publications/sphere-tracing-a-geometric-method-for-the-antialiased-ray-tracing/), The Visual Computer, 1996.
[^5]: PROJ contributors, ["Quadrilateralized Spherical Cube"](https://proj.org/en/stable/operations/projections/qsc.html), PROJ documentation.
[^6]: Petr Clarberg, ["Cube-to-Sphere Projections for Procedural Texturing and Beyond"](https://jcgt.org/published/0007/02/01/paper.pdf), Journal of Computer Graphics Techniques, 2018.
[^7]: L. R. Bishop, ["There is More Than One Way to Frame a Curve"](https://doi.org/10.2307/2319846), The American Mathematical Monthly, 1975.
[^8]: GameCult, [VibeGeometry](https://github.com/GameCult/VibeGeometry), local procedural geometry research and implementation repo.
[^9]: GameCult, [vg-csg](https://github.com/GameCult/vg-csg), CSG tree and brush assembly research crate.
[^10]: Sander van Rossen, ["Realtime CSG - Part 1"](https://sandervanrossen.blogspot.com/2009/12/realtime-csg-part-1.html), 2009.
[^11]: Brian Karis, Rune Stubbe, Graham Wihlidal, et al., ["A Deep Dive into Nanite Virtualized Geometry"](https://advances.realtimerendering.com/s2021/Karis_Nanite_SIGGRAPH_Advances_2021_final.pdf), Advances in Real-Time Rendering, SIGGRAPH 2021.
[^12]: Matthias Zwicker, Hanspeter Pfister, Jeroen van Baar, and Markus Gross, ["EWA Volume Splatting"](https://vcg.seas.harvard.edu/publications/20011001-ewa-volume-splatting), IEEE Visualization, 2001.
[^13]: Bernhard Kerbl, Georgios Kopanas, Thomas Leimkuehler, and George Drettakis, ["3D Gaussian Splatting for Real-Time Radiance Field Rendering"](https://arxiv.org/abs/2308.04079), ACM Transactions on Graphics, 2023.
[^14]: Peter Auer, Nicolo Cesa-Bianchi, and Paul Fischer, ["Finite-time Analysis of the Multiarmed Bandit Problem"](https://link.springer.com/article/10.1023/A:1013689704352), Machine Learning, 2002.
[^15]: Steven C. H. Hoi, Doyen Sahoo, Jing Lu, and Peilin Zhao, ["Online Learning: A Comprehensive Survey"](https://arxiv.org/abs/1802.02871), 2018.
[^16]: Kerui Ren, Lihan Jiang, Tao Lu, et al., ["Octree-GS: Towards Consistent Real-time Rendering with LOD-Structured 3D Gaussians"](https://arxiv.org/abs/2403.17898), 2024.
[^17]: Gerard Meszaros, *xUnit Test Patterns: Refactoring Test Code*, Addison-Wesley, 2007.
[^18]: Martin Fowler, ["Mocks Aren't Stubs"](https://martinfowler.com/articles/mocksArentStubs.html), 2007.
