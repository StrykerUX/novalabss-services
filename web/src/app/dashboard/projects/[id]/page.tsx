"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import DashboardLayout from "@/components/DashboardLayout"
import SmoothMagneticButton from "@/components/SmoothMagneticButton"

export default function ProjectDetailPage() {
  const params = useParams()
  const projectId = params.id

  // Simular datos del proyecto específico
  const projectData = {
    id: projectId,
    name: "Landing Page - Mi Empresa",
    plan: "Rocket",
    status: "EN DESARROLLO",
    progress: 75,
    currentPhase: "Desarrollo de contenido",
    estimatedDelivery: "23h 45min",
    daysCurrent: 2,
    daysTotal: 3,
    credits: { available: 2, total: 2 },
    lastUpdate: "hace 2h",
    startDate: "hace 2 días"
  }

  return (
    <DashboardLayout 
      title={projectData.name}
      subtitle={`Plan ${projectData.plan} • ${projectData.status}`}
    >
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-white/60 mb-6">
        <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
        <span className="mx-2">/</span>
        <Link href="/dashboard/projects" className="hover:text-white transition-colors">Proyectos</Link>
        <span className="mx-2">/</span>
        <span className="text-white">{projectData.name}</span>
      </div>

      {/* Estado del Proyecto - Overview */}
      <div className="bg-gradient-to-br from-[#0147FF]/20 to-[#0147FF]/5 rounded-[48px] p-6 border border-[#0147FF]/30 relative overflow-hidden mb-8">
        <div className="absolute top-4 right-4 w-16 h-16 bg-[#0147FF]/10 rounded-full blur-xl"></div>
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-white/80 text-sm font-medium mb-1">Estado</h3>
              <p className="text-white font-bold text-xl">{projectData.status}</p>
              <p className="text-[#0147FF] text-sm">Día {projectData.daysCurrent} de {projectData.daysTotal}</p>
            </div>
            <div>
              <h3 className="text-white/80 text-sm font-medium mb-1">Progreso</h3>
              <p className="text-white font-bold text-xl">{projectData.progress}%</p>
              <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                <div 
                  className="bg-gradient-to-r from-[#0147FF] to-[#0147FF80] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${projectData.progress}%` }}
                ></div>
              </div>
            </div>
            <div>
              <h3 className="text-white/80 text-sm font-medium mb-1">Entrega estimada</h3>
              <p className="text-white font-bold text-xl">{projectData.estimatedDelivery}</p>
              <p className="text-white/60 text-sm">{projectData.currentPhase}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* VISTA PREVIA DEL SITIO */}
        <div className="bg-[#1A1A1A] rounded-[48px] p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-lg">👁️ Vista Previa de tu Sitio</h3>
            <span className="text-xs text-white/60 bg-white/10 px-3 py-1 rounded-full">
              Actualizado {projectData.lastUpdate}
            </span>
          </div>
          
          <div className="bg-white/5 rounded-[12px] p-4 mb-4">
            <div className="flex items-center justify-center h-32 border-2 border-dashed border-white/20 rounded-lg">
              <div className="text-center">
                <svg className="w-12 h-12 text-white/40 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-white/60 text-sm">Vista previa disponible pronto</p>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button className="flex-1 px-4 py-2 text-white/60 bg-white/10 rounded-[12px] text-sm hover:bg-white/20 transition-colors">
              Ver Desktop
            </button>
            <button className="flex-1 px-4 py-2 text-white/60 bg-white/10 rounded-[12px] text-sm hover:bg-white/20 transition-colors">
              Ver Mobile
            </button>
            <SmoothMagneticButton 
              className="px-4 py-2 text-white font-medium text-sm hover:shadow-lg transition-shadow duration-300"
              magneticStrength={0.1}
            >
              Dar Feedback
            </SmoothMagneticButton>
          </div>
        </div>

        {/* DETALLES DEL PLAN */}
        <div className="bg-[#1A1A1A] rounded-[48px] p-6 border border-white/10">
          <h3 className="text-white font-bold text-lg mb-4">📋 Detalles de tu Plan {projectData.plan}</h3>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-white/90">Landing page profesional</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-white/90">Optimización SEO básica</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-white/90">Hosting seguro incluido</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-white/90">Versión móvil optimizada</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-yellow-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-white/70">Dominio .com (incluido en 2° pago)</span>
            </div>
          </div>
          
          <div className="bg-[#0147FF]/10 border border-[#0147FF]/30 rounded-[12px] p-3">
            <div className="flex justify-between items-center">
              <span className="text-white/80 text-sm">Próximo pago:</span>
              <span className="text-white font-semibold">15 Nov 2024 ($999 MXN)</span>
            </div>
          </div>
        </div>
      </div>

      {/* TIMELINE DEL PROYECTO */}
      <div className="bg-[#1A1A1A] rounded-[48px] p-8 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6 font-space-grotesk">📅 Timeline de este Proyecto</h3>
        
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-green-600/10 border border-green-600/30 rounded-[12px]">
            <div className="w-10 h-10 bg-green-600/20 rounded-full flex items-center justify-center mr-4">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">Pago confirmado y proyecto iniciado</p>
              <p className="text-white/60 text-sm">Tu proyecto ha sido asignado al equipo de desarrollo</p>
            </div>
            <span className="text-green-400 text-xs font-semibold bg-green-600/20 px-3 py-1 rounded-full">Completado</span>
          </div>

          <div className="flex items-center p-4 bg-[#0147FF]/10 border border-[#0147FF]/30 rounded-[12px]">
            <div className="w-10 h-10 bg-[#0147FF]/20 rounded-full flex items-center justify-center mr-4">
              <div className="w-3 h-3 bg-[#0147FF] rounded-full animate-pulse"></div>
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">Desarrollo de contenido en progreso</p>
              <p className="text-white/60 text-sm">Creando estructura y diseño de tu landing page</p>
            </div>
            <span className="text-[#0147FF] text-xs font-semibold bg-[#0147FF]/20 px-3 py-1 rounded-full">En Progreso</span>
          </div>

          <div className="flex items-center p-4 bg-white/5 rounded-[12px] border border-white/10 opacity-60">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-4">
              <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-white/60 font-medium">Optimización y testing final</p>
              <p className="text-white/40 text-sm">Revisión de calidad y ajustes finales</p>
            </div>
            <span className="text-white/30 text-xs">Pendiente</span>
          </div>

          <div className="flex items-center p-4 bg-white/5 rounded-[12px] border border-white/10 opacity-60">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-4">
              <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-white/60 font-medium">¡Sitio web entregado!</p>
              <p className="text-white/40 text-sm">Tu sitio estará live y listo para usar</p>
            </div>
            <span className="text-white/30 text-xs">Estimado: {projectData.estimatedDelivery}</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}