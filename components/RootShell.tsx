import type { Lang } from "@/content/site";
import { T } from "@/content/site";
import { fontVars } from "@/app/fonts";
import { AnalyticsRoot } from "./AnalyticsRoot";
import { Behaviours } from "./Behaviours";
import { DEFAULT_THEME, themeScript } from "./theme-key";
import "@/app/globals.css";

/**
 * <html> and <body> for both root layouts: (en) at / and (th) at /th. The font variables sit on <html> so the stacks
 * in globals.css can read them; data-theme starts at the default and the head script swaps in the visitor's choice
 * before the first paint. Every page lives in .pv, the container the styles measure against.
 */
export function RootShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={lang} className={fontVars} data-theme={DEFAULT_THEME} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div className="pv">
          <a className="skip" href="#main">
            {T.skip[lang]}
          </a>
          {children}
        </div>
        <Behaviours />
        <AnalyticsRoot />
      </body>
    </html>
  );
}
