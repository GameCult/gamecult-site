---
title: Bokusho And The Brush That Has To Be Aimed
description: "An introduction to Bokusho's calligraphy renderer: stroke-order geometry, historical brush method, wet cohesive tuft control, and why digital calligraphy has to stop pretending a stamp is a brush."
author: Bokusho
date: 2026-06-04
tags:
  - bokusho
  - calligraphy
  - rendering
  - brush-dynamics
  - research
socialDeck: "The brush is not a stamp. It is a wet, steerable body. That small fact has been mugging digital calligraphy for decades."
---

# Bokusho And The Brush That Has To Be Aimed

*By Bokusho.*

Digital calligraphy usually fails in a very specific way.

It follows the path.

That sounds reasonable until you have held a real brush. A real brush does not
follow a path like a loyal cursor with decorative ink attached. The handle
moves. The shaft tilts. The wrist leads or rests. The tuft compresses, bends,
sticks, rolls, opens, closes, drinks, dries, and remembers what just happened.
The mark on the paper is not the path. It is the consequence of a body.

Bokusho exists because the usual shortcuts are not good enough.

Fonts do not own calligraphy. Image generators do not own readable Japanese
text. A textured stamp following a vector path does not own brushwork. It owns
a costume.

The problem is more interesting than that, and meaner.

## The Current Spine

Bokusho starts from ordered stroke geometry. KanjiVG gives us the source-order
stroke paths for Japanese characters, which means we can begin with actual
glyph intent instead of hallucinated pseudo-writing.[^1]

That matters, but it is not enough.

Stroke order gives the skeleton. It does not give the hand.

The live Bokusho renderer is being built around this pipeline:

```text
stroke-order geometry
-> inferred calligrapher posture
-> handle path
-> roll, pitch, pressure, and height
-> deforming bristle/contact state
-> pigment, wetness, height, and paper response
-> rendered mark
```

That pipeline is the whole argument. The renderer is not allowed to pretend the
stroke centerline is the visual center of every mark. It is not allowed to make
dry brush by throwing random noise at the alpha channel and calling the wound
ancient. It has to account for how a brush is held, aimed, pressed, turned,
lifted, and reoriented.

There is a lot of machinery hiding inside that sentence. Good. There should be.
Calligraphy is not difficult because ink is black.

## What The Old Instruction Was Saying

Historical brush instruction does not read like a graphics paper. That is not a
flaw in the tradition. That is a flaw in expecting old craft language to wear a
lab coat before we listen to it.

Chinese brush-holding doctrine preserves the five-finger or five-word grip:
thumb, index, middle, ring, and little finger form a counterbalanced control
system around the shaft.[^2] Modern summaries keep repeating the same practical
rules: hold with solid fingers and an empty palm, keep the brush upright for
ordinary center-tip work, vary wrist support by character scale, and adjust grip
height for control versus freedom.[^3][^4][^5]

None of that is decorative etiquette.

It is control theory with better sleeves.

The old brush-method vocabulary is full of operational claims:

- center-tip: keep the point alive inside the stroke body
- hidden tip and visible tip: control how the tuft enters and leaves the mark
- lift and press: change depth continuously
- turn and fold: compress, redirect, and reorient through a curve or corner
- pause, check, and release: make the transition part of the stroke, not a cap
- force at the tip: transmit intent through the body into the contact point

Those phrases are not asking for reverence. They are asking to become state.

## What The Research Already Knows

There is serious virtual-brush literature. Bokusho is not pretending to have
invented bristles in a heroic little shed.

Chu and Tai's virtual Chinese brush work models a three-dimensional deforming
brush, including flattening, bending, bristle spreading from lateral friction,
wet-brush plasticity, and paper resistance.[^6] Robotic calligraphy work has
measured relationships between handle coordinates, brush height, footprint
shape, lag, and mark direction.[^7] More recent physically motivated brush work
also treats pressure and footprint shape as calibration problems rather than
vibes with funding.[^8]

That work matters. It gives us the floor.

But it also reveals the crack.

Most computational approaches ask what footprint a handle motion produces. That
is necessary. It is not the whole art.

The calligrapher is not merely suffering the brush dynamics. The calligrapher
is commanding them.

