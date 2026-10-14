"""Round 1: crop each 4x3 sheet into 12 cells, key each cell with the busts' matte rule (matte_r2.py, copied unchanged),
write cutouts to the originals folder and labelled contact images into the record folder.
Usage: py -3 matte_crop_r1.py [name-suf ...]
"""
import json, pathlib, sys
from PIL import Image, ImageChops, ImageFilter, ImageDraw, ImageFont, ImageStat
sys.path.insert(0, str(pathlib.Path(__file__).parent))
import render_r1 as R

ORIG = R.ORIG
REC = R.REC
LO, HI = 40, 110
TRIM = 6          # px trimmed from every cell edge (divider lines the model draws despite the prompt)
COLS, ROWS = 4, 3
# The model drew a 4x4 sheet (16 cells) for these two instead of the declared 4x3; cropped as drawn, labelled cNN.
GRID16 = {("aqua", "r1b"), ("void", "r1b")}

# ---- matte_r2.py rule, unchanged ----
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
    std = [round(max(ImageStat.Stat(im.crop(bx)).stddev), 1) for bx in ((0, 0, 64, 64), (w - 64, 0, w, 64))]
    resid = ImageChops.multiply(greenness(out.convert("RGB")).point(lambda v: 255 if v > 60 else 0), a.point(lambda v: 255 if v > 128 else 0))
    rc = sum(resid.histogram()[255:])
    return out, cg, std, rc
# ---- end of the busts' rule ----

def runs(profile, thin=8, gap=8):
    """Content runs of a 0/1 profile; runs thinner than `thin` are divider lines; runs closer than `gap` merge."""
    out, i, n = [], 0, len(profile)
    while i < n:
        if profile[i]:
            j = i
            while j < n and profile[j]: j += 1
            if j - i >= thin: out.append([i, j])
            i = j
        else:
            i += 1
    merged = []
    for r in out:
        if merged and r[0] - merged[-1][1] < gap: merged[-1][1] = r[1]
        else: merged.append(r)
    return merged

def profile(im, axis):
    w, h = im.size
    mask = greenness(im).point(lambda v: 255 if v < LO else 0)           # non-ground
    m = mask.resize((w, 1), Image.BOX) if axis == 0 else mask.resize((1, h), Image.BOX)
    n = w if axis == 0 else h
    return [m.getpixel((i, 0) if axis == 0 else (0, i)) / 255.0 for i in range(n)]

