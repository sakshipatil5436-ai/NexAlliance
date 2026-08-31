import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, TrendingUp, Play, Pause, CheckCircle2, Film, ChevronRight } from 'lucide-react';

export default function Testimonials({ theme = 'light' }) {
  const isLight = theme === 'light';
  const [activeIdx, setActiveIdx] = useState(0);
  const [playingId, setPlayingId] = useState(null);

  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      title: "CTO, LogiTech Systems",
      comment: "NexAlliance built our custom ERP module in record time. Our inventory tracking speed improved by 40% immediately across 12 distribution hubs.",
      metric: "+140% Revenue Growth",
      company: "LogiTech Systems",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      name: "Priya Sharma",
      title: "Head of Operations, FinEdge",
      comment: "Their MERN stack expertise is unmatched. The customer portal handles thousands of real-time transactions seamlessly without latency.",
      metric: "99.9% Real-Time Scalability",
      company: "FinEdge Solutions",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      name: "Vikram Patel",
      title: "Founder, Enterprise SaaS",
      comment: "From cloud infrastructure setup to automated CI/CD pipelines, NexAlliance proved to be the reliable engineering partner we needed.",
      metric: "10x Automated CI/CD Speed",
      company: "Enterprise SaaS",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: 4,
      name: "Ananya Desai",
      title: "VP Product, HealthEcosystem",
      comment: "The mobile app and HIPAA-compliant cloud setup delivered by NexAlliance exceeded all our security and performance expectations.",
      metric: "100% Security Compliant",
      company: "HealthEcosystem Inc",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: 5,
      name: "Sameer Joshi",
      title: "Director, RetailConnect",
      comment: "Our omni-channel e-commerce portal scaled smoothly during peak sales season with zero downtime and 45% faster page loads.",
      metric: "99.99% Sales Uptime",
      company: "RetailConnect Global",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prevIdx) => (prevIdx + 1) % testimonials.length);
    }, 2200);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const activeStory = testimonials[activeIdx];

  const handleSelectStory = (idx) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setPlayingId(null);
    setActiveIdx(idx);
  };

  const handleTogglePlay = (e, item) => {
    e.stopPropagation();

    if (playingId === item.id) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setPlayingId(null);
    } else {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(`${item.name} from ${item.company} says: ${item.comment}`);
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        utterance.onend = () => setPlayingId(null);
        utterance.onerror = () => setPlayingId(null);
        window.speechSynthesis.speak(utterance);
      }
      setPlayingId(item.id);
    }
  };

  return (
    <section className={`py-16 sm:py-24 transition-colors duration-500 border-y relative overflow-hidden select-none ${
      isLight ? 'bg-gradient-to-b from-[#F0F6FF] via-[#E8F2FF] to-[#F0F6FF] border-sky-200 text-slate-900' : 'bg-[#050B17] border-[#1E3A8A] text-white'
    }`}>
      
      {/* Soundwave Animation Keyframes */}
      <style>{`
        @keyframes audioWaveBar {
          0%, 100% { height: 6px; }
          50% { height: 20px; }
        }
        .wave-bar-1 { animation: audioWaveBar 0.6s ease-in-out infinite 0.1s; }
        .wave-bar-2 { animation: audioWaveBar 0.6s ease-in-out infinite 0.2s; }
        .wave-bar-3 { animation: audioWaveBar 0.6s ease-in-out infinite 0.3s; }
        .wave-bar-4 { animation: audioWaveBar 0.6s ease-in-out infinite 0.4s; }
      `}</style>

      {/* Ambient Moving Radial Blue Glows */}
      <div className="absolute top-1/3 left-1/4 w-[700px] h-[700px] bg-[#0088FF]/15 rounded-full filter blur-[160px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-400/15 rounded-full filter blur-[160px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0088FF] flex items-center justify-center gap-2">
            <Film className="w-4 h-4" />
            <span>SPLIT-SCREEN CINEMATIC STORIES</span>
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Trusted By Founders & <span className="text-[#0088FF]">Enterprise Leaders</span>
          </h2>
          <p className="text-xs sm:text-base font-semibold text-slate-600 max-w-xl mx-auto leading-relaxed">
            Select any founder or leader on the right to view their cinematic success story.
          </p>
        </motion.div>

        {/* SPLIT-SCREEN CINEMATIC CONTAINER (No bulky boxes, pure crisp typography) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-center">
          
          {/* LEFT COLUMN: CINEMATIC FIXED QUOTE AREA (7 Cols) */}
          <div className="lg:col-span-7 relative min-h-[360px] sm:min-h-[400px] flex flex-col justify-between py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStory.id}
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 25 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="space-y-6"
              >
                {/* Metric Badge */}
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#0088FF] bg-sky-100/90 border border-sky-300/80 px-4 py-1.5 rounded-2xl shadow-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>{activeStory.metric}</span>
                  </span>
                </div>

                {/* Bold Crisp Quotation */}
                <p className="font-heading text-xl sm:text-3xl font-extrabold text-slate-900 leading-snug sm:leading-normal tracking-tight">
                  "{activeStory.comment}"
                </p>

                {/* Founder Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-sky-200/80">
                  <img
                    src={activeStory.avatar}
                    alt={activeStory.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#0088FF] shadow-md"
                  />
                  <div>
                    <h3 className="font-heading text-lg font-black text-slate-900">
                      {activeStory.name}
                    </h3>
                    <p className="text-xs font-bold text-slate-500">
                      {activeStory.title}
                    </p>
                    <div className="flex items-center gap-1 text-emerald-700 text-[11px] font-extrabold mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verified Enterprise Client</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE FOUNDER / CEO SELECTOR LIST (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            {testimonials.map((item, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectStory(idx)}
                  className={`p-4 rounded-2xl transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 border ${
                    isActive
                      ? 'bg-white/95 border-[#0088FF] shadow-xl shadow-sky-500/15 translate-x-2 ring-1 ring-[#0088FF]/30'
                      : 'bg-white/60 border-sky-200/60 hover:bg-white/90 hover:border-sky-300 hover:translate-x-1'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className={`w-11 h-11 rounded-full object-cover border-2 transition-transform shrink-0 ${
                        isActive ? 'border-[#0088FF] scale-105' : 'border-sky-200'
                      }`}
                    />
                    <div className="min-w-0">
                      <h4 className={`font-heading font-extrabold text-sm truncate ${
                        isActive ? 'text-[#0088FF]' : 'text-slate-900'
                      }`}>
                        {item.name}
                      </h4>
                      <p className="text-xs font-semibold text-slate-500 truncate">
                        {item.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                      isActive ? 'bg-sky-100 text-[#0088FF]' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.metric}
                    </span>
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
