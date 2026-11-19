"""Builds index.html from index.src.html: drops the three README drafts in as JSON, so the page shows exactly the files in gh/.

Run: python3 -I -B build.py   (stdlib only). Assets come from VTX Labs and the site's public/vtx (see .gitignore; copy step in README.md).
"""
import json
from pathlib import Path

HERE = Path(__file__).parent
page = (HERE / "index.src.html").read_text(encoding="utf-8")
for v in "abc":
    md = (HERE / "gh" / f"variant-{v}.md").read_text(encoding="utf-8")
    blob = json.dumps(md, ensure_ascii=False).replace("<", "\\u003c")
    old = f'<script type="text/plain" id="md-{v}"><!--MD:{v}--></script>'
    assert old in page, v
    page = page.replace(old, f'<script type="application/json" id="md-{v}">{blob}</script>')
(HERE / "index.html").write_text(page, encoding="utf-8")
print("index.html", len(page.encode()), "bytes")
