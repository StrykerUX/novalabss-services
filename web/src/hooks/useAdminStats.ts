"use client"

import { useState, useEffect } from 'react'

interface AdminStats {
  totalUsers: number
  activeProjects: number
  monthlyRevenue: number
  pendingPayments: number
  activeSubscriptions: number
  userGrowthPercentage: number
}

interface RecentUser {
  id: string
  name: string
  email: string
  role: string
  joinDate: string
  projects: number
  status: string
}

interface RecentProject {
  id: string
  name: string
  client: string
  status: string
  progress: number
  updatedAt: string
}

interface AdminStatsData {
  stats: AdminStats
  recentUsers: RecentUser[]
  recentProjects: RecentProject[]
}

interface UseAdminStatsReturn {
  data: AdminStatsData | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useAdminStats(): UseAdminStatsReturn {
  const [data, setData] = useState<AdminStatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/admin/stats', {
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
      console.error('Error fetching admin stats:', err)
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return {
    data,
    loading,
    error,
    refetch: fetchStats
  }
}