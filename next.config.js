/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/api/',
        destination: 'https://springboot-backend-iccs.onrender.com',
      },
    ];
  },
};

module.exports = nextConfig;