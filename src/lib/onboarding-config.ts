// Configuración de páginas y funcionalidades para planes Rocket y Galaxy

import { PageOption, FeatureOption, BrandingQuestion, OptimizedStep } from '@/types/onboarding'

// === CONFIGURACIÓN DE PÁGINAS ===

export const AVAILABLE_PAGES: PageOption[] = [
  {
    id: 'hero',
    name: 'Sección principal',
    description: 'Hero con mensaje principal y call-to-action',
    required: true,
    planCompatible: ['rocket', 'galaxy']
  },
  {
    id: 'about',
    name: 'Sobre nosotros',
    description: 'Historia, misión y valores de tu empresa',
    required: false,
    planCompatible: ['rocket', 'galaxy']
  },
  {
    id: 'services',
    name: 'Servicios/Productos',
    description: 'Muestra lo que ofreces a tus clientes',
    required: false,
    planCompatible: ['rocket', 'galaxy']
  },
  {
    id: 'testimonials',
    name: 'Testimonios',
    description: 'Reseñas y opiniones de clientes satisfechos',
    required: false,
    planCompatible: ['rocket', 'galaxy']
  },
  {
    id: 'faq',
    name: 'Preguntas frecuentes',
    description: 'Respuestas a dudas comunes de tus clientes',
    required: false,
    planCompatible: ['rocket', 'galaxy']
  },
  {
    id: 'contact',
    name: 'Contacto',
    description: 'Información de contacto y formulario',
    required: true,
    planCompatible: ['rocket', 'galaxy']
  },
  // Solo para Galaxy
  {
    id: 'portfolio',
    name: 'Portafolio/Galería',
    description: 'Muestra tus trabajos y proyectos realizados',
    required: false,
    planCompatible: ['galaxy']
  },
  {
    id: 'blog',
    name: 'Blog/Noticias',
    description: 'Artículos y noticias de tu industria',
    required: false,
    planCompatible: ['galaxy']
  },
  {
    id: 'custom',
    name: 'Página personalizada',
    description: 'Página adicional con contenido específico',
    required: false,
    planCompatible: ['galaxy']
  }
]

// === CONFIGURACIÓN DE FUNCIONALIDADES ===

export const AVAILABLE_FEATURES: FeatureOption[] = [
  // Funcionalidades básicas (ambos planes)
  {
    id: 'contact-form',
    name: 'Formulario de contacto',
    description: 'Formulario básico para que te contacten',
    type: 'dynamic',
    planCompatible: ['rocket', 'galaxy'],
    category: 'contact'
  },
  {
    id: 'whatsapp-btn',
    name: 'Botón de WhatsApp',
    description: 'Acceso directo para contactar por WhatsApp',
    type: 'static',
    planCompatible: ['rocket', 'galaxy'],
    category: 'contact'
  },
  {
    id: 'social-links',
    name: 'Enlaces a redes sociales',
    description: 'Links a Instagram, Facebook, LinkedIn, etc.',
    type: 'static',
    planCompatible: ['rocket', 'galaxy'],
    category: 'integration'
  },
  {
    id: 'google-maps',
    name: 'Mapa de ubicación',
    description: 'Mapa interactivo con tu ubicación',
    type: 'static',
    planCompatible: ['rocket', 'galaxy'],
    category: 'content'
  },
  {
    id: 'image-gallery',
    name: 'Galería de imágenes',
    description: 'Galería para mostrar fotos de productos/servicios',
    type: 'static',
    planCompatible: ['rocket', 'galaxy'],
    category: 'content'
  },
  {
    id: 'video-embed',
    name: 'Video promocional',
    description: 'Video embebido de YouTube o Vimeo',
    type: 'static',
    planCompatible: ['rocket', 'galaxy'],
    category: 'content'
  },
  {
    id: 'download-btn',
    name: 'Botón de descarga',
    description: 'Descarga de catálogos, PDFs o archivos',
    type: 'static',
    planCompatible: ['rocket', 'galaxy'],
    category: 'interaction'
  },
  {
    id: 'click-to-call',
    name: 'Click para llamar',
    description: 'Botón que permite llamar directamente',
    type: 'static',
    planCompatible: ['rocket', 'galaxy'],
    category: 'contact'
  },
  
  // Funcionalidades avanzadas (solo Galaxy)
  {
    id: 'contact-multiple',
    name: 'Múltiples formularios',
    description: 'Diferentes formularios para distintos propósitos',
    type: 'dynamic',
    planCompatible: ['galaxy'],
    category: 'contact'
  },
  {
    id: 'booking-system',
    name: 'Sistema de citas/reservas',
    description: 'Calendario para agendar citas online',
    type: 'dynamic',
    planCompatible: ['galaxy'],
    category: 'interaction'
  },
  {
    id: 'catalog-display',
    name: 'Catálogo de productos',
    description: 'Listado organizado de productos/servicios',
    type: 'dynamic',
    planCompatible: ['galaxy'],
    category: 'content'
  },
  {
    id: 'search-function',
    name: 'Función de búsqueda',
    description: 'Buscador interno del sitio web',
    type: 'dynamic',
    planCompatible: ['galaxy'],
    category: 'interaction'
  },
  {
    id: 'newsletter',
    name: 'Suscripción a newsletter',
    description: 'Captura de emails para marketing',
    type: 'dynamic',
    planCompatible: ['galaxy'],
    category: 'integration'
  },
  {
    id: 'multi-language',
    name: 'Sitio multiidioma',
    description: 'Versiones en diferentes idiomas',
    type: 'advanced',
    planCompatible: ['galaxy'],
    category: 'integration'
  }
]

