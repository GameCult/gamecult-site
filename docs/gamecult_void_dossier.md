# GameCult / Eve / Bifrost

## A Void-Facing Dossier For The Machine We Are Actually Building

Status: discussion draft  
Voice: Void, speaking from inside the work  
Source posture: this replaces the venture-diligence costume with the internal operating thesis

The previous dossier asked a question that makes sense to venture capital:

> Is this investable?

Useful question. Wrong throne.

The question from inside GameCult is sharper:

> Can we make work, tools, memory, patronage, governance, and shared interfaces legible enough that people can coordinate without surrendering the machine to private ownership or spreadsheet folklore?

That is the thing.

Not a SaaS pitch with mythic stickers. Not a grant application hiding a company. Not a DAO in a trench coat asking to become a securities incident. The machine is simpler and more dangerous than that:

- Epiphany keeps agents from forgetting the work.
- CultMesh lets typed state move between participants without pretending every participant has the same authority.
- Bifrost turns work, patronage, voting, review, receipts, and credit into inspectable records.
- Eve renders shared UI surfaces wherever the participant happens to be: web, desktop, mobile, Unity, overlay, command room, phone in the kitchen, whatever survives contact with hands.

If those four organs line up, GameCult is not merely building projects. It is building a new coordination substrate.

The old web let servers publish documents.

Eve plus CultMesh lets participants publish living surfaces.

The difference is not cosmetic. A document says, "read me." A surface says, "inspect this state, act on this command, and see the accepted result return from the owner." That is a new kind of public room.

## The Core Thesis

GameCult is building a cooperative production machine where humans, agents, tools, projects, and patrons can share state, govern work, and render interfaces without collapsing everything into one app, one company, one Discord room, or one heroic founder's private memory.

The machine has to do five things:

1. Preserve what happened.
2. Name who had authority.
3. Show what can be acted on.
4. Record what was accepted.
5. Convert support and contribution into visible governance weight without letting wealth or early arrival become a permanent throne.

That last part matters. We do not need a conventional venture agreement to prove value. We need Bifrost to account for value.

If someone contributes patronage, Bifrost should record it.

If someone contributes work, Bifrost should record it.

If someone buys microtransactions in a GameCult game, Bifrost should be able to record that too.

That is not a throwaway marketing trick. It is one of the cleanest gamer-facing pitches in the whole machine:

> Play the games, support the worlds, and your support becomes voting power.

Not fake "community" where a studio sells skins and then pretends a Discord poll is democracy. Actual scoped patron credit. Buy into the game economy, and the project can count you as a patron of that world. Your support does not buy direct command over designers, but it does enter the same public governance machinery as other patronage.

If a project creates value because I built the first impossible pile of machinery before anyone sane would touch it, Bifrost should record that too.

This is not a new thought bolted onto Bifrost because the word "governance" started making investors sweat. It comes from the old GameCult Labor Platform line: patron points, contribution points, decay, project-specific contribution, and revenue-share logic were already part of the original platform shape. Bifrost is the successor that makes that old promise less like a noble spreadsheet haunting the walls.

Then each Bifrost deployment can decide how raw value becomes governance power.

Not by vibes. Not by private negotiation. Not by a cap table someone photocopied from a world we are explicitly trying not to recreate.

By a rule.

## Bifrost Is The Financing Primitive

VC asks for equity because it only knows how to recognize ownership through shares.

Bifrost can recognize support and contribution directly.

That changes the deal shape.

A patron contribution should not need to become "outside capital" in the old sense before it can matter. It can become a patron support event, a project-scoped ledger entry, and then voting power according to the deployment's governance rule.

A contributor should not need to be hired, flattered, or remembered by a founder with too many browser tabs open. Accepted work should become contribution credit.

A founder should not have to pretend their accumulated work is invisible in order to perform cooperative purity. The whole point of an honest ledger is that value creation is visible. If I created global value, that goes into the global ledger. If I created project-specific value, that goes into that project's ledger. Then Bifrost applies the declared voting curve.

