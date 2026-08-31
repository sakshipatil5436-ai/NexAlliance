import React, { useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

export default function ClientsSection({ onOpenBooking }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const clients = [
    { id: 1, title: 'Hotel Hilton TMS', image: '/projects/milton.webp', link: 'https://www.hilton.com/en/locations/india/' },
    { id: 2, title: 'Mad Over Grills MS', image: '/projects/Mad_over.webp', link: 'https://madovergrills.co.in/' },
    { id: 3, title: 'Nirman Architects MS', image: '/projects/niraman.webp', link: 'https://www.nirman-architects.com/' },
    { id: 4, title: 'Modulite Interior', image: '/projects/modulite.webp', link: 'https://modulite.in/' },
    { id: 5, title: 'Har Bole – News Platform', image: '/projects/harbole.webp', link: 'https://harbole.com/' },
    { id: 6, title: 'BDSRN', image: '/projects/bdsrn.webp' },
    { id: 7, title: 'Novva Salon', image: '/projects/novva_salon.webp' },
    { id: 8, title: 'Gas Agency', image: '/projects/gas_agency.webp' },
    { id: 9, title: 'V Square Neuro Spine Centre', image: '/projects/v_logo.webp', link: 'https://vsquareneurospine.com/' },
    { id: 10, title: 'Dotteds', image: '/projects/dotteds_logo.webp', link: 'https://dotteds.in/' },
    { id: 11, title: 'BrandBox', image: '/projects/brandbox.webp' },
    { id: 12, title: 'ArkA Stone Realty', image: '/projects/arka_logo.webp', link: 'https://arkastonerealty.com/' },
    { id: 13, title: 'Luxbury Properties', image: '/projects/new-logo.webp', link: 'https://luxburyproperties.com/' },
    { id: 14, title: 'Vrani Chemicals', image: '/projects/vrani_chemicals.webp', link: 'https://vranichemicals.com/' }
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
            A comprehensive list of trusted enterprises, software platforms, and brands engineered by NexAlliance.
          </p>
        </div>

        {/* Static 2-Line Numbered Client Grid (No Animations) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {clients.map((client) => {
            const formattedNum = String(client.id).padStart(2, '0');
            const hasLink = Boolean(client.link);

            return (
              <div
                key={client.id}
                onClick={() => {
                  if (hasLink) {
                    window.open(client.link, '_blank', 'noopener,noreferrer');
                  }
                }}
                className={`p-5 sm:p-6 rounded-2xl bg-white/90 border border-sky-200/80 shadow-md flex items-center justify-between gap-4 transition-all ${
                  hasLink ? 'cursor-pointer hover:border-[#0088FF] hover:shadow-xl' : 'cursor-default'
                }`}
              >
                {/* Left: Number & Logo & Title */}
                <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                  {/* Numbering */}
                  <span className="font-heading text-lg sm:text-xl font-black text-[#0088FF] bg-sky-100/80 px-3 py-1.5 rounded-xl border border-sky-200 shrink-0">
                    {formattedNum}.
                  </span>

                  {/* Logo Frame */}
                  <div className="w-16 h-12 sm:w-20 sm:h-14 rounded-xl bg-[#050B17] border border-slate-700/60 p-2 flex items-center justify-center shrink-0">
                    <img
                      src={client.image}
                      alt={client.title}
                      className="max-h-full max-w-full object-contain object-center"
                    />
                  </div>

                  {/* Client Title */}
                  <div className="min-w-0">
                    <h3 className="font-heading text-sm sm:text-base font-bold text-slate-900 truncate">
                      {client.title}
                    </h3>
                  </div>
                </div>

                {/* Right: External Link Indicator if available */}
                {hasLink && (
                  <div className="w-8 h-8 rounded-full bg-sky-100 text-[#0088FF] border border-sky-200 flex items-center justify-center shrink-0">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
