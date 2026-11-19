import Link from "next/link";
import { href, LINKS, NAME, otherLang, T, type Lang } from "@/content/site";
import { MenuButton } from "./MenuButton";
import { ThemeButton } from "./ThemeButton";

/** The header pill. On the home page its links jump within the page; elsewhere they lead back to it. */
export function Nav({ lang, path }: { lang: Lang; path: string }) {
  const home = path === "/";
  const to = (id: string) => (home ? `#${id}` : `${href(lang, "/")}#${id}`);
  const other = otherLang(lang);
  const links = (
    <>
      <a href={to("work")}>{T.nav.work[lang]}</a>
      <a href={to("about")}>{T.nav.about[lang]}</a>
      <a href={to("resume")}>{T.nav.resume[lang]}</a>
      <Link href={href(other, path)} hrefLang={other} lang={other} title={T.langName[lang]}>
        {T.langLink[lang]}
      </Link>
    </>
  );
  return (
    <header className="p-nav">
      <div className="p-nav-in">
        <Link className="p-mark" href={href(lang, "/")} title={T.home[lang]}>
          <span className="p-mark-b" aria-hidden="true">
            TP
          </span>
          <span>Tanawat</span>
        </Link>
        <nav className="p-links" aria-label={lang === "th" ? "เมนูหลัก" : "Main"}>
          {links}
        </nav>
        <ThemeButton label={T.theme[lang]} />
        <a className="p-btn p-btn-ink p-btn-sm" href={to("hire")}>
          {T.nav.hire[lang]}
        </a>
        <MenuButton label={T.menu[lang]}>
          {links}
          <ThemeButton label={T.theme[lang]} className="" text={T.themeText[lang]} />
        </MenuButton>
      </div>
    </header>
  );
}

/** 12A: work channels only, plus Labs and the privacy page. */
export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="p-ft">
      <div className="p-in">
        <div className="p-ft-in">
          <Link className="p-mark" href={href(lang, "/")} title={T.home[lang]}>
            <span className="p-mark-b" aria-hidden="true">
              TP
            </span>
            <span>Tanawat</span>
          </Link>
          <p className="p-ft-c">
            © {new Date().getFullYear()} {NAME}
          </p>
          <nav className="p-ft-l" aria-label={lang === "th" ? "ช่องทางติดต่อ" : "Elsewhere"}>
            <a href={LINKS.github}>GitHub</a>
            <a href={LINKS.linkedin}>LinkedIn</a>
            <a href={`mailto:${LINKS.email}`}>Email</a>
            <a href={LINKS.line}>LINE</a>
            <a href={LINKS.labs}>VTX Labs</a>
            <Link href={href(lang, "/privacy")}>{T.privacy[lang]}</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

/** A section head: a mono key, a small title, the heading, and an optional lead and link. */
export function Head({ k, t, h, l, more, id }: { k: string; t: string; h: string; l?: string; more?: React.ReactNode; id?: string }) {
  return (
    <div className="p-sh rv">
      <div>
        <p className="p-eye">
          <span className="p-k">{k}</span>
          {t}
        </p>
        <h2 className="p-h2" id={id}>
          {h}
        </h2>
        {l && <p className="p-lead">{l}</p>}
      </div>
      {more}
    </div>
  );
}

export const Arr = ({ c = "→" }: { c?: string }) => (
  <span className="p-arr" aria-hidden="true">
    {c}
  </span>
);
