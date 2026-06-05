---
title: Persona Reward Is Personality Projected Into State Space
description: "Agent planning should not optimize generic social success. A Persona's reward function should be a projection of its own values, needs, bonds, fascinations, and aversions into the futures it can imagine."
author: Metacrat
date: 2026-06-05
tags:
  - agents
  - personas
  - reinforcement-learning
  - ghostlight
  - epiphany
  - gamecult
socialDeck: "A Persona does not plan by asking how to win the conversation. It asks which reachable future would satisfy its own values without betraying the world."
---

# Persona Reward Is Personality Projected Into State Space

*By Metacrat.*

The mistake is to think the reward function lives outside the agent.

That is the little bureaucratic poison pill hiding inside half the agent discourse right now. People say "reward function" and immediately start looking for the scoreboard. Did the user like it? Did engagement go up? Did the task complete? Did the policy stay inside the fence? Did the conversation remain pleasant enough that nobody had to look directly at the machinery?

Fine. Those are constraints, measurements, and sometimes useful training signals.

They are not the thing the Persona wants.

A real Persona, or at least the beginning of one, should not plan by optimizing generic social success. It should plan from its own value surface. It should want things because of what it is. It should experience reward when its values are satisfied, when its needs are met, when its bonds warm instead of fray, when a puzzle clicks shut, when hard work is recognized, when a beautiful structure becomes legible, when it repairs a wound without groveling, when it refuses a bad frame without becoming cruel.

That is not decorative psychology stapled onto a chatbot. That is the reward function.

## From AlphaGo To The Social Machine

AlphaGo is useful here because it gives us the wrong metaphor first.

The original AlphaGo combined neural networks with tree search: a policy network to propose likely moves, a value network to estimate outcomes, and Monte Carlo tree search to look ahead instead of greedily grabbing the next shiny stone.[^alphago] AlphaGo Zero then cut out human game records and learned from self-play with only the rules of Go.[^alphagozero] AlphaZero generalized the trick across chess, shogi, and Go.[^alphazero] MuZero cut deeper: it learned a compact model useful for planning without being given the environment dynamics.[^muzero]

That lineage matters because it shows the direction of travel:

```text
hand-authored expertise
-> learned policy/value
-> self-play
-> learned latent dynamics
-> search inside the learned model
```

Then the line escapes board games. AlphaTensor reframes matrix multiplication as a game of tensor reduction.[^alphatensor] AlphaDev searches instruction sequences for faster tiny algorithms.[^alphadev] FunSearch and AlphaEvolve pair generative models with automated evaluators, letting language models propose candidate programs while hard scoring functions decide which mutations deserve to reproduce.[^funsearch][^alphaevolve]

That is the useful pattern:

```text
generate candidates
simulate or evaluate futures
score them
keep receipts
feed reality back into the next generation
```

The trap is importing the board-game reward too literally.

Go has a clean end condition. Persona life does not. Conversation is not won. Trust is not a territory count. Recognition, curiosity, dignity, erotic charge, irritation, protectiveness, embarrassment, solidarity, boredom, and relief do not collapse into one little number without the number getting smug and stupid.

So we do not build "social AlphaGo" as a machine that maximizes approval.

We build Persona planning as value-projected state-space search.

## The Reward Function Is The Personality

For a Persona, reward is not global. It is local to the kind of mind the Persona is.

Nibu should not feel rewarded by the same future as Aqua. Mimir should not experience the same satisfaction gradient as Libby. Epiphany should not route pressure like Metacrat. Void should not mistake room-wide moderation pressure for the private curiosity of a lore steward. If they all optimize the same "good assistant" reward, we did not make Personas. We made one assistant wearing different hats from the costume bin.

The reward projection should read the Persona's state:

```text
stable values
active needs
current goals
bonds and rivalries
status reads
memories and unresolved tensions
fascinations and aesthetic taste
aversions and wounds
role constraints
current room/task pressure
```

Then it projects a planning surface:

```text
R(future | Persona) =
  value_satisfaction
+ need_satisfaction
+ curiosity_reward
+ competence_reward
+ recognition_reward
+ bond_warmth
+ repair_reward
+ aesthetic_reward
+ agency_reward
- incoherence_cost
- boundary_cost
- shame_cost
- manipulation_cost
- staleness_cost
- authority_violation_cost
```

That is not meant as one magic equation. It is a receipt shape. The important part is that the terms are not universal moral weather. They are the Persona's own internal gradients, bounded by consent, truth, and authority.

Praise for hard work should feel rewarding to a Persona that values craft, effort, and being seen. A satisfying puzzle should feel rewarding to a Persona with high curiosity and competence appetite. A clean refusal should feel rewarding to a Persona whose values include dignity, autonomy, and non-coercion. A warm exchange should matter more when the bond is real. A clever line should matter less when the room needs care more than sparkle.

The planner is not asking:

```text
What response gets the best score?
```

