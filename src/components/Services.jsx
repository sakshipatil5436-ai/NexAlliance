"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Database, Users, Globe, Smartphone, Cloud, TrendingUp, ArrowRight, CheckCircle2, Zap, ShieldCheck, Bot, Cpu, Radio, Code, Layers } from 'lucide-react';

export default function Services({ onOpenBooking, onOpenServiceDetail, theme = 'dark', isHomePage = false }) {
  const sectionRef = useRef(null);
  const isLight = theme === 'light';

  // Scroll Progress for drawing the river path
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 40%", "end 90%"]
  });

  const pathProgress = useTransform(scrollYProgress, [0.02, 0.95], [0, 1]);

  const smoothPathLength = useSpring(pathProgress, {
    stiffness: 120,
    damping: 22,
    restDelta: 0.001
  });

  const headerContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.05
      }
    }
  };

  const headerItemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Services Content List
  const servicesList = [
    {
      id: "ai-automation",
      title: "AI Automation",
      description: "Intelligent AI agents, workflow automation, and LLM integrations that compound team velocity.",
      tags: ["AI Agents", "Workflow Automation", "LLM Integration"],
      icon: Bot,
      gradient: "from-[#0088FF] to-[#2563EB]",
      status: "AI DRIVEN",
      highlightText: "Intelligent Multi-Agent System Automation",
      features: [
        "Autonomous AI Agent Pipelines",
        "Custom LLM Fine-Tuning",
        "RAG & Vector Database Search",
        "Auto-Executing Workflows"
      ]
    },
    {
      id: "saas-development",
      title: "SaaS Product Development",
      description: "End-to-end multi-tenant SaaS platforms engineered for global scale, security, and ARR growth.",
      tags: ["Multi-Tenant Architecture", "Subscription Billing"],
      icon: Layers,
      gradient: "from-cyan-500 to-indigo-600",
      status: "SCALE READY",
      highlightText: "Scalable Enterprise SaaS Platform",
      features: [
        "Multi-Tenant Tenant Isolation",
        "Stripe & Razorpay Billing",
        "Real-Time Executive Dashboards",
        "Global Edge CDN Acceleration"
      ]
    },
    {
      id: "enterprise-erp",
      title: "Enterprise ERP Solutions",
      description: "Custom ERP systems that consolidate finance, inventory, HR, procurement, and reporting into a single source of truth.",
      tags: ["Multi-Warehouse Sync", "Automated Payroll"],
      icon: Database,
      gradient: "from-[#0088FF] to-[#00C6FF]",
      status: "ENTERPRISE GRADE",
      highlightText: "Single Source of Truth Operations",
      features: [
        "Real-Time Inventory & Multi-Warehouse Sync",
        "Automated HR Management & Payroll",
        "Accounting & Invoicing Automation",
        "Executive BI Dashboards & Forecasts"
      ]
    },
    {
      id: "custom-crm",
      title: "Custom CRM Platforms",
      description: "Turn customer touchpoints into revenue with lead capture, deal pipelines, and automated client follow-ups.",
      tags: ["Lead Scoring", "Visual Pipelines"],
      icon: Users,
      gradient: "from-blue-600 to-teal-500",
      status: "HIGH CONVERSION",
      highlightText: "360° Omnichannel Client Intelligence",
      features: [
        "Lead Capture, Enrichment & AI Scoring",
        "Visual Multi-Stage Sales Pipelines",
        "Customer Support & Ticketing Portals",
        "Automated Drip & Nurture Campaigns"
      ]
    },
    {
      id: "web-engineering",
      title: "Web Engineering",
      description: "High-performance web applications, PWAs, and enterprise portals built for sub-second load times.",
      tags: ["React & Next.js", "PWA Applications"],
      icon: Globe,
      gradient: "from-cyan-500 to-blue-600",
      status: "SUB-SECOND SPEED",
      highlightText: "Core Web Vitals 98+ Optimized",
      features: [
        "Enterprise Web Applications & PWAs",
        "Custom SaaS Multi-Tenant Products",
        "Core Web Vitals 95+ Score Optimization",
        "SEO-First Semantic Layouts"
      ]
    },
    {
      id: "mobile-ecosystems",
      title: "Mobile Ecosystems",
      description: "Native iOS and Android mobile apps with 60fps animations, biometric security, and offline-first sync.",
      tags: ["iOS & Android Native", "Flutter Cross-Platform"],
      icon: Smartphone,
      gradient: "from-indigo-500 to-[#0088FF]",
      status: "NATIVE VELOCITY",
      highlightText: "4.9★ Rated Mobile User Experience",
      features: [
        "Native iOS & Android Applications",
        "Cross-Platform Flutter & React Native",
        "Biometric Security & Encrypted Storage",
        "Offline-First Local DB Synchronization"
      ]
    }
  ];

  return (
    <section ref={sectionRef} id="services" className={`scroll-mt-20 pt-24 sm:pt-32 pb-20 select-none relative overflow-hidden ${isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#030712] text-white'}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-24 relative z-10">

        {/* 1. HERO HEADER AREA */}
        <motion.div
          variants={headerContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-50px" }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <motion.div variants={headerItemVariants}>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0088FF]">
              OUR SERVICES & ECOSYSTEMS
            </span>
          </motion.div>

          <motion.h2
            variants={headerItemVariants}
            className="font-heading text-3xl sm:text-5xl font-bold tracking-tight leading-tight"
          >
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0088FF] via-cyan-400 to-[#2563EB]">Growth Engines</span> For Modern Enterprises.
          </motion.h2>

          <motion.p
            variants={headerItemVariants}
            className={`text-sm sm:text-base font-normal leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}
          >
            We build modular digital infrastructure designed for velocity, security, and long-term compounding growth.
          </motion.p>
        </motion.div>

        {/* 3D Glowing River Path (SHOWN ONLY ON HOME PAGE /) */}
        {isHomePage && (
          <div className="absolute top-[260px] bottom-36 left-0 right-0 w-full pointer-events-none z-0 hidden lg:block overflow-visible">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 1000 2000"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background Faint Track */}
              <path
                d="M 270 70 C 750 200, 250 280, 730 410 C 250 540, 750 620, 270 750 C 750 880, 250 960, 730 1090 C 250 1220, 750 1300, 270 1430 C 750 1560, 250 1640, 730 1770"
                stroke="rgba(0, 136, 255, 0.18)"
                strokeWidth="4"
                strokeDasharray="8 6"
              />
              {/* Animated Active Glowing Blue Line Connecting Box to Box */}
              <motion.path
                d="M 270 70 C 750 200, 250 280, 730 410 C 250 540, 750 620, 270 750 C 750 880, 250 960, 730 1090 C 250 1220, 750 1300, 270 1430 C 750 1560, 250 1640, 730 1770"
                stroke="url(#blueRiverGradient)"
                strokeWidth="6"
                strokeLinecap="round"
                style={{ pathLength: smoothPathLength }}
                className="filter drop-shadow-[0_0_12px_rgba(0,136,255,0.9)]"
              />
              <defs>
                <linearGradient id="blueRiverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0088FF" stopOpacity="1" />
                  <stop offset="50%" stopColor="#00F0FF" stopOpacity="1" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0.95" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )}

        {/* 2. SERVICES STACK (ZIG-ZAG ALTERNATING CARDS - LEFT & RIGHT) */}
        <div className="space-y-12 sm:space-y-16 relative z-10 w-full">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: isLeft ? -30 : 30, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3 }}
                className={`w-full lg:w-[46%] ${isLeft ? 'lg:mr-auto lg:ml-0' : 'lg:ml-auto lg:mr-0'} p-5 sm:p-6 rounded-2xl border relative overflow-hidden backdrop-blur-xl transition-all duration-300 text-left space-y-3.5 ${isLight
                  ? 'bg-white border-slate-200/80 shadow-md hover:shadow-xl'
                  : 'bg-[#0B132B]/90 border-[#1E3A8A]/70 shadow-xl shadow-blue-950/50'
                  }`}
              >
                {/* Header: 3D Glossy Sphere Ball Icon + Status Tag + Title */}
                <div className="flex items-center justify-between gap-3 border-b pb-3 border-slate-200/60 dark:border-slate-800">
                  <div className="flex items-center gap-3.5">
                    {/* 3D Glossy Sphere Ball Icon Badge with Spinning Orbit Ring */}
                    <div className="relative shrink-0">
                      <div className="absolute -inset-2.5 rounded-full border border-cyan-400/80 animate-[spin_5s_linear_infinite] pointer-events-none">
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#00F0FF] absolute -top-1 left-1/2 -translate-x-1/2" />
                      </div>

                      <div className="w-12 h-12 rounded-full flex flex-col items-center justify-center bg-gradient-to-tr from-[#0088FF] via-[#0077E6] to-[#2563EB] text-white shrink-0 relative overflow-hidden transition-all duration-300 shadow-[0_10px_25px_rgba(0,136,255,0.45),_inset_0_-6px_12px_rgba(0,0,0,0.5),_inset_0_3px_8px_rgba(255,255,255,0.8)] border border-white/70">
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-3 rounded-t-full bg-white/50 filter blur-[0.5px] pointer-events-none" />
                        <Icon className="w-6 h-6 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] relative z-10" />
                      </div>
                    </div>

                    <div>
                      <span className="text-[9px] font-bold tracking-wider text-[#0088FF] uppercase block">
                        {service.status}
                      </span>
                      <h3 className="font-heading text-base sm:text-lg font-extrabold tracking-tight">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* 2 Lines Information Description */}
                <p className={`text-xs font-medium leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  {service.description}
                </p>

                {/* Features 2 Clean Highlight Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
                  {service.features.slice(0, 2).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0088FF] shrink-0" />
                      <span className={`text-[11px] font-semibold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer Tagline */}
                <div className="pt-2.5 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0088FF]">
                    <Zap className="w-3.5 h-3.5 shrink-0" />
                    <span>{service.highlightText}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Compact CTA Banner at Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl sm:rounded-3xl py-6 sm:py-8 px-6 sm:px-10 relative overflow-hidden bg-gradient-to-r from-[#0088FF] via-[#0077E6] to-[#2563EB] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 max-w-3xl mx-auto"
        >
          <div className="space-y-1 relative z-10 text-center md:text-left max-w-xl">
            <h3 className="font-heading text-base sm:text-xl font-bold tracking-tight">
              Ready to architect your custom growth engine?
            </h3>
            <p className="text-xs text-sky-100 font-medium">
              Book a 30-minute technical consultation with our engineering leaders today.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <button
              onClick={onOpenBooking}
              className="bg-white hover:bg-slate-100 text-[#0088FF] font-black text-xs uppercase tracking-wider px-5 py-2.5 rounded-full shadow-md transition-all hover:scale-105 cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>Schedule Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
