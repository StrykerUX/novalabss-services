'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { 
  OptimizedOnboardingData, 
  OptimizedOnboardingState, 
  OptimizedBusinessInfo, 
  OptimizedGoals, 
  WebsiteConfig, 
  BrandingAssets,
  SimpleDomainConfig
} from '@/types/onboarding'
import { OPTIMIZED_STEPS, generateBrandingPrompt } from '@/lib/onboarding-config'

const TOTAL_STEPS = 6
const ESTIMATED_TOTAL_TIME = 10 // minutos

const initialState: OptimizedOnboardingData = {
  step: 1,
  business: {},
  goals: {},
  website: {},
  branding: {
    socialMedia: {}
  },
  technical: {
    domain: {},
    hasContent: false,
    needsCopywriting: true
  },
  completedSteps: [],
  lastUpdated: new Date().toISOString(),
  estimatedTimeRemaining: ESTIMATED_TOTAL_TIME
}

export const useOptimizedOnboarding = create<OptimizedOnboardingState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // === NAVEGACIÓN ===
      
      setStep: (step: number) => {
        const clampedStep = Math.max(1, Math.min(TOTAL_STEPS, step))
        set({ 
          step: clampedStep,
          lastUpdated: new Date().toISOString()
        })
      },

      nextStep: () => {
        const { step } = get()
        if (step < TOTAL_STEPS) {
          set({ 
            step: step + 1,
            lastUpdated: new Date().toISOString()
          })
        }
      },

      prevStep: () => {
        const { step } = get()
        if (step > 1) {
          set({ 
            step: step - 1,
            lastUpdated: new Date().toISOString()
          })
        }
      },

      // === ACTUALIZADORES POR PASO ===

      updateBusiness: (data: Partial<OptimizedBusinessInfo>) => {
        set(state => ({
          business: { ...state.business, ...data },
          lastUpdated: new Date().toISOString()
        }))
        get().updateTimeEstimate()
      },

      updateGoals: (data: Partial<OptimizedGoals>) => {
        set(state => ({
          goals: { ...state.goals, ...data },
          lastUpdated: new Date().toISOString()
        }))
        get().updateTimeEstimate()
      },

      updateWebsite: (data: Partial<WebsiteConfig>) => {
        set(state => ({
          website: { ...state.website, ...data },
          lastUpdated: new Date().toISOString()
        }))
        get().updateTimeEstimate()
      },

      updateBranding: (data: Partial<BrandingAssets>) => {
        set(state => ({
          branding: { 
            ...state.branding, 
            ...data,
            socialMedia: { ...state.branding.socialMedia, ...data.socialMedia }
          },
          lastUpdated: new Date().toISOString()
        }))
        get().updateTimeEstimate()
      },

      updateTechnical: (data: any) => {
        set(state => ({
          technical: { ...state.technical, ...data },
          lastUpdated: new Date().toISOString()
        }))
        get().updateTimeEstimate()
      },

      // === CONTROL DE FLUJO ===

      markStepCompleted: (step: number) => {
        set(state => ({
          completedSteps: state.completedSteps.includes(step) 
            ? state.completedSteps 
            : [...state.completedSteps, step].sort(),
          lastUpdated: new Date().toISOString()
        }))
        get().updateTimeEstimate()
      },

      isStepCompleted: (step: number) => {
        return get().completedSteps.includes(step)
      },

      canProceedToNext: () => {
        const { step, business, goals, website, branding, technical } = get()
        
        switch (step) {
          case 1: // Negocio
            return !!(business.name && business.industry && business.size && business.location?.country)
          
          case 2: // Objetivos
            return !!(goals.primaryGoal && goals.targetAudience?.ageRanges?.length)
          
          case 3: // Website
            return !!(website.pages?.length && website.features?.length)
          
          case 4: // Branding
            return !!(branding.brandStyle)
          
          case 5: // Technical
            return technical.domain?.hasDomain !== undefined
          
          case 6: // Confirmation
            return true
            
          default:
            return false
        }
      },

      // === PERSISTENCIA ===

      resetOnboarding: () => {
        set(initialState)
        localStorage.removeItem('optimized-onboarding-storage')
      },

      saveToStorage: () => {
        // Zustand persist se encarga automáticamente
        set({ lastUpdated: new Date().toISOString() })
      },

      loadFromStorage: () => {
        // Zustand persist se encarga automáticamente
        const stored = localStorage.getItem('optimized-onboarding-storage')
        if (stored) {
          try {
            const data = JSON.parse(stored)
            set({ ...data.state, lastUpdated: new Date().toISOString() })
          } catch (error) {
            console.error('Error loading onboarding from storage:', error)
          }
        }
      },

      saveToDatabase: async () => {
        const state = get()
        try {
          const response = await fetch('/api/onboarding/save-optimized', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              onboardingData: {
                business: state.business,
                goals: state.goals,
                website: state.website,
                branding: state.branding,
                technical: state.technical,
                completedSteps: state.completedSteps,
                step: state.step
              }
            })
          })

          if (!response.ok) {
            throw new Error('Failed to save to database')
          }

          console.log('✅ Onboarding saved to database')
        } catch (error) {
          console.error('❌ Error saving onboarding to database:', error)
          throw error
        }
      },

      // === IA Y ARCHIVOS ===

      uploadFiles: async (files: File[], type: 'logo' | 'brandGuide' | 'images') => {
        try {
          const formData = new FormData()
          files.forEach(file => formData.append('files', file))
          formData.append('type', type)

          const response = await fetch('/api/upload/branding', {
            method: 'POST',
            body: formData
          })

          if (!response.ok) {
            throw new Error('Upload failed')
          }

          const { urls } = await response.json()
          
          // Actualizar el estado con las URLs
          const { branding } = get()
          const updatedBranding = { ...branding }
          
          if (type === 'logo') {
            updatedBranding.logo = urls
          } else if (type === 'brandGuide') {
            updatedBranding.brandGuide = urls
          } else if (type === 'images') {
            updatedBranding.images = urls
          }
          
          get().updateBranding(updatedBranding)
          
          return urls
        } catch (error) {
          console.error('❌ Error uploading files:', error)
          throw error
        }
      },

      analyzeWithAI: async (brandingQuestions: any) => {
        try {
          const { business, goals } = get()
          
          const prompt = generateBrandingPrompt(
            { ...business, ...goals },
            brandingQuestions
          )

          const response = await fetch('/api/ai/analyze-branding', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt, brandingQuestions })
          })

          if (!response.ok) {
            throw new Error('AI analysis failed')
          }

          const aiAnalysis = await response.json()
          
          // Actualizar el estado con el análisis de IA
          get().updateBranding({ aiAnalysis })
          
          return aiAnalysis
        } catch (error) {
          console.error('❌ Error analyzing with AI:', error)
          throw error
        }
      },

      // === UTILIDADES ===

      updateTimeEstimate: () => {
        const { completedSteps } = get()
        const completedTime = completedSteps.reduce((total, stepNum) => {
          const step = OPTIMIZED_STEPS.find(s => s.id === stepNum)
          return total + (step?.estimatedTime || 0)
        }, 0)
        
        const remaining = Math.max(0, ESTIMATED_TOTAL_TIME - completedTime)
        set({ estimatedTimeRemaining: remaining })
      },

      getTimeRemaining: () => {
        return get().estimatedTimeRemaining
      },

      getCompletionPercentage: () => {
        const { completedSteps } = get()
        return Math.round((completedSteps.length / TOTAL_STEPS) * 100)
      }
    }),
    {
      name: 'optimized-onboarding-storage',
      partialize: (state) => ({
        step: state.step,
        business: state.business,
        goals: state.goals,
        website: state.website,
        branding: state.branding,
        technical: state.technical,
        completedSteps: state.completedSteps,
        lastUpdated: state.lastUpdated,
        estimatedTimeRemaining: state.estimatedTimeRemaining
      })
    }
  )
)

