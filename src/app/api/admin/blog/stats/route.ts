import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getAllPosts } from '@/lib/blog';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    // Verificar que el usuario sea admin
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Obtener todos los posts del sistema de archivos
    const posts = getAllPosts();
    
    // Obtener estadísticas de vistas de la base de datos
    const dbPosts = await prisma.blogPost.findMany({
      select: {
        slug: true,
        views: true,
        title: true
      }
    });
    
    // Crear un mapa de vistas por slug
    const viewsMap = dbPosts.reduce((acc: Record<string, number>, post) => {
      acc[post.slug] = post.views;
      return acc;
    }, {});
    
    // Calcular estadísticas básicas
    const totalPosts = posts.length;
    const totalViews = Object.values(viewsMap).reduce((sum, views) => sum + views, 0);
    const avgReadTime = posts.length > 0 
      ? Math.round(posts.reduce((sum, post) => sum + (post.readTime || 0), 0) / posts.length)
      : 0;
    
    // Posts por tag
    const tagStats = posts.reduce((acc: Record<string, number>, post) => {
      post.meta.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});
    
    // Posts más populares (los que más vistas tienen)
    const popularPosts = posts
      .sort((a, b) => (viewsMap[b.slug] || 0) - (viewsMap[a.slug] || 0))
      .slice(0, 5)
      .map(post => ({
        title: post.meta.title,
        slug: post.slug,
        views: viewsMap[post.slug] || 0,
        publishedAt: post.meta.publishedAt
      }));
    
    // Posts recientes
    const recentPosts = posts
      .sort((a, b) => {
        if (!a.meta.publishedAt || !b.meta.publishedAt) return 0;
        return new Date(b.meta.publishedAt).getTime() - new Date(a.meta.publishedAt).getTime();
      })
      .slice(0, 5)
      .map(post => ({
        title: post.meta.title,
        slug: post.slug,
        publishedAt: post.meta.publishedAt,
        tags: post.meta.tags
      }));

    const stats = {
      overview: {
        totalPosts,
        totalViews,
        avgReadTime,
        publishedThisMonth: posts.filter(post => {
          if (!post.meta.publishedAt) return false;
          const publishedDate = new Date(post.meta.publishedAt);
          const now = new Date();
          return publishedDate.getMonth() === now.getMonth() && 
                 publishedDate.getFullYear() === now.getFullYear();
        }).length
      },
      tagStats,
      popularPosts,
      recentPosts
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching blog stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}