import { href, LINKS, NAME, type Lang } from "@/content/site";
import { analyticsOn } from "@/content/analytics";
import { Footer, Nav } from "./Frame";

/** The day this page last changed. A change is put here, with the new text, before it takes effect. */
export const PRIVACY_DATE = { en: "25 November 2026", th: "25 พฤศจิกายน 2026" } as const;

const VERCEL_POLICY = "https://vercel.com/legal/privacy-policy";
const UMAMI_POLICY = "https://umami.is/privacy";
const PDPC = "https://www.pdpc.or.th";

/*
 * What the site does with a visit (kit docs/analytics.md § 4–5: the page must say it truthfully while counting is on),
 * and the credits for what it is built from. Rewritten 25 Nov 2026 to the owner's pattern (bologu.com/privacy's
 * structure, never its text), in his own "I" as the rest of the site speaks: a promise, who, what and how long, why
 * with the legal basis, who else sees what, what I don't do, the PDPA rights, changes. ⛔ Checked against the code:
 *   - counting: content/analytics.ts + vendor/vtx-kit/analytics.ts (no cookies, Do Not Track, no query / hash / ids,
 *     the referrer's origin only, the title blanked) and its one event, "cv" with style + length (components/Cards.tsx,
 *     Home.tsx, AnalyticsRoot.tsx);
 *   - on the device: only the theme (components/ThemeButton.tsx); no other storage, no fetch from the browser;
 *   - config/security.ts: connect-src 'self' + Umami, img-src 'self' data: blob:, frame-src 'none'; fonts by next/font;
 *   - lib/github.ts, lib/releases.ts, lib/labs.ts run when the site is built, never in a visitor's browser.
 * Where each company is, from its own terms: Vercel Inc. (California), Umami Software Inc. (Delaware), Google (US).
 * LINE is left out of that sentence: it has a company in Thailand too.
 */
const gmail = LINKS.email.endsWith("@gmail.com");
const mail = <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>;

