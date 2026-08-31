import React, { useEffect } from 'react';

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
    <div className="min-h-screen pt-28 sm:pt-36 pb-20 bg-gradient-to-b from-[#F0F6FF] via-[#E8F2FF] to-[#F0F6FF] text-slate-900 select-none relative overflow-hidden">
      
      {/* Ambient Radial Blue Glow Points */}
      <div className="absolute top-12 left-1/4 w-[600px] h-[600px] bg-[#0088FF]/15 rounded-full filter blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute bottom-20 right-1/4 w-[600px] h-[600px] bg-cyan-400/15 rounded-full filter blur-[140px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 relative z-10">

        {/* Section Header Area */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0088FF]">
            OUR CLIENTS & PARTNERS
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Valued Ecosystem <span className="text-[#0088FF]">Clients & Brands</span>
          </h1>
          <p className="text-sm sm:text-base font-semibold leading-relaxed text-slate-600 max-w-2xl mx-auto">
            A clean, direct list of trusted enterprises, software platforms, and brands engineered by NexAlliance.
          </p>
        </div>

        {/* Plain Numbered Logos Layout - No Boxes, No Cards, No Dark Backgrounds, No Explore */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 pt-4">
          {clients.map((client) => {
            const formattedNum = String(client.id).padStart(2, '0');

            return (
              <div
                key={client.id}
                className="flex items-center gap-5 sm:gap-7 py-3 px-2 border-b border-sky-200/60"
              >
                {/* Numbering */}
                <span className="font-heading text-xl sm:text-2xl font-black text-[#0088FF] shrink-0">
                  {formattedNum}.
                </span>

                {/* Plain Logo directly on screen */}
                <div className="h-12 sm:h-16 w-32 sm:w-44 shrink-0 flex items-center justify-start">
                  <img
                    src={client.image}
                    alt={client.title}
                    className="max-h-full max-w-full object-contain object-left filter drop-shadow-sm"
                  />
                </div>

                {/* Plain Text Title */}
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                    {client.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
