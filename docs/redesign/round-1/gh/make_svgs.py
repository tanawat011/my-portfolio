"""Writes the GitHub profile SVGs (banner A: animated orbit, header B: still) in dark and light.

Run: python3 -I -B make_svgs.py   (stdlib only, writes next to this file)
GitHub shows an SVG in <img> without external fonts or scripts, so text uses the system font stack,
the motion is SMIL along an ellipse, and a reduced-motion media query swaps in still dots.
"""
from pathlib import Path

HERE = Path(__file__).parent
SANS = "'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif"
MONO = "'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace"
N = 11

THEMES = {
    "dark": dict(bg="#0b0c0f", ink="#f5f6f8", mute="#8d929b", faint="#5f646c", pool=".20", pool2=".12",
                 o1="#3b3f49", o2="#16181d", o3="#07080a", hi=".85", ring_b=".30", ring_f=".85",
                 dots=["#7cc8ff", "#8e97ff", "#eef5ff"], edge="rgba(255,255,255,.08)"),
    "light": dict(bg="#f5f6f8", ink="#0d0f14", mute="#5a606b", faint="#9aa0aa", pool=".16", pool2=".10",
                  o1="#ffffff", o2="#e9ecf1", o3="#c3c9d3", hi=".95", ring_b=".35", ring_f=".9",
                  dots=["#3f9fe6", "#6f79f2", "#0d0f14"], edge="rgba(13,15,20,.09)"),
}


def orb_scene(t, cx, cy, rx, ry, r, oy, animate, dur=84):
    """An orb at (cx, cy+oy) with an orbit ellipse centred at (cx, cy); 11 dots on the orbit."""
    import math
    orbit = f"M{cx - rx} {cy} a{rx} {ry} 0 1 0 {2 * rx} 0 a{rx} {ry} 0 1 0 {-2 * rx} 0"
    dots_still = []
    for i in range(N):
        a = 0.3 + i * 2 * math.pi / N
        x, y = cx + rx * math.cos(a), cy + ry * math.sin(a)
        dots_still.append((round(x, 1), round(y, 1), t["dots"][i % 3]))

    def moving(group_id):
        out = []
        for i in range(N):
            begin = -round(i * dur / N, 2)
            out.append(f'<circle r="{5.5 if i % 3 == 2 else 6}" fill="{t["dots"][i % 3]}"><animateMotion dur="{dur}s" begin="{begin}s" repeatCount="indefinite" path="{orbit}"/></circle>')
        return f'<g class="moving" id="{group_id}">' + "".join(out) + "</g>"

    def still(front):
        out = []
        for x, y, c in dots_still:
            if (y >= cy) == front:
                out.append(f'<circle cx="{x}" cy="{y}" r="6" fill="{c}"/>')
        return '<g class="still">' + "".join(out) + "</g>"

    oc = cy + oy
    parts = [
        f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="none" stroke="url(#ring)" stroke-width="1.5" opacity="{t["ring_b"]}"/>',
        (moving("back") if animate else "") + still(False),
        f'<circle cx="{cx}" cy="{oc}" r="{r * 2.6}" fill="url(#glow)"/>',
        f'<circle cx="{cx}" cy="{oc}" r="{r}" fill="url(#orb)"/>',
        f'<circle cx="{cx}" cy="{oc}" r="{r - 1}" fill="none" stroke="url(#rim)" stroke-width="{r * .16:.1f}" opacity=".9" mask="url(#rimmask)"/>',
        f'<ellipse cx="{cx - r * .3:.1f}" cy="{oc - r * .5:.1f}" rx="{r * .24:.1f}" ry="{r * .15:.1f}" fill="#fff" opacity="{t["hi"]}" transform="rotate(-30 {cx - r * .3:.1f} {oc - r * .5:.1f})" filter="url(#soft)"/>',
        f'<g clip-path="url(#front)"><ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="none" stroke="url(#ring)" stroke-width="1.6" opacity="{t["ring_f"]}"/>'
        + (moving("front") if animate else "") + still(True) + "</g>",
    ]
    defs = f"""<radialGradient id="orb" cx="36%" cy="30%" r="75%"><stop offset="0" stop-color="{t['o1']}"/><stop offset=".52" stop-color="{t['o2']}"/><stop offset="1" stop-color="{t['o3']}"/></radialGradient>
<radialGradient id="glow"><stop offset="0" stop-color="#a0c8ff" stop-opacity=".22"/><stop offset=".6" stop-color="#8e97ff" stop-opacity=".07"/><stop offset="1" stop-color="#8e97ff" stop-opacity="0"/></radialGradient>
<linearGradient id="rim" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7cc8ff"/><stop offset=".5" stop-color="#8e97ff"/><stop offset="1" stop-color="#eef5ff"/></linearGradient>
<radialGradient id="rimfade" cx="46%" cy="44%" r="55%"><stop offset=".78" stop-color="#000"/><stop offset="1" stop-color="#fff"/></radialGradient>
<mask id="rimmask"><circle cx="{cx}" cy="{oc}" r="{r + 2}" fill="url(#rimfade)"/></mask>
<linearGradient id="ring" x1="0" x2="1"><stop offset="0" stop-color="#7cc8ff"/><stop offset=".35" stop-color="#8e97ff"/><stop offset=".7" stop-color="#eef5ff"/><stop offset="1" stop-color="#8e97ff"/></linearGradient>
<filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2"/></filter>
<clipPath id="front"><rect x="0" y="{cy}" width="2000" height="400"/></clipPath>"""
    return defs, "".join(parts)


