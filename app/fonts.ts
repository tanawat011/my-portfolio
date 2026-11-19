import { JetBrains_Mono, Kanit, Noto_Sans_Thai, Plus_Jakarta_Sans } from "next/font/google";

// Self-hosted at build time by next/font: no request to Google from a visitor's browser (PDPA; kit ux-motion.md § 11).
// All four are SIL Open Font License 1.1 (listed on /privacy). The same set as VTX Studio's direction G: headings in
// Plus Jakarta Sans (Latin) + Kanit (Thai), body in Plus Jakarta Sans + Noto Sans Thai, JetBrains Mono for small labels.
export const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"], display: "swap" });
export const kanit = Kanit({ variable: "--font-kanit", subsets: ["thai"], weight: ["500", "600"], display: "swap", preload: false });
export const notoThai = Noto_Sans_Thai({ variable: "--font-noto-thai", subsets: ["thai"], display: "swap", preload: false });
/** Only small labels and the terminal use it: not preloaded, so it never competes with the headline. */
export const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["400", "500"], display: "swap", preload: false });

export const fontVars = [jakarta, kanit, notoThai, mono].map((f) => f.variable).join(" ");
