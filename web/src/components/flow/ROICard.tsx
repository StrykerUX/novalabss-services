"use client"

import { useMemo } from "react"
import { Frustration, Aspiration } from "@/app/start/page"
import SmoothMagneticButton from "@/components/SmoothMagneticButton"
import PlanCard from "@/components/PlanCard"

interface ROICardProps {
  frustration: Frustration
  aspiration: Aspiration
  onProceedToCheckout: (plan: "rocket" | "galaxy") => void
}

export default function ROICard({ frustration, aspiration, onProceedToCheckout }: ROICardProps) {
  
  const flowData = useMemo(() => {
    const combinations = {
      // Pocos me encuentran
      "pocos_encuentran_2-3_clientes": {
        caseStudy: "Consultora Legal Pro",
        caseProblem: "Invisible en Google",
        caseGoal: "3 clientes más/mes",
        caseResult: "4 clientes/mes en 72h",
        caseGain: "$12,000",
        userGain: "$7,500",
        plan: "rocket" as const,
        planPrice: "$999",
        roi: "750%"
      },
      "pocos_encuentran_5-10_clientes": {
        caseStudy: "Despacho Contable GR",
        caseProblem: "Pocos clientes lo encontraban",
        caseGoal: "8 clientes más/mes", 
        caseResult: "11 clientes/mes en 96h",
        caseGain: "$27,500",
        userGain: "$20,000",
        plan: "rocket" as const,
        planPrice: "$999",
        roi: "2,000%"
      },
      "pocos_encuentran_10-20_clientes": {
        caseStudy: "Clínica Dental Sonrisas",
        caseProblem: "Invisible vs competencia",
        caseGoal: "15 clientes más/mes",
        caseResult: "18 clientes/mes en 72h", 
        caseGain: "$54,000",
        userGain: "$45,000",
        plan: "galaxy" as const,
        planPrice: "$1,799",
        roi: "2,500%"
      },
      "pocos_encuentran_20_plus_clientes": {
        caseStudy: "Centro de Belleza Elite",
        caseProblem: "Perdía clientes por no aparecer online",
        caseGoal: "25 clientes más/mes",
        caseResult: "32 clientes/mes en 96h",
        caseGain: "$96,000", 
        userGain: "$75,000",
        plan: "galaxy" as const,
        planPrice: "$1,799",
        roi: "4,100%"
      },

      // No genera confianza
      "no_confianza_2-3_clientes": {
        caseStudy: "Arquitecto Independiente",
        caseProblem: "Sitio amateur, perdía proyectos",
        caseGoal: "3 clientes más/mes",
        caseResult: "5 clientes/mes en 96h",
        caseGain: "$15,000",
        userGain: "$7,500", 
        plan: "galaxy" as const,
        planPrice: "$1,799",
        roi: "415%"
      },
      "no_confianza_5-10_clientes": {
        caseStudy: "Tienda Artesanal Maya",
        caseProblem: "Sitio amateur, no inspiraba confianza",
        caseGoal: "8 clientes más/mes",
        caseResult: "11 clientes/mes en 96h",
        caseGain: "$33,000",
        userGain: "$22,500",
        plan: "galaxy" as const, 
        planPrice: "$1,799",
        roi: "1,250%"
      },
      "no_confianza_10-20_clientes": {
        caseStudy: "Agencia de Viajes Aventura",
        caseProblem: "Sitio desactualizado vs competencia",
        caseGoal: "15 clientes más/mes",
        caseResult: "21 clientes/mes en 96h",
        caseGain: "$63,000",
        userGain: "$45,000",
        plan: "galaxy" as const,
        planPrice: "$1,799", 
        roi: "2,500%"
      },
      "no_confianza_20_plus_clientes": {
        caseStudy: "Inmobiliaria Premium",
        caseProblem: "Imagen amateur vs competencia premium",
        caseGoal: "25 clientes más/mes",
        caseResult: "35 clientes/mes en 96h",
        caseGain: "$105,000",
        userGain: "$75,000",
        plan: "galaxy" as const,
        planPrice: "$1,799",
        roi: "4,100%"
      },

      // Pierdo vs competencia
      "pierdo_competencia_2-3_clientes": {
        caseStudy: "Taller Mecánico Confiable",
        caseProblem: "Competencia dominaba online",
        caseGoal: "3 clientes más/mes",
        caseResult: "4 clientes/mes en 72h",
        caseGain: "$12,000",
        userGain: "$7,500",
        plan: "galaxy" as const,
        planPrice: "$1,799",
        roi: "415%"
      },
      "pierdo_competencia_5-10_clientes": {
        caseStudy: "Restaurante La Cantina",
        caseProblem: "Competencia dominaba reservas online",
        caseGoal: "8 clientes más/mes",
        caseResult: "12 clientes/mes en 72h",
        caseGain: "$36,000",
        userGain: "$22,500",
        plan: "galaxy" as const,
        planPrice: "$1,799",
        roi: "1,250%"
      },
      "pierdo_competencia_10-20_clientes": {
        caseStudy: "Estudio Fotográfico Pro",
        caseProblem: "Competencia ganaba todos los clientes",
        caseGoal: "15 clientes más/mes",
        caseResult: "19 clientes/mes en 72h",
        caseGain: "$57,000",
        userGain: "$45,000",
        plan: "galaxy" as const,
        planPrice: "$1,799",
        roi: "2,500%"
      },
      "pierdo_competencia_20_plus_clientes": {
        caseStudy: "Consultora Empresarial",
        caseProblem: "Competencia dominaba su mercado",
        caseGoal: "25 clientes más/mes",
        caseResult: "33 clientes/mes en 96h",
        caseGain: "$99,000",
        userGain: "$75,000",
        plan: "galaxy" as const,
        planPrice: "$1,799",
        roi: "4,100%"
      },

      // No tengo tiempo
      "no_tiempo_2-3_clientes": {
        caseStudy: "Veterinaria Familiar",
        caseProblem: "Sin tiempo para manejar sitio web",
        caseGoal: "3 clientes más/mes",
        caseResult: "4 clientes/mes en 72h",
        caseGain: "$12,000",
        userGain: "$7,500",
        plan: "rocket" as const,
        planPrice: "$999",
        roi: "750%"
      },
      "no_tiempo_5-10_clientes": {
        caseStudy: "Psicólogo Clínico",
        caseProblem: "Sin tiempo para tecnología",
        caseGoal: "8 clientes más/mes",
        caseResult: "10 clientes/mes en 72h",
        caseGain: "$30,000",
        userGain: "$22,500",
        plan: "rocket" as const,
        planPrice: "$999",
        roi: "2,250%"
      },
      "no_tiempo_10-20_clientes": {
        caseStudy: "Nutriólogo Especialista",
        caseProblem: "Ocupado con pacientes, no con tecnología",
        caseGoal: "15 clientes más/mes",
        caseResult: "17 clientes/mes en 96h",
        caseGain: "$51,000",
        userGain: "$45,000",
        plan: "galaxy" as const,
        planPrice: "$1,799",
        roi: "2,500%"
      },
      "no_tiempo_20_plus_clientes": {
        caseStudy: "Clínica Médica Integral",
        caseProblem: "Enfocados en pacientes, no en marketing",
        caseGoal: "25 clientes más/mes",
        caseResult: "30 clientes/mes en 96h",
        caseGain: "$90,000",
        userGain: "$75,000",
        plan: "galaxy" as const,
        planPrice: "$1,799",
        roi: "4,100%"
      }
    }

    const key = `${frustration}_${aspiration}` as keyof typeof combinations
    return combinations[key]
  }, [frustration, aspiration])

  const getFrustrationText = (frustration: Frustration) => {
    const texts = {
      pocos_encuentran: "Pocos clientes te encuentran online",
      no_confianza: "Tu sitio no genera confianza",
      pierdo_competencia: "Pierdes clientes vs competencia", 
      no_tiempo: "No tienes tiempo para tecnología"
    }
    return texts[frustration]
  }

  const getAspirationText = (aspiration: Aspiration) => {
    const texts = {
      "2-3_clientes": "2-3 clientes más por mes",
      "5-10_clientes": "5-10 clientes más por mes",
      "10-20_clientes": "10-20 clientes más por mes",
      "20_plus_clientes": "Más de 20 clientes por mes"
    }
    return texts[aspiration]
  }

  if (!flowData) {
    return <div>Error: Combinación no encontrada</div>
  }

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-3">
          Tu Plan Personalizado
        </h2>
        <p className="text-gray-400 text-sm">
          Recomendado específicamente para tu situación
        </p>
      </div>

      {/* Layout Móvil Ultra-Minimalista */}
      <div className="lg:hidden">
        
        {/* Solo precio y plan - Ultra clean */}
        <div className="text-center mb-8">
          <h3 className="text-white font-bold text-2xl mb-4">
            Plan {flowData.plan.toUpperCase()}
          </h3>
          <div className="text-white mb-6">
            <span className="text-4xl font-black">{flowData.planPrice}</span>
            <span className="text-gray-400 text-sm ml-2">MXN/bimestre</span>
          </div>
        </div>

        {/* Solo botón de pago - Hierarchy clara */}
        <div className="text-center">
          <SmoothMagneticButton
            onClick={() => onProceedToCheckout(flowData.plan)}
            className="w-full px-8 py-5 font-space-grotesk font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-shadow duration-300 shadow-xl shadow-blue-600/30 flex items-center justify-center mb-4"
            magneticStrength={0.2}
          >
            <span>Pagar ahora</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </SmoothMagneticButton>
        </div>
      </div>

      {/* Layout Desktop - Solo plan y botón */}
      <div className="hidden lg:flex lg:flex-col lg:items-center lg:justify-center lg:min-h-[400px]">
        
        {/* Solo precio y plan - Ultra clean */}
        <div className="text-center mb-8">
          <h3 className="text-white font-bold text-3xl mb-4">
            Plan {flowData.plan.toUpperCase()}
          </h3>
          <div className="text-white mb-6">
            <span className="text-5xl font-black">{flowData.planPrice}</span>
            <span className="text-gray-400 text-lg ml-2">MXN/bimestre</span>
          </div>
        </div>

        {/* Solo botón de pago - Hierarchy clara */}
        <div className="text-center">
          <SmoothMagneticButton
            onClick={() => onProceedToCheckout(flowData.plan)}
            className="px-12 py-5 font-space-grotesk font-semibold text-xl hover:shadow-2xl hover:shadow-blue-500/40 transition-shadow duration-300 shadow-xl shadow-blue-600/30 flex items-center justify-center"
            magneticStrength={0.2}
          >
            <span>Pagar ahora</span>
            <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </SmoothMagneticButton>
        </div>
      </div>
        
    </div>
  )
}