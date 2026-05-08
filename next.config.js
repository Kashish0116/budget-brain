/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimize for Cloudflare Workers deployment if needed
  output: "standalone",
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  cacheComponents: true,
};

export default nextConfig;
