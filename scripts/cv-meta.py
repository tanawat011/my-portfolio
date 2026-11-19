"""Reads the four resume PDFs in public/ and writes what the resume cards show, all from the files themselves:
the first page as a small picture (too small to read), the page count, the size, the date the PDF was made, and a hash.

Run on macOS after replacing a PDF:  python3 -I -B scripts/cv-meta.py
(The first page is drawn by macOS's own `sips`; Vercel's build machines have no PDF renderer, so the pictures are
committed. tests/content.test.ts fails if a PDF changes without this being re-run.)
"""
import hashlib
import json
import re
import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUB = ROOT / "public"
OUT = PUB / "cv"
PREVIEW_H = 240  # px tall: the body text lands near 2 px, unreadable
FILES = {"Modern-full": "Modern.pdf", "Modern-short": "Modern Short.pdf", "Minimal-full": "minimal.pdf", "Minimal-short": "minimal short.pdf"}


def pdf_facts(data: bytes) -> tuple[int, str]:
    pages = len(re.findall(rb"/Type\s*/Page[^s]", data))
    m = re.search(rb"/CreationDate\s*\(D:(\d{4})(\d{2})(\d{2})", data)
    made = f"{m.group(1).decode()}-{m.group(2).decode()}-{m.group(3).decode()}" if m else ""
    return pages, made


def main() -> None:
    OUT.mkdir(exist_ok=True)
    meta = {}
    for key, name in FILES.items():
        src = PUB / name
        data = src.read_bytes()
        pages, made = pdf_facts(data)
        thumb = OUT / f"{key.lower()}.jpg"
        with tempfile.TemporaryDirectory() as tmp:
            png = Path(tmp) / "p1.png"
            subprocess.run(["sips", "-s", "format", "png", str(src), "--out", str(png)], check=True, capture_output=True)
            # Small on purpose: page one carries a phone number and past employers' names, so the preview shows the
            # paper's real layout and colours but no line of it can be read. The PDF itself is one click away.
            subprocess.run(["sips", "-Z", str(PREVIEW_H), "-s", "format", "jpeg", "-s", "formatOptions", "70", str(png), "--out", str(thumb)], check=True, capture_output=True)
        size = subprocess.run(["sips", "-g", "pixelWidth", "-g", "pixelHeight", str(thumb)], check=True, capture_output=True, text=True).stdout
        w, h = (int(x) for x in re.findall(r"pixel(?:Width|Height): (\d+)", size))
        meta[key] = {"pdf": f"/{name}", "pages": pages, "bytes": len(data), "made": made, "sha256": hashlib.sha256(data).hexdigest(),
                     "thumb": f"/cv/{thumb.name}", "w": w, "h": h}
    (ROOT / "content" / "cvs.json").write_text(json.dumps(meta, indent=2) + "\n", encoding="utf-8")
    for k, v in meta.items():
        print(k, v["pages"], "pages", v["bytes"], "bytes", v["made"], v["thumb"], f'{v["w"]}x{v["h"]}')


if __name__ == "__main__":
    main()
