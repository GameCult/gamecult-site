"""Round 2 cast portraits. Key read from F:/Projects/bfl-api.txt inside this process only; never printed or written."""
import json, time, urllib.request, urllib.error, io, sys, datetime, pathlib, concurrent.futures as cf
from PIL import Image

REC = pathlib.Path(r"F:/Projects/gamecult-site-wt-portraits/cast-portraits/r2")
ORIG = pathlib.Path(r"F:/Projects/cast-art-originals/r2")
ENDPOINT = "https://api.bfl.ai/v1/flux-3-image"

STYLE_T = (
    "Character portrait for a game cast lineup: a bust, head and shoulders cropped at mid-chest by the bottom edge of the frame, "
    "the character in three-quarter view turned toward the right side of the frame, the head centred horizontally with its top a small margin "
    "below the top edge, the same crop and scale for every character. "
    "Super-deformed chibi proportions: the character is {N} heads tall in total, so the head is very large compared with the small shoulders and narrow torso. "
    "Clean 2D anime illustration drawn to be traced into vector art: one bold dark outline of even weight around the whole silhouette, "
    "thinner inner lines, flat cel shading with exactly one base tone and one shadow tone per material, light from the upper left. "
    "No gradients, no texture, no painterly blending, no glow halos, no pixel art, no 3D rendering. "
    "A limited palette of five or six flat colours taken from the character's key colours. Large expressive anime eyes with two white highlights. "
    "The background is one perfectly flat, uniform, solid bright chroma-key green from edge to edge: no gradient, no vignette, no floor, "
    "no cast shadow, no particles, no props or scenery behind the figure."
)
RATIO = {"r2a": "two", "r2b": "three"}

C = {}
C["libby"] = ("Libby, a cheerful young librarian-witch, warm and bookish: thick voluminous wavy hair in a deep dusky violet-lavender with a big swept side fringe, "
    "gathered into one loose, fat wavy braid that falls forward over her right shoulder; a white crossed-bone hair clip on the left side of her head; "
    "a dark purple ribbon bow with a mauve diamond pattern tied at the top of the braid. Round thin black-framed glasses, large grey-violet eyes, "
    "small gold drop earrings, pale skin with rosy cheeks, a big open-mouthed happy smile. She wears a high-collared black scholar's robe with wide sleeves, "
    "embroidered in gold and dusky mauve diamond and rune patterns, with a violet gem brooch in a gold setting at the collar. "
    "She hugs an old brown leather book with gold corners against her chest, a faint violet light along its page edges. Key colours: black and gold with violet.")
C["heimdall"] = ("Heimdall, a stern young gatekeeper: dark brown skin, a mop of messy dark brown curly hair with golden highlights, "
    "glowing golden amber eyes, a serious frown, one small gold earring. He wears a high-collared black coat with royal blue lapels and a royal blue cape "
    "trimmed in gold filigree, small blue gems on the shoulder armour, and a gold key-shaped clasp at the throat. "
    "He holds an ornate golden key raised beside his shoulder. Key colours: gold and cobalt blue.")
C["kiko"] = ("Kiko, an excitable fox-girl streamer: messy white shoulder-length hair, tall white fox ears with pink insides, "
    "a white kitsune fox mask with red and magenta markings worn pushed up on top of her head, black hair ornaments with gold bells and magenta tassels, "
    "bright cyan eyes, a wide open-mouthed grin with one small fang, one hand raised in a wave. "
    "She wears a black kimono-style jacket with magenta and teal trim and a gold bell at the collar. "
    "A fluffy white fox tail with pink tips curls up behind one shoulder. Key colours: magenta and cyan.")
C["aqua"] = ("Aqua, a cartoon goldfish DJ. He is a fish, so his whole body is in the frame instead of a bust: a round chubby goldfish with a golden-yellow face "
    "and an orange body covered in clearly drawn overlapping fish scales, big round blue eyes with white highlights, a small round fish mouth, "
    "no beak, no bill, no legs and no feet; a little orange crest fin on top of the head; large black over-ear studio headphones with cyan rings on the ear cups. "
    "Bright orange pectoral fins, one raised, and a flowing forked orange tail fin. Key colours: orange and cyan.")
C["weksa"] = ("Weksa, a tomboyish young woman, an adventurous field archaeologist in the Indiana Jones mould: warm brown skin, a confident lopsided grin, "
    "a smudge of dust on one cheek, messy dark brown shoulder-length hair tied partly up in a topknot with turquoise and amber beads and small feathers, "
    "large round gold-rimmed glasses, warm amber-brown eyes, dangling turquoise earrings. She wears a cream linen robe with teal embroidered trim, "
    "its sleeves rolled up to the elbows, over a weathered brown leather vest, with beaded necklaces and wooden bead bracelets and a leather strap across her chest; "
    "a battered brown leather backpack stuffed with rolled scrolls and a small carved idol shows behind one shoulder. "
    "She holds up a small paper card with a hand-drawn glyph between two fingers. No hat. Key colours: teal and amber on earthy browns.")
