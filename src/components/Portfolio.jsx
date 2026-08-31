import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Portfolio({ onOpenBooking, theme = 'dark', isHomePage = false }) {
  const isLight = theme === 'light';
  const [activeTab, setActiveTab] = useState('all');
  const scrollRef = useRef(null);

  const scrollManual = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const projects = [
    {
      id: 1,
      category: 'crm',
      title: 'Hotel Hilton TMS',
      image: '/projects/milton.webp',
      tech: 'Hotel Task Management App',
      fit: 'contain',
      link: 'https://www.hilton.com/en/locations/india/'
    },
    {
      id: 2,
      category: 'erp',
      title: 'Mad Over Grills MS',
      image: '/projects/Mad_over.webp',
      tech: 'Restaurant Billing & POS',
      fit: 'contain',
      link: 'https://madovergrills.co.in/'
    },
    {
      id: 3,
      category: 'erp',
      title: 'Nirman Architects MS Build Transform',
      image: '/projects/niraman.webp',
      tech: 'Architecture Management',
      fit: 'contain',
      link: 'https://www.nirman-architects.com/'
    },
    {
      id: 4,
      category: 'erp',
      title: 'Modulite Interior',
      image: '/projects/modulite.webp',
      tech: 'Interior Project Management',
      fit: 'contain',
      link: 'https://modulite.in/'
    },
    {
      id: 5,
      category: 'web',
      title: 'Har Bole – News Platform',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80',
      tech: 'Digital News & CMS Portal'
    },
    {
      id: 6,
      category: 'erp',
      title: 'BDSRN',
      image: '/projects/bdsrn.webp',
      tech: 'Disaster Resource Network'
    },
    {
      id: 7,
      category: 'crm',
      title: 'Novva Salon',
      image: '/projects/novva_salon.webp',
      tech: 'Salon ERP & Booking System'
    },
    {
      id: 8,
      category: 'erp',
      title: 'Gas Agency',
      image: '/projects/gas_agency.webp',
      tech: 'Gas & Inventory ERP'
    },
    {
      id: 9,
      category: 'crm',
      title: 'V Square Neuro Spine Centre',
      image: '/projects/v_logo.webp',
      tech: 'Healthcare & Clinic Portal',
      fit: 'contain',
      link: 'https://vsquareneurospine.com/'
    },
    {
      id: 10,
      category: 'web',
      title: 'Dotteds',
      image: '/projects/dotteds_logo.webp',
      tech: 'Fashion E-Commerce Store',
      fit: 'contain',
      link: 'https://dotteds.in/'
    },
    {
      id: 11,
      category: 'erp',
      title: 'BrandBox',
      image: '/projects/brandbox.webp',
      tech: 'E-Commerce & HRM System'
    },
    {
      id: 12,
      category: 'web',
      title: 'ArkA Stone Realty',
      image: '/projects/arka_logo.webp',
      tech: 'Real Estate Advisory',
      fit: 'contain',
      link: 'https://arkastonerealty.com/'
    },
    {
      id: 13,
      category: 'web',
      title: 'Luxbury Properties',
      image: '/projects/new-logo.webp',
      tech: 'Real Estate Portal',
      fit: 'contain',
      link: 'https://luxburyproperties.com/'
    },
    {
      id: 14,
      category: 'web',
      title: 'Vrani Chemicals',
      image: '/projects/vrani_chemicals.webp',
      tech: 'Chemical & Product Portal'
    }
  ];

  const handleProjectClick = (item) => {
    if (item.link) {
      window.open(item.link, '_blank', 'noopener,noreferrer');
    } else if (onOpenBooking) {
      onOpenBooking();
    }
  };

  const filtered = activeTab === 'all'
    ? projects
    : projects.filter(p => p.category === activeTab);

  return (
    <section id="portfolio" className={`scroll-mt-20 ${isHomePage ? 'py-10 sm:py-12' : 'pt-28 sm:pt-36 pb-16 sm:pb-20'} transition-colors duration-500 relative overflow-hidden select-none ${isLight ? 'bg-[#F0F6FF] text-slate-800' : 'bg-[#050B17] text-white'
      }`}>

      {/* Fast & Dynamic GPU Marquee Keyframes */}
      <style>{`
        @keyframes nexGpuMarqueeFast {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .nex-gpu-marquee-fast {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          will-change: transform;
          animation: nexGpuMarqueeFast 15s linear infinite;
        }
        .nex-gpu-marquee-fast:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Ambient Glow */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#0088FF]/15 rounded-full filter blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#00F0FF]/15 rounded-full filter blur-[140px] pointer-events-none" />

      <div className={isHomePage ? "w-full relative z-10" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"}>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative inline-block text-center pb-1 mb-2"
          >
            <div className="text-[10px] sm:text-sm font-black tracking-[0.2em] uppercase text-[#0088FF] text-center">
              <span>{isHomePage ? 'OUR PORTFOLIO GALLERY' : 'OUR PORTFOLIO'}</span>
            </div>
            {!isHomePage && (
              <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#0088FF] to-transparent mt-2 rounded-full shadow-sm"></div>
            )}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`font-heading text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-2 sm:mb-3 ${isLight ? 'text-slate-900' : 'text-white'
              }`}
          >
            {isHomePage ? (
              <>Real Client <span className="text-[#0088FF]">Projects Showcase.</span></>
            ) : (
              <>Our Real <span className="text-[#0088FF]">Projects.</span></>
            )}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-xs sm:text-base font-medium leading-relaxed max-w-2xl mx-auto ${isLight ? 'text-slate-600' : 'text-slate-400'
              }`}
          >
            A showcase of custom platforms, web applications, and enterprise solutions shipped by NexAlliance.
          </motion.p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'web', label: 'Web Platforms' },
              { id: 'erp', label: 'ERP & HRM' },
              { id: 'crm', label: 'Healthcare & CRM' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-150 border ${activeTab === tab.id
                  ? 'bg-[#0088FF] text-white shadow-lg shadow-[#0088FF]/30 scale-105 border-[#0088FF]'
                  : isLight
                    ? 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'
                    : 'bg-[#0B172E] text-slate-300 hover:bg-[#0F224A] border-[#1E3A8A]'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* CONDITION 1: Home Page Gallery Track (isHomePage === true) */}
        {isHomePage ? (
          <div className="relative w-full overflow-hidden py-2 sm:py-4 group/gallery">
            {/* Left Arrow Button */}
            <button
              onClick={() => scrollManual('left')}
              className={`absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-2xl transition-all cursor-pointer border border-white/30 ${isLight ? 'bg-white/90 text-slate-800 hover:bg-[#0088FF] hover:text-white' : 'bg-[#0B172E]/90 text-white hover:bg-[#0088FF]'
                }`}
              aria-label="Previous Projects"
            >
              <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
            </button>

            {/* Right Arrow Button */}
            <button
              onClick={() => scrollManual('right')}
              className={`absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-2xl transition-all cursor-pointer border border-white/30 ${isLight ? 'bg-white/90 text-slate-800 hover:bg-[#0088FF] hover:text-white' : 'bg-[#0B172E]/90 text-white hover:bg-[#0088FF]'
                }`}
              aria-label="Next Projects"
            >
              <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
            </button>

            {/* Left Fade Mask */}
            <div className={`absolute top-0 left-0 bottom-0 w-8 sm:w-28 z-20 pointer-events-none bg-gradient-to-r ${isLight ? 'from-[#F0F6FF] to-transparent' : 'from-[#050B17] to-transparent'
              }`}></div>

            {/* Right Fade Mask */}
            <div className={`absolute top-0 right-0 bottom-0 w-16 sm:w-28 z-20 pointer-events-none bg-gradient-to-l ${isLight ? 'from-[#F0F6FF] to-transparent' : 'from-[#050B17] to-transparent'
              }`}></div>

            {/* FAST & MANUAL SCROLLABLE GALLERY TRACK */}
            <div
              ref={scrollRef}
              className="w-full overflow-x-auto scroll-smooth py-2 no-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {activeTab === 'all' ? (
                <div className="nex-gpu-marquee-fast px-2 sm:px-4">
                  {[...projects, ...projects, ...projects].map((item, idx) => (
                    <div
                      key={`${item.id}-${idx}`}
                      onClick={() => handleProjectClick(item)}
                      className="w-[290px] xs:w-[340px] sm:w-[420px] h-[190px] xs:h-[220px] sm:h-[250px] shrink-0 rounded-[20px] sm:rounded-[24px] relative overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-slate-200/80 dark:border-white/20 bg-slate-900"
                    >
                      {/* Image Only - Centered in Box */}
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className={`absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-700 pointer-events-none ${
                            item.fit === 'contain'
                              ? 'object-contain object-center p-6 sm:p-8 bg-[#050B17]'
                              : 'object-cover object-center'
                          }`}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent pointer-events-none" />



                      {/* Project Name Only */}
                      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex items-center justify-between z-10">
                        <h4 className="font-heading text-lg sm:text-2xl font-black text-white drop-shadow-md">
                          {item.title}
                        </h4>
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-[#0088FF] group-hover:scale-110 transition-all shrink-0">
                          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex gap-4 sm:gap-6 px-4 sm:px-12 w-full justify-center flex-wrap">
                  {filtered.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleProjectClick(item)}
                      className="w-[290px] xs:w-[340px] sm:w-[420px] h-[190px] xs:h-[220px] sm:h-[250px] shrink-0 rounded-[20px] sm:rounded-[24px] relative overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-slate-200/80 dark:border-white/20 bg-slate-900"
                    >
                      {/* Image Only - Centered in Box */}
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className={`absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-700 pointer-events-none ${
                            item.fit === 'contain'
                              ? 'object-contain object-center p-6 sm:p-8 bg-[#050B17]'
                              : 'object-cover object-center'
                          }`}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent pointer-events-none" />



                      {/* Project Name Only */}
                      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex items-center justify-between z-10">
                        <h4 className="font-heading text-lg sm:text-2xl font-black text-white drop-shadow-md">
                          {item.title}
                        </h4>
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-[#0088FF] group-hover:scale-110 transition-all shrink-0">
                          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* CONDITION 2: Dedicated Full Portfolio Page View Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch max-w-7xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (idx % 3) * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="h-[240px] sm:h-[290px] rounded-[20px] sm:rounded-[24px] relative overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-200/80 dark:border-white/20 w-full bg-slate-900"
                  onClick={() => handleProjectClick(item)}
                >
                  {/* Image Only - Centered in Box */}
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-700 pointer-events-none ${
                        item.fit === 'contain'
                          ? 'object-contain object-center p-6 sm:p-8 bg-[#050B17]'
                          : 'object-cover object-center'
                      }`}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent pointer-events-none" />



                  {/* Project Name Only */}
                  <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 flex items-center justify-between z-10">
                    <h4 className="font-heading text-xl sm:text-2xl font-black text-white drop-shadow-md">
                      {item.title}
                    </h4>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-[#0088FF] group-hover:scale-110 transition-all shrink-0">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
}

