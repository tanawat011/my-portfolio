/** The numbers behind the six effects (pure, tested). The same as VTX Studio's motion preview (math.ts, e80e93b). */

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
export const easeOut = (x: number) => 1 - Math.pow(1 - clamp01(x), 3);
const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

/** Effect 1: boxes that come in together wait a little longer each, in page order, capped so nothing waits long. */
export function staggerDelays(n: number, step: number, cap = 420): number[] {
  return Array.from({ length: n }, (_, i) => Math.min(i * step, cap));
}

/**
 * Effect 4: where the pinned story is, from the track's scroll progress p (0–1). Each chapter holds still for most of
 * its share (dwell), then glides to the next. Returns the place s (0 … n−1), the lit chapter (−1 while gliding) and
 * each chapter's opacity and lift (neighbours cross-fade).
 */
export function pinnedState(p: number, n: number, dwell = 0.58) {
  const k = clamp01(p) * n;
  const i = Math.min(n - 1, Math.floor(k));
  const f = k - i;
  const s = i >= n - 1 ? n - 1 : i + easeInOut(clamp01((f - dwell) / (1 - dwell)));
  const near = Math.round(s);
  const on = Math.abs(s - near) < 0.08 ? near : -1;
  const cards = Array.from({ length: n }, (_, j) => {
    const d = j - s;
    return { opacity: clamp01(1 - Math.abs(d) * 1.3), lift: Math.max(-1, Math.min(1, d)) };
  });
  return { s, on, cards };
}

/** Effect 4's track: progress through it, given its box and where the pinned panel sticks. */
export function trackProgress(top: number, height: number, stickTop: number, pinHeight: number): number {
  const run = height - pinHeight;
  return run > 0 ? clamp01((stickTop - top) / run) : 0;
}

/** Effect 5: the number shown t ms into a count of `ms` up to `target` (whole numbers, eased, ends exact). */
export function countAt(target: number, t: number, ms: number): number {
  if (t >= ms) return target;
  return Math.round(target * easeOut(t / ms));
}

/** Effect 6: a heading's pieces. Cuts plain text only at its spaces, so a Thai phrase is never split. */
export function splitWords(text: string): string[] {
  return text.split(/(\s+)/).filter((x) => x.length > 0);
}
