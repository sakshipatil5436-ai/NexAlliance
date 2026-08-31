import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  Building2,
  Users,
  Award,
  Globe2,
  Rocket,
  Code2,
  CheckCircle2,
  GitMerge,
  Cpu,
  Layers
} from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

export default function AboutSection({ onOpenBooking, theme = 'light', showFounders = true }) {
  const location = useLocation();

  const founders = [
    {
      name: "Meet Mistry",
      role: "Co-Founder · Business & Growth",
      desc: "Meet leads business development, sales, client relationships, and growth at NexAlliance. His focus is on understanding business challenges, creating meaningful client partnerships, and identifying opportunities where technology can drive measurable business growth.",
      image: "/meet_founder.webp"
    },
    {
      name: "Sanket Pithava",
      role: "Co-Founder · Technology & Innovation",
      desc: "Sanket leads technology, software development, and innovation at NexAlliance. His focus is on transforming complex requirements into scalable, reliable, and modern digital solutions.",
      image: "/sanket_founder.webp"
    }
  ];

  return (
    <section id="about" className="scroll-mt-20 pt-24 sm:pt-32 pb-20 bg-gradient-to-b from-[#F0F6FF] via-[#E8F2FF] to-[#F0F6FF] text-slate-900 select-none relative overflow-hidden">
      
      {/* Ambient Blue Glow Points */}
      <div className="absolute top-12 left-1/4 w-[600px] h-[600px] bg-[#0088FF]/15 rounded-full filter blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute bottom-20 right-1/4 w-[600px] h-[600px] bg-cyan-400/15 rounded-full filter blur-[140px] pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24 relative z-10">

        {/* 1. HERO HEADER AREA */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0088FF] flex items-center justify-center gap-2">
              <Cpu className="w-4 h-4" />
              <span>ABOUT NEXALLIANCE</span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-slate-900"
          >
            Two Founders. Two Journeys.{' '}
            <span className="text-[#0088FF]">
              One Vision.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-semibold"
          >
            Every great company begins with a vision. <strong className="text-slate-900 font-bold">NexAlliance</strong> began with two.
            Before NexAlliance, founders <strong className="text-[#0088FF] font-bold">Meet Mistry</strong> and <strong className="text-[#0088FF] font-bold">Sanket Pithava</strong> were independently building their own technology companies.
          </motion.p>
        </div>

        {/* 2. OUR STORY — SYSTEM ARCHITECTURE DIAGRAM LAYOUT */}
        <div id="our-story" className="scroll-mt-24 space-y-12 relative">

          <div className="text-center max-w-2xl mx-auto space-y-2 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0088FF] flex items-center justify-center gap-2">
              <Layers className="w-4 h-4" />
              <span>SYSTEM ARCHITECTURE DIAGRAM</span>
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
              The Evolution <span className="text-[#0088FF]">Architecture Diagram</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold">
              Visual pipeline showing how Meet.Nexus & Nexora converged into NexAlliance.
            </p>
          </div>

          {/* VISUAL ARCHITECTURE DIAGRAM CONTAINER */}
          <div className="relative max-w-5xl mx-auto space-y-10 sm:space-y-14 pt-4">
            
            {/* STAGE 1: TWO PARALLEL FOUNDER NODES (TOP LEVEL) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 relative z-10">
              
              {/* NODE A: MEET.NEXUS */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -4 }}
                className="bg-white/95 backdrop-blur-xl border-2 border-sky-300/80 hover:border-[#0088FF] rounded-3xl p-6 sm:p-7 shadow-xl shadow-sky-500/10 hover:shadow-2xl transition-all duration-300 relative space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0088FF] bg-sky-100 px-3 py-1 rounded-full border border-sky-300/80 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>10 FEBRUARY 2025</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">NODE_A</span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-[#0088FF] transition-colors">
                    Meet.Nexus <span className="text-xs text-slate-500 font-semibold block">(Meet Mistry)</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
                    Meet Mistry started Meet.Nexus focusing on practical client digital solutions, sales, business development, and client relationships.
                  </p>
                </div>

                {/* Sub Node: First Project */}
                <div className="pt-3 border-t border-sky-100 bg-sky-50/70 p-3 rounded-2xl border border-sky-200/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-[#0088FF] uppercase tracking-wider flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      <span>FIRST PROJECT: HOTEL HILTON TMS</span>
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600">DELIVERED</span>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-600">
                    Engineered task management software for hospitality client operations.
                  </p>
                </div>
              </motion.div>

              {/* NODE B: NEXORA */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white/95 backdrop-blur-xl border-2 border-sky-300/80 hover:border-[#0088FF] rounded-3xl p-6 sm:p-7 shadow-xl shadow-sky-500/10 hover:shadow-2xl transition-all duration-300 relative space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0088FF] bg-sky-100 px-3 py-1 rounded-full border border-sky-300/80 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>1 MARCH 2025</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">NODE_B</span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-[#0088FF] transition-colors">
                    Nexora <span className="text-xs text-slate-500 font-semibold block">(Sanket Pithava)</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
                    Sanket Pithava started Nexora focusing on software development, digital solutions, complex technology architecture, and technical innovation.
                  </p>
                </div>

                {/* Sub Node: First Project */}
                <div className="pt-3 border-t border-sky-100 bg-sky-50/70 p-3 rounded-2xl border border-sky-200/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-[#0088FF] uppercase tracking-wider flex items-center gap-1">
                      <Globe2 className="w-3 h-3" />
                      <span>FIRST PROJECT: BIHAR DISASTER SYSTEM</span>
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600">DELIVERED</span>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-600">
                    Developed technology-driven operational system for emergency resource management.
                  </p>
                </div>
              </motion.div>

            </div>

            {/* CONNECTING FLOW PIPELINE ANIMATION (BOTH STREAMS CONVERGE) */}
            <div className="flex flex-col items-center justify-center my-4 relative">
              <div className="w-1 h-12 bg-gradient-to-b from-[#0088FF] to-cyan-400 rounded-full animate-pulse" />
              <div className="w-8 h-8 rounded-full bg-[#0088FF] text-white flex items-center justify-center shadow-lg shadow-sky-500/40 border-2 border-white -mt-1 z-20">
                <GitMerge className="w-4 h-4" />
              </div>
            </div>

            {/* STAGE 2: CONVERGENCE GATEWAY (PROJECT PARTNERSHIP) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -3 }}
              className="max-w-3xl mx-auto bg-gradient-to-r from-sky-50 via-white to-sky-50 border-2 border-[#0088FF] rounded-3xl p-6 sm:p-8 shadow-2xl shadow-sky-500/15 relative space-y-3 text-center"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#0088FF] bg-sky-100 px-4 py-1.5 rounded-full border border-sky-300">
                  CONVERGENCE GATEWAY — PROJECT PARTNERSHIP
                </span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
                When Two Journeys Connected
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold max-w-2xl mx-auto">
                Working together on projects created an opportunity for both founders to combine their strengths. Meet brought business, sales, and growth strategy, while Sanket brought technology architecture and development execution.
              </p>
            </motion.div>

            {/* FINAL PIPELINE DOWNWARD */}
            <div className="flex flex-col items-center justify-center my-4 relative">
              <div className="w-1 h-12 bg-gradient-to-b from-cyan-400 to-[#0088FF] rounded-full animate-pulse" />
              <div className="w-8 h-8 rounded-full bg-[#0088FF] text-white flex items-center justify-center shadow-lg shadow-sky-500/40 border-2 border-white -mt-1 z-20">
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </div>
            </div>

            {/* STAGE 3: SYSTEM APEX NODE (NEXALLIANCE OFFICIALLY BORN) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.01 }}
              className="max-w-3xl mx-auto bg-gradient-to-br from-[#0088FF] via-[#0077E6] to-blue-700 text-white rounded-3xl p-8 sm:p-10 shadow-2xl shadow-sky-500/30 text-center space-y-4 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full filter blur-3xl pointer-events-none" />
              
              <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30 text-xs font-extrabold uppercase tracking-widest text-white shadow-sm">
                SYSTEM APEX · 26 JULY 2026
              </div>

              <h2 className="font-heading text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                The Birth of NexAlliance
              </h2>

              <p className="text-sm sm:text-base font-semibold text-sky-100 max-w-xl mx-auto leading-relaxed">
                Officially established by Meet Mistry & Sanket Pithava — uniting two independent companies, real-world projects, and one shared vision.
              </p>

              <div className="pt-4 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider text-sky-200 border-t border-white/20">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>One Vision. Built Together.</span>
              </div>
            </motion.div>

          </div>

        </div>

        {/* 3. STANDALONE MINIMALIST LEADERSHIP SECTION */}
        {showFounders && (
          <div className="space-y-10 pt-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="text-center space-y-2"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-[#0088FF]">LEADERSHIP</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
                Meet the Alliance Founders
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
              {founders.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="flex items-start space-x-4 text-left p-6 sm:p-7 rounded-3xl bg-white/95 border-2 border-sky-300/80 hover:border-[#0088FF] shadow-xl shadow-sky-500/10 hover:shadow-2xl transition-all duration-300 transform-gpu"
                >
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={f.image}
                    alt={f.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-[#0088FF] shadow-md shrink-0"
                  />
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900">
                      {f.name}
                    </h3>
                    <p className="text-xs font-extrabold text-[#0088FF] uppercase tracking-wider">{f.role}</p>
                    <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                      {f.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* 4. MINIMALIST METRICS SUMMARY */}
        <div className="py-8 px-6 sm:px-10 rounded-3xl bg-white/95 border-2 border-sky-300/80 shadow-xl shadow-sky-500/10 backdrop-blur-xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="space-y-1">
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0088FF]">
                <AnimatedCounter end={20} suffix="+" duration={1800} />
              </div>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Projects Delivered</span>
            </div>

            <div className="space-y-1">
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0088FF]">
                <AnimatedCounter end={99} suffix="%" duration={1800} />
              </div>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Client Retention</span>
            </div>

            <div className="space-y-1">
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0088FF]">
                <AnimatedCounter end={100} suffix="%" duration={1800} />
              </div>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">On-Time Velocity</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
