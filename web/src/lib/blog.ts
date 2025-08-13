import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content', 'blog');

export interface BlogPostMeta {
  title: string;
  excerpt: string;
  tags: string[];
  publishedAt: string;
  coverImage?: string;
}

export interface BlogPost {
  slug: string;
  meta: BlogPostMeta;
  content: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(contentDirectory);
  const posts = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((name) => {
      const slug = name.replace(/\.md$/, '');
      const fullPath = path.join(contentDirectory, name);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        meta: {
          title: data.title || '',
          excerpt: data.excerpt || '',
          tags: Array.isArray(data.tags) ? data.tags : [],
          publishedAt: data.publishedAt || '',
          coverImage: data.coverImage || undefined,
        },
        content,
      };
    })
    .sort((a, b) => {
      return new Date(b.meta.publishedAt).getTime() - new Date(a.meta.publishedAt).getTime();
    });

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      meta: {
        title: data.title || '',
        excerpt: data.excerpt || '',
        tags: Array.isArray(data.tags) ? data.tags : [],
        publishedAt: data.publishedAt || '',
        coverImage: data.coverImage || undefined,
      },
      content,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  
  posts.forEach((post) => {
    post.meta.tags.forEach((tag) => tagSet.add(tag));
  });
  
  return Array.from(tagSet).sort();
}

export function getAdjacentPosts(currentSlug: string): {
  prevPost: { slug: string; meta: BlogPostMeta } | null;
  nextPost: { slug: string; meta: BlogPostMeta } | null;
} {
  const posts = getAllPosts();
  const currentIndex = posts.findIndex((post) => post.slug === currentSlug);
  
  if (currentIndex === -1) {
    return { prevPost: null, nextPost: null };
  }
  
  return {
    prevPost: currentIndex > 0 ? { slug: posts[currentIndex - 1].slug, meta: posts[currentIndex - 1].meta } : null,
    nextPost: currentIndex < posts.length - 1 ? { slug: posts[currentIndex + 1].slug, meta: posts[currentIndex + 1].meta } : null,
  };
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): { slug: string; meta: BlogPostMeta }[] {
  const posts = getAllPosts();
  const currentPost = posts.find((post) => post.slug === currentSlug);
  
  if (!currentPost) {
    return posts.slice(0, limit).map(post => ({ slug: post.slug, meta: post.meta }));
  }
  
  // Obtener posts que no sean el actual
  const otherPosts = posts.filter((post) => post.slug !== currentSlug);
  
  // Calcular relevancia basada en tags compartidos
  const relatedPosts = otherPosts.map((post) => {
    const sharedTags = post.meta.tags.filter((tag) => 
      currentPost.meta.tags.includes(tag)
    ).length;
    
    return {
      ...post,
      relevanceScore: sharedTags
    };
  });
  
  // Ordenar por relevancia (tags compartidos) y luego por fecha
  relatedPosts.sort((a, b) => {
    if (a.relevanceScore !== b.relevanceScore) {
      return b.relevanceScore - a.relevanceScore;
    }
    return new Date(b.meta.publishedAt).getTime() - new Date(a.meta.publishedAt).getTime();
  });
  
  return relatedPosts.slice(0, limit).map(post => ({ slug: post.slug, meta: post.meta }));
}