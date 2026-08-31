import React from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Code2, Rocket, ArrowRight, Zap } from 'lucide-react';

export default function ProcessWorkflow({ onOpenBooking, theme = 'light' }) {
  const isLight = theme === 'light';

  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Discovery & Strategy",
      desc: "We analyze your business workflows, ERP requirements, and digital targets to draft the ecosystem blueprint."
    },
    {
      number: "02",
      icon: Compass,
      title: "Modular Architecture",
      desc: "We design bank-grade database schemas, scalable microservices, and sleek UI/UX design components."
    },
    {
      number: "03",
      icon: Code2,
      title: "Sprint Development",
      desc: "Agile engineering sprints with bi-weekly milestone demos, continuous integration, and rigorous QA automated testing."
    },
    {
      number: "04",
      icon: Rocket,
      title: "Launch & Growth",
      desc: "Zero-downtime cloud deployment, 24/7 proactive monitoring, and continuous scaling as your user base expands."
    }
  ];

  return (
    <section className={`py-10 sm:py-12 transition-colors duration-500 border-y relative overflow-hidden select-none ${isLight ? 'bg-[#F8FAFC] border-slate-200 text-slate-900' : 'bg-[#050B17] border-[#1E3A8A] text-white'
      }`}>
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#0088FF]/15 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.4 }}
            className="relative inline-block text-center pb-1 mb-2"
          >
            <div className="text-xs sm:text-sm font-black tracking-[0.22em] uppercase text-[#0088FF] text-center">
              <span>OUR METHODOLOGY</span>
            </div>
          </motion.div>

          <h2 className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 uppercase ${isLight ? 'text-slate-900' : 'text-white'
            }`}>
            How We Build Your <span className="text-[#0088FF]">Digital Ecosystem</span>
          </h2>

          <p className={`text-sm sm:text-base font-semibold max-w-xl mx-auto leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'
            }`}>
            From initial concept to multi-tier deployment, our transparent process ensures speed, security, and predictability.
          </p>
        </motion.div>

        {/* 4 Clean Methodology Cards Grid (Clean Full-Width Original Grid Layout) */}
        <motion.div
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative"
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`p-6 sm:p-7 rounded-3xl border shadow-md hover:border-[#0088FF] transition-all duration-300 relative flex flex-col justify-between group overflow-hidden ${isLight
                  ? 'bg-white border-slate-200/90 hover:shadow-sky-500/10'
                  : 'bg-[#0B172E] border-[#1E3A8A] hover:shadow-sky-500/20'
                  }`}
              >
                {/* Hover Glow Effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0088FF]/10 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-heading font-black text-3xl sm:text-4xl text-[#0088FF] group-hover:scale-110 transition-transform">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-[#0088FF] shadow-sm group-hover:rotate-6 transition-transform">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </div>

                  <h3 className={`font-heading font-black text-base sm:text-lg mb-2 ${isLight ? 'text-slate-900' : 'text-white'
                    }`}>
                    {step.title}
                  </h3>

                  <p className={`text-xs font-semibold leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'
                    }`}>
                    {step.desc}
                  </p>
                </div>

                <div className={`mt-6 pt-3 border-t flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-[#0088FF] ${isLight ? 'border-slate-200' : 'border-[#1E3A8A]/80'
                  }`}>
                  <span>STEP {step.number} EXCELLENCE</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