function En() {
  return (
    <>
      <h2>1. Who runs this site</h2>
      <p>This site is mine: {NAME}, in Thailand. I decide what it collects and why. For anything about your data, write to me at {mail}.</p>

      <h2>2. What is collected, and how long it is kept</h2>
      <ul>
        <li>
          <b>Requests to the site.</b> Like any website, each page you open is a request from your browser to my host, Vercel: your network (IP) address, what your
          browser says about itself, the page and the time. <i>Kept:</i> Vercel keeps its logs under <a href={VERCEL_POLICY}>its privacy policy</a>.
        </li>
        {analyticsOn && (
          <li>
            <b>Visit counts.</b> Umami counts each page opened: its address without anything after ? or # and without ids, the site you came from (its address
            only), your screen size and language, and your country, device, browser and operating system, which Umami works out from the request. One action is
            counted too: downloading a resume PDF, with its style and length. The page title is blanked and nothing you type is sent. If your browser sends Do Not
            Track, nothing is counted. <i>Kept:</i> Umami Cloud keeps the counts under <a href={UMAMI_POLICY}>its privacy policy</a>.
          </li>
        )}
        <li>
          <b>Your theme.</b> The light or dark theme you pick is kept in your browser (localStorage). <i>Kept:</i> on your device until you clear this site&apos;s data.
          It is never sent anywhere.
        </li>
        <li>
          <b>A message you send me.</b> By email or LINE, I receive what you write with your address or LINE name. <i>Kept:</i> in my {gmail ? "Gmail" : "email"} inbox or
          my LINE chats until you ask me to delete it. An email from the Feedback link also names, in its subject, the page you were on.
        </li>
      </ul>

      <h2>3. What it is used for</h2>
      <ul>
        <li>
          Showing you the site and remembering your theme. <i>Basis: providing the service you asked for.</i>
        </li>
        <li>
          Keeping the site running and safe from abuse (the host&apos;s request logs). <i>Basis: legitimate interest.</i>
        </li>
        {analyticsOn && (
          <li>
            Knowing how many people visit and which resume they take. The counts are totals, not people. <i>Basis: legitimate interest.</i>
          </li>
        )}
        <li>
          Replying to your message, and talking about work if that is what you wrote about. <i>Basis: legitimate interest.</i>
        </li>
        <li>
          Meeting a legal duty, if one applies, such as a lawful order from a Thai authority. <i>Basis: legal obligation.</i>
        </li>
      </ul>

      <h2>4. Who else sees what</h2>
      <ul>
        <li>
          <b>Vercel</b> hosts the site and receives every request your browser makes to it, as described above.
        </li>
        {analyticsOn && (
          <li>
            <b>Umami Cloud</b> receives the visit counts above. Like any server, it also sees the network address they come from.
          </li>
        )}
        {gmail && (
          <li>
            <b>Google</b>, which hosts my Gmail inbox, receives the email you send me.
          </li>
        )}
        <li>
          <b>LINE</b>, if you message me there, under LINE&apos;s own privacy policy.
        </li>
      </ul>
      <p>
        Vercel{analyticsOn ? ", Umami" : ""}
        {gmail ? " and Google" : ""} are companies in the United States, so what they see is handled outside Thailand. VTX Labs, CraftCV, GitHub, LinkedIn and LINE are
        links out: once you follow one, that site&apos;s own privacy policy applies.
      </p>

      <h2>5. What I don&apos;t do</h2>
      <ul>
        <li>No accounts and no forms.</li>
        <li>No cookies: the site sets none{analyticsOn ? ", and the visit counts need none" : ""}.</li>
        <li>No ads, and no advertising or social media scripts. {analyticsOn ? "The only script from another site is Umami's counter." : "No script comes from another site."}</li>
        <li>
          Fonts and every picture come from this site itself: your browser makes no request to Google Fonts or anyone else. The app screenshots are VTX Labs&apos; own: the
          apps&apos; real screens with made-up data.
        </li>
        <li>I don&apos;t sell anything about you, or share it beyond the services in section 4.</li>
      </ul>

      <h2>6. Your rights</h2>
      <p>
        Thailand&apos;s Personal Data Protection Act B.E. 2562 (2019) gives you the right to ask what personal data I hold about you and for a copy of it, to have it
        corrected or deleted, to have its use limited or stopped, to object to how I use it, and to receive it in a form you can take elsewhere. Write to me at {mail}. I
        answer within 30 days.
      </p>
      <p>
        To remove what the site keeps on your device, clear your browser&apos;s data for this site.{analyticsOn ? " To stop being counted, turn on Do Not Track in your browser." : ""}
      </p>
      <p>
        If you think I have handled your data wrongly, you can complain to the Office of the Personal Data Protection Committee (PDPC,{" "}
        <span lang="th">สำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล</span>), <a href={PDPC}>pdpc.or.th</a>.
      </p>

      <h2>7. Changes</h2>
      <p>When this page changes, the new text is put here with a new effective date before it takes effect. This version is effective from {PRIVACY_DATE.en}.</p>

      <h2>Credits</h2>
      <ul>
        <li>Fonts: Plus Jakarta Sans, Kanit, Noto Sans Thai and JetBrains Mono, under the SIL Open Font License 1.1.</li>
        <li>Next.js and React, under the MIT License.</li>
        <li>The Go, Node.js and NestJS marks come from Simple Icons (CC0); the marks belong to their owners and only name what each project is built with.</li>
        <li>The projects&apos; stars, languages and folders are read from GitHub when the site is built, never from your browser.</li>
      </ul>
    </>
  );
}

