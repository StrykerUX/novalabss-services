"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import DashboardLayout from "@/components/DashboardLayout"
import SmoothMagneticButton from "@/components/SmoothMagneticButton"

export default function Dashboard() {
  const { data: session } = useSession()

  // Simular datos del proyecto (más adelante se conectará con la API real)
  const projectData = {
    status: "EN DESARROLLO",
    progress: 75,
    currentPhase: "Desarrollo de contenido",
    estimatedDelivery: "23h 45min",
    daysCurrent: 2,
    daysTotal: 3,
    plan: "Rocket",
    credits: { available: 2, total: 2 },
    lastUpdate: "hace 2h"
  }

  return (
    <DashboardLayout 
      title="Dashboard" 
      subtitle={`¡Hola ${session?.user?.name?.split(' ')[0] || 'Usuario'}! Tu sitio web está en proceso`}
    >
      {/* MIS PROYECTOS - Lista de proyectos activos */}
      <div className="bg-[#1A1A1A] rounded-[48px] p-8 border border-white/10 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white font-space-grotesk">📂 Mis Proyectos</h3>
          <Link href="/dashboard/projects" className="text-[#0147FF] hover:text-[#0147FF]/80 text-sm font-medium transition-colors">
            Ver todos →
          </Link>
        </div>
        
        {/* Proyecto Activo */}
        <div className="bg-white/5 rounded-[12px] p-6 border border-white/10 hover:border-[#0147FF]/30 transition-colors cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0147FF] to-[#0147FF80] rounded-[12px] flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold text-lg">Landing Page - Mi Empresa</h4>
                <p className="text-white/60 text-sm">Plan Rocket • Iniciado hace 2 días</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[#0147FF] text-xs font-semibold bg-[#0147FF]/20 px-3 py-1 rounded-full">En Desarrollo</span>
              <p className="text-white/60 text-xs mt-1">Entrega: 23h 45min</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex-1 mr-4">
              <div className="flex justify-between text-sm text-white/80 mb-2">
                <span>Progreso</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-[#0147FF] to-[#0147FF80] h-2 rounded-full w-3/4"></div>
              </div>
            </div>
            <Link href="/dashboard/projects/1">
              <SmoothMagneticButton 
                className="px-4 py-2 text-white font-medium text-sm hover:shadow-lg transition-shadow duration-300"
                magneticStrength={0.1}
              >
                Ver Detalles
              </SmoothMagneticButton>
            </Link>
          </div>
        </div>
      </div>

      {/* 1. ESTADO DEL PROYECTO - Card Hero */}
      <div className="bg-gradient-to-br from-[#0147FF]/20 to-[#0147FF]/5 rounded-[48px] p-8 border border-[#0147FF]/30 relative overflow-hidden mb-8">
        <div className="absolute top-6 right-6 w-20 h-20 bg-[#0147FF]/10 rounded-full blur-xl"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-[#0147FF]/20 rounded-full flex items-center justify-center mr-4">
                <svg className="w-8 h-8 text-[#0147FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white font-space-grotesk">🚀 TU SITIO WEB - Plan {projectData.plan}</h2>
                <p className="text-[#0147FF] font-semibold text-lg">{projectData.status} (Día {projectData.daysCurrent} de {projectData.daysTotal})</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-sm">Entrega estimada</p>
              <p className="text-white font-bold text-xl">{projectData.estimatedDelivery}</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-white/80 mb-2">
              <span>Progreso general</span>
              <span>{projectData.progress}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-[#0147FF] to-[#0147FF80] h-3 rounded-full transition-all duration-500"
                style={{ width: `${projectData.progress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-white/90">
              <span className="font-semibold">Fase actual:</span> {projectData.currentPhase}
            </p>
            <SmoothMagneticButton 
              className="px-6 py-3 text-white font-semibold hover:shadow-xl transition-shadow duration-300"
              magneticStrength={0.15}
            >
              Ver Progreso Detallado
            </SmoothMagneticButton>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* 2. COMUNICACIÓN CON EQUIPO NOVALABS */}
        <div className="bg-[#1A1A1A] rounded-[48px] p-6 border border-white/10">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0147FF] to-[#0147FF80] rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 432 432">
                <rect x="237.073" y="326.634" width="105.366" height="42.1463" rx="21.0731" transform="rotate(90 237.073 326.634)" fill="white"/>
                <rect x="105.366" y="237.073" width="105.366" height="42.1463" rx="21.0732" transform="rotate(180 105.366 237.073)" fill="white"/>
              </svg>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">💬 Equipo NovaLabs</h3>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <p className="text-white/60 text-sm">En línea - Respondió hace 23 mins</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-[12px] p-4 mb-4">
            <p className="text-white/80 text-sm mb-2">Último mensaje:</p>
            <p className="text-white">"Logo actualizado según tu feedback. ¿Qué te parece la nueva versión?"</p>
          </div>
          
          <div className="flex space-x-3">
            <SmoothMagneticButton 
              className="flex-1 px-4 py-3 text-white font-medium hover:shadow-lg transition-shadow duration-300"
              magneticStrength={0.1}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Enviar Mensaje</span>
              </div>
            </SmoothMagneticButton>
            <SmoothMagneticButton 
              className="px-4 py-3 text-white font-medium hover:shadow-lg transition-shadow duration-300 bg-gradient-to-r from-green-600 to-green-600/80"
              magneticStrength={0.1}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </SmoothMagneticButton>
          </div>
        </div>

        {/* 3. CRÉDITOS PARA CAMBIOS */}
        <div className="bg-[#1A1A1A] rounded-[48px] p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-lg">⚡ Tus Créditos para Cambios</h3>
            <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-white">{projectData.credits.available} de {projectData.credits.total}</span>
            <span className="text-white/60">créditos disponibles</span>
          </div>
          
          <div className="w-full bg-white/10 rounded-full h-2 mb-4">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full"
              style={{ width: `${(projectData.credits.available / projectData.credits.total) * 100}%` }}
            ></div>
          </div>
          
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-[12px] p-3 mb-4">
            <p className="text-orange-200 text-sm">
              ⚠️ <strong>Después del delivery:</strong> $299 MXN por cambio adicional
            </p>
          </div>
          
          <div className="flex space-x-3">
            <SmoothMagneticButton 
              className="flex-1 px-4 py-3 text-white font-medium hover:shadow-lg transition-shadow duration-300"
              magneticStrength={0.1}
            >
              Solicitar Cambio
            </SmoothMagneticButton>
            <button className="px-4 py-3 text-white/60 hover:text-white transition-colors text-sm border border-white/20 rounded-full">
              Ver Historial
            </button>
          </div>
        </div>
      </div>

    </DashboardLayout>
  )
}