"""Round 1 checks: prompt diff across the 16 records, cell counts, matte residue, and key-material search.
The key is read here only to search for its value; it is never printed."""
import json, pathlib, re, sys, difflib
import render_r1 as R

REC = R.REC
ok = True
cellfail = []
prompts = {}
for n in R.NAMES:
    for s in ("r1a", "r1b"):
        f = REC / n / f"{n}-{s}.txt"
        if not f.exists(): print("not rendered, no record:", f"{n}-{s}"); continue
        prompts[(n, s)] = f.read_text(encoding="utf-8").split("## Prompt\n\n", 1)[1].strip()

# 1. Each record's prompt equals the one the script builds now, and the shared parts are identical across all 16.
for (n, s), p in prompts.items():
    if p != R.prompt_for(n, s): ok = False; print("MISMATCH vs script:", n, s)
shared = None
for (n, s), p in prompts.items():
    q = p.replace(R.REF + "\n\n", "", 1)
    head = q.split("\n\n" + R.canon_block(n), 1)[0]
    cells = q.split(R.canon_block(n) + "\n\n", 1)[1]
    if shared is None: shared = head
    if head != shared: ok = False; print("shared part differs:", n, s)
    if (s == "r1b") != p.startswith(R.REF): ok = False; print("clause misplaced:", n, s)
    if s == "r1b" and (n, "r1a") in prompts and q != prompts[(n, "r1a")]: ok = False; print("r1b differs from r1a beyond the clause:", n)
    if not cells.startswith("Cell 1 (neutral)"): ok = False; print("cells:", n, s)
print(f"prompts: {len(prompts)} records match the script; shared style+sheet part identical across all; r1b == r1a + clause where both exist" if ok else "PROMPT CHECK FAILED")
# which segments differ between characters (r1a only)
segs = {n: (R.canon_block(n), tuple(R.cells_for(n))) for n in R.NAMES}
core_same = [R.cells_for(n)[:8] for n in R.NAMES if n != "void"]
print("core cell text identical for 7 characters, void adapted:", all(c == core_same[0] for c in core_same))

# 2. cell counts and matte residue from the crop log
log = json.loads((REC / "matte-crop-log.json").read_text(encoding="utf-8"))
for k, v in sorted(log.items()):
    if v.get("missing"): print(f"{k}: not rendered, no sheet"); continue
    outd = R.ORIG / k.split("-")[0] / f"{k}-cells"
    files = sorted(p.name for p in outd.glob("*.png"))
    exp = [f"{i + 1:02d}-{l}.png" for i, (l, _) in enumerate(R.cells_for(k.split('-')[0]))]
    if k in {"aqua-r1b", "void-r1b"}:
        print(f"{k}: CELL COUNT FAIL, {len(files)} cutouts (4x4 sheet drawn), declared 12; residual green px {v['residual_total']}"); cellfail.append(k); continue
    good = files == exp and v["residual_total"] == 0
    ok &= good
    print(f"{k}: {len(files)} cutouts, order {'ok' if files == exp else 'WRONG'}, mode {v['mode']}, residual green px {v['residual_total']}, sheet corner std {v['sheet_corner_std']}")

# 3. size and key search
big = [str(p) for p in (REC.parent).rglob("*") if p.is_file() and p.stat().st_size > 2_000_000]
print("committed-tree files over 2 MB:", big or "none")
key = pathlib.Path(r"F:/Projects/bfl-api.txt").read_text().strip()
hits = []
roots = [REC.parent, pathlib.Path(sys.argv[1])] if len(sys.argv) > 1 else [REC.parent]
for root in roots:
    for p in root.rglob("*"):
        if p.is_file() and p.suffix in (".py", ".txt", ".md", ".json", ".log"):
            if key in p.read_text(encoding="utf-8", errors="ignore"): hits.append(str(p))
print("files containing the key value:", hits or "none")
print("cell-count failures:", cellfail or "none")
print(("ALL OK" if ok and not big and not hits else "CHECK FAILED") + (" except the cell-count failures above" if cellfail and ok and not big and not hits else ""))
