# Writes aqua-A/B/C.svg: three Persona-bust takes on Aqua's canon goldfish
# (gamecult-site cotsc-praxis aqua-sheet.png). Paths are hand-authored here;
# the script only composes the shared fish with each take's face, fins and prop.
OUT = r"C:\gc-wt\cast-designs\cast-designs\proposals\aqua"

LINE, GOLD, ORANGE, CYAN, BLACK, WHITE = "#0b4a55", "#ffb320", "#ff6a1f", "#22d3e6", "#1c1c24", "#ffffff"
GOLD_SH, ORANGE_SH, GOLD_HI, ORANGE_HI = "#e08a10", "#d4480f", "#ffd36a", "#ff9a5a"
SANS = "'Segoe UI', Arial, sans-serif"
MONO = "Consolas, 'Courier New', monospace"

COMMON_DEFS = f'''
    <filter id="sil" x="-10%" y="-10%" width="120%" height="120%">
      <feComponentTransfer in="SourceAlpha" result="a"><feFuncA type="discrete" tableValues="0 1 1 1 1 1 1 1 1 1"/></feComponentTransfer>
      <feFlood flood-color="#000"/>
      <feComposite in2="a" operator="in"/>
    </filter>
    <clipPath id="cardClip"><path d="M70,20 H790 L760,780 H40 Z"/></clipPath>
    <path id="eyeShape" d="M-46,-4 C-46,-50 -22,-62 2,-62 C28,-62 48,-48 48,-4 C48,38 28,60 2,60 C-22,60 -46,38 -46,-4 Z"/>
    <clipPath id="eyeClip"><use href="#eyeShape"/></clipPath>
    <!-- anime eye on the canon's round blue fish eye -->
    <g id="eye">
      <use href="#eyeShape" fill="{WHITE}"/>
      <g clip-path="url(#eyeClip)">
        <path d="M-52,-64 H54 V-12 C34,-44 -30,-44 -52,-10 Z" fill="#c4eef5"/>
        <ellipse cx="6" cy="8" rx="38" ry="50" fill="#1fa9e0"/>
        <path d="M-40,-62 H52 V6 C34,-30 -22,-34 -40,6 Z" fill="#1466a8"/>
        <ellipse cx="8" cy="36" rx="24" ry="12" fill="#8ff0fa"/>
        <ellipse cx="6" cy="10" rx="17" ry="24" fill="#0b2f55"/>
        <ellipse cx="6" cy="8" rx="38" ry="50" fill="none" stroke="#0b2f55" stroke-width="4"/>
      </g>
      <ellipse cx="-11" cy="-14" rx="13" ry="17" fill="{WHITE}"/>
      <circle cx="22" cy="30" r="6.5" fill="{WHITE}"/>
      <path d="M-56,2 C-58,-50 -22,-72 6,-70 C34,-68 56,-52 59,-18 L68,-24 C66,-14 61,-8 55,-4 C48,-44 30,-59 4,-59 C-24,-59 -44,-40 -46,2 Z" fill="{LINE}"/>
      <path d="M-26,54 C-6,63 20,63 32,53" fill="none" stroke="{LINE}" stroke-width="3.5" stroke-linecap="round"/>
    </g>
    <!-- half-lowered lid for the stern take -->
    <g id="eyeStern">
      <use href="#eye"/>
      <path d="M-62,-80 H66 V-14 C30,-30 -30,-28 -62,-8 Z" fill="{GOLD}"/>
      <path d="M-58,-6 C-30,-28 30,-30 64,-14" fill="none" stroke="{LINE}" stroke-width="9" stroke-linecap="round"/>
    </g>
    <g id="note">
      <ellipse cx="0" cy="0" rx="8" ry="6" transform="rotate(-22)" fill="{WHITE}"/>
      <path d="M6.5,-2 V-30 C14,-27 22,-20 17,-9" fill="none" stroke="{WHITE}" stroke-width="3.5" stroke-linecap="round"/>
    </g>
    <g id="bubble">
      <circle r="1" fill="{CYAN}" fill-opacity="0.22" stroke="{CYAN}" stroke-width="0.08"/>
      <path d="M-0.62,-0.2 A0.66,0.66 0 0 1 -0.2,-0.62" fill="none" stroke="{WHITE}" stroke-width="0.12" stroke-linecap="round"/>
    </g>

    <!-- canon body: round, yellow face, orange crown and back meeting in a V between the eyes -->
    <path id="body" d="M396,214 C552,214 660,330 654,480 C648,632 532,734 388,732 C240,730 136,628 138,472 C140,320 240,214 396,214 Z"/>
    <clipPath id="bodyClip"><use href="#body"/></clipPath>
    <mask id="bodyShade"><rect width="1200" height="800" fill="#fff"/><use href="#body" transform="translate(-44,-40)" fill="#000"/></mask>
    <mask id="bodyRim"><rect width="1200" height="800" fill="#fff"/><use href="#body" transform="translate(-13,-3)" fill="#000"/></mask>
    <path id="crown" d="M100,170 H700 V430 C664,372 616,336 566,334 C522,334 484,362 458,414 C432,360 386,326 328,322 C268,320 226,372 214,446 C204,530 220,620 262,712 L100,780 Z"/>

    <!-- forked tail behind, for the bust -->
    <g id="tailBust">
      <path d="M212,444 C152,402 86,330 54,226 C84,240 110,236 126,214 C140,250 168,262 198,250 C206,320 234,384 264,428 Z" fill="{ORANGE}" stroke="{LINE}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M210,520 C148,566 92,650 66,770 C96,750 126,752 142,772 C158,744 188,736 212,746 C218,660 240,592 270,548 Z" fill="{ORANGE}" stroke="{LINE}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M208,432 C162,380 122,320 94,246 M234,420 C212,370 188,320 170,266 M208,542 C162,600 126,670 106,756 M236,552 C212,610 192,670 182,740" fill="none" stroke="{ORANGE_SH}" stroke-width="3.5" stroke-linecap="round"/>
    </g>
    <!-- long forked tail, for the full body -->
    <g id="tailFull">
      <path d="M190,440 C120,380 40,320 -40,236 C-20,280 -26,310 -50,330 C-10,350 0,380 -20,410 C40,430 120,460 170,480 Z" fill="{ORANGE}" stroke="{LINE}" stroke-width="12" stroke-linejoin="round"/>
      <path d="M190,510 C120,560 40,620 -40,720 C-14,700 14,700 30,716 C40,680 60,660 92,662 C110,610 150,560 196,532 Z" fill="{ORANGE}" stroke="{LINE}" stroke-width="12" stroke-linejoin="round"/>
      <path d="M180,450 C120,400 60,350 0,300 M180,500 C120,560 60,620 10,680" fill="none" stroke="{ORANGE_SH}" stroke-width="6" stroke-linecap="round"/>
    </g>
    <!-- head, body, crest, headphones: identical in every take -->
    <g id="fishBase">
      <path d="M318,252 C298,184 326,118 388,90 C380,124 396,144 428,124 C424,150 446,166 476,150 C476,190 476,222 472,254 Z" fill="{ORANGE}" stroke="{LINE}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M392,242 C380,192 386,150 402,118 M432,240 C430,200 436,176 454,160 M356,244 C346,200 352,160 370,130" fill="none" stroke="{ORANGE_SH}" stroke-width="3.5" stroke-linecap="round"/>
      <use href="#body" fill="{GOLD}"/>
      <g clip-path="url(#bodyClip)">
        <use href="#crown" fill="{ORANGE}"/>
        <path d="M206,300 C246,256 300,236 346,236" fill="none" stroke="{ORANGE_HI}" stroke-width="10" stroke-linecap="round"/>
        <path d="M300,650 q22,20 44,0 q22,20 44,0 q22,20 44,0 M276,612 q22,20 44,0 M410,612 q22,20 44,0 q22,20 44,0 M344,690 q22,20 44,0 q22,20 44,0" fill="none" stroke="{GOLD_SH}" stroke-width="3.5" stroke-linecap="round"/>
        <rect width="1200" height="800" fill="#9a3200" fill-opacity="0.26" mask="url(#bodyShade)"/>
        <rect width="1200" height="800" fill="{CYAN}" mask="url(#bodyRim)"/>
      </g>
      <use href="#body" fill="none" stroke="{LINE}" stroke-width="7"/>
      <!-- far cup, band -->
      <ellipse cx="666" cy="420" rx="44" ry="80" fill="{BLACK}" stroke="{LINE}" stroke-width="6"/>
      <ellipse cx="674" cy="420" rx="24" ry="54" fill="none" stroke="{CYAN}" stroke-width="8"/>
      <path d="M164,392 C150,200 290,128 398,128 C520,128 668,196 662,372" fill="none" stroke="{LINE}" stroke-width="44" stroke-linecap="round"/>
      <path d="M164,392 C150,200 290,128 398,128 C520,128 668,196 662,372" fill="none" stroke="{BLACK}" stroke-width="32" stroke-linecap="round"/>
      <path d="M196,270 C230,196 300,156 380,150" fill="none" stroke="#454558" stroke-width="7" stroke-linecap="round"/>
    </g>
    <!-- near cup, drawn after the face so a fin can sit on it -->
    <g id="nearCup">
      <ellipse cx="196" cy="426" rx="58" ry="84" fill="#2c2c38" stroke="{LINE}" stroke-width="6"/>
      <ellipse cx="168" cy="426" rx="62" ry="86" fill="{BLACK}" stroke="{LINE}" stroke-width="7"/>
      <ellipse cx="168" cy="426" rx="40" ry="60" fill="none" stroke="{CYAN}" stroke-width="10"/>
      <ellipse cx="168" cy="426" rx="22" ry="36" fill="{CYAN}" opacity="0.4"/>
      <path d="M134,382 C140,364 152,354 166,352" fill="none" stroke="#454558" stroke-width="6" stroke-linecap="round"/>
    </g>
    <!-- canon snout: rounded upper lip over an open mouth -->
    <g id="mouthOpen">
      <path d="M420,554 C436,564 452,562 468,552 C484,562 500,564 516,552 C512,596 490,616 468,616 C446,616 424,596 420,554 Z" fill="#8a2234" stroke="{LINE}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M434,598 C446,586 490,586 502,598 C492,612 446,612 434,598 Z" fill="#ff7f8f"/>
      <path d="M416,560 C414,530 440,512 468,514 C496,512 522,530 520,558" fill="none" stroke="{LINE}" stroke-width="5" stroke-linecap="round"/>
      <path d="M432,532 C442,522 456,520 466,522" fill="none" stroke="{GOLD_HI}" stroke-width="6" stroke-linecap="round"/>
    </g>
    <g id="mouthPout">
      <path d="M420,560 C418,532 442,516 468,518 C494,516 518,532 516,560" fill="none" stroke="{LINE}" stroke-width="5" stroke-linecap="round"/>
      <path d="M432,534 C442,524 456,522 466,524" fill="none" stroke="{GOLD_HI}" stroke-width="6" stroke-linecap="round"/>
      <path d="M440,566 C450,556 458,572 468,562 C478,552 486,568 496,560" fill="none" stroke="{LINE}" stroke-width="4.5" stroke-linecap="round"/>
    </g>
    <g id="blush">
      <ellipse cx="316" cy="548" rx="34" ry="14" fill="#ff7f8f" opacity="0.55"/>
      <ellipse cx="590" cy="540" rx="22" ry="12" fill="#ff7f8f" opacity="0.55"/>
      <path d="M302,544 l-6,10 M318,544 l-6,10 M334,544 l-6,10 M584,537 l-5,9 M598,537 l-5,9" stroke="#e25566" stroke-width="2.5" stroke-linecap="round"/>
    </g>
'''

