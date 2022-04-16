/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL,
  },
  reactStrictMode: true,
  images: {
    loader: 'imgix',
    path: 'https://tanawat.web.app/',
    // path: 'http://localhost:3000/',
  },
}

module.exports = nextConfig
