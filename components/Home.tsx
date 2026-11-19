import Link from "next/link";
import { APPS, hasCase, labsUrl } from "@/content/apps";
import { ABILITIES, ABOUT, FUN, HERO, HIRE_TERM, INSIDE, LIVE, PROJECTS, RESUME, TERM, TRUE_FACTS, UPTIME, VTX, WEAPONS } from "@/content/home";
import { CVS, href, LINKS, STORY, STUDIO, T, WEB, yearsSince, type Lang } from "@/content/site";
import CV_META from "@/content/cvs.json";
import NIGHT from "@/content/night-commits.json";
import { repoFacts } from "@/lib/github";
import { labsToolCount } from "@/lib/labs";
import { nowShipping } from "@/lib/releases";
import { CvCard, PjCard, type CvVersion } from "./Cards";
import { Band } from "./Band";
import { HelloTerm, type TermWords } from "./HelloTerm";
import { HireTerm } from "./HireTerm";
import { Arr, Footer, Nav, OldHead } from "./Frame";
import { Icon } from "./Icons";
import { StoryRail } from "./Motion";
import { Shot } from "./Shot";

/** The old site's drifting dots, placed by the same seeded formula it used (Hero.tsx), so they sit where they sat. */
const seed = (n: number) => ((n * 9301 + 49297) % 233280) / 233280;
const DOTS = Array.from({ length: 40 }, (_, i) => ({
  left: seed(i * 3) * 100,
  top: seed(i * 7 + 1) * 100,
  o: seed(i * 11 + 2) * 0.4 + 0.1,
  du: seed(i * 13 + 3) * 3 + 2,
  de: seed(i * 17 + 4) * 2,
}));
const fill = (s: string, y: number) => s.replace("{y}", String(y));

/**
 * Round 2 (owner, 19 Nov 2026): the old site is the base, in G, in his own voice. Him first, the work as proof:
 * hero → uptime (round 1's band and the real figures) → about (abilities, the round photo, round 1's story rail,
 * the weapons) → the VTX family → resume → projects → live → fun facts (jokes only) → round 1's hire card.
 */
