import Link from "next/link";
import { appById, CASES, labsUrl, type Case } from "@/content/apps";
import { href, T, type Lang } from "@/content/site";
import { Arr, Footer, Nav } from "./Frame";
import { BeforeAfter, Gallery, ReadingProgress } from "./Motion";

/** A case page (5A), direction D's article: why → before / after → three real screens → what it does → Labs. */
export function CasePage({ lang, c }: { lang: Lang; c: Case }) {
  const app = appById(c.id);
  const i = CASES.findIndex((x) => x.id === c.id), next = CASES[(i + 1) % CASES.length], nextApp = appById(next.id);
  const pair = { id: c.id, name: app.name, cmd: c.pair.cmd, shot: c.pair.shot, before: c.pair.before[lang], after: c.pair.after[lang], cap: c.pair.cap[lang], term: c.pair.term };
  return (
    <>
      <Nav lang={lang} path={`/work/${c.id}`} />
      <ReadingProgress />
      <main id="main">
        <section className="p-sec" style={{ paddingTop: "clamp(40px,6cqi,88px)" }}>
          <div className="p-in">
            <article className="d-art">
              <Link className="c-back" href={`${href(lang, "/")}#work`}>
                <Arr c="←" /> {T.allWork[lang]}
              </Link>
              <p className="kick">
                {T.family[lang]} · {app.el[lang]} · {app.job[lang]}
              </p>
              <h1>{c.title[lang]}</h1>
              <p className="stand">{c.stand[lang]}</p>
              <div className="by">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/vtx/96/${c.id}.png`} alt="" width={36} height={36} />
                <span>Tanawat Pinthongpan · {c.runs}</span>
              </div>
              {c.why.map((p) => (
                <p className="t" key={p.en} dangerouslySetInnerHTML={{ __html: p[lang] }} />
              ))}
              <p className="d-pull">{c.pull[lang]}</p>
            </article>
            <div className="d-wide">
              <BeforeAfter pairs={[pair]} pick={T.baPick[lang]} slider={T.baSlider[lang]} sizes="(min-width: 1240px) 1120px, 92vw" />
            </div>
            <div className="d-wide">
              <h2 className="d-wh">{T.lookInside[lang]}</h2>
              <Gallery shots={c.shots.map((s) => ({ k: s.k, t: s.t[lang], x: s.x[lang] }))} app={app.name} label={T.lookInside[lang]} />
            </div>
            <div className="d-wide">
              <h2 className="d-wh">{T.whatItDoes[lang]}</h2>
              <ul className="feats">
                {c.feats.map((f) => (
                  <li className="feat cardb rv" key={f.en}>
                    <i aria-hidden="true" />
                    <p dangerouslySetInnerHTML={{ __html: f[lang] }} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="d-wide">
              <div className="getit rv">
                <div>
                  <h2>
                    {app.name} {T.onLabsH[lang]}
                  </h2>
                  <p>
                    {c.runs} · {T.state[c.state][lang]}
                  </p>
                  <a className="p-btn p-btn-inv" href={labsUrl(c.id)}>
                    {T.openLabs[lang]} <Arr c="↗" />
                  </a>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/vtx/${c.id}.png`} alt="" width={132} height={132} loading="lazy" />
              </div>
              <div className="nextc">
                <Link href={`${href(lang, "/")}#work`}>
                  <Arr c="←" /> {T.allWork[lang]}
                </Link>
                <Link href={href(lang, `/work/${next.id}`)}>
                  <span>{T.next[lang]}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/vtx/96/${next.id}.png`} alt="" width={36} height={36} />
                  {nextApp.name} <Arr />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
