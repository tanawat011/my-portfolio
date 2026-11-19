/** The numbers behind the scroll effects (pure, tested). The same as VTX Studio's motion preview (math.ts, e80e93b). */

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
export const easeOut = (x: number) => 1 - Math.pow(1 - clamp01(x), 3);

/** Effect 1: boxes that come in together wait a little longer each, in page order, capped so nothing waits long. */
export function staggerDelays(n: number, step: number, cap = 420): number[] {
  return Array.from({ length: n }, (_, i) => Math.min(i * step, cap));
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
