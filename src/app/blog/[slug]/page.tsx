import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllPostSlugs, getAdjacentPosts } from '@/lib/blog';
import ReactMarkdown from 'react-markdown';
import BlogViewTracker from '@/components/BlogViewTracker';
import ShareButtons from '@/components/ShareButtons';
import PostNavigation from '@/components/PostNavigation';
import ReadingProgressBar from '@/components/ReadingProgressBar';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post no encontrado - NovaLabs',
    };
  }

  return {
    title: `${post.meta.title} - NovaLabs Blog`,
    description: post.meta.excerpt || 'Lee nuestro último artículo en el blog de NovaLabs',
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      images: post.meta.coverImage ? [post.meta.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || !post.meta.published) {
    notFound();
  }

  const { prevPost, nextPost } = getAdjacentPosts(slug);
  const currentUrl = `https://novalabss.com/blog/${slug}`;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-black">
      <ReadingProgressBar />
      <BlogViewTracker slug={slug} />
      
      <article className="pt-20 pb-12">
        <div className="w-full max-w-5xl mx-auto px-[5%]">
          {/* Back to Blog */}
          <Link 
            href="/blog"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-8 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
            <span className="ml-2">Volver al blog</span>
          </Link>

          {/* Header Section */}
          <header className="mb-8">
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[110%] tracking-tight mb-6">
              {post.meta.title}
            </h1>

            {/* Excerpt */}
            {post.meta.excerpt && (
              <p className="text-xl text-white/80 leading-relaxed mb-8 max-w-4xl">
                {post.meta.excerpt}
              </p>
            )}

            {/* Tags */}
            {post.meta.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.meta.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-4 py-2 bg-blue-600/20 text-blue-400 text-sm rounded-full font-medium hover:bg-blue-600/30 transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Meta */}
            <div className="flex items-center space-x-6 text-white/60 text-sm border-b border-white/10 pb-6">
              {post.meta.publishedAt && (
                <div className="flex items-center space-x-2">
                  <span>📅</span>
                  <span>{formatDate(post.meta.publishedAt)}</span>
                </div>
              )}
              {post.readTime && (
                <div className="flex items-center space-x-2">
                  <span>⏱️</span>
                  <span>{post.readTime} min de lectura</span>
                </div>
              )}
            </div>
          </header>

          {/* Cover Image */}
          {post.meta.coverImage && (
            <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={post.meta.coverImage} 
                alt={post.meta.title}
                className="w-full h-auto transition-transform duration-700 hover:scale-105"
              />
            </div>
          )}

          {/* Main Content Container */}
          <div className="bg-[#1A1A1A] rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/5 relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
            </div>
            
            <div className="relative z-10">
              {/* Content */}
              <div className="prose prose-lg prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({children}) => (
                      <h1 className="text-4xl font-bold text-white mb-8 mt-12 scroll-mt-24">{children}</h1>
                    ),
                    h2: ({children}) => (
                      <h2 className="text-3xl font-bold text-white mb-6 mt-10 scroll-mt-24 border-b border-white/10 pb-3">{children}</h2>
                    ),
                    h3: ({children}) => (
                      <h3 className="text-2xl font-bold text-white mb-4 mt-8 scroll-mt-24">{children}</h3>
                    ),
                    p: ({children}) => (
                      <p className="text-white/90 leading-relaxed mb-6 text-lg">{children}</p>
                    ),
                    ul: ({children}) => (
                      <ul className="list-none space-y-3 mb-6 text-white/90">{children}</ul>
                    ),
                    ol: ({children}) => (
                      <ol className="list-decimal list-inside space-y-3 mb-6 text-white/90 ml-4">{children}</ol>
                    ),
                    li: ({children}) => (
                      <li className="text-white/90 flex items-start">
                        <span className="text-blue-400 mr-3 mt-1 text-lg">•</span>
                        <span>{children}</span>
                      </li>
                    ),
                    blockquote: ({children}) => (
                      <blockquote className="border-l-4 border-blue-500 pl-8 py-6 bg-blue-500/5 rounded-r-2xl mb-8 text-blue-100 italic text-lg relative">
                        <div className="absolute top-4 left-4 text-blue-400/20 text-6xl leading-none">"</div>
                        <div className="relative z-10">{children}</div>
                      </blockquote>
                    ),
                    code: ({children}) => (
                      <code className="bg-white/10 text-blue-300 px-3 py-1 rounded-lg text-sm font-mono">
                        {children}
                      </code>
                    ),
                    pre: ({children}) => (
                      <pre className="bg-black/50 rounded-2xl p-8 overflow-x-auto mb-8 border border-white/10 relative">
                        {children}
                      </pre>
                    ),
                    a: ({href, children}) => (
                      <a 
                        href={href} 
                        className="text-blue-400 hover:text-blue-300 underline decoration-2 underline-offset-2 transition-all duration-300 hover:decoration-blue-300"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                    strong: ({children}) => (
                      <strong className="text-white font-bold bg-white/5 px-1 py-0.5 rounded">{children}</strong>
                    ),
                    img: ({src, alt}) => (
                      <img 
                        src={src} 
                        alt={alt}
                        className="w-full h-auto transition-transform duration-500 hover:scale-105 rounded-2xl my-10 shadow-xl"
                      />
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              {/* Share Buttons */}
              <ShareButtons 
                title={post.meta.title}
                url={`https://novalabss.com/blog/${slug}`}
                description={post.meta.excerpt}
              />

              {/* Post Navigation */}
              <PostNavigation 
                prevPost={prevPost}
                nextPost={nextPost}
              />
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl p-8 lg:p-12 mt-16 text-center border border-blue-600/20 shadow-xl">
            <h3 className="text-3xl font-bold text-white mb-4">
              ¿Te gustó este artículo?
            </h3>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Si estás listo para llevar tu negocio al siguiente nivel, nosotros podemos ayudarte
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#planes"
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>Ver nuestros planes</span>
                <span>🚀</span>
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center space-x-2 border-2 border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              >
                <span>Leer más artículos</span>
                <span>📚</span>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}