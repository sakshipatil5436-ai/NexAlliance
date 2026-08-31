import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ClientsSection({ onOpenBooking }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const clients = [
    { id: 1, title: 'Hotel Hilton TMS', image: '/projects/milton.webp' },
    { id: 2, title: 'Mad Over Grills MS', image: '/projects/Mad_over.webp' },
    { id: 3, title: 'Nirman Architects MS', image: '/projects/niraman.webp' },
    { id: 4, title: 'Modulite Interior', image: '/projects/modulite.webp' },
    { id: 5, title: 'Har Bole News', image: '/projects/harbole.webp' },
    { id: 6, title: 'BDSRN', image: '/projects/bdsrn.webp' },
    { id: 7, title: 'Novva Salon', image: '/projects/novva_salon.webp' },
    { id: 8, title: 'Gas Agency', image: '/projects/gas_agency.webp' },
    { id: 9, title: 'V Square Centre', image: '/projects/v_logo.webp' },
    { id: 10, title: 'Dotteds', image: '/projects/dotteds_logo.webp' },
    { id: 11, title: 'BrandBox', image: '/projects/brandbox.webp' },
    { id: 12, title: 'ArkA Stone Realty', image: '/projects/arka_logo.webp' },
    { id: 13, title: 'Luxbury Properties', image: '/projects/new-logo.webp' },
    { id: 14, title: 'Vrani Chemicals', image: '/projects/vrani_chemicals.webp' }
  ];

  return (
    <div className="pt-24 sm:pt-32 pb-12 bg-gradient-to-b from-[#F0F6FF] via-[#E8F2FF] to-[#F0F6FF] text-slate-900 select-none relative overflow-hidden">
      
      {/* Ambient Radial Blue Glow Points */}
      <div className="absolute top-12 left-1/4 w-[600px] h-[600px] bg-[#0088FF]/15 rounded-full filter blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute bottom-20 right-1/4 w-[600px] h-[600px] bg-cyan-400/15 rounded-full filter blur-[140px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 relative z-10">

        {/* Section Header Area */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center max-w-3xl mx-auto space-y-2"
        >
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0088FF]">
            OUR CLIENTS & PARTNERS
          </span>
          <h1 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Valued Ecosystem <span className="text-[#0088FF]">Clients & Brands</span>
          </h1>
          <p className="text-xs sm:text-sm font-semibold leading-relaxed text-slate-600 max-w-2xl mx-auto">
            Trusted enterprises, software platforms, and brands engineered by NexAlliance.
          </p>
        </motion.div>

        {/* All 14 Clients in 1 Compact View Grid (Fits on single scroll screen) */}
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 sm:gap-4 pt-2">
          {clients.map((client, idx) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut', delay: idx * 0.03 }}
              className="bg-white/95 backdrop-blur-xl border border-sky-200/90 hover:border-[#0088FF] rounded-2xl p-3 sm:p-4 h-24 sm:h-28 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center group overflow-hidden"
            >
              <img
                src={client.image}
                alt={client.title}
                loading="lazy"
                decoding="async"
                className="max-h-[60%] max-w-full object-contain object-center group-hover:scale-105 transition-transform duration-200 filter drop-shadow-sm"
              />
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 truncate w-full text-center mt-2 group-hover:text-[#0088FF]">
                {client.title}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