function Th() {
  return (
    <>
      <h2>1. ใครดูแลเว็บนี้</h2>
      <p>เว็บนี้เป็นของผม {NAME} อยู่ในประเทศไทย ผมเป็นคนตัดสินใจว่าเว็บเก็บข้อมูลอะไรและเพื่ออะไร มีคำถามเรื่องข้อมูลของคุณ เขียนมาหาผมที่ {mail}</p>

      <h2>2. เก็บอะไรบ้าง และเก็บนานแค่ไหน</h2>
      <ul>
        <li>
          <b>การเข้าเว็บ</b> เหมือนเว็บทั่วไป ทุกหน้าที่คุณเปิดคือคำขอจากเบราว์เซอร์ไปที่ Vercel ผู้ให้บริการเว็บของผม มี IP address สิ่งที่เบราว์เซอร์บอกเกี่ยวกับตัวเอง หน้าที่เปิด
          และเวลา <i>เก็บนานแค่ไหน:</i> Vercel เก็บ log ตาม<a href={VERCEL_POLICY}>นโยบายความเป็นส่วนตัวของ Vercel</a>
        </li>
        {analyticsOn && (
          <li>
            <b>การนับคนเข้า</b> Umami นับทุกหน้าที่เปิด คือที่อยู่ของหน้าโดยไม่มีส่วนหลัง ? หรือ # และไม่มี id เว็บที่พามา (เฉพาะชื่อเว็บ) ขนาดจอและภาษา และประเทศ อุปกรณ์
            เบราว์เซอร์ และระบบปฏิบัติการ ที่ Umami ดูจากคำขอเอง และนับอีกอย่างเดียวคือการโหลดไฟล์ resume (แบบไหน ยาวหรือสั้น) ชื่อหน้าถูกลบออก และสิ่งที่คุณพิมพ์ไม่ถูกส่งไปเลย
            ถ้าเบราว์เซอร์ส่ง Do Not Track จะไม่นับอะไรเลย <i>เก็บนานแค่ไหน:</i> Umami Cloud เก็บตัวเลขตาม<a href={UMAMI_POLICY}>นโยบายความเป็นส่วนตัวของ Umami</a>
          </li>
        )}
        <li>
          <b>ธีมของคุณ</b> ธีมสว่างหรือมืดที่เลือกไว้ เก็บในเบราว์เซอร์ของคุณ (localStorage) <i>เก็บนานแค่ไหน:</i> อยู่ในเครื่องจนกว่าคุณจะล้างข้อมูลของเว็บนี้ และไม่ถูกส่งไปที่ไหน
        </li>
        <li>
          <b>ข้อความที่คุณส่งมา</b> ทางอีเมลหรือ LINE ผมได้รับสิ่งที่คุณเขียนพร้อมอีเมลหรือชื่อ LINE ของคุณ <i>เก็บนานแค่ไหน:</i> อยู่ใน{gmail ? "กล่อง Gmail" : "กล่องอีเมล"}
          หรือแชต LINE ของผม จนกว่าคุณจะขอให้ลบ อีเมลจากลิงก์ส่งความเห็นจะมีหน้าที่คุณเปิดอยู่ในหัวเรื่องด้วย
        </li>
      </ul>

      <h2>3. ใช้ทำอะไร</h2>
      <ul>
        <li>
          แสดงเว็บและจำธีมที่คุณเลือก <i>ฐานทางกฎหมาย: ให้บริการตามที่คุณขอ</i>
        </li>
        <li>
          ดูแลให้เว็บทำงานได้และปลอดภัยจากการใช้ในทางที่ผิด (log ของผู้ให้บริการเว็บ) <i>ฐานทางกฎหมาย: ประโยชน์โดยชอบด้วยกฎหมาย</i>
        </li>
        {analyticsOn && (
          <li>
            รู้ว่ามีคนเข้ามากี่คนและโหลด resume แบบไหน ตัวเลขเป็นยอดรวม ไม่ใช่รายคน <i>ฐานทางกฎหมาย: ประโยชน์โดยชอบด้วยกฎหมาย</i>
          </li>
        )}
        <li>
          ตอบข้อความของคุณ และคุยเรื่องงานถ้าคุณเขียนมาเรื่องนั้น <i>ฐานทางกฎหมาย: ประโยชน์โดยชอบด้วยกฎหมาย</i>
        </li>
        <li>
          ทำตามหน้าที่ตามกฎหมาย ถ้ามี เช่น คำสั่งที่ชอบด้วยกฎหมายจากหน่วยงานของไทย <i>ฐานทางกฎหมาย: หน้าที่ตามกฎหมาย</i>
        </li>
      </ul>

      <h2>4. ใครเห็นอะไรบ้าง</h2>
      <ul>
        <li>
          <b>Vercel</b> ให้บริการเว็บ และได้รับทุกคำขอที่เบราว์เซอร์ของคุณส่งมาตามที่บอกไว้ข้างบน
        </li>
        {analyticsOn && (
          <li>
            <b>Umami Cloud</b> ได้รับตัวเลขการนับข้างบน และเห็น IP address ที่ส่งตัวเลขมา เหมือน server ทั่วไป
          </li>
        )}
        {gmail && (
          <li>
            <b>Google</b> ซึ่งให้บริการ Gmail ของผม ได้รับอีเมลที่คุณส่งมา
          </li>
        )}
        <li>
          <b>LINE</b> ถ้าคุณส่งข้อความหาผมทาง LINE ตามนโยบายความเป็นส่วนตัวของ LINE เอง
        </li>
      </ul>
      <p>
        Vercel{analyticsOn ? " Umami" : ""}
        {gmail ? " และ Google" : ""} เป็นบริษัทในสหรัฐอเมริกา สิ่งที่เห็นจึงถูกจัดการนอกประเทศไทย ส่วน VTX Labs, CraftCV, GitHub, LinkedIn และ LINE เป็นลิงก์ออกไปข้างนอก
        เมื่อกดไปแล้ว ใช้นโยบายความเป็นส่วนตัวของเว็บนั้นเอง
      </p>

      <h2>5. สิ่งที่ผมไม่ทำ</h2>
      <ul>
        <li>ไม่มีบัญชีผู้ใช้ และไม่มีฟอร์ม</li>
        <li>ไม่ใช้ cookie เว็บนี้ไม่ตั้ง cookie เลย{analyticsOn ? " และการนับคนเข้าก็ไม่ต้องใช้" : ""}</li>
        <li>ไม่มีโฆษณา และไม่มี script ของโฆษณาหรือโซเชียลมีเดีย {analyticsOn ? "script เดียวที่มาจากเว็บอื่นคือตัวนับของ Umami" : "ไม่มี script จากเว็บอื่นเลย"}</li>
        <li>ฟอนต์และรูปทุกรูปมาจากเว็บนี้เอง ไม่มีการเรียก Google Fonts หรือบริการอื่นจากเบราว์เซอร์ของคุณ ภาพหน้าจอแอปเป็นของ VTX Labs: หน้าจอจริงของแอปกับข้อมูลที่แต่งขึ้น</li>
        <li>ผมไม่ขายข้อมูลเกี่ยวกับคุณ และไม่ส่งต่อให้ใครนอกจากบริการในข้อ 4</li>
      </ul>

      <h2>6. สิทธิ์ของคุณ</h2>
      <p>
        ตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) คุณขอดูและขอสำเนาข้อมูลส่วนบุคคลที่ผมมีเกี่ยวกับคุณ ขอให้แก้ไขหรือลบ ขอให้จำกัดหรือหยุดใช้ คัดค้านการใช้
        และขอรับข้อมูลในรูปแบบที่นำไปใช้ที่อื่นได้ เขียนมาที่ {mail} ผมตอบภายใน 30 วัน
      </p>
      <p>ถ้าต้องการลบสิ่งที่เว็บจำไว้ในเครื่อง ให้ล้างข้อมูลของเว็บนี้ในเบราว์เซอร์{analyticsOn ? " ถ้าไม่ต้องการให้นับ เปิด Do Not Track ในเบราว์เซอร์" : ""}</p>
      <p>
        ถ้าคิดว่าผมจัดการข้อมูลของคุณไม่ถูกต้อง ร้องเรียนได้ที่สำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล (สคส.) <a href={PDPC}>pdpc.or.th</a>
      </p>

      <h2>7. การเปลี่ยนแปลง</h2>
      <p>เมื่อหน้านี้เปลี่ยน ผมจะลงข้อความใหม่พร้อมวันที่มีผลใหม่ไว้ที่นี่ก่อนที่จะมีผล ฉบับนี้มีผลตั้งแต่ {PRIVACY_DATE.th}</p>

      <h2>เครดิต</h2>
      <ul>
        <li>ฟอนต์ Plus Jakarta Sans, Kanit, Noto Sans Thai และ JetBrains Mono ใช้ SIL Open Font License 1.1</li>
        <li>Next.js และ React ใช้ MIT License</li>
        <li>สัญลักษณ์ Go, Node.js และ NestJS จาก Simple Icons (CC0) เครื่องหมายเป็นของเจ้าของแต่ละราย ใช้เพื่อบอกว่าโปรเจกต์สร้างด้วยอะไร</li>
        <li>ดาว ภาษา และโฟลเดอร์ของโปรเจกต์บน GitHub อ่านจาก GitHub ตอนสร้างเว็บ ไม่ใช่จากเบราว์เซอร์ของคุณ</li>
      </ul>
    </>
  );
}

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
            <p className="upd">{th ? `มีผลตั้งแต่ ${PRIVACY_DATE.th}` : `Effective ${PRIVACY_DATE.en}`}</p>
            <p>
              {th
                ? "ไม่มีบัญชี ไม่มีฟอร์ม และไม่ใช้ cookie ผมเก็บให้น้อยที่สุด ไม่ขายอะไรเกี่ยวกับคุณ และหน้านี้บอกทุกอย่างที่ออกจากเบราว์เซอร์ของคุณ"
                : "No accounts, no forms and no cookies. I keep as little as I can, I never sell anything about you, and this page lists everything that leaves your browser."}
            </p>
            {th ? <Th /> : <En />}
            <p>
              <a href={href(lang, "/")}>{th ? "← หน้าแรก" : "← Home"}</a>
            </p>
          </div>
        </section>
      </main>
      <Footer lang={lang} path="/privacy" />
    </>
  );
}
