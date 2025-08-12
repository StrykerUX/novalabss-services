import { getAllPosts, getAllTags } from '@/lib/blog';
import BlogList from '@/components/BlogList';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default async function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20"></div>
        <div className="relative z-10 container mx-auto px-6 pt-32 pb-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-space-grotesk">
              Blog de <span className="text-blue-400">NovaLabs</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Descubre estrategias, consejos y tendencias para hacer crecer tu negocio digital
            </p>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 pb-16">
        <BlogList initialPosts={posts} initialTags={tags} />
      </div>
      
      <Footer />
    </div>
  );
}