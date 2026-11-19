# Redesign, round 1: five directions and three GitHub profiles

The source of the private Artifact "Portfolio Directions". Nothing here is part of the site build, and nothing is deployed.

- `index.src.html` the sheet (study, viewer, questions) and the templates of the five directions (home + the Fulmen case page)
- `pv.css`, `pv.js` the previews: G's palette and type, the shared blocks, and each direction's interaction
- `sheet.js` the Devices viewer, the GitHub preview (a small Markdown renderer for these three files) and the questions
- `gh/variant-{a,b,c}.md` the three README drafts for `tanawat011/README.md`; `gh/make_svgs.py` writes the banner and header SVGs
- `build.py` puts the three drafts into `index.html`

## Rebuild

The images are copies, kept out of git (`.gitignore`):

```bash
L=../../../../../vithi-tech-xplorer/vtx-labs/public/apps
mkdir -p assets/shots assets/icons
for k in lapis-1 fulmen-1 fulmen-2 fulmen-3 silva-1 silva-2 ventus-1 ignis-1 aqua-1 cuprum-1 lux-1 mercurius-1 crystallum-1 ros-1 craftcv-1; do for m in dark light; do cp $L/shots/$k-$m-800.webp assets/shots/; done; done
for k in lapis-1 fulmen-1 silva-2 ignis-1; do for m in dark light; do cp $L/shots/$k-$m-1600.webp assets/shots/; done; done
cp ../../../public/vtx/*.png $L/labs.png $L/craftcv.png assets/icons/
python3 -I -B gh/make_svgs.py && python3 -I -B build.py
```

The screenshots are VTX Labs' own (real app frontends, made-up data, already public on vtxlabs.app).
