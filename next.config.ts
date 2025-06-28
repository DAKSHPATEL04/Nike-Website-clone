import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["static.nike.com"],
  },
  /* config options here */
};

module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
export default nextConfig;
