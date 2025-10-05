import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, Phone, MessageCircle, Filter, X, Star, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Head from 'next/head';

const FAQ = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [popularFaqs, setPopularFaqs] = useState<number[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<number[]>([]);

  const faqData = [
    {
      id: 1,
      category: 'General',
      question: 'What is the difference between term insurance and endowment plans?',
      answer: 'Term insurance provides pure life cover without any investment component at very affordable premiums. If you survive the policy term, you get nothing back. Endowment plans combine insurance with investment - you get life cover plus guaranteed returns with bonuses. Premiums are higher but you receive maturity benefits if you survive the term.',
      tags: ['term insurance', 'endowment', 'investment', 'premiums'],
      readTime: '2 min',
      popular: true
    },
    {
      id: 2,
      category: 'Tax Benefits',
      question: 'What tax benefits do I get with LIC policies?',
      answer: 'LIC policies offer dual tax benefits: 1) Premium paid qualifies for deduction up to ₹1.5 lakh under Section 80C. 2) Maturity amount and death benefits are tax-free under Section 10(10D) if premium doesn\'t exceed 10% of sum assured (20% for policies bought before 2012). This makes LIC policies highly tax-efficient investment options.',
      tags: ['tax benefits', 'section 80c', 'deduction', 'tax-free'],
      readTime: '3 min',
      popular: true
    },
    {
      id: 3,
      category: 'Premium Payment',
      question: 'Can I pay premiums monthly instead of annually?',
      answer: 'Yes, LIC offers flexible premium payment options - annual, half-yearly, quarterly, and monthly. However, annual payment is most economical as you save on processing charges. Monthly payments are convenient but cost slightly more due to administrative charges. You can change payment frequency subject to policy terms.',
      tags: ['premium payment', 'monthly', 'annual', 'frequency'],
      readTime: '2 min',
      popular: false
    },
    {
      id: 4,
      category: 'Policy Management',
      question: 'How do I check my policy status online?',
      answer: 'You can check your LIC policy status online through: 1) LIC official website using policy number and DOB, 2) LIC Customer Portal after registration, 3) LIC mobile app, or 4) SMS service. You can view premium due dates, bonus declarations, policy statements, and fund values. Contact me for assistance with online registration.',
      tags: ['policy status', 'online', 'mobile app', 'customer portal'],
      readTime: '2 min',
      popular: true
    },
    {
      id: 5,
      category: 'Claims',
      question: 'What documents are required for claim settlement?',
      answer: 'For death claims: Original policy document, death certificate, claim form, hospital records (if applicable), police FIR (for unnatural death), nominee\'s identity proof, and bank details. For maturity claims: Policy document, discharge form, identity proof, and bank details. I assist my clients throughout the claim process to ensure smooth settlement.',
      tags: ['claims', 'documents', 'death claims', 'maturity claims'],
      readTime: '3 min',
      popular: true
    },
    {
      id: 6,
      category: 'Policy Features',
      question: 'Can I take a loan against my LIC policy?',
      answer: 'Yes, you can take loans against policies that have acquired surrender value (typically after 2-3 years). Loan amount depends on surrender value and can be up to 90% of it. Interest rates are competitive (currently around 9-10% p.a.). The loan doesn\'t affect your policy benefits, but unpaid loan amount is deducted from claims. Very convenient for emergency funding.',
      tags: ['policy loan', 'surrender value', 'interest rates', 'emergency funding'],
      readTime: '2 min',
      popular: false
    },
    {
      id: 7,
      category: 'Eligibility',
      question: 'What is the maximum age for buying LIC policies?',
      answer: 'Maximum entry age varies by policy type: Term plans (65 years), Endowment plans (59 years), Pension plans (79 years), and immediate annuity plans (85 years). However, buying insurance early is always better - premiums are lower, and you get longer coverage. I recommend starting your insurance journey in your 20s or 30s for maximum benefits.',
      tags: ['age limit', 'eligibility', 'term plans', 'pension plans'],
      readTime: '2 min',
      popular: false
    },
    {
      id: 8,
      category: 'Policy Modification',
      question: 'Can I increase my coverage amount after buying the policy?',
      answer: 'You cannot increase the sum assured of an existing policy. However, you can: 1) Buy additional policies to increase overall coverage, 2) Use riders for additional benefits, or 3) Exercise increase options available in some policies. I recommend reviewing your insurance needs annually and buying additional coverage when income increases or family responsibilities grow.',
      tags: ['coverage increase', 'sum assured', 'riders', 'additional policies'],
      readTime: '3 min',
      popular: false
    },
    {
      id: 9,
      category: 'Surrender & Revival',
      question: 'What happens if I stop paying premiums?',
      answer: 'If you stop paying premiums after the policy acquires surrender value (2-3 years), it becomes a paid-up policy with reduced benefits. You can surrender it for cash value or revive it within 5 years by paying due premiums with interest. If stopped before surrender value, the policy lapses with no benefits. Always consult me before stopping premiums - there might be better alternatives.',
      tags: ['surrender', 'revival', 'paid-up policy', 'lapse'],
      readTime: '3 min',
      popular: false
    },
    {
      id: 10,
      category: 'Bonus & Returns',
      question: 'How are bonuses declared on LIC policies?',
      answer: 'LIC declares bonuses annually based on its investment performance and actuarial surplus. There are two types: 1) Reversionary bonus - added to your policy each year and payable on death/maturity, 2) Terminal bonus - one-time addition at the end for long-term policies. Bonus rates vary by policy type and year of purchase. These bonuses enhance your returns significantly over time.',
      tags: ['bonus', 'returns', 'reversionary bonus', 'terminal bonus'],
      readTime: '3 min',
      popular: false
    },
    {
      id: 11,
      category: 'Medical Examination',
      question: 'When is medical examination required for LIC policies?',
      answer: 'Medical examination depends on: 1) Age of proposer, 2) Sum assured amount, 3) Health declaration in proposal form. Generally required if sum assured exceeds ₹25-50 lakhs or age above 45-50 years. For smaller amounts and younger ages, only health declaration suffices. Some policies may require specific medical tests. I guide you through the entire process including medical arrangements.',
      tags: ['medical examination', 'health declaration', 'sum assured', 'age limit'],
      readTime: '2 min',
      popular: false
    },
    {
      id: 12,
      category: 'Riders',
      question: 'What riders can I add to my LIC policy?',
      answer: 'Popular LIC riders include: 1) Accident Benefit Rider - additional payout for accidental death, 2) Disability Benefit Rider - premium waiver on permanent disability, 3) Critical Illness Rider - lump sum on diagnosis of specified diseases, 4) Term Rider - additional life cover at low cost. Riders enhance your policy\'s protection at minimal extra cost. I help choose appropriate riders based on your needs.',
      tags: ['riders', 'accident benefit', 'disability benefit', 'critical illness'],
      readTime: '3 min',
      popular: false
    },
    {
      id: 13,
      category: 'Nomination',
      question: 'Can I change the nominee in my LIC policy?',
      answer: 'Yes, you can change nominees any time during the policy term by submitting a nomination change form with required documents. You can have multiple nominees with specified percentage shares. For minor nominees, you must appoint an appointee who will receive benefits until the nominee attains majority. Keeping nomination updated ensures smooth claim settlement for your family.',
      tags: ['nomination', 'nominee change', 'multiple nominees', 'appointee'],
      readTime: '2 min',
      popular: false
    },
    {
      id: 14,
      category: 'Policy Transfer',
      question: 'Can I transfer my policy to another person?',
      answer: 'LIC policies can be assigned (transferred) to another person, but this is typically done for loan security purposes or as a gift to family members. The assignment must be in writing and registered with LIC. Once assigned, the assignee gets all policy rights and benefits. This is different from nomination - nominees only receive benefits after policyholder\'s death. Legal documentation is required for assignments.',
      tags: ['policy transfer', 'assignment', 'legal documentation', 'assignee'],
      readTime: '3 min',
      popular: false
    },
    {
      id: 15,
      category: 'Digital Services',
      question: 'What digital services does LIC offer?',
      answer: 'LIC provides comprehensive digital services: 1) Online policy purchase, 2) Premium payment through net banking/cards, 3) Policy status checking, 4) Fund switching in ULIPs, 5) Address change, 6) Download policy documents, 7) Register complaints, and 8) LIC mobile app for all services. However, I recommend taking policies through agents like me for personalized service and ongoing support throughout the policy term.',
      tags: ['digital services', 'online purchase', 'mobile app', 'premium payment'],
      readTime: '2 min',
      popular: true
    }
  ];

  const categories = ['All', 'General', 'Tax Benefits', 'Premium Payment', 'Policy Management', 'Claims', 'Policy Features', 'Eligibility', 'Policy Modification', 'Surrender & Revival', 'Bonus & Returns', 'Medical Examination', 'Riders', 'Nomination', 'Policy Transfer', 'Digital Services'];

  useEffect(() => {
    // Set popular FAQs based on the popular flag
    const popular = faqData.filter(faq => faq.popular).map(faq => faq.id);
    setPopularFaqs(popular);
  }, []);

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
    
    // Add to recently viewed
    if (!recentlyViewed.includes(id)) {
      setRecentlyViewed(prev => [id, ...prev.slice(0, 4)]);
    }
  };

  const filteredFaqs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const popularFaqData = faqData.filter(faq => popularFaqs.includes(faq.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Head>
  <title>LIC FAQ & Policy Guide | Expert Insurance Answers</title>
  <meta name="description" content="Get expert answers to LIC policy FAQs — from premiums, tax benefits, and claims to riders and policy loans. Trusted guidance for your insurance journey." />
  <meta name="keywords" content="LIC policy FAQ, LIC insurance questions, LIC premium payment options, LIC tax benefits 80C, LIC claims process, LIC online policy status, LIC riders and add-ons, LIC surrender and revival, LIC maturity benefits, LIC loan against policy, LIC digital services, LIC agent support" />
  <meta name="robots" content="index,follow" />
  <link rel="canonical" href="https://lifecodeacademyinnovations.vercel.app/faq" />

  {/* Open Graph */}
  <meta property="og:title" content="LIC FAQ & Policy Guide | Expert Insurance Answers" />
  <meta property="og:description" content="Get expert answers to LIC policy FAQs — from premiums, tax benefits, and claims to riders and policy loans. Trusted guidance for your insurance journey." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://lifecodeacademyinnovations.vercel.app/faq" />
  <meta property="og:image" content="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="LIC FAQ & Policy Guide | Expert Insurance Answers" />
  <meta name="twitter:description" content="Get expert answers to LIC policy FAQs — premiums, tax benefits, claims, riders & more. Trusted guidance for policyholders." />
  <meta name="twitter:image" content="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" />

  {/* Structured data — FAQPage (useful for rich snippets) */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the difference between term insurance and endowment plans?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Term insurance provides pure life cover without any investment component at very affordable premiums. If you survive the policy term, you get nothing back. Endowment plans combine insurance with investment - you get life cover plus guaranteed returns with bonuses. Premiums are higher but you receive maturity benefits if you survive the term."
            }
          },
          {
            "@type": "Question",
            "name": "What tax benefits do I get with LIC policies?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "LIC policies offer dual tax benefits: premium paid qualifies for deduction up to ₹1.5 lakh under Section 80C. Maturity amount and death benefits are tax-free under Section 10(10D) if premium doesn't exceed specified limits."
            }
          },
          {
            "@type": "Question",
            "name": "Can I pay premiums monthly instead of annually?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, LIC offers flexible premium payment options - annual, half-yearly, quarterly, and monthly. Annual payment is most economical while monthly payments are convenient but slightly more due to administrative charges."
            }
          },
          {
            "@type": "Question",
            "name": "How do I check my policy status online?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can check policy status through the LIC official website, customer portal after registration, LIC mobile app, or SMS service. You can view premium due dates, bonus declarations, policy statements, and fund values."
            }
          },
          {
            "@type": "Question",
            "name": "What documents are required for claim settlement?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For death claims: Original policy document, death certificate, claim form, hospital records (if applicable), police FIR (for unnatural death), nominee's ID and bank details. For maturity claims: policy document, discharge form, identity proof, and bank details."
            }
          },
          {
            "@type": "Question",
            "name": "Can I take a loan against my LIC policy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, loans are available against policies that have acquired surrender value (typically after 2-3 years). Loan amount depends on surrender value and can be up to ~90% of it; interest is charged on outstanding loan."
            }
          },
          {
            "@type": "Question",
            "name": "What is the maximum age for buying LIC policies?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Maximum entry age varies by policy: Term plans around 65 years, Endowment plans ~59 years, Pension plans up to 79 years, and immediate annuity plans up to 85 years. Exact ages depend on the policy rules."
            }
          },
          {
            "@type": "Question",
            "name": "Can I increase my coverage amount after buying the policy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You cannot increase sum assured of an existing policy; you can buy additional policies, add riders, or use increase options available in some plans."
            }
          },
          {
            "@type": "Question",
            "name": "What happens if I stop paying premiums?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "If premiums stop after policy has surrender value, it becomes paid-up with reduced benefits. You can revive within a specified period by paying due premiums with interest. If stopped before surrender value, the policy may lapse."
            }
          },
          {
            "@type": "Question",
            "name": "How are bonuses declared on LIC policies?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "LIC declares bonuses annually based on investment performance and actuarial surplus. Reversionary bonuses are added yearly; terminal bonus may be added at maturity for long-term policies."
            }
          },
          {
            "@type": "Question",
            "name": "When is medical examination required for LIC policies?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Medical exams depend on age, sum assured, and health declaration. Generally required for higher sums assured or older ages; smaller amounts and younger applicants may only need a declaration."
            }
          },
          {
            "@type": "Question",
            "name": "What riders can I add to my LIC policy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Popular riders: Accident Benefit, Disability Benefit (premium waiver), Critical Illness, and Term Rider. Riders add protection at a small extra premium."
            }
          },
          {
            "@type": "Question",
            "name": "Can I change the nominee in my LIC policy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes — nomination can be changed any time by submitting the nomination change form and required documents. You can have multiple nominees with specified percentage shares."
            }
          },
          {
            "@type": "Question",
            "name": "Can I transfer my policy to another person?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Policies can be assigned (transferred) in writing and registered with LIC; assignments are typically for loan security or gifting to family members and require legal documentation."
            }
          },
          {
            "@type": "Question",
            "name": "What digital services does LIC offer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "LIC provides online purchase, premium payment, policy status checks, fund switching for ULIPs, address changes, document downloads, complaint registration, and mobile app services."
            }
          }
        ]
      })
    }}
  />
