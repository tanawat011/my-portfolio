/**
 * "Now shipping" (round 3b, X4): the newest public VTX release, read on the server while the page is built (and again
 * when it revalidates, once a day). Visitors' browsers never call GitHub, and no token is used.
 *
 * Each app's builds-only repo, tanawat011/vtx-<id>-release, attaches a labs.json to its releases (the same file VTX Labs
 * reads; Labs' lib/labs-json.ts). Like Labs, this reads it through github.com's latest-download link, so GitHub's API
 * and its rate limit are not involved. A 404 means the app has no public release yet. Any other failure hides the
 * whole strip: without every answer there's no telling which release is newest, and it never shows a guess.
 */
export interface Shipping {
  id: string;
  version: string;
  /** YYYY-MM-DD, as labs.json gives it */
  date: string;
  preview: boolean;
}

type One = { ok: true; s: Shipping | null } | { ok: false };

async function latest(id: string): Promise<One> {
  try {
    const res = await fetch(`https://github.com/tanawat011/vtx-${id}-release/releases/latest/download/labs.json`, {
      headers: { "User-Agent": "tanawat.dev (build)" },
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(8000),
    });
    if (res.status === 404) return { ok: true, s: null };
    if (!res.ok) return { ok: false };
    return { ok: true, s: parseLabs(await res.json(), id) };
  } catch {
    return { ok: false };
  }
}

/** The four fields the strip shows, or null when the file isn't a labs.json for this app. */
export function parseLabs(j: unknown, id: string): Shipping | null {
  if (!j || typeof j !== "object") return null;
  const o = j as Record<string, unknown>;
  if (o.schema !== 1 || o.app !== id) return null;
  if (typeof o.version !== "string" || !/^\d+\.\d+\.\d+$/.test(o.version)) return null;
  if (typeof o.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(o.date)) return null;
  return { id, version: o.version, date: o.date, preview: o.preview === true };
}

/** Every app whose release came out on the newest date (more than one if they shipped the same day), or null. */
export function newest(all: Shipping[]): Shipping[] | null {
  if (!all.length) return null;
  const top = all.reduce((m, s) => (s.date > m ? s.date : m), "");
  return all.filter((s) => s.date === top);
}

export async function nowShipping(ids: string[]): Promise<Shipping[] | null> {
  const got = await Promise.all(ids.map(latest));
  if (got.some((g) => !g.ok)) return null;
  return newest(got.flatMap((g) => (g.ok && g.s ? [g.s] : [])));
}
