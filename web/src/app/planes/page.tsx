import { Metadata } from 'next';
import PricingPlans from '@/components/PricingPlans';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Planes y Precios | NovaLabss',
  description: 'Descubre nuestros planes de diseño web para PyMEs. Desarrollo profesional desde $999 MXN bimestrales con hosting incluido.',
  keywords: 'planes web, precios desarrollo web, PyMEs México, sitios web profesionales, hosting incluido',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    title: 'Planes y Precios | NovaLabss',
    description: 'Planes de diseño web para PyMEs desde $999 MXN bimestrales. Desarrollo profesional con hosting incluido.',
  },
};

export default function PlanesPage() {
  return (
    <div className="min-h-screen bg-black">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20"></div>
        <div className="relative z-10 w-full max-w-[1780px] mx-auto px-[5%] pt-32 pb-16">
          <div className="text-center mb-16">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black bg-gradient-to-b from-white to-white/10 bg-clip-text text-transparent leading-[100%] tracking-tight mb-6 font-space-grotesk">
              PLANES Y PRECIOS
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Elige el plan perfecto para hacer crecer tu negocio digital con desarrollo profesional y hosting incluido
            </p>
          </div>
        </div>
      </div>
      
      {/* Pricing Plans Section */}
      <PricingPlans />
      
      <Footer />
    </div>
  );
}