def fin(d, ribs):
    return (f'<path d="{d}" fill="{ORANGE}" stroke="{LINE}" stroke-width="5" stroke-linejoin="round"/>'
            f'<path d="{ribs}" fill="none" stroke="{ORANGE_SH}" stroke-width="3" stroke-linecap="round"/>')

EYES_OPEN = ('<use href="#eye" transform="translate(366,462) scale(1.04)"/>'
             '<use href="#eye" transform="translate(540,456) scale(0.8,0.96)"/>')

TAKES = {
 "A": dict(
   name="LISTENING", sub="the canon fish, idol framing",
   hook=["Hook: the canon goldfish in Persona framing — one", "fin pressed to her ear cup, eyes up and bright,",
         "note bubbles rising toward the text box."],
   pose="translate(24,0)",
   face=EYES_OPEN
     + f'<path d="M318,384 C336,370 364,368 384,376 M520,374 C536,366 556,368 570,378" fill="none" stroke="{LINE}" stroke-width="6" stroke-linecap="round"/>'
     + '<use href="#blush"/><use href="#mouthOpen"/>',
   fins_back="",
   fins_front=fin("M262,592 C214,584 176,540 166,482 C190,488 210,478 222,458 C238,502 262,546 262,592 Z",
                  "M248,580 C214,566 192,540 182,506 M254,560 C238,540 230,516 226,490")
     + fin("M596,628 C646,620 686,582 698,532 C674,548 652,544 636,532 C628,574 608,602 596,628 Z",
           "M612,612 C642,600 666,576 678,552"),
   prop_front="", prop_back="",
   fx='''<use href="#bubble" transform="translate(712,262) scale(36)"/><use href="#note" transform="translate(708,276) scale(1.05)"/>
  <use href="#bubble" transform="translate(760,150) scale(26)"/><use href="#note" transform="translate(757,161) scale(0.75)"/>
  <use href="#bubble" transform="translate(690,128) scale(13)"/><use href="#bubble" transform="translate(726,368) scale(15)"/>''',
   full_prop="",
 ),
 "B": dict(
   name="CONDUCTOR", sub="the canon fish, baton up",
   hook=["Hook: she conducts the dings — baton raised in a", "fin, eyes squeezed shut in a big smile, a ribbon",
         "of water looping round her like a staff line."],
   pose="translate(400,470) rotate(-7) translate(-386,-470)",
   face=f'<path d="M314,474 C330,436 394,434 414,474" fill="none" stroke="{LINE}" stroke-width="9" stroke-linecap="round"/>'
     + f'<path d="M504,470 C516,440 558,440 572,470" fill="none" stroke="{LINE}" stroke-width="8" stroke-linecap="round"/>'
     + f'<path d="M310,476 l-12,6 M576,470 l10,6" stroke="{LINE}" stroke-width="5" stroke-linecap="round"/>'
     + f'<path d="M318,394 C336,378 364,374 386,382 M518,380 C536,370 558,372 572,382" fill="none" stroke="{LINE}" stroke-width="6" stroke-linecap="round"/>'
     + '<use href="#blush"/><use href="#mouthOpen" transform="translate(466,560) scale(1.12) translate(-466,-560)"/>',
   fins_back="",
   fins_front=fin("M252,610 C206,612 168,590 150,552 C170,552 188,544 198,530 C214,566 236,590 252,610 Z",
                  "M238,602 C210,598 186,584 170,566")
     + fin("M600,560 C628,520 660,470 704,446 C700,472 708,492 726,504 C690,526 640,560 612,600 Z",
           "M614,568 C640,530 668,496 700,474"),
   prop_back=f'<path d="M150,610 C150,520 230,470 320,450" fill="none" stroke="{LINE}" stroke-width="26" stroke-linecap="round"/><path d="M150,610 C150,520 230,470 320,450" fill="none" stroke="#0f86a0" stroke-width="18" stroke-linecap="round"/>',
   prop_front=(f'<path d="M698,476 L760,250" stroke="{LINE}" stroke-width="13" stroke-linecap="round"/>'
               f'<path d="M698,476 L760,250" stroke="{WHITE}" stroke-width="6" stroke-linecap="round"/>'
               f'<circle cx="704" cy="458" r="12" fill="{CYAN}" stroke="{LINE}" stroke-width="4"/>'
               f'<path d="M760,212 l6,24 l24,6 l-24,6 l-6,24 l-6,-24 l-24,-6 l24,-6 Z" fill="{WHITE}"/>'
               f'<path d="M150,610 C130,690 210,744 340,740 C480,736 610,690 700,610 C736,576 726,540 696,548" fill="none" stroke="{LINE}" stroke-width="28" stroke-linecap="round"/>'
               f'<path d="M150,610 C130,690 210,744 340,740 C480,736 610,690 700,610 C736,576 726,540 696,548" fill="none" stroke="{CYAN}" stroke-width="20" stroke-linecap="round"/>'
               f'<path d="M176,676 C190,704 226,720 290,724" fill="none" stroke="#a6f4fb" stroke-width="6" stroke-linecap="round"/>'),
   fx='''<use href="#bubble" transform="translate(712,330) scale(22)"/><use href="#note" transform="translate(708,340) scale(0.8)"/>
  <use href="#bubble" transform="translate(640,130) scale(30)"/><use href="#note" transform="translate(636,142) scale(0.9)"/>
  <use href="#bubble" transform="translate(110,120) scale(16)"/><use href="#bubble" transform="translate(150,80) scale(9)"/>''',
   full_prop=f'<path d="M698,476 L760,250" stroke="{LINE}" stroke-width="16" stroke-linecap="round"/><path d="M698,476 L760,250" stroke="{WHITE}" stroke-width="8" stroke-linecap="round"/>',
 ),
 "C": dict(
   name="PATCH STEWARD", sub="the canon fish, cable in fin",
   hook=["Hook: the steward under the cuteness — a patch", "cable plugged into her ear cup, the jack raised",
         "to her face, lids down: presets are serious."],
   pose="translate(390,470) scale(1.06) translate(-372,-470)",
   face='<use href="#eyeStern" transform="translate(366,462) scale(1.04)"/>'
     + '<use href="#eyeStern" transform="translate(540,456) scale(0.8,0.96)"/>'
     + f'<path d="M316,368 L394,392 M512,392 L574,366" fill="none" stroke="{LINE}" stroke-width="9" stroke-linecap="round"/>'
     + '<ellipse cx="300" cy="560" rx="40" ry="18" fill="#ff7f8f" opacity="0.5"/><ellipse cx="596" cy="548" rx="24" ry="13" fill="#ff7f8f" opacity="0.5"/>'
     + '<use href="#mouthPout"/>',
   fins_back="",
   fins_front=fin("M250,612 C206,612 170,590 152,552 C172,552 190,544 200,530 C216,566 238,590 250,612 Z",
                  "M236,602 C210,598 186,584 170,566")
     + fin("M560,640 C592,606 606,560 604,516 C622,528 644,530 662,520 C660,572 626,624 580,656 Z",
           "M574,640 C602,610 618,572 622,534"),
   prop_back="",
   prop_front=(f'<path d="M168,512 C150,650 300,744 440,712 C540,690 600,640 612,560" fill="none" stroke="{LINE}" stroke-width="18" stroke-linecap="round"/>'
               f'<path d="M168,512 C150,650 300,744 440,712 C540,690 600,640 612,560" fill="none" stroke="{CYAN}" stroke-width="11" stroke-linecap="round"/>'
               f'<path d="M600,572 l8,-62 l22,2 l-8,62 Z" fill="{BLACK}" stroke="{LINE}" stroke-width="4" stroke-linejoin="round"/>'
               f'<path d="M620,508 l4,-34" stroke="#c7d3d6" stroke-width="8" stroke-linecap="round"/><circle cx="625" cy="470" r="5" fill="#c7d3d6"/>'
               f'<path d="M156,500 h24 v22 h-24 Z" fill="{BLACK}" stroke="{LINE}" stroke-width="4"/>'),
   fx='''<use href="#bubble" transform="translate(746,360) scale(14)"/><use href="#bubble" transform="translate(726,300) scale(8)"/>
  <path d="M740,200 l10,-26 M766,214 l22,-14 M770,244 l26,0" stroke="#22d3e6" stroke-width="5" stroke-linecap="round"/>''',
   full_prop=f'<path d="M168,512 C150,650 300,744 440,712 C540,690 600,640 612,560" fill="none" stroke="{LINE}" stroke-width="24" stroke-linecap="round"/><path d="M168,512 C150,650 300,744 440,712 C540,690 600,640 612,560" fill="none" stroke="{CYAN}" stroke-width="15" stroke-linecap="round"/>',
 ),
}

