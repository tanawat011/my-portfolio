import Link from "next/link";
import { fontVars } from "./fonts";
import { DEFAULT_THEME, themeScript } from "@/components/theme-key";
import { T } from "@/content/site";
import "./globals.css";

export const metadata = { title: "Not found · Tanawat Pinthongpan" };

/** One 404 for both root layouts (next.config.ts: experimental.globalNotFound), in both languages. */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVars} data-theme={DEFAULT_THEME} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div className="pv">
          <main className="nf">
            <div>
              <div className="orbc" aria-hidden="true" />
              <p className="p-eye" style={{ justifyContent: "center" }}>
                <span className="p-k">404</span>tanawat.dev
              </p>
              <h1>{T.notFoundH.en}</h1>
              <p>{T.notFoundP.en}</p>
              <p lang="th">
                {T.notFoundH.th} · {T.notFoundP.th}
              </p>
              <div className="acts">
                <Link className="p-btn p-btn-ink" href="/">
                  Home <span className="p-arr" aria-hidden="true">→</span>
                </Link>
                <Link className="p-btn p-btn-gh" href="/th" lang="th">
                  หน้าแรก (ไทย)
                </Link>
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