</Head>


      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-transparent"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-indigo-300/20 rounded-full blur-2xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-300/15 rounded-full blur-lg animate-bounce"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <HelpCircle className="h-5 w-5 text-blue-200" />
              <span className="text-blue-100 text-sm font-medium">Knowledge Center</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Your Questions,
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Our Expertise
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Comprehensive answers to all your LIC policy questions. From premiums to claims, 
              we've got you covered with expert insights and personalized guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2 text-blue-200">
                <CheckCircle className="h-5 w-5" />
                <span>Expert Verified Answers</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-200">
                <CheckCircle className="h-5 w-5" />
                <span>Updated Regularly</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-200">
                <CheckCircle className="h-5 w-5" />
                <span>Personalized Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">15+</div>
              <div className="text-gray-600">Common Questions</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">24/7</div>
              <div className="text-gray-600">Expert Support</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">100%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Search Section */}
      <section className="py-12 bg-white/90 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <Input
                type="text"
                placeholder="Ask me anything about LIC policies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-16 py-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl shadow-lg focus:shadow-xl transition-all duration-300 bg-white/95 backdrop-blur-sm"
              />
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-blue-50"
              >
                <Filter className="h-5 w-5" />
              </Button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Filter by Category</h3>
                    <Button
                      onClick={() => setShowFilters(false)}
                      variant="ghost"
                      size="sm"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        className={`transition-all duration-200 ${
                          selectedCategory === category 
                            ? 'bg-blue-600 hover:bg-blue-700 shadow-lg' 
                            : 'hover:bg-blue-50 hover:border-blue-300'
                        }`}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Popular Questions
      {searchTerm === '' && selectedCategory === 'All' && (
        <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                <Star className="inline h-8 w-8 text-yellow-500 mr-2" />
                Most Popular Questions
              </h2>
              <p className="text-gray-600">Questions our clients ask most frequently</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {popularFaqData.slice(0, 6).map((faq) => (
    <Card
      key={faq.id}
      className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white cursor-pointer"
    >
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {faq.question}
          </h3>
          <p className="text-gray-700 leading-relaxed text-sm">{faq.answer}</p>
        </div>
        <div className="flex items-center justify-between text-gray-400 text-xs mt-4">
          <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 font-medium px-2 py-0.5 rounded-full">
            {faq.category}
          </span>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{faq.readTime}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ))}
</div>

          </div>
        </section>
      )} */}

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="py-8 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-gray-500" />
              Recently Viewed
            </h3>
            <div className="flex flex-wrap gap-2">
              {recentlyViewed.map((faqId) => {
                const faq = faqData.find(f => f.id === faqId);
                return faq ? (
                  <Button
                    key={faqId}
                    onClick={() => toggleFaq(faqId)}
                    variant="outline"
                    size="sm"
                    className="hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  >
                    {faq.question.slice(0, 50)}...
                  </Button>
                ) : null;
              })}
            </div>
          </div>
        </section>
      )}

      {/* Enhanced FAQ List */}
      <section className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {selectedCategory !== 'All' && (
            <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-blue-900">Filtered by: {selectedCategory}</h3>
                  <p className="text-blue-700 text-sm">Showing {filteredFaqs.length} questions</p>
                </div>
                <Button
                  onClick={() => setSelectedCategory('All')}
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700"
                >
                  Clear Filter <X className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {filteredFaqs.map((faq) => (
              <Card key={faq.id} className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/95 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-8 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                          {faq.category}
                        </span>
                        {faq.popular && (
                          <span className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                            <Star className="h-3 w-3 mr-1" />
                            Popular
                          </span>
                        )}
                        <div className="flex items-center space-x-1 text-gray-500 text-sm">
                          <Clock className="h-3 w-3" />
                          <span>{faq.readTime}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 pr-4 group-hover:text-blue-600 transition-colors">
                        {faq.question}
                      </h3>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {faq.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      {openFaq === faq.id ? (
                        <ChevronUp className="h-6 w-6 text-blue-600 transform transition-transform duration-200" />
                      ) : (
                        <ChevronDown className="h-6 w-6 text-gray-400 group-hover:text-blue-600 transform transition-all duration-200 group-hover:translate-y-1" />
                      )}
                    </div>
                  </button>
                  
                  {openFaq === faq.id && (
                    <div className="px-8 pb-8 pt-0 animate-in slide-in-from-top-2 duration-300">
                      <div className="border-t border-gray-200 pt-6">
                        <div className="prose prose-blue max-w-none">
                          <p className="text-gray-700 leading-relaxed text-lg">{faq.answer}</p>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {faq.tags.map((tag, index) => (
                              <span key={index} className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            Was this helpful? 👍
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <HelpCircle className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No questions found</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                We couldn't find any questions matching your search. Try different keywords or contact us directly for personalized assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
                  variant="outline"
                  className="border-blue-300 text-blue-600 hover:bg-blue-50"
                >
                  Clear Search
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
                  Ask a Question
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-indigo-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Still Need 
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Personal Guidance?
              </span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Get expert advice tailored to your unique situation. I'm here to help you navigate 
              the world of life insurance and find the perfect policy for your family's future.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <MessageCircle className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Chat Support</h3>
              <p className="text-blue-100 text-sm">Get instant answers to your questions</p>
            </div>
            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <Phone className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Phone Consultation</h3>
              <p className="text-blue-100 text-sm">Speak directly with your LIC expert</p>
            </div>
            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <HelpCircle className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Policy Review</h3>
              <p className="text-blue-100 text-sm">Free analysis of your current coverage</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold"
            >
              <MessageCircle className="mr-3 h-6 w-6" />
              Start Chat Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white hover:bg-white hover:bg-gray-400 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold"
            >
              <Phone className="mr-3 h-6 w-6" />
              Call +91 98765 43210
            </Button>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-blue-200 text-sm">
              ⭐ Rated 4.9/5 by 500+ satisfied clients | 📞 Available 24/7 | 🔒 Trusted LIC Agent
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;