import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Map,
  Layout,
  Code2,
  ShieldCheck,
  Rocket,
  ChevronDown
} from 'lucide-react';

export default function ProcessWorkflow({ onOpenBooking, theme = 'light' }) {
  const isLight = theme === 'light';
  const [activeStepIndex, setActiveStepIndex] = useState(0); // Progressive step 0 -> 5

  const steps = [
    {
      id: 1,
      number: "1",
      icon: Compass,
      title: "Discovery & Alignment",
      subtitle: "First Concept",
      desc: "We analyze your business workflows, ERP requirements, and digital targets to draft the ecosystem blueprint."
    },
    {
      id: 2,
      number: "2",
      icon: Map,
      title: "Strategy & Planning",
      subtitle: "Milestone Blueprint",
      desc: "Comprehensive blueprinting, data flow mapping, and architectural milestones."
    },
    {
      id: 3,
      number: "3",
      icon: Layout,
      title: "Architecture & Design",
      subtitle: "Bank-Grade Schemas",
      desc: "We design bank-grade database schemas, scalable microservices, and sleek UI/UX components."
    },
    {
      id: 4,
      number: "4",
      icon: Code2,
      title: "Development & Integration",
      subtitle: "Agile Engineering",
      desc: "Agile engineering sprints with bi-weekly milestone demos and continuous integration."
    },
    {
      id: 5,
      number: "5",
      icon: ShieldCheck,
      title: "Testing & Quality",
      subtitle: "Automated QA",
      desc: "Rigorous automated testing, security vulnerability checks, and load balancing validation."
    },
    {
      id: 6,
      number: "6",
      icon: Rocket,
      title: "Launch & Support",
      subtitle: "Cloud Scaling",
      desc: "Zero-downtime cloud deployment, 24/7 proactive monitoring, and continuous scaling."
    }
  ];

  // Progressive Step Automation: advances step 1->2->3->4->5->6 (Stops permanently at Step 6)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStepIndex((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(timer);
          return steps.length - 1; // Lock at Step 6!
        }
        return prev + 1;
      });
    }, 1800);
    return () => clearInterval(timer);
  }, [steps.length]);

  const progressPercentage = (activeStepIndex / (steps.length - 1)) * 100;

  return (
    <section className="py-14 sm:py-20 transition-colors duration-500 relative overflow-hidden select-none bg-gradient-to-b from-[#F8FAFC] via-[#F0F6FF] to-[#E6F0FF] text-slate-900">

      {/* Ambient Blue Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#0088FF]/15 rounded-full filter blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          onViewportEnter={() => setActiveStepIndex(0)}
          viewport={{ once: false, margin: "-100px" }}
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

        {/* 6-STEP 3D AUTOMATED PIPELINE CONTAINER */}
        <div className="relative max-w-7xl mx-auto pt-6 pb-4">

          {/* 1. Base Pipeline Background Track (Desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-[6%] right-[6%] h-[4px] bg-slate-200 rounded-full z-0" />

          {/* 2. Active Progressive Glowing Blue Line (Desktop) */}
          <motion.div
            className="hidden lg:block absolute top-[52px] left-[6%] h-[4px] bg-gradient-to-r from-sky-400 via-[#0088FF] to-blue-600 rounded-full shadow-[0_0_14px_rgba(0,136,255,0.6)] z-0 transition-all duration-500 ease-out"
            style={{ width: `${(progressPercentage * 0.88)}%` }}
          />

          {/* 3. Base Pipeline Track (Mobile) */}
          <div className="block lg:hidden absolute top-[52px] bottom-[52px] left-1/2 sm:left-[25%] -translate-x-1/2 w-[4px] bg-slate-200 rounded-full z-0" />

          {/* 4. Active Progressive Glowing Blue Line (Mobile) */}
          <motion.div
            className="block lg:hidden absolute top-[52px] left-1/2 sm:left-[25%] -translate-x-1/2 w-[4px] bg-gradient-to-b from-sky-400 via-[#0088FF] to-blue-600 rounded-full shadow-[0_0_14px_rgba(0,136,255,0.6)] z-0 transition-all duration-500 ease-out"
            style={{ height: `${progressPercentage}%` }}
          />

          {/* 6-Step Timeline Nodes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-4 relative z-10 items-start">
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              const isCompletedOrActive = idx <= activeStepIndex; // Previous steps stay glowing BLUE!
              const isCurrentActive = idx === activeStepIndex;

              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStepIndex(idx)}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  {/* 3D FLOATING GLOWING ORB (Stays Glowing BLUE when completed!) */}
                  <motion.div
                    whileHover={{ scale: 1.1, y: -4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center transition-all duration-500 transform-gpu mb-4 ${isCompletedOrActive
                        ? 'bg-gradient-to-tr from-[#0088FF] via-[#0077E6] to-indigo-600 text-white shadow-[0_12px_30px_rgba(0,136,255,0.45)] ring-4 ring-sky-300/80 scale-105 -translate-y-2'
                        : 'bg-gradient-to-tr from-slate-200 via-slate-100 to-slate-50 text-slate-400 shadow-sm hover:shadow-md'
                      }`}
                  >
                    {/* Inner 3D Pulse Ring for Current Step */}
                    {isCurrentActive && (
                      <div className="absolute inset-0 rounded-full bg-[#0088FF]/40 animate-ping pointer-events-none" />
                    )}

                    {/* Step Icon */}
                    <IconComp className={`w-8 h-8 sm:w-9 sm:h-9 transition-transform duration-300 ${isCompletedOrActive ? 'scale-110 drop-shadow-md text-white' : 'text-slate-400 group-hover:text-[#0088FF]'
                      }`} />

                    {/* Floating Step Number Pill (1, 2, 3, 4, 5, 6) */}
                    <div className={`absolute -bottom-1 -right-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white flex items-center justify-center font-heading font-black text-xs sm:text-sm shadow-md transition-all ${isCompletedOrActive
                        ? 'bg-white text-[#0088FF] scale-110'
                        : 'bg-slate-100 text-slate-500'
                      }`}>
                      {step.number}
                    </div>
                  </motion.div>

                  {/* HEADING LABEL (Stays Bold Blue when completed!) */}
                  <div className="text-center">
                    <h3 className={`font-heading font-black text-sm sm:text-base leading-snug transition-colors ${isCompletedOrActive ? 'text-[#0088FF]' : 'text-slate-500 group-hover:text-[#0088FF]'
                      }`}>
                      {step.title}
                    </h3>
                    <p className={`text-[11px] font-semibold mt-1 transition-colors ${isCompletedOrActive ? 'text-slate-700' : 'text-slate-400'}`}>
                      {step.subtitle}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
