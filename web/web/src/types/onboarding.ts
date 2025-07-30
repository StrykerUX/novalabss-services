export interface BusinessInfo {
  name: string
  description: string
  characteristics: string
  industry: string
  customIndustry?: string
  size: 'freelancer' | 'startup' | 'pyme' | 'empresa'
  location: string
  yearsOperating: number
  businessRegion: 'latam' | 'international'
  businessCountry: string
}

export interface Objectives {
  primaryGoal: 'sales' | 'leads' | 'branding' | 'portfolio' | 'other'
  targetAudience: {
    ageRange: string[]
    location: string
    interests: string[]
    customInterests?: string[]
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
  sections: string[]
  features: string[]
  maxFeatures?: number
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