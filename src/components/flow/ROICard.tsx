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
    <div className="flex flex-col items-center justify-center h-full">
      {/* Layout Unificado - Responsive */}
      <div className="text-center flex-1 flex flex-col justify-center">
        
        {/* Solo precio y plan - Ultra clean */}
        <div className="text-center">
          <h2 className="text-white font-bold text-xl lg:text-3xl mb-4" style={{textWrap: "pretty"}}>
            El plan perfecto: {flowData.plan.toUpperCase()}
          </h2>
          <div className="text-white mb-6 lg:mb-8">
            <span className="text-3xl lg:text-5xl font-black">{flowData.planPrice}</span>
            <span className="text-gray-400 text-sm lg:text-lg ml-2">MXN/bimestre</span>
          </div>
          
          {/* Lista completa de beneficios */}
          <div className="bg-gray-900/30 border border-gray-800/50 rounded-[24px] p-6 lg:p-8 mb-6 lg:mb-8 max-w-md mx-auto">
            <div className="space-y-3 lg:space-y-4">
              {flowData.plan === 'rocket' ? (
                <>
                  <div className="flex items-center text-left">
                    <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0 mr-3 lg:mr-4">
                      <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300 text-sm lg:text-base font-medium" style={{textWrap: "pretty"}}>Sitio web profesional optimizado</span>
                  </div>
                  <div className="flex items-center text-left">
                    <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0 mr-3 lg:mr-4">
                      <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300 text-sm lg:text-base font-medium" style={{textWrap: "pretty"}}>SEO para aparecer en Google</span>
                  </div>
                  <div className="flex items-center text-left">
                    <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0 mr-3 lg:mr-4">
                      <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300 text-sm lg:text-base font-medium" style={{textWrap: "pretty"}}>Diseño mobile-first responsive</span>
                  </div>
                  <div className="flex items-center text-left">
                    <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0 mr-3 lg:mr-4">
                      <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300 text-sm lg:text-base font-medium" style={{textWrap: "pretty"}}>Hosting y dominio incluido</span>
                  </div>
                  <div className="flex items-center text-left">
                    <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0 mr-3 lg:mr-4">
                      <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300 text-sm lg:text-base font-medium" style={{textWrap: "pretty"}}>Certificado SSL de seguridad</span>
                  </div>
                  <div className="flex items-center text-left">
                    <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0 mr-3 lg:mr-4">
                      <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300 text-sm lg:text-base font-medium" style={{textWrap: "pretty"}}>Formularios de contacto</span>
                  </div>
                  <div className="flex items-center text-left">
                    <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0 mr-3 lg:mr-4">
                      <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300 text-sm lg:text-base font-medium" style={{textWrap: "pretty"}}>Analytics y métricas básicas</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center text-left">
                    <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0 mr-3 lg:mr-4">
                      <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300 text-sm lg:text-base font-medium" style={{textWrap: "pretty"}}>Todo lo incluido en Rocket</span>
                  </div>
                  <div className="flex items-center text-left">
                    <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0 mr-3 lg:mr-4">
                      <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300 text-sm lg:text-base font-medium" style={{textWrap: "pretty"}}>Estrategia de marketing personalizada</span>
                  </div>
                  <div className="flex items-center text-left">
                    <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0 mr-3 lg:mr-4">
                      <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300 text-sm lg:text-base font-medium" style={{textWrap: "pretty"}}>Analytics avanzado y reportes</span>
                  </div>
                  <div className="flex items-center text-left">
                    <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0 mr-3 lg:mr-4">
                      <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300 text-sm lg:text-base font-medium" style={{textWrap: "pretty"}}>Integración con CRM</span>
                  </div>
                  <div className="flex items-center text-left">
                    <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0 mr-3 lg:mr-4">
                      <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300 text-sm lg:text-base font-medium" style={{textWrap: "pretty"}}>Automatización de marketing</span>
                  </div>
                  <div className="flex items-center text-left">
                    <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0 mr-3 lg:mr-4">
                      <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300 text-sm lg:text-base font-medium" style={{textWrap: "pretty"}}>Soporte premium prioritario</span>
                  </div>
                  <div className="flex items-center text-left">
                    <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0 mr-3 lg:mr-4">
                      <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300 text-sm lg:text-base font-medium" style={{textWrap: "pretty"}}>Consultoría mensual incluida</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Solo botón de pago - Hierarchy clara */}
        <div className="flex justify-center">
          <SmoothMagneticButton
            onClick={() => onProceedToCheckout(flowData.plan)}
            className="px-8 lg:px-12 py-4 lg:py-5 font-space-grotesk font-semibold text-base lg:text-xl hover:shadow-2xl hover:shadow-blue-500/40 transition-shadow duration-300 shadow-xl shadow-blue-600/30 flex items-center justify-center"
            magneticStrength={0.2}
          >
            <span>Pagar ahora</span>
            <svg className="w-5 h-5 lg:w-6 lg:h-6 ml-2 lg:ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </SmoothMagneticButton>
        </div>
      </div>
        
    </div>
  )
}