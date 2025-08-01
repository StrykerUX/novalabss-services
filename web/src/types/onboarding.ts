// === NUEVA ESTRUCTURA OPTIMIZADA (6 PASOS) ===

export interface OptimizedBusinessInfo {
  name: string
  industry: string
  customIndustry?: string
  size: 'freelancer' | 'startup' | 'pyme' | 'empresa'
  location: {
    country: string
    region: string
    city?: string
  }
}

export interface OptimizedGoals {
  primaryGoal: 'sales' | 'leads' | 'branding' | 'portfolio'
  targetAudience: {
    ageRanges: string[]  // Máx 2 rangos
    location: 'local' | 'national' | 'international'
    description?: string
  }
}

export interface WebsiteConfig {
  plan: 'rocket' | 'galaxy'
  pages: string[]
  features: string[]  // Máx 3
  priority: string    // ¿Qué es lo más importante?
}

export interface BrandingAssets {
  // Archivos subidos
  logo?: File[]
  brandGuide?: File[]
  images?: File[]
  
  // Enlaces externos
  socialMedia: {
    website?: string
    instagram?: string
    facebook?: string
    linkedin?: string
    tiktok?: string
  }
  
  // Información manual
  brandColors?: string[]
  brandStyle: 'modern' | 'classic' | 'minimal' | 'bold' | 'elegant' | 'creative'
  
  // Análisis por IA
  aiAnalysis?: {
    brandPersonality: string
    recommendedColors: string[]
    styleDirection: string
    confidence: number
  }
}

export interface SimpleDomainConfig {
  hasDomain: boolean
  domainName?: string
  needsHelp: boolean
}

// Estructura principal optimizada
export interface OptimizedOnboardingData {
  step: number
  
  // Step 1: Negocio
  business: Partial<OptimizedBusinessInfo>
  
  // Step 2: Objetivo y Audiencia  
  goals: Partial<OptimizedGoals>
  
  // Step 3: Sitio Web (condicional por plan)
  website: Partial<WebsiteConfig>
  
  // Step 4: Identidad Visual
  branding: Partial<BrandingAssets>
  
  // Step 5: Configuración
  technical: {
    domain: Partial<SimpleDomainConfig>
    hasContent: boolean
    needsCopywriting: boolean
  }
  
  // Metadatos
  completedSteps: number[]
  lastUpdated: string
  estimatedTimeRemaining: number // minutos
}

// === ESTRUCTURA ANTERIOR (MANTENER PARA MIGRACIÓN) ===

export interface BusinessInfo {
  name: string
  industry: string
  size: 'freelancer' | 'startup' | 'pyme' | 'empresa'
  yearsOperating: number
  businessRegion: 'latam' | 'international'
  businessCountry: string
}

export interface Objectives {
  primaryGoal: 'sales' | 'leads' | 'branding' | 'portfolio' | 'other'
  targetAudience: {
    ageRange: string
    location: string
    interests: string[]
  }
  competitors: string[]
  specificGoals: {
    monthlyVisitors?: number
    monthlyLeads?: number
    conversionRate?: number
  }
}

export interface ContentArchitecture {
  pages: string[]
  features: string[]
  existingContent: boolean
  needsCopywriting: boolean
  multimedia: {
    hasLogo: boolean
    hasPhotos: boolean
    hasVideos: boolean
    needsDesign: boolean
  }
}

export interface BrandDesign {
  colors: string[]
  style: 'modern' | 'classic' | 'minimalist' | 'bold' | 'creative'
  references: string[]
  logoStatus: 'existing' | 'needs-design' | 'needs-update'
}

export interface TechnicalSetup {
  domain: {
    existing: boolean
    name?: string
    needsRegistration: boolean
  }
  hosting: {
    traffic: 'low' | 'medium' | 'high'
    features: string[]
  }
  integrations: string[]
  ssl: boolean
  corporateEmail: boolean
}

