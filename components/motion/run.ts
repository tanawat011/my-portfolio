import { ALL, effectsOn } from "./config";
import { clamp01, countAt, splitWords, staggerDelays } from "./math";

/**
 * The scroll effects at run time (components/motion/config.ts says what each is). Behaviours starts this once per
 * page. The story's rail (StoryRail, components/Motion.tsx) moves with the scroll on its own, as in round 2.
 *
 * Text is never left hidden: only boxes still below the fold are ever armed, a scroll check and a timer reveal anything
 * the observer missed, and stopping puts everything back as React drew it.
 */
type Stop = () => void;
const noop: Stop = () => {};

const mq = (q: string) => window.matchMedia?.(q).matches ?? false;
const phone = () => mq("(max-width: 640px)");
const viewH = () => window.innerHeight || document.documentElement.clientHeight;
const supportsScrollTimeline = () => typeof CSS !== "undefined" && !!CSS.supports?.("animation-timeline: view()");

export function startMotion(): Stop {
  (window as unknown as { __mpLive?: boolean }).__mpLive = true;
  const on = new Set(effectsOn(location.search, mq("(prefers-reduced-motion: reduce)")));
  const root = document.documentElement;
  for (const id of ALL) root.classList.toggle(`mp-${id}`, on.has(id));
  const stops: Stop[] = [];
  if (on.has(1) || on.has(6)) stops.push(staged(on.has(1), on.has(6)));
  if ((on.has(2) || on.has(3)) && !supportsScrollTimeline()) stops.push(scrollFallback(on.has(2), on.has(3)));
  if (on.has(5)) stops.push(counts());
  return () => stops.forEach((s) => s());
}

/* 1 · fade and rise in stages, and 6 · headings word by word: one observer, one queue per frame ------------------- */

/** What fades in: every old `.rv` box, except a section head, whose parts come in one by one instead. */
const HEAD_BOXES = ".o-head, .o-weap-h, .o-story-h, .o-true-h";
const FADE = `main .rv:not(${HEAD_BOXES}), main .o-head > :not(h2), main .o-weap-h > :not(h3), main .d-art > *, main .d-chp, main .o-core-l, main .o-core-t`;
/** What comes in word by word: the section headings below the hero, and the case pages' section titles. */
const HEADS = "main .o-head h2, main .o-weap-h h3, main .o-story-h, main .o-true-h, main .d-wh";

/** Splits a heading into pieces that appear one after another; null when that would change how it wraps. */
function split(h: HTMLElement): Stop | null {
  const before = h.getBoundingClientRect().height;
  const undo: Stop[] = [];
  let i = 0;
  for (const c of [...h.childNodes]) {
    if (c.nodeType === Node.TEXT_NODE) {
      const parts = splitWords(c.textContent ?? "");
      if (!parts.some((p) => p.trim())) continue;
      const nodes: Node[] = parts.map((p) => {
        if (!p.trim()) return document.createTextNode(p);
        const s = document.createElement("span");
        s.className = "mp-w";
        s.style.setProperty("--i", String(i++));
        s.textContent = p;
        return s;
      });
      nodes.forEach((n) => h.insertBefore(n, c));
      h.removeChild(c);
      // put React's own text node back exactly where it was
      undo.push(() => {
        nodes[0].parentNode?.insertBefore(c, nodes[0]);
        nodes.forEach((n) => n.parentNode?.removeChild(n));
      });
    } else if (c instanceof HTMLElement) {
      // an element inside a heading (the gradient word) is one piece: never cut inside it
      c.classList.add("mp-w");
      c.style.setProperty("--i", String(i++));
      undo.push(() => {
        c.classList.remove("mp-w");
        c.style.removeProperty("--i");
      });
    }
  }
  h.classList.add("mp-split");
  const restore = () => {
    h.classList.remove("mp-split", "mp-in");
    h.style.removeProperty("--mp-d");
    undo.reverse().forEach((f) => f());
  };
  if (i < 2 || Math.abs(h.getBoundingClientRect().height - before) > 1) {
    restore();
    return null;
  }
  return restore;
}

