/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },

    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://localhost:8080/:path*', // 실제 백엔드 API 주소로 변경
          },
        ];
      },



    reactStrictMode: false,
};

export default nextConfig;
