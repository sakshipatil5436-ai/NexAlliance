import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, TrendingUp, Play, Pause, Volume2, Sparkles } from 'lucide-react';

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

  const row1Testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      title: "CTO, LogiTech Systems",
      comment: "NexAlliance built our custom ERP module in record time. Our inventory tracking speed improved by 40% immediately.",
      metric: "+140% Revenue Growth",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      company: "LogiTech Systems"
    },
    {
      id: 2,
      name: "Priya Sharma",
      title: "Head of Operations, FinEdge",
      comment: "Their MERN stack expertise is unmatched. The customer portal they designed handles thousands of real-time transactions seamlessly.",
      metric: "99.9% Real-Time Scalability",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      company: "FinEdge Solutions"
    },
    {
      id: 3,
      name: "Vikram Patel",
      title: "Founder, Enterprise SaaS",
      comment: "From cloud infrastructure setup to automated CI/CD pipelines, NexAlliance proved to be the reliable engineering partner we needed.",
      metric: "10x Automated CI/CD Speed",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      company: "Enterprise SaaS"
    }
  ];

  const row2Testimonials = [
    {
      id: 4,
      name: "Ananya Desai",
      title: "VP Product, HealthEcosystem",
      comment: "The mobile app and HIPAA-compliant cloud setup delivered by NexAlliance exceeded all our security and performance expectations.",
      metric: "100% Security Compliant",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      company: "HealthEcosystem Inc"
    },
    {
      id: 5,
      name: "Sameer Joshi",
      title: "Director, RetailConnect",
      comment: "Our omni-channel e-commerce portal scaled smoothly during peak sales season with zero downtime and 45% faster page loads.",
      metric: "99.99% Peak Sales Uptime",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
      company: "RetailConnect Global"
    },
    {
      id: 6,
      name: "Kavita Nair",
      title: "Head of Tech, LogisticsCloud",
      comment: "NexAlliance's real-time analytics dashboard gave our management team operational visibility across all supply chain routes.",
      metric: "50% Faster Decisions",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      company: "LogisticsCloud"
    }
  ];

  return (
    <section className={`py-16 sm:py-24 transition-colors duration-500 border-y relative overflow-hidden select-none ${
      isLight ? 'bg-gradient-to-b from-[#F0F6FF] via-[#E8F2FF] to-[#F0F6FF] border-sky-200 text-slate-900' : 'bg-[#050B17] border-[#1E3A8A] text-white'
    }`}>
      
      {/* Dynamic Keyframes for Marquee Streams and Animated Audio Spectrum Equalizer */}
      <style>{`
        @keyframes testimonialMarqueeLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes testimonialMarqueeRight {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes audioWaveBar {
          0%, 100% { height: 6px; }
          50% { height: 20px; }
        }
        .animate-marquee-left {
          animation: testimonialMarqueeLeft 28s linear infinite;
        }
        .animate-marquee-right {
          animation: testimonialMarqueeRight 28s linear infinite;
        }
        .animate-marquee-left:hover, .animate-marquee-right:hover {
          animation-play-state: paused;
        }
        .wave-bar-1 { animation: audioWaveBar 0.6s ease-in-out infinite 0.1s; }
        .wave-bar-2 { animation: audioWaveBar 0.6s ease-in-out infinite 0.2s; }
        .wave-bar-3 { animation: audioWaveBar 0.6s ease-in-out infinite 0.3s; }
        .wave-bar-4 { animation: audioWaveBar 0.6s ease-in-out infinite 0.4s; }
      `}</style>

      {/* Interactive Soft Moving Ambient Blue Radial Glows */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#0088FF]/15 rounded-full filter blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-400/15 rounded-full filter blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0088FF]">
            CLIENT SUCCESS STORIES & AUDIO CLIPS
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Trusted By Founders & <span className="text-[#0088FF]">Enterprise Leaders</span>
          </h2>
          <p className="text-xs sm:text-base font-semibold text-slate-600 max-w-xl mx-auto leading-relaxed">
            Listen to 10-second audio clips & real-world success stories from engineered digital platforms.
          </p>
        </motion.div>

        {/* INFINITE SCROLLING MARQUEE STREAM WITH AUDIO/AVATAR CARDS */}
        <div className="space-y-6 sm:space-y-8 relative overflow-hidden py-2">
          
          {/* Left Fade Mask */}
          <div className="absolute top-0 left-0 bottom-0 w-12 sm:w-32 z-20 pointer-events-none bg-gradient-to-r from-[#F0F6FF] to-transparent"></div>
          {/* Right Fade Mask */}
          <div className="absolute top-0 right-0 bottom-0 w-12 sm:w-32 z-20 pointer-events-none bg-gradient-to-l from-[#F0F6FF] to-transparent"></div>

          {/* ROW 1: LEFT INFINITE SCROLL STREAM */}
          <div className="flex w-max animate-marquee-left gap-6 sm:gap-8 transform-gpu">
            {[...row1Testimonials, ...row1Testimonials, ...row1Testimonials, ...row1Testimonials].map((item, idx) => {
              const isPlaying = playingId === item.id;
              return (
                <div
                  key={`row1-${item.id}-${idx}`}
                  className={`w-[340px] xs:w-[380px] sm:w-[420px] shrink-0 bg-white/95 backdrop-blur-xl border-2 ${
                    isPlaying ? 'border-[#0088FF] shadow-2xl shadow-sky-500/30 ring-2 ring-[#0088FF]/40' : 'border-sky-300/80 hover:border-[#0088FF]'
                  } rounded-3xl p-6 sm:p-7 shadow-xl shadow-sky-500/10 hover:shadow-2xl hover:shadow-sky-500/20 transition-all duration-300 flex flex-col justify-between group transform-gpu hover:-translate-y-2 cursor-pointer relative overflow-hidden`}
                >
                  <div className="space-y-4">
                    {/* Top Row: Video/Audio Wave Snippet Header & Play Button */}
                    <div className="flex items-center justify-between pb-3 border-b border-sky-100">
                      <div className="flex items-center gap-2.5">
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

                    {/* Metric Badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0088FF] bg-sky-100/90 border border-sky-300/80 px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>{item.metric}</span>
                      </span>
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>

                    <Quote className="w-6 h-6 text-[#0088FF]/30 group-hover:text-[#0088FF] transition-colors" />

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
                </div>
              );
            })}
          </div>

          {/* ROW 2: RIGHT INFINITE SCROLL STREAM */}
          <div className="flex w-max animate-marquee-right gap-6 sm:gap-8 transform-gpu">
            {[...row2Testimonials, ...row2Testimonials, ...row2Testimonials, ...row2Testimonials].map((item, idx) => {
              const isPlaying = playingId === item.id;
              return (
                <div
                  key={`row2-${item.id}-${idx}`}
                  className={`w-[340px] xs:w-[380px] sm:w-[420px] shrink-0 bg-white/95 backdrop-blur-xl border-2 ${
                    isPlaying ? 'border-[#0088FF] shadow-2xl shadow-sky-500/30 ring-2 ring-[#0088FF]/40' : 'border-sky-300/80 hover:border-[#0088FF]'
                  } rounded-3xl p-6 sm:p-7 shadow-xl shadow-sky-500/10 hover:shadow-2xl hover:shadow-sky-500/20 transition-all duration-300 flex flex-col justify-between group transform-gpu hover:-translate-y-2 cursor-pointer relative overflow-hidden`}
                >
                  <div className="space-y-4">
                    {/* Top Row: Video/Audio Wave Snippet Header & Play Button */}
                    <div className="flex items-center justify-between pb-3 border-b border-sky-100">
                      <div className="flex items-center gap-2.5">
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

                    {/* Metric Badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0088FF] bg-sky-100/90 border border-sky-300/80 px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#0088FF]" />
                        <span>{item.metric}</span>
                      </span>
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>

                    <Quote className="w-6 h-6 text-[#0088FF]/30 group-hover:text-[#0088FF] transition-colors" />

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
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
