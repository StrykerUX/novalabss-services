"use client";

import { useState } from 'react';
import Link from 'next/link';

interface Post {
  slug: string;
  meta: {
    title: string;
    excerpt?: string;
    coverImage?: string;
    tags: string[];
    published: boolean;
    publishedAt?: string;
    readTime?: number;
  };
  readTime: number;
}

interface BlogClientProps {
  posts: Post[];
  tags: string[];
}

export default function BlogClient({ posts, tags }: BlogClientProps) {
  const [selectedTag, setSelectedTag] = useState<string>('');

  const filteredPosts = selectedTag 
    ? posts.filter(post => post.meta.tags.includes(selectedTag))
    : posts;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="py-20">
        <div className="w-full max-w-[1780px] mx-auto px-[5%]">
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-b from-white to-white/10 bg-clip-text text-transparent leading-[100%] tracking-tight mb-6">
              BLOG NOVALABS
            </h1>
            <p className="text-white/80 text-xl leading-relaxed max-w-3xl mx-auto">
              Insights, tips y estrategias para hacer crecer tu negocio online. 
              Aprende todo sobre desarrollo web, marketing digital y presencia digital efectiva.
            </p>
          </div>

          {/* Tags Filter */}
          {tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <button
                onClick={() => setSelectedTag('')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedTag === '' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
              >
                Todos
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedTag === tag 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {/* Posts Grid */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-white/60 text-lg">
                {selectedTag ? `No hay posts en la categoría "${selectedTag}"` : 'No hay posts disponibles'}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Link 
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group"
                >
                  <article className="bg-[#1A1A1A] rounded-3xl overflow-hidden hover:bg-[#202020] transition-all duration-300 h-full flex flex-col">
                    {post.meta.coverImage && (
                      <div className="aspect-video bg-gradient-to-r from-blue-600/20 to-purple-600/20 relative overflow-hidden">
                        <img 
                          src={post.meta.coverImage} 
                          alt={post.meta.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Tags */}
                      {post.meta.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.meta.tags.slice(0, 2).map((tag) => (
                            <span 
                              key={tag}
                              className="px-3 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h2 className="text-white text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                        {post.meta.title}
                      </h2>

                      {/* Excerpt */}
                      {post.meta.excerpt && (
                        <p className="text-white/70 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                          {post.meta.excerpt}
                        </p>
                      )}

                      {/* Meta info */}
                      <div className="flex items-center justify-between text-white/50 text-sm pt-4 border-t border-white/10">
                        <div className="flex items-center space-x-4">
                          {post.meta.publishedAt && (
                            <span>{formatDate(post.meta.publishedAt)}</span>
                          )}
                          {post.readTime && (
                            <span>{post.readTime} min de lectura</span>
                          )}
                        </div>
                        <div className="text-blue-400 group-hover:translate-x-1 transition-transform duration-300">
                          →
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl p-8 lg:p-12 mt-16 text-center border border-blue-600/20">
            <h3 className="text-3xl font-bold text-white mb-4">
              ¿Listo para hacer crecer tu negocio?
            </h3>
            <p className="text-white/80 text-lg mb-6 max-w-2xl mx-auto">
              Nuestros expertos están listos para crear el sitio web que tu negocio necesita
            </p>
            <Link
              href="/#planes"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
            >
              <span>Ver nuestros planes</span>
              <span>🚀</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}