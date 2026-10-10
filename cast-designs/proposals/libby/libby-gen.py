# Writes libby-A/B/C.svg: three takes on Libby's canon design (lavender hair,
# round glasses, bone hairpin, diamond ribbon, dark violet robe).
# Paths are hand-authored; this script only assembles per-take variants.
import sys
OUT = r"C:\gc-wt\cast-designs\cast-designs\proposals\libby"

LINE = "#2a1d40"; KEY = "#a99be0"; KEYSH = "#7d6fc4"; KEYHI = "#d8d1f7"
ROBE = "#241a33"; ROBESH = "#150f20"; TRIM = "#8a6a9a"
SKIN = "#f6d6c4"; SKINSH = "#e6b4a0"; GOLD = "#c8a24a"; GOLDSH = "#957428"
GLOW = "#b77cff"; BONE = "#efe6d8"; BONESH = "#cfc2ae"

def backhair():
    return f'''
  <g id="backhair" stroke="{LINE}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
    <path d="M330 118 C200 116 110 200 106 320 C96 372 50 404 72 468 C88 512 36 540 54 604 C66 652 22 692 46 744 C54 764 44 782 38 790 L618 790 C628 770 644 740 628 700 C614 650 654 610 628 556 C610 516 640 466 608 416 C586 376 594 330 568 290 C548 190 452 118 330 118 Z" fill="{KEY}"/>
    <path d="M196 470 C226 560 206 690 226 790 L474 790 C484 690 462 560 486 470 Z" fill="{KEYSH}" stroke="none"/>
    <path d="M124 330 C114 420 130 470 114 540 C102 600 122 650 106 724 M156 440 C146 510 166 566 146 646 M564 330 C576 420 560 470 578 540 C590 600 570 660 584 730" fill="none" stroke="{KEYSH}" stroke-width="4"/>
    <path d="M578 520 C598 570 584 620 596 676" fill="none" stroke="{KEYHI}" stroke-width="4"/>
  </g>'''

def ribbon(scale, shift="0 0"):
    # diamond-patterned bow at the back of the head (screen left), canon
    return f'''
  <g id="ribbon" transform="translate({shift}) translate(160 205) scale({scale}) translate(-160 -205)" stroke="{LINE}" stroke-width="3" stroke-linejoin="round">
    <path d="M150 222 C120 290 108 360 98 432 L122 420 L134 448 C140 370 152 296 166 226 Z" fill="{ROBE}"/>
    <path d="M160 204 C112 146 52 140 46 186 C42 222 104 232 160 214 Z" fill="{ROBE}"/>
    <path d="M160 210 C104 224 66 262 84 292 C102 316 142 262 164 220 Z" fill="{ROBE}"/>
    <path d="M60 190 C66 170 96 168 120 182" fill="none" stroke="{KEY}" stroke-width="3"/>
    <path d="M86 186 l10 -10 l10 10 l-10 10 Z M104 252 l9 -9 l9 9 l-9 9 Z M124 340 l8 -8 l8 8 l-8 8 Z" fill="none" stroke="{TRIM}" stroke-width="3"/>
    <circle cx="162" cy="210" r="15" fill="{ROBE}"/>
    <path d="M156 204 l6 -6 l6 6 l-6 6 Z" fill="{GOLD}" stroke="none"/>
  </g>'''

def hairpin(scale, at="222 214"):
    bone = f'<path d="M-30 -5 C-38 -14 -50 -8 -44 0 C-50 8 -38 14 -30 5 L30 5 C38 14 50 8 44 0 C50 -8 38 -14 30 -5 Z" fill="{BONE}"/>'
    return f'''
  <g id="hairpin" transform="translate({at}) scale({scale}) rotate(-12)" stroke="{LINE}" stroke-width="3" stroke-linejoin="round">
    <g transform="rotate(35)">{bone}</g>
    <g transform="rotate(-35)">{bone}</g>
    <path d="M-20 -4 L20 -4" stroke="{BONESH}" stroke-width="2" transform="rotate(-35)"/>
  </g>'''