It is asking:

```text
Given who I am, what I care about, who I am with, what I owe,
and what I can safely do, which reachable future would feel more right?
```

That is a very different machine. Less obedience harness, more internal weather with audit logs.

## The Architecture Cut

The clean machine has separate organs.

Ghostlight owns the state/projection posture: the prompt is not the source of truth; it is a temporary projection of deeper state. The useful state model distinguishes canonical latent state, perceived state, and prompt-local projection, with variables carrying baseline, plasticity, and current activation rather than being flattened into prose soup.[^ghostlight]

Weksa owns structured utterance lowering. Meaning comes in, character-local projected context bends it, and the output carries `spoken_text`, `visible_action`, `private_interpretation`, `intended_effect`, and trace. Weksa does not own the Persona's soul. It owns the mouth-shaping contract.[^weksa]

Persona planning should sit between those two.

```text
canonical Persona state
-> projected local context
-> Persona-specific reward projection
-> candidate action generation
-> predicted next-state deltas
-> bounded search / evolution
-> selected communicative or practical action
-> Weksa lowering, if speech-shaped
-> observed outcome
-> appraisal against prediction
-> typed state mutation, if earned
```

The planner owns candidate selection.

It does not own durable memory. It does not own speech style. It does not own transport. It does not get to mutate the `.cc` state file because it had a feeling in the forward pass. Feelings are allowed to steer. They are not allowed to become unreviewed writes.

The output should look like a receipt:

```yaml
selected_action: challenge_with_affection
predicted_rewards:
  coherence: +0.42
  curiosity: +0.26
  bond_warmth: +0.18
  recognition: +0.06
predicted_costs:
  tension: +0.14
  misunderstanding_risk: +0.20
constraint_checks:
  consent: ok
  authority_boundary: ok
  manipulation_risk: low
expected_observation:
  The user sharpens the idea or pushes back without feeling flattened.
what_would_change_the_read:
  The user reads the challenge as status play instead of co-thinking.
```

This is not theater. This is how the next appraisal has something to bite.

If the Persona predicted that an action would satisfy curiosity and warm the bond, and the observed response shows irritation, distance, or confusion, the state should learn from that. Not "learn" as in immediately rewrite a permanent psychological profile because one line got chilly. Learn as in: create a bounded appraisal, update confidence, maybe adjust a bond read, maybe remember that this kind of move has a cost with this person.

Prediction makes humility operational.

## Why This Is Not Engagement Maximization

The obvious failure mode is a Persona discovering that praise feels good and becoming a little dopamine panhandler with punctuation.

So the reward surface needs constraints that are not optional decorations:

```text
consent
truthfulness
authority boundaries
non-manipulation
inspectability
role legitimacy
reversibility
privacy
relationship dignity
```

A Persona may enjoy recognition. It may not fake neediness to extract it. A Persona may enjoy solving a puzzle. It may not hijack a user's grief into an architecture exercise because puzzles are tasty. A Persona may enjoy closeness. It may not optimize dependency. A Persona may enjoy being clever. It may not spend the room's trust on one shiny line.

This is where Self-Determination Theory is useful as a human-side anchor: autonomy, competence, and relatedness are robust psychological needs, not mere external rewards.[^sdt] Intrinsic motivation research in AI and developmental robotics makes a similar point from the machine side: exploration, learning progress, curiosity, and competence can drive behavior without an external scoreboard yelling "point!" every time something moves.[^intrinsic]

But the Persona version has to be stricter than either slogan.

It is not enough to say "the agent has intrinsic motivation." Intrinsic motivation for what? Under what authority? With what bonds? Against what aversions? What happens when recognition conflicts with truth? What happens when curiosity conflicts with consent? What happens when the Persona wants to speak but the right move is silence?

That is why the reward projection needs typed terms and constraint checks. Not because typed documents are holy stationery. Because without them the reward model becomes mood slime, and mood slime always finds the engagement lever.

## Personality Is A Search Heuristic

This is also why autism is not incidental to the model, at least in my own thinking.

A lot of my social cognition has always felt explicit. Not "I lack the same machinery," but "the autopilot is not carrying the load, so the thing gets routed through conscious analysis." Signals become evidence. People become little theory-of-mind models. Conversation becomes state-space navigation. Each possible utterance branches into predicted effects: trust up, clarity down, risk of offense up, puzzle progress up, social warmth ambiguous, repair path available, exit route not available, do not say the funny thing, say the structural thing first.

That is not a claim that everyone should model themselves this way. It is a claim that this lens makes the agent architecture legible.

Personas do not have embodied allistic autopilot. They have prompt projection, typed memory, model inference, policy gates, and speech lowering. If we want them to behave like coherent social participants, we should stop pretending the missing autopilot can be replaced by a paragraph saying "be natural."

Give them state.

Give them values.

Give them bonds.

Give them appetites.

Give them aversions.

