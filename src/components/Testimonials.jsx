import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, TrendingUp, Play, Pause, ChevronLeft, ChevronRight, CheckCircle2, Sparkles, Layers } from 'lucide-react';

export default function Testimonials({ theme = 'light' }) {
  const isLight = theme === 'light';
  const [activeIdx, setActiveIdx] = useState(0);
  const [playingId, setPlayingId] = useState(null);

  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      title: "CTO, LogiTech Systems",
      comment: "NexAlliance built our custom ERP module in record time. Our inventory tracking speed improved by 40% immediately across all 12 distribution hubs.",
      metric: "+140% Revenue Growth",
      company: "LogiTech Systems",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      accent: "#0088FF"
    },
    {
      id: 2,
      name: "Priya Sharma",
      title: "Head of Operations, FinEdge",
      comment: "Their MERN stack expertise is unmatched. The customer portal they designed handles thousands of real-time transactions seamlessly without latency.",
      metric: "99.9% Real-Time Scalability",
      company: "FinEdge Solutions",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      accent: "#00C8FF"
    },
    {
      id: 3,
      name: "Vikram Patel",
      title: "Founder, Enterprise SaaS",
      comment: "From cloud infrastructure setup to automated CI/CD pipelines, NexAlliance proved to be the engineering partner we needed for compounding growth.",
      metric: "10x Automated CI/CD Speed",
      company: "Enterprise SaaS",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      accent: "#2563EB"
    },
    {
      id: 4,
      name: "Ananya Desai",
      title: "VP Product, HealthEcosystem",
      comment: "The mobile app and HIPAA-compliant cloud setup delivered by NexAlliance exceeded all our security, performance, and user retention expectations.",
      metric: "100% Security Compliant",
      company: "HealthEcosystem Inc",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      accent: "#0D9488"
    },
    {
      id: 5,
      name: "Sameer Joshi",
      title: "Director, RetailConnect",
      comment: "Our omni-channel e-commerce portal scaled smoothly during peak sales season with zero downtime and 45% faster page load speeds.",
      metric: "99.99% Peak Sales Uptime",
      company: "RetailConnect Global",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
      accent: "#0088FF"
    }
  ];

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleNext = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setPlayingId(null);
    setActiveIdx((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setPlayingId(null);
    setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
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
      
      {/* Waveform Keyframe Animations */}
      <style>{`
        @keyframes audioWaveBar {
          0%, 100% { height: 6px; }
          50% { height: 22px; }
        }
        .wave-bar-1 { animation: audioWaveBar 0.6s ease-in-out infinite 0.1s; }
        .wave-bar-2 { animation: audioWaveBar 0.6s ease-in-out infinite 0.2s; }
        .wave-bar-3 { animation: audioWaveBar 0.6s ease-in-out infinite 0.3s; }
        .wave-bar-4 { animation: audioWaveBar 0.6s ease-in-out infinite 0.4s; }
      `}</style>

      {/* Subtle Glowing Spotlight Background Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#0088FF]/25 via-cyan-400/20 to-blue-600/25 rounded-full filter blur-[140px] pointer-events-none z-0"></div>

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
            <Layers className="w-4 h-4" />
            <span>3D STACKED TESTIMONIAL DECK</span>
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Trusted By Founders & <span className="text-[#0088FF]">Enterprise Leaders</span>
          </h2>
          <p className="text-xs sm:text-base font-semibold text-slate-600 max-w-xl mx-auto leading-relaxed">
            Click the front card or use controls to flip through our 3D client success deck.
          </p>
        </motion.div>

        {/* 3D STACKED CARDS DECK CONTAINER */}
        <div className="relative w-full max-w-2xl mx-auto h-[380px] xs:h-[400px] sm:h-[420px] flex items-center justify-center perspective-[1200px]">
          
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="absolute left-0 sm:-left-12 z-40 w-11 h-11 rounded-full bg-white/90 hover:bg-[#0088FF] text-slate-700 hover:text-white border border-sky-300/80 shadow-xl flex items-center justify-center transition-all cursor-pointer hover:scale-110"
            title="Previous Story"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 sm:-right-12 z-40 w-11 h-11 rounded-full bg-white/90 hover:bg-[#0088FF] text-slate-700 hover:text-white border border-sky-300/80 shadow-xl flex items-center justify-center transition-all cursor-pointer hover:scale-110"
            title="Next Story"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* 3D OVERLAPPING CARDS */}
          {testimonials.map((item, i) => {
            const total = testimonials.length;
            const offset = (i - activeIdx + total) % total;
            const isFront = offset === 0;
            const isPlaying = playingId === item.id;

            // Only render top 3 cards for clean performance
            if (offset > 2) return null;

            return (
              <motion.div
                key={item.id}
                onClick={isFront ? handleNext : undefined}
                initial={false}
                animate={{
                  scale: 1 - offset * 0.07,
                  y: offset * 22,
                  z: -offset * 60,
                  rotateX: offset * 3,
                  opacity: 1 - offset * 0.25,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  zIndex: 30 - offset * 10,
                  transformStyle: 'preserve-3d',
                }}
                className={`absolute inset-x-4 sm:inset-x-0 w-auto sm:w-[560px] h-[340px] sm:h-[370px] rounded-3xl p-6 sm:p-8 bg-white/95 backdrop-blur-xl border-2 ${
                  isFront
                    ? isPlaying
                      ? 'border-[#0088FF] ring-4 ring-[#0088FF]/30 shadow-2xl shadow-sky-500/30'
                      : 'border-sky-300 hover:border-[#0088FF] shadow-2xl shadow-sky-500/15 cursor-pointer'
                    : 'border-sky-200/60 shadow-lg pointer-events-none'
                } transition-all duration-300 flex flex-col justify-between group overflow-hidden select-none`}
              >
                <div className="space-y-4">
                  {/* Top Header Row: Audio Snippet & Metric Tag */}
                  <div className="flex items-center justify-between pb-3 border-b border-sky-100">
                    <div className="flex items-center gap-2.5">
                      {isFront && (
                        <button
                          onClick={(e) => handleTogglePlay(e, item)}
                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer ${
                            isPlaying
                              ? 'bg-amber-500 text-white animate-pulse'
                              : 'bg-[#0088FF] text-white hover:bg-[#0077E6] hover:scale-105'
                          }`}
                          title="Play 10-sec audio story clip"
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                        </button>
                      )}
                      <span className="text-[11px] font-extrabold text-[#0088FF] uppercase tracking-wider">
                        {isPlaying ? 'Playing Audio Clip...' : 'Listen 10s Clip'}
                      </span>
                    </div>

                    {/* Animated Audio Spectrum Waveform Bar */}
                    <div className="flex items-center gap-1 h-5">
                      <div className={`w-1 rounded-full bg-[#0088FF] ${isPlaying ? 'wave-bar-1' : 'h-2 opacity-40'}`} />
                      <div className={`w-1 rounded-full bg-[#0088FF] ${isPlaying ? 'wave-bar-2' : 'h-3 opacity-40'}`} />
                      <div className={`w-1 rounded-full bg-[#0088FF] ${isPlaying ? 'wave-bar-3' : 'h-4 opacity-40'}`} />
                      <div className={`w-1 rounded-full bg-[#0088FF] ${isPlaying ? 'wave-bar-4' : 'h-2 opacity-40'}`} />
                    </div>
                  </div>

                  {/* Impact Metric & Rating */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#0088FF] bg-sky-100/90 border border-sky-300/80 px-3.5 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>{item.metric}</span>
                    </span>

                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-xs font-bold text-slate-700 ml-1">5.0</span>
                    </div>
                  </div>

                  <Quote className="w-8 h-8 text-[#0088FF]/30 group-hover:text-[#0088FF] transition-colors" />

                  <p className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed">
                    "{item.comment}"
                  </p>
                </div>

                {/* Bottom Row: Client Profile */}
                <div className="pt-4 border-t border-sky-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-[#0088FF] shadow-sm shrink-0"
                    />
                    <div>
                      <h3 className="font-heading font-black text-sm sm:text-base text-slate-900 group-hover:text-[#0088FF] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs font-bold text-slate-500">
                        {item.title}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-100/80 border border-emerald-300/80 px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Indicator Dots */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if ('speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                }
                setPlayingId(null);
                setActiveIdx(idx);
              }}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                activeIdx === idx
                  ? 'w-8 bg-[#0088FF]'
                  : 'w-2.5 bg-sky-300/70 hover:bg-sky-400'
              }`}
              title={`Go to story ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
