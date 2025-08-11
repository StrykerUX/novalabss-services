import Link from 'next/link';
import { getAllPosts, getAllTags } from '@/lib/blog';
import BlogClient from '@/components/BlogClient';

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return <BlogClient posts={posts} tags={tags} />;
}