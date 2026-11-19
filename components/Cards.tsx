"use client";

import { useRef, useState } from "react";
import { MARKS } from "@/content/marks";

const reduced = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

export interface CvVersion { len: "full" | "short"; label: string; quip: string; pdf: string; thumb: string; w: number; h: number; pages: number; size: string; made: string; alt: string }

/**
 * One resume style with its two lengths. The paper is the PDF's real first page (too small to read on purpose); it
 * lifts out of its sleeve on hover, and the sheets behind it are the real page count. Full ⇄ Short swaps the paper.
 */
export function CvCard({ style, blurb, versions, lenLabel, dl, pagesWord, sizeWord, madeWord, i }: { style: string; blurb: string; versions: CvVersion[]; lenLabel: string; dl: string; pagesWord: string; sizeWord: string; madeWord: string; i: number }) {
  const [len, setLen] = useState<"full" | "short">("full");
  const [swap, setSwap] = useState(false);
  const v = versions.find((x) => x.len === len) ?? versions[0];
  const pick = (next: "full" | "short") => {
    if (next === len) return;
    if (reduced()) return setLen(next);
    setSwap(true);
    window.setTimeout(() => {
      setLen(next);
      setSwap(false);
    }, 170);
  };
  return (
    <li className={`cvx o-card hov rv cvx-${style.toLowerCase()}`} style={{ "--d": `${i * 0.12}s` } as React.CSSProperties}>
      <div className="cvx-stage" aria-hidden="true">
        <div className={`cvx-paper${swap ? " is-swap" : ""}`} data-pages={v.pages}>
          {Array.from({ length: v.pages - 1 }, (_, k) => (
            <i key={k} className="sheet" style={{ "--k": k + 1 } as React.CSSProperties} />
          ))}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={v.thumb} width={v.w} height={v.h} alt="" loading="lazy" decoding="async" />
        </div>
        <div className="cvx-sleeve" />
      </div>
      <div className="cvx-body">
        <h3>{style}</h3>
        <p className="cvx-blurb">{blurb}</p>
        <div className="cvx-seg" role="radiogroup" aria-label={`${style}: ${lenLabel}`}>
          {versions.map((x) => (
            <button key={x.len} type="button" role="radio" aria-checked={x.len === len} onClick={() => pick(x.len)}>
              {x.label}
            </button>
          ))}
        </div>
        <p className="cvx-quip" aria-live="polite">
          {v.quip}
        </p>
        <dl className="cvx-facts">
          <div>
            <dt>PDF</dt>
            <dd>
              {v.pages} {pagesWord}
            </dd>
          </div>
          <div>
            <dt>{sizeWord}</dt>
            <dd>{v.size}</dd>
          </div>
          <div>
            <dt>{madeWord}</dt>
            <dd>{v.made}</dd>
          </div>
        </dl>
        <a className="p-btn p-btn-ink p-btn-sm cvx-dl" href={encodeURI(v.pdf)} download data-count="cv" data-c-style={style.toLowerCase()} data-c-len={v.len} aria-label={`${dl}: ${v.alt}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 4v11m0 0-4-4m4 4 4-4M5 19h14" />
          </svg>
          {dl}
        </a>
      </div>
    </li>
  );
}

export interface PjView {
  name: string; repo: string; mark: string; url: string; d: string; clone: string;
  tags: { t: string; kind: string; kindLabel: string }[];
  stars?: number; pushed?: string; langs?: { name: string; pct: number; color: string }[]; tree?: string[];
}

/** A project card: its mark, real stars, last push and language bar from GitHub, the clone line, and a peek at its folders. */
export function PjCard({ p, i, w }: { p: PjView; i: number; w: { updated: string; stars: string; open: string; copy: string; copied: string; peek: string; close: string; langs: string } }) {
  const [peek, setPeek] = useState(false);
  const [copied, setCopied] = useState(false);
  const code = useRef<HTMLElement>(null);
  const mark = MARKS[p.mark];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(p.clone);
    } catch {
      const r = document.createRange();
      if (code.current) r.selectNodeContents(code.current);
      const s = getSelection();
      s?.removeAllRanges();
      s?.addRange(r);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  const shown = p.tree?.slice(0, 9) ?? [];
  return (
    <li className="pjx o-card hov rv" data-peek={peek ? "" : undefined} style={{ "--d": `${i * 0.12}s` } as React.CSSProperties}>
      <div className="pjx-top">
        {mark && (
          <span className="pjx-mark" title={mark.title}>
            <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
              <path d={mark.d} fill="currentColor" />
            </svg>
          </span>
        )}
        <div>
          <h3>
            <a href={p.url}>{p.name}</a>
          </h3>
          {(p.stars != null || p.pushed) && (
            <p className="pjx-meta">
              {p.stars != null && <span aria-label={`${p.stars} ${w.stars}`}>★ {p.stars}</span>}
              {p.pushed && (
                <span>
                  {w.updated} {p.pushed}
                </span>
              )}
            </p>
          )}
        </div>
      </div>
      <p className="pjx-d">{p.d}</p>
      {p.langs && (
        <div className="pjx-langs">
          <div className="lbar" role="img" aria-label={`${w.langs}: ${p.langs.map((l) => `${l.name} ${l.pct}%`).join(", ")}`}>
            {p.langs.map((l) => (
              <i key={l.name} style={{ width: `${l.pct}%`, background: l.color }} />
            ))}
          </div>
          <ul className="lkey" aria-hidden="true">
            {p.langs.map((l) => (
              <li key={l.name}>
                <i style={{ background: l.color }} />
                {l.name} <span>{l.pct}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <ul className="tagx">
        {p.tags.map((t) => (
          <li key={t.t} className={`t-${t.kind}`} title={t.kindLabel}>
            {t.t}
          </li>
        ))}
      </ul>
      <div className="pjx-clone">
        <code ref={code}>{p.clone}</code>
        <button type="button" onClick={copy} aria-live="polite">
          {copied ? w.copied : w.copy}
        </button>
      </div>
      <div className="pjx-foot">
        {shown.length > 0 && (
          <button type="button" className="pjx-peekbtn" aria-expanded={peek} onClick={() => setPeek((x) => !x)}>
            {peek ? w.close : w.peek}
          </button>
        )}
        <a className="pjx-open" href={p.url}>
          {w.open} <span aria-hidden="true">↗</span>
        </a>
      </div>
      {shown.length > 0 && (
        <div className="pjx-peek" aria-hidden={!peek}>
          <p className="o-mono">{p.repo}/</p>
          <pre>
            {shown.map((e, k) => `${k === shown.length - 1 && (p.tree?.length ?? 0) <= shown.length ? "└─" : "├─"} ${e}`).join("\n")}
            {(p.tree?.length ?? 0) > shown.length ? `\n└─ …` : ""}
          </pre>
        </div>
      )}
    </li>
  );
}