def splits(im, n, axis):
    """Per interior boundary (end of the earlier cell, start of the next cell) and the method used.
    1) divider lines the model draws despite the prompt (thin, nearly full-length non-ground runs) near the nominal boundaries;
    2) green gutters between content runs; 3) None."""
    prof = profile(im, axis); size = len(prof)
    nominal = [size * i // n for i in range(n + 1)]
    tol = 0.10 * size / n
    # 1) divider lines
    lines, i = [], 0
    while i < size:
        if prof[i] > 0.80:
            j = i
            while j < size and prof[j] > 0.80: j += 1
            if j - i <= 10: lines.append((i, j))
            i = j
        else: i += 1
    got = []
    for k in range(1, n):
        c = [l for l in lines if abs((l[0] + l[1]) / 2 - nominal[k]) <= tol]
        if len(c) != 1: got = None; break
        got.append((c[0][0] - 5, c[0][1] + 5))
    if got: return got, "divider lines"
    # 2) gutters
    rs = runs([1 if v > 0.03 else 0 for v in prof])
    if len(rs) == n:
        mid = [(rs[i][1] + rs[i + 1][0]) // 2 for i in range(n - 1)]
        if all(abs(mid[k - 1] - nominal[k]) <= tol for k in range(1, n)):
            return [(m - TRIM, m + TRIM) for m in mid], "gutters"
    return None, f"runs {len(rs)}"

def font(sz):
    for f in ("C:/Windows/Fonts/consola.ttf", "C:/Windows/Fonts/arial.ttf"):
        try: return ImageFont.truetype(f, sz)
        except OSError: pass
    return ImageFont.load_default()

def grey_checker(size):
    c = Image.new("RGB", size, (128, 128, 128)); d = ImageDraw.Draw(c); t = 16
    for y in range(0, size[1], t):
        for x in range((y // t % 2) * t, size[0], 2 * t):
            d.rectangle([x, y, x + t - 1, y + t - 1], fill=(142, 142, 142))
    return c

def grid(cuts, labels, cw, pad, lab, title=None, ch=None):
    ch = ch or cw
    rows = (len(cuts) + COLS - 1) // COLS
    W = COLS * cw + (COLS + 1) * pad
    H = (title or 0) + rows * (ch + lab) + (rows + 1) * pad
    g = grey_checker((W, H)); d = ImageDraw.Draw(g); f = font(max(11, lab - 6))
    for i, c in enumerate(cuts):
        x = pad + (i % COLS) * (cw + pad); y = (title or 0) + pad + (i // COLS) * (ch + lab + pad)
        t = c.resize((cw, ch), Image.LANCZOS); g.paste(t, (x, y + lab), t)
        d.text((x + 2, y + 2), labels[i], fill=(10, 10, 10), font=f)
    return g

def process(name, suf, log):
    src = ORIG / name / f"{name}-{suf}.png"
    if not src.exists():
        log[f"{name}-{suf}"] = {"missing": True}; return None
    im = Image.open(src).convert("RGB")
    w, h = im.size
    nrows = 4 if (name, suf) in GRID16 else ROWS
    sx, mx = splits(im, COLS, 0); sy, my = splits(im, nrows, 1)
    mode = f"cols {mx}, rows {my}"
    if sx is None: mode += "; cols fell back to the nominal grid"; sx = [(w * i // COLS - TRIM, w * i // COLS + TRIM) for i in range(1, COLS)]
    if sy is None: mode += "; rows fell back to the nominal grid"; sy = [(h * i // nrows - TRIM, h * i // nrows + TRIM) for i in range(1, nrows)]
    x0 = [TRIM] + [e for _, e in sx]; x1 = [a for a, _ in sx] + [w - TRIM]
    y0 = [TRIM] + [e for _, e in sy]; y1 = [a for a, _ in sy] + [h - TRIM]
    labels = [l for l, _ in R.cells_for(name)] if nrows == ROWS else [f"c{i + 1:02d}" for i in range(COLS * nrows)]
    outd = ORIG / name / f"{name}-{suf}-cells"; outd.mkdir(exist_ok=True)
    cuts, rcs, cgs = [], [], []
    for i, lab in enumerate(labels):
        c, r = i % COLS, i // COLS
        cell = im.crop((x0[c], y0[r], x1[c], y1[r]))
        out, cg, std, rc = matte(cell)
        out.save(outd / f"{i + 1:02d}-{lab}.png", optimize=True)
        cuts.append(out); rcs.append(rc); cgs.append(round(min(cg)))
    # sheet ground flatness: std of the two top corners of the whole sheet
    sstd = [round(max(ImageStat.Stat(im.crop(bx)).stddev), 1) for bx in ((0, 0, 64, 64), (w - 64, 0, w, 64))]
    g = grid(cuts, [f"{i + 1} {l}" for i, l in enumerate(labels)], 380, 10, 24)
    g.save(REC / name / f"{name}-{suf}.webp", "WEBP", quality=88, method=6)
    log[f"{name}-{suf}"] = {"size": [w, h], "mode": mode, "cells": len(cuts), "labels": labels,
                            "sheet_corner_std": sstd, "min_cell_corner_greenness": min(cgs),
                            "residual_green_px_per_cell": rcs, "residual_total": sum(rcs)}
    print(name, suf, mode, "cells", len(cuts), "corner std", sstd, "residual", sum(rcs), flush=True)
    return cuts

def contact(all_cuts):
    tw, th = 600, 476
    order = [(n, s) for n in R.NAMES for s in ("r1a", "r1b")]
    W = 4 * tw; H = ((len(order) + 3) // 4) * th
    big = Image.new("RGB", (W, H), (60, 60, 60)); d = ImageDraw.Draw(big); f = font(16)
    for k, key in enumerate(order):
        x, y = (k % 4) * tw, (k // 4) * th
        cuts = all_cuts.get(key)
        d.text((x + 8, y + 3), f"{key[0]} {key[1]}", fill=(255, 255, 255), font=f)
        if not cuts: continue
        g = grid(cuts, [""] * len(cuts), 140 if len(cuts) == 12 else 105, 6, 0)
        big.paste(g, (x + 5, y + 22))
    big.save(REC / "contact-r1.webp", "WEBP", quality=88, method=6)
    print("contact-r1.webp", big.size)

if __name__ == "__main__":
    only = sys.argv[1:]
    log, all_cuts = {}, {}
    for n in R.NAMES:
        for s in ("r1a", "r1b"):
            if only and f"{n}-{s}" not in only: continue
            all_cuts[(n, s)] = process(n, s, log)
    if not only:
        contact(all_cuts)
    (REC / "matte-crop-log.json").write_text(json.dumps(log, indent=1), encoding="utf-8")
