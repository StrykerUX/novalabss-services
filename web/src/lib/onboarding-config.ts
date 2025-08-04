// Configuración de páginas y funcionalidades para planes Rocket y Galaxy

import { PageOption, FeatureOption, BrandingQuestion, OptimizedStep } from '@/types/onboarding'

// === CONFIGURACIÓN DE INDUSTRIAS ===

export const AVAILABLE_INDUSTRIES = [
  'Servicios Profesionales',
  'Retail/Comercio',
  'Alimentación',
  'Salud y Bienestar',
  'Belleza y Cuidado Personal',
  'Educación',
  'Otro'
]

// === CONFIGURACIÓN DE ESTILOS DE MARCA ===

export const BRAND_STYLES = [
  {
    id: 'modern',
    name: 'Moderno',
    emoji: '🚀',
    description: 'Limpio, minimalista, tecnológico'
  },
  {
    id: 'classic',
    name: 'Clásico',
    emoji: '🏛️',
    description: 'Tradicional, elegante, confiable'
  },
  {
    id: 'minimal',
    name: 'Minimalista',
    emoji: '⚪',
    description: 'Simple, espacios blancos, esencial'
  },
  {
    id: 'bold',
    name: 'Audaz',
    emoji: '⚡',
    description: 'Llamativo, colores vibrantes, energético'
  },
  {
    id: 'elegant',
    name: 'Elegante',
    emoji: '💎',
    description: 'Sofisticado, refinado, premium'
  },
  {
    id: 'creative',
    name: 'Creativo',
    emoji: '🎨',
    description: 'Artístico, único, expresivo'
  },
  {
    id: 'natural',
    name: 'Natural',
    emoji: '🌿',
    description: 'Orgánico, cálido, relajante'
  },
  {
    id: 'robust',
    name: 'Robusto',
    emoji: '💪',
    description: 'Fuerte, industrial, confiable'
  }
]

// === CONFIGURACIÓN DE REDES SOCIALES ===

export const SOCIAL_NETWORKS = [
  { id: 'instagram', name: 'Instagram', placeholder: 'https://instagram.com/tu-usuario' },
  { id: 'linkedin', name: 'LinkedIn', placeholder: 'https://linkedin.com/company/tu-empresa' },
  { id: 'youtube', name: 'YouTube', placeholder: 'https://youtube.com/@tu-canal' },
  { id: 'tiktok', name: 'TikTok', placeholder: 'https://tiktok.com/@tu-usuario' },
  { id: 'twitter', name: 'Twitter/X', placeholder: 'https://twitter.com/tu-usuario' },
  { id: 'whatsapp', name: 'WhatsApp Business', placeholder: 'https://wa.me/52...' },
  { id: 'google', name: 'Google My Business', placeholder: 'https://g.page/tu-negocio' },
  { id: 'other', name: 'Otro', placeholder: 'https://...' }
]

// === CONFIGURACIÓN DE PÁGINAS/SECCIONES ===

// Para Plan Rocket (Secciones de página web)
export const ROCKET_SECTIONS: PageOption[] = [
  {
    id: 'hero',
    name: 'Inicio',
    description: 'Sección principal con mensaje y llamada a la acción',
    required: true,
    planCompatible: ['rocket']
  },
  {
    id: 'about',
    name: 'Sobre nosotros',
    description: 'Historia y valores de tu empresa',
    required: false,
    planCompatible: ['rocket']
  },
  {
    id: 'services',
    name: 'Servicios',
    description: 'Los servicios que ofreces',
    required: false,
    planCompatible: ['rocket']
  },
  {
    id: 'products',
    name: 'Productos',
    description: 'Los productos que vendes',
    required: false,
    planCompatible: ['rocket']
  },
  {
    id: 'testimonials',
    name: 'Testimonios',
    description: 'Opiniones de clientes satisfechos',
    required: false,
    planCompatible: ['rocket']
  },
  {
    id: 'faq',
    name: 'FAQs',
    description: 'Preguntas frecuentes',
    required: false,
    planCompatible: ['rocket']
  },
  {
    id: 'contact',
    name: 'Contacto',
    description: 'Información de contacto',
    required: false,
    planCompatible: ['rocket']
  },
  {
    id: 'gallery',
    name: 'Galería',
    description: 'Fotos de productos o trabajos',
    required: false,
    planCompatible: ['rocket']
  }
]

// Para Plan Galaxy (Páginas de sitio web)
export const GALAXY_PAGES: PageOption[] = [
  {
    id: 'home',
    name: 'Inicio',
    description: 'Página principal del sitio',
    required: true,
    planCompatible: ['galaxy']
  },
  {
    id: 'about',
    name: 'Nosotros',
    description: 'Página sobre la empresa',
    required: false,
    planCompatible: ['galaxy']
  },
  {
    id: 'services',
    name: 'Servicios',
    description: 'Página de servicios',
    required: false,
    planCompatible: ['galaxy']
  },
  {
    id: 'products',
    name: 'Productos',
    description: 'Página de productos',
    required: false,
    planCompatible: ['galaxy']
  },
  {
    id: 'contact',
    name: 'Contacto',
    description: 'Página de contacto',
    required: false,
    planCompatible: ['galaxy']
  },
  {
    id: 'gallery',
    name: 'Galería',
    description: 'Galería de fotos',
    required: false,
    planCompatible: ['galaxy']
  },
  {
    id: 'portfolio',
    name: 'Portafolio',
    description: 'Muestra de trabajos realizados',
    required: false,
    planCompatible: ['galaxy']
  }
]

