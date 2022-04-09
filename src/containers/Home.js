/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'

export const Home = ({ goToAbout }) => {
  return (
    <section id='home' className='home'>
      {/* <div className='loading'>
            <div className='lds-ripple'><div></div><div></div></div>
          </div> */}

      <canvas></canvas>

      <h1 className='home__content'>
        <p>Hello, I'm <span>Tanawat Pinthongpan(Ta)</span>.</p>
        <p>I'm a fullstack developer.</p>

        <div dest='about' className='btn' onClick={goToAbout}>
          View my profile
          <Image src='/icons/arrow.svg' alt="Arrow" width={22} height={22} />
        </div>
      </h1>
    </section>
  )
}
