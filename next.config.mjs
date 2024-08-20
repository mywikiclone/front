/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },

    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://ec2-52-78-126-240.ap-northeast-2.compute.amazonaws.com:8080/:path*', // 실제 백엔드 API 주소로 변경
          },
        ];
      },



    reactStrictMode: false,
};

export default nextConfig;
