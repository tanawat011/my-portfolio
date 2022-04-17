import Image from 'next/image'

export const Footer = () => {
  const icons = [
    {
      path: '/icons/github-alt-brands.svg',
      url: 'https://github.com/tanawat011',
    },
    {
      path: '/icons/medium-brands.svg',
      url: 'https://medium.com/@tanawat-p',
    },
    {
      path: '/icons/linkedin-in-brands.svg',
      url: 'https://www.linkedin.com/in/tanawat-pinthongpan-683a84167/',
    },
    {
      path: '/icons/facebook-f-brands.svg',
      url: 'https://www.facebook.com/tanawat.pin',
    },
    {
      path: '/icons/instagram-brands.svg',
      url: 'https://www.instagram.com/ta.tanawat.pin/',
    },
    {
      path: '/icons/line-brands.svg',
      url: 'https://line.me/ti/p/zl5L3eSW0B',
    },
    {
      path: '/icons/steam-symbol-brands.svg',
      url: 'https://steamcommunity.com/id/tanawat_p',
    },
  ]

  return (
    <footer className='footer'>
      <div className='footer__app'>
        {icons.map(({ path, url }) => (
          <a className='btn btn-icon' key={path} href={url} rel="noreferrer" target='_blank'>
            <Image src={path} alt={path} width={24} height={24} />
          </a>
        ))}
      </div>
      <div className='footer__me'>
        TANAWAT PINTHONGPAN <span>©2022</span>
      </div>
    </footer>
  )
}
