"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import DashboardLayout from "@/components/DashboardLayout"
import SmoothMagneticButton from "@/components/SmoothMagneticButton"
import OnboardingRecoveryBanner from "@/components/dashboard/OnboardingRecoveryBanner"
import OnboardingDebug from "@/components/OnboardingDebug"
import SubscriptionDebug from "@/components/SubscriptionDebug"
import ProjectNotifications from "@/components/ProjectNotifications"
import { useOnboardingState } from "@/hooks/useOnboardingState"
import { useOnboardingProgress } from "@/hooks/useOnboardingProgress"
import { useSubscription } from "@/hooks/useSubscription"
import { useUserProjects } from "@/hooks/useUserProjects"

export default function Dashboard() {
  const { data: session } = useSession()
  const onboardingData = useOnboardingState()
  const { isComplete } = useOnboardingProgress()
  const subscriptionData = useSubscription()
  const { projects, loading: projectsLoading } = useUserProjects()

  // Datos del proyecto basados en proyectos reales o onboarding
  const getProjectData = () => {
    // Si tenemos proyectos reales, usar el más reciente
    if (projects && projects.length > 0 && !projectsLoading) {
      const latestProject = projects[0] // El hook los ordena por fecha descendente
      
      // Datos reales del proyecto
      const stripePlan = subscriptionData.plan?.name || latestProject.plan
      const stripeCredits = subscriptionData.plan?.credits || (latestProject.plan === 'Galaxy' ? 5 : 2)
      const businessName = onboardingData.businessInfo?.name || latestProject.name.split(' - ')[1] || "Tu Empresa"
      
      // Fechas y tiempo desde Stripe
      const daysElapsed = subscriptionData.daysElapsed || 0
      const isActiveSubscription = subscriptionData.isActive
      
      return {
        businessName,
        status: isActiveSubscription ? latestProject.status.replace('_', ' ') : "ESPERANDO ACTIVACIÓN",
        progress: latestProject.progress,
        currentPhase: latestProject.currentPhase || "Sin fase definida",
        estimatedDelivery: latestProject.estimatedDelivery || "Por definir",
        daysCurrent: daysElapsed,
        daysTotal: latestProject.plan === 'Galaxy' ? 5 : 3,
        plan: stripePlan,
        credits: { available: stripeCredits, total: stripeCredits },
        lastUpdate: `Actualizado ${new Date(latestProject.updatedAt).toLocaleDateString()}`,
        pages: onboardingData.contentArchitecture?.pages || [],
        features: onboardingData.contentArchitecture?.features || [],
        industry: onboardingData.businessInfo?.industry || "",
        primaryGoal: onboardingData.objectives?.primaryGoal || "",
        domainName: onboardingData.technicalSetup?.domain?.name,
        subscriptionActive: isActiveSubscription,
        subscriptionStatus: subscriptionData.status,
        projectId: latestProject.id,
        hasRealProject: true
      }
    }
    
    // Si el onboarding no está completo, mostrar datos por defecto
    if (!isComplete) {
      return {
        businessName: "Tu Empresa",
        status: "ESPERANDO CONFIGURACIÓN",
        progress: 0,
        currentPhase: "Pendiente de configuración",
        estimatedDelivery: "--",
        daysCurrent: 0,
        daysTotal: 3,
        plan: "Rocket",
        credits: { available: 2, total: 2 },
        lastUpdate: "--",
        pages: [],
        features: [],
        industry: "",
        primaryGoal: "",
        hasRealProject: false
      }
    }

    // Datos reales del onboarding y suscripción
    const stripePlan = subscriptionData.plan?.name || "Plan Rocket"
    const stripeCredits = subscriptionData.plan?.credits || 2
    const businessName = onboardingData.businessInfo?.name || "Tu Empresa"
    const pages = onboardingData.contentArchitecture?.pages || []
    const features = onboardingData.contentArchitecture?.features || []
    const industry = onboardingData.businessInfo?.industry || ""
    const primaryGoal = onboardingData.objectives?.primaryGoal || ""
    const domainName = onboardingData.technicalSetup?.domain?.name
    
    // Fechas y tiempo desde Stripe
    const projectStartDate = subscriptionData.startDate
    const daysElapsed = subscriptionData.daysElapsed || 0
    const isActiveSubscription = subscriptionData.isActive
    
    // Determinar fase actual basada en tiempo transcurrido y datos completados
    const getCurrentPhase = () => {
      if (!isActiveSubscription) return "Esperando activación"
      if (daysElapsed >= 2) return "Desarrollo de contenido"
      if (domainName) return "Configuración técnica"
      if (onboardingData.brandDesign?.style) return "Diseño y branding"
      if (pages.length > 0 || features.length > 0) return "Análisis de requerimientos"
      return "Configuración inicial"
    }
    
    // Calcular entrega estimada basada en días reales
    const getEstimatedDelivery = () => {
      if (!isActiveSubscription) return "--"
      const totalDays = 3
      const remainingDays = Math.max(0, totalDays - daysElapsed)
      if (remainingDays === 0) return "Finalizado"
      if (remainingDays === 1) return "24h restantes"
      return `${remainingDays} días restantes`
    }
    
    return {
      businessName,
      status: isActiveSubscription ? "EN DESARROLLO" : "ESPERANDO ACTIVACIÓN",
      progress: Math.min(90, (daysElapsed / 3) * 100),
      currentPhase: getCurrentPhase(),
      estimatedDelivery: getEstimatedDelivery(),
      daysCurrent: daysElapsed,
      daysTotal: 3,
      plan: stripePlan,
      credits: { available: stripeCredits, total: stripeCredits },
      lastUpdate: projectStartDate ? `hace ${daysElapsed} días` : "--",
      pages,
      features,
      industry,
      primaryGoal,
      domainName,
      subscriptionActive: isActiveSubscription,
      subscriptionStatus: subscriptionData.status
    }
  }

  const projectData = getProjectData()

  return (
    <DashboardLayout 
      title="Dashboard" 
      subtitle={`¡Hola ${session?.user?.name?.split(' ')[0] || 'Usuario'}! Tu sitio web está en proceso`}
    >
      {/* BANNER DE RECOVERY DE ONBOARDING */}
      <OnboardingRecoveryBanner />


      {/* 1. ESTADO DEL PROYECTO - Card Hero */}
      <div className="bg-[#1A1A1A] rounded-[48px] p-8 border border-white/10 relative overflow-hidden mb-8">
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
                <div className="flex items-center space-x-3">
                  <h2 className="text-2xl font-bold text-white font-space-grotesk">🚀 {projectData.businessName.toUpperCase()} - Plan {projectData.plan}</h2>
                  {projectData.hasRealProject && (
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                      ✅ Proyecto Real
                    </span>
                  )}
                </div>
                <p className="text-[#0147FF] font-semibold text-lg">{projectData.status} {projectData.daysCurrent > 0 ? `(Día ${projectData.daysCurrent} de ${projectData.daysTotal})` : ''}</p>
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

      {/* CARACTERÍSTICAS DEL PROYECTO - Solo si el onboarding está completo */}
      {isComplete && (projectData.pages.length > 0 || projectData.features.length > 0) && (
        <div className="bg-[#1A1A1A] rounded-[48px] p-8 border border-white/10 mb-8">
          <h3 className="text-xl font-bold text-white font-space-grotesk mb-6">📋 Características de tu Proyecto</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Páginas seleccionadas */}
            {projectData.pages.length > 0 && (
              <div className="bg-white/5 rounded-[12px] p-6 border border-white/10">
                <h4 className="text-white font-semibold text-lg mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Páginas ({projectData.pages.length})
                </h4>
                <div className="space-y-2">
                  {projectData.pages.slice(0, 4).map((page: string, index: number) => (
                    <div key={index} className="flex items-center text-white/80 text-sm">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      {page}
                    </div>
                  ))}
                  {projectData.pages.length > 4 && (
                    <div className="text-white/60 text-xs mt-2">+{projectData.pages.length - 4} páginas más</div>
                  )}
                </div>
              </div>
            )}

            {/* Funcionalidades seleccionadas */}
            {projectData.features.length > 0 && (
              <div className="bg-white/5 rounded-[12px] p-6 border border-white/10">
                <h4 className="text-white font-semibold text-lg mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Funcionalidades ({projectData.features.length})
                </h4>
                <div className="space-y-2">
                  {projectData.features.slice(0, 4).map((feature: string, index: number) => (
                    <div key={index} className="flex items-center text-white/80 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                  {projectData.features.length > 4 && (
                    <div className="text-white/60 text-xs mt-2">+{projectData.features.length - 4} funcionalidades más</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Información del negocio */}
          {(projectData.industry || projectData.primaryGoal) && (
            <div className="mt-6 bg-white/5 rounded-[12px] p-6 border border-white/10">
              <h4 className="text-white font-semibold text-lg mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Información del Negocio
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projectData.industry && (
                  <div>
                    <span className="text-white/60 text-sm">Industria:</span>
                    <p className="text-white font-medium">{projectData.industry}</p>
                  </div>
                )}
                {projectData.primaryGoal && (
                  <div>
                    <span className="text-white/60 text-sm">Objetivo Principal:</span>
                    <p className="text-white font-medium">{projectData.primaryGoal}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* MÚLTIPLES PROYECTOS - Si el usuario tiene más de uno */}
      {projects && projects.length > 1 && (
        <div className="bg-[#1A1A1A] rounded-[48px] p-8 border border-white/10 mb-8">
          <h3 className="text-xl font-bold text-white font-space-grotesk mb-6">📋 Todos tus Proyectos</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div key={project.id} className="bg-white/5 rounded-[24px] p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-white font-semibold text-lg">{project.name}</h4>
                    <p className="text-white/60 text-sm">{project.currentPhase || 'Sin fase definida'}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'COMPLETADO' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    project.status === 'EN_DESARROLLO' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                    project.status === 'EN_REVISION' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                    project.status === 'EN_MANTENIMIENTO' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                  }`}>
                    {project.status.replace('_', ' ')}
                  </span>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-white/80 mb-2">
                    <span>Progreso</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#0147FF] to-[#0147FF80] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <span className="text-white/60">Plan:</span>
                    <span className="text-white ml-2">{project.plan}</span>
                  </div>
                  <div>
                    <span className="text-white/60">Entrega:</span>
                    <span className="text-white ml-2">{project.estimatedDelivery || 'Por definir'}</span>
                  </div>
                </div>
                
                <div className="mt-4 text-xs text-white/40">
                  Actualizado: {new Date(project.updatedAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Debug components - solo en desarrollo */}
      <OnboardingDebug />
      <SubscriptionDebug />

      {/* Notificaciones de proyectos nuevos */}
      <ProjectNotifications />

    </DashboardLayout>
  )
}