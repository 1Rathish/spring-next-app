/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  distDir: 'build',
  basePath: '',
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: 'https://springboot-backend-iccs.onrender.com/api/:path*',
      },
    ];
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
};

module.exports = nextConfig;