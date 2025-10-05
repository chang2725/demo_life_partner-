import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { API_BASE_URL, AgentId } from "@/config";


import { Menu, X, Shield, Phone, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import axios from 'axios';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = usePathname();
  const [headerSlides, setHeaderSlides] = useState([]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Life Insurance', path: '/lifeInsurance' },
    { name: 'Blog', path: '/blog' },
    { name: 'News', path: '/news' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  // const headerSlides = [
  //   {
  //     title: "🛡️ Secure Your Family's Future",
  //     subtitle: "Get comprehensive life insurance coverage with LIC's trusted policies",
  //     action: "Get Quote",
  //     link: "/contact",
  //     image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  //   },
  //   {
  //     title: "💰 Investment + Insurance",
  //     subtitle: "Grow your wealth while protecting your loved ones with ULIP plans",
  //     action: "Explore Plans",
  //     link: "/life-insurance",
  //     image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  //   },
  //   {
  //     title: "🏠 Tax Benefits up to ₹1.5L",
  //     subtitle: "Save taxes under Section 80C with LIC premium payments",
  //     action: "Learn More",
  //     link: "/faq",
  //     image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  //   }
  // ];

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
    const fetchHeroSection = async () => {
      try {
        console.log('✅ Hero section data fetched:', `${API_BASE_URL}/api/HeroSection/agent/${AgentId}`);
        const response = await axios.get(`${API_BASE_URL}/api/HeroSection/agent/${AgentId}`);
        if (response.data?.data) {
          setHeaderSlides(response.data.data);
        } else {
          console.warn('⚠️ No header slides data received:', response.data);
        }
      } catch (error) {
        console.error('❌ Failed to load hero section data:', error);
        // Optionally, setHeaderSlides([]) here if you want to clear old data on error
      }
    };

    fetchHeroSection();
  }, [AgentId]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location === path;

  return (
    <>
      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-blue-100 py-2'
        : 'bg-white/80 backdrop-blur-md shadow-sm border-b border-blue-100 py-3'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className={`flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-all duration-300 group ${scrolled ? 'scale-95' : ''}`}>
              <div className="relative">
                <Shield className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
                <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-purple-500 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">LIC Agent</span>
                <span className="text-xs text-gray-600">Raththi Saravanan ✨</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`text-sm font-medium transition-all duration-300 hover:text-blue-600 hover:scale-105 relative group ${isActive(item.path)
                    ? 'text-blue-600'
                    : 'text-gray-700'
                    }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full ${isActive(item.path) ? 'w-full' : ''
                    }`}></span>
                </Link>
              ))}
            </nav>

            {/* Contact Button */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="tel:+919901997606" className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-all duration-300 hover:scale-105 group">
                <Phone className="h-4 w-4 group-hover:animate-pulse" />
                <span className="text-sm font-medium">+91 99019 97606</span>
              </a>
              <Button asChild size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                <Link href="/contact">Get Quote ✨</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 hover:scale-105 relative"
            >
              <div className="relative">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                {!isMenuOpen && <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>}
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden animate-fade-in">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-lg border-t border-gray-200 rounded-b-xl shadow-2xl">
                {navItems.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 hover:scale-105 transform ${isActive(item.path)
                      ? 'text-blue-600 bg-gradient-to-r from-blue-50 to-purple-50 shadow-sm'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50'
                      }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: 'fade-in 0.5s ease-out forwards'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      {item.name}
                      <div className="w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </Link>
                ))}
                <div className="px-4 py-3 border-t border-gray-200 mt-4 space-y-4">
                  <a href="tel:+919901997606" className="flex items-center space-x-3 text-blue-600 hover:scale-105 transition-all duration-300 p-2 rounded-lg hover:bg-blue-50">
                    <Phone className="h-5 w-5 animate-pulse" />
                    <span className="font-medium">+91 99019 97606</span>
                  </a>
                  <Button asChild size="sm" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                    <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Get Quote ✨</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Header Slider - Only on Home Page - Below navbar */}
      {location === '/' && (
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <Carousel className="relative z-10" opts={{ loop: true, duration: 30 }}>
            <CarouselContent>
              {headerSlides.map((slide, index) => (
                <CarouselItem key={index}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4 py-8 md:py-12 max-w-7xl mx-auto">
                    <div className="space-y-4 animate-fade-in">
                      <h3 className="text-2xl md:text-4xl font-bold animate-fade-in">
                        {slide.title}
                      </h3>
                      <p className="text-base md:text-lg text-blue-100 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        {slide.subtitle}
                      </p>
                      <Button
                        asChild
                        size="lg"
                        className="bg-white text-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 animate-fade-in"
                        style={{ animationDelay: '0.4s' }}
                      >
                        <Link href={slide.actionLink}>{slide.actionText} ✨</Link>
                      </Button>
                    </div>
                    <div className="relative group">
                      <div className="absolute -inset-4 bg-gradient-to-r from-white/20 to-purple-400/20 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                      </div>
                      <img
                        src={formatFileUrl(slide.imageUrl)}
                        alt={slide.title}
                        className="rounded-2xl shadow-2xl w-full h-64 md:h-80 transform group-hover:scale-105 transition-transform duration-500"
                      />

                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-white/20 border-white/30 text-white hover:bg-white/30" />
            <CarouselNext className="right-4 bg-white/20 border-white/30 text-white hover:bg-white/30" />
          </Carousel>
        </div>
      )}
    </>
  );
};

export default Header;
