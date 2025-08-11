"use client";

import Link from 'next/link';

interface PostNavigationProps {
  prevPost: { slug: string; meta: { title: string; coverImage?: string } } | null;
  nextPost: { slug: string; meta: { title: string; coverImage?: string } } | null;
}

export default function PostNavigation({ prevPost, nextPost }: PostNavigationProps) {
  if (!prevPost && !nextPost) {
    return null;
  }

  return (
    <div className="border-t border-white/10 pt-8 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Previous Post */}
        <div className="flex justify-start">
          {prevPost ? (
            <Link 
              href={`/blog/${prevPost.slug}`}
              className="group flex items-center space-x-4 p-6 bg-white/5 hover:bg-white/10 rounded-2xl transition-all duration-300 hover:scale-[1.02] w-full max-w-md"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center group-hover:bg-blue-600/30 transition-colors duration-300">
                  <svg className="w-6 h-6 text-blue-400 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-blue-400 text-sm font-medium mb-1">Artículo anterior</div>
                <h4 className="text-white font-semibold text-sm leading-tight line-clamp-2 group-hover:text-blue-200 transition-colors duration-300">
                  {prevPost.meta.title}
                </h4>
              </div>
            </Link>
          ) : (
            <div className="w-full max-w-md"></div>
          )}
        </div>

        {/* Next Post */}
        <div className="flex justify-end">
          {nextPost ? (
            <Link 
              href={`/blog/${nextPost.slug}`}
              className="group flex items-center space-x-4 p-6 bg-white/5 hover:bg-white/10 rounded-2xl transition-all duration-300 hover:scale-[1.02] w-full max-w-md"
            >
              <div className="flex-1 min-w-0 text-right">
                <div className="text-blue-400 text-sm font-medium mb-1">Siguiente artículo</div>
                <h4 className="text-white font-semibold text-sm leading-tight line-clamp-2 group-hover:text-blue-200 transition-colors duration-300">
                  {nextPost.meta.title}
                </h4>
              </div>
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center group-hover:bg-blue-600/30 transition-colors duration-300">
                  <svg className="w-6 h-6 text-blue-400 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ) : (
            <div className="w-full max-w-md"></div>
          )}
        </div>
      </div>
    </div>
  );
}