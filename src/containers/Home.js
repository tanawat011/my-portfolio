/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'

import styles from '../../styles/Home.module.css'

export const Home = ({ goToAbout }) => {
  return (
    <section id='home' className={styles.home}>
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
    </section>
  )
}
