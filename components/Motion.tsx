"use client";

import { useEffect, useRef, useState } from "react";
import { Shot } from "./Shot";

const reduced = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * The story's rail (D): the line fills and a lit dot travels as the story scrolls past the middle of the screen, and
 * the chapter being read lights up. It moves only with the visitor's scroll, only while the story is on screen.
 * Reduce motion: the rail is full, every chapter is lit, no dot.
 */
export function StoryRail() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const rail = ref.current, wrap = rail?.parentElement;
    if (!rail || !wrap) return;
    const chs = [...wrap.querySelectorAll<HTMLElement>(".d-chp")];
    if (reduced()) {
      rail.style.setProperty("--fill", "calc(100% - 16px)");
      chs.forEach((c) => c.classList.add("is-on"));
      return;
    }
    wrap.classList.add("is-live");
    let raf = 0, vis = false;
    const paint = () => {
      raf = 0;
      const mid = window.innerHeight * 0.55, r = wrap.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (mid - r.top) / r.height));
      rail.style.setProperty("--fill", `${(p * (r.height - 16)).toFixed(1)}px`);
      chs.forEach((c) => c.classList.toggle("is-on", c.getBoundingClientRect().top < mid + 40));
    };
    const on = () => {
      if (vis && !raf) raf = requestAnimationFrame(paint);
    };
    const seen = new IntersectionObserver((es) => {
      vis = es[es.length - 1].isIntersecting;
      on();
    });
    seen.observe(wrap);
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    paint();
    return () => {
      seen.disconnect();
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
      wrap.classList.remove("is-live");
    };
  }, []);
  return (
    <div className="d-rail" aria-hidden="true" ref={ref}>
      <i className="d-fill" />
      <i className="d-dot" />
    </div>
  );
}

/** The case page's reading line: how far through the article you are. */
export function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const bar = ref.current, main = document.getElementById("main");
    if (!bar || !main) return;
    let raf = 0;
    const paint = () => {
      raf = 0;
      const r = main.getBoundingClientRect(), h = r.height - window.innerHeight;
      bar.style.setProperty("--p", `${(Math.max(0, Math.min(1, -r.top / Math.max(1, h))) * 100).toFixed(1)}%`);
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="d-prog" aria-hidden="true" ref={ref}>
      <i />
    </div>
  );
}

export interface PairView { id: string; name: string; cmd: string; shot: string; before: string; after: string; cap: string; term: ["p" | "o" | "c", string][] }

function Term({ lines }: { lines: PairView["term"] }) {
  return (
    <pre className="term">
      {lines.map(([t, s], i) => (
        <span key={i}>
          {i > 0 && "\n"}
          {t === "p" ? (
            <>
              <span className="p">$ </span>
              <span className="s">{s.replace(/\n/g, "\n  ")}</span>
            </>
          ) : (
            <span className={t}>{s}</span>
          )}
        </span>
      ))}
    </pre>
  );
}

/**
 * Before → after (kit ux-motion § 5: a portfolio shows, with before / after, instead of describing). The terminal sits
 * under the app's real screen; drag the handle, or use the arrow keys on it (Shift for bigger steps, Home / End).
 * Once, the first time it comes into view, the handle leans left and back to say it can be dragged (not under Reduce motion).
 */
