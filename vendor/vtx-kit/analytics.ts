// Analytics for VTX web apps: who visits, what they use, and what for (owner, 12 Nov 2026, in CraftCV:
// "อยากรู้เรื่องคนเข้ามาทั้งดูและใช้งานและใช้ทำอะไรกันบ้าง" → R3 · 1A 2ABCD 3A). The rules are docs/analytics.md.
//
// Umami Cloud (1A): no cookies, events included in the free plan. Read from its own tracker (cloud.umami.is/script.js,
// 12 Nov 2026): it posts to gateway.umami.is/api/send with the page's url, title, referrer, screen and language,
// and calls window[data-before-send] first, which may change the payload or cancel it.
// Nothing here runs until the app fills in its website ID (analyticsReady), like Support.
// ⛔ Never send what a person typed. Only the page, where they came from, and short fixed words (safeData).

/** What an app fills in. Empty = no script, no hosts in the CSP, every track() does nothing. */
export interface AnalyticsConfig {
  /** Umami Cloud website ID, from the Umami dashboard (a UUID). Not a secret: it sits in every page's HTML. */
  umami?: string;
  /** Count only on these hostnames (Umami's data-domains), so a local or preview build never counts. */
  domains?: string[];
  /**
   * The app's name in the family's one Umami website (0.24.0): Umami's free plan has one website, so every VTX
   * site sends to the same ID and tags what it sends ("craftcv", "labs"). The dashboard filters by tag.
   * One short lowercase word; anything else is left out.
   */
  tag?: string;
}

export const UMAMI_SCRIPT = "https://cloud.umami.is/script.js";
/** Where the tracker comes from and where it sends: the app adds these to its CSP when analytics is on. */
export const UMAMI_HOSTS = { script: "https://cloud.umami.is", connect: "https://gateway.umami.is" } as const;
/** The global the tracker calls before each send (its data-before-send). */
export const BEFORE_SEND = "vtxAnalyticsBeforeSend";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function analyticsReady(c: AnalyticsConfig): boolean {
  return UUID.test(c.umami?.trim() ?? "");
}

/** The CSP hosts to add: none while analytics is off. */
export function analyticsCsp(c: AnalyticsConfig): { script: string[]; connect: string[] } {
  return analyticsReady(c) ? { script: [UMAMI_HOSTS.script], connect: [UMAMI_HOSTS.connect] } : { script: [], connect: [] };
}

/** The tracker's attributes: respects Do Not Track, drops query strings and hashes, counts only on `domains`. */
export function umamiAttrs(c: AnalyticsConfig): Record<string, string> | null {
  if (!analyticsReady(c)) return null;
  const a: Record<string, string> = {
    src: UMAMI_SCRIPT,
    "data-website-id": c.umami!.trim(),
    "data-before-send": BEFORE_SEND,
    "data-do-not-track": "true",
    "data-exclude-search": "true",
    "data-exclude-hash": "true",
  };
  if (c.domains?.length) a["data-domains"] = c.domains.join(",");
  if (c.tag && /^[a-z][a-z0-9-]{0,29}$/.test(c.tag)) a["data-tag"] = c.tag;
  return a;
}

/** A value an event may carry: a number, true / false, or one short fixed word ("pdf", "modern", "th"). */
const TOKEN = /^[a-z0-9][a-z0-9_.-]{0,39}$/i;
export type EventData = Record<string, string | number | boolean>;

/** Keeps only safe values: anything with a space, an @, a slash or over 40 characters is dropped, so CV text can't slip out. */
export function safeData(data: Record<string, unknown> | undefined): EventData | undefined {
  if (!data) return undefined;
  const out: EventData = {};
  for (const [k, v] of Object.entries(data)) {
    if (!TOKEN.test(k)) continue;
    if (typeof v === "number" && Number.isFinite(v)) out[k] = v;
    else if (typeof v === "boolean") out[k] = v;
    else if (typeof v === "string" && TOKEN.test(v)) out[k] = v;
  }
  return Object.keys(out).length ? out : undefined;
}

/** A path with its ids taken out: /builder/3f2a…-…/edit → /builder/:id/edit. A number or a long hex / uuid is an id. */
export function cleanPath(url: string): string {
  let path = url;
  try {
    path = new URL(url, "https://x.invalid").pathname;
  } catch {
    /* keep it as given */
  }
  return path
    .split("/")
    .map((s) => (/^\d+$/.test(s) || /^[0-9a-f-]{16,}$/i.test(s) ? ":id" : s))
    .join("/");
}

/** Only where someone came from, never the page: https://www.google.com/search?q=… → https://www.google.com */
export function cleanReferrer(ref: unknown): string {
  if (typeof ref !== "string" || !ref) return "";
  try {
    const u = new URL(ref);
    return u.protocol === "http:" || u.protocol === "https:" ? u.origin : "";
  } catch {
    return "";
  }
}

/**
 * The tracker's before-send: what leaves the page. The title goes (a CV page may carry a name), the url keeps only its
 * path without ids, the referrer only its origin, event data only safe values. Error reports are cancelled: their
 * message could hold anything.
 */
export function cleanPayload(type: string, payload: Record<string, unknown> | null | undefined): Record<string, unknown> | null {
  if (!payload || type === "error") return null;
  const out: Record<string, unknown> = { ...payload, title: "" };
  if (typeof payload.url === "string") out.url = cleanPath(payload.url);
  if ("referrer" in payload) out.referrer = cleanReferrer(payload.referrer);
  if ("data" in payload) {
    const d = safeData(payload.data as Record<string, unknown> | undefined);
    if (d) out.data = d;
    else delete out.data;
  }
  return out;
}

type UmamiWindow = Window & { umami?: { track: (name: string, data?: EventData) => void }; [BEFORE_SEND]?: typeof cleanPayload };

/**
 * Starts counting: puts the before-send in place, then adds the tracker once. Call it in the browser, after the
 * page has loaded. Does nothing while analytics is off or when it has already started.
 */
export function startAnalytics(c: AnalyticsConfig, doc: Document = document): boolean {
  const attrs = umamiAttrs(c);
  const win = doc.defaultView as UmamiWindow | null;
  if (!attrs || !win || doc.querySelector(`script[src="${UMAMI_SCRIPT}"]`)) return false;
  win[BEFORE_SEND] = cleanPayload;
  const s = doc.createElement("script");
  s.defer = true;
  for (const [k, v] of Object.entries(attrs)) s.setAttribute(k, v);
  doc.head.appendChild(s);
  return true;
}

/** Counts one action: a short kebab-case name ("download") and safe values ({ kind: "pdf" }). Never throws. */
export function track(name: string, data?: Record<string, unknown>, win: UmamiWindow | undefined = typeof window === "undefined" ? undefined : (window as UmamiWindow)): void {
  if (!/^[a-z][a-z0-9-]{0,39}$/.test(name)) return;
  try {
    win?.umami?.track(name, safeData(data));
  } catch {
    /* counting must never break the app */
  }
}

/** Whether to ask "what is this for?" again: never asked, or last asked `everyDays` or more ago (YYYY-MM-DD days). */
export function askDue(last: string | null, today: string, everyDays = 30): boolean {
  if (!last) return true;
  const a = Date.parse(`${last}T00:00:00Z`);
  const b = Date.parse(`${today}T00:00:00Z`);
  if (Number.isNaN(a) || Number.isNaN(b)) return true;
  return (b - a) / 86_400_000 >= everyDays;
}
