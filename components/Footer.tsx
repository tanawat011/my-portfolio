import Image from 'next/image';

const socialLinks = [
  { icon: '/icons/github-alt-brands.svg', url: 'https://github.com/tanawat011', label: 'GitHub', size: 16 },
  { icon: '/icons/linkedin-in-brands.svg', url: 'https://www.linkedin.com/in/tanawat-pinthongpan-683a84167/', label: 'LinkedIn', size: 16 },
  { icon: '/icons/facebook-f-brands.svg', url: 'https://www.facebook.com/tanawat.pin', label: 'Facebook', size: 10 },
  { icon: '/icons/steam-symbol-brands.svg', url: 'https://steamcommunity.com/id/tanawat_p', label: 'Steam', size: 16 },
  { icon: '/icons/telegram-brands.svg', url: 'https://t.me/TanawatDEVz', label: 'Telegram', size: 16 },
  { icon: '/icons/line-brands.svg', url: 'https://line.me/ti/p/zl5L3eSW0B', label: 'Line', size: 16 },
  { icon: '/icons/envelope-solid.svg', url: 'mailto:tanawat.works@gmail.com', label: 'Email', size: 16 },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-5">
        {/* Logo */}
        <span className="text-lg font-bold gradient-text tracking-tight">{'<Ta />'}</span>

        {/* Social icons */}
        <div className="flex items-center gap-3">
          {socialLinks.map(({ icon, url, label, size }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/4 border border-white/6 flex items-center justify-center hover:bg-primary/15 hover:border-primary/30 hover:scale-110 transition-all duration-200"
              aria-label={label}
            >
              <Image src={icon} alt={label} width={size} height={size} style={{ filter: 'brightness(0) invert(1)', opacity: 0.7 }} />
            </a>
          ))}
        </div>

        <p className="text-xs text-text-secondary">
          Tanawat Pinthongpan © {year}
        </p>
        {/* Honest AI credit — because transparency is cool */}
        <p className="text-xs text-text-secondary/50 mt-1">
          Built with Next.js, Tailwind &amp; a little help from my AI friends 🤖
        </p>
      </div>
    </footer>
  );
}
