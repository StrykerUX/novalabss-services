'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/blog';

interface BlogListProps {
  initialPosts: BlogPost[];
  initialTags: string[];
}

export default function BlogList({ initialPosts, initialTags }: BlogListProps) {
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = initialPosts.filter((post) => {
    const matchesTag = selectedTag === '' || post.meta.tags.includes(selectedTag);
    const matchesSearch = 
      post.meta.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.meta.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div>
      {/* Filtros */}
      <div className="mb-12 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Buscar artículos..."
            className="w-full px-6 py-4 bg-[#1A1A1A] border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-white/60 transition-all duration-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedTag('')}
            className={`px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
              selectedTag === ''
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'bg-[#1A1A1A] text-white/80 border border-white/10 hover:bg-white/5 hover:border-white/20'
            }`}
          >
            Todos
          </button>
          {initialTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-[#1A1A1A] text-white/80 border border-white/10 hover:bg-white/5 hover:border-white/20'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Posts */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="group bg-[#1A1A1A] rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 hover:shadow-xl hover:shadow-black/20 transition-all duration-500 hover:-translate-y-2"
          >
            {post.meta.coverImage && (
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={post.meta.coverImage}
                  alt={post.meta.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>
            )}
            
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 font-space-grotesk">
                <Link 
                  href={`/blog/${post.slug}`}
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  {post.meta.title}
                </Link>
              </h2>
              
              <p className="text-white/70 mb-6 line-clamp-3 leading-relaxed">
                {post.meta.excerpt}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {post.meta.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-blue-600/20 text-blue-400 text-xs px-3 py-1 rounded-full border border-blue-400/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm text-white/50">
                <time dateTime={post.meta.publishedAt}>
                  {new Date(post.meta.publishedAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 flex items-center gap-2 group/link"
                >
                  Leer más 
                  <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <div className="mb-4">
            <svg className="w-16 h-16 mx-auto text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <p className="text-white/60 text-lg">
            No se encontraron artículos que coincidan con tu búsqueda.
          </p>
          <p className="text-white/40 text-sm mt-2">
            Intenta con otros términos o explora todos los artículos.
          </p>
        </div>
      )}
    </div>
  );
}