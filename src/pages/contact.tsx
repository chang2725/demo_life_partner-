import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle, Sparkles, Heart, Zap, Shield, Users, Award, TrendingUp, Star, Calendar, BadgeCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { API_BASE_URL, AgentId } from "@/config";
import Head from 'next/head';

const Contact = () => {
  const contactAnimation = useScrollAnimation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('form');

  // Refs for auto-focus
  const fullNameRef = useRef(null);
  const formSectionRef = useRef(null);
  const hasFocused = useRef(false);

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Numbers',
      details: ['+91 73377 36767', '+91 99019 97606'],
      description: 'Available 9 AM - 8 PM (Mon-Sat)',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      gradient: 'from-blue-400 to-blue-600',
      action: 'tel:+9901997606',
      action2: 'tel:+917337736767',
    },
    {
      icon: Mail,
      title: 'Email Address',
      details: ['mailmerathi.saravanan@gmail.com'],
      description: 'Response within 24 hours',
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      gradient: 'from-green-400 to-green-600',
      action: 'mailto:mailmerathi.saravanan@gmail.com',
    },
    {
      icon: MapPin,
      title: 'Office Address',
      details: ['Siddartha Sapphire', 'Kudlu Main Road', 'Bangalore - 560068'],
      description: 'Visit by appointment',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      gradient: 'from-purple-400 to-purple-600',
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon-Fri: 9:00 AM - 7:00 PM', 'Saturday: 9:00 AM - 5:00 PM', 'Sunday: By Appointment'],
      description: 'Emergency support available',
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      gradient: 'from-orange-400 to-orange-600',
    }
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

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    age: '',
    serviceRequired: '',
    message: '',
    agentId: AgentId,
  });

  // Auto-focus effect
  useEffect(() => {
    const focusForm = () => {
      if (!hasFocused.current && fullNameRef.current) {
        // Scroll to form section smoothly
        formSectionRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });

        // Focus on the first input field after a small delay
        setTimeout(() => {
          if (fullNameRef.current) {
            fullNameRef.current.focus();
            hasFocused.current = true;
          }
        }, 800);
      }
    };

    // Focus on form after component mounts
    const timer = setTimeout(focusForm, 500);

    return () => clearTimeout(timer);
  }, []);

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
        agentId: formData.agentId,
      });
      // Refocus after successful submission
      if (fullNameRef.current) {
        fullNameRef.current.focus();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Failed to send message. Please check your details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whyChooseMe = [
    {
      title: '15+ Years Experience',
      description: 'Extensive expertise in LIC products and financial planning with proven track record',
      icon: <Award className="h-6 w-6 text-yellow-600" />,
      stat: '500+'
    },
    {
      title: 'Personal Attention',
      description: 'Dedicated one-on-one support throughout your policy journey and beyond',
      icon: <Users className="h-6 w-6 text-blue-600" />,
      stat: '98%'
    },
    {
      title: 'Quick Response',
      description: 'Fast turnaround on queries, policy processing and claim settlements',
      icon: <Zap className="h-6 w-6 text-orange-600" />,
      stat: '<2h'
    },
    {
      title: 'Transparent Advice',
      description: 'Honest recommendations based on your actual needs and financial goals',
      icon: <Shield className="h-6 w-6 text-green-600" />,
      stat: '100%'
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
    ));
  };

  return (
    <div className="relative overflow-hidden">
      <Head>
        <title>Contact Rajesh Kumar — LIC Agent Bangalore | Get Expert Insurance Guidance</title>
        <meta name="description" content="Connect with Rajesh Kumar, experienced LIC agent in Bangalore. Get personalized policy advice, claims support, and free consultations. Secure your family's future today." />
        <meta name="keywords" content="contact LIC agent Bangalore, LIC consultation, Rajesh Kumar LIC, policy advisor, insurance help Bangalore, free LIC consultation" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://lifecodeacademyinnovations.vercel.app/contact" />

        {/* Open Graph */}
        <meta property="og:title" content="Contact Rajesh Kumar — Expert LIC Agent Bangalore" />
        <meta property="og:description" content="Get personalized LIC policy guidance, claims assistance, and financial planning. 15+ years experience. Free consultation available." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lifecodeacademyinnovations.vercel.app/contact" />
        <meta property="og:image" content="https://lifecodeacademyinnovations.vercel.app/og-contact.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Rajesh Kumar — LIC Agent Bangalore" />
        <meta name="twitter:description" content="Expert LIC policy guidance and claims assistance. Free consultation available. Connect today!" />
        <meta name="twitter:image" content="https://lifecodeacademyinnovations.vercel.app/og-contact.jpg" />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "InsuranceAgency",
              "name": "Rajesh Kumar - LIC Agent",
              "description": "Experienced LIC agent providing personalized insurance solutions in Bangalore",
              "url": "https://lifecodeacademyinnovations.vercel.app/",
              "telephone": "+91-9901997606",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Siddartha Sapphire, Kudlu Main Road",
                "addressLocality": "Bangalore",
                "addressRegion": "Karnataka",
                "postalCode": "560068",
                "addressCountry": "IN"
              },
              "openingHours": "Mo-Fr 09:00-19:00, Sa 09:00-17:00",
              "areaServed": "Bangalore and surrounding areas",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "LIC Services",
                "itemListElement": services.map(service => ({
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": service
                  }
                }))
              }
            })
          }}
        />
      </Head>

      {/* Enhanced Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-green-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-60 left-1/2 w-24 h-24 bg-orange-200 rounded-full opacity-15 animate-float" style={{ animationDelay: '1.5s' }}></div>

      {/* Enhanced Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80')] opacity-5 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex mt-2 items-center bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-3 text-sm font-semibold text-blue-700 mb-8 hover:scale-105 transition-transform duration-300 shadow-lg border border-white/50">
              <Heart className="w-5 h-5 mr-2 animate-pulse" />
              Let's Connect & Secure Your Future Together
            </div>

            <h1 className="text-2xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Get Expert LIC Guidance ✨
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
              Ready to secure your family's future? I'm here to provide personalized insurance solutions,
              policy reviews, and expert advice to help you make informed financial decisions. 🚀
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                { icon: <BadgeCheck className="h-5 w-5" />, text: "Certified LIC Agent" },
                { icon: <Users className="h-5 w-5" />, text: "500+ Happy Clients" },
                { icon: <Award className="h-5 w-5" />, text: "15+ Years Experience" },
                { icon: <Shield className="h-5 w-5" />, text: "Trusted Advisor" }
              ].map((badge, index) => (
                <div key={index} className="flex items-center gap-2 bg-white/80 rounded-full px-3 py-1.5 shadow-lg border border-gray-100">
                  <div className="text-blue-600">{badge.icon}</div>
                  <span className="text-sm font-medium text-gray-700">{badge.text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button
                onClick={() => {
                  formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  setTimeout(() => fullNameRef.current?.focus(), 600);
                }}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-2xl text-lg px-6 py-4 rounded-2xl"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Start Your Consultation
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 text-lg px-6 py-4 rounded-2xl">
                <a href="tel:+919901997606">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: +91 99019 97606
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Main Contact Section with Auto-Focus */}
      <section
        id="contact-form"
        ref={formSectionRef}
        className="bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden scroll-mt-20"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80')] opacity-5 bg-cover bg-center"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Enhanced Section Header with Focus Indicator */}
          <div className="text-center m-5">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full px-6 py-3 text-sm font-semibold shadow-lg animate-pulse">
              <Sparkles className="w-4 h-4 mr-2" />
              Quick Start - Form Ready for You!
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
            {/* Left: Enhanced Contact Form & Map - Focus Target */}
            <div className="xl:col-span-2 space-y-8">
              {/* Enhanced Contact Form with Auto-Focus */}
              <Card className="border-0 shadow-2xl backdrop-blur-sm bg-white/95 overflow-hidden border-2 border-blue-200">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center relative">
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full"></div>
                  <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3">
                    <Send className="h-8 w-8" />
                    Quick Start Form
                    <Sparkles className="h-8 w-8 text-yellow-300" />
                  </CardTitle>
                  <CardDescription className="text-blue-100 text-lg">
                    <span className="font-semibold">Start typing below</span> - form is ready for your details
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                          Full Name *
                          <span className="text-green-500 text-xs">✓ Ready</span>
                        </label>
                        <Input
                          ref={fullNameRef}
                          value={formData.fullName}
                          onChange={handleChange('fullName')}
                          required
                          placeholder="Enter your full name"
                          className="border-2 border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 h-12 rounded-xl text-lg"
                          autoComplete="name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Phone Number *</label>
                        <Input
                          value={formData.phoneNumber}
                          onChange={handleChange('phoneNumber')}
                          required
                          placeholder="Enter your phone number"
                          className="border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 h-12 rounded-xl text-lg"
                          autoComplete="tel"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Email Address *</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={handleChange('email')}
                          required
                          placeholder="Enter your email"
                          className="border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 h-12 rounded-xl text-lg"
                          autoComplete="email"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Age</label>
                        <Input
                          value={formData.age}
                          onChange={handleChange('age')}
                          placeholder="Enter your age"
                          className="border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 h-12 rounded-xl text-lg"
                          autoComplete="off"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Service Required</label>
                      <Select onValueChange={handleServiceChange}>
                        <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-colors duration-300 h-12 rounded-xl text-lg">
                          <SelectValue placeholder="Select the service you need" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service} value={service} className="text-lg py-3">{service}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Message *</label>
                      <Textarea
                        value={formData.message}
                        onChange={handleChange('message')}
                        required
                        rows={6}
                        placeholder="Tell me about your insurance requirements, financial goals, or any questions you have..."
                        className="border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-colors duration-300 rounded-xl resize-none text-lg"
                        autoComplete="off"
                      />
                    </div>

                    <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <label htmlFor="consent" className="text-sm text-gray-700">
                        I agree to be contacted regarding LIC policies and services. Your information will be kept confidential and secure. 🔒
                      </label>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl text-lg h-14 rounded-xl font-bold"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending Your Message...
                        </>
                      ) : (
                        <>
                          Send Message & Get Free Consultation
                          <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right: Enhanced Why Choose Me */}
            <div className="xl:col-span-1 space-y-8">
              <Card className="border-0 shadow-2xl hover:scale-[1.02] transition-transform duration-500 backdrop-blur-sm bg-white/95 overflow-hidden">
                <CardHeader className="text-center pb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <Zap className="h-8 w-8 text-yellow-300 animate-pulse" />
                    <CardTitle className="text-2xl font-bold">
                      Why Choose Me?
                    </CardTitle>
                    <Zap className="h-8 w-8 text-yellow-300 animate-pulse" />
                  </div>
                  <CardDescription className="text-blue-100 text-lg">
                    Expertise That Delivers Exceptional Results
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  {whyChooseMe.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-r from-blue-50/80 to-purple-50/80 hover:from-blue-100/80 hover:to-purple-100/80 transition-all duration-300 hover:scale-[1.02] group border border-white/50"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          {item.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 text-lg">
                            {item.title}
                          </h4>
                          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            {item.stat}
                          </span>
                        </div>
                        <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Map & Service Hours Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Office Location Card - Enhanced */}
            <Card className="border-0 shadow-2xl overflow-hidden hover:scale-[1.02] transition-all duration-500 group backdrop-blur-sm bg-white/95">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center pb-4">
                <CardTitle className="text-2xl font-bold flex items-center justify-center gap-3">
                  <MapPin className="h-6 w-6" />
                  Office Location
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </CardTitle>
                <CardDescription className="text-blue-100 text-lg">
                  Visit us for personalized consultation
                </CardDescription>
              </CardHeader>
              <div className="h-80 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 group-hover:from-blue-400/20 group-hover:via-purple-400/20 group-hover:to-pink-400/20 transition-all duration-500" />

                {/* Map Content */}
                <div className="text-center relative z-10 p-8 w-full">
                  <div className="w-20 h-20 rounded-full bg-white/90 shadow-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 border-4 border-blue-200">
                    <MapPin className="h-10 w-10 text-blue-500" />
                  </div>

                  <h4 className="text-2xl font-bold text-gray-800 mb-3">Visit My Office 🗺️</h4>
                  <div className="space-y-2 mb-6">
                    <p className="text-gray-700 font-medium">123, Business Center</p>
                    <p className="text-gray-700 font-medium">Connaught Place</p>
                    <p className="text-gray-700 font-medium">Bangalore - 560001</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild className="bg-white text-gray-700 hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-lg rounded-xl border border-gray-200 font-semibold">
                      <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                        📍 View on Google Maps
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50 hover:scale-105 transition-all duration-300 rounded-xl font-semibold">
                      <a href="tel:+919901997606">
                        📞 Get Directions
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <CardContent className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">Metro Access</p>
                    <p className="font-semibold text-gray-800">5 min walk</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">Parking</p>
                    <p className="font-semibold text-gray-800">Available</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Hours Card - Enhanced */}
            <Card className="border-0 shadow-2xl backdrop-blur-sm bg-white/95 overflow-hidden hover:scale-[1.02] transition-all duration-500">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-center">
                <CardTitle className="text-2xl font-bold flex items-center justify-center gap-3">
                  <Clock className="h-6 w-6" />
                  Service Hours
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </CardTitle>
                <CardDescription className="text-orange-100 text-lg">
                  Always available for your needs
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    {
                      day: 'Monday - Friday',
                      time: '9:00 AM - 7:00 PM',
                      emoji: '💼',
                      status: 'Open',
                      color: 'from-green-50 to-emerald-50',
                      border: 'border-green-200'
                    },
                    {
                      day: 'Saturday',
                      time: '9:00 AM - 5:00 PM',
                      emoji: '🌅',
                      status: 'Open',
                      color: 'from-green-50 to-emerald-50',
                      border: 'border-green-200'
                    },
                    {
                      day: 'Sunday',
                      time: 'By Appointment Only',
                      emoji: '📅',
                      status: 'Available',
                      color: 'from-blue-50 to-cyan-50',
                      border: 'border-blue-200'
                    },
                    {
                      day: 'Emergency Support',
                      time: '24/7 Available',
                      emoji: '🚨',
                      status: 'Always',
                      color: 'from-red-50 to-orange-50',
                      border: 'border-red-200'
                    }
                  ].map((schedule, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-xl bg-gradient-to-r ${schedule.color} border ${schedule.border} hover:scale-105 transition-all duration-300 group cursor-pointer`}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                          {schedule.emoji}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800 text-lg group-hover:text-gray-900">
                            {schedule.day}
                          </p>
                          <p className="text-gray-600 group-hover:text-gray-700">
                            {schedule.time}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            {schedule.status}
                          </span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          <div className="w-1 h-1 bg-green-400 rounded-full opacity-70"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </CardContent>
            </Card>
          </div>

          {/* Additional Information Banner */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-white">
                <h3 className="text-xl font-bold mb-2">🚀 Ready to Get Started?</h3>
                <p className="text-blue-100">Book your free consultation today and secure your future</p>
              </div>
              <div className="flex gap-3">
                <Button asChild className="bg-white text-blue-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 rounded-xl font-semibold">
                  <a href="#contact-form">
                    📅 Book Appointment
                  </a>
                </Button>
                <Button asChild variant="outline" className="hover:bg-white/20 hover:scale-105 transition-all duration-300 rounded-xl font-semibold">
                  <a href="tel:+919901997606">
                    📞 Call Now
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Information Grid */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Multiple Ways to
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block"> Connect With Me</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose your preferred method to get in touch. I'm always available to help you with your insurance needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group backdrop-blur-sm bg-white/95 overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative pb-0">
                  <div className={`w-20 h-20 rounded-2xl ${info.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg relative z-10`}>
                    <info.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 relative z-10">
                    {info.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6 relative z-10">
                  {info.details.map((detail, idx) => (
                    <p
                      key={idx}
                      className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300"
                    >
                      {detail}
                    </p>
                  ))}
                  <CardDescription className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                    {info.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Quick Contact Options */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Prefer Instant Communication? ⚡
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose your preferred way to connect with me for immediate assistance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Phone,
                title: 'Direct Call',
                desc: 'Get immediate assistance and personalized guidance over phone',
                color: 'from-blue-500 to-blue-600',
                link: 'tel:+919901997606',
                text: 'Call Now 📞',
                emoji: '📞',
                features: ['Instant Connect', 'Voice Support', 'Quick Queries']
              },
              {
                icon: MessageCircle,
                title: 'WhatsApp Chat',
                desc: 'Quick messaging, document sharing, and instant responses',
                color: 'from-green-500 to-green-600',
                link: 'https://wa.me/919901997606',
                text: 'Start Chat 💬',
                emoji: '💬',
                features: ['File Sharing', 'Quick Replies', '24/7 Support']
              },
              {
                icon: Mail,
                title: 'Email Support',
                desc: 'Detailed queries, document exchange, and comprehensive support',
                color: 'from-purple-500 to-purple-600',
                link: 'mailto:mailmerathi.saravanan@gmail.com',
                text: 'Send Email 📧',
                emoji: '📧',
                features: ['Detailed Queries', 'Document Exchange', 'Formal Communication']
              }
            ].map((item, index) => (
              <Card key={index} className="text-center border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group hover:scale-105 backdrop-blur-sm bg-white/95 overflow-hidden">
                <CardHeader className="relative pb-4">
                  <div className={`bg-gradient-to-br ${item.color} w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-3xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 relative`}>
                    <item.icon className="h-10 w-10 text-white" />
                    <div className="absolute -top-3 -right-3 text-2xl group-hover:animate-bounce">{item.emoji}</div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 text-lg">
                    {item.desc}
                  </p>

                  <div className="space-y-2">
                    {item.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Button asChild size="lg" className={`w-full bg-gradient-to-r ${item.color} hover:shadow-2xl group-hover:scale-105 transition-all duration-300 text-white font-bold py-4 rounded-xl`}>
                    <a href={item.link} target={item.link.includes('http') ? "_blank" : undefined} rel={item.link.includes('http') ? "noopener noreferrer" : undefined}>
                      {item.text}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Final CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white/10 to-transparent"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-fade-in">
            <div className="inline-flex items-center bg-white/20 rounded-full px-6 py-3 text-white/90 text-sm font-semibold mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
              Limited Time Offer - Free Consultation
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Secure Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300 block"> Family's Future? 🚀</span>
            </h2>

            <p className="text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              Don't wait for tomorrow to protect what matters most. Let's discuss your insurance needs today
              and create a comprehensive protection plan that gives you peace of mind for years to come. ✨
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {[
                { number: '15+', label: 'Years Experience' },
                { number: '500+', label: 'Happy Clients' },
                { number: '₹50Cr+', label: 'Life Cover Managed' },
                { number: '24h', label: 'Average Response Time' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-blue-200 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                onClick={() => {
                  formSectionRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                  });
                  setTimeout(() => {
                    if (fullNameRef.current) {
                      fullNameRef.current.focus();
                    }
                  }, 600);
                }}
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl text-lg px-10 py-6 rounded-2xl font-bold"
              >
                <Calendar className="w-6 h-6 mr-2" />
                Fill Quick Form Now
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-blue-600 hover:text-blue-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl text-lg px-10 py-6 rounded-2xl font-bold">
                <a href="https://wa.me/919901997606" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-6 h-6 mr-2" />
                  WhatsApp Me Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;