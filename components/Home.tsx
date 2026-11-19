import Link from "next/link";
import { APPS, HOME_PAIRS, hasCase, labsUrl } from "@/content/apps";
import { CVS, href, LINKS, OSS, STACK, STORY, T, WEB, yearsSince, type Lang } from "@/content/site";
import { Band } from "./Band";
import { Arr, Footer, Head, Nav } from "./Frame";
import { BeforeAfter, StoryRail } from "./Motion";
import { Shot } from "./Shot";

/** The home page, direction D · Story: the person first, then the work, then the ways to go further. */
export function Home({ lang }: { lang: Lang }) {
  const years = yearsSince();
  const pairs = HOME_PAIRS.map((p) => ({ id: p.id, name: APPS.find((a) => a.id === p.id)!.name, cmd: p.cmd, shot: p.shot, before: p.before[lang], after: p.after[lang], cap: p.cap[lang], term: p.term }));
  return (
    <>
      <Nav lang={lang} path="/" />
      <main id="main">
        <section className="d-hero" aria-labelledby="h1">
          <div className="p-in">
            <div className="d-name">
              <span className="av" aria-hidden="true">
                TP
              </span>
              <span>
                <b>Tanawat Pinthongpan</b>
                {T.role[lang]}
              </span>
            </div>
            <h1 className="d-h1" id="h1">
              {T.h1a[lang]} <span>{T.h1b[lang]}</span>
            </h1>
            <div className="d-row">
              <div>
                <p className="d-sub" dangerouslySetInnerHTML={{ __html: T.sub[lang] }} />
                {T.subOther[lang] && (
                  <p className="d-sub" lang="th">
                    {T.subOther[lang]}
                  </p>
                )}
              </div>
              <div className="d-acts">
                <a className="p-btn p-btn-ink" href="#about">
                  {T.readStory[lang]} <Arr c="↓" />
                </a>
                <a className="p-btn p-btn-gh" href="#hire">
                  {T.nav.hire[lang]}
                </a>
              </div>
            </div>
            <Band lang={lang} />
            <ul className="p-proof">
              <li>
                <b>{years}</b>
                <span>{T.proof.years[lang]}</span>
              </li>
              <li>
                <b>{APPS.length}</b>
                <span>{T.proof.apps[lang]}</span>
              </li>
              <li>
                <b>6</b>
                <span>{T.proof.engines[lang]}</span>
              </li>
              <li>
                <b>{WEB.length}</b>
                <span>{T.proof.webs[lang]}</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="p-sec" id="about" aria-labelledby="about-h">
          <div className="p-in">
            <Head k={T.aboutK[lang]} t={T.aboutT[lang]} h={T.aboutH[lang]} id="about-h" />
            <div className="d-about">
              <aside className="d-side rv">
                <figure className="d-me">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/portrait.jpg" width={430} height={538} alt={T.photo[lang]} loading="lazy" decoding="async" />
                </figure>
                <dl className="p-stack">
                  {STACK.map((s) => (
                    <div key={s.v}>
                      <dt>{s.k[lang]}</dt>
                      <dd>{s.v}</dd>
                    </div>
                  ))}
                </dl>
              </aside>
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
        </section>

        <section className="p-sec flush" id="work" aria-labelledby="work-h">
          <div className="p-in">
            <Head
              k={T.workK[lang]}
              t={T.workT[lang]}
              h={T.workH[lang]}
              l={T.workL[lang]}
              id="work-h"
              more={
                <a className="p-more" href={LINKS.labs}>
                  {T.allLabs[lang]} <Arr c="↗" />
                </a>
              }
            />
            <ul className="d-fam rv">
              {APPS.map((a) => {
                const own = hasCase(a.id);
                return (
                  <li className={`d-fr${own ? " case" : ""}`} key={a.id}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/vtx/96/${a.id}.png`} alt="" width={40} height={40} loading="lazy" />
                    <b>
                      {a.name}
                      {a.personal && <span className="tag">{T.personal[lang]}</span>}
                    </b>
                    <span className="m">
                      {a.el[lang]} · {a.job[lang]}
                    </span>
                    <p>{a.line[lang]}</p>
                    {own ? (
                      <Link className="go stretch" href={href(lang, `/work/${a.id}`)} aria-label={`${a.name}: ${T.readCase[lang]}`}>
                        →
                      </Link>
                    ) : (
                      <a className="go stretch" href={labsUrl(a.id)} aria-label={`${a.name} ${T.onLabs[lang]}`}>
                        ↗
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section className="p-sec flush" aria-labelledby="ba-h">
          <div className="p-in">
            <Head k={T.baK[lang]} t={T.baT[lang]} h={T.baH[lang]} l={T.baL[lang]} id="ba-h" />
            <BeforeAfter pairs={pairs} pick={T.baPick[lang]} slider={T.baSlider[lang]} sizes="(min-width: 1240px) 1112px, 92vw" />
          </div>
        </section>

        <section className="p-sec flush" aria-labelledby="web-h">
          <div className="p-in">
            <Head k={T.webK[lang]} t={T.webT[lang]} h={T.webH[lang]} id="web-h" />
            <div className="p-web">
              {WEB.map((w) => (
                <article className="p-wcard cardb hov rv" key={w.id}>
                  <figure>
                    {w.shot ? (
                      <Shot k={w.shot} alt={`${w.name}`} sizes="(min-width: 900px) 46vw, 100vw" className="shot" />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="logo" src={`/vtx/${w.id}.png`} alt="" width={256} height={256} loading="lazy" />
                    )}
                  </figure>
                  <div className="tx">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/vtx/96/${w.id}.png`} alt="" width={40} height={40} loading="lazy" />
                    <div>
                      <h3>
                        {w.name}
                        <span className="p-live">{T.live[lang]}</span>
                      </h3>
                      <p>{w.line[lang]}</p>
                    </div>
                  </div>
                  <a className="stretch" href={w.url} aria-label={`${w.name}: ${w.host}`} />
                </article>
              ))}
            </div>
            <div className="p-oss rv">
              <span>{T.oss[lang]}</span>
              {OSS.map((o) => (
                <a key={o.name} href={o.url}>
                  {o.name}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="p-sec flush" id="resume" aria-labelledby="cv-h">
          <div className="p-in">
            <Head k={T.cvK[lang]} t={T.cvT[lang]} h={T.cvH[lang]} l={T.cvL[lang]} id="cv-h" />
            <ul className="p-cv">
              {CVS.map((c) => (
                <li className="p-cvc cardb hov rv" key={c.pdf}>
                  <div className="sheet" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <i style={{ width: "70%" }} />
                    {c.len === "full" && (
                      <>
                        <i />
                        <i style={{ width: "84%" }} />
                      </>
                    )}
                  </div>
                  <h3>
                    {c.style} · {T.cvLen[c.len][lang]}
                  </h3>
                  <span>{T.cvX[c.len][lang]}</span>
                  <nav aria-label={`${c.style} ${T.cvLen[c.len][lang]}`}>
                    <a href={encodeURI(c.pdf)} data-count="cv" data-c-style={c.style.toLowerCase()} data-c-len={c.len}>
                      {T.openPdf[lang]}
                    </a>
                  </nav>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="p-sec flush" id="hire" aria-labelledby="hire-h">
          <div className="p-in">
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
              <div className="orbc" aria-hidden="true" />
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