def sheet(k, t):
    core = (f'<g id="core">{t["fins_back"]}<use href="#fishBase"/>{t["face"]}<use href="#nearCup"/>{t["fins_front"]}</g>')
    bust = f'<g id="bustChar">{t["prop_back"]}<use href="#tailBust"/><use href="#core"/>{t["prop_front"]}</g>'
    hook = "".join(f'<tspan x="830" y="{118+19*i}">{l}</tspan>' for i, l in enumerate(t["hook"]))
    sw = [(CYAN, "key cyan"), (LINE, "line"), (GOLD, "gold"), (ORANGE, "fin"), (BLACK, "phones"), (WHITE, "bubble")]
    swatches = "".join(
        f'<rect x="{830+60*i}" y="626" width="50" height="50" rx="6" fill="{c}" stroke="{LINE}" stroke-width="2"/>'
        f'<text x="{855+60*i}" y="694">{c}</text><text x="{855+60*i}" y="708">{n}</text>' for i, (c, n) in enumerate(sw))
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <title>Aqua, take {k}: {t["name"].title()}</title>
  <defs>{COMMON_DEFS}
    {core}
    {bust}
  </defs>
  <rect width="1200" height="800" fill="#eef3f2"/>
  <path d="M70,20 H790 L760,780 H40 Z" fill="#07111a"/>
  <g clip-path="url(#cardClip)">
    <path d="M60,640 C200,610 300,660 420,640 C560,616 660,650 800,630 V800 H40 Z" fill="#0b2a33"/>
    <path d="M600,40 l-180,740 M680,40 l-180,740" stroke="{CYAN}" stroke-opacity="0.07" stroke-width="40"/>
    <g transform="{t["pose"]}"><use href="#bustChar"/></g>
  </g>
  <path d="M70,20 H790 L760,780 H40 Z" fill="none" stroke="{CYAN}" stroke-width="5"/>
  <path d="M84,32 H776" stroke="{CYAN}" stroke-width="2" stroke-opacity="0.5"/>
  {t["fx"]}
  <path d="M520,724 H770 L764,768 H512 Z" fill="{CYAN}"/>
  <text x="534" y="755" font-family="{MONO}" font-size="24" font-weight="700" letter-spacing="8" fill="#07111a">AQUA</text>

  <text x="830" y="58" font-family="{SANS}" font-size="30" font-weight="700" letter-spacing="4" fill="{LINE}">AQUA · {k}</text>
  <text x="830" y="86" font-family="{SANS}" font-size="17" font-weight="600" letter-spacing="2" fill="#0f86a0">{t["name"]} <tspan font-weight="400" letter-spacing="0" fill="#4a6a70">({t["sub"]})</tspan></text>
  <text font-family="{SANS}" font-size="14" fill="{BLACK}">{hook}</text>

  <ellipse cx="925" cy="500" rx="100" ry="10" fill="{LINE}" opacity="0.15"/>
  <g transform="translate(935,335) rotate(-8) scale(0.33) translate(-400,-470)">
    <use href="#tailFull"/><use href="#core"/>{t["full_prop"]}
  </g>
  <text x="925" y="530" text-anchor="middle" font-family="{SANS}" font-size="12" fill="#4a6a70">full body · swimming, tail free</text>

  <rect x="1040" y="250" width="140" height="140" fill="#ffffff" stroke="#b7c9cb"/>
  <g transform="translate(1048,262) scale(0.165) translate(-50,-90)">
    <g transform="{t["pose"]}"><use href="#bustChar" filter="url(#sil)"/></g>
  </g>
  <text x="1110" y="408" text-anchor="middle" font-family="{SANS}" font-size="12" fill="#4a6a70">bust silhouette</text>

  <text x="830" y="612" font-family="{SANS}" font-size="13" font-weight="700" letter-spacing="2" fill="{LINE}">PALETTE</text>
  <g font-family="{MONO}" font-size="11" fill="{BLACK}" text-anchor="middle">{swatches}</g>
  <text x="830" y="748" font-family="{SANS}" font-size="12" fill="#4a6a70">Canon: cotsc-praxis aqua-sheet. One shadow step per material;</text>
  <text x="830" y="764" font-family="{SANS}" font-size="12" fill="#4a6a70">cyan rim light on the right; eye blue kept from the canon.</text>
</svg>
'''

import sys
for k in (sys.argv[1:] or TAKES):
    open(f"{OUT}\\aqua-{k}.svg", "w", encoding="utf8").write(sheet(k, TAKES[k]))
