
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle, Sparkles, Heart, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import axios from 'axios';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { API_BASE_URL, AgentId } from "@/pages/config";
import Head from 'next/head';


const Contact = () => {
  const contactAnimation = useScrollAnimation();

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Numbers',
      details: ['+91 98765 43210', '+91 87654 32109'],
      description: 'Available 9 AM - 8 PM (Mon-Sat)',
      color: 'text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100',
      gradient: 'from-blue-400 to-blue-600'
    },
    {
      icon: Mail,
      title: 'Email Address',
      details: ['rajesh.lic@gmail.com'],
      description: 'Response within 24 hours',
      color: 'text-green-600 bg-gradient-to-br from-green-50 to-green-100',
      gradient: 'from-green-400 to-green-600'
    },
    {
      icon: MapPin,
      title: 'Office Address',
      details: ['123, Business Center', 'Connaught Place', 'New Delhi - 110001'],
      description: 'Visit by appointment',
      color: 'text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100',
      gradient: 'from-purple-400 to-purple-600'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon-Fri: 9:00 AM - 7:00 PM', 'Saturday: 9:00 AM - 5:00 PM', 'Sunday: By Appointment'],
      description: 'Emergency support available',
      color: 'text-orange-600 bg-gradient-to-br from-orange-50 to-orange-100',
      gradient: 'from-orange-400 to-orange-600'
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

  const whyChooseMe = [
    {
      title: '15+ Years Experience',
      description: 'Extensive expertise in LIC products and financial planning',
      icon: '🎯'
    },
    {
      title: 'Personal Attention',
      description: 'Dedicated support throughout your policy journey',
      icon: '💝'
    },
    {
      title: 'Quick Response',
      description: 'Fast turnaround on queries and policy processing',
      icon: '⚡'
    },
    {
      title: 'Transparent Advice',
      description: 'Honest recommendations based on your actual needs',
      icon: '✨'
    }
  ];

  return (
    <div className="relative overflow-hidden">
      <Head>
        <title>Contact Rajesh Kumar — LIC Agent Bangalore</title>
        <meta name="description" content="Reach Rajesh Kumar for policy advice, claims support, and free consultations. Call, message, or book a visit today." />
        <meta name="keywords" content="contact LIC agent, LIC consultation Bangalore, contact Rajesh Kumar, LIC help, policy assistance Bangalore, call LIC agent" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://lifecodeacademyinnovations.vercel.app/contact" />

        {/* Open Graph */}
        <meta property="og:title" content="Contact Rajesh Kumar — LIC Agent Bangalore" />
        <meta property="og:description" content="Contact for policy advice, claims help, premium assistance, and free consultations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lifecodeacademyinnovations.vercel.app/contact" />
        <meta property="og:image" content="https://lifecodeacademyinnovations.vercel.app/og-contact.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Contact Rajesh Kumar — LIC Agent Bangalore" />
        <meta name="twitter:description" content="Call or message for personalized LIC policy guidance and claims assistance." />
        <meta name="twitter:image" content="https://lifecodeacademyinnovations.vercel.app/og-contact.jpg" />

        {/* JSON-LD: ContactPoint */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "InsuranceAgency",
              "name": "Rajesh Kumar - LIC Agent",
              "url": "https://lifecodeacademyinnovations.vercel.app/",
              "telephone": "REPLACE_PHONE",
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "REPLACE_PHONE",
                  "contactType": "Customer Service",
                  "areaServed": "IN",
                  "availableLanguage": ["English", "Hindi"]
                }
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Bangalore",
                "addressRegion": "Karnataka",
                "addressCountry": "IN"
              }
            })
          }}
        />
      </Head>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-green-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s' }}></div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-2 text-sm font-medium text-blue-700 mb-6 hover:scale-105 transition-transform duration-300">
              <Heart className="w-4 h-4 mr-2 animate-pulse" />
              Let's Connect & Secure Your Future
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Get in Touch
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block">
                For Expert Guidance ✨
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to secure your family's future? Contact me for personalized insurance solutions,
              policy reviews, or any questions about LIC products. I'm here to help you make informed decisions! 🚀
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-rotate-1 group backdrop-blur-sm bg-white/90">
                <CardHeader className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-t-lg"></div>
                  <div className={`w-20 h-20 rounded-full ${info.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg relative z-10`}>
                    <info.icon className="h-10 w-10" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">{info.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{detail}</p>
                  ))}
                  <CardDescription className="text-sm group-hover:text-gray-700 transition-colors duration-300">{info.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div ref={contactAnimation.ref} className={`text-center mb-8 transition-all duration-1000 ${contactAnimation.isVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-10'}`}>
                  <h2 className="text-4xl font-bold text-white mb-4">Let's Get Started! 🚀</h2>
                  <p className="text-lg text-blue-100 mb-6">
                    Fill out the form below to send me your insurance requirements, questions, or how I can assist you.
                  </p>
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
            </div>

            {/* Map & Office Info */}
            <div className="space-y-8">
              <div className="animate-fade-in">
                <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-blue-100 rounded-full px-4 py-2 text-sm font-medium text-purple-700 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  Visit My Office
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Come Say Hi! 👋</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Located in the heart of Delhi, my office is easily accessible by metro and road.
                  Schedule an appointment for face-to-face consultation.
                </p>
              </div>

              {/* Map Placeholder */}
              <Card className="border-0 shadow-2xl overflow-hidden hover:scale-105 transition-transform duration-500 group">
                <div className="h-64 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 group-hover:from-blue-400/30 group-hover:to-purple-400/30 transition-all duration-500"></div>
                  <div className="text-center relative z-10">
                    <MapPin className="h-16 w-16 text-blue-500 mx-auto mb-4 group-hover:scale-110 group-hover:text-purple-500 transition-all duration-300" />
                    <p className="text-lg font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-300">Interactive Map 🗺️</p>
                    <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">123, Business Center, Connaught Place</p>
                  </div>
                </div>
              </Card>

              {/* Why Choose Me */}
              <Card className="border-0 shadow-2xl hover:scale-105 transition-transform duration-500 backdrop-blur-sm bg-white/95">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    Why Choose Me?
                    <Zap className="ml-2 h-6 w-6 text-yellow-500 animate-pulse" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {whyChooseMe.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300 hover:scale-105 group">
                      <div className="text-2xl group-hover:scale-125 transition-transform duration-300">{item.icon}</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{item.title}</h4>
                        <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Prefer Instant Communication? ⚡</h2>
            <p className="text-lg text-gray-600">Choose your preferred way to connect with me</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Phone,
                title: 'Direct Call',
                desc: 'Get immediate assistance over phone',
                color: 'from-blue-400 to-blue-600',
                link: 'tel:+919876543210',
                text: 'Call Now 📞',
                emoji: '📞'
              },
              {
                icon: MessageCircle,
                title: 'WhatsApp Chat',
                desc: 'Quick messages and document sharing',
                color: 'from-green-400 to-green-600',
                link: 'https://wa.me/919876543210',
                text: 'Start Chat 💬',
                emoji: '💬'
              },
              {
                icon: Mail,
                title: 'Email Support',
                desc: 'Detailed queries and document exchange',
                color: 'from-purple-400 to-purple-600',
                link: 'mailto:rajesh.lic@gmail.com',
                text: 'Send Email 📧',
                emoji: '📧'
              }
            ].map((item, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group hover:scale-105 hover:-rotate-1 backdrop-blur-sm bg-white/90">
                <CardHeader>
                  <div className={`bg-gradient-to-br ${item.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 relative`}>
                    <item.icon className="h-10 w-10 text-white" />
                    <div className="absolute -top-2 -right-2 text-lg group-hover:animate-bounce">{item.emoji}</div>
                  </div>
                  <CardTitle className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">{item.desc}</p>
                  <Button asChild className={`bg-gradient-to-r ${item.color} hover:shadow-2xl group-hover:scale-110 transition-all duration-300`}>
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

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Secure Your Future? 🚀</h2>
            <p className="text-xl text-blue-100 mb-8">
              Don't wait for tomorrow. Let's discuss your insurance needs today and create a comprehensive
              protection plan for your family. ✨
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
                <a href="tel:+919876543210">Schedule Free Consultation 📅</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white hover:bg-gray-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                  WhatsApp Me 💬
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