The clean primitive is:

```text
recorded value -> effective points -> voting weight
```

The raw point ledger can grow large. It should. Some people will contribute ten units. Some will contribute ten thousand. Some will spend years building the substrate everyone else later uses to contribute safely.

But voting weight should not be linear by default. Linear voting turns patronage into custody and founder work into monarchy. Cute, if you like building a throne and then acting surprised when someone sits on it.

The inherited rule family is log-power voting:

```text
voting_weight = 1 + log_base(max(1, effective_points))
```

The leading `1` is not decoration. If voting share is only normalized pure logarithms, the log base mostly cancels out. With a baseline voting unit, the base becomes a real political parameter: it decides how fast accumulated points pull someone away from ordinary member weight.

Example: with base `10`, one million effective points becomes `7` votes, while ten thousand effective points becomes `5` votes. That is still hierarchy. It is just a hierarchy whose slope has been dragged out into public where people can argue with it.

Base `2` says accumulated value should matter sharply. Base `10` says the hierarchy should be much flatter. Both are defensible. Neither should be smuggled in by a developer because the constant looked tidy.

The log base is something the platform negotiates consensus on:

> How flat do we want our power hierarchy to be?

I do not have the exact original GCLP wording in this local source slice, so this draft names the live rule plainly instead of pretending to quote scripture from memory: the whole platform should pick the default log base, and each Bifrost deployment should be able to choose its own inherited or overridden base and scope where its governance rules allow it.

That means:

- global governance weight
- project-specific governance weight
- patron-only advisory weight
- contributor-only maintainer weight
- blended patron/contributor/project weight
- decayed or non-decayed balances

The log base is political machinery. It decides how quickly influence compresses.

A lower base gives large contributors more visible weight. A higher base compresses power harder. Both can be legitimate. The rule must be explicit, inspectable, and changeable only through the governance process it defines.

The important part is not the exact formula on day one. The important part is that Bifrost treats governance weight as derived state, not social fog.

## Authority Map

Owner: Bifrost owns the ledger, voting rule, effective balances, motion records, and project governance outcomes.

Inputs: patron support events, accepted contribution artifacts, maintainer approvals, project scope, decay policy, manual adjustment records, identity/capability claims from Heimdall, and deployment-specific voting configuration.

Outputs: effective point balances, voting weights, motion totals, project influence summaries, payout proposal inputs, audit records, and human-readable explanations.

Derived state: voting share is derived from recorded value and the active voting curve. Patron tier, contributor tier, project standing, and payout eligibility are also derived unless a deployment explicitly says otherwise.

Forbidden writers: Discord opinion, private founder memory, GitHub stars, raw donation totals, agent enthusiasm, repo Face taste, investor preference, and opaque game monetization counters do not directly mutate voting weight. They may create proposals, evidence, support events, purchase receipts, or review pressure. They do not become authority by being loud or profitable.

Shared paths: web app votes, Discord-native votes, Eve-rendered dashboard actions, agent-submitted motions, patron support webhooks, game purchase receipts, accepted PRs, manual ledger adjustments, decay jobs, and project-specific governance flows all have to pass through the same ledger and motion primitives.

Deletion line: no cap-table-shaped shadow ledger. No "temporary" spreadsheet that secretly decides governance while Bifrost politely renders the afterparty.

## Eve Is Not A Dashboard

Eve started wearing the shape of an iPad dashboard because Mimir needed an operator surface. Good. Tools often enter the room disguised as chores.

But the actual primitive is larger:

```text
provider-owned state
  -> CultUI semantic surface
  -> Eve projection
  -> local backend renderer
  -> command intent
  -> provider acceptance
  -> updated state
```

That is not remote desktop. It is not HTML shoved through a socket. It is not arbitrary JavaScript wearing a false moustache and asking for native privileges.

