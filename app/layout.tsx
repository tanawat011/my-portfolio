import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

const siteUrl = 'https://tanawat.dev';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Tanawat Pinthongpan — Fullstack Developer',
    template: '%s | Tanawat',
  },
  description:
    'Fullstack Developer with 8+ years of experience. Building with Next.js, React, TypeScript, Go, and cloud tech. Open source lover. AI-assisted workflow.',
  keywords: [
    'Tanawat Pinthongpan',
    'fullstack developer',
    'react',
    'next.js',
    'typescript',
    'node.js',
    'golang',
    'open source',
    'portfolio',
    'developer portfolio',
  ],
  authors: [{ name: 'Tanawat Pinthongpan', url: siteUrl }],
  creator: 'Tanawat Pinthongpan',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Tanawat Portfolio',
    title: 'Tanawat Pinthongpan — Fullstack Developer',
    description:
      'Fullstack Developer with 8+ years of experience. Open source lover. AI-assisted workflow.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Tanawat Pinthongpan — Fullstack Developer',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Tanawat Pinthongpan — Fullstack Developer',
    description:
      'Fullstack Developer with 8+ years of experience. Open source lover. AI-assisted workflow.',
    images: ['/images/og-image.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrains.variable} antialiased`}>
        {children}
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