def eyes(kind):
    """kind: 'bright' (found it), 'arch' (specimen: far brow up), 'wink' (quiet please: far eye shut)"""
    near_shape = "M226 420 C244 394 302 390 328 412 L326 476 C306 494 260 496 238 484 Z"
    far_shape = "M378 414 C394 398 430 398 448 414 L447 474 C434 488 398 490 384 478 Z"
    def iris(clip, shape, cx, rx, ry, hx, hy, h2x, h2y):
        dx = rx * (1 - ((436 - 448) / ry) ** 2) ** 0.5
        return f'''
    <clipPath id="{clip}"><path d="{shape}"/></clipPath>
    <path d="{shape}" fill="#ffffff"/>
    <g clip-path="url(#{clip})">
      <ellipse cx="{cx}" cy="448" rx="{rx}" ry="{ry}" fill="#6a64a0" stroke="{LINE}" stroke-width="3"/>
      <path d="M{cx-dx:.1f} 436 A{rx} {ry} 0 0 1 {cx+dx:.1f} 436 Q{cx} 450 {cx-dx:.1f} 436 Z" fill="{LINE}" opacity="0.85"/>
      <path d="M{cx-rx+8} 474 C{cx-rx+18} 494 {cx+rx-18} 494 {cx+rx-8} 474 C{cx+rx-20} 484 {cx-rx+20} 484 {cx-rx+8} 474 Z" fill="#bdb6ec"/>
      <ellipse cx="{cx+1}" cy="452" rx="{int(rx*0.38)}" ry="{int(ry*0.45)}" fill="{LINE}"/>
    </g>
    <ellipse cx="{hx}" cy="{hy}" rx="{int(rx*0.34)}" ry="{int(ry*0.3)}" fill="#fff"/>
    <circle cx="{h2x}" cy="{h2y}" r="{max(4,int(rx*0.16))}" fill="#fff"/>'''
    s = iris("eyeN", near_shape, 282, 35, 47, 268, 430, 300, 470)
    s += f'''
    <path d="M220 428 C238 394 300 386 334 412" fill="none" stroke="{LINE}" stroke-width="8" stroke-linecap="round"/>
    <path d="M222 424 L206 414 L224 418 Z M228 412 L214 398 L232 406 Z" fill="{LINE}" stroke="{LINE}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M242 486 C264 496 302 494 320 480" fill="none" stroke="{LINE}" stroke-width="2.5" stroke-linecap="round"/>'''
    if kind == "wink":
        s += f'''
    <path d="M378 452 C394 428 430 428 450 450" fill="none" stroke="{LINE}" stroke-width="7" stroke-linecap="round"/>
    <path d="M448 446 L462 440 L452 454 Z" fill="{LINE}" stroke="{LINE}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M384 462 C398 470 426 470 440 462" fill="none" stroke="{LINE}" stroke-width="2" stroke-linecap="round" opacity="0.6"/>'''
    else:
        s += iris("eyeF", far_shape, 412, 27, 46, 402, 430, 422, 470)
        s += f'''
    <path d="M374 418 C392 394 432 392 452 414" fill="none" stroke="{LINE}" stroke-width="7" stroke-linecap="round"/>
    <path d="M450 412 L464 404 L455 418 Z" fill="{LINE}" stroke="{LINE}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M388 482 C404 490 428 490 440 480" fill="none" stroke="{LINE}" stroke-width="2.5" stroke-linecap="round"/>'''
    return s

def brows(kind):
    if kind == "bright":
        n, f = "M248 366 C266 354 296 352 314 360", "M386 352 C402 342 426 342 440 352"
    elif kind == "arch":
        n, f = "M250 372 C268 366 296 366 314 372", "M384 344 C398 326 426 324 442 338"
    else:
        n, f = "M250 370 C268 362 296 362 314 368", "M386 368 C402 362 426 362 440 370"
    return f'<path d="{n}" fill="none" stroke="#6c5fb0" stroke-width="5" stroke-linecap="round"/><path d="{f}" fill="none" stroke="#6c5fb0" stroke-width="5" stroke-linecap="round"/>'

