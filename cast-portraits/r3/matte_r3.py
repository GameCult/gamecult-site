"""Round 3: same matte as matte_r2.py on the four re-renders, then the final contact sheet.
Usage: matte_r3.py [nibu-pick]   (nibu-pick is r3a or r3b; omitted, only the cutouts and checks are made)."""
import pathlib, sys
from PIL import Image, ImageDraw
import matte_r2 as m

ORIG = pathlib.Path(r"F:/Projects/cast-art-originals/r3")
R2 = pathlib.Path(r"F:/Projects/gamecult-site-wt-portraits/cast-portraits/r2")
R3 = pathlib.Path(r"F:/Projects/gamecult-site-wt-portraits/cast-portraits/r3")
JOBS = [("aqua", "r3a"), ("nibu", "r3a"), ("nibu", "r3b"), ("void", "r3a")]

def cutouts():
    m.SCR.mkdir(exist_ok=True)
    for n, suf in JOBS:
        im = Image.open(ORIG / f"{n}-{suf}.png")
        out, cg, std, rc = m.matte(im)
        d = R3 / n; d.mkdir(parents=True, exist_ok=True)
        m.fit(im.convert("RGB")).save(d / f"{n}-{suf}.webp", "WEBP", lossless=True, quality=100, method=6)
        c = m.fit(out); c.save(d / f"{n}-{suf}-cutout.png", optimize=True)
        pair = Image.new("RGB", (c.width * 2, c.height))
        for i, dark in enumerate((True, False)):
            bg = m.checker(c.size, dark); bg.paste(c, (0, 0), c); pair.paste(bg, (i * c.width, 0))
        pair.resize((pair.width // 2, pair.height // 2)).save(m.SCR / f"{n}-{suf}-check.png")
        print(f"{n}-{suf}: corner greenness {[round(x) for x in cg]}, corner std {std}, residual green px {rc}")

def final(nibu):
    picks = [("libby", R2, "r2a"), ("heimdall", R2, "r2a"), ("kiko", R2, "r2a"), ("aqua", R3, "r3a"),
             ("weksa", R2, "r2a"), ("nibu", R3, nibu), ("eureka", R2, "r2a"), ("void", R3, "r3a")]
    cw, ch, pad, lab = 400, 500, 16, 44
    W = pad + len(picks) * (cw + pad); H = lab + ch + pad
    sheet = Image.new("RGB", (W, H), (128, 128, 128)); d = ImageDraw.Draw(sheet); f = m.font(26)
    for i, (n, root, suf) in enumerate(picks):
        x = pad + i * (cw + pad)
        d.text((x, 10), f"{n} {suf}", fill=(20, 20, 20), font=f)
        c = Image.open(root / n / f"{n}-{suf}-cutout.png").resize((cw, ch), Image.LANCZOS)
        sheet.paste(c, (x, lab), c)
    p = R3 / "contact-final.png"; sheet.save(p, optimize=True)
    print(f"{p.name}: {sheet.size}, {p.stat().st_size / 1e6:.2f} MB")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        final(sys.argv[1])
    else:
        cutouts()
