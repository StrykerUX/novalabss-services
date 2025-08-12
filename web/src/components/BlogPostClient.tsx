'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { BlogPost, BlogPostMeta } from '@/lib/blog';
import ShareButtons from '@/components/ShareButtons';
import ReadingProgress from '@/components/ReadingProgress';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface BlogPostClientProps {
  post: BlogPost;
  prevPost: { slug: string; meta: BlogPostMeta } | null;
  nextPost: { slug: string; meta: BlogPostMeta } | null;
}

export default function BlogPostClient({ post, prevPost, nextPost }: BlogPostClientProps) {
  const [isVisible, setIsVisible] = useState(false);

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
      <ReadingProgress />
      
      <div className="min-h-screen bg-black">
        <Navigation />
        
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-black to-purple-900/40"></div>
          <div className="relative z-10 container mx-auto px-6 pt-32 pb-16">
            <div className={`max-w-4xl mx-auto text-center text-white transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <time 
                dateTime={post.meta.publishedAt}
                className="inline-block bg-white/10 text-white/80 text-sm px-4 py-2 rounded-full mb-8 border border-white/20"
              >
                {new Date(post.meta.publishedAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              
              <h1 className="text-3xl md:text-6xl font-bold mb-8 leading-tight font-space-grotesk">
                {post.meta.title}
              </h1>
              
              <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed max-w-3xl mx-auto">
                {post.meta.excerpt}
              </p>
              
              <div className="flex flex-wrap justify-center gap-3">
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

        {/* Cover Image */}
        {post.meta.coverImage && (
          <div className="relative h-64 md:h-96 w-full overflow-hidden">
            <Image
              src={post.meta.coverImage}
              alt={post.meta.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          </div>
        )}

        {/* Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Share Buttons */}
            <div className="mb-12">
              <ShareButtons
                title={post.meta.title}
                url={typeof window !== 'undefined' ? window.location.href : ''}
              />
            </div>

            {/* Article Content */}
            <article className={`bg-[#1A1A1A] rounded-3xl border border-white/10 p-8 md:p-16 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
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
                    className="group bg-[#1A1A1A] rounded-2xl border border-white/10 p-8 hover:border-white/20 hover:shadow-xl hover:shadow-black/20 transition-all duration-500 hover:-translate-y-1"
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
                    className="group bg-[#1A1A1A] rounded-2xl border border-white/10 p-8 hover:border-white/20 hover:shadow-xl hover:shadow-black/20 transition-all duration-500 hover:-translate-y-1 md:text-right"
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

            {/* Back to Blog */}
            <div className="mt-16 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-3 text-blue-400 hover:text-blue-300 font-medium transition-colors text-lg group"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Volver al blog
              </Link>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}