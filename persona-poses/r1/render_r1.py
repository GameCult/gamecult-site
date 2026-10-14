"""Round 1 pose sheets. Key read from F:/Projects/bfl-api.txt inside this process only; never printed, logged or written.

Per-character blocks are taken verbatim from the canon bust records (the .txt beside each canon render),
not retyped. Usage: py -3 render_r1.py [libby-r1a ...]   (no args = all 16)
"""
import json, time, urllib.request, urllib.error, urllib.parse, io, sys, datetime, pathlib, base64, concurrent.futures as cf
from PIL import Image

CANON = pathlib.Path(r"F:/Projects/gamecult-site-wt-portraits/cast-portraits")
REC = pathlib.Path(__file__).parent
ORIG = pathlib.Path(r"F:/Projects/cast-art-originals/poses-r1")
ENDPOINT = "https://api.bfl.ai/v1/flux-3-image"
NAMES = ["libby", "heimdall", "kiko", "aqua", "weksa", "nibu", "eureka", "void"]
BUST = {"libby": "r2/libby/libby-r2a", "heimdall": "r2/heimdall/heimdall-r2a", "kiko": "r2/kiko/kiko-r2a",
        "aqua": "r4/aqua/aqua-r4a", "weksa": "r2/weksa/weksa-r2a", "nibu": "r3/nibu/nibu-r3a",
        "eureka": "r2/eureka/eureka-r2a", "void": "r3/void/void-r3a"}
BUST_ORIG = {"libby": "r2/libby-r2a", "heimdall": "r2/heimdall-r2a", "kiko": "r2/kiko-r2a", "aqua": "r4/aqua-r4a",
             "weksa": "r2/weksa-r2a", "nibu": "r3/nibu-r3a", "eureka": "r2/eureka-r2a", "void": "r3/void-r3a"}

# The busts' batch-A shared style block (two heads tall), exactly as the canon records carry it.
STYLE_BUST = (
    "Character portrait for a game cast lineup: a bust, head and shoulders cropped at mid-chest by the bottom edge of the frame, "
    "the character in three-quarter view turned toward the right side of the frame, the head centred horizontally with its top a small margin "
    "below the top edge, the same crop and scale for every character. "
    "Super-deformed chibi proportions: the character is two heads tall in total, so the head is very large compared with the small shoulders and narrow torso. "
    "Clean 2D anime illustration drawn to be traced into vector art: one bold dark outline of even weight around the whole silhouette, "
    "thinner inner lines, flat cel shading with exactly one base tone and one shadow tone per material, light from the upper left. "
    "No gradients, no texture, no painterly blending, no glow halos, no pixel art, no 3D rendering. "
    "A limited palette of five or six flat colours taken from the character's key colours. Large expressive anime eyes with two white highlights. "
    "The background is one perfectly flat, uniform, solid bright chroma-key green from edge to edge: no gradient, no vignette, no floor, "
    "no cast shadow, no particles, no props or scenery behind the figure."
)
CROP_BUST = ("a bust, head and shoulders cropped at mid-chest by the bottom edge of the frame, "
             "the character in three-quarter view turned toward the right side of the frame, the head centred horizontally with its top a small margin "
             "below the top edge, the same crop and scale for every character. ")
CROP_SHEET = ("a sheet of twelve cells, each cell a bust, head and shoulders cropped at mid-chest by the bottom edge of the cell, "
              "the character in three-quarter view turned toward the right side of the cell, the head centred horizontally in the cell with its top a small margin "
              "below the top edge of the cell, the same crop and scale in every cell. ")
STYLE = STYLE_BUST.replace("Character portrait for a game cast lineup: " + CROP_BUST, "Character expression sheet for a game cast lineup: " + CROP_SHEET)
assert STYLE != STYLE_BUST and "twelve cells" in STYLE
SHEET = ("The sheet is a grid of four columns by three rows, twelve cells of the same character in reading order, left to right and top to bottom, "
         "separated by generous empty padding of the same flat green, with no frames, no borders, no divider lines, no labels and no text. "
         "Every cell shows the same character with the same design, colours and proportions; the cell description sets that cell's expression and pose, "
         "and the character description below gives the design.")
REF = ("Image 1 is the character's canon bust. The character must look exactly like the character in image 1 "
       "(same design, colours, proportions and line style) in every cell.")

CORE = [("neutral", "a calm neutral expression, mouth closed, looking ahead"),
        ("happy", "a broad happy smile with bright eyes"),
        ("amused", "an amused smirk with one eyebrow raised, a stifled laugh"),
        ("thinking", "a thoughtful expression, eyes looking up and aside, one hand raised to the chin"),
        ("concerned", "a concerned expression, brows drawn together and tilted up, a small worried frown"),
        ("annoyed", "an annoyed expression, flat half-lidded eyes, a pursed frown"),
        ("surprised", "a surprised expression, wide eyes, mouth open in an O"),
        ("determined", "a determined expression, narrowed eyes, a firm set mouth, a small nod")]
