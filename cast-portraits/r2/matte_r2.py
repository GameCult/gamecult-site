"""Deterministic chroma matte, web assets and contact sheets for round 2 (Pillow only).

Key: greenness = G - max(R, B). The ground colour is sampled from the four corners and must be
strongly green. Alpha ramps from opaque at greenness <= LO to transparent at >= HI, so enclosed
ground (between an arm and the body) is keyed too, not only ground connected to the corners.
Despill clamps G to max(R, B) inside a thin band around the edge only, so character greens stay.
A 0.8 px Gaussian feather softens the alpha edge.
"""
import pathlib, sys
from PIL import Image, ImageChops, ImageFilter, ImageDraw, ImageFont, ImageStat

ORIG = pathlib.Path(r"F:/Projects/cast-art-originals/r2")
REC = pathlib.Path(r"F:/Projects/gamecult-site-wt-portraits/cast-portraits/r2")
SCR = pathlib.Path(__file__).parent / "checks"
NAMES = ["libby", "heimdall", "kiko", "aqua", "weksa", "nibu", "eureka", "void"]
LO, HI = 40, 110

def greenness(im):
    r, g, b = im.split()
    return ImageChops.subtract(g, ImageChops.lighter(r, b))

def matte(im):
    im = im.convert("RGB")
    w, h = im.size
    gr = greenness(im)
    corners = [gr.crop(box) for box in ((0, 0, 24, 24), (w - 24, 0, w, 24))]
    cg = [ImageStat.Stat(c).mean[0] for c in corners]
    span = 255.0 / (HI - LO)
    a = gr.point(lambda v: 255 if v <= LO else (0 if v >= HI else int(255 - (v - LO) * span)))
    band = ImageChops.subtract(a.filter(ImageFilter.MaxFilter(7)), a.filter(ImageFilter.MinFilter(7)))
    band = band.point(lambda v: 255 if v > 0 else 0)
    r, g, b = im.split()
    g2 = Image.composite(ImageChops.darker(g, ImageChops.lighter(r, b)), g, band)
    a = a.filter(ImageFilter.GaussianBlur(0.8))
    out = Image.merge("RGBA", (r, g2, b, a))
    # ground flatness: std of RGB in top corners
    std = [round(max(ImageStat.Stat(im.crop(bx)).stddev), 1) for bx in ((0, 0, 64, 64), (w - 64, 0, w, 64))]
    # residual green: opaque-ish pixels that are still strongly green
    resid = ImageChops.multiply(greenness(out.convert("RGB")).point(lambda v: 255 if v > 60 else 0), a.point(lambda v: 255 if v > 128 else 0))
    rc = sum(resid.histogram()[255:])
    return out, cg, std, rc

def fit(im, long_side=1024):
    w, h = im.size; s = long_side / max(w, h)
    return im.resize((round(w * s), round(h * s)), Image.LANCZOS)

def checker(size, dark):
    a, b = ((40, 40, 40), (70, 70, 70)) if dark else ((235, 235, 235), (205, 205, 205))
    c = Image.new("RGB", size, a); d = ImageDraw.Draw(c); t = 24
    for y in range(0, size[1], t):
        for x in range((y // t % 2) * t, size[0], 2 * t):
            d.rectangle([x, y, x + t - 1, y + t - 1], fill=b)
    return c

def font(sz):
    for f in ("C:/Windows/Fonts/consola.ttf", "C:/Windows/Fonts/arial.ttf"):
        try: return ImageFont.truetype(f, sz)
        except OSError: pass
    return ImageFont.load_default()

def process(suf):
    SCR.mkdir(exist_ok=True)
    cut = {}
    for n in NAMES:
        src = ORIG / f"{n}-{suf}.png"
        if not src.exists():
            print(f"{n}-{suf}: missing"); continue
        im = Image.open(src)
        out, cg, std, rc = matte(im)
        d = REC / n; d.mkdir(parents=True, exist_ok=True)
        fit(im.convert("RGB")).save(d / f"{n}-{suf}.webp", "WEBP", lossless=True, quality=100, method=6)
        c = fit(out); c.save(d / f"{n}-{suf}-cutout.png", optimize=True)
        cut[n] = c
        # checks on dark and light checker, half size
        pair = Image.new("RGB", (c.width * 2, c.height))
        for i, dark in enumerate((True, False)):
            bg = checker(c.size, dark); bg.paste(c, (0, 0), c); pair.paste(bg, (i * c.width, 0))
        pair.resize((pair.width // 2, pair.height // 2)).save(SCR / f"{n}-{suf}-check.png")
        print(f"{n}-{suf}: corner greenness {[round(x) for x in cg]}, corner std {std}, residual green px {rc}")
    contact(suf, cut)

def contact(suf, cut):
    cw, ch, pad, lab = 400, 500, 16, 44
    W = pad + len(NAMES) * (cw + pad); H = lab + ch + pad
    sheet = Image.new("RGB", (W, H), (128, 128, 128)); d = ImageDraw.Draw(sheet); f = font(26)
    for i, n in enumerate(NAMES):
        x = pad + i * (cw + pad)
        d.text((x, 10), f"{n} {suf}", fill=(20, 20, 20), font=f)
        if n in cut:
            c = cut[n].resize((cw, ch), Image.LANCZOS)
            sheet.paste(c, (x, lab), c)
    p = REC / f"contact-r2-{'A' if suf == 'r2a' else 'B'}.png"
    sheet.save(p, optimize=True)
    print(f"{p.name}: {sheet.size}, {p.stat().st_size / 1e6:.2f} MB")

if __name__ == "__main__":
    for s in sys.argv[1:] or ("r2a", "r2b"):
        process(s)
