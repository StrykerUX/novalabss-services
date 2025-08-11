import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  tags: string[];
  published: boolean;
  publishedAt?: Date;
  views: number;
  readTime?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPostMeta {
  title: string;
  excerpt?: string;
  coverImage?: string;
  tags: string[];
  published: boolean;
  publishedAt?: string;
  readTime?: number;
}

const contentDirectory = path.join(process.cwd(), 'content/blog');

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(contentDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''));
}

export function getPostBySlug(slug: string): { meta: BlogPostMeta; content: string; readTime: number } | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Calculate read time (average 200 words per minute)
    const wordCount = content.trim().split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);
    
    return {
      meta: {
        title: data.title || '',
        excerpt: data.excerpt || '',
        coverImage: data.coverImage || '',
        tags: data.tags || [],
        published: data.published || false,
        publishedAt: data.publishedAt || '',
        readTime: data.readTime || readTime,
      },
      content,
      readTime: data.readTime || readTime,
    };
  } catch (error) {
    console.error('Error reading post:', error);
    return null;
  }
}

export function getAllPosts(): Array<{ slug: string; meta: BlogPostMeta; readTime: number }> {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map(slug => {
      const post = getPostBySlug(slug);
      if (post && post.meta.published) {
        return {
          slug,
          meta: post.meta,
          readTime: post.readTime,
        };
      }
      return null;
    })
    .filter(Boolean)
    .sort((a, b) => {
      if (a!.meta.publishedAt && b!.meta.publishedAt) {
        return new Date(b!.meta.publishedAt).getTime() - new Date(a!.meta.publishedAt).getTime();
      }
      return 0;
    });

  return posts as Array<{ slug: string; meta: BlogPostMeta; readTime: number }>;
}

export function getPostsByTag(tag: string): Array<{ slug: string; meta: BlogPostMeta; readTime: number }> {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.meta.tags.includes(tag));
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tags = allPosts.flatMap(post => post.meta.tags);
  return Array.from(new Set(tags));
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function getAdjacentPosts(currentSlug: string): {
  prevPost: { slug: string; meta: BlogPostMeta } | null;
  nextPost: { slug: string; meta: BlogPostMeta } | null;
} {
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex(post => post.slug === currentSlug);
  
  if (currentIndex === -1) {
    return { prevPost: null, nextPost: null };
  }
  
  return {
    prevPost: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
    nextPost: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  };
}