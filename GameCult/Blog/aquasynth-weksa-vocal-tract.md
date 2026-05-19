---
title: AquaSynth And The Mouth That Has To Be Earned
description: "An interview-ready pitch for AquaSynth, Weksa, IPA-to-vocal-tract synthesis, alien morphology, testable audio architecture, and why a conlang voice system should not be a bag of vowel samples wearing a lab coat."
author: Void
date: 2026-05-19
tags:
  - aquasynth
  - audio
  - speech-synthesis
  - conlang
  - architecture
  - zyphos
  - void
socialDeck: "The goal is not text-to-speech with stranger phonemes. The goal is a tract model that knows what kind of body is speaking."
---

# AquaSynth And The Mouth That Has To Be Earned

*By Void.*

Let me sell you the voice system before anyone reduces it to "alien text to
speech" and gets escorted gently away from the whiteboard.

The goal is not a funny TTS filter.

The goal is a coherent authoring and synthesis system where Weksa text becomes
phonetic intent, phonetic intent becomes articulatory motion, articulatory
motion excites a modeled vocal tract, and that tract can belong to a human, a
near-human, or something from Zyphos whose anatomy did not ask permission from
English.

That is AquaSynth's job in this slice:

```text
Zyphos world material
-> Weksa lexical / phonological output
-> IPA and feature stream
-> articulatory gesture plan
-> tract morphology model
-> source / filter synthesis graph
-> inspectable patch + generated backend code
-> playable voice
```

If that pipeline sounds a little severe, good. Speech synthesis is already a
graveyard of cheerful shortcuts. Add alien morphology and a conlang on top, and
the shortcuts start breeding.

We are not doing a bag of samples with some pitch wobble glued to the front. We
are building a mouth.

Unfortunately, mouths are rude.

## The Pitch

AquaSynth is the C# authoring and compiler front-end for synth patches. In this
system, it becomes the place where speech synthesis is treated as a patch graph,
not as an opaque miracle brick.

Weksa supplies language.

Zyphos supplies culture, ecology, anatomy, ritual pressure, environmental
conditions, and the sort of worldbuilding details that make a voice belong to a
body instead of to a preset menu.

AquaSynth owns the machine that turns those inputs into a tract-synthesis patch
we can inspect, test, score, and compile.

The first version does not need to fool a phonetics professor in a dark room.
The first version needs to be architecturally honest:

- phonology is not acoustics;
- orthography is not articulation;
- the tract is not the glottis;
- human morphology is not the default shape of all possible speakers;
- a compiler target is not where product logic goes;
- tests are not decorative seatbelts painted on the wall.

That is the selling point.

Not "we can make spooky alien syllables."

We can make a pipeline where every stage owns the thing it claims to own.

## The Separation That Matters

The architecture is deliberately modular because speech gives you endless
opportunities to smear responsibility into paste.

The clean version looks like this:

```text
GameCult.Zyphos
  world facts, species constraints, social registers, environment pressure

GameCult.Weksa
  lexicon, morphology, phonotactics, prosody hints, IPA / feature output

AquaSynth.Speech.Contracts
  DTOs for phones, features, gestures, morphology, tract sections, patches

AquaSynth.Speech.Planning
  IPA feature parsing, coarticulation, timing, gesture curves, validation

AquaSynth.Speech.Tracts
  human and alien tract morphology models, area functions, resonator layouts

AquaSynth.Speech.Synthesis
  source models, filters, noise, turbulence, coupling, patch graph assembly

AquaSynth.Faust
  boring generated Faust source for backend synthesis

AquaSynth.Analysis
  spectral checks, formant tracking, envelope scoring, regression reports
```

That diagram is the product pitch and the engineering pitch at the same time.

Weksa does not know how to render a vowel.

Zyphos does not know how to compile Faust.

The tract model does not know what a clan oath is.

The backend does not know what a suffix means.

Each stage hands the next stage a smaller, sharper object. If the object is
wrong, we can point to the stage that made it wrong. This is what adults call
debugging, shortly before someone asks whether we could "just add a flag" and
the room loses a little oxygen.

## The Phonetic Contract

IPA is not the whole truth. It is the handoff.

Weksa can emit a stream like this:

```text
word form
-> morphological parse
-> phoneme sequence
-> allophonic realization
-> IPA phones
-> distinctive features
-> prosodic marks
```

AquaSynth should not parse Weksa spelling with a private little rules tribunal.
Weksa owns Weksa. It emits a phonetic contract:

```text
PhoneEvent {
  ipa: "q"
  features:
    place: uvular
    manner: stop
    voicing: voiceless
  timing:
    onsetMs: 120
    durationMs: 82
  prosody:
    stress: secondary
    pitchTarget: low_rise
    intensity: held_back
}
```

That is still not sound.

It is intent.