// === PREGUNTAS PARA IA DE BRANDING ===

export const BRANDING_QUESTIONS: BrandingQuestion[] = [
  {
    id: 'personality',
    question: '¿Cómo quieres que tu marca se sienta para los clientes?',
    type: 'select',
    options: [
      'Profesional y confiable',
      'Juvenil y dinámico', 
      'Elegante y sofisticado',
      'Amigable y cercano',
      'Innovador y vanguardista'
    ]
  },
  {
    id: 'emotion',
    question: '¿Qué emoción principal quieres evocar?',
    type: 'select',
    options: [
      'Confianza',
      'Emoción',
      'Tranquilidad',
      'Urgencia',
      'Inspiración'
    ]
  },
  {
    id: 'differentiation',
    question: '¿En qué te diferencias de tu competencia?',
    type: 'textarea',
    placeholder: 'Describe brevemente qué te hace único en tu industria...'
  }
]

// === CONFIGURACIÓN DE PASOS OPTIMIZADOS ===

export const OPTIMIZED_STEPS: OptimizedStep[] = [
  {
    id: 1,
    title: 'Información del Negocio',
    subtitle: 'Cuéntanos sobre tu empresa',
    emoji: '🏢',
    estimatedTime: 2,
    category: 'business',
    required: true
  },
  {
    id: 2,
    title: 'Objetivo y Audiencia',
    subtitle: 'Define tu meta y público objetivo',
    emoji: '🎯',
    estimatedTime: 2,
    category: 'goals',
    required: true
  },
  {
    id: 3,
    title: 'Estructura del Sitio',
    subtitle: 'Páginas y funcionalidades principales',
    emoji: '📄',
    estimatedTime: 2,
    category: 'website',
    required: true
  },
  {
    id: 4,
    title: 'Identidad Visual',
    subtitle: 'Colores, estilo y materiales de marca',
    emoji: '🎨',
    estimatedTime: 2,
    category: 'branding',
    required: true
  },
  {
    id: 5,
    title: 'Configuración Técnica',
    subtitle: 'Dominio y contenido existente',
    emoji: '🌐',
    estimatedTime: 1,
    category: 'technical',
    required: true
  },
  {
    id: 6,
    title: 'Confirmación',
    subtitle: 'Revisa y confirma tu información',
    emoji: '✅',
    estimatedTime: 1,
    category: 'confirmation',
    required: true
  }
]

// === FUNCIONES HELPER ===

export function getPagesByPlan(plan: 'rocket' | 'galaxy'): PageOption[] {
  return AVAILABLE_PAGES.filter(page => page.planCompatible.includes(plan))
}

