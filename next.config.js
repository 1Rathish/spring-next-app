/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/api/',
        destination: 'http://localhost:8080/api',
      },
    ];
  },
};

module.exports = nextConfig;