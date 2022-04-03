/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'

import styles from '../../styles/Home.module.css'

export const Portfolio = () => {
  return (
    <section id='portfolio' className='portfolio'>
      <h1 className='portfolio__title'>
        PORTFOLIO
      </h1>

      <hr className='portfolio__decorate-line' />

      <div className='no-content'>
        Coming Soon
      </div>
    </section>
  )
}
