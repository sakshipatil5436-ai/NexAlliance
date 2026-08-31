import React, { useState, useRef } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Portfolio({ onOpenBooking, theme = 'light', isHomePage = false }) {
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
      link: 'https://www.hilton.com/en/locations/india/'
    },
    {
      id: 2,
      category: 'erp',
      title: 'Mad Over Grills MS',
      image: '/projects/Mad_over.webp',
      tech: 'Restaurant Billing & POS',
      link: 'https://madovergrills.co.in/'
    },
    {
      id: 3,
      category: 'erp',
      title: 'Nirman Architects MS',
      image: '/projects/niraman.webp',
      tech: 'Architecture Management',
      link: 'https://www.nirman-architects.com/'
    },
    {
      id: 4,
      category: 'erp',
      title: 'Modulite Interior',
      image: '/projects/modulite.webp',
      tech: 'Interior Project Management',
      link: 'https://modulite.in/'
    },
    {
      id: 5,
      category: 'web',
      title: 'Har Bole – News Platform',
      image: '/projects/harbole.webp',
      tech: 'Digital News & CMS Portal',
      link: 'https://harbole.com/'
    },
    {
      id: 6,
      category: 'erp',
      title: 'BDSRN',
      image: '/projects/bdsrn.webp',
      tech: 'Disaster Resource Network',
      hideExplore: true
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
      link: 'https://vsquareneurospine.com/'
    },
    {
      id: 10,
      category: 'web',
      title: 'Dotteds',
      image: '/projects/dotteds_logo.webp',
      tech: 'Fashion E-Commerce Store',
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
      link: 'https://arkastonerealty.com/'
    },
    {
      id: 13,
      category: 'web',
      title: 'Luxbury Properties',
      image: '/projects/new-logo.webp',
      tech: 'Real Estate Portal',
      link: 'https://luxburyproperties.com/'
    },
    {
      id: 14,
      category: 'web',
      title: 'Vrani Chemicals',
      image: '/projects/vrani_chemicals.webp',
      tech: 'Chemical & Product Portal',
      link: 'https://vranichemicals.com/'
    }
  ];

  const handleProjectClick = (item) => {
    if (item.hideExplore) return;
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
    <section id="portfolio" className={`scroll-mt-20 ${isHomePage ? 'py-12 sm:py-16' : 'pt-28 sm:pt-36 pb-20 sm:pb-24'} transition-colors duration-500 relative overflow-hidden select-none bg-gradient-to-b from-[#F0F6FF] via-[#E8F2FF] to-[#F0F6FF] text-slate-900`}>

      {/* Ambient Radial Blue Glow Points */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-[#0088FF]/15 rounded-full filter blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-cyan-400/15 rounded-full filter blur-[140px] pointer-events-none z-0" />

      <div className={isHomePage ? "w-full relative z-10" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"}>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 px-4">
          <div className="relative inline-block text-center pb-1 mb-2">
            <div className="text-xs font-bold tracking-[0.25em] uppercase text-[#0088FF] text-center">
              <span>{isHomePage ? 'OUR PORTFOLIO GALLERY' : 'OUR PORTFOLIO'}</span>
            </div>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-3 text-slate-900">
            {isHomePage ? (
              <>Real Client <span className="text-[#0088FF]">Projects Showcase.</span></>
            ) : (
              <>Our Real <span className="text-[#0088FF]">Projects.</span></>
            )}
          </h2>

          <p className="text-xs sm:text-base font-semibold leading-relaxed max-w-2xl mx-auto text-slate-600">
            A showcase of custom platforms, web applications, and enterprise solutions shipped by NexAlliance.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'web', label: 'Web Platforms' },
              { id: 'erp', label: 'ERP & HRM' },
              { id: 'crm', label: 'Healthcare & CRM' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-colors duration-200 border cursor-pointer transform-gpu ${
                  activeTab === tab.id
                    ? 'bg-[#0088FF] text-white shadow-lg shadow-sky-500/30 border-[#0088FF]'
                    : 'bg-white/90 text-slate-600 hover:bg-white hover:text-[#0088FF] border-sky-200/80 shadow-sm'
                }`}
                style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* CONDITION 1: Home Page Gallery Track (isHomePage === true) */}
        {isHomePage ? (
          <div className="relative w-full overflow-hidden py-4 sm:py-6 group/gallery">
            {/* Left Arrow Button */}
            <button
              onClick={() => scrollManual('left')}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 text-slate-800 hover:bg-[#0088FF] hover:text-white border border-sky-200 shadow-xl flex items-center justify-center transition-colors cursor-pointer transform-gpu"
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
              aria-label="Previous Projects"
            >
              <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
            </button>

            {/* Right Arrow Button */}
            <button
              onClick={() => scrollManual('right')}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 text-slate-800 hover:bg-[#0088FF] hover:text-white border border-sky-200 shadow-xl flex items-center justify-center transition-colors cursor-pointer transform-gpu"
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
              aria-label="Next Projects"
            >
              <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
            </button>

            {/* Left Fade Mask */}
            <div className="absolute top-0 left-0 bottom-0 w-12 sm:w-32 z-20 pointer-events-none bg-gradient-to-r from-[#F0F6FF] to-transparent"></div>

            {/* Right Fade Mask */}
            <div className="absolute top-0 right-0 bottom-0 w-12 sm:w-32 z-20 pointer-events-none bg-gradient-to-l from-[#F0F6FF] to-transparent"></div>

            {/* SCROLLABLE GALLERY TRACK (Native smooth horizontal & arrow button scrolling ONLY) */}
            <div
              ref={scrollRef}
              className="w-full overflow-x-auto scroll-smooth py-3 no-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex gap-6 px-6 sm:px-12 w-max">
                {filtered.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleProjectClick(item)}
                    className="w-[290px] xs:w-[330px] sm:w-[400px] h-[220px] xs:h-[250px] sm:h-[280px] shrink-0 rounded-3xl relative overflow-hidden group cursor-pointer shadow-xl shadow-sky-500/5 hover:shadow-2xl hover:shadow-sky-500/20 transition-all duration-300 border-2 border-sky-300/80 hover:border-[#0088FF] bg-gradient-to-br from-[#F8FAFC] via-[#F0F6FF] to-[#E6F0FF] p-5 sm:p-6 flex flex-col justify-between transform-gpu subpixel-antialiased"
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
                  >
                    {/* Clean Logo Image Centered */}
                    <div className="flex-1 min-h-0 w-full flex items-center justify-center p-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className="max-h-full max-w-full object-contain object-center filter drop-shadow-sm transition-transform duration-300 transform-gpu"
                        style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
                      />
                    </div>

                    {/* Project Name & Explore Icon */}
                    <div className="flex items-center justify-between pt-3 pb-1 border-t border-sky-200/80 z-10 shrink-0 min-w-0">
                      <h3 className="font-heading text-sm sm:text-base font-extrabold text-slate-900 truncate pr-2">
                        {item.title}
                      </h3>
                      {!item.hideExplore && (
                        <div className="w-7 h-7 rounded-full bg-sky-100 text-[#0088FF] border border-sky-200 flex items-center justify-center group-hover:bg-[#0088FF] group-hover:text-white transition-all shrink-0">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* CONDITION 2: Dedicated Full Portfolio Page View Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch max-w-7xl mx-auto">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="h-[240px] sm:h-[280px] rounded-3xl relative overflow-hidden group cursor-pointer shadow-xl shadow-sky-500/5 hover:shadow-2xl hover:shadow-sky-500/20 transition-all duration-300 border-2 border-sky-300/80 hover:border-[#0088FF] bg-gradient-to-br from-[#F8FAFC] via-[#F0F6FF] to-[#E6F0FF] p-5 sm:p-7 flex flex-col justify-between w-full transform-gpu subpixel-antialiased"
                style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
                onClick={() => handleProjectClick(item)}
              >
                {/* Clean Logo Image Centered */}
                <div className="flex-1 min-h-0 w-full flex items-center justify-center p-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="max-h-full max-w-full object-contain object-center filter drop-shadow-sm transition-transform duration-300 transform-gpu"
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
                  />
                </div>

                {/* Project Name & Explore Icon */}
                <div className="flex items-center justify-between pt-3 pb-1 border-t border-sky-200/80 z-10 shrink-0 min-w-0">
                  <div className="min-w-0 pr-2">
                    <h3 className="font-heading text-base sm:text-lg font-black text-slate-900 truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 truncate">
                      {item.tech}
                    </p>
                  </div>
                  {!item.hideExplore && (
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-sky-100 text-[#0088FF] border border-sky-200 flex items-center justify-center group-hover:bg-[#0088FF] group-hover:text-white transition-all shrink-0">
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
