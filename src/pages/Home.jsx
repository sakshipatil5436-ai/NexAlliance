import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Services from '../components/Services';
import AboutSection from '../components/AboutSection';
import ProcessWorkflow from '../components/ProcessWorkflow';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import ContactSection from '../components/ContactSection';

export default function Home({ onOpenBooking, onOpenServiceDetail, theme }) {
  const techRainItems = [
    { text: "CRM", left: "5%", duration: 16, delay: 0 },
    { text: "HRM", left: "15%", duration: 18, delay: 2, desktopOnly: true },
    { text: "REACT.JS", left: "28%", duration: 15, delay: 0.5 },
    { text: "ERP", left: "40%", duration: 17, delay: 3, desktopOnly: true },
    { text: "NODE.JS", left: "52%", duration: 14, delay: 1, desktopOnly: true },
    { text: "WEB.APP", left: "62%", duration: 16, delay: 1.5 },
    { text: "AI & ML", left: "75%", duration: 15, delay: 2.5, desktopOnly: true },
    { text: "AWS CLOUD", left: "88%", duration: 18, delay: 0.8 }
  ];

  return (
    <div className="w-full flex flex-col relative overflow-hidden">
      {/* 1. HERO SECTION (100% UNTOUCHED - NO CHANGES IN HERO SECTION) */}
      <Hero onOpenBooking={onOpenBooking} theme={theme} />

      {/* 2. GLOBAL HOME BACKGROUND TECH CODE MATRIX RAINFALL (CRM, HRM, ERP, REACT.JS, etc.) */}
      <div className="relative w-full flex flex-col">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-35 z-0 transform-gpu">
          {techRainItems.map((item, idx) => (
            <motion.div
              key={idx}
              animate={{
                y: ["-5%", "105%"],
                opacity: [0, 0.85, 0.85, 0]
              }}
              transition={{
                duration: item.duration,
                repeat: Infinity,
                ease: "linear",
                delay: item.delay
              }}
              style={{ left: item.left }}
              className={`absolute top-0 font-mono text-xs font-bold tracking-widest uppercase select-none pointer-events-none text-transparent bg-clip-text bg-gradient-to-b from-cyan-400 via-[#0088FF] to-blue-600 whitespace-nowrap ${
                item.desktopOnly ? 'hidden sm:block' : 'block'
              }`}
            >
              <span className="text-cyan-400 opacity-60 mr-1">&gt;</span>
              <span>{item.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Home Page Sections Overlay */}
        <div className="relative z-10 w-full flex flex-col">
          <Stats theme={theme} />
          <AboutSection onOpenBooking={onOpenBooking} theme={theme} showFounders={false} />
          <Services onOpenBooking={onOpenBooking} onOpenServiceDetail={onOpenServiceDetail} theme={theme} isHomePage={true} />
          <ProcessWorkflow onOpenBooking={onOpenBooking} theme={theme} />
          <Portfolio onOpenBooking={onOpenBooking} theme={theme} isHomePage={true} />
          <Testimonials theme={theme} />
          <ContactSection onOpenBooking={onOpenBooking} theme={theme} isHomePage={true} />
        </div>
      </div>
    </div>
  );
}
