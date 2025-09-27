import { Shield, TrendingUp, Banknote, Users, Clock, CheckCircle, ArrowRight, Heart, EyeIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';;
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL, AgentId } from "@/pages/config";
import Head from 'next/head';


const LifeInsurance = () => {
  const [policies, setPolicies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


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
    const fetchPolicies = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/lifeInsurance/agent/${AgentId}`);
        console.log("API response:", response.data);

        if (Array.isArray(response.data.data)) {
          const transformedPolicies = response.data.data.map(policy => ({
            id: policy.id,
            title: policy.Title,
            subtitle: policy.Subtitle,
            description: policy.DESCRIPTION,
            image: policy.IconName,
            color: policy.ColorClass,
            ageRange: policy.AgeRange,
            minPremium: policy.MinPremium,
            popular: policy.Popular,
            features: policy.Features || [],
            plans: policy.Plans || []
          }));

          setPolicies(transformedPolicies);
        } else {
          console.warn("⚠️ Expected array but got:", response.data.data);
        }
      } catch (error) {
        console.error("❌ Failed to load policies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchPolicies();
    }, 1000);

    return () => clearTimeout(timer);
  }, [AgentId, API_BASE_URL]);

  const benefits = [
    {
      title: 'Tax Benefits',
      description: 'Enjoy tax deductions under Section 80C and tax-free maturity benefits under Section 10(10D)',
      icon: Banknote
    },
    {
      title: 'Guaranteed Claims',
      description: 'LIC has maintained over 98% claim settlement ratio with government backing',
      icon: CheckCircle
    },
    {
      title: 'Flexible Premiums',
      description: 'Choose from annual, half-yearly, quarterly, or monthly premium payment options',
      icon: Clock
    },
    {
      title: 'Wide Network',
      description: 'Access to LIC\'s extensive network of 2000+ branches across India',
      icon: Users
    }
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Loading policies...</div>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>LIC Life Insurance Plans — Term, Endowment & Pension</title>
        <meta
          name="description"
          content="Explore LIC term, endowment & pension plans. Get expert guidance from Rajesh Kumar — free consultation & quotes in Bangalore."
        />
        <meta
          name="keywords"
          content="LIC life insurance, LIC plans, term insurance Bangalore, LIC endowment plans, pension plans LIC, buy LIC policy, LIC policy features, LIC claim support, LIC policy comparison, LIC agent Bangalore, life insurance quotes"
        />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://lifecodeacademyinnovations.vercel.app/life-insurance" />

        {/* Open Graph */}
        <meta property="og:title" content="LIC Life Insurance Plans — Term, Endowment & Pension" />
        <meta
          property="og:description"
          content="Explore LIC term, endowment & pension plans. Expert guidance, comparisons, and quotes to secure your family's future."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lifecodeacademyinnovations.vercel.app/life-insurance" />
        <meta property="og:image" content="OG_IMAGE_URL" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LIC Life Insurance Plans — Term, Endowment & Pension" />
        <meta
          name="twitter:description"
          content="Compare LIC plans and get tailored recommendations. Free quotes & policy help from Rajesh Kumar in Bangalore."
        />
        <meta name="twitter:image" content="OG_IMAGE_URL" />

        {/* JSON-LD: InsuranceAgency + sample InsuranceProduct (paste-ready; edit to include real policy data) */}
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
                  "@type": "InsuranceProduct",
                  "name": "LIC Life Insurance",
                  "description": "Term, endowment and pension plans from LIC with expert guidance and personalised recommendations.",
                  "provider": { "@id": "https://lifecodeacademyinnovations.vercel.app/#insurance" }
                }
              ]
            })
          }}
        />
      </Head>


      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              LIC Life Insurance
              <span className="text-blue-600 block">Plans for Every Need</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose from a comprehensive range of life insurance policies designed to protect your family
              and secure your financial future. Get expert guidance to find the perfect plan.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Policy Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Ideal Policy</h2>
            <p className="text-lg text-gray-600">Compare different types of LIC policies and find the one that suits your needs</p>
          </div>

          {policies.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No policies available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {policies.map((policy) => (
                <Card key={policy.id} className="relative border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={formatFileUrl(policy.image) || "/default-policy.avif"}
                    alt={policy.title}
                    className="w-full object-cover"
                    onError={(e) => { e.currentTarget.src = "/default-policy.avif"; }}
                    loading="lazy"
                  />
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        {/* <div className={`w-12 h-12 rounded-lg ${policy.color} flex items-center justify-center`}>
                          <policy.icon className="h-6 w-6" />
                        </div> */}
                        <div>
                          <CardTitle className="text-xl">{policy.title}</CardTitle>
                          <CardDescription className="text-sm font-medium text-blue-600">
                            {policy.subtitle}
                          </CardDescription>
                        </div>
                      </div>
                      {policy.popular && (
                        <Badge
                          className="self-start text-xs px-2 py-1 rounded-full bg-blue-600 text-white"
                          aria-label="Most Popular"
                        >
                          Most Popular
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-600">{policy.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-900">Age Range:</span>
                        <p className="text-gray-600">{policy.ageRange}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Min. Premium:</span>
                        <p className="text-gray-600">{policy.minPremium}</p>
                      </div>
                    </div>

                    {policy.features && policy.features.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Key Features:</h4>
                        <ul className="space-y-2">
                          {policy.features.map((feature, index) => (
                            <li key={index} className="flex items-start space-x-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {policy.plans && policy.plans.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Popular Plans:</h4>
                        <div className="flex flex-wrap gap-2">
                          {policy.plans.map((plan, index) => (
                            <Link
                              key={index}
                              href={`/planDetailsPage/${encodeURIComponent(plan)}`}
                              className="inline-flex"
                            >
                              <Badge
                                variant="secondary"
                                className="inline-flex items-center gap-2 text-xs cursor-pointer hover:bg-gray-300 transition-colors transform hover:scale-95 outline-none focus:ring-2 focus:ring-opacity-50 bg-gray-100 hover:bg-blue-100 border border-gray-200 hover:border-blue-400 px-3 font-medium shadow-sm hover:shadow-md"
                              >
                                {plan}
                              </Badge>
                            </Link>

                          ))}
                        </div>
                      </div>
                    )}

                    <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                      <Link href="/contact">
                        Get Quote for {policy.title} <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose LIC */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose LIC?</h2>
            <p className="text-lg text-gray-600">India's most trusted life insurance company</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">98.74%</div>
              <h3 className="font-semibold text-gray-900 mb-2">Claim Settlement Ratio</h3>
              <p className="text-gray-600 text-sm">Highest in the industry with government backing</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">290M+</div>
              <h3 className="font-semibold text-gray-900 mb-2">Policies in Force</h3>
              <p className="text-gray-600 text-sm">Serving families across India for 65+ years</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">₹35L Cr</div>
              <h3 className="font-semibold text-gray-900 mb-2">Assets Under Management</h3>
              <p className="text-gray-600 text-sm">Strong financial foundation for your security</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Secure Your Family's Future?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Get personalized policy recommendations based on your needs and budget
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-400">
              <Link href="/contact">Get Free Consultation</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-blue-600 hover:bg-gray-400">
              <Link href="/faq">View FAQ</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LifeInsurance;