def mouth(kind):
    if kind == "bright":
        return f'''<path d="M326 500 C342 494 372 492 388 498 C384 528 336 532 326 500 Z" fill="#8c3c4c" stroke="{LINE}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M340 518 C350 510 368 510 376 518 C366 524 348 524 340 518 Z" fill="#e0707a"/>
    <path d="M330 500 L384 498 L382 504 L332 506 Z" fill="#ffffff"/>'''
    if kind == "arch":
        return f'<path d="M330 506 C342 512 360 511 374 500" fill="none" stroke="{LINE}" stroke-width="3" stroke-linecap="round"/><path d="M374 500 l6 -3" stroke="{LINE}" stroke-width="2.5" stroke-linecap="round"/>'
    return f'<path d="M332 504 C344 512 362 512 376 502" fill="none" stroke="{LINE}" stroke-width="3" stroke-linecap="round"/>'

def headfront(kind):
    return f'''
  <g id="headfront" stroke-linejoin="round" stroke-linecap="round">
    <!-- face -->
    <path d="M172 300 C166 400 184 476 232 518 C268 548 312 562 350 561 C390 557 430 528 450 484 C462 456 470 430 470 398 C476 360 472 330 464 296 Z" fill="{SKIN}" stroke="{LINE}" stroke-width="3"/>
    <path d="M452 404 C466 452 452 500 412 540 C440 514 456 472 448 432 Z" fill="{SKINSH}"/>
    <clipPath id="faceclip"><path d="M172 300 C166 400 184 476 232 518 C268 548 312 562 350 561 C390 557 430 528 450 484 C462 456 470 430 470 398 C476 360 472 330 464 296 Z"/></clipPath>
    <path clip-path="url(#faceclip)" transform="translate(-3 11)" d="M200 162 C282 136 424 148 482 228 C506 268 512 320 522 360 C530 396 570 418 594 396 C604 386 600 368 588 366 C592 382 580 396 560 396 C540 396 524 392 510 398 C496 380 478 358 460 344 C458 364 456 386 452 404 C430 380 404 346 380 330 C384 356 382 376 378 394 C356 368 330 336 304 318 C308 340 304 362 300 378 C280 352 252 326 230 318 C224 282 200 252 188 240 C178 210 184 178 200 162 Z" fill="{SKINSH}"/>
    <path d="M454 440 C460 470 452 500 432 526" fill="none" stroke="{KEY}" stroke-width="4"/>
    <!-- near ear with gold drop -->
    <path d="M186 410 C164 398 152 424 160 448 C166 466 180 472 194 462 Z" fill="{SKIN}" stroke="{LINE}" stroke-width="3"/>
    <path d="M178 426 C170 432 172 446 180 452" fill="none" stroke="{SKINSH}" stroke-width="3"/>
    <circle cx="170" cy="474" r="5" fill="{GOLD}" stroke="{LINE}" stroke-width="2"/>
    <path d="M170 480 L176 492 L170 504 L164 492 Z" fill="{GOLD}" stroke="{LINE}" stroke-width="2"/>
    <!-- blush -->
    <ellipse cx="262" cy="508" rx="26" ry="9" fill="#f29aa6" opacity="0.5"/>
    <ellipse cx="428" cy="506" rx="16" ry="8" fill="#f29aa6" opacity="0.5"/>
    <path d="M250 504 l6 -8 M262 506 l6 -8 M274 506 l6 -8" stroke="#dd7f8c" stroke-width="2" opacity="0.75"/>
    {eyes(kind)}
    <!-- nose and mouth -->
    <path d="M362 470 L367 480 L360 482" fill="none" stroke="#c98a76" stroke-width="2.5" stroke-linecap="round"/>
    {mouth(kind)}
    <!-- round glasses, thin dark frames -->
    <g fill="none" stroke="{LINE}">
      <path d="M224 436 L184 424" stroke-width="4"/>
      <circle cx="280" cy="444" r="58" stroke-width="4.5"/>
      <ellipse cx="413" cy="442" rx="43" ry="56" stroke-width="4.5"/>
      <path d="M338 440 C350 430 360 430 370 438" stroke-width="4.5"/>
      <path d="M246 404 C256 394 268 390 280 390" stroke="#ffffff" stroke-width="5" opacity="0.75"/>
      <path d="M392 398 C398 392 406 390 412 390" stroke="#ffffff" stroke-width="4" opacity="0.75"/>
    </g>
    <!-- side lock tucked behind the ear -->
    <path d="M190 236 C170 280 166 330 174 392 C178 408 188 418 198 418 C194 380 204 332 232 316 Z" fill="{KEY}" stroke="{LINE}" stroke-width="3"/>
    <!-- long front lock over the far shoulder -->
    <path d="M468 300 C500 346 502 402 488 452 C476 502 502 544 498 594 C494 644 518 684 508 724 C544 686 536 644 540 602 C544 552 522 502 530 452 C538 392 522 334 492 286 Z" fill="{KEY}" stroke="{LINE}" stroke-width="3.5"/>
    <path d="M498 330 C514 380 512 420 506 456 C500 500 520 540 516 590" fill="none" stroke="{KEYSH}" stroke-width="3.5"/>
    <path d="M532 470 C536 520 528 560 534 610" fill="none" stroke="{KEYHI}" stroke-width="4"/>
    <!-- swept fringe, parted at the back, hooking into the canon curl at the front -->
    <path d="M200 162 C282 136 424 148 482 228 C506 268 512 320 522 360 C530 396 570 418 594 396 C604 386 600 368 588 366 C592 382 580 396 560 396 C540 396 524 392 510 398 C496 380 478 358 460 344 C458 364 456 386 452 404 C430 380 404 346 380 330 C384 356 382 376 378 394 C356 368 330 336 304 318 C308 340 304 362 300 378 C280 352 252 326 230 318 C224 282 200 252 188 240 C178 210 184 178 200 162 Z" fill="{KEY}" stroke="{LINE}" stroke-width="3.5"/>
    <path d="M236 200 C306 176 386 182 446 214 L440 230 C384 202 306 198 242 216 Z" fill="{KEYHI}"/>
    <path d="M300 168 C322 230 334 290 352 360 M382 174 C410 240 420 300 426 372 M250 192 C270 240 280 290 290 340 M454 210 C484 270 500 330 520 380" fill="none" stroke="{KEYSH}" stroke-width="3.5"/>
    <path d="M492 260 C510 300 514 340 520 376" fill="none" stroke="{KEYHI}" stroke-width="4"/>
    {brows(kind)}
  </g>'''

