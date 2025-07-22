"use client"

import { useOnboardingState } from "@/hooks/useOnboardingState"
import { useOnboardingProgress } from "@/hooks/useOnboardingProgress"

export default function OnboardingDebug() {
  const onboardingData = useOnboardingState()
  const progress = useOnboardingProgress()

  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs max-w-md z-50 border border-white/20">
      <h4 className="font-bold mb-2">🔍 Onboarding Debug</h4>
      
      <div className="space-y-2">
        <div>
          <strong>Step actual:</strong> {onboardingData.step}
        </div>
        <div>
          <strong>Completados:</strong> [{onboardingData.completedSteps.join(', ')}]
        </div>
        <div>
          <strong>¿Completo?:</strong> {progress.isComplete ? '✅ Sí' : '❌ No'}
        </div>
        <div>
          <strong>Progreso:</strong> {progress.progressPercentage}%
        </div>
        <div>
          <strong>Fase:</strong> {progress.currentPhase.name}
        </div>
        <div>
          <strong>Próximo paso:</strong> {progress.nextIncompleteStep?.title || 'Ninguno'}
        </div>
        
        <details className="mt-3">
          <summary className="cursor-pointer font-semibold">Ver datos</summary>
          <div className="mt-2 text-[10px] bg-white/10 p-2 rounded overflow-auto max-h-32">
            <pre>{JSON.stringify({
              businessInfo: onboardingData.businessInfo,
              objectives: onboardingData.objectives,
              pages: onboardingData.contentArchitecture.pages,
              features: onboardingData.contentArchitecture.features,
              brandDesign: onboardingData.brandDesign,
              technicalSetup: onboardingData.technicalSetup
            }, null, 2)}</pre>
          </div>
        </details>
      </div>
    </div>
  )
}