export function BeforeAfter({ pairs, pick, slider, sizes }: { pairs: PairView[]; pick: string; slider: string; sizes: string }) {
  const [id, setId] = useState(pairs[0].id);
  const [x, setX] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const drag = useRef(false);
  const p = pairs.find((q) => q.id === id) ?? pairs[0];

  useEffect(() => {
    const el = box.current;
    if (!el || reduced()) return;
    let done = false, raf = 0, tm = 0;
    const seen = new IntersectionObserver(
      (es) => {
        if (!es[es.length - 1].isIntersecting || done || touched.current) return;
        done = true;
        seen.disconnect();
        tm = window.setTimeout(() => {
          const t0 = performance.now();
          const f = (now: number) => {
            if (touched.current) return;
            const k = Math.min(1, (now - t0) / 1600);
            setX(50 - Math.sin(k * Math.PI) * 14);
            if (k < 1) raf = requestAnimationFrame(f);
          };
          raf = requestAnimationFrame(f);
        }, 500);
      },
      { threshold: 0.6 },
    );
    seen.observe(el);
    return () => {
      seen.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(tm);
    };
  }, []);

  const fromEvent = (e: React.PointerEvent) => {
    const r = box.current!.getBoundingClientRect();
    setX(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)));
  };
  const onKey = (e: React.KeyboardEvent) => {
    const st = e.shiftKey ? 20 : 5;
    let v: number | null = null;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") v = x - st;
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") v = x + st;
    else if (e.key === "Home") v = 0;
    else if (e.key === "End") v = 100;
    if (v != null) {
      e.preventDefault();
      touched.current = true;
      setX(Math.max(0, Math.min(100, v)));
    }
  };

  return (
    <div className="ba-wrap rv">
      {pairs.length > 1 && (
        <div className="ba-tabs" role="group" aria-label={pick}>
          {pairs.map((q) => (
            <button key={q.id} type="button" className="ba-tab" aria-pressed={q.id === id} onClick={() => { setId(q.id); setX(50); }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/vtx/96/${q.id}.png`} alt="" width={28} height={28} />
              <code>{q.cmd} →</code> {q.name}
            </button>
          ))}
        </div>
      )}
      <div
        ref={box}
        className="ba"
        style={{ "--x": `${x.toFixed(2)}%` } as React.CSSProperties}
        onPointerDown={(e) => {
          if (e.button > 0) return;
          drag.current = true;
          touched.current = true;
          try {
            box.current?.setPointerCapture(e.pointerId);
          } catch {
            /* fine */
          }
          fromEvent(e);
        }}
        onPointerMove={(e) => drag.current && fromEvent(e)}
        onPointerUp={() => (drag.current = false)}
        onPointerCancel={() => (drag.current = false)}
      >
        <div className="ba-b">
          <Term lines={p.term} />
        </div>
        <div className="ba-a">
          <Shot k={p.shot} alt={`${p.name}: ${p.after}`} sizes={sizes} />
        </div>
        <span className="ba-l l">{p.before}</span>
        <span className="ba-l r">{p.after}</span>
        <div className="ba-h">
          <button type="button" className="ba-k" role="slider" aria-label={slider} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(x)} onKeyDown={onKey}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
            </svg>
          </button>
        </div>
      </div>
      <p className="ba-cap" dangerouslySetInnerHTML={{ __html: p.cap }} />
    </div>
  );
}

/** Three real screens with Labs' captions: pick one and it fades in. */
export function Gallery({ shots, app, label }: { shots: { k: string; t: string; x: string }[]; app: string; label: string }) {
  const [k, setK] = useState(shots[0].k);
  const [swap, setSwap] = useState(false);
  const cur = shots.find((s) => s.k === k) ?? shots[0];
  const go = (next: string) => {
    if (next === k) return;
    if (reduced()) return setK(next);
    setSwap(true);
    window.setTimeout(() => {
      setK(next);
      setSwap(false);
    }, 180);
  };
  return (
    <div className="gal">
      <figure className="gal-fig rv" data-swap={swap ? "" : undefined}>
        <Shot key={cur.k} k={cur.k} alt={`${app}: ${cur.t}`} sizes="(min-width: 900px) 62vw, 100vw" />
      </figure>
      <div className="gal-tabs" role="group" aria-label={label}>
        {shots.map((s) => (
          <button key={s.k} type="button" className="gal-tab" aria-pressed={s.k === k} onClick={() => go(s.k)}>
            <b>{s.t}</b>
            <span>{s.x}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