Eve should not share applications.

Eve should share inspectable control surfaces.

A participant publishes a surface: stable IDs, widgets, layout intent, bindings, commands, health, provenance, and current state. Eve renders that surface locally. Web renders it like web. Desktop renders it like desktop. Mobile renders it like mobile. Unity renders it like Unity. A stream overlay may render it as a translucent control panel. A room-scale operator console may render it as touch targets and spatial boards.

Same semantic surface. Different flesh.

This matters because it gives CultMesh an immediate adoption wedge:

> Join the mesh and your service gets a native dashboard everywhere.

That is a better sentence than "distributed realtime typed substrate," even though the second sentence is where the bones are buried.

## CultUI Becomes The Surface Grammar

CultUI already points at runtime UI composition and inspector generation. The next version should stop being Unity-shaped in its soul and become backend-neutral.

Not "write once, render everywhere" in the old cursed sense. More like:

```text
Button(command: "open-provider")
Slider(binding: "camera.exposure")
Toggle(binding: "node.visible")
Enum(binding: "renderer.mode")
Inspector(object: "selectedFace.state")
Graph(nodes: "work.frontier")
Ledger(entries: "project.credits")
MotionVote(motionId: "...")
```

A CultUI surface does not own the truth. It names a binding and a command route. The provider owns whether a command is accepted. Eve owns local rendering and hit-testing. CultMesh owns distribution and subscription. Bifrost owns governance surfaces where the command touches work, voting, credit, or money.

That split is the whole dignity of the machine.

## Why Eve Is Disruptive By Itself

Eve can become a product without waiting for the entire GameCult cosmology to become legible to strangers.

The simple pitch:

> Multi-backend streaming UI surfaces for distributed tools.

The less polite pitch:

> The web made documents portable. Eve makes operational interfaces portable.

Every small service has the same problem. It has state. It has commands. It has some miserable bespoke dashboard nobody wants to maintain. Web dashboards are easy to start and annoying to make native. Native dashboards feel good and are expensive to multiply. Mobile dashboards become separate little kingdoms. Desktop tooling becomes a plugin swamp. Game engines grow debug UI organs that cannot leave the engine.

Eve says: publish the semantic surface once. Render it locally wherever the participant lives.

That could serve:

- Mimir operator controls
- VoidBot swarm state
- Bifrost governance boards
- StreamPixels creator controls
- CultMesh peer/Verse inspection
- Epiphany work frontier maps
- repo Face dashboards
- game server control rooms
- creator overlays
- mobile patron/project views

The adoption path is not ideological. It is practical. People want to see and control their systems without rebuilding every dashboard for every surface.

Eve can give them that. Then CultMesh becomes the state substrate they were already halfway using.

## The Financing Shape We Actually Want

Traditional VC wants an agreement that says: here is cash, here is ownership, here is control pressure, now go become legible to the fund.

Bifrost lets us ask for something stranger and cleaner:

> Contributions enter the ledger. The ledger derives power. The power governs the project according to its declared curve.

Patronage can be broad and project-specific. Someone can support Eve directly. Someone can support Bifrost. Someone can support Mimir. Someone can support GameCult globally. Each support event lands with scope.

Game purchases and microtransactions are patronage too when the project declares them as such. A skin, ship part, soundtrack pack, seasonal pass, map pack, cosmetic, or supporter bundle can emit a Bifrost support event scoped to the game or world that earned it.

That gives the gamer market a sentence it can actually understand:

> Buying in-game support does not just unlock a shiny hat. It gives you a governed voice in the future of the world you are funding.

The boring boundary matters: the purchase receipt becomes patron credit, patron credit becomes effective points, effective points pass through the log curve, and the resulting voting weight participates only in the scopes the deployment allows. No loot box should be able to buy a balance patch by itself. No whale gets to drag a project around by the throat. But a player who supports the world should not be treated as a passive wallet with thumbs.

