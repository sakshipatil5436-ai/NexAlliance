import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, TrendingUp, Play, Pause, CheckCircle2, Sparkles, ShieldCheck, Zap, Layers, Grid } from 'lucide-react';

// Single Spotlight Bento Card Component that follows user cursor position
function SpotlightBentoCard({ children, className = '', onClick }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1
    });
  };

  const handleMouseLeave = () => {
    setMousePos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative rounded-3xl p-[2px] transition-all duration-300 group transform-gpu hover:-translate-y-1.5 overflow-hidden ${className}`}
    >
      {/* Dynamic Cursor Spotlight Border Glow Overlay */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300 z-0"
        style={{
          opacity: mousePos.opacity,
          background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 136, 255, 0.6), transparent 70%)`
        }}
      />

      {/* Card Inner Content Container */}
      <div className="relative z-10 w-full h-full rounded-[22px] bg-white/95 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between border border-sky-200/80 group-hover:border-[#0088FF]/60 shadow-xl shadow-sky-500/5 group-hover:shadow-2xl group-hover:shadow-sky-500/20 transition-all duration-300">
        
        {/* Subtle Ambient Hover Glow inside card */}
        <div
          className="pointer-events-none absolute -inset-px rounded-[22px] transition-opacity duration-300"
          style={{
            opacity: mousePos.opacity * 0.15,
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 136, 255, 0.4), transparent 60%)`
          }}
        />

        {children}
      </div>
    </div>
  );
}

export default function Testimonials({ theme = 'light' }) {
  const isLight = theme === 'light';
  const [playingId, setPlayingId] = useState(null);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

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

  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      title: "CTO, LogiTech Systems",
      comment: "NexAlliance built our custom ERP module in record time. Our inventory tracking speed improved by 40% immediately across 12 distribution hubs.",
      metric: "+140% Revenue Growth",
      company: "LogiTech Systems",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      featured: true
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
      metric: "10x CI/CD Velocity",
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

  const heroItem = testimonials[0];
  const sideItems = testimonials.slice(1, 3);
  const bottomItems = testimonials.slice(3, 5);

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

      {/* Soft Ambient Moving Blue Radial Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[650px] h-[650px] bg-[#0088FF]/15 rounded-full filter blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[650px] h-[650px] bg-cyan-400/15 rounded-full filter blur-[150px] pointer-events-none z-0"></div>

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
            <Grid className="w-4 h-4" />
            <span>INTERACTIVE QUOTE MATRIX</span>
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Trusted By Founders & <span className="text-[#0088FF]">Enterprise Leaders</span>
          </h2>
          <p className="text-xs sm:text-base font-semibold text-slate-600 max-w-xl mx-auto leading-relaxed">
            Hover over cards to see the interactive cursor spotlight effect.
          </p>
        </motion.div>

        {/* BENTO GRID MATRIX CONTAINER */}
        <div className="space-y-6 sm:space-y-8">
          
          {/* Top Row: Hero Featured Bento Card (8 Cols) + 2 Stacked Cards (4 Cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            
            {/* HERO FEATURED BENTO CARD */}
            <div className="lg:col-span-8">
              <SpotlightBentoCard className="h-full cursor-pointer">
                {/* Content */}
                <div className="space-y-5">
                  
                  {/* Top Header Row */}
                  <div className="flex items-center justify-between pb-3 border-b border-sky-100 flex-wrap gap-3">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#0088FF] bg-sky-100/90 border border-sky-300/80 px-4 py-1.5 rounded-2xl shadow-sm flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      <span>{heroItem.metric}</span>
                    </span>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => handleTogglePlay(e, heroItem)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer ${
                          playingId === heroItem.id
                            ? 'bg-amber-500 text-white animate-pulse'
                            : 'bg-[#0088FF] text-white hover:bg-[#0077E6] hover:scale-105'
                        }`}
                        title="Play 10-sec audio story clip"
                      >
                        {playingId === heroItem.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                      </button>

                      {/* Animated Waveform */}
                      <div className="flex items-center gap-1 h-5">
                        <div className={`w-1 rounded-full bg-[#0088FF] ${playingId === heroItem.id ? 'wave-bar-1' : 'h-2 opacity-40'}`} />
                        <div className={`w-1 rounded-full bg-[#0088FF] ${playingId === heroItem.id ? 'wave-bar-2' : 'h-3 opacity-40'}`} />
                        <div className={`w-1 rounded-full bg-[#0088FF] ${playingId === heroItem.id ? 'wave-bar-3' : 'h-4 opacity-40'}`} />
                        <div className={`w-1 rounded-full bg-[#0088FF] ${playingId === heroItem.id ? 'wave-bar-4' : 'h-2 opacity-40'}`} />
                      </div>
                    </div>
                  </div>

                  <Quote className="w-10 h-10 text-[#0088FF]/30 group-hover:text-[#0088FF] transition-colors" />

                  <p className="text-base sm:text-xl font-bold text-slate-800 leading-relaxed">
                    "{heroItem.comment}"
                  </p>
                </div>

                {/* Profile Footer */}
                <div className="pt-6 mt-6 border-t border-sky-100 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={heroItem.avatar}
                      alt={heroItem.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#0088FF] shadow-md shrink-0"
                    />
                    <div>
                      <h3 className="font-heading font-black text-base text-slate-900 group-hover:text-[#0088FF] transition-colors">
                        {heroItem.name}
                      </h3>
                      <p className="text-xs font-bold text-slate-500">
                        {heroItem.title}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100/80 border border-emerald-300/80 px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Verified Impact</span>
                  </span>
                </div>
              </SpotlightBentoCard>
            </div>

            {/* SIDE STACKED BENTO CARDS (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-8">
              {sideItems.map((item) => (
                <SpotlightBentoCard key={item.id} className="flex-1 cursor-pointer">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0088FF] bg-sky-100 px-3 py-1 rounded-full border border-sky-200">
                        {item.metric}
                      </span>
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
                      "{item.comment}"
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-sky-100 flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#0088FF] shadow-sm shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-heading font-black text-xs sm:text-sm text-slate-900 group-hover:text-[#0088FF] transition-colors truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] font-bold text-slate-500 truncate">
                        {item.company}
                      </p>
                    </div>
                  </div>
                </SpotlightBentoCard>
              ))}
            </div>

          </div>

          {/* Bottom Row Bento Cards (2 Equal 6-Col or Grid Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {bottomItems.map((item) => (
              <SpotlightBentoCard key={item.id} className="cursor-pointer">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0088FF] bg-sky-100 px-3 py-1 rounded-full border border-sky-200">
                      {item.metric}
                    </span>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
                    "{item.comment}"
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-sky-100 flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#0088FF] shadow-sm shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-heading font-black text-xs sm:text-sm text-slate-900 group-hover:text-[#0088FF] transition-colors truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] font-bold text-slate-500 truncate">
                      {item.title}
                    </p>
                  </div>
                </div>
              </SpotlightBentoCard>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
