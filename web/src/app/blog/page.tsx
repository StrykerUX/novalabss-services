import { getAllPosts, getAllTags } from '@/lib/blog';
import BlogList from '@/components/BlogList';

export default async function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Blog de <span className="text-blue-600">NovaLabs</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre estrategias, consejos y tendencias para hacer crecer tu negocio digital
          </p>
        </div>
        
        <BlogList initialPosts={posts} initialTags={tags} />
      </div>
    </div>
  );
}