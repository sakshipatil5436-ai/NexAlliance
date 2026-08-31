import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Map,
  Layout,
  Code2,
  ShieldCheck,
  Rocket,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

export default function ProcessWorkflow({ onOpenBooking, theme = 'light' }) {
  const isLight = theme === 'light';
  const [activeStep, setActiveStep] = useState(2); // Default to Step 3 (0-indexed: 2) as in Image 2
  const [isPaused, setIsPaused] = useState(false);

  const steps = [
    {
      id: 1,
      number: "1",
      icon: Compass,
      title: "Discovery & Alignment",
      subtitle: "First Concept",
      desc: "We analyze your business workflows, ERP requirements, and digital targets to draft the ecosystem blueprint.",
      bullets: [
        "Business Workflow Analysis",
        "Requirements Gathering",
        "Scope & Roadmap Definition"
      ]
    },
    {
      id: 2,
      number: "2",
      icon: Map,
      title: "Strategy & Planning",
      subtitle: "Milestone Blueprint",
      desc: "Comprehensive blueprinting, data flow mapping, and architectural milestones.",
      bullets: [
        "Milestone Roadmap",
        "Technical Feasibility",
        "Resource Allocation"
      ]
    },
    {
      id: 3,
      number: "3",
      icon: Layout,
      title: "Architecture & Design",
      subtitle: "Bank-Grade Schemas",
      desc: "We design bank-grade database schemas, scalable microservices, and sleek UI/UX components.",
      bullets: [
        "System Architecture",
        "User Flow Mapping",
        "Technology Stack"
      ]
    },
    {
      id: 4,
      number: "4",
      icon: Code2,
      title: "Development & Integration",
      subtitle: "Agile Engineering",
      desc: "Agile engineering sprints with bi-weekly milestone demos and continuous integration.",
      bullets: [
        "Agile Engineering Sprints",
        "API & ERP Integration",
        "Microservice Architecture"
      ]
    },
    {
      id: 5,
      number: "5",
      icon: ShieldCheck,
      title: "Testing & Quality",
      subtitle: "Automated QA",
      desc: "Rigorous automated testing, security vulnerability checks, and load balancing validation.",
      bullets: [
        "Automated QA Testing",
        "Security & Penetration Audits",
        "Performance Benchmarks"
      ]
    },
    {
      id: 6,
      number: "6",
      icon: Rocket,
      title: "Launch & Support",
      subtitle: "Cloud Scaling",
      desc: "Zero-downtime cloud deployment, 24/7 proactive monitoring, and continuous scaling.",
      bullets: [
        "Zero-Downtime Deployment",
        "24/7 Proactive Monitoring",
        "Continuous Scaling"
      ]
    }
  ];

  // Auto-play 3D rotation across steps every 3.5s
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused, steps.length]);

  return (
    <section className="py-14 sm:py-20 transition-colors duration-500 relative overflow-hidden select-none bg-gradient-to-b from-[#F8FAFC] via-[#F0F6FF] to-[#E6F0FF] text-slate-900">

      {/* Ambient Blue Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#0088FF]/15 rounded-full filter blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14 sm:space-y-16">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <div className="text-xs sm:text-sm font-black tracking-[0.25em] uppercase text-[#0088FF] text-center">
            <span>OUR METHODOLOGY</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-black tracking-tight text-slate-900 uppercase leading-tight">
            HOW WE BUILD YOUR <span className="text-[#0088FF]">DIGITAL ECOSYSTEM</span>
          </h2>

          <p className="text-xs sm:text-base font-semibold text-slate-600 max-w-2xl mx-auto leading-relaxed">
            A transparent, milestone-driven journey — from first idea to a thriving product.
          </p>
        </motion.div>

        {/* 6-STEP 3D INTERACTIVE TIMELINE CONTAINER */}
        <div
          className="relative max-w-7xl mx-auto pt-6 pb-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Horizontal Connecting 3D Pipeline Line (Desktop) */}
          <div className="hidden lg:block absolute top-[68px] left-[6%] right-[6%] h-[3px] bg-gradient-to-r from-sky-300 via-[#0088FF] to-indigo-500 rounded-full shadow-[0_0_12px_rgba(0,136,255,0.4)] z-0" />

          {/* 6-Step Timeline Nodes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-4 relative z-10 items-start">
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              const isActive = activeStep === idx;

              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  {/* 3D FLOATING GLOWING ORB */}
                  <motion.div
                    whileHover={{ scale: 1.1, y: -4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center transition-all duration-300 transform-gpu mb-4 ${
                      isActive
                        ? 'bg-gradient-to-tr from-[#0088FF] via-[#0077E6] to-indigo-600 text-white shadow-[0_12px_30px_rgba(0,136,255,0.45)] ring-4 ring-sky-300/80 scale-105 -translate-y-2'
                        : 'bg-gradient-to-tr from-slate-300 via-slate-200 to-slate-100 text-slate-600 shadow-md hover:shadow-lg hover:bg-sky-100'
                    }`}
                  >
                    {/* Inner 3D Pulse Ring */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-full bg-[#0088FF]/30 animate-ping pointer-events-none" />
                    )}

                    {/* Step Icon */}
                    <IconComp className={`w-8 h-8 sm:w-9 sm:h-9 transition-transform duration-300 ${
                      isActive ? 'scale-110 drop-shadow-md text-white' : 'text-slate-600 group-hover:text-[#0088FF]'
                    }`} />

                    {/* Floating Step Number Pill (1, 2, 3, 4, 5, 6) */}
                    <div className={`absolute -bottom-1 -right-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white flex items-center justify-center font-heading font-black text-xs sm:text-sm shadow-md transition-all ${
                      isActive
                        ? 'bg-white text-[#0088FF] scale-110'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {step.number}
                    </div>
                  </motion.div>

                  {/* 3D STEP CARD (Expands with bullet points when active as in Image 2) */}
                  <motion.div
                    layout
                    transition={{ duration: 0.3 }}
                    className={`w-full p-5 sm:p-6 rounded-3xl transition-all duration-300 flex flex-col justify-between text-center relative overflow-hidden transform-gpu border-2 ${
                      isActive
                        ? 'bg-white/95 backdrop-blur-xl border-[#0088FF] shadow-2xl shadow-sky-500/20 ring-2 ring-[#0088FF]/20 -translate-y-1'
                        : 'bg-white/80 backdrop-blur-md border-sky-200/80 hover:border-sky-400 shadow-md hover:shadow-xl'
                    }`}
                  >
                    <div>
                      <h3 className={`font-heading font-black text-base sm:text-lg mb-2 transition-colors ${
                        isActive ? 'text-[#0088FF]' : 'text-slate-900 group-hover:text-[#0088FF]'
                      }`}>
                        {step.title}
                      </h3>

                      {/* Description Text */}
                      <p className="text-xs text-slate-600 font-semibold leading-relaxed mb-3">
                        {step.desc}
                      </p>

                      {/* Expandable Bullet Points (Exact match to Image 2!) */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="pt-3 border-t border-sky-100 space-y-2 text-left text-[11px] font-bold text-slate-700 overflow-hidden"
                          >
                            {step.bullets.map((bullet, i) => (
                              <li key={i} className="flex items-center gap-1.5 text-slate-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0088FF] shrink-0" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Step Active Indicator */}
                    <div className="pt-3 mt-3 flex items-center justify-center gap-1 text-[10px] font-black uppercase tracking-wider text-[#0088FF]">
                      <span>{isActive ? 'ACTIVE STEP' : `STEP 0${step.number}`}</span>
                      <ChevronRight className={`w-3 h-3 transition-transform ${isActive ? 'rotate-90 text-[#0088FF]' : ''}`} />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Action Button */}
        <div className="text-center pt-4">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#0088FF] via-[#0077E6] to-indigo-600 hover:from-[#0077E6] hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-xl shadow-sky-500/25 hover:shadow-2xl hover:scale-105 transition-all cursor-pointer"
          >
            <span>START YOUR DIGITAL ECOSYSTEM TODAY</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