def body():
    return f'''
  <g id="bustbody" stroke="{LINE}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
    <path d="M314 530 L314 600 L384 600 L380 530 Z" fill="{SKIN}"/>
    <path d="M314 538 C338 560 362 560 382 546 L383 580 L315 584 Z" fill="{SKINSH}" stroke="none"/>
    <path d="M92 790 C96 700 148 650 240 628 L300 610 L402 610 L472 628 C554 650 604 700 614 790 Z" fill="{ROBE}"/>
    <path d="M470 640 C540 662 584 704 592 790 L614 790 C604 700 554 650 472 628 Z" fill="{ROBESH}" stroke="none"/>
    <path d="M530 660 C580 690 604 734 610 790" fill="none" stroke="{KEY}" stroke-width="4"/>
    <path d="M130 700 C150 670 190 648 236 636" fill="none" stroke="{TRIM}" stroke-width="3"/>
    <!-- standing collar -->
    <path d="M290 620 C286 592 296 572 314 564 L386 564 C404 572 412 592 410 622 L350 654 Z" fill="{ROBE}"/>
    <path d="M300 612 C300 596 306 584 316 578 L384 578 C394 584 400 596 400 612" fill="none" stroke="{TRIM}" stroke-width="3"/>
    <path d="M350 668 L338 790" fill="none" stroke="{TRIM}" stroke-width="7"/>
    <path d="M350 668 L338 790" fill="none" stroke="{LINE}" stroke-width="1.5"/>
    <path d="M190 724 l14 -14 l14 14 l-14 14 Z M486 724 l14 -14 l14 14 l-14 14 Z" fill="none" stroke="{TRIM}" stroke-width="3"/>
    <path d="M204 724 l0 0" fill="none"/>
    <!-- brooch -->
    <circle cx="350" cy="652" r="17" fill="{GOLD}"/>
    <circle cx="350" cy="652" r="9" fill="{GLOW}" stroke-width="2"/>
    <circle cx="347" cy="649" r="3" fill="#ffffff" stroke="none"/>
  </g>'''

