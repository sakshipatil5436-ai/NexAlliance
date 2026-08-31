import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Phone, Mail, ExternalLink, CheckCircle2, Send } from 'lucide-react';
import NexLogo from './NexLogo';

export default function BookingModal({ isOpen, onClose, theme = 'light', onToggleTheme }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    budget: '',
    projectDetails: ''
  });

  // Lock body scroll when Full Page Form is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      // 1. Direct FormSubmit Email Service to info@nexallianceit.com
      await fetch('https://formsubmit.co/ajax/info@nexallianceit.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Consultation Booking: ${formData.fullName}`,
          _captcha: "false",
          "Full Name": formData.fullName,
          "Email": formData.email,
          "Company": formData.company || 'N/A',
          "Budget": formData.budget || 'N/A',
          "Project Details": formData.projectDetails
        })
      });

      // 2. Also post to local backend server if active
      fetch('http://localhost:5000/api/send-contact-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Consultation Booking',
          fullName: formData.fullName,
          email: formData.email,
          company: formData.company,
          budget: formData.budget,
          projectDetails: formData.projectDetails,
          targetEmail: 'info@nexallianceit.com'
        })
      }).catch(() => {});
    } catch (err) {
      console.log('FormSubmit API offline, triggering mailto fallback:', err);
      const mailBody = encodeURIComponent(`Consultation Inquiry Details:\nName: ${formData.fullName}\nEmail: ${formData.email}\nCompany: ${formData.company || 'N/A'}\nBudget: ${formData.budget || 'N/A'}\nProject Details: ${formData.projectDetails}`);
      window.open(`mailto:info@nexallianceit.com?subject=New Consultation Booking: ${encodeURIComponent(formData.fullName)}&body=${mailBody}`, '_blank');
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      company: '',
      budget: '',
      projectDetails: ''
    });
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {/* LIGHT WEBSITES MATCHING FULL PAGE FORM CONTAINER */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[100000] w-screen h-screen bg-[#F8FAFC] text-slate-900 flex flex-col overflow-hidden select-none"
      >

        {/* Ambient Radial Glow Points matching site theme */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-sky-200/40 rounded-full filter blur-[140px] pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-blue-100/50 rounded-full filter blur-[140px] pointer-events-none z-0"></div>

        {/* Top Sticky Header Bar */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between shrink-0 relative z-20 bg-white/95 backdrop-blur-xl text-slate-900 shadow-sm">

          {/* Light Theme Logo */}
          <div className="flex items-center gap-3">
            <NexLogo theme="light" />
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-600">
            <a href="#home" onClick={onClose} className="hover:text-[#0088FF] transition-colors">Home</a>
            <a href="#about" onClick={onClose} className="hover:text-[#0088FF] transition-colors">About</a>
            <a href="#services" onClick={onClose} className="hover:text-[#0088FF] transition-colors">Services</a>
            <a href="#portfolio" onClick={onClose} className="hover:text-[#0088FF] transition-colors">Portfolio</a>
            <a href="#careers" onClick={onClose} className="hover:text-[#0088FF] transition-colors">Careers</a>
          </div>
        </div>

        {/* FULL PAGE SCROLLABLE CONTENT BODY */}
        <div className="flex-grow overflow-y-auto scrollbar-none p-4 sm:p-8 lg:p-10 relative z-10">

          <div className="max-w-7xl mx-auto space-y-6">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* LEFT CARD: Light Glass Contact Form (7 cols) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="lg:col-span-7 rounded-3xl p-6 sm:p-8 transition-all duration-300 border border-sky-100 bg-white/95 backdrop-blur-xl shadow-xl text-slate-900"
              >

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-300 flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-sm max-w-md mx-auto leading-relaxed font-semibold text-slate-600">
                      Thank you <strong className="text-[#0088FF]">{formData.fullName || 'there'}</strong>! Our team at NexAlliance has received your project details and will get back to you within 2 hours.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleReset}
                      className="mt-4 bg-[#0088FF] hover:bg-[#0077E6] text-white font-extrabold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full shadow-lg shadow-[#0088FF]/30 transition-all cursor-pointer"
                    >
                      Close Window
                    </motion.button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="border-b border-slate-200 pb-4 mb-2 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-heading text-lg sm:text-xl font-black uppercase tracking-tight text-[#0088FF]">
                          START CONSULTATION
                        </h3>
                        <p className="text-xs font-semibold text-slate-600 mt-1">
                          Tell us about your project goals and technical requirements to get a free estimate.
                        </p>
                      </div>

                      {/* Close Icon directly above / inside Start Consultation form header */}
                      <motion.button
                        type="button"
                        onClick={onClose}
                        whileHover={{ scale: 1.08, rotate: 90 }}
                        whileTap={{ scale: 0.92 }}
                        className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 border border-slate-200/90 bg-slate-100/80 text-slate-700 hover:bg-[#0088FF] hover:text-white hover:border-[#0088FF] shadow-sm shrink-0 cursor-pointer"
                        aria-label="Close modal"
                      >
                        <X className="w-4.5 h-4.5 stroke-[2.5]" />
                      </motion.button>
                    </div>

                    {/* Inputs Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                      {/* Full Name */}
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest text-[#0088FF] mb-1.5">
                          Full name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Enter your name"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl text-sm font-semibold bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[#0088FF]/30 transition-all"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest text-[#0088FF] mb-1.5">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl text-sm font-semibold bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[#0088FF]/30 transition-all"
                        />
                      </div>

                      {/* Company */}
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest text-[#0088FF] mb-1.5">
                          Company
                        </label>
                        <input
                          type="text"
                          placeholder="Acme Inc."
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl text-sm font-semibold bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[#0088FF]/30 transition-all"
                        />
                      </div>

                      {/* Budget */}
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest text-[#0088FF] mb-1.5">
                          Budget
                        </label>
                        <input
                          type="text"
                          placeholder="$25k - $100k"
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl text-sm font-semibold bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[#0088FF]/30 transition-all"
                        />
                      </div>

                    </div>

                    {/* Project details */}
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-widest text-[#0088FF] mb-1.5">
                        Project details
                      </label>
                      <textarea
                        rows="5"
                        required
                        placeholder="Tell us what you're trying to accomplish..."
                        value={formData.projectDetails}
                        onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl text-sm font-semibold bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[#0088FF]/30 transition-all resize-none"
                      ></textarea>
                    </div>

                    {/* Send message Button */}
                    <div className="pt-2">
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-gradient-to-r from-[#0088FF] via-[#0077E6] to-[#2563EB] hover:from-[#0077E6] hover:to-[#1D4ED8] text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-lg shadow-[#0088FF]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>Send message</span>
                      </motion.button>
                    </div>

                  </form>
                )}

              </motion.div>

              {/* RIGHT CARD: Light Glass Contact Info & Map (5 cols) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="lg:col-span-5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 border border-sky-100 bg-white/95 backdrop-blur-xl shadow-xl text-slate-900"
              >

                {/* Contact Info */}
                <div className="space-y-5">
                  <h3 className="font-heading font-black text-2xl tracking-tight text-slate-900 flex items-center justify-between">
                    <span>NexAlliance</span>
                    <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-sky-50 text-[#0088FF] border border-sky-200">
                      HEADQUARTERS
                    </span>
                  </h3>

                  <div className="space-y-4 text-xs sm:text-sm font-semibold text-slate-700">

                    {/* Address */}
                    <div className="flex items-start gap-3 group cursor-pointer">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border border-sky-200 bg-sky-50 text-[#0088FF] group-hover:bg-[#0088FF] group-hover:text-white transition-all">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="leading-relaxed">
                        Dhwarkesh Society, 35, Lajamni Chowk, Near Raghuveer Shoppers, Mota Varachha, Surat, Gujarat 394101
                      </span>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-3 group cursor-pointer">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-sky-200 bg-sky-50 text-[#0088FF] group-hover:bg-[#0088FF] group-hover:text-white transition-all">
                        <Phone className="w-4 h-4" />
                      </div>
                      <a href="tel:+916351178511" className="hover:text-[#0088FF] transition-colors font-bold">
                        +91 63511 78511
                      </a>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-3 group cursor-pointer">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-sky-200 bg-sky-50 text-[#0088FF] group-hover:bg-[#0088FF] group-hover:text-white transition-all">
                        <Mail className="w-4 h-4" />
                      </div>
                      <a href="mailto:info@nexallianceit.com" className="hover:text-[#0088FF] transition-colors font-bold">
                        info@nexallianceit.com
                      </a>
                    </div>

                  </div>
                </div>

                {/* Embedded Map Section */}
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 h-64 sm:h-72 shadow-lg bg-slate-100 group">

                  {/* Real Google Map iframe */}
                  <iframe
                    title="NexAlliance Surat Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.170660421276!2d72.8809462!3d21.2251147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f4a36279f97%3A0xb3ad24ef4b4ef92c!2sDwarkesh%20Society%2C%20Lajamni%20Chowk%2C%20Mota%20Varachha%2C%20Surat%2C%20Gujarat%20394101!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full filter contrast-[1.05]"
                  ></iframe>

                  {/* Light Glass Map Card Overlay */}
                  <div className="absolute top-3 left-3 right-3 backdrop-blur-md p-3.5 rounded-xl border border-slate-200 bg-white/95 text-slate-900 shadow-lg pointer-events-auto transition-all duration-300">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-xs flex items-center gap-1 text-slate-900">
                          Dwarkesh Society
                        </h4>
                        <p className="text-[10px] leading-tight mt-0.5 line-clamp-2 font-medium text-slate-600">
                          Lajamni Chowk, nr. Ekta Raw House, Shanti Niketan Society, Mota Varachha, Surat, Gujarat 394101, India
                        </p>
                      </div>
                      <a
                        href="https://maps.google.com/?q=Dwarkesh+Society,+Lajamni+Chowk,+Mota+Varachha,+Surat,+Gujarat+394101"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0088FF] hover:text-[#0077E6] p-1 shrink-0"
                        title="Open in Google Maps"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                </div>

              </motion.div>

            </div>

          </div>

        </div>

      </motion.div>
    </AnimatePresence>
  );
}
