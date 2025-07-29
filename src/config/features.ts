/**
 * Feature flags para controlar funcionalidades de NovaLabs
 * 
 * Estas flags permiten habilitar/deshabilitar funcionalidades sin
 * necesidad de eliminar código, facilitando el deployment gradual
 * y rollbacks rápidos.
 * 
 * 🔥 FORCE REBUILD - Deploy timestamp: 2025-07-29
 */

export const FEATURES = {
  /**
   * Habilita pricing internacional con múltiples regiones
   * 
   * false = Solo México disponible
   * true = México, LATAM, USA, Internacional disponibles
   * 
   * @default false - Solo México mientras preparamos expansión internacional
   */
  INTERNATIONAL_PRICING: false,

  /**
   * Futuras features que pueden necesitar control:
   * 
   * AI_BRANDING_ANALYSIS: true,     // Análisis de branding con IA
   * ADVANCED_ANALYTICS: false,      // Analytics avanzados 
   * MULTI_LANGUAGE: false,          // Soporte multiidioma
   * ENTERPRISE_FEATURES: false,     // Features empresariales
   */
} as const

/**
 * Tipos TypeScript para autocompletado y type safety
 */
export type FeatureKey = keyof typeof FEATURES
export type FeatureConfig = typeof FEATURES

/**
 * Helper function para verificar si una feature está habilitada
 */
export function isFeatureEnabled(feature: FeatureKey): boolean {
  return FEATURES[feature] === true
}

/**
 * Helper function para obtener configuración de features
 */
export function getFeatureConfig(): FeatureConfig {
  return FEATURES
}