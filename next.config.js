/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  images: {
    loader: 'imgix',
    path: 'https://tanawat.web.app/',
    path: 'http://localhost:3000/',
  },
}

module.exports = nextConfig
