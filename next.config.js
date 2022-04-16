/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL,
  },
  reactStrictMode: true,
  // images: {
  //   dangerouslyAllowSVG: true,
  //   contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  // },
  images: {
    loader: 'imgix',
    path: 'https://tanawat.web.app/',
    // path: 'http://localhost:3000/',
    // domains: ['cdn-images-1.medium.com', 'medium.com'],
  },
}

module.exports = nextConfig