function staged(fade: boolean, words: boolean): Stop {
  if (!("IntersectionObserver" in window)) return noop;
  const step = phone() ? 50 : 70;
  const below = (el: Element) => el.getBoundingClientRect().top >= viewH();
  const undo: Stop[] = [];
  const armed = new Set<HTMLElement>();
  const timers = new Set<number>();

  const boxes = fade ? [...document.querySelectorAll<HTMLElement>(FADE)] : [];
  const set = new Set(boxes);
  const insideBox = (el: HTMLElement) => {
    for (let up = el.parentElement; up; up = up.parentElement) if (set.has(up)) return true;
    return false;
  };
  // a heading inside a box that fades in comes in with its box (one entrance, never two nested)
  const heads = words ? [...document.querySelectorAll<HTMLElement>(HEADS)].filter((h) => below(h) && !insideBox(h)) : [];
  for (const h of heads) {
    const restore = split(h);
    if (!restore) continue;
    armed.add(h);
    undo.push(restore);
  }
  for (const el of boxes) {
    if (insideBox(el) || armed.has(el) || !below(el)) continue;
    el.classList.add("mp-arm");
    armed.add(el);
    undo.push(() => {
      el.classList.remove("mp-arm", "mp-in");
      el.style.removeProperty("--mp-d");
    });
  }

  let queue: HTMLElement[] = [];
  let qraf = 0;
  const flush = () => {
    qraf = 0;
    const batch = queue.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
    queue = [];
    const delays = staggerDelays(batch.length, step);
    batch.forEach((el, i) => {
      el.style.setProperty("--mp-d", `${delays[i]}ms`);
      el.classList.add("mp-in");
      // once in, a faded box is a plain box again (its hover lift and its own styles take over)
      if (el.classList.contains("mp-arm")) {
        const t = window.setTimeout(() => {
          el.classList.remove("mp-arm", "mp-in");
          el.style.removeProperty("--mp-d");
          timers.delete(t);
        }, delays[i] + 1100);
        timers.add(t);
      }
    });
  };
  const show = (el: HTMLElement) => {
    if (!armed.has(el)) return;
    armed.delete(el);
    io.unobserve(el);
    queue.push(el);
    if (!qraf) qraf = requestAnimationFrame(flush);
  };
  const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && show(e.target as HTMLElement)), { rootMargin: "0px 0px -8% 0px" });
  armed.forEach((el) => io.observe(el));
  // backstops: whatever is above the bottom of the window is shown, observer or not
  let sraf = 0;
  const sweep = () => {
    sraf = 0;
    for (const el of [...armed]) if (el.getBoundingClientRect().top < viewH()) show(el);
  };
  const onScroll = () => {
    if (!sraf) sraf = requestAnimationFrame(sweep);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  const late = window.setTimeout(sweep, 1500);
  return () => {
    io.disconnect();
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    cancelAnimationFrame(qraf);
    cancelAnimationFrame(sraf);
    clearTimeout(late);
    timers.forEach(clearTimeout);
    undo.reverse().forEach((f) => f());
  };
}

