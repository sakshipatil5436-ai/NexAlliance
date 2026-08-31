import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ExternalLink, Star, Info, CheckCircle2, Send } from 'lucide-react';

export default function ContactSection({ onOpenBooking, theme = 'dark', isHomePage = false }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    budget: '',
    projectDetails: ''
  });

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
          _subject: `New Contact Inquiry: ${formData.fullName}`,
          _captcha: "false",
          "Full Name": formData.fullName,
          "Email": formData.email,
          "Company": formData.company || 'N/A',
          "Budget": formData.budget || 'N/A',
          "Message": formData.projectDetails
        })
      });

      // 2. Also post to local backend server if active
      fetch('http://localhost:5000/api/send-contact-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Contact Inquiry',
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
      const mailBody = encodeURIComponent(`Contact Inquiry Details:\nName: ${formData.fullName}\nEmail: ${formData.email}\nCompany: ${formData.company || 'N/A'}\nBudget: ${formData.budget || 'N/A'}\nMessage: ${formData.projectDetails}`);
      window.open(`mailto:info@nexallianceit.com?subject=New Contact Inquiry: ${encodeURIComponent(formData.fullName)}&body=${mailBody}`, '_blank');
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
  };

  const isLight = theme === 'light';

  return (
    <section id="contact" className={`scroll-mt-20 pt-28 sm:pt-36 pb-16 sm:pb-20 transition-colors duration-500 relative overflow-hidden select-none ${
      isLight ? 'bg-gradient-to-b from-[#F0F6FF] via-white to-[#F0F6FF] text-slate-800' : 'bg-[#050B17] text-white'
    }`}>

      {/* Background Animated Glow Spheres (GPU Accelerated) */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-[#0088FF]/10 rounded-full filter blur-2xl pointer-events-none transform-gpu"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-500/10 rounded-full filter blur-2xl pointer-events-none transform-gpu"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-8">

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative inline-block text-center pb-1 mb-2"
          >
            <div className="text-xs sm:text-sm font-black tracking-[0.22em] uppercase text-[#0088FF] text-center">
              <span>CONTACT NEXALLIANCE</span>
            </div>
            {!isHomePage && (
              <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#0088FF] to-transparent mt-2 rounded-full shadow-sm"></div>
            )}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mt-4 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            Let's build something <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0088FF] via-cyan-400 to-[#2563EB]">
              extraordinary together.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-sm font-semibold leading-relaxed mt-3 ${
              isLight ? 'text-slate-600' : 'text-slate-300'
            }`}
          >
            Have a project in mind, need technical architecture review, or looking to scale your engineering team? Reach out below.
          </motion.p>

        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT CARD: Contact Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`transform-gpu lg:col-span-7 rounded-3xl p-5 sm:p-7 transition-all duration-300 border ${
              isLight ? 'bg-white/95 border-slate-200/80 shadow-md text-slate-900' : 'bg-[#0B172E]/95 border-[#1E3A8A]/80 shadow-xl text-white'
            }`}
          >

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce shadow-lg">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className={`text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Message Sent Successfully!
                </h3>
                <p className={`text-sm max-w-md mx-auto leading-relaxed font-semibold ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  Thank you <strong className={isLight ? 'text-slate-900' : 'text-white'}>{formData.fullName || 'there'}</strong>! Our team at NexAlliance has received your project details and will get back to you within 2 hours.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-4 bg-[#0088FF] hover:bg-[#0077E6] text-white font-extrabold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full shadow-md transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* Full Name */}
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                      isLight ? 'text-slate-700' : 'text-slate-200'
                    }`}>
                      Full name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-sky-200 bg-sky-50/70 text-slate-900 placeholder:text-slate-400 text-xs font-semibold outline-none focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[#0088FF]/30 transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                      isLight ? 'text-slate-700' : 'text-slate-200'
                    }`}>
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0088FF]/40 transition-all font-medium border ${
                        isLight
                          ? 'bg-[#F8FAFC] border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#0088FF] focus:bg-white'
                          : 'bg-[#050B17] border-[#1E3A8A] text-white placeholder:text-slate-500 focus:border-[#3B82F6] focus:bg-[#050B17]/90'
                      }`}
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                      isLight ? 'text-slate-700' : 'text-slate-200'
                    }`}>
                      Company
                    </label>
                    <input
                      type="text"
                      placeholder="Acme Inc."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className={`w-full px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0088FF]/40 transition-all font-medium border ${
                        isLight
                          ? 'bg-[#F8FAFC] border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#0088FF] focus:bg-white'
                          : 'bg-[#050B17] border-[#1E3A8A] text-white placeholder:text-slate-500 focus:border-[#3B82F6] focus:bg-[#050B17]/90'
                      }`}
                    />
                  </div>

                  {/* Budget */}
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                      isLight ? 'text-slate-700' : 'text-slate-200'
                    }`}>
                      Budget
                    </label>
                    <input
                      type="text"
                      placeholder="$25k - $100k"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className={`w-full px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0088FF]/40 transition-all font-medium border ${
                        isLight
                          ? 'bg-[#F8FAFC] border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#0088FF] focus:bg-white'
                          : 'bg-[#050B17] border-[#1E3A8A] text-white placeholder:text-slate-500 focus:border-[#3B82F6] focus:bg-[#050B17]/90'
                      }`}
                    />
                  </div>

                </div>

                {/* Project details */}
                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                    isLight ? 'text-slate-700' : 'text-slate-200'
                  }`}>
                    Project details
                  </label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Tell us what you're trying to accomplish..."
                    value={formData.projectDetails}
                    onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                    className={`w-full px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0088FF]/40 transition-all resize-none font-medium border ${
                      isLight
                        ? 'bg-[#F8FAFC] border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#0088FF] focus:bg-white'
                        : 'bg-[#050B17] border-[#1E3A8A] text-white placeholder:text-slate-500 focus:border-[#3B82F6] focus:bg-[#050B17]/90'
                    }`}
                  ></textarea>
                </div>

                {/* Send message Button */}
                <div className="pt-2">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 136, 255, 0.4)" }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-[#0088FF] hover:bg-[#0077E6] text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-[#0088FF]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send message</span>
                  </motion.button>
                </div>

              </form>
            )}

          </motion.div>

          {/* RIGHT CARD: Contact Info & Map (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`lg:col-span-5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 border ${
              isLight ? 'bg-white/95 border-slate-200/80 shadow-md text-slate-900' : 'bg-[#0B172E]/95 border-[#1E3A8A]/80 shadow-xl text-white'
            }`}
          >

            {/* Contact Info */}
            <div className="space-y-5">
              <h3 className={`font-heading font-black text-2xl tracking-tight flex items-center justify-between ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                <span>NexAlliance</span>
              </h3>

              <div className={`space-y-4 text-xs sm:text-sm font-medium ${
                isLight ? 'text-slate-600' : 'text-slate-300'
              }`}>

                {/* Address */}
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-3 group cursor-pointer"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 border group-hover:scale-110 transition-transform ${
                    isLight ? 'bg-sky-50 border-sky-200 text-[#0088FF]' : 'bg-[#050B17] border-[#1E3A8A] text-[#3B82F6]'
                  }`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="leading-relaxed">
                    Dhwarkesh Society, 35, Lajamni Chowk, Near Raghuveer Shoppers, Mota Varachha, Surat, Gujarat 394101
                  </span>
                </motion.div>

                {/* Phone */}
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border group-hover:scale-110 transition-transform ${
                    isLight ? 'bg-sky-50 border-sky-200 text-[#0088FF]' : 'bg-[#050B17] border-[#1E3A8A] text-[#3B82F6]'
                  }`}>
                    <Phone className="w-4 h-4" />
                  </div>
                  <a href="tel:+916351178511" className="hover:text-[#0088FF] transition-colors">
                    +91 63511 78511
                  </a>
                </motion.div>

                {/* Email */}
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border group-hover:scale-110 transition-transform ${
                    isLight ? 'bg-sky-50 border-sky-200 text-[#0088FF]' : 'bg-[#050B17] border-[#1E3A8A] text-[#3B82F6]'
                  }`}>
                    <Mail className="w-4 h-4" />
                  </div>
                  <a href="mailto:info@nexallianceit.com" className="hover:text-[#0088FF] transition-colors">
                    info@nexallianceit.com
                  </a>
                </motion.div>

              </div>
            </div>

            {/* Embedded Map Section */}
            <div className={`relative rounded-2xl overflow-hidden border h-56 shadow-inner group ${
              isLight ? 'border-slate-200 bg-slate-100' : 'border-[#1E3A8A] bg-[#050B17]'
            }`}>

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
                className="w-full h-full filter contrast-[1.02]"
              ></iframe>

              {/* Map Card Overlay */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`absolute top-3 left-3 right-3 backdrop-blur-md p-3 rounded-xl border shadow-lg pointer-events-auto transition-all duration-300 ${
                  isLight ? 'bg-white/95 border-slate-200 text-slate-800' : 'bg-[#0B172E]/95 border-[#1E3A8A] text-white'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className={`font-bold text-xs flex items-center gap-1 ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}>
                      Dwarkesh Society
                    </h4>
                    <p className={`text-[10px] leading-tight mt-0.5 line-clamp-2 font-medium ${
                      isLight ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                      Lajamni Chowk, nr. Ekta Raw House, Shanti Niketan Society, Mota Varachha, Surat, Gujarat 394101, India
                    </p>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Dwarkesh+Society,+Lajamni+Chowk,+Mota+Varachha,+Surat,+Gujarat+394101"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-500 hover:text-sky-400 p-1 shrink-0"
                    title="Open in Google Maps"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </motion.div>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