SIG = {
 "libby": [("stamp", "stamping a library due-date stamp down onto a book with a cheerful thump"),
           ("research", "peering closely at an open old book held in both hands"),
           ("shush", "one finger raised to her lips in a shushing gesture"),
           ("schema", "holding up a glowing violet diagram of boxes and arrows, explaining")],
 "heimdall": [("badge", "holding up a gold badge of authority toward the viewer"),
              ("barrier", "one palm raised forward, projecting a blue barrier"),
              ("protect", "stepping forward with his cape swept out in front, shielding someone behind him"),
              ("revoke", "pointing the golden key downward with a sharp cross-out gesture of the other hand, revoking access")],
 "kiko": [("tinker", "tinkering with a small gadget, tongue out in concentration"),
          ("confetti", "throwing confetti into the air, cheering"),
          ("sprint", "leaning forward as if sprinting, hair and tail streaming backward"),
          ("debug", "squinting through a magnifying lens at a tiny bug held between two fingers")],
 "aqua": [("conduct", "conducting with a raised pectoral fin like a baton"),
          ("listen", "one fin pressed to a headphone ear cup, eyes closed, listening"),
          ("patch", "plugging a cyan patch cable into a jack"),
          ("flourish", "a showy DJ flourish with both fins spread wide")],
 "weksa": [("map", "unrolling a map scroll and studying it"),
           ("fieldwork", "brushing dust off a small relic with a soft brush"),
           ("argue", "arguing, one finger jabbed forward, mouth open mid-sentence"),
           ("interlingua", "holding two glyph cards side by side, comparing their meanings")],
 "nibu": [("console", "typing on a small floating console panel"),
          ("glitch", "her face and hair split by a few horizontally offset slices, as if glitching"),
          ("lore", "reciting lore with eyes closed and one hand open before her"),
          ("triumph", "a quiet triumphant smile with one fist lightly raised")],
 "eureka": [("probe", "pointing the orange probe forward"),
            ("inspect", "leaning in with narrowed eyes to inspect something closely"),
            ("report", "presenting a thin tablet showing a report"),
            ("hood", "the hood pulled low, shadowing her eyes, only a knowing smirk visible")],
 "void": [("welcome", "arms opened wide in welcome"),
          ("document", "holding up a sheet of paper, a document"),
          ("point", "pointing one gloved finger forward"),
          ("unimpressed", "unimpressed, the eyes flat narrow slits, the head tilted")],
}
VOID_CORE = [("neutral", "a calm neutral look, the two tall white oval eyes at rest"),
             ("happy", "happy, the white eyes curved into bright upturned crescents"),
             ("amused", "amused, one white eye narrower than the other, the hood tilted slightly"),
             ("thinking", "thoughtful, the white eyes looking up and aside, one gloved hand raised to the hood"),
             ("concerned", "concerned, the white eyes tilted inward and upward, the hood drooping slightly"),
             ("annoyed", "annoyed, the white eyes flat half-closed slits"),
             ("surprised", "surprised, the white eyes wide round circles, the hood rising"),
             ("determined", "determined, the white eyes narrowed and angled inward, the hood set forward")]

def cells_for(n):
    return (VOID_CORE if n == "void" else CORE) + SIG[n]

def canon_block(n):
    t = (CANON / (BUST[n] + ".txt")).read_text(encoding="utf-8").replace("\r\n", "\n")
    body = t.split("## Prompt\n\n", 1)[1].strip()
    style, block = body.split("\n\n", 1)
    assert style == STYLE_BUST, f"{n}: canon style block differs from batch A"
    return block.strip()

def prompt_for(n, suf):
    cells = " ".join(f"Cell {i + 1} ({l}): {d}." for i, (l, d) in enumerate(cells_for(n)))
    p = STYLE + "\n\n" + SHEET + "\n\n" + canon_block(n) + "\n\n" + cells
    return (REF + "\n\n" + p) if suf == "r1b" else p