# ---------- props, one per take ----------
def prop_tome():
    return f'''
  <g id="prop" stroke="{LINE}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
    <path d="M250 676 L232 640 M300 668 L292 626 M444 668 L452 626 M494 676 L512 640" fill="none" stroke="{GLOW}" stroke-width="4"/>
    <path d="M196 704 L372 712 L548 704 L552 784 L372 790 L192 784 Z" fill="{ROBE}"/>
    <path d="M196 704 L214 704 L212 722 L196 724 Z M548 704 L532 704 L534 722 L550 724 Z" fill="{GOLD}" stroke-width="2"/>
    <path d="M214 694 C268 672 322 674 372 694 L372 768 C322 750 268 748 214 768 Z" fill="{BONE}"/>
    <path d="M372 694 C424 674 478 672 532 694 L532 768 C478 748 424 750 372 768 Z" fill="{BONE}"/>
    <path d="M214 694 C268 672 322 674 372 694 L372 708 C322 690 268 690 214 708 Z" fill="{BONESH}" stroke="none"/>
    <g fill="none" stroke="{GLOW}" stroke-width="3">
      <path d="M240 716 L340 712 M240 732 L330 728 M240 748 L346 744 M402 712 L500 716 M398 728 L470 730"/>
      <rect x="440" y="726" width="36" height="30" transform="rotate(4 458 741)"/>
    </g>
    <!-- glyphs rising off the page -->
    <g fill="none" stroke="{GLOW}" stroke-width="4">
      <rect x="434" y="624" width="40" height="40" rx="5" transform="rotate(45 454 644)"/>
      <circle cx="454" cy="644" r="10"/>
      <path d="M262 664 l0 -16 M254 656 l16 0 M518 610 l0 -20 M508 600 l20 0" stroke-width="3"/>
    </g>
    <circle cx="454" cy="644" r="4" fill="#ffffff" stroke="none"/>
    <!-- hands -->
    <path d="M176 760 C172 732 190 716 212 718 C232 720 238 742 232 762 C226 782 182 784 176 760 Z" fill="{SKIN}"/>
    <path d="M568 760 C572 732 554 716 532 718 C512 720 506 742 512 762 C518 782 562 784 568 760 Z" fill="{SKIN}"/>
    <path d="M208 726 L222 744 M538 726 L522 744" stroke-width="2.5"/>
  </g>'''

def prop_stamp():
    return f'''
  <g id="prop" stroke="{LINE}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
    <path d="M498 790 C496 708 508 632 520 584 L612 580 C624 650 634 722 644 790 Z" fill="{ROBE}"/>
    <path d="M590 584 C604 650 616 720 626 790 L644 790 C634 722 624 650 612 580 Z" fill="{ROBESH}" stroke="none"/>
    <path d="M516 600 L616 594" fill="none" stroke="{TRIM}" stroke-width="7"/>
    <path d="M516 600 L616 594" fill="none" stroke-width="1.5"/>
    <g transform="rotate(10 566 500)">
      <!-- base and violet rubber face, shown to the viewer -->
      <path d="M522 556 L612 556 L612 590 L522 590 Z" fill="{GOLD}"/>
      <path d="M522 576 L612 576 L612 590 L522 590 Z" fill="{GOLDSH}" stroke="none"/>
      <path d="M516 590 L618 590 L618 606 L516 606 Z" fill="{GLOW}"/>
      <!-- handle -->
      <path d="M552 460 L580 460 L584 556 L548 556 Z" fill="{ROBE}"/>
      <path d="M546 456 L586 456 L586 470 L546 470 Z" fill="{GOLD}"/>
      <!-- the skull -->
      <path d="M534 432 C530 396 548 380 566 380 C584 380 602 396 598 432 C596 446 588 452 584 458 L548 458 C544 452 536 446 534 432 Z" fill="{BONE}"/>
      <path d="M584 392 C596 404 598 424 590 444 C588 450 586 454 584 458 L576 458 C590 440 592 412 584 392 Z" fill="{BONESH}" stroke="none"/>
      <ellipse cx="554" cy="424" rx="9" ry="10" fill="{LINE}"/>
      <ellipse cx="580" cy="424" rx="9" ry="10" fill="{LINE}"/>
      <path d="M566 434 L562 444 L570 444 Z" fill="{LINE}" stroke-width="1.5"/>
      <path d="M556 452 L556 458 M566 452 L566 458 M576 452 L576 458" stroke-width="2"/>
    </g>
    <!-- fist around the handle -->
    <path d="M520 520 C520 496 540 486 564 488 C588 490 600 504 598 528 C596 552 578 562 556 560 C534 558 520 544 520 520 Z" fill="{SKIN}"/>
    <path d="M532 534 C550 530 572 530 592 532 M534 548 C552 546 570 546 588 548" fill="none" stroke-width="2.2"/>
    <path d="M522 506 C538 494 572 494 592 506 C588 516 560 518 528 518 Z" fill="{SKIN}"/>
    <path d="M592 512 C598 530 594 548 582 556" fill="none" stroke="{SKINSH}" stroke-width="4"/>
    <g fill="{GLOW}" stroke="none"><path d="M630 470 l5 -14 l5 14 l14 5 l-14 5 l-5 14 l-5 -14 l-14 -5 Z"/><path d="M628 560 l3 -9 l3 9 l9 3 l-9 3 l-3 9 l-3 -9 l-9 -3 Z"/></g>
  </g>'''

