import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Deshabilitar ESLint durante el build para producción
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Deshabilitar TypeScript strict checking durante build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Optimizaciones para producción
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
};

export default nextConfig;
