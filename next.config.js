/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  distDir: '.next',
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: 'https://springboot-backend-iccs.onrender.com/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;