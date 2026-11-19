import Link from "next/link";
import { FOOT } from "@/content/home";
import { href, LINKS, NAME, otherLang, T, type Lang } from "@/content/site";
import { MenuButton } from "./MenuButton";
import { ThemeButton } from "./ThemeButton";

/** The old site's logo, in G's light. */
export const Ta = () => (
  <span className="ta grad" aria-hidden="true">
    {"<Ta />"}
  </span>
);

/** The old site's bar: the logo left, the links right; clear at the top, glass once you scroll (Behaviours). */
export function Nav({ lang, path }: { lang: Lang; path: string }) {
  const home = path === "/";
  const to = (id: string) => (home ? `#${id}` : `${href(lang, "/")}#${id}`);
  const other = otherLang(lang);
  const items: [string, { en: string; th: string }][] = [
    ["home", { en: "Home", th: "หน้าแรก" }],
    ["about", { en: "About", th: "เกี่ยวกับ" }],
    ["vtx", { en: "VTX", th: "VTX" }],
    ["resume", { en: "Resume", th: "Resume" }],
    ["portfolio", { en: "Portfolio", th: "ผลงาน" }],
    ["showcase", { en: "Showcase", th: "Showcase" }],
  ];
  const links = (
    <>
      {items.map(([id, t]) => (
        <a key={id} href={to(id)}>
          {t[lang]}
        </a>
      ))}
      <Link href={href(other, path)} hrefLang={other} lang={other} title={T.langName[lang]}>
        {T.langLink[lang]}
      </Link>
    </>
  );
  return (
    <header className="o-nav" data-nav>
      <div className="o-nav-in">
        <Link className="o-logo" href={href(lang, "/")} title={T.home[lang]}>
          <Ta />
          <span className="sr">Tanawat</span>
        </Link>
        <nav className="o-links" aria-label={lang === "th" ? "เมนูหลัก" : "Main"}>
          {links}
        </nav>
        <ThemeButton label={T.theme[lang]} />
        <MenuButton label={T.menu[lang]}>
          {links}
          <ThemeButton label={T.theme[lang]} className="" text={T.themeText[lang]} />
        </MenuButton>
      </div>
    </header>
  );
}

/** Round 1's footer, which the owner kept, with the old logo and the old AI line. */
export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="p-ft">
      <div className="p-in">
        <div className="p-ft-in">
          <Link className="o-logo" href={href(lang, "/")} title={T.home[lang]}>
            <Ta />
            <span className="sr">Tanawat</span>
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
        <p className="p-ft-ai">{FOOT.ai[lang]}</p>
      </div>
    </footer>
  );
}

/** The old site's centred section head: a mono prompt, the title with one word lit, the short bar, a line under. */
export function OldHead({ k, pre, grad, post, sub, id }: { k?: string; pre: string; grad: string; post?: string; sub?: string; id?: string }) {
  return (
    <div className="o-head rv">
      {k && <p className="o-k">{k}</p>}
      <h2 id={id}>
        {pre && <>{pre} </>}
        <span className="grad">{grad}</span>
        {post && <> {post}</>}
      </h2>
      <div className="o-div" aria-hidden="true" />
      {sub && <p className="o-sub">{sub}</p>}
    </div>
  );
}

export const Arr = ({ c = "→" }: { c?: string }) => (
  <span className="p-arr" aria-hidden="true">
    {c}
  </span>
);
