import { Calendar, ExternalLink, TrendingUp, AlertCircle, Award, Newspaper, Star, Clock, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL, AgentId } from "@/config";
import Head from 'next/head';

interface NewsItem {
  headline: string;
  url: string;
  imageUrl: string;
  summary?: string;
  author?: string | null;
  publishedAt?: string | null;
  rawTimeText?: string;
  source?: string;
}

interface QuickUpdate {
  title: string;
  description: string;
  type: 'info' | 'success' | 'warning';
}

const News = () => {
  const [newsArticles, setNewsArticles] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/NEWS/50`); // Replace with actual API endpoint
        const data = await response.json();
        setNewsArticles(data.data || []);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const formatRawTimeText = (rawTimeText: string) => {
    // Extract just the date part from "Updated: August 13, 2025 15:00 IST"
    if (rawTimeText && rawTimeText.includes(':')) {
      const parts = rawTimeText.split(':');
      if (parts.length > 1) {
        return parts.slice(1).join(':').trim();
      }
    }
    return rawTimeText;
  };

  const getSourceDisplayName = (source: string) => {
    // Extract readable source name from URL
    if (source && source.startsWith('www.')) {
      return source.replace('www.', '').split('.')[0].toUpperCase();
    }
    return source || 'Unknown Source';
  };

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'info': return AlertCircle;
      case 'success': return Award;
      case 'warning': return AlertCircle;
      default: return AlertCircle;
    }
  };

  const getUpdateStyles = (type: string) => {
    switch (type) {
      case 'info':
        return 'bg-gradient-to-r from-blue-50 to-cyan-50 border-l-blue-400 text-blue-700';
      case 'success':
        return 'bg-gradient-to-r from-green-50 to-emerald-50 border-l-green-400 text-green-700';
      case 'warning':
        return 'bg-gradient-to-r from-orange-50 to-amber-50 border-l-orange-400 text-orange-700';
      default:
        return 'bg-gradient-to-r from-gray-50 to-slate-50 border-l-gray-400 text-gray-700';
    }
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, idx) => (
        <Card key={idx} className="overflow-hidden animate-pulse">
          <div className="aspect-video bg-gradient-to-r from-gray-200 to-gray-300"></div>
          <CardHeader className="p-4 pb-2">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>LIC News & Updates — Policies & Announcements</title>
        <meta name="description" content="Latest LIC news, policy updates, and announcements. Stay informed with verified insurance updates and guidelines." />
        <meta name="keywords" content="LIC news, LIC updates, insurance announcements, LIC policy change, LIC circulars, LIC press release" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://lifecodeacademyinnovations.vercel.app/news" />

        {/* Open Graph */}
        <meta property="og:title" content="LIC News & Updates — Policies & Announcements" />
        <meta property="og:description" content="Latest LIC news, policy updates, and announcements for policyholders and agents." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lifecodeacademyinnovations.vercel.app/news" />
        <meta property="og:image" content="https://lifecodeacademyinnovations.vercel.app/og-news.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LIC News & Updates — Policies & Announcements" />
        <meta name="twitter:description" content="Stay updated with the latest LIC policies, circulars, and insurance news." />
        <meta name="twitter:image" content="https://lifecodeacademyinnovations.vercel.app/og-news.jpg" />

        {/* JSON-LD: CollectionPage with sample itemList (replace with real articles) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "LIC News & Updates",
              "url": "https://lifecodeacademyinnovations.vercel.app/news",
              "mainEntity": {
                "@type": "ItemList",
                "itemListElement": [
                  {
                    "@type": "NewsArticle",
                    "headline": "LIC updates premium rates for 2025",
                    "url": "https://lifecodeacademyinnovations.vercel.app/news/lic-updates-premium-rates-2025",
                    "datePublished": "2025-01-10",
                    "description": "Summary of LIC premium changes and what policyholders should know."
                  },
                  {
                    "@type": "NewsArticle",
                    "headline": "New LIC rider introduced for critical illness",
                    "url": "https://lifecodeacademyinnovations.vercel.app/news/lic-critical-illness-rider",
                    "datePublished": "2024-11-08",
                    "description": "Overview of the new rider and eligibility conditions."
                  },
                  {
                    "@type": "NewsArticle",
                    "headline": "LIC digital services expanded for easier claims",
                    "url": "https://lifecodeacademyinnovations.vercel.app/news/lic-digital-claims-update",
                    "datePublished": "2024-08-22",
                    "description": "How LIC has simplified digital claims and what it means for you."
                  }
                ]
              }
            })
          }}
        />
      </Head>


      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium mb-6 backdrop-blur-sm border border-blue-400/30">
              <Star className="w-4 h-4 mr-2" />
              Latest Updates & News
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                LIC News &
              </span>
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Updates
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Stay informed with the latest news, announcements, and developments from
              <span className="text-blue-300 font-semibold"> Life Insurance Corporation of India</span>.
              Get insights on new policies, market trends, and regulatory updates.
            </p>

          </div>
        </div>
      </section>

      {/* Enhanced News Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Latest News
              </h2>
              <p className="text-gray-600 text-lg">Curated updates from trusted sources</p>
            </div>
            <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-full border border-blue-200">
              <Newspaper className="h-5 w-5 text-blue-600" />
              <span className="text-blue-700 font-medium">All Categories</span>
            </div>
          </div>

          {/* News Grid */}
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsArticles.map((article, idx) => (
                <Card
                  key={idx}
                  className="group h-full flex flex-col overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white border-0 shadow-lg"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={article.imageUrl}
                      alt={article.headline}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/400x225/1f2937/ffffff?text=LIC+News';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Badge className="absolute top-4 right-4 bg-blue-600 text-white shadow-lg">
                      {article.source ? getSourceDisplayName(article.source) : 'News'}
                    </Badge>
                  </div>

                  <CardHeader className="flex-grow p-6 pb-4">
                    <CardTitle className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                      {article.headline}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-6 pt-0">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <div className="flex items-center">
                        <Calendar className="inline h-4 w-4 mr-2" />
                        {article.rawTimeText ? formatRawTimeText(article.rawTimeText) :
                          article.publishedAt ? formatDate(article.publishedAt) :
                            formatDate(new Date().toISOString())}
                      </div>
                      {article.author && (
                        <div className="flex items-center">
                          <User className="inline h-4 w-4 mr-1" />
                          <span className="truncate max-w-20">{article.author}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {article.summary || `${article.headline} - Click to read the complete article and stay updated with the latest developments.`}
                    </p>
                  </CardContent>

                  <CardFooter className="p-6 pt-0">
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                        Read Full Article
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {/* Enhanced Empty State */}
          {!isLoading && newsArticles.length === 0 && (
            <div className="text-center py-20">
              <div className="p-4 bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Newspaper className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No news available</h3>
              <p className="text-gray-500 text-lg mb-6">Check back later for the latest updates</p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Refresh Page
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced News Sources */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted News Sources</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We curate news from India's most respected financial and business publications
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {[
              'Economic Times', 'Business Standard', 'Financial Express', 'Mint',
              'Moneycontrol', 'Times of India', 'Hindu Business Line', 'LIC Official'
            ].map((source, index) => (
              <div
                key={source}
                className="group cursor-pointer transform hover:scale-110 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 border border-white/20">
                  <div className="font-bold text-lg text-white group-hover:text-blue-300 transition-colors text-center">
                    {source}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400 text-sm">
              News content is aggregated from multiple sources for comprehensive coverage
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;