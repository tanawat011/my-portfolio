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

export default function App () {
  const handleGoto = (section = 'home') => {
    document.getElementById(section).scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className='wrap-container'>
      <Head>
        <title>Tanawat Pinthongpan</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>

      <main className='main'>
        <Script src='/canvas/home-bg.js' />

        <Home goToAbout={() => handleGoto('about')} />

        <Navbar
          goToHome={() => handleGoto('home')}
          goToAbout={() => handleGoto('about')}
          goToPortfolio={() => handleGoto('portfolio')}
          goToBlog={() => handleGoto('blog')}
          goToContact={() => handleGoto('contact')}
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
