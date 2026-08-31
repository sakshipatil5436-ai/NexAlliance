import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowDown,
  Building2,
  Users,
  Award,
  Globe2,
  Rocket,
  Code2,
  Sparkles,
  CheckCircle2
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

  const storySteps = [
    {
      step: "01",
      date: "10 February 2025",
      badge: "10 FEBRUARY 2025",
      title: "The Beginning — Meet.Nexus",
      desc: "Meet Mistry started his entrepreneurial journey with Meet.Nexus, focusing on practical client digital solutions, sales, business development, and client relationships.",
      subText: "Built strong experience in project management and business-aligned technology.",
      icon: Building2
    },
    {
      step: "02",
      date: "First Project",
      badge: "MILESTONE PROJECT",
      title: "Hotel Hilton TMS",
      desc: "Meet.Nexus delivered its first major technology project for Hotel Hilton, marking the start of Meet's journey in building client-focused enterprise software.",
      subText: "Hotel Task Management App engineered for hospitality operations.",
      icon: Award
    },
    {
      step: "03",
      date: "1 March 2025",
      badge: "1 MARCH 2025",
      title: "A Second Journey — Nexora",
      desc: "Sanket Pithava started his technology company Nexora, focusing on software development, digital solutions, and complex technical architecture.",
      subText: "Built a strong foundation in software engineering and technical problem solving.",
      icon: Code2
    },
    {
      step: "04",
      date: "First Project",
      badge: "MILESTONE PROJECT",
      title: "Bihar Disaster System",
      desc: "Nexora delivered the Bihar Disaster System (BDSRN), a technology-driven operational initiative solving real-world emergency resource management challenges.",
      subText: "Valuable experience in developing solutions for high-stakes operational needs.",
      icon: Globe2
    },
    {
      step: "05",
      date: "Partnership",
      badge: "PROJECT PARTNERSHIP",
      title: "When Two Journeys Connected",
      desc: "Meet.Nexus and Nexora came together through a project partnership. Meet brought business, sales & growth expertise, while Sanket brought technology & development execution.",
      subText: "Combining strengths created the foundation for a unified technology company.",
      icon: Users
    },
    {
      step: "06",
      date: "26 July 2026",
      badge: "26 JULY 2026",
      title: "The Birth of NexAlliance",
      desc: "NexAlliance was officially established by Meet Mistry & Sanket Pithava — uniting two independent companies, real-world projects, and one shared vision.",
      subText: "One vision built together: Business Strategy + Technology Innovation.",
      icon: Rocket,
      highlight: true
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
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0088FF]">
              ABOUT NEXALLIANCE
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
            Before NexAlliance, founders <strong className="text-[#0088FF] font-bold">Meet Mistry</strong> and <strong className="text-[#0088FF] font-bold">Sanket Pithava</strong> were independently building their own companies and projects.
          </motion.p>
        </div>

        {/* 2. OUR STORY — ONE-BY-ONE ANIMATED ARROW TIMELINE FLOW */}
        <div id="our-story" className="scroll-mt-24 space-y-10 sm:space-y-12 relative">

          <div className="text-center max-w-2xl mx-auto space-y-2 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0088FF]">OUR STORY TIMELINE</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
              From Two Journeys to <span className="text-[#0088FF]">NexAlliance</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold">
              Follow the step-by-step chronological evolution of how Meet.Nexus & Nexora united into one alliance.
            </p>
          </div>

          {/* Sequential Arrow Flow Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-stretch relative">
            {storySteps.map((stepItem, idx) => {
              const IconComp = stepItem.icon;
              const isLast = idx === storySteps.length - 1;

              return (
                <div key={idx} className="relative flex flex-col justify-between">
                  {/* Story Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: (idx % 2) * 0.12, ease: "easeOut" }}
                    whileHover={{ y: -4, scale: 1.01 }}
                    className={`h-full p-6 sm:p-7 rounded-3xl border-2 transition-all duration-300 flex flex-col justify-between group transform-gpu ${
                      stepItem.highlight
                        ? 'bg-gradient-to-br from-white via-sky-50 to-sky-100/90 border-[#0088FF] shadow-2xl shadow-sky-500/20 ring-2 ring-[#0088FF]/30'
                        : 'bg-white/95 backdrop-blur-xl border-sky-300/80 hover:border-[#0088FF] shadow-xl shadow-sky-500/10 hover:shadow-2xl hover:shadow-sky-500/20'
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Badge Row & Step Number */}
                      <div className="flex items-center justify-between">
                        <span className={`text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full border shadow-sm flex items-center gap-1.5 ${
                          stepItem.highlight
                            ? 'bg-[#0088FF] text-white border-[#0088FF]'
                            : 'bg-sky-100 text-[#0088FF] border-sky-300/70'
                        }`}>
                          <IconComp className="w-3.5 h-3.5" />
                          <span>{stepItem.badge}</span>
                        </span>

                        <span className="font-heading text-lg font-black text-[#0088FF]">
                          Step {stepItem.step}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-[#0088FF] transition-colors">
                        {stepItem.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
                        {stepItem.desc}
                      </p>
                    </div>

                    {/* SubText / Outcome */}
                    <div className="pt-4 mt-4 border-t border-sky-200/80 flex items-center gap-2 text-xs font-bold text-slate-500">
                      <CheckCircle2 className="w-4 h-4 text-[#0088FF] shrink-0" />
                      <span>{stepItem.subText}</span>
                    </div>
                  </motion.div>

                  {/* Animated Connecting Blue Arrow to Next Step */}
                  {!isLast && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: (idx % 2) * 0.12 + 0.1 }}
                      className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#0088FF] text-white shadow-lg shadow-sky-500/30 items-center justify-center border-2 border-white animate-pulse"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  )}
                </div>
              );
            })}
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
