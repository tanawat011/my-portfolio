// A relative path, not an alias: next.config.ts reads this file too, before any path alias exists.
import { analyticsReady, type AnalyticsConfig } from "../vendor/vtx-kit/analytics";

/**
 * Counting with Umami Cloud (owner, 19 Nov 2026, 8A; kit docs/analytics.md). Google Analytics is gone, code and env.
 * The family's one website, tagged "portfolio". Counts visits only, plus which CV someone opened ({style, len}).
 * Only tanawat.dev counts: local builds and previews never do.
 */
export const ANALYTICS: AnalyticsConfig = {
  umami: "43a0ccaf-5101-4a72-885e-b5c3486a3912",
  domains: ["tanawat.dev"],
  tag: "portfolio",
};

export const analyticsOn = analyticsReady(ANALYTICS);
