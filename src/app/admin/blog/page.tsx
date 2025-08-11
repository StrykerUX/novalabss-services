"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface BlogStats {
  overview: {
    totalPosts: number;
    totalViews: number;
    avgReadTime: number;
    publishedThisMonth: number;
  };
  tagStats: Record<string, number>;
  popularPosts: Array<{
    title: string;
    slug: string;
    views: number;
    publishedAt: string;
  }>;
  recentPosts: Array<{
    title: string;
    slug: string;
    publishedAt: string;
    tags: string[];
  }>;
}

export default function AdminBlogPage() {
  const [stats, setStats] = useState<BlogStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/blog/stats');
        if (!response.ok) {
          throw new Error('Failed to fetch blog stats');
        }
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching blog stats:', error);
        setError('Error al cargar las estadísticas');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-white/10 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-white/10 rounded-2xl"></div>
            ))}
          </div>
          <div className="h-64 bg-white/10 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <div className="text-red-400 text-lg mb-4">⚠️ {error || 'Error al cargar los datos'}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Blog Analytics</h1>
          <p className="text-white/60">Estadísticas y rendimiento del blog</p>
        </div>
        <div className="flex space-x-3">
          <Link 
            href="/blog"
            target="_blank"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <span>👁️</span>
            <span>Ver Blog</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-red-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📝</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{stats.overview.totalPosts}</div>
              <div className="text-white/60 text-sm">Posts Totales</div>
            </div>
          </div>
          <div className="text-blue-400 text-sm">
            +{stats.overview.publishedThisMonth} este mes
          </div>
        </div>

        <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-red-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">👁️</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{stats.overview.totalViews.toLocaleString()}</div>
              <div className="text-white/60 text-sm">Vistas Totales</div>
            </div>
          </div>
          <div className="text-green-400 text-sm">
            Desde el lanzamiento
          </div>
        </div>

        <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-red-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">⏱️</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{stats.overview.avgReadTime}</div>
              <div className="text-white/60 text-sm">Min. Promedio</div>
            </div>
          </div>
          <div className="text-purple-400 text-sm">
            Tiempo de lectura
          </div>
        </div>

        <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-red-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-600/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🏷️</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{Object.keys(stats.tagStats).length}</div>
              <div className="text-white/60 text-sm">Categorías</div>
            </div>
          </div>
          <div className="text-orange-400 text-sm">
            Temas cubiertos
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Posts Más Populares */}
        <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-red-500/20">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
            <span>🔥</span>
            <span>Posts Más Populares</span>
          </h3>
          <div className="space-y-4">
            {stats.popularPosts.map((post, index) => (
              <div key={post.slug} className="flex items-center space-x-4 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-400 font-bold text-sm">
                  #{index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <Link 
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="text-white hover:text-blue-400 transition-colors block truncate"
                  >
                    {post.title}
                  </Link>
                  <div className="text-white/60 text-sm">
                    {post.views.toLocaleString()} vistas • {formatDate(post.publishedAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Posts Recientes */}
        <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-red-500/20">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
            <span>📅</span>
            <span>Posts Recientes</span>
          </h3>
          <div className="space-y-4">
            {stats.recentPosts.map((post) => (
              <div key={post.slug} className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <Link 
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="text-white hover:text-blue-400 transition-colors block mb-2"
                >
                  {post.title}
                </Link>
                <div className="flex items-center justify-between">
                  <div className="text-white/60 text-sm">
                    {formatDate(post.publishedAt)}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categorías/Tags */}
        <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-red-500/20 lg:col-span-2">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
            <span>🏷️</span>
            <span>Distribución por Categorías</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(stats.tagStats).map(([tag, count]) => (
              <div key={tag} className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">{count}</div>
                <div className="text-white/80 text-sm">{tag}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA para crear nuevo post */}
      <div className="mt-8 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl p-8 text-center border border-blue-600/20">
        <h3 className="text-2xl font-bold text-white mb-4">¿Listo para crear un nuevo post?</h3>
        <p className="text-white/70 mb-6 max-w-2xl mx-auto">
          Recuerda que los posts se crean a través de nuestra conversación. Solo pídeme que escriba un nuevo artículo y lo haré por ti.
        </p>
        <div className="text-blue-400 text-sm">
          💡 Tip: Di algo como "Crea un post sobre [tema]" en nuestro chat
        </div>
      </div>
    </div>
  );
}