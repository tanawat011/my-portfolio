import { LABS_TOOLS } from "@/content/site";

/**
 * How many free tools VTX Labs has: the third figure in the uptime row (owner, 19 Nov 2026, on "6 database engines in
 * one window": "น่าจะต้องเป็นตัวเลขอื่นมีไม๊คับ ไม่เอาแบบเจาะจงระบบเดียวแบบนี้", a figure for the whole family, not one app).
 *
 * Read on the server while the page is built (and again when it revalidates, once a day) from Labs's own home page,
 * whose description says "<n> free tools that run in your browser", counted from its tool list (vtx-labs,
 * app/(tools)/page.tsx: toolViews().length). Visitors' browsers never call Labs for it. If the page can't be read, or
 * doesn't say a count, the count last checked by hand stands (LABS_TOOLS in content/site.ts).
 */
export function parseToolCount(html: string): number | null {
  const m = /\b(\d{1,4}) free tools\b/.exec(html);
  if (!m) return null;
  const n = Number(m[1]);
  return n > 0 ? n : null;
}

export async function labsToolCount(): Promise<number> {
  try {
    const res = await fetch("https://vtxlabs.app/", {
      headers: { "User-Agent": "tanawat.dev (build)" },
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return LABS_TOOLS.n;
    return parseToolCount(await res.text()) ?? LABS_TOOLS.n;
  } catch {
    return LABS_TOOLS.n;
  }
}
