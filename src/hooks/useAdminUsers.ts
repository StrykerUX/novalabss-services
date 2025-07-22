"use client"

import { useState, useEffect } from 'react'

interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  plan: string
  status: string
  subscriptionStatus: string
  joinDate: string
  lastLogin: string
  projects: number
  projectsList: any[]
  subscription: any
  createdAt: string
  updatedAt: string
}

interface UsersStats {
  total: number
  active: number
  pending: number
  suspended: number
  currentPage: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

interface AdminUsersData {
  users: AdminUser[]
  stats: UsersStats
}

interface UseAdminUsersParams {
  page?: number
  limit?: number
  search?: string
  status?: string
  role?: string
}

interface UseAdminUsersReturn {
  data: AdminUsersData | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  createUser: (userData: { name: string; email: string; role?: string }) => Promise<boolean>
  setFilters: (filters: UseAdminUsersParams) => void
}

export function useAdminUsers(initialParams: UseAdminUsersParams = {}): UseAdminUsersReturn {
  const [data, setData] = useState<AdminUsersData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<UseAdminUsersParams>(initialParams)

  const buildQueryString = (params: UseAdminUsersParams) => {
    const searchParams = new URLSearchParams()
    
    if (params.page) searchParams.append('page', params.page.toString())
    if (params.limit) searchParams.append('limit', params.limit.toString())
    if (params.search) searchParams.append('search', params.search)
    if (params.status && params.status !== 'all') searchParams.append('status', params.status)
    if (params.role && params.role !== 'all') searchParams.append('role', params.role)
    
    return searchParams.toString()
  }

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)

      const queryString = buildQueryString(filters)
      const url = `/api/admin/users${queryString ? `?${queryString}` : ''}`

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
      console.error('Error fetching admin users:', err)
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  const createUser = async (userData: { name: string; email: string; role?: string }): Promise<boolean> => {
    try {
      setError(null)

      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Error ${response.status}`)
      }

      // Refetch users after successful creation
      await fetchUsers()
      return true
    } catch (err) {
      console.error('Error creating user:', err)
      setError(err instanceof Error ? err.message : 'Error al crear usuario')
      return false
    }
  }

  const updateFilters = (newFilters: UseAdminUsersParams) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  useEffect(() => {
    fetchUsers()
  }, [filters])

  return {
    data,
    loading,
    error,
    refetch: fetchUsers,
    createUser,
    setFilters: updateFilters
  }
}