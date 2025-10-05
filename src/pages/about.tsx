
import { Award, Users, Clock, Heart, CheckCircle, Shield, Briefcase, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';;
import Head from 'next/head';

const About = () => {
  const achievements = [
    { icon: Users, label: '1000+ Happy Clients', color: 'text-blue-600' },
    { icon: Clock, label: '15+ Years Experience', color: 'text-green-600' },
    { icon: Award, label: 'Top Performer 2023', color: 'text-purple-600' },
    { icon: Heart, label: '98% Client Satisfaction', color: 'text-red-600' }
  ];

  const certifications = [
    'LIC Certified Life Insurance Agent',
    'Financial Planning Certification',
    'Customer Service Excellence Award',
    'Million Dollar Round Table Member'
  ];

  const values = [
    {
      title: 'Trust & Transparency',
      description: 'Building long-term relationships through honest advice and transparent processes.',
      icon: Shield
    },
    {
      title: 'Client-First Approach',
      description: 'Your financial security and peace of mind are my top priorities.',
      icon: Heart
    },
    {
      title: 'Expert Guidance',
      description: 'Leveraging years of experience to provide the best insurance solutions.',
      icon: GraduationCap
    },
    {
      title: 'Professional Service',
      description: 'Committed to delivering exceptional service at every touchpoint.',
      icon: Briefcase
    }
  ];

  return (
    <div>
      <Head>
        <title>About Rajesh Kumar — LIC Agent Bangalore</title>
        <meta name="description" content="Learn about Rajesh Kumar, certified LIC agent in Bangalore — experience, certifications & client success stories to secure your family's future." />
        <meta name="keywords" content="Rajesh Kumar LIC agent, LIC agent Bangalore, about LIC agent, LIC advisor Bangalore, certified LIC agent, insurance expert Bangalore" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://lifecodeacademyinnovations.vercel.app/about" />

        {/* Open Graph */}
        <meta property="og:title" content="About Rajesh Kumar — LIC Agent Bangalore" />
        <meta property="og:description" content="Learn about Rajesh Kumar, certified LIC agent in Bangalore — experience, certifications & client success stories." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lifecodeacademyinnovations.vercel.app/about" />
        <meta property="og:image" content="https://lifecodeacademyinnovations.vercel.app/og-about.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Rajesh Kumar — LIC Agent Bangalore" />
        <meta name="twitter:description" content="Get to know Rajesh Kumar — licensed LIC agent serving Bangalore with trusted insurance guidance." />
        <meta name="twitter:image" content="https://lifecodeacademyinnovations.vercel.app/og-about.jpg" />

        {/* JSON-LD: InsuranceAgency + Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "InsuranceAgency",
                  "@id": "https://lifecodeacademyinnovations.vercel.app/#insurance",
                  "name": "Rajesh Kumar - LIC Agent",
                  "url": "https://lifecodeacademyinnovations.vercel.app/",
                  "logo": "https://lifecodeacademyinnovations.vercel.app/logo.png",
                  "telephone": "REPLACE_PHONE",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Bangalore",
                    "addressRegion": "Karnataka",
                    "addressCountry": "IN"
                  }
                },
                {
                  "@type": "Person",
                  "name": "Rajesh Kumar",
                  "jobTitle": "LIC Agent / Insurance Advisor",
                  "worksFor": { "@id": "https://lifecodeacademyinnovations.vercel.app/#insurance" },
                  "sameAs": [
                    "https://www.linkedin.com/in/REPLACE",
                    "https://www.facebook.com/REPLACE"
                  ]
                }
              ]
            })
          }}
        />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Meet Your Trusted
                <span className="text-blue-600 block">LIC Agent</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                With over 15 years of experience in life insurance, I'm dedicated to helping families
                secure their financial future with the right LIC policies.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <achievement.icon className={`h-6 w-6 ${achievement.color}`} />
                    <div>
                      <p className="font-semibold text-gray-900">{achievement.label.split(' ')[0]}</p>
                      <p className="text-sm text-gray-600">{achievement.label.split(' ').slice(1).join(' ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Rajesh Kumar - LIC Agent"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Top Agent</p>
                    <p className="text-sm text-gray-600">2023 Award</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">My Story</h2>
            <p className="text-lg text-gray-600">How I became your trusted insurance partner</p>
          </div>
          <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
            <p>
              My journey with LIC began 15 years ago when I witnessed the financial struggles my neighbor's family
              faced after an unexpected tragedy. That moment made me realize the critical importance of life insurance
              in protecting families from financial hardship.
            </p>
            <p>
              I started as a part-time LIC agent while working in the banking sector. The satisfaction of helping
              families secure their future motivated me to pursue this as my full-time career. Over the years, I've
              helped over 1000 families choose the right insurance policies that match their needs and budget.
            </p>
            <p>
              My approach is simple: I listen to your concerns, understand your financial goals, and recommend policies
              that truly benefit you. I believe in building long-term relationships based on trust, transparency, and
              genuine care for my clients' well-being.
            </p>
            <p>
              Today, I'm proud to be recognized as one of LIC's top-performing agents in Delhi, but my greatest
              achievement is the peace of mind I've helped bring to families across the region.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">My Values & Principles</h2>
            <p className="text-lg text-gray-600">What drives my commitment to excellent service</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Certifications */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Professional Experience</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-600 pl-6">
                  <h4 className="font-semibold text-lg text-gray-900">Senior LIC Agent</h4>
                  <p className="text-blue-600 font-medium">2015 - Present</p>
                  <p className="text-gray-600 mt-2">
                    Full-time LIC agent specializing in life insurance, investment planning, and retirement solutions.
                    Consistently ranked among top 10% performers.
                  </p>
                </div>
                <div className="border-l-4 border-gray-300 pl-6">
                  <h4 className="font-semibold text-lg text-gray-900">Part-time LIC Agent</h4>
                  <p className="text-gray-600 font-medium">2009 - 2015</p>
                  <p className="text-gray-600 mt-2">
                    Started as part-time agent while working in banking. Built foundation of client relationships
                    and product knowledge.
                  </p>
                </div>
                <div className="border-l-4 border-gray-300 pl-6">
                  <h4 className="font-semibold text-lg text-gray-900">Banking Professional</h4>
                  <p className="text-gray-600 font-medium">2005 - 2015</p>
                  <p className="text-gray-600 mt-2">
                    Worked in retail banking, gaining valuable experience in financial products and customer service.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Certifications & Awards</h3>
              <div className="space-y-4 mb-8">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">{cert}</span>
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-lg text-gray-900 mb-2">Mission Statement</h4>
                <p className="text-gray-700 italic">
                  "To empower every family with financial security through personalized insurance solutions,
                  ensuring their dreams remain protected against life's uncertainties."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Secure Your Family's Future?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's discuss your insurance needs and find the perfect policy for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-400">
              <Link href="/contact">Schedule Consultation</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-blue-600 hover:bg-gray-400 hover:text-blue-600">
              <Link href="/life-insurance">View Policies</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
