/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enhanced development experience
  reactStrictMode: true,
  
  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  
  // Enable detailed fetch logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  
  // Development indicators
  devIndicators: {
    position: 'bottom-left',
  },
};

export default nextConfig;
