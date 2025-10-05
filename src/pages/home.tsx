
import Link from 'next/link';
import { ArrowRight, Shield, Users, Award, Heart, Phone, CheckCircle, Star, Sparkles, Zap, Send, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { API_BASE_URL, AgentId } from "@/config";
import Head from 'next/head';



const Home = () => {
  const heroAnimation = useScrollAnimation();
  const aboutAnimation = useScrollAnimation();
  const policiesAnimation = useScrollAnimation();
  const contactAnimation = useScrollAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    age: '',
    serviceRequired: '',
    message: '',
    agentId: AgentId, // Assuming agentId is 1 for now — fetch dynamically if needed
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleServiceChange = (value) => {
    setFormData({ ...formData, serviceRequired: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name: formData.fullName,
      phoneNumber: formData.phoneNumber,
      emailId: formData.email,
      serviceRequired: formData.serviceRequired,
      messageText: formData.message,
      agentId: formData.agentId,
      status: "Y"
    };

    try {
      const response = await axios.post(`${API_BASE_URL}api/ContactDetail`, payload);
      console.log('Success:', response.data);
      alert('✅ Your message has been sent successfully!');
      setFormData({
        fullName: '',
        phoneNumber: '',
        email: '',
        age: '',
        serviceRequired: '',
        message: '',
        agentId: formData.agentId, // Keep agentId pre-filled
      });
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Failed to send message. Please check your details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/Testimonial/agent/${AgentId}`);
        if (response.data?.data) {
          setTestimonials(response.data.data);
        } else {
          console.warn('No testimonials data received:', response.data);
        }
      } catch (error) {
        console.error('❌ Failed to load testimonials:', error);
      }
    };

    fetchTestimonials();
  }, [AgentId]);

  // Handle auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Handle visibility for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const goToPrev = () => {
    setCurrentIndex(prev => prev === 0 ? testimonials.length - 1 : prev - 1);
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  };

  const policyCategories = [
    {
      title: 'Term Life Insurance',
      description: 'Pure protection at affordable premiums for your family\'s security',
      icon: Shield,
      color: 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600',
      link: '/life-insurance'
    },
    {
      title: 'Investment Plans',
      description: 'Grow your wealth while securing your future with endowment plans',
      icon: Award,
      color: 'bg-gradient-to-br from-green-50 to-green-100 text-green-600',
      link: '/life-insurance'
    },
    {
      title: 'Pension Plans',
      description: 'Ensure a comfortable retirement with guaranteed income',
      icon: Heart,
      color: 'bg-gradient-to-br from-purple-50 to-purple-100 text-purple-600',
      link: '/life-insurance'
    }
  ];

  const whyChooseUs = [
    { text: 'Fresh & Dedicated', icon: Award },
    { text: 'Certified LIC Agent', icon: CheckCircle },
    { text: '50+ Happy Customers', icon: Users },
    { text: '24/7 Customer Support', icon: Phone }
  ];

  const services = [
    'New Policy Purchase',
    'Policy Review & Analysis',
    'Premium Payment Assistance',
    'Claim Settlement Support',
    'Policy Loan Processing',
    'Financial Planning Consultation',
    'Other Services'
  ];


  const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
    return (
      <Card className="h-full border-0 shadow-md hover:shadow-lg transition-all duration-300 group bg-white/90 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col h-full">
            {/* Quote icon */}
            <div className="text-blue-100 mb-4 group-hover:text-blue-200 transition-colors">
              <Quote className="h-8 w-8" />
            </div>

            {/* Rating */}
            <div className="flex space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < testimonial.rating
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                    }`}
                />
              ))}
            </div>

            {/* Testimonial text */}
            <p className="text-gray-600 mb-6 italic group-hover:text-gray-800 transition-colors">
              "{testimonial.testimonialText}"
            </p>

            {/* Author info */}
            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full w-10 h-10 flex items-center justify-center text-blue-800 font-bold">
                {testimonial.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="ml-3">
                <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {testimonial.name}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                  </svg>
                  {testimonial.location}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="relative overflow-hidden">
      <Head>
        <title>Trusted LIC Agent in Bangalore — Rajesh Kumar</title>
        <meta name="description" content="Get personalised LIC life insurance plans in Bangalore with Rajesh Kumar. Free consultation, claim support & policy reviews. Call now." />
        <meta name="keywords" content="LIC agent Bangalore, Rajesh Kumar LIC agent, life insurance Bangalore, LIC policies Bangalore, term insurance Bangalore, endowment plans LIC, policy renewal Bangalore, claim assistance LIC, LIC advisor Bangalore" />


        {/* Open Graph */}
        <meta property="og:title" content="Trusted LIC Agent in Bangalore — Rajesh Kumar" />
        <meta property="og:description" content="Get personalised LIC life insurance plans in Bangalore with Rajesh Kumar. Free consultation, claim support & policy reviews. Call now." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lifecodeacademyinnovations.vercel.app/" />


        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Trusted LIC Agent in Bangalore — Rajesh Kumar" />
        <meta name="twitter:description" content="Get personalised LIC life insurance plans in Bangalore with Rajesh Kumar. Free consultation, claim support & policy reviews. Call now." />


        {/* Canonical (adjust if this is not the homepage) */}
        <link rel="canonical" href="https://lifecodeacademyinnovations.vercel.app/" />


        {/* JSON-LD LocalBusiness (replace phone/email if desired) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "InsuranceAgency",
            "name": "Rajesh Kumar - LIC Agent",
            "url": "https://lifecodeacademyinnovations.vercel.app/",
            "telephone": "REPLACE_PHONE",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Bangalore",
              "addressRegion": "Karnataka",
              "addressCountry": "IN"
            }
          })
        }} />
      </Head>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-green-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s' }}></div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div ref={heroAnimation.ref} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${heroAnimation.isVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-10'
            }`}>
            <div className="space-y-8">
              <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-4 py-2 text-sm font-medium text-blue-700 mb-4 hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-4 h-4 mr-2" />
                Your Trusted New LIC Agent
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Hi, I'm Raththi Saravanan
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block animate-pulse">
                  Your LIC Advisor ✨
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Dedicated to helping you build a financially secure and fulfilling life. Whether you're planning for your child's education, dreaming of a wealthy retirement, or want lifelong peace of mind — I'm here to make it happen. 🚀
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">My Specializations:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Wealth Creation Planning</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Child Education Planning</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Retire Rich Strategies</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Whole Life & Family Security</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <Link href="/contact">
                    Get Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transform hover:scale-105 transition-all duration-300">
                  <a href="tel:+919901997606">Call Now: 9901 997606</a>
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 rounded-lg bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 hover:scale-105 group">
                    <item.icon className="h-5 w-5 text-blue-600 group-hover:text-purple-600 transition-colors duration-300" />
                    <span className="text-sm font-medium text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <img
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Happy Indian family"
                className="relative rounded-2xl shadow-2xl w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg backdrop-blur-sm bg-white/90 hover:scale-110 transition-transform duration-300">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-green-400 to-green-500 p-2 rounded-full animate-pulse">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Available 7 Days</p>
                    <p className="text-sm text-gray-600">6 AM - 11 PM 📞</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About LIC Section */}
      <section className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={aboutAnimation.ref} className={`text-center mb-12 transition-all duration-1000 ${aboutAnimation.isVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-10'
            }`}>
            <div className="inline-flex items-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-full px-6 py-2 text-sm font-medium text-blue-700 mb-4">
              <Zap className="w-4 h-4 mr-2" />
              Why Choose LIC?
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">India's Most Trusted Insurer 🇮🇳</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Life Insurance Corporation of India - India's largest life insurer with over 65 years of trust
            </p>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${aboutAnimation.isVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-10'
            }`}>
            {[
              {
                icon: Shield,
                title: 'Guaranteed Protection',
                desc: 'Government-backed life insurance with guaranteed claims payment',
                color: 'from-blue-400 to-blue-600'
              },
              {
                icon: Award,
                title: 'Proven Track Record',
                desc: 'Over 290 million policies issued with excellent claim settlement ratio',
                color: 'from-green-400 to-green-600'
              },
              {
                icon: Users,
                title: 'Wide Network',
                desc: 'Present in every district of India with 2000+ branches',
                color: 'from-purple-400 to-purple-600'
              }
            ].map((item, index) => (
              <div key={index} className={`text-center space-y-4 group hover:scale-105 transition-all duration-500 ${aboutAnimation.isVisible ? 'animate-slide-in-left opacity-100' : 'opacity-0 translate-x-10'
                }`} style={{ animationDelay: `${index * 200}ms` }}>
                <div className={`bg-gradient-to-br ${item.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-2xl transition-shadow duration-300 group-hover:rotate-6`}>
                  <item.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Policy Categories */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={policiesAnimation.ref} className={`text-center mb-12 transition-all duration-1000 ${policiesAnimation.isVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-10'
            }`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Policy Categories 📋</h2>
            <p className="text-lg text-gray-600">Find the perfect insurance solution for your needs</p>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${policiesAnimation.isVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-10'
            }`}>
            {policyCategories.map((category, index) => (
              <Card key={index} className={`group hover:shadow-2xl transition-all duration-500 border-0 shadow-md hover:scale-105 hover:-rotate-1 backdrop-blur-sm bg-white/80 ${policiesAnimation.isVisible ? 'animate-slide-in-right opacity-100' : 'opacity-0 translate-x-10'
                }`} style={{ animationDelay: `${index * 200}ms` }}>
                <CardHeader className="text-center">
                  <div className={`w-20 h-20 rounded-full ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                    <category.icon className="h-10 w-10" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors duration-300">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <CardDescription className="text-gray-600">
                    {category.description}
                  </CardDescription>
                  <Button asChild variant="outline" className="group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white group-hover:border-transparent transition-all duration-300 hover:scale-105">
                    <Link href={category.link}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        ref={sectionRef}
        className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-blue-200 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-indigo-200 rounded-full opacity-20 blur-2xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            <div className="inline-flex items-center justify-center bg-blue-100 text-blue-700 px-4 py-1 rounded-full mb-4">
              <Star className="h-4 w-4 mr-2 fill-current" />
              <span className="text-sm font-medium">Trusted by 5,000+ Clients</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real stories from satisfied policyholders across India
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            {[
              { number: '5,000+', label: 'Happy Clients', icon: Users },
              { number: '98%', label: 'Satisfaction Rate', icon: Heart },
              { number: '24/7', label: 'Support Available', icon: Phone }
            ].map((stat, index) => (
              <div key={index} className="flex items-center space-x-3  bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-2xl px-6 py-3 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-xl">
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">{stat.number}</div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          <br />

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>

            {/* Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 w-2 rounded-full transition-colors ${index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Form */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div ref={contactAnimation.ref} className={`text-center mb-8 transition-all duration-1000 ${contactAnimation.isVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-white mb-4">Get Your Free Quote Today 🎯</h2>
            <p className="text-xl text-blue-100">Fill out the form below and we'll get back to you within 24 hours</p>
            <div className="mt-6 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <p className="text-white font-semibold">📞 Call directly: <a href="tel:+919901997606" className="text-yellow-300 hover:text-yellow-200 transition-colors">+91 99019 97606</a></p>
              <p className="text-blue-100 text-sm mt-1">Available: Mon-Sun, 6:00 AM to 11:00 PM</p>
            </div>
          </div>
          <Card className="border-0 shadow-2xl backdrop-blur-sm bg-white/95 hover:bg-white transition-all duration-300 hover:scale-[1.02]">
            <CardContent className="p-8">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <Input value={formData.fullName} onChange={handleChange('fullName')} required placeholder="Enter your full name" />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <Input value={formData.phoneNumber} onChange={handleChange('phoneNumber')} required placeholder="Enter your phone number" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <Input type="email" value={formData.email} onChange={handleChange('email')} required placeholder="Enter your email" />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                    <Input value={formData.age} onChange={handleChange('age')} placeholder="Enter your age" />
                  </div>
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Required</label>
                  <Select onValueChange={handleServiceChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the service you need" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>{service}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <Textarea value={formData.message} onChange={handleChange('message')} required rows={5} placeholder="Tell me about your insurance requirements, questions, or how I can help you..." />
                </div>
                <div className="flex items-start space-x-2">
                  <label htmlFor="consent" className="text-sm text-gray-600">I agree to be contacted regarding LIC policies and services. Your information will be kept confidential. 🔒</label>
                </div>
                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
                  {isSubmitting ? 'Sending...' : <>Send Message <Send className="ml-2 h-5 w-5" /></>}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