def ref_image(n):
    cut = Image.open(CANON / (BUST[n] + "-cutout.png")).convert("RGBA")
    o = Image.open(pathlib.Path(r"F:/Projects/cast-art-originals") / (BUST_ORIG[n] + ".png")).convert("RGB")
    px = [o.getpixel(p) for p in ((4, 4), (o.width - 5, 4))]
    g = tuple(sum(c[i] for c in px) // 2 for i in range(3))
    bg = Image.new("RGB", cut.size, g); bg.paste(cut, (0, 0), cut)
    b = io.BytesIO(); bg.save(b, "PNG")
    return base64.b64encode(b.getvalue()).decode(), g

HYP = {"r1a": "A sheet keeps the character consistent across twelve cells from the prompt alone: the busts' shared style block adapted for a sheet, the canon character block verbatim, and twelve short cell descriptions.",
       "r1b": "Adding the canon bust as a reference image holds canon details the prompt alone drifts on, without pulling every cell into the bust's pose."}
VAR = {"r1a": "Baseline: prompt only, no reference image.",
       "r1b": "Against the same character's r1a: the canon bust cutout on its chroma green is passed as `images` and cited as image 1 by one clause prepended to the prompt. Nothing else differs."}

def req(url, key, data=None):
    r = urllib.request.Request(url, data=json.dumps(data).encode() if data else None,
        headers={"x-key": key, "Content-Type": "application/json", "accept": "application/json"})
    return json.load(urllib.request.urlopen(r, timeout=60))

def run(job, key):
    n, suf = job
    d = REC / n; d.mkdir(parents=True, exist_ok=True); ORIG.joinpath(n).mkdir(parents=True, exist_ok=True)
    png = ORIG / n / f"{n}-{suf}.png"
    if png.exists():
        return f"{n}-{suf}: exists, skipped"
    prompt = prompt_for(n, suf)
    body = {"prompt": prompt, "aspect_ratio": "4:3", "resolution": "2k"}
    gdesc = ""
    if suf == "r1b":
        b64, g = ref_image(n); body["images"] = [b64]; gdesc = f"; reference ground rgb{g}"
    try:
        j = req(ENDPOINT, key, body)
    except urllib.error.HTTPError as e:
        return f"{n}-{suf}: submit HTTP {e.code} {e.read()[:400]!r}"
    except Exception as e:
        return f"{n}-{suf}: submit transport error {type(e).__name__}"
    rid, poll = j.get("id"), j.get("polling_url")
    cost = {k: j[k] for k in ("cost", "input_mp", "output_mp") if k in j}
    print(f"{n}-{suf}: submitted id {rid} poll host {urllib.parse.urlparse(poll or '').netloc} {cost}", flush=True)
    last = None
    for i in range(300):
        time.sleep(6)
        try: s = req(poll, key)
        except Exception as e:
            m = f"poll error {type(e).__name__} {getattr(e, 'code', '')}"
            if getattr(e, "code", 0) == 500:
                return f"{n}-{suf}: server-side error (HTTP 500) id {rid}"
            if m != last: print(f"{n}-{suf}: {m}", flush=True); last = m
            continue
        st = s.get("status")
        if st != last: print(f"{n}-{suf}: status {st} at {i * 6}s", flush=True); last = st
        if st == "Ready":
            raw = urllib.request.urlopen(s["result"]["sample"], timeout=120).read()
            im = Image.open(io.BytesIO(raw)); fmt = im.format; im.save(png, "PNG")
            ref = (f"- Reference: canon bust {BUST[n]}-cutout.png composited on its chroma green, base64 in `images`, cited as image 1{gdesc}\n"
                   if suf == "r1b" else "- Reference: none; rendered from scratch from the prompt alone\n")
            txt = (f"# {n.capitalize()} {suf}\n\n## Hypothesis\n\n{HYP[suf]}\n\n## Variable changed\n\n{VAR[suf]}\n\n"
                   f"## Render record\n\n- Model: FLUX 3 Image, `POST {ENDPOINT}`\n"
                   f"- Parameters: aspect_ratio 4:3, resolution 2k, safety_tolerance default, grounding default; no seed field\n{ref}"
                   f"- Output: {im.size[0]}x{im.size[1]}, source format {fmt}; 2k original kept out of git at "
                   f"F:/Projects/cast-art-originals/poses-r1/{n}/{n}-{suf}.png\n"
                   f"- Cost: about $0.10 per request (reported by API: {cost or 'nothing'})\n"
                   f"- Request id: {rid}\n- Date: {datetime.date.today().isoformat()}\n"
                   f"- Cell order: {', '.join(l for l, _ in cells_for(n))}\n\n"
                   f"## Prompt\n\n{prompt}\n")
            (d / f"{n}-{suf}.txt").write_text(txt, encoding="utf-8")
            return f"{n}-{suf}: Ready {im.size} id {rid}"
        if st in ("Error", "Failed", "Content Moderated", "Request Moderated", "Task not found"):
            return f"{n}-{suf}: {st} {str(s)[:200]}"
    return f"{n}-{suf}: timeout id {rid}"

if __name__ == "__main__":
    only = sys.argv[1:]
    if only == ["--dry"]:
        for n in NAMES:
            for s in ("r1a", "r1b"):
                p = prompt_for(n, s); print(n, s, len(p))
        print(prompt_for("void", "r1b")); sys.exit()
    key = pathlib.Path(r"F:/Projects/bfl-api.txt").read_text().strip()
    jobs = [(n, s) for n in NAMES for s in ("r1a", "r1b") if not only or f"{n}-{s}" in only]
    with cf.ThreadPoolExecutor(max_workers=int(__import__("os").environ.get("WORKERS", "4"))) as ex:
        for r in ex.map(lambda j: run(j, key), jobs):
            print(r, flush=True)
    print("DONE", flush=True)