const day = (iso: string, lang: Lang) =>
  new Intl.DateTimeFormat(lang === "th" ? "th-TH-u-ca-gregory" : "en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));

export async function Home({ lang }: { lang: Lang }) {
  const y = yearsSince();
  const [facts, shipping, tools] = await Promise.all([Promise.all(PROJECTS.items.map((p) => repoFacts("tanawat011", p.repo))), nowShipping(APPS.map((a) => a.id)), labsToolCount()]);
  const term = Object.fromEntries(Object.entries(TERM).map(([k, v]) => [k, v[lang]])) as unknown as TermWords;
  const termCvs = (["Modern", "Minimal"] as const).flatMap((style) =>
    (["full", "short"] as const).map((len) => ({ label: `${style} · ${RESUME.len[len][lang]}`, pdf: CVS.find((x) => x.style === style && x.len === len)!.pdf, pages: (CV_META as Record<string, { pages: number }>)[`${style}-${len}`].pages })),
  );
  const tf = TRUE_FACTS;
  const trueFacts = [
    { e: tf.build.e, v: tf.build.v, l: tf.build.l[lang], d: tf.build.d[lang] },
    { e: tf.white.e, v: tf.white.v, l: tf.white.l[lang], d: tf.white.d[lang] },
    { e: tf.elements.e, v: String(APPS.length), l: tf.elements.l[lang], d: tf.elements.d[lang] },
    { e: tf.night.e, v: `${Math.round(NIGHT.pct)} %`, l: tf.night.l[lang], d: tf.night.d[lang].replace("{n}", NIGHT.commits.toLocaleString("en-US")).replace("{date}", day(NIGHT.asOf, lang)) },
  ];
  const cvStyles = ["Modern", "Minimal"].map((style) => ({
    style,
    versions: (["full", "short"] as const).map((len): CvVersion => {
      const c = CVS.find((x) => x.style === style && x.len === len)!, m = (CV_META as Record<string, { pages: number; bytes: number; made: string; thumb: string; w: number; h: number }>)[`${style}-${len}`];
      return { len, label: RESUME.len[len][lang], quip: RESUME.quips[`${style}-${len}`][lang], pdf: c.pdf, thumb: m.thumb, w: m.w, h: m.h, pages: m.pages, size: `${Math.round(m.bytes / 1024)} KB`, made: day(m.made, lang),
        alt: RESUME.preview[lang].replace("{s}", style).replace("{l}", RESUME.len[len][lang]) };
    }),
  }));
  return (
    <>
      <Nav lang={lang} path="/" />
      <main id="main">
        <section className="o-hero" id="home" aria-labelledby="h1" data-loop>
          <div className="o-pools" aria-hidden="true" />
          <div className="o-pts" aria-hidden="true">
            {DOTS.map((d, i) => (
              <span key={i} style={{ left: `${d.left.toFixed(2)}%`, top: `${d.top.toFixed(2)}%`, "--o": d.o.toFixed(2), "--du": `${d.du.toFixed(2)}s`, "--de": `${d.de.toFixed(2)}s` } as React.CSSProperties} />
            ))}
          </div>
          <div className="o-hi">
            <HelloTerm w={term} years={y} apps={APPS.map((a) => ({ name: a.name, job: a.job[lang] }))} cvs={termCvs} email={LINKS.email} />
            <h1 className="o-name o-rise o-rise-h" id="h1" style={{ "--d": ".2s" } as React.CSSProperties}>
              <span className="grad">Tanawat</span> Pinthongpan
            </h1>
            <p className="o-tag o-rise" style={{ "--d": ".4s" } as React.CSSProperties}>
              {HERO.tagline[lang]}
            </p>
            <p className="o-line o-rise" style={{ "--d": ".5s" } as React.CSSProperties} dangerouslySetInnerHTML={{ __html: fill(HERO.line[lang], y) }} />
            <div className="o-acts o-rise" style={{ "--d": ".6s" } as React.CSSProperties}>
              <a className="p-btn p-btn-ink" href="#vtx">
                {HERO.vtx[lang]}
              </a>
              <a className="p-btn p-btn-gh" href="#about">
                {HERO.who[lang]}
              </a>
              <a className="p-btn p-btn-gh o-cvbtn" href="#resume">
                {HERO.cv[lang]}
              </a>
            </div>
          </div>
          <a className="o-mouse" href="#uptime" aria-label={HERO.scroll[lang]}>
            <i />
          </a>
        </section>

        <section className="o-sec" id="uptime" aria-labelledby="up-h">
          <div className="o-wrap">
            <OldHead k={UPTIME.k} pre={UPTIME.pre[lang]} grad={UPTIME.grad[lang]} sub={UPTIME.sub[lang]} id="up-h" />
            <Band lang={lang} />
            <ul className="p-proof">
              <li>
                <b>{y}</b>
                <span>{T.proof.years[lang]}</span>
              </li>
              <li>
                <b>{APPS.length}</b>
                <span>{T.proof.apps[lang]}</span>
              </li>
              <li>
                <b>{tools}</b>
                <span>{T.proof.tools[lang]}</span>
              </li>
              <li>
                <b>{WEB.length}</b>
                <span>{T.proof.webs[lang]}</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="o-sec o-alt" id="about" aria-labelledby="about-h">
          <div className="o-wrap">
            <OldHead pre={ABOUT.pre[lang]} grad={ABOUT.grad[lang]} id="about-h" />
            <ul className="o-abil">
              {ABILITIES.map((a, i) => (
                <li className="o-card hov rv" key={a.icon} style={{ "--d": `${i * 0.1}s` } as React.CSSProperties}>
                  <span className="o-ico">
                    <Icon name={a.icon} />
                  </span>
                  <h3>{a.t[lang]}</h3>
                  <p>{a.d[lang]}</p>
                </li>
              ))}
            </ul>
            <div className="o-about">
              <aside className="o-me-card o-card rv">
                <div className="o-me">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/me-round.jpg" width={352} height={352} alt={ABOUT.photo[lang]} loading="lazy" decoding="async" />
                </div>
                <h3>{ABOUT.hey[lang]}</h3>
                <p dangerouslySetInnerHTML={{ __html: fill(ABOUT.p1[lang], y) }} />
                <p>{ABOUT.p2[lang]}</p>
              </aside>
              <div className="o-story">
                <h3 className="o-story-h rv">{ABOUT.storyH[lang]}</h3>
                <div className="d-story">
                  <StoryRail />
                  <div className="d-chs">
                    {STORY.map((c) => (
                      <article className="d-chp" key={c.h.en}>
                        <div>
                          <span className="y">{c.y[lang]}</span>
                          <h3>{c.h[lang]}</h3>
                        </div>
                        <div>
                          {c.p.map((p) => (
                            <p key={p.en}>{p[lang]}</p>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="o-weap-h rv">
              <h3>
                {ABOUT.weaponsPre[lang]} <span className="grad">{ABOUT.weaponsGrad[lang]}</span>
              </h3>
              <p>{ABOUT.weaponsSub[lang]}</p>
            </div>
            <ul className="o-weap">
              {WEAPONS.map((w, i) => (
                <li className="o-card hov rv" key={w.t.en} style={{ "--d": `${(i % 3) * 0.08}s` } as React.CSSProperties}>
                  <h4>{w.t[lang]}</h4>
                  <p className="d">{w.d[lang]}</p>
                  <dl>
                    {w.items.map((it) => (
                      <div key={it.k.en}>
                        <dt>{it.k[lang]}</dt>
                        <dd>{it.v}</dd>
                      </div>
                    ))}
                  </dl>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="o-sec o-vtx" id="vtx" aria-labelledby="vtx-h">
          <div className="o-grid-bg" aria-hidden="true" />
          <div className="o-wrap">
            <OldHead k={VTX.k} pre={VTX.pre[lang]} grad={VTX.grad[lang]} post={VTX.post[lang]} sub={VTX.lead[lang]} id="vtx-h" />
            {shipping && (
              <p className="o-ship rv">
                <span className="o-ping" data-loop>
                  <i aria-hidden="true" />
                  {VTX.ship[lang]}
                </span>
                {shipping.map((s) => {
                  const a = APPS.find((x) => x.id === s.id)!;
                  return (
                    <a key={s.id} href={labsUrl(s.id)} className="o-ship-app">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/vtx/96/${s.id}.png`} alt="" width={20} height={20} />
                      <b>{a.name}</b> {s.version}
                      {s.preview && <span className="p-soon">{VTX.preview[lang]}</span>}
                    </a>
                  );
                })}
                <time dateTime={shipping[0].date}>{day(shipping[0].date, lang)}</time>
              </p>
            )}
            <ul className="o-chips rv" aria-label="Stack">
              {VTX.chips.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <ul className="o-notes">
              <li className="o-card rv">
                <span className="emo" aria-hidden="true">
                  🔌
                </span>
                <div>
                  <h3>{VTX.local.h[lang]}</h3>
                  <p>{VTX.local.p[lang]}</p>
                </div>
              </li>
              <li className="o-card rv" style={{ "--d": ".08s" } as React.CSSProperties}>
                <span className="emo" aria-hidden="true">
                  🤖
                </span>
                <div>
                  <h3>{VTX.ai.h[lang]}</h3>
                  <p>{VTX.ai.p[lang]}</p>
                </div>
              </li>
            </ul>
            <ul className="o-els">
              {APPS.map((a, i) => {
                const own = hasCase(a.id);
                return (
                  <li className="el-card rv" key={a.id} style={{ "--h": a.hue, "--d": `${(i % 3) * 0.08}s` } as React.CSSProperties}>
                    <div className="el-top">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/vtx/96/${a.id}.png`} alt="" width={56} height={56} loading="lazy" className="el-icon" />
                      <div>
                        <h3>
                          <span className="vtx">VTX</span>
                          {a.name}
                        </h3>
                        <p className="el-text">
                          {a.el[lang]} · {a.job[lang]}
                        </p>
                      </div>
                    </div>
                    <p className="el-line">{a.line[lang]}</p>
                    {a.personal && <p className="el-nope">{VTX.nope[lang]}</p>}
                    <div className="el-foot">
                      {a.personal && <span className="el-chip">{VTX.personal[lang]}</span>}
                      {own ? (
                        <Link className="el-go stretch" href={href(lang, `/work/${a.id}`)}>
                          {VTX.readCase[lang]} <Arr />
                        </Link>
                      ) : (
                        <a className="el-go stretch" href={labsUrl(a.id)}>
                          {VTX.onLabs[lang]} <Arr c="↗" />
                        </a>
                      )}
                    </div>
                  </li>
                );
              })}
              <li className="el-card el-more rv" style={{ "--h": 265, "--d": ".16s" } as React.CSSProperties}>
                <p className="o-mono">{VTX.moreK}</p>
                <h3>{VTX.moreT[lang]}</h3>
                <p className="el-line">{VTX.moreP[lang]}</p>
                <a className="el-go stretch" href={LINKS.labs}>
                  vtxlabs.app <Arr c="↗" />
                </a>
              </li>
            </ul>
            <div className="o-sub-head rv">
              <h3>
                {VTX.insidePre[lang]} <span className="grad">{VTX.insideGrad[lang]}</span> {VTX.insidePost[lang]}
              </h3>
              <p>{VTX.insideSub[lang]}</p>
            </div>
            <ul className="o-inside">
              {INSIDE.map((x, i) => (
                <li className="o-card hov rv" key={x.t.en} style={{ "--d": `${(i % 3) * 0.08}s` } as React.CSSProperties}>
                  <p className="o-mono">{String(i + 1).padStart(2, "0")}</p>
                  <h4>{x.t[lang]}</h4>
                  <p>{x.b[lang]}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="o-sec o-alt" id="resume" aria-labelledby="cv-h">
          <div className="o-wrap">
            <OldHead pre={RESUME.pre[lang]} grad={RESUME.grad[lang]} sub={RESUME.sub[lang]} id="cv-h" />
            <ul className="o-cvx">
              {cvStyles.map((c, i) => (
                <CvCard key={c.style} i={i} style={c.style} blurb={RESUME.styles[c.style][lang]} versions={c.versions} lenLabel={RESUME.lenLabel[lang]} dl={RESUME.dl[lang]} pagesWord={RESUME.pages[lang]} sizeWord={lang === "th" ? "ขนาด" : "size"} madeWord={RESUME.made[lang]} />
              ))}
            </ul>
          </div>
        </section>

        <section className="o-sec" id="portfolio" aria-labelledby="pf-h">
          <div className="o-wrap">
            <OldHead pre={PROJECTS.pre[lang]} grad={PROJECTS.grad[lang]} sub={PROJECTS.sub[lang]} id="pf-h" />
            <ul className="tagkey rv" aria-label={lang === "th" ? "สีของป้าย" : "Tag colours"}>
              {(["lang", "framework", "data", "ops"] as const).map((k) => (
                <li key={k} className={`t-${k}`}>
                  {PROJECTS.kinds[k][lang]}
                </li>
              ))}
            </ul>
            <ul className="o-pjx">
              {PROJECTS.items.map((p, i) => (
                <PjCard
                  key={p.repo}
                  i={i}
                  p={{
                    name: p.name, repo: p.repo, mark: p.mark, url: `${LINKS.github}/${p.repo}`, d: p.d[lang], clone: `git clone ${LINKS.github}/${p.repo}.git`,
                    tags: p.tags.map(([tt, kind]) => ({ t: tt, kind, kindLabel: PROJECTS.kinds[kind][lang] })),
                    ...facts[i], pushed: facts[i].pushed ? day(facts[i].pushed!, lang) : undefined,
                  }}
                  w={{ updated: PROJECTS.updated[lang], stars: PROJECTS.stars[lang], open: PROJECTS.open[lang], copy: PROJECTS.copy[lang], copied: PROJECTS.copied[lang], peek: PROJECTS.peek[lang], close: PROJECTS.close[lang], langs: PROJECTS.langs[lang] }}
                />
              ))}
            </ul>
          </div>
        </section>

        <section className="o-sec o-alt" id="showcase" aria-labelledby="live-h">
          <div className="o-wrap">
            <OldHead pre={LIVE.pre[lang]} grad={LIVE.grad[lang]} sub={LIVE.sub[lang]} id="live-h" />
            <ul className="o-live">
              {WEB.map((w, i) => (
                <li className="o-card hov rv" key={w.id} style={{ "--d": `${i * 0.15}s` } as React.CSSProperties}>
                  <figure>
                    {w.shot ? (
                      <Shot k={w.shot} alt={w.name} sizes="(min-width: 900px) 46vw, 100vw" className="shot" />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="logo" src={`/vtx/${w.id}.png`} alt="" width={256} height={256} loading="lazy" />
                    )}
                  </figure>
                  <div className="lv-in">
                    <div className="lv-t">
                      <h3>{w.name}</h3>
                      <span className="pj-arr" aria-hidden="true">
                        ↗
                      </span>
                    </div>
                    <p>{w.line[lang]}</p>
                    <ul className="o-tags">
                      {LIVE.tags[w.id].map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                    <p className="o-ping" data-loop>
                      <i aria-hidden="true" />
                      {LIVE.live[lang]} · {w.host}
                    </p>
                  </div>
                  <a className="stretch" href={w.url} aria-label={`${w.name}: ${w.host}`} />
                </li>
              ))}
              {/* Studio: opening soon, so no link and no address (content/site.ts, STUDIO) */}
              <li className="o-card lv-soon rv" style={{ "--d": `${WEB.length * 0.15}s` } as React.CSSProperties}>
                <figure>
                  <div className="orbc" role="img" aria-label={LIVE.studioArt[lang]} />
                </figure>
                <div className="lv-in">
                  <div className="lv-t">
                    <h3>{STUDIO.name}</h3>
                  </div>
                  <p>{STUDIO.line[lang]}</p>
                  <ul className="o-tags">
                    {LIVE.tags[STUDIO.id].map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <p>
                    <span className="p-soon">{T.soon[lang]}</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="o-sec" id="fun" aria-labelledby="fun-h">
          <div className="o-wrap">
            <OldHead pre={FUN.pre[lang]} grad={FUN.grad[lang]} sub={FUN.sub[lang]} id="fun-h" />
            <ul className="o-fun">
              {FUN.items.map((f, i) => (
                <li className="o-card hov rv" key={f.l.en} style={{ "--d": `${i * 0.08}s` } as React.CSSProperties}>
                  <span className="emo" aria-hidden="true">
                    {f.e}
                  </span>
                  <b className="grad">{f.v[lang]}</b>
                  <h3>{f.l[lang]}</h3>
                  <p>{f.d[lang]}</p>
                </li>
              ))}
            </ul>
            <h3 className="o-true-h rv">{TRUE_FACTS.h[lang]}</h3>
            <ul className="o-fun o-true">
              {trueFacts.map((f, i) => (
                <li className="o-card hov rv" key={f.l} style={{ "--d": `${i * 0.08}s` } as React.CSSProperties}>
                  <span className="o-stamp">✓ {TRUE_FACTS.stamp[lang]}</span>
                  <span className="emo" aria-hidden="true">
                    {f.e}
                  </span>
                  <b className="grad">{f.v}</b>
                  <h4>{f.l}</h4>
                  <p>{f.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="o-sec flush" id="hire" aria-labelledby="hire-h">
          <div className="o-wrap">
            <div className="p-hire rv">
              <div>
                <h2 id="hire-h">{T.hireH[lang]}</h2>
                <p>{T.hireP[lang]}</p>
                <div className="acts">
                  <span className="studio">
                    VTX Studio <span className="p-soon">{T.soon[lang]}</span>
                  </span>
                  <a className="p-btn p-btn-inv" href={`mailto:${LINKS.email}`}>
                    {T.emailMe[lang]} <Arr />
                  </a>
                </div>
                <span className="mail">{LINKS.email}</span>
              </div>
              <HireTerm title={HIRE_TERM.title} cmd={HIRE_TERM.cmd} pass={HIRE_TERM.pass} ok={HIRE_TERM.ok[lang]} />
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