C["nibu"] = ("Nibu, a quiet, serious worldbuilder girl: very long pale lavender hair with a swept side fringe, "
    "a pink hair clip on the left shaped like a small data connector plug, a short rectangular plug body with a round pink bead at each end; "
    "a large pink ribbon bow on the right, half-lidded violet eyes, a calm unsmiling expression, arms folded. "
    "Wears a sleeveless lilac blouse with a frilled collar, detached dark purple sleeves with circuit-pattern embroidery, "
    "a small cyan ring device on the shoulder, and a long dark purple coat. Key colours: violet and pink with a cyan accent.")
C["eureka"] = ("Eureka, a neon-noir bug hunter: a young woman with messy shoulder-length black hair with one bright orange streak in the fringe, "
    "sharp focused blue-grey eyes, a slight knowing smile. She wears a dark charcoal trenchcoat with the hood up, framing her face, and a high collar; "
    "the hood's edge and the coat's seams are piped with ember-orange lines, over tactical gear: chest straps, buckles and pouches. "
    "Fingerless gloves; she holds a slim orange metal probe. Key colour: ember orange.")
C["void"] = ("Void, a small hooded shadow figure: a deep indigo-violet robe with a large pointed hood, the face inside the hood completely black "
    "with no features except two tall white glowing oval eyes, a thick bright orange scarf wrapped around the neck with frayed ends trailing to one side, "
    "dark gloved hands. Key colours: indigo violet and orange.")

HYP = {
 "r2a": ("Consistency: one shared style block, byte-identical across all eight prompts, states the proportions as an explicit head count "
         "(two heads tall) instead of the bare word chibi that failed in round 1, and fixes framing, line, shading, palette rule and a flat "
         "chroma-key green ground for a deterministic cutout. Per-character text describes only the character."),
 "r2b": ("Same as r2a with one variable changed: the figure is three heads tall instead of two, testing whether a milder, more achievable "
         "ratio is followed more uniformly across the cast."),
}
VAR = {"r2a": "Batch A baseline: shared style block with ratio two heads tall, then the character block.",
       "r2b": "Ratio only: 'two heads tall' became 'three heads tall' in the shared block, against the same character's r2a. Character block identical."}

NAMES = ["libby", "heimdall", "kiko", "aqua", "weksa", "nibu", "eureka", "void"]
JOBS = [(n, s) for s in ("r2a", "r2b") for n in NAMES]

def prompt_for(n, suf):
    return STYLE_T.format(N=RATIO[suf]) + "\n\n" + C[n]

def req(url, key, data=None):
    r = urllib.request.Request(url, data=json.dumps(data).encode() if data else None,
        headers={"x-key": key, "Content-Type": "application/json", "accept": "application/json"})
    return json.load(urllib.request.urlopen(r, timeout=60))

def run(job, key):
    n, suf = job
    d = REC / n; d.mkdir(parents=True, exist_ok=True)
    png = ORIG / f"{n}-{suf}.png"
    if png.exists():
        return f"{n}-{suf}: exists, skipped"
    prompt = prompt_for(n, suf)
    try:
        j = req(ENDPOINT, key, {"prompt": prompt, "aspect_ratio": "4:5", "resolution": "2k"})
    except urllib.error.HTTPError as e:
        return f"{n}-{suf}: submit HTTP {e.code} {e.read()[:300]!r}"
    rid, poll = j.get("id"), j.get("polling_url")
    for _ in range(240):
        time.sleep(6)
        try: s = req(poll, key)
        except Exception: continue
        st = s.get("status")
        if st == "Ready":
            raw = urllib.request.urlopen(s["result"]["sample"], timeout=120).read()
            im = Image.open(io.BytesIO(raw)); fmt = im.format; im.save(png, "PNG")
            txt = (f"# {n.capitalize()} {suf}\n\n## Hypothesis\n\n{HYP[suf]}\n\n## Variable changed\n\n{VAR[suf]}\n\n"
                   f"## Render record\n\n- Model: FLUX 3 Image, `POST {ENDPOINT}`\n"
                   f"- Parameters: aspect_ratio 4:5, resolution 2k, safety_tolerance default, grounding default; no seed field; "
                   f"rendered from scratch with no reference image or edit\n- Output: {im.size[0]}x{im.size[1]}, source format {fmt}; "
                   f"2k original kept out of git at F:/Projects/cast-art-originals/r2/{n}-{suf}.png\n"
                   f"- Committed: {n}-{suf}.webp (lossless, 1024 px long side) and {n}-{suf}-cutout.png (transparent, 1024 px long side)\n"
                   f"- Request id: {rid}\n- Date: {datetime.date.today().isoformat()}\n"
                   f"- Composition: shared style block (byte-identical within the batch), blank line, character block\n\n"
                   f"## Prompt\n\n{prompt}\n")
            (d / f"{n}-{suf}.txt").write_text(txt, encoding="utf-8")
            return f"{n}-{suf}: Ready {im.size}"
        if st in ("Error", "Failed", "Content Moderated", "Request Moderated", "Task not found"):
            return f"{n}-{suf}: {st} {str(s)[:200]}"
    return f"{n}-{suf}: timeout"

if __name__ == "__main__":
    key = pathlib.Path(r"F:/Projects/bfl-api.txt").read_text().strip()
    only = sys.argv[1:]
    jobs = [j for j in JOBS if not only or f"{j[0]}-{j[1]}" in only]
    with cf.ThreadPoolExecutor(max_workers=6) as ex:
        for r in ex.map(lambda j: run(j, key), jobs):
            print(r, flush=True)
    print("DONE", flush=True)
