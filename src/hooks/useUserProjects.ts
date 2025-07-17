"use client"

import { useState, useEffect } from 'react'

interface UserProject {
  id: string
  name: string
  status: string
  progress: number
  currentPhase: string | null
  estimatedDelivery: string | null
  plan: string
  createdAt: string
  updatedAt: string
}

interface UseUserProjectsReturn {
  projects: UserProject[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useUserProjects(): UseUserProjectsReturn {
  const [projects, setProjects] = useState<UserProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/user/projects', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      setProjects(result.projects || [])
    } catch (err) {
      console.error('Error fetching user projects:', err)
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects
  }
}