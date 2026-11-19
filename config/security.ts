// Security headers for every page (kit docs/web-checklist.md § 4), as VTX Studio sets them.
// Relative imports only: next.config.ts reads this file before path aliases exist.
import { analyticsCsp } from "../vendor/vtx-kit/analytics";
import { ANALYTICS } from "../content/analytics";

/**
 * Who a page talks to: nobody but itself, and Umami. Fonts are self-hosted by next/font, every picture is ours.
 * 'unsafe-inline' scripts are needed by Next's inline chunks and the theme script; 'unsafe-eval' only in dev.
 */
export function csp({ dev = false }: { dev?: boolean } = {}): string {
  const counting = analyticsCsp(ANALYTICS);
  const more = (hosts: string[]) => (hosts.length ? ` ${hosts.join(" ")}` : "");
  return [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}${more(counting.script)}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    `connect-src 'self'${more(counting.connect)}`,
    "media-src 'self'",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(dev ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");
}

type Header = { key: string; value: string };
type Rule = { source: string; headers: Header[] };

/** The rules for next.config.ts headers(). Vercel adds HSTS itself. */
export function securityHeaders(dev: boolean): Rule[] {
  return [
    {
      source: "/(.*)",
      headers: [
        { key: "Content-Security-Policy", value: csp({ dev }) },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
      ],
    },
  ];
}
