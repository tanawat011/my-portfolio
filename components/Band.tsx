import { APPS } from "@/content/apps";
import { T, type Lang } from "@/content/site";

const Y0 = 2017;
/** A year as a decimal: 2017-07-24 → 2017.56. */
const dec = (t: number) => {
  const d = new Date(t), y = d.getUTCFullYear();
  return y + (t - Date.UTC(y, 0, 1)) / (Date.UTC(y + 1, 0, 1) - Date.UTC(y, 0, 1));
};

/**
 * 2017 → now at true scale (D): the web years as one calm line, then the 2026 VTX segment with the eleven app icons
 * rising from it, up and to the left so the point stays true. Drawn on the server; the page rebuilds daily (revalidate),
 * so "now" moves on by itself.
 */
export function Band({ lang, now = Date.now() }: { lang: Lang; now?: number }) {
  const n = dec(now), y1 = Math.max(2027, Math.floor(n) + 1), span = y1 - Y0;
  const pct = (y: number) => `${(((y - Y0) / span) * 100).toFixed(2)}%`;
  const webA = dec(Date.UTC(2017, 6, 24)), vtxA = dec(Date.UTC(2026, 4, 18)), vtxB = Math.max(vtxA + 0.08, n);
  const years = Array.from({ length: y1 - Y0 + 1 }, (_, i) => Y0 + i);
  const [wb, wl] = T.bandWeb[lang], [vb, vl] = T.bandVtx[lang];
  return (
    <div className="d-band" role="img" aria-label={T.bandLabel[lang]}>
      <div className="d-axis">
        <div className="d-line" />
        <div className="d-seg web" style={{ left: pct(webA), width: `calc(${pct(2026)} - ${pct(webA)})` }} />
        <div className="d-seg vtx" style={{ left: pct(vtxA), width: `calc(${pct(vtxB)} - ${pct(vtxA)})` }} />
        {years.map((y) => (
          <span key={y} className={`d-tick${(y - Y0) % 2 ? " odd" : ""}`} style={{ left: pct(y) }}>
            <span className="l">{y}</span>
            <span className="s">’{String(y).slice(2)}</span>
          </span>
        ))}
        <p className="d-lab" style={{ left: pct(webA) }}>
          <b>{wb}</b>
          {wl}
        </p>
        <p className="d-lab r">
          <b>{vb}</b>
          {vl}
        </p>
        <div className="d-burst" style={{ left: pct((vtxA + vtxB) / 2) }}>
          {APPS.map((a, i) => {
            const ang = ((-178 + (i * 98) / (APPS.length - 1)) * Math.PI) / 180, r = 66 + (i % 3) * 40;
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={a.id} src={`/vtx/96/${a.id}.png`} alt="" width={44} height={44} title={a.name} style={{ "--x": (Math.cos(ang) * r).toFixed(1), "--y": (Math.sin(ang) * r * 0.62).toFixed(1) } as React.CSSProperties} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
