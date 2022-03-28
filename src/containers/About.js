/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'

import styles from '../../styles/Home.module.css'

export const About = () => {
  const abilities = [
    {
      imgPath: '/graduation-cap-solid.svg',
      title: 'Fast learning',
      detail: 'I was able to quickly learn.',
    },
    {
      imgPath: '/people-group-solid.svg',
      title: 'Leadership',
      detail: 'Not only can delegate and strategy, but also have to support everyone.',
    },
    {
      imgPath: '/people-carry-box-solid.svg',
      title: 'Teamwork',
      detail: 'I can effective teamwork.',
    },
    {
      imgPath: '/bug-slash-solid.svg',
      title: 'Problem Solving',
      detail: 'Use my existing programming knowledge to fix bugs.',
    },
  ]

  return (
    <section id='about' className={styles.about}>
      <h1 className={styles.title}>
        ABOUT
      </h1>

      <hr />

      <div className={styles.aboutAbility}>
        {abilities.map(({ detail, imgPath, title }) => (
          <div key={title} className={styles.aboutAbilityCard}>
            <div className={styles.aboutAbilityWrapIcon}>
              <div className={styles.hexagon}>
                <Image src={imgPath} alt={imgPath} width={100} height={100} />
              </div>
            </div>

            <div className={styles.aboutAbilityTitle}>{title}</div>

            <div className={styles.aboutAbilityDetail}>{detail}</div>
          </div>
        ))}
      </div>

      <div className='about__skill'>
        <div className='about__skill-who'>
          <div className='about__skill-who-img'>
            <Image src='/default-image-profile.png' alt="default-image-profile" width={250} height={250} />
          </div>

          <span className='about__skill-who-title'>
            Who's this guy?
          </span>

          <span className='about__skill-who-content'>
            I'm a Fullstack Developer in Bangkok, Thailand.
          </span>
        </div>

        <div className='about__skill-skill'>
          <div className='about__skill-skill-card'>
            <Image src='/laptop-code-solid.svg' alt='/laptop-code-solid.svg' width={50} height={50} />
            <span className='about__skill-skill-card-title'>Front-end</span>
          </div>
          <div className='about__skill-skill-card'>
            <Image src='/code-solid.svg' alt='/code-solid.svg' width={50} height={50} />
            <span className='about__skill-skill-card-title'>Back-end</span>
          </div>
          <div className='about__skill-skill-card'>
            <Image src='/terminal-solid.svg' alt='/terminal-solid.svg' width={50} height={50} />
            <span className='about__skill-skill-card-title'>Devops</span>
          </div>
        </div>
      </div>
    </section>
  )
}
