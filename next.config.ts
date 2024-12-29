import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        destination: 'http://localhost:9000/api/:slug*',
      },
    ];
  },
  output: 'export',
};

export default nextConfig;