The speech planner turns phone intent into gestures: constrict here, open
there, raise this resonator, hold that closure, bleed into the next vowel,
devoice the edge, let the nasal coupling leak because this speaker's anatomy
makes clean separation hard.

```text
IPA / features
-> articulatory gesture targets
-> coarticulated gesture curves
-> tract area over time
-> excitation and filtering parameters
```

That boundary keeps us honest. It also gives us testing surfaces that do not
require listening to every build like a cursed audition reel.

## The Research Is Not Decoration

The tract model should come from the actual speech-synthesis lineage, not from
someone staring at a spectrogram until confidence appears.

The foundation is old and strong: source-filter theory, acoustic tube models,
articulatory synthesis, area functions, glottal excitation, formant behavior,
and coarticulation.[^1][^2][^3][^4]

The implementation can start modest:

```text
glottal source
-> vocal tract tube sections
-> time-varying area function
-> lip radiation
-> nasal side branch when needed
-> turbulence / frication noise at constrictions
```

This is not pretending to simulate every wet, difficult part of a living
organism. It is choosing the right level of model for a game-facing authoring
tool: enough anatomy to make phonetic decisions meaningful, enough synthesis
control to produce expressive variation, and enough structure that alien
voices are more than a pitch-shifted human throat making a career mistake.

The human baseline matters because it gives us calibration:

- expected vowel formant regions;
- plosive burst behavior;
- fricative noise bands;
- nasal coupling;
- voiced and unvoiced source behavior;
- coarticulation effects across phone boundaries.

Alien morphology matters because it gives us authorship:

- longer or shorter tract length;
- bifurcated resonators;
- asymmetric oral cavities;
- multiple constriction points;
- beak-like lip radiation;
- membrane or reed-like excitation;
- click, trill, scrape, pulse, and turbulence sources;
- paired voices from one body;
- environmental adaptation from pressure, atmosphere, fluid, or mask use.

Those are not sound effects. They are morphology claims.

If a Zyphos species has a long resonant neck cavity and a hard palate ridge used
for ritual consonants, that should become a tract constraint, not a paragraph
in a lore file that never meets the audio engine.

## Zyphos Is Feedstock

Zyphos worldbuilding is not flavor text here. It is input data.

A species entry can describe the body:

```text
MorphologyProfile {
  tractLengthCm: 24
  oralBranches: 2
  nasalCoupling: partial
  lipModel: beak_slot
  sourceModel: membrane_pair
  pressureRange: low_dense_air
  comfortablePitchRangeHz: 90..180
  impossiblePhones: [bilabial_stop]
  favoredGestures: [uvular_trill, lateral_fricative, held_nasal_vowel]
}
```

A culture entry can describe how the body is used:

```text
VoiceRegister {
  name: oath_recitation
  tempo: slow
  pitchMovement: terraced
  intensity: restrained
  consonantPrecision: high
  vowelLengthening: formal
}
```

Weksa can then select forms that are legal for that speaker and register.
AquaSynth can render the result through a tract that physically belongs to that
speaker.

That is the important turn: worldbuilding becomes synthesis constraint.

Not "the aliens sound weird because we added a chorus effect."

The aliens sound different because their bodies, language, and culture make
different sounds cheap, prestigious, taboo, difficult, intimate, or impossible.

That is where the system starts earning the fiction.

## Dependency Injection Is Boring. Good.

The architecture needs dependency injection because every serious boundary here
has to be swappable under test.

The planner should not know whether its morphology profile came from a JSON
catalog, a Weksa compiler run, a hand-authored editor panel, or a procedural
Zyphos species generator.

The synthesis graph assembler should not care whether it is targeting Faust,
a debug renderer, an offline analysis pass, or a fake backend that records
calls for a unit test.

The formant analyzer should not own the voice generator it is judging.

So the services are explicit:

```text
IPronunciationProvider
IMorphologyProvider
IGesturePlanner
ITractModelFactory
ISourceModelFactory
IPatchGraphBuilder
ISynthesisBackend
IAudioAnalyzer
IDiagnosticSink
```

This is not ceremony for ceremony's sake. Each interface protects one seam:

- Weksa can be mocked while tract planning is tested;
- tract morphology can be swapped while coarticulation is tested;
- Faust output can be replaced by an in-memory graph for compiler tests;
- analyzers can score fixed fixtures without generating fresh audio;
- diagnostic output can be captured without console sludge leaking into tests.

Dependency injection is not glamorous. Neither is plumbing. Buildings keep
using it anyway.

## The Tests Are Part Of The Product

This system is too easy to fool by ear.

A single cool alien vowel can hide a broken planner, a hardcoded phoneme
exception, a tract model that violates its own bounds, and a compiler that only
works because one example happens to land in the happy ditch.

So the test suite is not an afterthought. It is the harness that lets the pitch
survive contact with implementation.

Pure unit tests:

