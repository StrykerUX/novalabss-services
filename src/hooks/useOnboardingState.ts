import { create } from 'zustand'
import { OnboardingState, OnboardingData } from '@/types/onboarding'
import React from 'react'

const STORAGE_KEY = 'novalabs-onboarding-state'

const defaultState: OnboardingData = {
  step: 1,
  businessInfo: {},
  objectives: {},
  contentArchitecture: {},
  brandDesign: {},
  technicalSetup: {},
  projectPlanning: {},
  completedSteps: [],
  lastUpdated: new Date().toISOString()
}

export const useOnboardingState = create<OnboardingState>((set, get) => ({
  ...defaultState,

  setStep: (step: number) => {
    set((state) => {
      const newState = { ...state, step, lastUpdated: new Date().toISOString() }
      saveToLocalStorage(newState)
      return newState
    })
  },

  updateBusinessInfo: (data) => {
    set((state) => {
      const newState = {
        ...state,
        businessInfo: { ...state.businessInfo, ...data },
        lastUpdated: new Date().toISOString()
      }
      saveToLocalStorage(newState)
      saveToDatabase(newState)
      return newState
    })
  },

  updateObjectives: (data) => {
    set((state) => {
      const newState = {
        ...state,
        objectives: { ...state.objectives, ...data },
        lastUpdated: new Date().toISOString()
      }
      saveToLocalStorage(newState)
      saveToDatabase(newState)
      return newState
    })
  },

  updateContentArchitecture: (data) => {
    set((state) => {
      const newState = {
        ...state,
        contentArchitecture: { ...state.contentArchitecture, ...data },
        lastUpdated: new Date().toISOString()
      }
      saveToLocalStorage(newState)
      saveToDatabase(newState)
      return newState
    })
  },

  updateBrandDesign: (data) => {
    set((state) => {
      const newState = {
        ...state,
        brandDesign: { ...state.brandDesign, ...data },
        lastUpdated: new Date().toISOString()
      }
      saveToLocalStorage(newState)
      saveToDatabase(newState)
      return newState
    })
  },

  updateTechnicalSetup: (data) => {
    set((state) => {
      const newState = {
        ...state,
        technicalSetup: { ...state.technicalSetup, ...data },
        lastUpdated: new Date().toISOString()
      }
      saveToLocalStorage(newState)
      saveToDatabase(newState)
      return newState
    })
  },

  updateProjectPlanning: (data) => {
    set((state) => {
      const newState = {
        ...state,
        projectPlanning: { ...state.projectPlanning, ...data },
        lastUpdated: new Date().toISOString()
      }
      saveToLocalStorage(newState)
      saveToDatabase(newState)
      return newState
    })
  },

  markStepCompleted: (step: number) => {
    set((state) => {
      const completedSteps = [...state.completedSteps]
      if (!completedSteps.includes(step)) {
        completedSteps.push(step)
      }
      const newState = {
        ...state,
        completedSteps,
        lastUpdated: new Date().toISOString()
      }
      saveToLocalStorage(newState)
      saveToDatabase(newState)
      return newState
    })
  },

  resetOnboarding: () => {
    set(() => {
      const newState = { ...defaultState, lastUpdated: new Date().toISOString() }
      saveToLocalStorage(newState)
      return newState
    })
  },

  saveToStorage: () => {
    const state = get()
    saveToLocalStorage(state)
  },

  loadFromStorage: () => {
    const stored = loadFromLocalStorage()
    if (stored) {
      set(stored)
    }
  }
}))

function saveToLocalStorage(state: OnboardingData) {
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    }
  } catch (error) {
    console.error('Error saving onboarding state:', error)
  }
}

function loadFromLocalStorage(): OnboardingData | null {
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        // Validar que los datos no sean muy antiguos (7 días)
        const lastUpdated = new Date(parsed.lastUpdated)
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        
        if (lastUpdated > weekAgo) {
          return parsed
        }
      }
    }
  } catch (error) {
    console.error('Error loading onboarding state:', error)
  }
  return null
}

async function saveToDatabase(state: OnboardingData) {
  try {
    if (typeof window !== 'undefined') {
      await fetch('/api/onboarding/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessInfo: state.businessInfo,
          objectives: state.objectives,
          contentArchitecture: state.contentArchitecture,
          brandDesign: state.brandDesign,
          technicalSetup: state.technicalSetup,
          projectPlanning: state.projectPlanning,
          completedSteps: state.completedSteps,
          isComplete: false
        })
      })
    }
  } catch (error) {
    console.error('Error saving onboarding to database:', error)
  }
}

// Hook para auto-save cada 30 segundos
export function useOnboardingAutoSave() {
  const saveToStorage = useOnboardingState((state) => state.saveToStorage)
  
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const interval = setInterval(() => {
        saveToStorage()
      }, 30000) // 30 segundos
      
      return () => clearInterval(interval)
    }
  }, [saveToStorage])
}