/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'

import { Footer } from '../src/components/Footer'
import { Navbar } from '../src/components/Navbar'

import { About } from '../src/containers/About'
import { Blog } from '../src/containers/Blog'
import { Contact } from '../src/containers/Contact'
import { Home } from '../src/containers/Home'
import { Portfolio } from '../src/containers/Portfolio'

import styles from '../styles/Home.module.css'

export default function App () {
  const goToHome = () => {
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' })
  }

  const goToAbout = () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' })
  }

  const goToPortfolio = () => {
    document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' })
  }

  const goToBlog = () => {
    document.getElementById('blog').scrollIntoView({ behavior: 'smooth' })
  }

  const goToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Tanawat Pinthongpan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Script src='/canvas.js' />

        <Home goToAbout={goToAbout} />

        <Navbar
          goToHome={goToHome}
          goToAbout={goToAbout}
          goToPortfolio={goToPortfolio}
          goToBlog={goToBlog}
          goToContact={goToContact}
        />

        <About />
        <Portfolio />
        <Blog />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
