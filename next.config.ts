import type { NextConfig } from "next";
import { securityHeaders } from "./config/security";

const nextConfig: NextConfig = {
  // Two root layouts, (en) at / and (th) at /th, so one 404 page serves both (app/global-not-found.tsx).
  experimental: { globalNotFound: true },
  poweredByHeader: false,
  images: { unoptimized: true },
  async headers() {
    return securityHeaders(process.env.NODE_ENV === "development");
  },
};

export default nextConfig;
