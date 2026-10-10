"""Round 4: same matte as matte_r2.py on aqua-r4a; contact-final rebuilt with a chosen Aqua.
Usage: matte_r4.py            -> cutout and checks for aqua-r4a
       matte_r4.py r3a|r4a    -> rebuild r3/contact-final.png with that Aqua."""
import pathlib, sys
from PIL import Image, ImageDraw
import matte_r2 as m, matte_r3 as m3

m3.ORIG = pathlib.Path(r"F:/Projects/cast-art-originals/r4")
R4 = pathlib.Path(r"F:/Projects/gamecult-site-wt-portraits/cast-portraits/r4")

def final(aqua):
    root = {"r3a": m3.R3, "r4a": R4}[aqua]
    picks = [("libby", m3.R2, "r2a"), ("heimdall", m3.R2, "r2a"), ("kiko", m3.R2, "r2a"), ("aqua", root, aqua),
             ("weksa", m3.R2, "r2a"), ("nibu", m3.R3, "r3a"), ("eureka", m3.R2, "r2a"), ("void", m3.R3, "r3a")]
    cw, ch, pad, lab = 400, 500, 16, 44
    W = pad + len(picks) * (cw + pad); H = lab + ch + pad
    sheet = Image.new("RGB", (W, H), (128, 128, 128)); d = ImageDraw.Draw(sheet); f = m.font(26)
    for i, (n, r, suf) in enumerate(picks):
        x = pad + i * (cw + pad)
        d.text((x, 10), f"{n} {suf}", fill=(20, 20, 20), font=f)
        c = Image.open(r / n / f"{n}-{suf}-cutout.png").resize((cw, ch), Image.LANCZOS)
        sheet.paste(c, (x, lab), c)
    p = m3.R3 / "contact-final.png"; sheet.save(p, optimize=True)
    print(f"{p.name}: {sheet.size}, {p.stat().st_size / 1e6:.2f} MB")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        final(sys.argv[1])
    else:
        m3.R3 = R4; m3.JOBS = [("aqua", "r4a")]
        m3.cutouts()
