/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  images: {
    remotePatterns: [
      // allowing the following img url to be used in nextjs
      // {
      //   protocol: 'https',
      //   hostname: '...',
      //   port: '',
      //   pathname: '/**',
      // },
    ]
  },
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/',
  //       permanent: 
  //     }
  //   ]
  // }
};

export default nextConfig;
