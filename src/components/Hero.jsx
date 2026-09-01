import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Sparkles, Cpu, ArrowUpRight, Briefcase } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import HeroRobotShowcase from './HeroRobotShowcase';

export default function Hero({ onOpenBooking, theme = 'dark' }) {
  // Dynamic Word Cycling Animation
  const targetWords = ["Startups.", "Enterprises.", "Visionaries."];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [animateWord, setAnimateWord] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimateWord(false);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % targetWords.length);
        setAnimateWord(true);
      }, 350);
    }, 2400);

    return () => clearInterval(timer);
  }, [targetWords.length]);

  const isLight = theme === 'light';

  return (
    <section id="home" className={`hero-section relative w-full max-w-full flex flex-col justify-center overflow-hidden pt-20 sm:pt-24 pb-4 sm:pb-8 select-none transition-colors duration-500 ${isLight ? 'bg-white text-slate-900' : 'bg-[#050B17] text-white'
      }`}>

      {/* Subtle Ambient Background Video Layer */}
      <video
        autoPlay
        loop
        muted={true}
        playsInline={true}
        webkit-playsinline="true"
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-30 pointer-events-none"
      >
        <source src="/tu_video_banvala_tyat_header_r.mp4" type="video/mp4" />
        <source src="/we_build_wala_hero_section_hai.mp4" type="video/mp4" />
      </video>

      {/* Subtle Video Theme Overlay */}
      <div className={`absolute top-0 left-0 w-full h-full backdrop-blur-[1px] z-0 pointer-events-none ${isLight ? 'bg-white/50' : 'bg-[#050B17]/75'
        }`}></div>

      {/* Subtle Ambient Radial Glow Points */}
      <div className={`absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full filter blur-[160px] pointer-events-none z-0 ${isLight ? 'bg-sky-200/40' : 'bg-[#0088FF]/15'
        }`}></div>

      {/* Hero Content Canvas - 2-Column Side-by-Side Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">

          {/* LEFT COLUMN: WE BUILD DIGITAL ECOSYSTEMS TYPOGRAPHY */}
          <div className="lg:col-span-6 text-left space-y-4 sm:space-y-6">

            {/* Headline ("We Build Digital Ecosystems.") */}
            <motion.h2
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`font-heading text-2xl xs:text-3xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-snug sm:leading-[1.08] ${isLight ? 'text-slate-900' : 'text-white'
                }`}
            >
              We Build Digital <br />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#0088FF] via-[#3B82F6] to-[#2563EB] font-bold">
                Ecosystems.
              </span>
            </motion.h2>

            {/* Static FOR + Animated Flipping Words */}
            <div className="flex items-center gap-2.5 sm:gap-3 h-10 sm:h-12 overflow-hidden">
              <span className={`font-heading font-semibold text-[10px] sm:text-sm uppercase tracking-widest px-3 py-1 sm:px-4 sm:py-1.5 rounded-full shadow-sm shrink-0 border ${isLight ? 'bg-white border-sky-200 text-[#0088FF]' : 'bg-[#0B172E]/90 border-[#1E3A8A] text-[#3B82F6]'
                }`}>
                FOR
              </span>
              <span
                className={`font-heading font-bold text-2xl xs:text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#0088FF] via-[#3B82F6] to-[#2563EB] transition-all duration-400 transform ${animateWord
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 -translate-y-6 scale-90'
                  }`}
              >
                {targetWords[currentWordIndex]}
              </span>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-xs xs:text-sm sm:text-lg font-normal leading-relaxed max-w-xl ${isLight ? 'text-slate-600' : 'text-[#94A3B8]'
                }`}
            >
              We design, build and scale living digital products — ERP, CRM, web, mobile, cloud and growth, engineered as one ecosystem.
            </motion.p>

            {/* Action Buttons ("Start a project ↗" & "See the work") */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-row flex-wrap items-center gap-2.5 sm:gap-4 pt-1 sm:pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -8px rgba(37, 99, 235, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenBooking}
                className="group flex items-center gap-1.5 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white font-bold text-[10px] sm:text-xs uppercase tracking-wider px-4 py-2.5 sm:px-6 sm:py-3 rounded-full shadow-lg shadow-[#2563EB]/30 transition-all cursor-pointer shrink-0"
              >
                <span>Start a project</span>
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#portfolio"
                className={`flex items-center gap-1.5 font-bold text-[10px] sm:text-xs uppercase tracking-wider px-4 py-2.5 sm:px-6 sm:py-3 rounded-full transition-all shadow-md border shrink-0 ${isLight
                  ? 'bg-white/90 backdrop-blur-md border-slate-200 hover:bg-slate-50 text-slate-800'
                  : 'bg-[#0B172E]/80 backdrop-blur-md border-[#1E3A8A] hover:bg-[#1E3A8A]/50 text-white'
                  }`}
              >
                <Briefcase className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#3B82F6]" />
                <span>See the work</span>
              </motion.a>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: 3D ROBOT SHOWCASE WITH VOICE ASSISTANT */}
          <div className="lg:col-span-6 flex items-center justify-center relative w-full">
            <HeroRobotShowcase theme={theme} onOpenBooking={onOpenBooking} />
          </div>

        </div>

      </div>
    </section>
  );
}
