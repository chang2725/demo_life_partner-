import { Calendar, User, ArrowRight, Clock, Tag, BookOpen, TrendingUp, Star, Filter, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL, AgentId } from "@/pages/config";
import Head from 'next/head';


const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Mock data to supplement API data for demo
  const mockBlogPosts = [
    {
      id: 2,
      agentId: 2,
      title: "Understanding Term vs Endowment Plans: Which is Right for You?",
      author: "Priya Sharma",
      category: "Life Insurance",
      excerpt: "Compare term and endowment plans to make an informed decision about your life insurance needs. Learn about coverage, premiums, and benefits.",
      imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      publishedDate: "2025-01-15",
      readTime: "6 min read",
      featured: true
    },
    {
      id: 3,
      agentId: 2,
      title: "Retirement Planning in Your 30s: Start Early, Retire Comfortably",
      author: "Amit Patel",
      category: "Retirement",
      excerpt: "Why starting retirement planning in your 30s can make a massive difference. Explore pension plans and investment strategies for a secure future.",
      imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      publishedDate: "2025-01-18",
      readTime: "8 min read",
      featured: true
    },
    {
      id: 4,
      agentId: 2,
      title: "Child Education Planning: Securing Your Child's Future",
      author: "Sunita Gupta",
      category: "Financial Planning",
      excerpt: "Plan for your child's education expenses with smart financial strategies. Learn about education insurance and investment options.",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      publishedDate: "2025-01-20",
      readTime: "5 min read",
      featured: false
    },
    {
      id: 5,
      agentId: 2,
      title: "ULIP vs Mutual Funds: A Comprehensive Comparison",
      author: "Rajesh Kumar",
      category: "Investment",
      excerpt: "Understand the differences between ULIPs and mutual funds to make the right investment choice for your financial goals.",
      imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      publishedDate: "2025-01-22",
      readTime: "7 min read",
      featured: false
    }
  ];


  const formatFileUrl = (url) => {
    if (!url) return "";

    // Handle Dropbox links
    if (url.includes("dropbox")) {
      return url.replace("dl=0", "raw=1");
    }

    // Handle Google Drive links
    if (url.includes("drive.google.com")) {
      // extract file id
      let id =
        url.match(/\/file\/d\/([^/]+)/)?.[1] ||
        url.match(/\/d\/([^/]+)/)?.[1] ||
        new URL(url).searchParams.get("id");

      if (id) {
        // use export=download — this won’t revert
        return `https://drive.google.com/uc?export=download&id=${id}`;
      }
    }

    // Fallback: return as-is
    return url;
  };


  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/Blog/agent/${AgentId}`);
        if (response.data?.data) {
          setBlogPosts(response.data.data);
        } else {
          console.warn('⚠️ No header slides data received:', response.data);
        }
      } catch (error) {
        console.error('❌ Failed to load blog posts:', error);
        setBlogPosts(mockBlogPosts);
      } finally {
        setIsLoading(false);
      }
    };

    // Simulate loading delay
    const timer = setTimeout(() => {
      fetchBlogPosts();
    }, 1000);

    return () => clearTimeout(timer);
  }, [AgentId]);

  const categories = ['All', 'Life Insurance', 'Tax Planning', 'Financial Planning', 'Investment', 'Retirement', "Wealth Management", 'Others'];
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  const filteredPosts = selectedCategory === 'All'
    ? regularPosts
    : regularPosts.filter(post => post.category === selectedCategory);

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Recent';
    }
  };

  const LoadingSkeleton = ({ featured = false }) => (
    <Card className="overflow-hidden animate-pulse">
      <div className={`bg-gradient-to-r from-gray-200 to-gray-300 ${featured ? 'h-48' : 'h-40'}`}></div>
      <CardHeader>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="flex space-x-4">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
        <div className="h-8 bg-gray-200 rounded w-32"></div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-white">

<Head>
  <title>LIC Insurance Blog — Tips & Insights</title>
  <meta name="description" content="Read expert LIC articles, policy tips, tax insights, and claim guides to make smarter insurance decisions." />
  <meta name="keywords" content="LIC blog, LIC articles, insurance tips, LIC tax benefits, LIC claim guide, LIC policy advice, LIC news, policy insights" />
  <meta name="robots" content="index,follow" />
  <link rel="canonical" href="https://lifecodeacademyinnovations.vercel.app/blog" />

  {/* Open Graph */}
  <meta property="og:title" content="LIC Insurance Blog — Tips & Insights" />
  <meta property="og:description" content="Expert articles on LIC policies, tax benefits, claims, and planning — practical tips for policyholders." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://lifecodeacademyinnovations.vercel.app/blog" />
  <meta property="og:image" content="https://lifecodeacademyinnovations.vercel.app/og-blog.jpg" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="LIC Insurance Blog — Tips & Insights" />
  <meta name="twitter:description" content="Expert LIC articles and practical tips to help you choose and manage policies better." />
  <meta name="twitter:image" content="https://lifecodeacademyinnovations.vercel.app/og-blog.jpg" />

  {/* JSON-LD: Blog (index) */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "LIC Insurance Blog — Rajesh Kumar",
        "url": "https://lifecodeacademyinnovations.vercel.app/blog",
        "description": "Expert articles on LIC policies, tax benefits, claims, riders, and policy management.",
        "publisher": {
          "@type": "Organization",
          "name": "Rajesh Kumar - LIC Agent",
          "logo": { "@type": "ImageObject", "url": "https://lifecodeacademyinnovations.vercel.app/logo.png" }
        }
      })
    }}
  />
</Head>

      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium mb-6 backdrop-blur-sm border border-blue-400/30">
              <BookOpen className="w-4 h-4 mr-2" />
              Expert Financial Insights
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Insurance &
              </span>
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Financial Planning
              </span>
              <span className="block text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                Blog
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Expert insights on life insurance, financial planning, and securing your family's future.
              <span className="text-blue-300 font-semibold block mt-2">Stay updated with the latest trends and tips from your trusted LIC agent.</span>
            </p>
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Latest Articles</h2>
              <p className="text-gray-600 text-lg">Comprehensive guides and insights</p>
            </div>

            <div className="flex items-center space-x-4 bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border border-gray-200">
              <div className="flex items-center space-x-2 text-gray-700">
                <Filter className="h-5 w-5" />
                <span className="font-medium">Filter by:</span>
              </div>
              <select
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium bg-white hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, idx) => (
                <LoadingSkeleton key={idx} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md overflow-hidden bg-white">
                  <div className="relative overflow-hidden">
                    <img
                      src={formatFileUrl(post.imageUrl) || 'LIC.png'}
                      alt={post.title}
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <Badge variant="secondary" className="absolute top-3 left-3 text-xs bg-white/90 text-gray-700 backdrop-blur-sm">
                      {post.category}
                    </Badge>
                  </div>
                  <CardHeader className="pb-4 p-6">
                    <CardTitle className="text-lg font-bold group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-xs text-gray-600 pt-2">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-6" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-6" />
                        <span>{formatDate(post.publishedDate)}</span>
                      </div>

                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 px-6 pb-6">
                    <CardDescription className="line-clamp-3 mb-4 text-gray-600 leading-relaxed">
                      {post.excerpt}
                    </CardDescription>
                    {post.srcUrl && post.srcUrl.trim() !== "" && (
                      <a
                        href={post.srcUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        View More
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredPosts.length === 0 && !isLoading && (
            <div className="text-center py-20">
              <div className="p-4 bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-500 text-lg mb-6">Try selecting a different category</p>
              <Button
                onClick={() => setSelectedCategory('All')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Show All Articles
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What’s Your Plan When Life Doesn’t Go to Plan?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Most people wait until it’s too late to secure their future. But what if you could be <strong>ten steps ahead</strong>—today? Dive into strategies, insights, and timeless truths about protecting what matters most.
            </p>
            <a href="/life-insurance" className="inline-block">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center">
                Start Exploring
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </a>
            <p className="text-blue-200 text-sm mt-4">
              No signup required • Just solid guidance
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Blog;