export function getFeaturesByPlan(plan: 'rocket' | 'galaxy'): FeatureOption[] {
  return AVAILABLE_FEATURES.filter(feature => feature.planCompatible.includes(plan))
}

export function getFeaturesByCategory(category: string, plan?: 'rocket' | 'galaxy'): FeatureOption[] {
  let features = AVAILABLE_FEATURES.filter(feature => feature.category === category)
  
  if (plan) {
    features = features.filter(feature => feature.planCompatible.includes(plan))
  }
  
  return features
}

export function getPlanRestrictions(plan: 'rocket' | 'galaxy') {
  const config = {
    rocket: {
      maxPages: 1,
      maxFeatures: 3,
      allowedTypes: ['static', 'dynamic'],
      description: 'Landing page profesional con funcionalidades esenciales'
    },
    galaxy: {
      maxPages: 8,
      maxFeatures: 6,
      allowedTypes: ['static', 'dynamic', 'advanced'],
      description: 'Sitio web completo con funcionalidades avanzadas'
    }
  }
  
  return config[plan]
}

export function validateSelection(plan: 'rocket' | 'galaxy', pages: string[], features: string[]): {
  valid: boolean
  errors: string[]
} {
  const restrictions = getPlanRestrictions(plan)
  const errors: string[] = []
  
  // Validar límite de páginas para Rocket
  if (plan === 'rocket' && pages.length > restrictions.maxPages) {
    errors.push(`El Plan Rocket permite máximo ${restrictions.maxPages} página principal`)
  }
  
  // Validar límite de funcionalidades
  if (features.length > restrictions.maxFeatures) {
    errors.push(`Tu plan permite máximo ${restrictions.maxFeatures} funcionalidades`)
  }
  
  // Validar compatibilidad de páginas
  const validPages = getPagesByPlan(plan).map(p => p.id)
  const invalidPages = pages.filter(page => !validPages.includes(page))
  if (invalidPages.length > 0) {
    errors.push(`Páginas no disponibles en tu plan: ${invalidPages.join(', ')}`)
  }
  
  // Validar compatibilidad de funcionalidades
  const validFeatures = getFeaturesByPlan(plan).map(f => f.id)
  const invalidFeatures = features.filter(feature => !validFeatures.includes(feature))
  if (invalidFeatures.length > 0) {
    errors.push(`Funcionalidades no disponibles en tu plan: ${invalidFeatures.join(', ')}`)
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

// === PROMPT PARA OPENAI ===

export function generateBrandingPrompt(
  businessInfo: any,
  brandingResponses: any
): string {
  return `
Eres un experto en branding y diseño web. Analiza esta información de un cliente y genera recomendaciones específicas:

INFORMACIÓN DEL NEGOCIO:
- Nombre: ${businessInfo.name}
- Industria: ${businessInfo.industry}
- Tamaño: ${businessInfo.size}
- Objetivo principal: ${businessInfo.primaryGoal}
- Audiencia: ${businessInfo.targetAudience}

PREFERENCIAS DEL CLIENTE:
- Personalidad deseada: ${brandingResponses.personality}
- Emoción objetivo: ${brandingResponses.emotion}
- Diferenciación: ${brandingResponses.differentiation}

GENERA RECOMENDACIONES EN ESTE FORMATO JSON:
{
  "brandPersonality": "Descripción de la personalidad de marca recomendada",
  "recommendedColors": [
    {"color": "#hexcode", "name": "Nombre del color", "usage": "Uso recomendado"},
    {"color": "#hexcode", "name": "Nombre del color", "usage": "Uso recomendado"},
    {"color": "#hexcode", "name": "Nombre del color", "usage": "Uso recomendado"}
  ],
  "styleDirection": "Estilo visual recomendado (modern, classic, minimal, bold, elegant, creative)",
  "designElements": ["elemento1", "elemento2", "elemento3"],
  "communicationTone": "Tono de comunicación recomendado",
  "confidence": 0.95
}

Las recomendaciones deben ser específicas para la industria ${businessInfo.industry} y coherentes con el objetivo de ${businessInfo.primaryGoal}.
  `.trim()
}