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

  // Exclude shadcn-examples directory from the build
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  distDir: '.next',
  onDemandEntries: {
    // Exclude shadcn-examples directory
    exclude: ['shadcn-examples/**/*'],
  },
};

export default nextConfig;
