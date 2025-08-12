'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { BlogPost, BlogPostMeta } from '@/lib/blog';
import ShareButtons from '@/components/ShareButtons';
import ReadingProgress from '@/components/ReadingProgress';

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
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-700">
          <div className="container mx-auto px-6 py-16">
            <div className={`max-w-4xl mx-auto text-center text-white transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <time 
                dateTime={post.meta.publishedAt}
                className="inline-block bg-white/20 text-white text-sm px-3 py-1 rounded-full mb-6"
              >
                {new Date(post.meta.publishedAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                {post.meta.title}
              </h1>
              
              <p className="text-xl md:text-2xl opacity-90 mb-8 leading-relaxed">
                {post.meta.excerpt}
              </p>
              
              <div className="flex flex-wrap justify-center gap-2">
                {post.meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-white/20 text-white text-sm px-3 py-1 rounded-full"
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
          <div className="relative h-64 md:h-96 w-full">
            <Image
              src={post.meta.coverImage}
              alt={post.meta.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Share Buttons */}
            <div className="mb-8">
              <ShareButtons
                title={post.meta.title}
                url={typeof window !== 'undefined' ? window.location.href : ''}
              />
            </div>

            {/* Article Content */}
            <article className={`bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown
                  components={{
                    img: ({ src, alt }) => (
                      <img
                        src={src}
                        alt={alt}
                        className="rounded-lg shadow-md w-full h-auto my-8"
                      />
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6 border-l-4 border-blue-600 pl-4">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-10 mb-4">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-700">
                        {children}
                      </ol>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-blue-500 pl-6 py-4 my-8 bg-blue-50 text-gray-800 italic">
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </article>

            {/* Navigation */}
            {(prevPost || nextPost) && (
              <div className="mt-12 grid md:grid-cols-2 gap-6">
                {prevPost && (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                      <span className="text-sm text-gray-500 group-hover:text-blue-600 transition-colors">Anterior</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {prevPost.meta.title}
                    </h3>
                  </Link>
                )}
                
                {nextPost && (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 md:text-right"
                  >
                    <div className="flex items-center justify-end gap-3 mb-2">
                      <span className="text-sm text-gray-500 group-hover:text-blue-600 transition-colors">Siguiente</span>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {nextPost.meta.title}
                    </h3>
                  </Link>
                )}
              </div>
            )}

            {/* Back to Blog */}
            <div className="mt-12 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Volver al blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}