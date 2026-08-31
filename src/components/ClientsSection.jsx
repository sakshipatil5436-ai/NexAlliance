import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ClientsSection() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const clients = [
    { id: 1, title: 'Hotel Hilton TMS', image: '/projects/milton.webp' },
    { id: 2, title: 'Mad Over Grills MS', image: '/projects/Mad_over.webp' },
    { id: 3, title: 'Nirman Architects MS', image: '/projects/niraman.webp' },
    { id: 4, title: 'Modulite Interior', image: '/projects/modulite.webp' },
    { id: 5, title: 'Har Bole – News Platform', image: '/projects/harbole.webp' },
    { id: 6, title: 'BDSRN', image: '/projects/bdsrn.webp' },
    { id: 7, title: 'Novva Salon', image: '/projects/novva_salon.webp' },
    { id: 8, title: 'Gas Agency', image: '/projects/gas_agency.webp' },
    { id: 9, title: 'V Square Neuro Spine Centre', image: '/projects/v_logo.webp' },
    { id: 10, title: 'Dotteds', image: '/projects/dotteds_logo.webp' },
    { id: 11, title: 'BrandBox', image: '/projects/brandbox.webp' },
    { id: 12, title: 'ArkA Stone Realty', image: '/projects/arka_logo.webp' },
    { id: 13, title: 'Luxbury Properties', image: '/projects/new-logo.webp' },
    { id: 14, title: 'Vrani Chemicals', image: '/projects/vrani_chemicals.webp' }
  ];

  return (
    <div className="min-h-screen pt-28 sm:pt-36 pb-24 bg-gradient-to-b from-[#F0F6FF] via-[#E8F2FF] to-[#F0F6FF] text-slate-900 select-none relative overflow-hidden">
      
      {/* Ambient Radial Blue Glow Points */}
      <div className="absolute top-12 left-1/4 w-[600px] h-[600px] bg-[#0088FF]/15 rounded-full filter blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute bottom-20 right-1/4 w-[600px] h-[600px] bg-cyan-400/15 rounded-full filter blur-[140px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 relative z-10">

        {/* Section Header Area */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0088FF]">
            OUR CLIENTS & PARTNERS
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Valued Ecosystem <span className="text-[#0088FF]">Clients & Brands</span>
          </h1>
          <p className="text-sm sm:text-base font-semibold leading-relaxed text-slate-600 max-w-2xl mx-auto">
            Trusted enterprises, software platforms, and brands engineered by NexAlliance.
          </p>
        </motion.div>

        {/* Fast Animated Logo Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 pt-4">
          {clients.map((client, idx) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, ease: 'easeOut', delay: (idx % 4) * 0.05 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white/90 border border-sky-200/80 hover:border-[#0088FF] rounded-3xl p-5 sm:p-6 shadow-lg shadow-sky-500/5 hover:shadow-2xl hover:shadow-sky-500/20 transition-all duration-200 flex items-center justify-center group transform-gpu"
            >
              {/* Inner Dark Logo Container for Clean Contrast */}
              <div className="w-full h-28 sm:h-36 rounded-2xl bg-[#050B17] border border-slate-800 p-4 sm:p-6 flex items-center justify-center overflow-hidden">
                <img
                  src={client.image}
                  alt={client.title}
                  className="max-h-full max-w-full object-contain object-center group-hover:scale-108 transition-transform duration-300"
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