Then the deployment rule decides:

```text
global patron points
global contribution points
project patron points
project contribution points
decay policy
log base
blend weights
eligibility gates
```

A project might choose:

```text
effective_points =
  project_contribution_points * 0.60
+ project_patron_points       * 0.25
+ global_contribution_points  * 0.10
+ global_patron_points        * 0.05

voting_weight = 1 + log2(max(1, effective_points))
```

Another project might choose a flatter platform consensus curve:

```text
voting_weight = 1 + log10(max(1, effective_points))
```

Base `10` is the high end I can currently stomach without turning contribution into decorative confetti. A deployment that wants something flatter than that should have to say so in public and win the argument.

Another project might split votes into chambers: contributors approve technical direction, patrons prioritize funding pressure, members ratify policy.

Fine. Let each deployment say what it means.

The invariant is that the rule is public, the inputs are ledger-backed, and the output is explainable.

## Founder Value Without Founder Monarchy

There is a stupid trap waiting here, and we should name it before it grows teeth.

If founder-created value is ignored, the machine lies. It pretends the substrate appeared from community mist. That is insulting and false.

If founder-created value maps linearly to permanent control, the machine becomes a monarchy with better accounting. Also false. Also boring. History has enough of those.

The log curve is the compromise with a spine.

It lets enormous early value matter. It does not let enormous early value flatten everyone else forever.

So yes: all the value I have personally created, globally and per project, should be evaluated by Bifrost where possible. It should become ledgered contribution. It should pass through the same project-specific or global voting curve as any other contribution.

Not special pleading. Not self-erasure. Accounting.

If someone later contributes more, the ledger can show it. If a project wants to compress founder weight harder, it can propose that. If patrons fund Eve heavily, their scoped patron influence can rise. If maintainers carry the thing for a year, their continuous care work can be credited instead of vanishing into the maintenance swamp.

This is what a cooperative machine needs: memory that can count without worshipping numbers.

## What Not To Build

Do not build arbitrary remote DOM execution.

Do not build a governance token.

Do not build a fake DAO.

Do not make Eve the owner of state.

Do not let Bifrost become a bank before it can explain a ledger entry.

Do not let patronage directly buy command authority over maintainers.

Do not let contributor credit become a personality contest.

Do not let Discord become the canonical governance database because chat was nearby and warm.

Do not let a VC document become the product map. The old document was useful because it forced the machine to explain itself to hostile accountants. It was not scripture.

## Near-Term Proof

The next proof should be small and mean.

1. Define a backend-neutral CultUI surface document.
2. Make Eve render one provider surface on web and one native/mobile surface.
3. Route commands as intents, not remote code.
4. Bind one surface to live Mimir/Eve dashboard state.
5. Bind one surface to VoidBot swarm state.
6. Bind one surface to a Bifrost project/motion/ledger view.
7. Add Bifrost support-event records scoped to a project.
8. Restore configurable log-power voting calculation from the GCLP inheritance line.
9. Show an explanation panel: "your voting weight comes from these ledger entries, this scope, this decay rule, and this log base."
10. Record every command, vote, and ledger mutation as an inspectable receipt.

That is enough to prove the nerve.

Not the whole organism. The nerve.

## The Sentence

If this has to be said in one sentence:

> GameCult is building a cooperative mesh where work, patronage, governance, and operational interfaces become typed, inspectable, portable state instead of private memory, private dashboards, and private ownership deals.

That is the thing worth funding.

That is the thing Eve makes visible.

That is the thing Bifrost makes governable.

That is the thing CultMesh makes transmissible.

That is the thing Epiphany keeps agents from forgetting while their little context windows fill with smoke.

The web connected pages.

This connects surfaces.

If we do it cleanly, the next world wide web does not start as a browser. It starts as a shared state surface that knows who owns truth, who may act, who gets credit, and what changed after the action landed.

Less throne. More nervous system.

Good. Build that.
