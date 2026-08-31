import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import NexLogo from './NexLogo';

export default function Navbar({ onOpenBooking }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/clients', label: 'Clients' },
    { path: '/careers', label: 'Careers' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-[9999] bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-sm select-none transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">

        {/* NexAlliance Logo */}
        <NavLink to="/" className="shrink-0">
          <NexLogo theme="light" />
        </NavLink>

        {/* Desktop Nav Links (Identical across all views) */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `text-sm transition-all duration-200 relative ${
                  isActive
                    ? 'text-[#0088FF] font-black scale-105'
                    : 'text-slate-700 font-semibold hover:text-[#0088FF]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#0088FF] rounded-full shadow-sm"></span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Action Button - BOOK A CALL */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenBooking}
            className="group flex items-center gap-1.5 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white font-black text-xs uppercase tracking-wider px-5 py-2.5 rounded-full shadow-md shadow-[#2563EB]/20 transition-all hover:scale-105 cursor-pointer"
          >
            <span>BOOK A CALL</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl border bg-white border-slate-200 text-[#0088FF]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Responsive Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-b px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200 bg-white border-slate-200 text-slate-800">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block text-base font-semibold transition-colors ${
                  isActive
                    ? 'text-[#0088FF] font-black border-l-4 border-[#0088FF] pl-3'
                    : 'text-slate-700 hover:text-[#0088FF]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="pt-2">
            <button
              onClick={() => { setMobileOpen(false); onOpenBooking(); }}
              className="w-full flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white font-black text-xs uppercase tracking-wider py-3 rounded-full shadow-md cursor-pointer"
            >
              <span>BOOK A CALL</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
