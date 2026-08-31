import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export default function Testimonials({ theme = 'light' }) {
  const isLight = theme === 'light';

  const testimonialsData = [
    {
      name: "Rajesh Kumar",
      title: "CTO, LogiTech Systems",
      comment: "NexAlliance built our custom ERP module in record time. Our inventory tracking speed improved by 40% immediately.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      rating: 5
    },
    {
      name: "Priya Sharma",
      title: "Head of Operations, FinEdge",
      comment: "Their MERN stack expertise is unmatched. The customer portal they designed handles thousands of real-time transactions seamlessly.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      rating: 5
    },
    {
      name: "Vikram Patel",
      title: "Founder, Enterprise SaaS",
      comment: "From cloud infrastructure setup to automated CI/CD pipelines, NexAlliance proved to be the engineering partner we needed.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      rating: 5
    }
  ];

  return (
    <section className={`py-10 sm:py-12 transition-colors duration-500 border-y relative overflow-hidden select-none ${isLight ? 'bg-[#F8FAFC] border-slate-200 text-slate-900' : 'bg-[#050B17] border-[#1E3A8A] text-white'
      }`}>
      {/* Background Ambient Radial Glow matching Methodology section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#0088FF]/15 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-10"
        >
          <div className="relative inline-block text-center pb-1 mb-2">
            <div className="text-xs sm:text-sm font-black tracking-[0.22em] uppercase text-[#0088FF] text-center">
              <span>CLIENT SUCCESS STORIES</span>
            </div>
          </div>

          <h2 className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 uppercase ${isLight ? 'text-slate-900' : 'text-white'
            }`}>
            Trusted By Founders & <span className="text-[#0088FF]">Enterprise Leaders</span>
          </h2>
          <p className={`text-xs sm:text-sm font-semibold max-w-xl mx-auto ${isLight ? 'text-slate-600' : 'text-slate-300'
            }`}>
            See how our tailored ERP, CRM, and cloud engineering solutions drive real-world business results.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 transform-gpu">
          {testimonialsData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              whileHover={{ y: -5 }}
              className={`p-5 sm:p-6 rounded-2xl border-0 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer transform-gpu ${isLight
                ? 'bg-white shadow-sky-500/10'
                : 'bg-[#050B17] shadow-2xl'
                }`}
            >
              <div>

                <Quote className="w-8 h-8 text-[#0088FF]/40 mb-4 group-hover:text-[#0088FF] group-hover:scale-110 transition-all duration-300" />

                <p className={`text-sm font-semibold leading-relaxed mb-6 ${isLight ? 'text-slate-700' : 'text-slate-300'
                  }`}>
                  "{item.comment}"
                </p>
              </div>

              <div className={`flex items-center gap-4 pt-4 border-t ${isLight ? 'border-slate-200' : 'border-[#1E3A8A]/80'
                }`}>
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#0088FF] group-hover:scale-105 transition-transform"
                />
                <div>
                  <h4 className={`font-heading font-black text-sm ${isLight ? 'text-slate-900' : 'text-white'
                    }`}>{item.name}</h4>
                  <p className={`text-xs font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'
                    }`}>{item.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
