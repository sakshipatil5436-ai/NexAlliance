import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AboutSection from './AboutSection';

export default function AboutSPAView({ onOpenBooking, theme = 'light' }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gradient-to-b from-[#F0F6FF] via-[#E8F2FF] to-[#F0F6FF] select-none"
    >
      {/* Dedicated About Section View ONLY */}
      <AboutSection onOpenBooking={onOpenBooking} theme={theme} showFounders={true} />
    </motion.div>
  );
}
