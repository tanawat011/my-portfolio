import { href, LINKS, type Lang } from "@/content/site";
import { Footer, Nav } from "./Frame";

/**
 * What the site does with a visit (kit docs/analytics.md § 4–5: the page must say it truthfully while counting is on),
 * and the credits for what it is built from. Written for this site: no forms, no accounts, no cookies.
 */
export function Privacy({ lang }: { lang: Lang }) {
  const th = lang === "th";
  return (
    <>
      <Nav lang={lang} path="/privacy" />
      <main id="main">
        <section className="p-sec">
          <div className="p-in doc">
            <p className="p-eye">
              <span className="p-k">privacy</span>tanawat.dev
            </p>
            <h1>{th ? "ความเป็นส่วนตัว" : "Privacy"}</h1>
            <p>{th ? "เว็บนี้ไม่มีบัญชี ไม่มีฟอร์ม และไม่ใช้ cookie" : "This site has no accounts, no forms and no cookies."}</p>
            <h2>{th ? "การนับคนเข้า" : "Counting visits"}</h2>
            <p>
              {th
                ? "เพื่อรู้ว่ามีคนเข้ามากี่คนและส่วนไหนมีประโยชน์ เว็บนี้นับการเข้าชมด้วย Umami โดยไม่ใช้ cookie: หน้าที่ดู ที่อยู่ของเว็บที่พามา ประเทศ อุปกรณ์ เบราว์เซอร์ ขนาดจอ ภาษา และการกดเปิดไฟล์ resume (แบบไหน) ไม่มีอะไรที่คุณพิมพ์ถูกส่งออกไป และเราบอกไม่ได้ว่าคุณเป็นใคร ถ้าเบราว์เซอร์ส่ง Do Not Track จะไม่นับอะไรเลย"
                : "To learn how many people visit and which parts help, the site counts visits with Umami, without cookies: the page, the address of the site you came from, your country, device, browser, screen size and language, and which resume PDF you open (its style). Nothing you type is ever sent, and we cannot tell who you are. If your browser sends Do Not Track, nothing is counted."}
            </p>
            <h2>{th ? "ธีมของคุณ" : "Your theme"}</h2>
            <p>{th ? "ธีมสว่างหรือมืดที่เลือกไว้ เก็บในเบราว์เซอร์ของคุณ (localStorage) และไม่ถูกส่งไปที่ไหน" : "The light or dark theme you pick is kept in your browser (localStorage) and is never sent anywhere."}</p>
            <h2>{th ? "ฟอนต์และรูป" : "Fonts and pictures"}</h2>
            <p>
              {th
                ? "ฟอนต์และรูปทุกรูปมาจากเว็บนี้เอง ไม่มีการเรียก Google Fonts หรือบริการอื่นจากเบราว์เซอร์ของคุณ ภาพหน้าจอแอปเป็นของ VTX Labs: หน้าจอจริงของแอปกับข้อมูลที่แต่งขึ้น"
                : "Fonts and every picture come from this site itself: your browser makes no request to Google Fonts or anyone else. The app screenshots are VTX Labs' own: the apps' real screens with made-up data."}
            </p>
            <h2>{th ? "ลิงก์ออกไปข้างนอก" : "Links out"}</h2>
            <p>{th ? "VTX Labs, CraftCV, GitHub, LinkedIn และ LINE มีนโยบายความเป็นส่วนตัวของตัวเอง" : "VTX Labs, CraftCV, GitHub, LinkedIn and LINE have their own privacy policies."}</p>
            <h2>{th ? "เครดิต" : "Credits"}</h2>
            <ul>
              <li>{th ? "ฟอนต์ Plus Jakarta Sans, Kanit, Noto Sans Thai และ JetBrains Mono ใช้ SIL Open Font License 1.1" : "Fonts: Plus Jakarta Sans, Kanit, Noto Sans Thai and JetBrains Mono, under the SIL Open Font License 1.1."}</li>
              <li>{th ? "Next.js และ React ใช้ MIT License" : "Next.js and React, under the MIT License."}</li>
            </ul>
            <h2>{th ? "ติดต่อ" : "Contact"}</h2>
            <p>
              <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>
            </p>
            <p className="upd">{th ? "อัปเดต 19 พฤศจิกายน 2026" : "Updated 19 November 2026"}</p>
            <p>
              <a href={href(lang, "/")}>{th ? "← หน้าแรก" : "← Home"}</a>
            </p>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