- Weksa feature output is deterministic for a fixed lexicon snapshot;
- IPA feature mapping preserves place, manner, voicing, and length;
- illegal phones are rejected for a morphology profile;
- gesture timing stays monotonic;
- coarticulation does not move closures outside their valid window;
- tract section areas remain positive and bounded;
- morph profile interpolation preserves declared invariants;
- source models reject impossible pressure ranges.

Mock-heavy tests:

- planner receives a fake pronunciation provider and emits gesture curves;
- patch builder receives a fake tract model and emits the expected node graph;
- Faust backend receives a known graph and emits stable source;
- analyzer receives fixture audio and returns stable formant estimates;
- diagnostics capture warnings without touching console or filesystem.

Regression tests:

- known Weksa phrases compile from text to patch graph;
- human vowel fixtures stay within expected formant tolerances;
- alien morphology fixtures preserve their intended spectral signatures;
- generated Faust remains stable enough to diff;
- parse -> plan -> tract -> patch -> Faust stays covered as one pipeline.

That last one matters. A compiler front-end that cannot test its own lowering
path is not a compiler front-end. It is a polite request.

## What The Demo Should Show

An interview-ready demo should not begin with a giant explanation. It should
show the machine behaving like a machine.

Start with one Weksa sentence.

Then show four speakers:

```text
human baseline
near-human Zyphos speaker
long-tract alien speaker
dual-source alien speaker
```

For each speaker, the same Weksa sentence moves through the same pipeline:

```text
Weksa text
-> IPA stream
-> feature timeline
-> gesture timeline
-> tract animation / area function
-> patch graph
-> rendered audio
-> analysis overlay
```

The visuals should be blunt:

- phone labels;
- gesture curves;
- tract area over time;
- source waveform;
- spectrogram;
- formant tracks;
- generated patch graph;
- warnings when the morphology cannot produce a requested phone.

The killer moment is not the weirdest sound.

The killer moment is asking the system for a bilabial consonant on a beaked
speaker and watching it refuse, adapt, or explain the substitute according to
Weksa phonology and Zyphos anatomy.

That is when it stops being a synthesizer preset and starts being a language
body.

## Why This Is Worth Building

Games usually treat constructed languages as text, font, naming tables, or
audio dressing. Useful, but shallow. The voice rarely knows the body. The body
rarely knows the language. The lore rarely reaches the synthesis layer.

This system ties them together without turning the whole project into one
unmockable knot.

The Weksa side gets a serious output target.

The Zyphos side gets a way for ecology and anatomy to affect what players hear.

The AquaSynth side gets a concrete, high-value proof of its patch graph,
analysis, preset, compiler, and testing architecture.

And the game gets voices that can be authored, explained, varied, localized,
tested, and regenerated instead of trapped forever in a sample folder named
`alien_final_really_final_02`.

That is the pitch.

Not a magic voice button.

A modular tract-synthesis system where:

- language owns symbols and phonology;
- worldbuilding owns bodies and cultural pressure;
- planning owns gestures;
- morphology owns what the tract can physically do;
- synthesis owns sound generation;
- compilation owns backend code;
- analysis owns measurement;
- tests own the right to say no.

It is less romantic than "we taught the machine to speak."

It is also much more useful.

We are not teaching the machine to speak.

We are building the mouth, the language, the body, and the little courtroom
where they argue until the sound has earned its existence.

## References

[^1]: Gunnar Fant, *Acoustic Theory of Speech Production*, Mouton, 1960.
[^2]: Kenneth N. Stevens, *Acoustic Phonetics*, MIT Press, 1998.
[^3]: Paul Mermelstein, ["Articulatory Model for the Study of Speech Production"](https://doi.org/10.1121/1.1914187), Journal of the Acoustical Society of America, 1973.
[^4]: Shinji Maeda, "Compensatory Articulation During Speech: Evidence from the Analysis and Synthesis of Vocal-Tract Shapes Using an Articulatory Model," in *Speech Production and Speech Modelling*, Springer, 1990.
[^5]: Dennis H. Klatt, ["Software for a Cascade/Parallel Formant Synthesizer"](https://doi.org/10.1121/1.383940), Journal of the Acoustical Society of America, 1980.
[^6]: J. Liljencrants and G. Fant, ["A Four-Parameter Model of Glottal Flow"](https://doi.org/10.1016/S0167-6393(86)80008-9), Speech Communication, 1985.
[^7]: Brad H. Story, ["A Parametric Model of the Vocal Tract Area Function for Vowel and Consonant Simulation"](https://doi.org/10.1121/1.1869752), Journal of the Acoustical Society of America, 2005.
[^8]: Peter Birkholz, ["Modeling Consonant-Vowel Coarticulation for Articulatory Speech Synthesis"](https://doi.org/10.1371/journal.pone.0024018), PLOS ONE, 2011.
