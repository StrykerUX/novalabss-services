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
        <div className="relative z-10 w-full max-w-[1780px] mx-auto px-[5%] pt-32 pb-16">
          <div className="text-center mb-12">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black bg-gradient-to-b from-white to-white/10 bg-clip-text text-transparent leading-[100%] tracking-tight mb-6 font-space-grotesk">
              EL LABORATORIO DIGITAL
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Investigación, experimentación e innovación
            </p>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="w-full max-w-[1780px] mx-auto px-[5%] pb-16">
        <BlogList initialPosts={posts} initialTags={tags} />
      </div>
      
      <Footer />
    </div>
  );
}