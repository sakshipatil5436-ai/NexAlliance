import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Phone, MapPin, Globe } from 'lucide-react';
import NexLogo from './NexLogo';

export default function Footer({ onOpenBooking }) {
  return (
    <footer id="footer" className="w-full max-w-full bg-gradient-to-b from-white via-[#F0F6FF] to-white text-slate-900 pt-10 pb-8 border-t border-sky-200 relative overflow-hidden select-none">

      {/* Background radial glow (GPU Accelerated) */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#0088FF]/10 rounded-full filter blur-2xl pointer-events-none transform-gpu"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-sky-100">

          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-6 text-left">
            <Link to="/">
              <NexLogo theme="light" />
            </Link>

            <p className="text-sm text-slate-600 max-w-sm leading-relaxed font-semibold">
              We design, build and scale living digital products — ERP, CRM, web, mobile, cloud and growth, engineered as one ecosystem.
            </p>

            <div className="flex items-center gap-3">
              {/* Vibrant LinkedIn */}
              <a 
                href="https://www.linkedin.com/company/nexalliance" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn" 
                className="w-10 h-10 rounded-full bg-[#0088FF]/15 text-[#0088FF] border border-[#0088FF]/30 flex items-center justify-center transition-all hover:bg-[#0088FF] hover:text-white hover:scale-110 shadow-sm cursor-pointer"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>

              {/* Vibrant Instagram */}
              <a 
                href="https://www.instagram.com/nexalliance" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram" 
                className="w-10 h-10 rounded-full bg-[#0088FF]/15 text-[#0088FF] border border-[#0088FF]/30 flex items-center justify-center transition-all hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 hover:text-white hover:scale-110 shadow-sm cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="text-left">
            <h4 className="font-heading font-extrabold text-sm text-slate-900 uppercase tracking-wider mb-4">Ecosystems</h4>
            <ul className="space-y-3 text-xs font-semibold text-slate-600">
              <li><Link to="/services/erp" className="hover:text-[#0088FF] transition-colors">Enterprise ERP</Link></li>
              <li><Link to="/services/crm" className="hover:text-[#0088FF] transition-colors">Custom CRM Solutions</Link></li>
              <li><Link to="/services/web" className="hover:text-[#0088FF] transition-colors">Web Engineering</Link></li>
              <li><Link to="/services/mobile" className="hover:text-[#0088FF] transition-colors">Mobile Applications</Link></li>
              <li><Link to="/services/cloud" className="hover:text-[#0088FF] transition-colors">Cloud & DevOps</Link></li>
              <li><Link to="/services/uiux" className="hover:text-[#0088FF] transition-colors">UI/UX Design</Link></li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="text-left">
            <h4 className="font-heading font-extrabold text-sm text-slate-900 uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3 text-xs font-semibold text-slate-600">
              <li><Link to="/about" className="hover:text-[#0088FF] transition-colors">About Us & Founders</Link></li>
              <li><Link to="/portfolio" className="hover:text-[#0088FF] transition-colors">Case Studies & Work</Link></li>
              <li><Link to="/careers" className="hover:text-[#0088FF] transition-colors">Careers & Openings</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Action */}
          <div className="text-left">
            <h4 className="font-heading font-extrabold text-sm text-slate-900 uppercase tracking-wider mb-4">Get In Touch</h4>
            <div className="space-y-3 text-xs font-semibold text-slate-600 mb-6">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0088FF]" />
                <a href="mailto:info@nexallianceit.com" className="hover:text-[#0088FF] transition-colors">info@nexallianceit.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0088FF]" />
                <a href="tel:+916351178511" className="hover:text-[#0088FF] transition-colors">+91 63511 78511</a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#0088FF] shrink-0 mt-0.5" />
                <span>Dhwarkesh Society, Mota Varachha, Surat, Gujarat 394101</span>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#0088FF] via-[#0077E6] to-[#2563EB] hover:from-[#0077E6] hover:to-[#1D4ED8] text-white font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-full shadow-lg shadow-sky-500/25 transition-all hover:scale-105 cursor-pointer"
            >
              <span>BOOK CONSULTATION</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
          <p>© {new Date().getFullYear()} NexAlliance IT Services Inc. All rights reserved.</p>
          <p>Designed with High-End Tech Aesthetic for Startups & Enterprises.</p>
        </div>

      </div>
    </footer>
  );
}