// === HELPERS ADICIONALES ===

export const useOnboardingValidation = () => {
  const state = useOptimizedOnboarding()
  
  const validateCurrentStep = () => {
    return state.canProceedToNext()
  }
  
  const getValidationErrors = (step: number) => {
    const { business, goals, website, branding, technical } = state
    const errors: string[] = []
    
    switch (step) {
      case 1:
        if (!business.name) errors.push('Nombre del negocio es requerido')
        if (!business.industry) errors.push('Industria es requerida')
        if (!business.size) errors.push('Tamaño de empresa es requerido')
        if (!business.location?.country) errors.push('País es requerido')
        break
        
      case 2:
        if (!goals.primaryGoal) errors.push('Objetivo principal es requerido')
        if (!goals.targetAudience?.ageRanges?.length) errors.push('Audiencia objetivo es requerida')
        break
        
      case 3:
        if (!website.pages?.length) errors.push('Selecciona al menos una página')
        if (!website.features?.length) errors.push('Selecciona al menos una funcionalidad')
        break
        
      case 4:
        if (!branding.brandStyle) errors.push('Selecciona un estilo de marca')
        break
        
      case 5:
        if (technical.domain?.hasDomain === undefined) errors.push('Indica si tienes dominio')
        break
    }
    
    return errors
  }
  
  return {
    validateCurrentStep,
    getValidationErrors,
    isValid: validateCurrentStep(),
    errors: getValidationErrors(state.step)
  }
}

export default useOptimizedOnboarding