def prop_shush():
    return f'''
  <g id="prop" stroke="{LINE}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
    <!-- wide sleeve crossing the chest -->
    <path d="M300 790 C304 704 322 626 336 576 L410 570 C430 640 450 716 466 790 Z" fill="{ROBE}"/>
    <path d="M390 572 C410 640 428 716 440 790 L466 790 C450 716 430 640 410 570 Z" fill="{ROBESH}" stroke="none"/>
    <path d="M334 588 L412 582" fill="none" stroke="{TRIM}" stroke-width="7"/>
    <path d="M334 588 L412 582" fill="none" stroke-width="1.5"/>
    <!-- hand, index finger to lips -->
    <path d="M334 562 C332 542 346 532 366 533 C388 534 400 546 398 566 C396 586 380 596 362 594 C344 592 336 580 334 562 Z" fill="{SKIN}"/>
    <path d="M384 540 C394 550 396 572 386 588 C380 592 372 594 362 594 C380 582 388 560 384 540 Z" fill="{SKINSH}" stroke="none"/>
    <path d="M350 544 C347 524 349 504 353 492 C357 482 369 482 371 492 C373 506 371 526 369 542 Z" fill="{SKIN}"/>
    <path d="M356 498 C358 492 366 492 368 498" fill="none" stroke="{SKINSH}" stroke-width="3"/>
    <path d="M346 556 C358 552 374 552 390 556 M344 572 C356 568 372 568 388 572" fill="none" stroke-width="2.2"/>
    <g fill="{GLOW}" stroke="none"><path d="M512 430 l5 -15 l5 15 l15 5 l-15 5 l-5 15 l-5 -15 l-15 -5 Z"/><path d="M546 360 l3 -9 l3 9 l9 3 l-9 3 l-3 9 l-3 -9 l-9 -3 Z"/><path d="M118 520 l3 -9 l3 9 l9 3 l-9 3 l-3 9 l-3 -9 l-9 -3 Z"/></g>
  </g>'''