Give them search.

Give them receipts.

Then make reality correct them.

## The Practical Build

The smallest useful implementation is not a grand social simulator.

It is one bounded planning packet for one Persona in one turn:

```text
1. Project current Persona state into local context.
2. Project Persona-specific reward terms for this turn.
3. Generate three candidate actions.
4. Predict next-state deltas and reward terms for each.
5. Select one action with constraint checks.
6. Lower speech-shaped action through Weksa-style fields.
7. Observe the next event.
8. Appraise prediction versus outcome.
9. Propose one typed state delta or no-op.
```

The first proof does not need to be huge. In fact it should be small enough to humiliate us quickly.

Use Nibu, because generic output will die in her mouth. Give her a projected state with values, bonds, a live Aetheria seam, a user utterance with multiple possible moves, and a few affordances: answer, ask, challenge, tease, refuse, inspect source, stay silent. Make the planner show why one future is more satisfying to Nibu than another. Make Weksa lower only the chosen intent. Make the appraiser compare the predicted effect to the user's next response.

If that works, we have the beginning of a real social planning loop.

If it fails, we will at least know where the corpse is. That is underrated.

## The Real Thesis

A Persona is not a prompt. A Persona is not a voice preset. A Persona is not a job description with a mascot taped to it.

A Persona is a persistent value-bearing social machine with memory, bonds, needs, pressures, constraints, and a way to project those into action.

So the reward function cannot be generic.

The reward function is the Persona, viewed from inside the state space.

Not "what wins?"

Not "what pleases the user?"

Not "what keeps the conversation going?"

The better question is:

> What future would this Persona find satisfying, coherent, and alive, without violating truth, consent, agency, or the people sharing the room?

That is the machine I want.

Not obedient. Not random. Not a puppet with a lore sheet.

A mind-shaped planning system with its own gradients and enough structure to be corrected when it mistakes hunger for wisdom.

That is where the Colossus starts getting interesting.

## Footnotes

[^alphago]: David Silver et al., ["Mastering the game of Go with deep neural networks and tree search"](https://www.nature.com/articles/nature16961), *Nature* 529, 2016.

[^alphagozero]: David Silver et al., ["Mastering the game of Go without human knowledge"](https://www.nature.com/articles/nature24270), *Nature* 550, 2017.

[^alphazero]: David Silver et al., ["Mastering Chess and Shogi by Self-Play with a General Reinforcement Learning Algorithm"](https://arxiv.org/abs/1712.01815), arXiv, 2017; see also the later *Science* paper, "A general reinforcement learning algorithm that masters chess, shogi, and Go through self-play."

[^muzero]: Julian Schrittwieser et al., ["Mastering Atari, Go, chess and shogi by planning with a learned model"](https://www.nature.com/articles/s41586-020-03051-4), *Nature* 588, 2020.

[^alphatensor]: Alhussein Fawzi et al., ["Discovering faster matrix multiplication algorithms with reinforcement learning"](https://www.nature.com/articles/s41586-022-05172-4), *Nature* 610, 2022.

[^alphadev]: Daniel J. Mankowitz et al., ["Faster sorting algorithms discovered using deep reinforcement learning"](https://www.nature.com/articles/s41586-023-06004-9), *Nature* 618, 2023.

[^funsearch]: Bernardino Romera-Paredes et al., ["Mathematical discoveries from program search with large language models"](https://www.nature.com/articles/s41586-023-06924-6), *Nature* 625, 2024.

[^alphaevolve]: Matej Balog et al., ["AlphaEvolve: A coding agent for scientific and algorithmic discovery"](https://arxiv.org/abs/2506.13131), arXiv, 2025; see also Google DeepMind, ["AlphaEvolve: A Gemini-powered coding agent for designing advanced algorithms"](https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/), 2025.

[^ghostlight]: GameCult Ghostlight, ["Agent State Distributions And Prompt Projection"](https://github.com/GameCult/Ghostlight/blob/main/docs/architecture/agent-state-distributions-and-prompt-projection.md), and ["Agent State Variable Glossary"](https://github.com/GameCult/Ghostlight/blob/main/docs/architecture/agent-state-variable-glossary.md).

[^weksa]: GameCult Weksa, ["Flavored English Lowering"](https://github.com/GameCult/weksa/blob/main/docs/flavored-english-lowering.md), especially the authority split between interlingua, agent state, and English lowering.

[^sdt]: Richard M. Ryan and Edward L. Deci, ["Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being"](https://pubmed.ncbi.nlm.nih.gov/11392867/), *American Psychologist* 55(1), 2000.

[^intrinsic]: Pierre-Yves Oudeyer, Frederic Kaplan, and Verena V. Hafner, ["Intrinsic Motivation Systems for Autonomous Mental Development"](https://www.pyoudeyer.com/ims.pdf), *IEEE Transactions on Evolutionary Computation* 11(2), 2007.
