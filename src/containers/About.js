/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'

import { diff_years } from '../utils/date'

export const About = () => {
  const dateBeginOfWorks = new Date('July 24, 2017 00:00:00')
  const today = new Date()
  const yearsOfWorks = diff_years(dateBeginOfWorks, today)

  const abilities = [
    {
      imgPath: '/icons/graduation-cap-solid.svg',
      title: 'Fast learning',
      detail: `I'm able to learn new things quickly.`,
    },
    {
      imgPath: '/icons/people-group-solid.svg',
      title: 'Leadership',
      detail: 'Not only can delegate and strategy, but also have to support everyone.',
    },
    {
      imgPath: '/icons/people-carry-box-solid.svg',
      title: 'Teamwork',
      detail: 'I can effective teamwork.',
    },
    {
      imgPath: '/icons/bug-slash-solid.svg',
      title: 'Problem Solving',
      detail: 'Use my existing programming knowledge to fix bugs.',
    },
  ]

  const mainSkills = [
    {
      title: 'Front-end',
      detail: 'I like to Front-end coding and enjoy bringing ideas to life in the browser.',
      imgName: '/icons/code-solid.svg',
      skills: [
        {
          label: 'Languages',
          detail: 'HTML, CSS, Sass, JS, TS',
        },
        {
          label: 'Technologies',
          detail: 'React, React Native, NextJS, RedwoodJS, DaisyUI, NextUI, NextAuth, Auth0, Tailwind, Bootstrap, Jest, Vitest',
        },
        {
          label: 'Dev Tools',
          detail: 'VSCode, Git, Figma, XCode, Android Studio',
        },
      ],
    },
    {
      title: 'Back-end',
      detail: 'I like to Back-end coding because I enjoy to thinking a new logic.',
      imgName: '/icons/laptop-code-solid.svg',
      skills: [
        {
          label: 'Languages',
          detail: 'JS, TS, Golang, SQL',
        },
        {
          label: 'Technologies',
          detail: 'NodeJS, NestJS, Jest, GraphQL, Restful API, Firebase, Vercel, MySQL, PostgreSQL, MongoDB, Prisma',
        },
        {
          label: 'Dev Tools',
          detail: 'VSCode, Git, Postman, Datagrip, Dbeaver',
        },
      ],
    },
    {
      title: 'Others',
      detail: 'My Other skills that I have learned and used in my work.',
      imgName: '/icons/terminal-solid.svg',
      skills: [
        {
          label: 'OS',
          detail: 'Linux, Macos, Windows',
        },
        {
          label: 'Technologies',
          detail: 'Docker, K8S, RabbitMQ, Redis, Nginx, Firebase, GCP, AWS',
        },
        {
          label: 'Dev Tools',
          detail: 'Len, Docker Desktop',
        },
      ],
    },
  ]

  return (
    <section id='about' className='container about'>
      <h1 className='title-container'>
        ABOUT
      </h1>

      <hr className='title-bar' />

      <div className='about__ability'>
        {abilities.map(({ detail, imgPath, title }) => (
          <div key={title} className='about__ability-card'>
            <div className='about__ability-wrap-icon'>
              <div className='hexagon'>
                <Image src={imgPath} alt={imgPath} width={100} height={100} />
              </div>
            </div>

            <div className='about__ability-title'>{title}</div>

            <div className='about__ability-detail'>{detail}</div>
          </div>
        ))}
      </div>

      <div className='about__skill'>
        <div className='about__skill-who'>
          <div className='about__skill-who-img'>
            <Image src='/images/me.jpg' alt='me' width={250} height={250} />
          </div>

          <span className='about__skill-who-title'>
            Who's this guy?
          </span>

          <code className='about__skill-who-content'>
            I'm a Fullstack Developer in Bangkok, Thailand. And I'm a passionate about programming. I have a experience in programming for more than <b>{yearsOfWorks}</b> years.
          </code>
        </div>

        <div className='about__skill-skill'>
          {mainSkills.map(({ detail, imgName, skills, title }) => (
            <div key={title} className='about__skill-skill-card'>
              <Image src={imgName} alt={imgName} width={50} height={50} />

              <span className='about__skill-skill-card-title'>{title}</span>

              <p className='about__skill-skill-card-detail'>{detail}</p>

              {skills.map(({ label, detail }, index) => (
                <div key={label + index}>
                  <span className='about__skill-skill-card-label'>{label}</span>

                  <p className='about__skill-skill-card-detail'>{detail}</p>
                </div>
              ))}

              <hr className='bar' />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
