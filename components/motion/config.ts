/**
 * X1 (owner, 19 Nov 2026, on VTX Studio's motion preview: "ดูดีเลยครับ Studio motion 1 2 3 4 5 6"): Studio's scroll
 * effects, all on, except 4: on seeing the pinned story here he said it felt stuck ("แม่งอารมเหมือนค้างเลื่อนไม่ไปอ่ะ"),
 * so the story scrolls normally with round 2's rail. Modelled on Studio's preview (vtx-studio, branch motion-preview,
 * e80e93b): same numbers, same guards. There's no switch panel; `?motion=none` or `?motion=1,5` in the address turns
 * effects off for testing, for that page only.
 *
 *   1 fade and rise in stages (this replaces the old `.rv` reveal: one entrance, never two)
 *   2 zoom with scroll: the hero recedes as you leave it; the case pages' screens come up to size
 *   3 parallax: the light layers move slower than the page (off on phones)
 *   (4, Studio's pinned scene, is not used here)
 *   5 the four real figures (9 / 11 / 6 / 2) count up once; never the Fun Facts
 *   6 headings word by word; a Thai phrase (no spaces) stays one piece
 *
 * Reduce motion: none of it. Without script nothing is hidden: only the runtime ever hides anything, and only what is
 * still below the fold. The classes the head script sets go again if the runtime hasn't started 8 s later.
 */
export type EffectId = 1 | 2 | 3 | 5 | 6;
export const ALL: EffectId[] = [1, 2, 3, 5, 6];

/** "all" | "none" | "1,3,5" → the effects that are on; null when the text says nothing usable. */
export function parseMotion(s: string | null | undefined): EffectId[] | null {
  if (s == null) return null;
  const v = s.trim().toLowerCase();
  if (v === "all") return [...ALL];
  if (v === "none" || v === "0" || v === "") return [];
  const ids = v
    .split(/[\s,]+/)
    .map(Number)
    .filter((n): n is EffectId => (ALL as number[]).includes(n));
  return ids.length ? ids : null;
}

/** What is on for this page: the address says, else everything; Reduce motion turns all of it off. */
export function effectsOn(search: string, reduce: boolean): EffectId[] {
  if (reduce) return [];
  return parseMotion(new URLSearchParams(search).get("motion")) ?? [...ALL];
}

/**
 * Runs in <head> before the first paint (inside the theme script): puts the effects on <html> as mp-1 … mp-6, so
 * they're there from the first frame. If the runtime hasn't said it started (window.__mpLive) 8 s later, the
 * classes go again and the page is the plain site.
 */
export const motionHeadScript = `try{var m=function(q){return!!(window.matchMedia&&matchMedia(q).matches)},all=${JSON.stringify(ALL)},q=new URLSearchParams(location.search).get("motion"),on=all.slice();if(q!=null){q=q.trim().toLowerCase();if(q==="none"||q==="0"||q==="")on=[];else if(q!=="all"){var r=q.split(/[\\s,]+/).map(Number).filter(function(n){return all.indexOf(n)>=0});if(r.length)on=r}}if(m("(prefers-reduced-motion: reduce)"))on=[];var c=on.map(function(n){return"mp-"+n});c.forEach(function(x){d.classList.add(x)});setTimeout(function(){if(!window.__mpLive)c.forEach(function(x){d.classList.remove(x)})},8000)}catch(e){}`;