export interface ProjectPlanning {
  timeline: number // semanas
  deliverables: string[]
  milestones: { name: string, date: string }[]
  communicationChannel: 'email' | 'whatsapp' | 'slack' | 'phone'
  priority: 'low' | 'medium' | 'high'
}

export interface OnboardingData {
  step: number
  businessInfo: Partial<BusinessInfo>
  objectives: Partial<Objectives>
  contentArchitecture: Partial<ContentArchitecture>
  brandDesign: Partial<BrandDesign>
  technicalSetup: Partial<TechnicalSetup>
  projectPlanning: Partial<ProjectPlanning>
  completedSteps: number[]
  lastUpdated: string
}

// === CONFIGURACIÓN PARA ROCKET VS GALAXY ===

export interface PageOption {
  id: string
  name: string
  description: string
  required: boolean
  planCompatible: ('rocket' | 'galaxy')[]
}

export interface FeatureOption {
  id: string
  name: string
  description: string
  type: 'static' | 'dynamic' | 'advanced'
  planCompatible: ('rocket' | 'galaxy')[]
  category: 'contact' | 'content' | 'interaction' | 'integration'
}

// Configuración de preguntas para IA de branding
export interface BrandingQuestion {
  id: string
  question: string
  type: 'select' | 'textarea'
  options?: string[]
  placeholder?: string
}

// === COMPONENTES DEL ONBOARDING OPTIMIZADO ===

export interface OptimizedStep {
  id: number
  title: string
  subtitle: string
  emoji: string
  estimatedTime: number // minutos
  category: 'business' | 'goals' | 'website' | 'branding' | 'technical' | 'confirmation'
  required: boolean
}

export interface MicroStep {
  id: number
  title: string
  subtitle: string
  category: 'location' | 'business' | 'objectives' | 'content' | 'design' | 'technical' | 'review'
  required: boolean
}

export interface PricingTier {
  id: 'latam' | 'international'
  multiplier: number
  currency: 'USD' | 'EUR'
  region: string
  prices: {
    rocket: number
    galaxy: number
  }
}

export interface RegionValidation {
  userSelection: 'latam' | 'international'
  ipCountry?: string
  suspiciousFlags: string[]
  timestamp: string
}

// === ESTADO OPTIMIZADO ===

export interface OptimizedOnboardingState extends OptimizedOnboardingData {
  // Navegación
  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  
  // Actualizadores por paso
  updateBusiness: (data: Partial<OptimizedBusinessInfo>) => void
  updateGoals: (data: Partial<OptimizedGoals>) => void
  updateWebsite: (data: Partial<WebsiteConfig>) => void
  updateBranding: (data: Partial<BrandingAssets>) => void
  updateTechnical: (data: any) => void
  
  // Control de flujo
  markStepCompleted: (step: number) => void
  isStepCompleted: (step: number) => boolean
  canProceedToNext: () => boolean
  
  // Persistencia
  resetOnboarding: () => void
  saveToStorage: () => void
  loadFromStorage: () => void
  saveToDatabase: () => Promise<void>
  
  // IA y archivos
  uploadFiles: (files: File[], type: 'logo' | 'brandGuide' | 'images') => Promise<string[]>
  analyzeWithAI: (questions: any) => Promise<any>
  
  // Utilidades
  getTimeRemaining: () => number
  getCompletionPercentage: () => number
}

// === ESTADO ANTERIOR (MANTENER PARA COMPATIBILIDAD) ===

export interface OnboardingState extends OnboardingData {
  setStep: (step: number) => void
  updateBusinessInfo: (data: Partial<BusinessInfo>) => void
  updateObjectives: (data: Partial<Objectives>) => void
  updateContentArchitecture: (data: Partial<ContentArchitecture>) => void
  updateBrandDesign: (data: Partial<BrandDesign>) => void
  updateTechnicalSetup: (data: Partial<TechnicalSetup>) => void
  updateProjectPlanning: (data: Partial<ProjectPlanning>) => void
  markStepCompleted: (step: number) => void
  resetOnboarding: () => void
  saveToStorage: () => void
  loadFromStorage: () => void
}