// Función helper para obtener páginas por plan
export const AVAILABLE_PAGES: PageOption[] = [...ROCKET_SECTIONS, ...GALAXY_PAGES]

// === CONFIGURACIÓN DE FUNCIONALIDADES ===

// Solo funcionalidades estáticas para Plan Rocket (máximo 4)
export const ROCKET_FEATURES: FeatureOption[] = [
  {
    id: 'contact-form',
    name: 'Formulario de contacto',
    description: 'Formulario básico para que te contacten',
    type: 'static',
    planCompatible: ['rocket'],
    category: 'contact'
  },
  {
    id: 'whatsapp-btn',
    name: 'Botón de WhatsApp',
    description: 'Acceso directo para contactar por WhatsApp',
    type: 'static',
    planCompatible: ['rocket'],
    category: 'contact'
  },
  {
    id: 'social-links',
    name: 'Redes sociales',
    description: 'Enlaces a tus redes sociales',
    type: 'static',
    planCompatible: ['rocket'],
    category: 'integration'
  },
  {
    id: 'google-maps',
    name: 'Mapa de ubicación',
    description: 'Mapa con tu ubicación',
    type: 'static',
    planCompatible: ['rocket'],
    category: 'content'
  },
  {
    id: 'image-gallery',
    name: 'Galería de imágenes',
    description: 'Galería de fotos de productos/servicios',
    type: 'static',
    planCompatible: ['rocket'],
    category: 'content'
  },
  {
    id: 'video-embed',
    name: 'Video embebido',
    description: 'Video de YouTube o Vimeo',
    type: 'static',
    planCompatible: ['rocket'],
    category: 'content'
  },
  {
    id: 'download-btn',
    name: 'Descarga de recursos',
    description: 'Botón para descargar catálogos o PDFs',
    type: 'static',
    planCompatible: ['rocket'],
    category: 'interaction'
  },
  {
    id: 'click-to-call',
    name: 'Click para llamar',
    description: 'Botón para llamar directamente',
    type: 'static',
    planCompatible: ['rocket'],
    category: 'contact'
  }
]

// Todas las funcionalidades (para Galaxy y compatibilidad)
export const AVAILABLE_FEATURES: FeatureOption[] = [
  ...ROCKET_FEATURES,
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
  }
]

// === PREGUNTAS DE BRANDING (SIN IA) ===

export const BRAND_PERSONALITY_OPTIONS = [
  'Confiable',
  'Innovador',
  'Amigable',
  'Profesional',
  'Creativo',
  'Dinámico',
  'Exclusivo',
  'Accesible'
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
  if (plan === 'rocket') {
    return ROCKET_SECTIONS
  } else {
    return GALAXY_PAGES
  }
}

export function getFeaturesByPlan(plan: 'rocket' | 'galaxy'): FeatureOption[] {
  if (plan === 'rocket') {
    return ROCKET_FEATURES
  } else {
    return AVAILABLE_FEATURES.filter(feature => feature.planCompatible.includes(plan))
  }
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
      minSections: 4,
      maxSections: 7,
      maxFeatures: 4,
      allowedTypes: ['static'],
      description: 'Página web con secciones y funcionalidades estáticas'
    },
    galaxy: {
      minPages: 3,
      maxPages: 6,
      maxFeatures: 6,
      allowedTypes: ['static', 'dynamic'],
      description: 'Sitio web completo con múltiples páginas'
    }
  }
  
  return config[plan]
}

export function validateSelection(plan: 'rocket' | 'galaxy', sections: string[], features: string[]): {
  valid: boolean
  errors: string[]
} {
  const restrictions = getPlanRestrictions(plan)
  const errors: string[] = []
  
  if (plan === 'rocket') {
    // Validar límite de secciones para Rocket
    if (sections.length < restrictions.minSections) {
      errors.push(`El Plan Rocket requiere mínimo ${restrictions.minSections} secciones`)
    }
    if (sections.length > restrictions.maxSections) {
      errors.push(`El Plan Rocket permite máximo ${restrictions.maxSections} secciones`)
    }
  } else {
    // Validar límite de páginas para Galaxy
    if (sections.length < restrictions.minPages) {
      errors.push(`El Plan Galaxy requiere mínimo ${restrictions.minPages} páginas`)
    }
    if (sections.length > restrictions.maxPages) {
      errors.push(`El Plan Galaxy permite máximo ${restrictions.maxPages} páginas`)
    }
  }
  
  // Validar límite de funcionalidades
  if (features.length > restrictions.maxFeatures) {
    errors.push(`Tu plan permite máximo ${restrictions.maxFeatures} funcionalidades`)
  }
  
  // Validar compatibilidad de secciones/páginas
  const validOptions = getPagesByPlan(plan).map(p => p.id)
  const invalidOptions = sections.filter(item => !validOptions.includes(item))
  if (invalidOptions.length > 0) {
    errors.push(`Opciones no disponibles en tu plan: ${invalidOptions.join(', ')}`)
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