def svg(t, w, h, defs, body, title, desc, animate):
    style = ".still{display:none}@media (prefers-reduced-motion:reduce){.moving{display:none}.still{display:inline}}" if animate else ""
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img" aria-labelledby="t d">
<title id="t">{title}</title><desc id="d">{desc}</desc>
<style>{style}</style>
<defs>{defs}
<radialGradient id="pool" cx="77%" cy="48%" r="42%"><stop offset="0" stop-color="#8e97ff" stop-opacity="{t['pool']}"/><stop offset="1" stop-color="#8e97ff" stop-opacity="0"/></radialGradient>
<radialGradient id="pool2" cx="66%" cy="80%" r="36%"><stop offset="0" stop-color="#7cc8ff" stop-opacity="{t['pool2']}"/><stop offset="1" stop-color="#7cc8ff" stop-opacity="0"/></radialGradient>
</defs>
<rect width="{w}" height="{h}" rx="24" fill="{t['bg']}"/>
<rect width="{w}" height="{h}" rx="24" fill="url(#pool)"/><rect width="{w}" height="{h}" rx="24" fill="url(#pool2)"/>
<rect x=".5" y=".5" width="{w - 1}" height="{h - 1}" rx="23.5" fill="none" stroke="{t['edge']}"/>
{body}
</svg>
"""


def banner(name):
    t = THEMES[name]
    defs, scene = orb_scene(t, 990, 186, 200, 50, 60, -22, animate=True)
    text = f"""<text x="72" y="138" font-family="{SANS}" font-size="58" font-weight="600" letter-spacing="-1.6" fill="{t['ink']}">Tanawat Pinthongpan</text>
<text x="74" y="186" font-family="{SANS}" font-size="25" fill="{t['mute']}">Fullstack developer. I build the tools I use.</text>
<text x="74" y="240" font-family="{MONO}" font-size="16" fill="{t['mute']}">11 desktop apps · Rust + Tauri · web apps since 2017</text>"""
    return svg(t, 1280, 320, defs, text + scene, "Tanawat Pinthongpan",
               "Fullstack developer. I build the tools I use. Eleven dots, one for each VTX desktop app, orbit a glossy orb.", True)


def header(name):
    t = THEMES[name]
    defs, scene = orb_scene(t, 1080, 112, 128, 30, 38, -14, animate=False)
    text = f"""<text x="64" y="98" font-family="{SANS}" font-size="44" font-weight="600" letter-spacing="-1.2" fill="{t['ink']}">Tanawat Pinthongpan</text>
<text x="66" y="140" font-family="{SANS}" font-size="21" fill="{t['mute']}">Fullstack developer · the VTX family, 11 desktop apps in Rust + Tauri</text>"""
    return svg(t, 1280, 200, defs, text + scene, "Tanawat Pinthongpan",
               "Fullstack developer. The VTX family: eleven desktop apps in Rust and Tauri.", False)


for th in THEMES:
    (HERE / f"banner-{th}.svg").write_text(banner(th), encoding="utf-8")
    (HERE / f"header-{th}.svg").write_text(header(th), encoding="utf-8")
print("ok", sorted(p.name for p in HERE.glob("*.svg")))