# ---------- chibi bodies (2.5 heads; head drawn at scale 0.34) ----------
def chibi(take):
    base = f'''
    <path d="M112 186 L76 202 C58 262 48 340 36 404 L192 404 C180 340 170 262 150 202 Z" fill="{ROBE}"/>
    <path d="M132 200 L150 202 C170 262 180 340 192 404 L160 404 C150 330 144 260 132 200 Z" fill="{ROBESH}" stroke="none"/>
    <path d="M114 214 L112 404" fill="none" stroke="{TRIM}" stroke-width="4"/>
    <path d="M60 330 l8 -8 l8 8 l-8 8 Z M150 330 l8 -8 l8 8 l-8 8 Z" fill="none" stroke="{TRIM}" stroke-width="2"/>
    <path d="M70 404 C70 418 104 418 104 404 Z M124 404 C124 418 158 418 158 404 Z" fill="{ROBESH}"/>
    <path d="M96 190 C96 180 132 180 132 190 L130 206 L98 206 Z" fill="{ROBE}"/>
    <circle cx="114" cy="210" r="6" fill="{GOLD}"/>
    <circle cx="114" cy="210" r="3" fill="{GLOW}" stroke="none"/>'''
    left_hang = f'''
    <path d="M80 206 C58 236 46 272 42 304 L80 310 C82 278 90 250 100 228 Z" fill="{ROBE}"/>
    <circle cx="62" cy="314" r="10" fill="{SKIN}"/>'''
    if take == "A":
        arms = f'''
    <path d="M80 206 C62 230 56 254 58 272 L96 268 C94 250 96 232 100 222 Z" fill="{ROBE}"/>
    <path d="M148 206 C166 230 172 254 170 272 L132 268 C134 250 132 232 128 222 Z" fill="{ROBE}"/>
    <ellipse cx="114" cy="244" rx="80" ry="34" fill="{GLOW}" opacity="0.25" stroke="none"/>
    <path d="M58 262 L114 266 L170 262 L170 290 L114 294 L58 290 Z" fill="{ROBE}"/>
    <path d="M62 256 C82 248 100 250 114 258 L114 284 C100 276 82 276 62 284 Z M114 258 C128 250 146 248 166 256 L166 284 C146 276 128 276 114 284 Z" fill="{BONE}"/>
    <rect x="104" y="214" width="20" height="20" rx="2" transform="rotate(45 114 224)" fill="none" stroke="{GLOW}" stroke-width="3"/>
    <circle cx="58" cy="278" r="10" fill="{SKIN}"/><circle cx="170" cy="278" r="10" fill="{SKIN}"/>'''
    elif take == "B":
        arms = left_hang + f'''
    <path d="M146 208 C168 196 182 176 188 154 L170 146 C164 166 154 182 138 194 Z" fill="{ROBE}"/>
    <g transform="rotate(10 184 120)">
      <path d="M168 128 L200 128 L200 140 L168 140 Z" fill="{GOLD}"/>
      <path d="M166 140 L202 140 L202 146 L166 146 Z" fill="{GLOW}"/>
      <path d="M178 104 L190 104 L190 128 L178 128 Z" fill="{ROBE}"/>
      <path d="M172 92 C170 78 178 72 184 72 C190 72 198 78 196 92 C196 98 192 102 190 104 L178 104 C176 102 172 98 172 92 Z" fill="{BONE}"/>
      <circle cx="180" cy="90" r="3" fill="{LINE}" stroke="none"/><circle cx="189" cy="90" r="3" fill="{LINE}" stroke="none"/>
    </g>
    <circle cx="180" cy="150" r="10" fill="{SKIN}"/>'''
    else:
        arms = left_hang + f'''
    <path d="M146 208 C150 196 140 186 128 182 L118 196 C126 200 132 206 132 214 Z" fill="{ROBE}"/>
    <circle cx="122" cy="178" r="9" fill="{SKIN}"/>
    <path d="M120 172 L120 160" stroke="{SKIN}" stroke-width="5"/>'''
    return f'''
  <g id="chibibody" stroke="{LINE}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round">{base}{arms}
  </g>'''

TAKES = {
 "A": dict(name="THE GLOWING TOME", kind="bright", prop=prop_tome, rib=1.0, pin=1.0, frame="translate(66 6) scale(0.985)", label="BUST · FOUND IT",
           hook=["Hook: the swept lavender fringe that hooks into a curl,", "round glasses, and an open tome glowing up at her face."]),
 "B": dict(name="THE SKULL STAMP", kind="arch", prop=prop_stamp, rib=1.6, ribshift="-14 -40", pin=1.0, frame="translate(66 6) scale(0.985)", label="BUST · SPECIMEN",
           hook=["Hook: the black diamond ribbon, enlarged into a wing", "behind her head; the skull stamp raised as evidence."]),
 "C": dict(name="QUIET PLEASE", kind="wink", prop=prop_shush, rib=1.0, pin=1.5, pinat="196 168", frame="translate(14 -40) scale(1.13)", label="BUST · QUIET PLEASE",
           hook=["Hook: the crossed-bone hairpin, enlarged, on a close crop", "of hair and glasses; finger to lips, one eye shut."]),
}

