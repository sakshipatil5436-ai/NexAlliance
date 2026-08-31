import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AboutSection from './AboutSection';

export default function AboutSPAView({ onOpenBooking, theme = 'light' }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gradient-to-b from-[#F0F6FF] via-white to-[#F0F6FF] select-none"
    >
      {/* Dedicated About Section View ONLY */}
      <AboutSection onOpenBooking={onOpenBooking} theme={theme} showFounders={true} />
    </motion.div>
  );
}
