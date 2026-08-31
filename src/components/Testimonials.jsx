import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, CheckCircle2, TrendingUp, Zap, ShieldCheck, Star, Building2 } from 'lucide-react';

export default function Testimonials({ theme = 'light' }) {
  const isLight = theme === 'light';
  const [activeCategory, setActiveCategory] = useState('all');

  const categoryTabs = [
    { id: 'all', label: 'All Stories' },
    { id: 'erp', label: 'Enterprise ERP' },
    { id: 'crm', label: 'Custom CRM' },
    { id: 'cloud', label: 'Cloud & DevOps' }
  ];

  const metricsData = [
    { value: '99.9%', label: 'System Uptime Guarantee', icon: ShieldCheck },
    { value: '+140%', label: 'Avg Client Revenue Growth', icon: TrendingUp },
    { value: '40%', label: 'Faster Time to Market', icon: Zap },
    { value: '15+', label: 'Enterprise Ecosystems', icon: Building2 }
  ];

  const testimonialsList = [
    {
      id: 1,
      category: 'erp',
      name: "Rajesh Kumar",
      title: "CTO, LogiTech Systems",
      comment: "NexAlliance built our custom ERP module in record time. Our inventory tracking speed improved by 40% immediately, streamlining our supply chain operations across 12 hubs.",
      metric: "+140% Revenue Growth",
      stat: "40% Faster Inventory Speed",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      featured: true,
      company: "LogiTech Systems"
    },
    {
      id: 2,
      category: 'crm',
      name: "Priya Sharma",
      title: "Head of Operations, FinEdge",
      comment: "Their MERN stack expertise is unmatched. The customer portal they designed handles thousands of real-time transactions seamlessly without latency.",
      metric: "99.9% Real-Time Scalability",
      stat: "10K+ Daily Transactions",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      featured: false,
      company: "FinEdge Solutions"
    },
    {
      id: 3,
      category: 'cloud',
      name: "Vikram Patel",
      title: "Founder, Enterprise SaaS",
      comment: "From cloud infrastructure setup to automated CI/CD pipelines, NexAlliance proved to be the reliable engineering partner our startup required.",
      metric: "10x Automated CI/CD Velocity",
      stat: "Zero Downtime Deployments",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      featured: false,
      company: "Enterprise SaaS"
    }
  ];

  const filteredTestimonials = activeCategory === 'all'
    ? testimonialsList
    : testimonialsList.filter(t => t.category === activeCategory);

  const featuredCard = filteredTestimonials.find(t => t.featured) || filteredTestimonials[0] || testimonialsList[0];
  const sideCards = filteredTestimonials.filter(t => t.id !== featuredCard.id);

  return (
    <section className={`py-12 sm:py-20 transition-colors duration-500 border-y relative overflow-hidden select-none ${
      isLight ? 'bg-gradient-to-b from-[#F0F6FF] via-[#E8F2FF] to-[#F0F6FF] border-sky-200 text-slate-900' : 'bg-[#050B17] border-[#1E3A8A] text-white'
    }`}>
      
      {/* Background Soft Moving Ambient Blue Radial Glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#0088FF]/15 rounded-full filter blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-400/15 rounded-full filter blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0088FF]">
            CLIENT SUCCESS STORIES
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Trusted By Founders & <span className="text-[#0088FF]">Enterprise Leaders</span>
          </h2>
          <p className="text-xs sm:text-base font-semibold text-slate-600 max-w-xl mx-auto leading-relaxed">
            See how our tailored ERP, CRM, and cloud engineering solutions drive real-world business results.
          </p>

          {/* Interactive Testimonial Switcher Tabs */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 pt-3 flex-wrap">
            {categoryTabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0088FF] text-white shadow-md shadow-sky-500/25 scale-105'
                      : 'bg-white/80 text-slate-600 hover:bg-white hover:text-[#0088FF] border border-sky-200/80'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Key Metrics / Logos Interactive Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {metricsData.map((m, idx) => {
            const IconComp = m.icon;
            return (
              <div
                key={idx}
                className="bg-white/90 backdrop-blur-xl border border-sky-200/80 rounded-2xl p-4 sm:p-5 shadow-lg shadow-sky-500/5 hover:border-[#0088FF] hover:shadow-xl transition-all duration-300 flex items-center gap-3.5 group transform-gpu hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-100/80 text-[#0088FF] border border-sky-200 flex items-center justify-center shrink-0 group-hover:bg-[#0088FF] group-hover:text-white transition-all">
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-heading text-lg sm:text-xl font-black text-[#0088FF] tracking-tight">
                    {m.value}
                  </div>
                  <div className="text-[11px] font-bold text-slate-600 leading-tight">
                    {m.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bento Grid Layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch"
          >
            {/* FEATURED BENTO CARD (8 cols) */}
            <div className="lg:col-span-8 bg-white/95 backdrop-blur-xl border-2 border-sky-300/80 hover:border-[#0088FF] rounded-3xl p-6 sm:p-8 shadow-xl shadow-sky-500/10 hover:shadow-2xl hover:shadow-sky-500/20 transition-all duration-300 flex flex-col justify-between group transform-gpu hover:-translate-y-1.5 cursor-pointer relative overflow-hidden">
              
              {/* Top Row: Metric & Verified Badge */}
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#0088FF] bg-sky-100/90 border border-sky-300/80 px-4 py-2 rounded-2xl shadow-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>{featuredCard.metric}</span>
                  </span>

                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 border border-emerald-300/80 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Enterprise Impact</span>
                  </span>
                </div>

                <Quote className="w-10 h-10 text-[#0088FF]/30 group-hover:text-[#0088FF] transition-all" />

                <p className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed">
                  "{featuredCard.comment}"
                </p>
              </div>

              {/* Bottom Row: Client Info */}
              <div className="pt-6 mt-6 border-t border-sky-100 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={featuredCard.avatar}
                    alt={featuredCard.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#0088FF] shadow-md"
                  />
                  <div>
                    <h3 className="font-heading font-black text-base text-slate-900 group-hover:text-[#0088FF] transition-colors">
                      {featuredCard.name}
                    </h3>
                    <p className="text-xs font-bold text-slate-500">
                      {featuredCard.title}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-amber-400 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 text-xs font-bold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-slate-700 ml-1">5.0</span>
                </div>
              </div>
            </div>

            {/* COMPLEMENTARY BENTO CARDS (4 cols stacked) */}
            <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-8">
              {sideCards.map((item) => (
                <div
                  key={item.id}
                  className="flex-1 bg-white/95 backdrop-blur-xl border-2 border-sky-300/80 hover:border-[#0088FF] rounded-3xl p-6 shadow-xl shadow-sky-500/10 hover:shadow-2xl hover:shadow-sky-500/20 transition-all duration-300 flex flex-col justify-between group transform-gpu hover:-translate-y-1.5 cursor-pointer relative overflow-hidden"
                >
                  <div className="space-y-3">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0088FF] bg-sky-100 px-3 py-1 rounded-full border border-sky-200 inline-block">
                      {item.metric}
                    </span>

                    <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
                      "{item.comment}"
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-sky-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-[#0088FF] shadow-sm"
                      />
                      <div>
                        <h4 className="font-heading font-black text-xs sm:text-sm text-slate-900 group-hover:text-[#0088FF] transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-[11px] font-bold text-slate-500">
                          {item.company}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
