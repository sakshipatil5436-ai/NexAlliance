"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Users, Globe, Smartphone, Layers, Palette, Cloud, TrendingUp, ArrowRight } from 'lucide-react';

export default function Futuristic3DPuzzleShowcase({ onOpenServiceDetail, theme = 'dark', isHomePage = false }) {
  const containerRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(isHomePage);
  const [stage, setStage] = useState(isHomePage ? 2 : 0);

  const isLight = theme === 'light';

  useEffect(() => {
    // If rendered on Home Page overview, display the clean UI cards directly without falling down animation
    if (isHomePage) return;

    let ticking = false;
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el || hasAnimated || ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        const currentEl = containerRef.current;
        if (currentEl && !hasAnimated) {
          const rect = currentEl.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Starts ONLY when user has scrolled down (scrollY > 150) AND Services section is visible in viewport
          if (window.scrollY > 150 && rect.top < windowHeight * 0.75 && rect.bottom > 0) {
            setHasAnimated(true);
            setStage(0);
            setTimeout(() => setStage(1), 1200); // Stage 1: 3D puzzle interlocking weave (1.2s)
            setTimeout(() => setStage(2), 2800); // Stage 2: Morphing into 8 UI service cards (2.8s)
          }
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasAnimated, isHomePage]);

  const puzzlePieces = [
    {
      id: "erp",
      title: "ERP Solutions",
      desc: "Unified operations from finance to inventory.",
      tags: ["Inventory Management", "HR Management", "Accounting & Finance", "Procurement"],
      icon: Database,
      color: "from-[#0088FF] to-[#2563EB]",
      glowColor: "rgba(0, 136, 255, 0.3)",
      initialPos: { x: -120, y: -280, rotateZ: -20, scale: 1.15 }
    },
    {
      id: "crm",
      title: "CRM Systems",
      desc: "Close more revenue with intelligent pipelines.",
      tags: ["Lead Management", "Sales Automation", "Customer Support", "Reporting & Forecasting"],
      icon: Users,
      color: "from-sky-500 to-indigo-600",
      glowColor: "rgba(0, 240, 255, 0.3)",
      initialPos: { x: 120, y: -300, rotateZ: 25, scale: 1.15 }
    },
    {
      id: "web",
      title: "Web Development",
      desc: "Performant web products engineered to scale.",
      tags: ["Corporate Websites", "Customer Portals", "SaaS Products", "Ecommerce"],
      icon: Globe,
      color: "from-blue-600 to-cyan-400",
      glowColor: "rgba(59, 130, 246, 0.3)",
      initialPos: { x: -180, y: -260, rotateZ: 35, scale: 1.1 }
    },
    {
      id: "mobile",
      title: "Mobile App Development",
      desc: "Native-feeling apps for iOS and Android.",
      tags: ["Android", "iOS", "Flutter", "React Native"],
      icon: Smartphone,
      color: "from-indigo-500 to-blue-400",
      glowColor: "rgba(6, 182, 212, 0.3)",
      initialPos: { x: 180, y: -270, rotateZ: -30, scale: 1.1 }
    },
    {
      id: "uiux",
      title: "UI/UX Design",
      desc: "Research-led design that moves business metrics.",
      tags: ["User Research", "Wireframes", "Interactive Prototypes", "Design Systems"],
      icon: Layers,
      color: "from-cyan-500 to-[#0088FF]",
      glowColor: "rgba(0, 136, 255, 0.3)",
      initialPos: { x: -90, y: -320, rotateZ: -12, scale: 1.2 }
    },
    {
      id: "graphics",
      title: "Graphics Design",
      desc: "Visual identity that makes your brand unmistakable.",
      tags: ["Branding", "Logo Design", "Social Media Creatives", "Marketing Materials"],
      icon: Palette,
      color: "from-[#2563EB] to-cyan-400",
      glowColor: "rgba(59, 130, 246, 0.3)",
      initialPos: { x: 90, y: -330, rotateZ: 18, scale: 1.2 }
    },
    {
      id: "cloud",
      title: "Cloud Solutions",
      desc: "Cloud architecture engineered for scale and resilience.",
      tags: ["Azure", "AWS", "Google Cloud", "CI/CD & DevOps"],
      icon: Cloud,
      color: "from-blue-500 to-sky-400",
      glowColor: "rgba(99, 102, 241, 0.3)",
      initialPos: { x: -150, y: -290, rotateZ: -18, scale: 1.15 }
    },
    {
      id: "digital",
      title: "Digital Marketing",
      desc: "Performance marketing that compounds month over month.",
      tags: ["SEO", "Google Ads", "Social Media Marketing", "Performance Marketing"],
      icon: TrendingUp,
      color: "from-cyan-400 to-[#2563EB]",
      glowColor: "rgba(0, 240, 255, 0.3)",
      initialPos: { x: 150, y: -310, rotateZ: 22, scale: 1.15 }
    }
  ];

  return (
    <div ref={containerRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 select-none">

      {/* 3D PUZZLE CONTAINER BOX */}
      <div className={`relative rounded-3xl p-6 sm:p-10 overflow-hidden border shadow-2xl transition-all duration-700 ${isLight
        ? 'bg-gradient-to-b from-sky-50/80 via-white to-sky-50/40 border-sky-200/80 shadow-sky-500/5'
        : 'bg-gradient-to-b from-[#0A0A0C] via-[#121215] to-[#0A0A0C] border-slate-800/80 shadow-2xl'
        }`}>

        {/* Subtle Background Texture Layer */}
        <div className="absolute inset-0 opacity-15 mix-blend-screen pointer-events-none">
          <img
            src="/futuristic_3d_puzzle_services.webp"
            alt="3D Holographic Matrix"
            className="w-full h-full object-cover"
          />
        </div>

        {/* STAGE 0 & STAGE 1: CINEMATIC 3D PUZZLE FALLING & WEAVING CANVAS */}
        <div className="relative min-h-[380px] sm:min-h-[440px] flex items-center justify-center perspective-[1200px] z-10">

          <AnimatePresence mode="wait">
            {stage < 2 ? (
              <motion.div
                key="puzzle-stage"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95, y: 15, filter: "blur(6px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-3xl h-80 flex items-center justify-center"
              >
                {/* Subtle Geometric Core Blueprint */}
                <div className="absolute w-72 h-72 rounded-full border border-dashed border-[#0088FF]/20 animate-spin-slow flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-48 rounded-full border border-sky-400/15"></div>
                </div>

                {/* 3D Puzzle Pieces Falling, Interlocking & Weaving */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10 w-full">
                  {puzzlePieces.map((piece, idx) => {
                    const Icon = piece.icon;
                    return (
                      <motion.div
                        key={piece.id}
                        initial={{
                          x: piece.initialPos.x,
                          y: piece.initialPos.y,
                          rotateZ: piece.initialPos.rotateZ,
                          scale: piece.initialPos.scale,
                          opacity: 0
                        }}
                        animate={
                          stage === 0
                            ? {
                              x: 0,
                              y: 0,
                              rotateZ: 0,
                              scale: 1,
                              opacity: 1
                            }
                            : {
                              // Requirement 3: Unique Interlocking & Weaving in Stage 1
                              x: [0, (idx % 2 === 0 ? -4 : 4), 0],
                              y: [0, -6, 0],
                              rotateZ: [0, (idx % 2 === 0 ? 3 : -3), 0],
                              scale: [1, 1.04, 1],
                              opacity: 1
                            }
                        }
                        transition={{
                          type: "spring",
                          stiffness: stage === 0 ? 110 : 180,
                          damping: stage === 0 ? 18 : 14,
                          delay: stage === 0 ? idx * 0.12 : idx * 0.05
                        }}
                        className={`group relative p-4 rounded-2xl border backdrop-blur-md shadow-md flex flex-col items-center text-center cursor-pointer transition-all duration-500 ${isLight
                          ? 'bg-white/90 border-sky-200/90 text-slate-900 shadow-sky-500/5'
                          : 'bg-[#141418]/90 border-slate-800/90 text-white shadow-lg shadow-black/40'
                          }`}
                        style={{
                          // Requirement 2: Soft, elegant subtle glow (no harsh flashes)
                          boxShadow: stage === 1 ? `0 0 16px ${piece.glowColor}` : 'none'
                        }}
                      >
                        {/* Top & Side Subtle Puzzle Interlocking Joints */}
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-2 bg-[#0088FF]/70 rounded-t-full shadow-sm"></div>
                        <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-2 h-4 bg-[#0088FF]/70 rounded-l-full shadow-sm"></div>

                        {/* Icon Badge with Soft Accent Gradient */}
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${piece.color} text-white flex items-center justify-center shadow-md mb-2 group-hover:scale-105 transition-transform duration-300`}>
                          <Icon className="w-5 h-5" />
                        </div>

                        <h4 className="font-heading font-black text-xs tracking-wider uppercase mb-1 truncate w-full">
                          {piece.title}
                        </h4>

                        {/* Status Indicator */}
                        <div className="mt-1 inline-flex items-center gap-1 text-[9px] font-bold text-[#0088FF] uppercase tracking-widest">
                          <span>{stage === 0 ? 'FITTING...' : 'INTERLOCKED'}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ) : (

              /* STAGE 2: SETTLING & MORPHING INTO ALL 8 SERVICES UI CARDS WITH SCROLL VIEW */
              <motion.div
                key="services-morphed-stage"
                initial={{ opacity: 0, scale: 0.96, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                {/* Scrollable Container Box for All 8 Services Cards (Hidden Scrollbar, Smooth Scrolling) */}
                <div className="max-h-[580px] overflow-y-auto scrollbar-none p-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {puzzlePieces.map((service, idx) => {
                      const Icon = service.icon;
                      const col = idx % 3;

                      // Directional Motion: Left column from LEFT, Center column from TOP to BOTTOM, Right column from RIGHT
                      const initialPos = col === 0 ? { opacity: 0, x: -90, scale: 0.85 } : col === 1 ? { opacity: 0, y: -110, scale: 0.85 } : { opacity: 0, x: 90, scale: 0.85 };

                      return (
                        <motion.div
                          key={service.id}
                          onClick={() => onOpenServiceDetail && onOpenServiceDetail(service.id)}
                          initial={initialPos}
                          whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ type: "spring", stiffness: 100, damping: 15, delay: idx * 0.08 }}
                          whileHover={{ scale: 1.03, y: -4 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-6 rounded-[24px] border-0 shadow-lg hover:shadow-2xl backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer ${isLight
                            ? 'bg-white/85 text-slate-900 shadow-sky-500/10 hover:shadow-sky-500/20 hover:bg-white'
                            : 'bg-[#141418]/90 text-white shadow-2xl hover:shadow-cyan-500/15 hover:bg-[#141418]'
                            }`}
                        >
                          <div>
                            {/* Blue Circular Icon Badge matching original design (No Images Used) */}
                            <div className="w-12 h-12 rounded-full bg-[#0088FF] text-white flex items-center justify-center shadow-md shadow-sky-500/20 mb-5 group-hover:scale-105 transition-transform duration-300">
                              <Icon className="w-6 h-6" />
                            </div>

                            {/* Title & Description */}
                            <h3 className={`font-heading font-black text-xl mb-2 group-hover:text-[#0088FF] transition-colors ${isLight ? 'text-slate-900' : 'text-white'
                              }`}>
                              {service.title}
                            </h3>

                            <p className={`text-xs font-semibold leading-relaxed mb-5 ${isLight ? 'text-slate-600' : 'text-slate-400'
                              }`}>
                              {service.desc}
                            </p>

                            {/* Sub-Capabilities Pills Grid */}
                            <div className="flex flex-wrap gap-2 mb-6">
                              {service.tags.map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className={`text-[11px] font-semibold px-3 py-1 rounded-full border transition-all ${isLight
                                    ? 'bg-sky-50/80 border-sky-100 text-slate-700 group-hover:border-sky-200'
                                    : 'bg-[#0A0A0C] border-slate-800 text-slate-300 group-hover:border-slate-700'
                                    }`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Learn More -> Link */}
                          <div className="pt-3 border-t border-slate-200/50 flex items-center gap-1.5 text-xs font-black text-[#0088FF] group-hover:translate-x-1 transition-transform">
                            <span>Learn more</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>

                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}
