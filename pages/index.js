import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script';

import styles from '../styles/Home.module.css'

export default function Home () {
  const goToAbout = () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Tanawat Pinthongpan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Script src='/canvas.js' />

        <div className={styles.home}>
          {/* <div className={styles.loading}>
            <div className='lds-ripple'><div></div><div></div></div>
          </div> */}

          <canvas></canvas>

          <h1 className={styles.homeContent}>
            <p>Hello, I'm <span>Tanawat Pinthongpan(Ta)</span>.</p>
            <p>I'm a fullstack developer.</p>

            <div dest='about' className={styles.btnViewProfile} onClick={goToAbout}>
              View my profile
              <Image src='/arrow.svg' alt="Arrow" width={22} height={22} />
            </div>
          </h1>
        </div>

        <nav className={styles.navbar}>
          <ul>
            <li><a href='#home'>HOME</a></li>
            <li><a href='#about'>ABOUT</a></li>
            <li><a href='#portfolio'>PORTFOLIO</a></li>
            <li><a href='#blog'>BLOG</a></li>
            <li><a href='#contact'>CONTACT</a></li>
          </ul>
        </nav>

        <section id='about' className={styles.about}>
          <h1 className={styles.title}>
            ABOUT
          </h1>

          <hr />

          <div className={styles.aboutAbility}>
            <div className={styles.aboutAbilityCard}>
              <div className={styles.aboutAbilityWrapIcon}>
                <div className={styles.hexagon}>
                  <Image src='/graduation-cap-solid.svg' alt="graduation-cap-solid" width={100} height={100} />
                </div>
              </div>

              <div className={styles.aboutAbilityTitle}>Fast learning</div>

              <div className={styles.aboutAbilityDetail}>I was able to quickly learn.</div>
            </div>

            <div className={styles.aboutAbilityCard}>
              <div className={styles.aboutAbilityWrapIcon}>
                <div className={styles.hexagon}>
                  <Image src='/people-group-solid.svg' alt="people-group-solid" width={100} height={100} />
                </div>
              </div>

              <div className={styles.aboutAbilityTitle}>Leadership</div>

              <div className={styles.aboutAbilityDetail}>Not only can delegate and strategy, but also have to support everyone.</div>
            </div>

            <div className={styles.aboutAbilityCard}>
              <div className={styles.aboutAbilityWrapIcon}>
                <div className={styles.hexagon}>
                  <Image src='/people-carry-box-solid.svg' alt="people-carry-box-solid" width={100} height={100} />
                </div>
              </div>

              <div className={styles.aboutAbilityTitle}>Teamwork</div>

              <div className={styles.aboutAbilityDetail}>I can effective teamwork.</div>
            </div>

            <div className={styles.aboutAbilityCard}>
              <div className={styles.aboutAbilityWrapIcon}>
                <div className={styles.hexagon}>
                  <Image src='/bug-slash-solid.svg' alt="bug-slash-solid" width={100} height={100} />
                </div>
              </div>

              <div className={styles.aboutAbilityTitle}>Problem Solving</div>

              <div className={styles.aboutAbilityDetail}>Use my existing programming knowledge to fix bugs.</div>
            </div>
          </div>

          <div className={styles.aboutWrapSkill}>
            <div className={styles.aboutWho}>
              <div className={styles.aboutWhoImg}>
                <Image src='/default-image-profile.png' alt="default-image-profile" width={250} height={250} />
              </div>

              <span className={styles.aboutWhoTitle}>
                Who's this guy?
              </span>

              <span className={styles.aboutWhoContent}>
                I'm a Fullstack Developer in Bangkok, Thailand.
              </span>
            </div>

            <div className={styles.aboutSkill}>
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </div>
          </div>
        </section>

        <section id='portfolio' className={styles.portfolio}>
          portfolio
        </section>

        <section id='blog' className={styles.blog}>
          blog
        </section>

        <section id='contact' className={styles.contact}>
          contact
        </section>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
