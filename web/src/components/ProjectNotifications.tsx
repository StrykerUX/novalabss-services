"use client"

import { useEffect, useState } from 'react'
import { useUserProjects } from '@/hooks/useUserProjects'

export default function ProjectNotifications() {
  const { projects } = useUserProjects()
  const [newProjects, setNewProjects] = useState<string[]>([])
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    if (projects && projects.length > 0) {
      // Verificar si hay proyectos nuevos (creados en las últimas 24 horas)
      const now = new Date()
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      
      const recentProjects = projects.filter(project => {
        const createdAt = new Date(project.createdAt)
        return createdAt > oneDayAgo
      })

      if (recentProjects.length > 0) {
        const projectNames = recentProjects.map(p => p.name)
        setNewProjects(projectNames)
        setShowNotification(true)
        
        // Auto-hide después de 10 segundos
        setTimeout(() => {
          setShowNotification(false)
        }, 10000)
      }
    }
  }, [projects])

  const handleDismiss = () => {
    setShowNotification(false)
  }

  if (!showNotification || newProjects.length === 0) {
    return null
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-lg shadow-lg border border-green-500/30">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-sm">🎉 ¡Nuevo Proyecto Creado!</h4>
              <p className="text-green-100 text-xs mt-1">
                {newProjects.length === 1 
                  ? `Tu proyecto "${newProjects[0]}" ha sido creado automáticamente.`
                  : `${newProjects.length} nuevos proyectos han sido creados.`
                }
              </p>
              <p className="text-green-200 text-xs mt-1">
                ✅ Pago confirmado - El desarrollo comenzará pronto
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-green-200 hover:text-white transition-colors ml-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}