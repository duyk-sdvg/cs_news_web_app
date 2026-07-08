import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Два знака умножения разрешают ЛЮБОЙ домен в интернете
      },
      {
        protocol: 'http',
        hostname: '**', // На случай, если у какой-то новости будет старый протокол http
      },
    ],
  },
};

export default nextConfig;