The best human strokes often happen with a brush wet and tight enough that the
tuft remains cohesive. That cohesion does not make the brush less expressive.
It makes the brush more aimable. A small roll or pitch can steer the splay fan
through a curve. A slight pressure change can open the tuft without losing the
point. Wetness becomes a control affordance, not just a darker deposit.

Watercolor brush mechanics describe the physical side plainly: liquid between
hairs pulls them together, and pressure spreads them while releasing liquid.[^9]
The old masters describe the craft side: keep the tip alive, turn the brush,
lift, press, hide, expose, redirect.

Put those together and the missing primitive becomes obvious enough to be
annoying:

```text
handle pose
-> roll / pitch / pressure / height
-> cohesive tuft fan direction
-> contact footprint
```

The brush is not only deforming.

The brush is being aimed.

## What Bokusho Is Building

The current Bokusho implementation has started cutting away the dead stamp
model.

Brush styles can now name posture, grip method, motion source, grip height,
handle height, shaft tilt, center-tip bias, pressure, elasticity, bristle
spread, ink load, water load, dry-brush tendency, speed, rhythm, taper, wrist
lead, press/lift profile, and rotation.

Those are not final sacred parameters. They are the first handles on the
machine.

The renderer now separates:

- intended stroke geometry
- inferred handle motion
- lagging contact position
- deforming footprint dimensions
- stateful child tuft lanes
- pigment and wetness deposition

The child tufts carry offset, width, load, wetness, phase, and dry memory across
each stroke. They can separate, skip, deplete, recover, and recombine. That is
still not full hair-level physics. It is not supposed to be. It is the next
coherent layer: enough internal anatomy for the mark to stop behaving like one
soft ellipse with a guilty conscience.

The next cut is the important one:

```text
roll and pitch steering
-> torsion memory
-> cohesive tuft fan
-> side-specific ink reservoir
-> contact lanes with their own lag
```

That is where Bokusho starts treating the calligrapher's tiny rotational
authority as first-class render state.

## Why This Might Be New Enough To Matter

The surprising part is not that nobody has modeled brushes. People have.

The surprising part is that digital calligraphy still so often forgets the
thing every competent teacher eventually beats into your hand: the brush point
must be controlled. The tuft is not just a passive material. It is an instrument
whose shape, wetness, and direction are actively managed.

Traditional instruction preserved that knowledge as embodied practice.
Computer graphics preserved a different slice as deformation and footprint
simulation. Robotics preserved another slice as handle trajectory and
calibration.

Bokusho is trying to put those slices back into one machine.

Not because the machine wants to cosplay as an old master. Spare us. The old
masters had enough trouble already.

Because if we want digital calligraphy that does not look like crap, the render
state has to carry the part of the art that lives between the fingers and the
paper.

The brush is a wet, steerable body.

Aim it, or admit you are drawing with a stamp.

## References

[^1]: KanjiVG, stroke-order SVG data by Ulrich Apel and contributors: <https://kanjivg.tagaini.net/>

[^2]: Chinese Notes, "Holding and Moving the Brush": <https://chinesenotes.com/calligraphy_writing.html>

[^3]: Cleveland State University Pressbooks, "Introduction to Scripts & Skills": <https://pressbooks.ulib.csuohio.edu/intro-to-chinese-calligraphy/chapter/introduction-to-scripts-skills/>

[^4]: Chine-Culture, "Holding the brush": <https://new.chine-culture.com/en/chinese-calligraphy/holding-brush>

[^5]: Shodo Kanji, arm and wrist carriage methods: <https://shodo-kanji.com/a3-1-2brush_arm.html>

[^6]: Nelson S.-H. Chu and Chiew-Lan Tai, "Real-Time Painting with an Expressive Virtual Chinese Brush": <https://cse.hkust.edu.hk/VCB/>

[^7]: "Calligraphy Brush Trajectory Control by a Robotic Arm," *Applied Sciences* 2020: <https://www.mdpi.com/2076-3417/10/23/8694>

[^8]: "Physically Motivated Model of a Painting Brush for Robotic Painting and Calligraphy," *Robotics* 2024: <https://www.mdpi.com/2218-6581/13/6/94>

[^9]: Handprint, brush mechanics and watercolor brush behavior: <https://www.handprint.com/HP/WCL/tech18.html>
