#!/usr/bin/env bash
# Screenshot the gallery with Edge headless (Git Bash). Usage from the repo root:
#   cast/rig/shot.sh <out.png> [character] [pose] [width] [height]
# A fresh profile dir per call keeps headless Edge off the desktop browser profile.
set -euo pipefail
out=$1; c=${2:-}; p=${3:-}; w=${4:-1400}; h=${5:-1800}
root=$(cd "$(dirname "$0")/.." && pwd -W)
prof="$(cygpath -m "${TMPDIR:-/tmp}")/cast-edge-$$"
rm -f "$out"
# Edge may hand the job to an already-running instance and return at once, so wait for the file.
"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless=new --disable-gpu --hide-scrollbars   --user-data-dir="$prof" --screenshot="$(cygpath -m "$out")" --window-size="$w,$h"   "file:///$root/gallery.html?c=$c&p=$p" >/dev/null 2>&1 &
for _ in $(seq 120); do [ -s "$out" ] && break; sleep 0.25; done
sleep 0.5; ls -la "$out"
