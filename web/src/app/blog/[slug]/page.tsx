import { notFound } from 'next/navigation';
import { getPostBySlug, getAdjacentPosts, getRelatedPosts } from '@/lib/blog';
import BlogPostClient from '@/components/BlogPostClient';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  const { prevPost, nextPost } = getAdjacentPosts(slug);
  const relatedPosts = getRelatedPosts(slug, 3);

  return (
    <BlogPostClient 
      post={post}
      prevPost={prevPost}
      nextPost={nextPost}
      relatedPosts={relatedPosts}
    />
  );
}