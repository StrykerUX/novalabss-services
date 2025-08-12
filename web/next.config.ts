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
  serverExternalPackages: ['@prisma/client'],
  // Configuración de imágenes
  images: {
    domains: ['r-storage.novalabss.com'],
  },
};

export default nextConfig;
