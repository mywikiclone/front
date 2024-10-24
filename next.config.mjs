/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },headers: [
    {
      key: 'Cache-Control',
      value: 'no-cache, no-store, must-revalidate',
    },
  ],


    reactStrictMode: false,
};

export default nextConfig;
