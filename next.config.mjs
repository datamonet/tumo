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
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
    // Control how Next.js keeps pages in memory
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 2,
  },
  
  // Use webpack to exclude shadcn-examples directory
  webpack: (config, { isServer }) => {
    // Exclude shadcn-examples directory from being processed
    config.watchOptions = {
      ...config.watchOptions,
      ignored: /shadcn-examples/,
    };
    return config;
  },
};

export default nextConfig;