/* 2 · zoom and 3 · parallax where the browser has no scroll-driven animations: the same numbers from one rAF ------- */
function scrollFallback(zoom: boolean, depth: boolean): Stop {
  const lite = phone();
  const items: { el: HTMLElement; set: (el: HTMLElement) => void; props: string[] }[] = [];
  const cover = (el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    return clamp01((viewH() - r.top) / (viewH() + r.height));
  };
  const entry = (el: HTMLElement, to: number) => {
    const r = el.getBoundingClientRect();
    return clamp01((viewH() - r.top) / ((viewH() + r.height) * to));
  };
  const hero = document.querySelector<HTMLElement>("main .o-hi");
  if (zoom && hero)
    items.push({
      el: hero,
      props: ["scale", "opacity", "translate"],
      set: (el) => {
        const p = clamp01(window.scrollY / (viewH() * 0.9));
        el.style.scale = String(1 - p * (lite ? 0.1 : 0.2));
        el.style.opacity = String(1 - p * (lite ? 0.6 : 0.8));
        el.style.translate = `0 ${(p * (lite ? 4 : 6)).toFixed(2)}%`;
      },
    });
  if (zoom)
    for (const el of document.querySelectorAll<HTMLElement>("main .gal-fig img, main .ba"))
      items.push({ el, props: ["scale"], set: (e) => (e.style.scale = String((lite ? 0.96 : 0.92) + (lite ? 0.04 : 0.08) * entry(e, 0.42))) });
  if (depth && !lite) {
    const pools = document.querySelector<HTMLElement>("main .o-pools");
    if (pools) items.push({ el: pools, props: ["translate"], set: (e) => (e.style.translate = `0 ${(clamp01(window.scrollY / viewH()) * 22).toFixed(2)}vh`) });
    for (const el of document.querySelectorAll<HTMLElement>("main .p-hire, main .getit"))
      items.push({ el, props: ["--mp-drift"], set: (e) => e.style.setProperty("--mp-drift", `${(-12 + 24 * cover(e)).toFixed(1)}%`) });
  }
  if (!items.length) return noop;
  let raf = 0;
  const frame = () => {
    raf = 0;
    items.forEach((i) => i.set(i.el));
  };
  const on = () => {
    if (!raf) raf = requestAnimationFrame(frame);
  };
  frame();
  window.addEventListener("scroll", on, { passive: true });
  window.addEventListener("resize", on, { passive: true });
  return () => {
    window.removeEventListener("scroll", on);
    window.removeEventListener("resize", on);
    cancelAnimationFrame(raf);
    items.forEach(({ el, props }) => props.forEach((p) => el.style.removeProperty(p)));
  };
}

/* 5 · the four real figures count up once, as they come into view (only the .p-proof row: never the Fun Facts) ----- */
function counts(): Stop {
  const els = [...document.querySelectorAll<HTMLElement>("main .p-proof b")].filter((b) => /^\d+$/.test(b.textContent?.trim() ?? ""));
  if (!els.length || !("IntersectionObserver" in window)) return noop;
  const targets = new Map(els.map((b) => [b, Number(b.textContent!.trim())]));
  // change the text React drew in place (its own text node), never swap the node
  const put = (b: HTMLElement, v: number) => {
    if (b.firstChild?.nodeType === Node.TEXT_NODE) b.firstChild.nodeValue = String(v);
  };
  const waiting = els.filter((b) => b.getBoundingClientRect().top >= viewH());
  if (!waiting.length) return noop;
  const started = new Set<HTMLElement>();
  const rafs = new Set<number>();
  let order = 0;
  const run = (b: HTMLElement) => {
    if (started.has(b)) return;
    started.add(b);
    io.unobserve(b);
    const target = targets.get(b)!;
    const delay = 120 * order++;
    let t0 = 0;
    const tick = (now: number) => {
      if (!t0) t0 = now + delay;
      const v = countAt(target, Math.max(0, now - t0), 1100);
      put(b, v);
      if (v !== target) rafs.add(requestAnimationFrame(tick));
    };
    rafs.add(requestAnimationFrame(tick));
  };
  const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && run(e.target as HTMLElement)), { rootMargin: "0px 0px -10% 0px" });
  waiting.forEach((b) => {
    put(b, 0);
    io.observe(b);
  });
  // backstop: a number on screen that the observer missed starts counting anyway
  const late = window.setInterval(() => {
    for (const b of waiting) if (!started.has(b) && b.getBoundingClientRect().top < viewH()) run(b);
  }, 1000);
  return () => {
    io.disconnect();
    clearInterval(late);
    rafs.forEach(cancelAnimationFrame);
    targets.forEach((n, b) => put(b, n));
  };
}
