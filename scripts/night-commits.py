"""How many of his VTX commits were made between midnight and 6 AM, in each commit's own local time.

Run by hand on his machine (the VTX repos are private, so the build can't see them):
    python3 -I -B scripts/night-commits.py <folder holding the VTX repos>

It reads every git repo one or two folders under that path and counts the non-merge commits on any branch whose
author name is this machine's `git config user.name` (pass --author to use another). A commit's hour is read from its
author date in the offset it was made in, so a commit at 01:10 +07:00 counts as after midnight wherever this runs.
The same commit in two clones counts once.

Only the aggregate is written to content/night-commits.json: the share, how many commits it covers, the window and the
date. No repo names, no hashes, no timestamps.
"""
import argparse
import datetime
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
WINDOW = (0, 6)  # 00:00 to 05:59


def repos(base: Path) -> list[Path]:
    found = []
    for d in sorted([base, *base.iterdir(), *(c for p in base.iterdir() if p.is_dir() for c in p.iterdir())]):
        if d.is_dir() and (d / ".git").exists():
            found.append(d)
    return found


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("base", type=Path)
    ap.add_argument("--author", default=None)
    a = ap.parse_args()
    author = a.author or subprocess.run(["git", "config", "user.name"], capture_output=True, text=True, check=True).stdout.strip()
    seen: dict[str, int] = {}
    for r in repos(a.base.expanduser()):
        out = subprocess.run(["git", "-C", str(r), "log", "--all", "--no-merges", "--format=%H%x09%an%x09%aI"], capture_output=True, text=True, check=True).stdout
        for line in out.splitlines():
            h, name, when = line.split("\t")
            if name == author:
                seen[h] = datetime.datetime.fromisoformat(when).hour
    total = len(seen)
    night = sum(1 for hour in seen.values() if WINDOW[0] <= hour < WINDOW[1])
    if not total:
        raise SystemExit("no commits found: check the path and the author name")
    data = {"pct": round(100 * night / total, 1), "commits": total, "window": f"{WINDOW[0]:02d}:00-{WINDOW[1] - 1:02d}:59", "asOf": datetime.date.today().isoformat()}
    (ROOT / "content" / "night-commits.json").write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(data))


if __name__ == "__main__":
    main()
