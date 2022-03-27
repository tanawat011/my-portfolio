/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'

import styles from '../../styles/Home.module.css'

export const About = () => {
  return (
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
  )
}
