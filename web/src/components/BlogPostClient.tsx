'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { BlogPost, BlogPostMeta } from '@/lib/blog';
import FloatingActions from '@/components/FloatingActions';
import Footer from '@/components/Footer';
import SmoothMagneticButton from '@/components/SmoothMagneticButton';
import { usePageTransition } from '@/hooks/usePageTransition';

interface BlogPostClientProps {
  post: BlogPost;
  prevPost: { slug: string; meta: BlogPostMeta } | null;
  nextPost: { slug: string; meta: BlogPostMeta } | null;
}

export default function BlogPostClient({ post, prevPost, nextPost }: BlogPostClientProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { navigateWithTransition } = usePageTransition();

  useEffect(() => {
    setIsVisible(true);
    
    const trackView = async () => {
      try {
        await fetch('/api/blog/track-view', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slug: post.slug }),
        });
      } catch (error) {
        console.error('Error tracking view:', error);
      }
    };

    trackView();
  }, [post.slug]);

  return (
    <>
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(1,71,255,0.3)_0%,rgba(0,0,0,0.8)_40%,black_100%)]"></div>
          <div className="relative z-10 w-full max-w-[1780px] mx-auto px-[5%] pt-24 pb-16">
            <div className={`max-w-4xl mx-auto text-left text-white transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {/* Botón Regresar */}
              <button
                onClick={() => navigateWithTransition('/blog')}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-500 font-medium transition-colors text-lg group mb-8"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Regresar
              </button>

              <h1 className="text-3xl md:text-6xl font-bold mb-8 leading-tight font-space-grotesk">
                {post.meta.title}
              </h1>
              
              <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed">
                {post.meta.excerpt}
              </p>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pb-4">
                <time 
                  dateTime={post.meta.publishedAt}
                  className="bg-white/10 text-white/80 text-sm px-4 py-2 rounded-full border border-white/20 w-fit"
                >
                  {new Date(post.meta.publishedAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                
                <div className="flex flex-wrap gap-3">
                  {post.meta.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-blue-600/20 text-blue-400 text-sm px-4 py-2 rounded-full border border-blue-400/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        {post.meta.coverImage && (
          <div className="w-full max-w-[1780px] mx-auto px-[5%] mb-16">
            <div className="max-w-4xl mx-auto">
              <div className="relative h-64 md:h-96 w-full overflow-hidden" style={{borderRadius: '48px'}}>
                <Image
                  src={post.meta.coverImage}
                  alt={post.meta.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" style={{borderRadius: '48px'}}></div>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="w-full max-w-[1780px] mx-auto px-[5%] pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Article Content */}
            <article className={`bg-[#1A1A1A] border border-white/10 p-8 md:p-16 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{borderRadius: '48px'}}>
              <div className="prose prose-lg max-w-none prose-invert">
                <ReactMarkdown
                  components={{
                    img: ({ src, alt }) => (
                      <img
                        src={src}
                        alt={alt}
                        className="w-full h-auto rounded-2xl shadow-2xl my-12"
                      />
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl md:text-4xl font-bold text-white mt-16 mb-8 border-l-4 border-blue-400 pl-6 font-space-grotesk">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl md:text-3xl font-bold text-white mt-12 mb-6 font-space-grotesk">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-white/80 leading-relaxed mb-8 text-lg">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-none space-y-3 mb-8 text-white/80">
                        {children}
                      </ul>
                    ),
                    li: ({ children }) => (
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></span>
                        <span>{children}</span>
                      </li>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside space-y-3 mb-8 text-white/80 pl-4">
                        {children}
                      </ol>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-blue-400 pl-8 py-6 my-12 bg-blue-600/10 rounded-r-2xl text-white/90 italic text-xl">
                        {children}
                      </blockquote>
                    ),
                    strong: ({ children }) => (
                      <strong className="text-white font-semibold">{children}</strong>
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </article>

            {/* Navigation */}
            {(prevPost || nextPost) && (
              <div className="mt-16 grid md:grid-cols-2 gap-8">
                {prevPost && (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className="group bg-[#1A1A1A] border border-white/10 p-8 hover:border-white/20 hover:shadow-xl hover:shadow-black/20 transition-all duration-500 hover:-translate-y-1"
                    style={{borderRadius: '48px'}}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <svg className="w-5 h-5 text-white/40 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                      <span className="text-sm text-white/60 group-hover:text-blue-400 transition-colors">Anterior</span>
                    </div>
                    <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors font-space-grotesk text-lg">
                      {prevPost.meta.title}
                    </h3>
                  </Link>
                )}
                
                {nextPost && (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="group bg-[#1A1A1A] border border-white/10 p-8 hover:border-white/20 hover:shadow-xl hover:shadow-black/20 transition-all duration-500 hover:-translate-y-1 md:text-right"
                    style={{borderRadius: '48px'}}
                  >
                    <div className="flex items-center justify-end gap-3 mb-4">
                      <span className="text-sm text-white/60 group-hover:text-blue-400 transition-colors">Siguiente</span>
                      <svg className="w-5 h-5 text-white/40 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors font-space-grotesk text-lg">
                      {nextPost.meta.title}
                    </h3>
                  </Link>
                )}
              </div>
            )}

            {/* CTA Card */}
            <div className="mt-16">
              <div className="bg-gradient-to-br from-blue-600/20 via-blue-800/10 to-transparent border border-blue-400/20 p-8 md:p-12 text-center" style={{borderRadius: '48px'}}>
                <div className="max-w-2xl mx-auto">
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 rounded-full mb-4">
                      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-space-grotesk">
                      ¿Te gustó este contenido?
                    </h3>
                    <p className="text-lg text-white/80 mb-8 leading-relaxed">
                      Descubre cómo podemos ayudarte a materializar tus ideas digitales con nuestros planes de desarrollo web profesional.
                    </p>
                  </div>
                  
                  <SmoothMagneticButton 
                    onClick={() => navigateWithTransition('/planes')}
                    className="text-white px-8 py-4 font-space-grotesk font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-shadow duration-300 shadow-xl shadow-blue-600/30 flex items-center justify-center space-x-3 mx-auto w-fit"
                    magneticStrength={0.2}
                  >
                    <span>🚀 Ver Planes</span>
                    <svg 
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </SmoothMagneticButton>
                </div>
              </div>
            </div>

            {/* Related Posts */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-white mb-8 font-space-grotesk">
                Artículos relacionados
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {/* Placeholder para posts relacionados */}
                {[1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className="group bg-[#1A1A1A] border border-white/10 overflow-hidden hover:border-white/20 hover:shadow-xl hover:shadow-black/20 transition-all duration-500 hover:-translate-y-1 opacity-50"
                    style={{borderRadius: '48px'}}
                  >
                    <div className="relative h-32 w-full overflow-hidden bg-gradient-to-br from-blue-600/20 to-purple-600/20">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h4 className="text-sm font-semibold text-white/60 mb-2 line-clamp-2 font-space-grotesk">
                        Próximo artículo {index}
                      </h4>
                      <p className="text-xs text-white/40 mb-3 line-clamp-2">
                        Contenido relacionado que complementará esta lectura...
                      </p>
                      <div className="flex items-center gap-2 text-xs text-white/30">
                        <span>Próximamente</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Back to Blog */}
            <div className="mt-8 text-center">
              <button
                onClick={() => navigateWithTransition('/blog')}
                className="inline-flex items-center gap-3 text-blue-600 hover:text-blue-500 font-medium transition-colors text-lg group"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Volver al blog
              </button>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
      
      {/* Floating Actions */}
      <FloatingActions
        title={post.meta.title}
        url={typeof window !== 'undefined' ? window.location.href : ''}
      />
    </>
  );
}