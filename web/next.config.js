/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["bloximages.newyork1.vip.townnews.com", "github.com"],
  },
};

module.exports = nextConfig;
