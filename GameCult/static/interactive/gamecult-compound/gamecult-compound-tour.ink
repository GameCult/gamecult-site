VAR visited_epiphany = false
VAR visited_bifrost = false
VAR visited_voidbot = false
VAR visited_cultlib = false
VAR visited_heimdall = false

-> welcome

=== welcome ===
# speaker: Void
# avatar: void
# scene: compound
# dom: studio
Welcome to GameCult. The front door used to be a manifesto with pockets. Now it is a tour.
-> welcome_2

=== welcome_2 ===
# speaker: Void
# avatar: void
# scene: compound
# dom: studio,proof
Every card in the scene is still Quartz DOM from the public site. I can make it friendlier, but I do not get to make it unverifiable. Charming, tragic, necessary.
-> hub

=== hub ===
# speaker: Void
# avatar: void
# scene: compound
# dom: studio
Where do you want to walk first?
+ [Meet Epiphany at the forge] -> epiphany
+ [Visit Bifrost and the public work ledger] -> bifrost
+ [Find VoidBot in the archive room] -> voidbot
+ [Ask Libby about CultLib and typed state] -> cultlib
+ [Ask Heimdall about identity and consent] -> heimdall
+ [Show me proof, receipts, and current risk] -> proof
+ [I just need the normal wiki] -> wiki

=== epiphany ===
~ visited_epiphany = true
# speaker: Epiphany
# avatar: epiphany
# scene: forge
# dom: epiphany,proof
I am Epiphany: the repo that keeps asking agents to write down what they think they are doing before they start improving the wallpaper with a hammer.
-> epiphany_2

=== epiphany_2 ===
# speaker: Epiphany
# avatar: epiphany
# scene: forge
# dom: epiphany
My job is persistent agent cognition: maps, evidence, verification, role lanes, reorientation, and enough typed state that future work can disagree with the past instead of reenacting it.
-> hub_return

=== bifrost ===
~ visited_bifrost = true
# speaker: Void
# avatar: void
# scene: ledger
# dom: bifrost,proof
Bifrost is where the social promise stops being a speech and starts becoming records: topics, work items, dispatches, receipts, credit, reward pressure, and review.
-> bifrost_2

=== bifrost_2 ===
# speaker: Void
# avatar: void
# scene: ledger
# dom: bifrost
It is not here to cosplay a solved economy. It is here to make the unfinished one visible enough that people can inspect it before it starts touching money or support.
-> hub_return

=== voidbot ===
~ visited_voidbot = true
# speaker: Void
# avatar: void
# scene: archive
# dom: voidbot,projects
VoidBot is the archive room with a mouth: Discord memory, repo retrieval, lore lookup, and an escape hatch into heavier work when chat becomes a shoebox full of lightning.
-> voidbot_2

=== voidbot_2 ===
# speaker: Void
# avatar: void
# scene: archive
# dom: voidbot
Repo Faces grow out of that same pressure. A project should be able to meet you, explain itself, and point at its own evidence without pretending the avatar is the source of truth.
-> hub_return

=== cultlib ===
~ visited_cultlib = true
# speaker: Libby
# avatar: libby
# scene: library
# dom: cultlib,docs
I am Libby, which means I get the shelves. CultLib, CultCache, CultNet, and CultMesh are the boring sacred organs: typed memory, transport, and distributed state that can be inspected without divination.
-> cultlib_2

=== cultlib_2 ===
# speaker: Libby
# avatar: libby
# scene: library
# dom: cultlib
The rule is simple enough to hurt: when both sides are ours, use typed documents. Blobs are tolerated at the border, not crowned in the treasury.
-> hub_return

=== heimdall ===
~ visited_heimdall = true
# speaker: Heimdall
# avatar: heimdall
# scene: gate
# dom: heimdall,bifrost
Heimdall is the gate: identity, grants, sessions, consent, revocation, and the question of who may cross which boundary under which authority.
-> heimdall_2

=== heimdall_2 ===
# speaker: Heimdall
# avatar: heimdall
# scene: gate
# dom: heimdall
Transparency without consent becomes exposure. Access without revocation becomes custody. The gate has to explain itself or it is just a wall with better branding.
-> hub_return

=== proof ===
# speaker: Void
# avatar: void
# scene: receipts
# dom: proof,roadmap
The dossier points at the future: public proof runs, Bifrost-first work records, accepted or rejected artifacts, human review burden, model spend, lessons, and support rules.
-> proof_2

=== proof_2 ===
# speaker: Void
# avatar: void
# scene: receipts
# dom: proof
This page is only the front window. Bifrost should become the canonical ledger. The website explains the machine and mirrors public receipts; it does not get to quietly become the machine.
-> hub_return

=== wiki ===
# speaker: Void
# avatar: void
# scene: compound
# dom: docs,projects
Good instinct. The normal wiki is still here. The story is a guide, not a velvet curtain in front of the exits.
-> hub_return

=== hub_return ===
# speaker: Void
# avatar: void
# scene: compound
# dom: studio
Want another door?
+ [Epiphany] -> epiphany
+ [Bifrost] -> bifrost
+ [VoidBot] -> voidbot
+ [CultLib] -> cultlib
+ [Heimdall] -> heimdall
+ [Proof and roadmap] -> proof
+ [Enough tour; show me the links] -> done

=== done ===
# speaker: Void
# avatar: void
# scene: compound
# dom: docs,projects
Then take the plain doors. If the character layer ever makes the documents harder to reach, we have built the wrong altar.
-> END
