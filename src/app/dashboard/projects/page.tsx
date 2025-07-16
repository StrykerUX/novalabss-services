"use client"

import DashboardLayout from "@/components/DashboardLayout"
import SmoothMagneticButton from "@/components/SmoothMagneticButton"

export default function ProjectsPage() {
  return (
    <DashboardLayout 
      title="Mis Proyectos" 
      subtitle="Gestiona y da seguimiento a tus sitios web"
    >
      {/* Empty State */}
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-24 h-24 bg-[#0147FF]/20 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-[#0147FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-3 font-space-grotesk">
          No tienes proyectos aún
        </h2>
        
        <p className="text-white/60 mb-8 max-w-md leading-relaxed">
          Suscríbete a uno de nuestros planes para crear tu primer sitio web profesional. 
          Nuestro equipo lo tendrá listo en 72-96 horas.
        </p>
        
        <SmoothMagneticButton 
          className="px-8 py-4 text-white font-semibold hover:shadow-xl transition-shadow duration-300"
          magneticStrength={0.15}
        >
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Crear Primer Proyecto</span>
          </div>
        </SmoothMagneticButton>
      </div>
    </DashboardLayout>
  )
}