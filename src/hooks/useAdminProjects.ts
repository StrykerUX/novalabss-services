"use client"

import { useState, useEffect } from 'react'

interface AdminProject {
  id: string
  name: string
  status: string
  progress: number
  currentPhase: string | null
  estimatedDelivery: string | null
  plan: string
  user: {
    id: string
    name: string
    email: string
    role: string
  }
  dates: {
    created: string
    updated: string
  }
  createdAt: string
  updatedAt: string
}

interface ProjectsStats {
  total: number
  en_desarrollo: number
  en_revision: number
  completado: number
  en_actualizacion: number
  en_mantenimiento: number
  currentPage: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

interface AdminProjectsData {
  projects: AdminProject[]
  stats: ProjectsStats
}

interface UseAdminProjectsParams {
  page?: number
  limit?: number
  search?: string
  status?: string
  userId?: string
}

interface UseAdminProjectsReturn {
  data: AdminProjectsData | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  createProject: (projectData: { name: string; userId: string; plan?: string; status?: string }) => Promise<boolean>
  updateProject: (id: string, updates: Partial<AdminProject>) => Promise<boolean>
  deleteProject: (id: string) => Promise<boolean>
  setFilters: (filters: UseAdminProjectsParams) => void
}

export function useAdminProjects(initialParams: UseAdminProjectsParams = {}): UseAdminProjectsReturn {
  const [data, setData] = useState<AdminProjectsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<UseAdminProjectsParams>(initialParams)

  const buildQueryString = (params: UseAdminProjectsParams) => {
    const searchParams = new URLSearchParams()
    
    if (params.page) searchParams.append('page', params.page.toString())
    if (params.limit) searchParams.append('limit', params.limit.toString())
    if (params.search) searchParams.append('search', params.search)
    if (params.status && params.status !== 'all') searchParams.append('status', params.status)
    if (params.userId) searchParams.append('userId', params.userId)
    
    return searchParams.toString()
  }

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)

      const queryString = buildQueryString(filters)
      const url = `/api/admin/projects${queryString ? `?${queryString}` : ''}`

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      console.error('Error fetching admin projects:', err)
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  const createProject = async (projectData: { 
    name: string; 
    userId: string; 
    plan?: string; 
    status?: string 
  }): Promise<boolean> => {
    try {
      setError(null)

      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Error ${response.status}`)
      }

      // Refetch projects after successful creation
      await fetchProjects()
      return true
    } catch (err) {
      console.error('Error creating project:', err)
      setError(err instanceof Error ? err.message : 'Error al crear proyecto')
      return false
    }
  }

  const updateProject = async (id: string, updates: Partial<AdminProject>): Promise<boolean> => {
    try {
      setError(null)

      const response = await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...updates })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Error ${response.status}`)
      }

      // Refetch projects after successful update
      await fetchProjects()
      return true
    } catch (err) {
      console.error('Error updating project:', err)
      setError(err instanceof Error ? err.message : 'Error al actualizar proyecto')
      return false
    }
  }

  const deleteProject = async (id: string): Promise<boolean> => {
    try {
      setError(null)

      const response = await fetch('/api/admin/projects', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Error ${response.status}`)
      }

      // Refetch projects after successful deletion
      await fetchProjects()
      return true
    } catch (err) {
      console.error('Error deleting project:', err)
      setError(err instanceof Error ? err.message : 'Error al eliminar proyecto')
      return false
    }
  }

  const updateFilters = (newFilters: UseAdminProjectsParams) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  useEffect(() => {
    fetchProjects()
  }, [filters])

  return {
    data,
    loading,
    error,
    refetch: fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    setFilters: updateFilters
  }
}