def sheet(t):
    T = TAKES[t]
    sw = [(KEY, "hair key"), (LINE, "line"), (ROBE, "robe"), (SKIN, "skin"), (GOLD, "gold"), (GLOW, "glow")]
    swatches = "\n".join(
        f'  <rect x="{820+60*i}" y="660" width="52" height="52" fill="{c}" stroke="{LINE}" stroke-width="2"/><text x="{820+60*i}" y="728">{c}</text>'
        for i, (c, _) in enumerate(sw))
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
<!-- Libby, take {t}: {T["name"].title()}. Three takes on the canon design (cotsc-praxis character sheet). Hand-authored. -->
<defs>
  <filter id="outline" x="-10%" y="-10%" width="120%" height="120%">
    <feMorphology in="SourceAlpha" operator="dilate" radius="3.2" result="d"/>
    <feFlood flood-color="{LINE}"/>
    <feComposite in2="d" operator="in" result="o"/>
    <feMerge><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="sil" x="-10%" y="-10%" width="120%" height="120%">
    <feMorphology in="SourceAlpha" operator="dilate" radius="3.2" result="d"/>
    <feColorMatrix in="d" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"/>
  </filter>
  <radialGradient id="glow" cx="0.46" cy="0.45" r="0.62">
    <stop offset="0" stop-color="#2d2150"/>
    <stop offset="1" stop-color="#07111a"/>
  </radialGradient>
  <clipPath id="chest"><rect x="-200" y="-100" width="1100" height="890"/></clipPath>
  {backhair()}
  {ribbon(T["rib"], T.get("ribshift","0 0"))}
  {hairpin(T["pin"], T.get("pinat","222 214"))}
  {headfront(T["kind"])}
  {body()}
  {T["prop"]()}
  <g id="bust" clip-path="url(#chest)">
    <use href="#backhair"/><use href="#ribbon"/><use href="#bustbody"/><use href="#headfront"/><use href="#hairpin"/><use href="#prop"/>
  </g>
  {chibi(t)}
  <clipPath id="card"><path d="M58 14 L792 14 L752 786 L18 786 Z"/></clipPath>
</defs>
<rect width="1200" height="800" fill="#efeae0"/>
<path d="M58 14 L792 14 L752 786 L18 786 Z" fill="url(#glow)"/>
<g clip-path="url(#card)"><g transform="{T["frame"]}"><use href="#bust" filter="url(#outline)"/></g></g>
<path d="M58 14 L792 14 L752 786 L18 786 Z" fill="none" stroke="{KEY}" stroke-width="4"/>
<text x="78" y="44" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="{KEY}" letter-spacing="4">{T["label"]}</text>

<text x="820" y="40" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="{LINE}" letter-spacing="3">FULL BODY · 2.5 HEADS</text>
<g transform="translate(830 52)" filter="url(#outline)">
  <g transform="scale(0.34)"><use href="#backhair"/><use href="#ribbon"/></g>
  <use href="#chibibody"/>
  <g transform="scale(0.34)"><use href="#headfront"/><use href="#hairpin"/></g>
</g>

<text x="1050" y="40" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="{LINE}" letter-spacing="3">SILHOUETTE</text>
<g transform="translate(1040 54) scale(0.19)"><use href="#bust" filter="url(#sil)"/></g>
<g transform="translate(1078 230) scale(0.06)"><use href="#bust" filter="url(#sil)"/></g>
<text x="1050" y="300" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="#555">48 px</text>

<text x="820" y="540" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="700" fill="{LINE}">LIBBY · {t}</text>
<text x="820" y="570" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="{LINE}" letter-spacing="2">{T["name"]}</text>
<text font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#222"><tspan x="820" y="604">{T["hook"][0]}</tspan><tspan x="820" y="623">{T["hook"][1]}</tspan></text>
<g font-family="Consolas, 'Courier New', monospace" font-size="11" fill="#333">
{swatches}
</g>
<text x="820" y="760" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#555">hair key · line · robe · skin · gold · tome glow</text>
</svg>
'''

for t in (sys.argv[1:] or "ABC"):
    open(rf"{OUT}\libby-{t}.svg", "w", encoding="utf-8").write(sheet(t))
    print("wrote", t)
