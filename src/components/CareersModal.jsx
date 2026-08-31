import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Heart, TrendingUp, Globe, ArrowRight, Upload, CheckCircle2, Briefcase } from 'lucide-react';
import NexLogo from './NexLogo';

export default function CareersModal({ isOpen, onClose, onOpenBooking, theme = 'light', onToggleTheme }) {
  const [selectedPosition, setSelectedPosition] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    position: '',
    message: '',
    resumeName: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const isLight = theme === 'light';

  const culturePerks = [
    {
      icon: Zap,
      title: "Ownership",
      desc: "End-to-end ownership of the things you build."
    },
    {
      icon: Heart,
      title: "Culture",
      desc: "Candid, kind, and ruthlessly curious teammates."
    },
    {
      icon: TrendingUp,
      title: "Growth",
      desc: "Learning budget, mentorship, and conference travel."
    },
    {
      icon: Globe,
      title: "Flexibility",
      desc: "Hybrid by default, remote friendly, async first."
    }
  ];

  const positions = [
    {
      id: "calling",
      title: "Calling Team",
      details: "2 Open positions",
      location: "Surat / Remote",
      icon: "📞"
    },
    {
      id: "flutter",
      title: "Flutter Developer",
      details: "Tech Team · 1 Open position",
      location: "Surat / Remote",
      icon: "📱"
    },
    {
      id: "mern",
      title: "MERN Stack Developer",
      details: "Tech Team · 2 Open positions",
      location: "Surat / Remote",
      icon: "💻"
    },
    {
      id: "smm",
      title: "Social Media Manager",
      details: "1 Open position",
      location: "Surat / Remote",
      icon: "📢"
    },
    {
      id: "writer",
      title: "Content Writer",
      details: "1 Open position",
      location: "Surat / Remote",
      icon: "✍️"
    },
    {
      id: "creator",
      title: "Content Creator",
      details: "1 Open position",
      location: "Surat / Remote",
      icon: "🎬"
    },
    {
      id: "video",
      title: "Video Editor",
      details: "1 Open position",
      location: "Surat / Remote",
      icon: "📹"
    },
    {
      id: "photo",
      title: "Photo Editor",
      details: "1 Open position",
      location: "Surat / Remote",
      icon: "🖼️"
    },
    {
      id: "hr",
      title: "HR Manager",
      details: "2 Intern positions",
      location: "Surat / Remote",
      icon: "🤝"
    },
    {
      id: "accounting",
      title: "Accounting",
      details: "1 Intern position",
      location: "Surat / Remote",
      icon: "📊"
    }
  ];

  const handleApplyClick = (posTitle) => {
    setSelectedPosition(posTitle);
    setFormData((prev) => ({ ...prev, position: posTitle }));
    const formElem = document.getElementById('careers-apply-form');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, resumeName: file.name }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-6 pt-24 sm:pt-28 overflow-y-auto select-none">
        
        {/* Animated Backdrop Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-lg"
        ></motion.div>

        {/* Animated Modal Card Container matching nexallianceit.com/careers screenshots */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          className={`w-full max-w-6xl rounded-[32px] sm:rounded-[40px] shadow-2xl overflow-hidden my-auto max-h-[calc(100vh-100px)] flex flex-col relative z-10 transition-colors duration-300 border ${
            isLight
              ? 'bg-[#F0F6FF] border-sky-100 text-slate-800'
              : 'bg-[#050B17] border-[#1E3A8A] text-slate-100'
          }`}
        >

          {/* Top Header Bar */}
          <div className={`px-6 py-4 border-b flex items-center justify-between shrink-0 relative z-20 transition-colors duration-300 ${
            isLight ? 'bg-white/95 backdrop-blur-xl border-slate-200/80' : 'bg-[#0B172E]/95 backdrop-blur-xl border-[#1E3A8A]/70'
          }`}>
            <div className="flex items-center gap-3">
              <NexLogo theme={theme} />
            </div>

            <div className="hidden lg:flex items-center gap-6 text-sm font-semibold">
              <a href="#home" onClick={onClose} className="hover:text-[#0088FF] transition-colors">Home</a>
              <a href="#about" onClick={onClose} className="hover:text-[#0088FF] transition-colors">About</a>
              <a href="#services" onClick={onClose} className="hover:text-[#0088FF] transition-colors">Services</a>
              <span className="text-[#0088FF] font-bold">Careers</span>
              <a href="#contact" onClick={onClose} className="hover:text-[#0088FF] transition-colors">Contact</a>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ scale: 1.08, rotate: 90 }}
                whileTap={{ scale: 0.92 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ml-2 border shadow-sm hover:shadow-lg hover:shadow-[#0088FF]/30 cursor-pointer ${
                  isLight 
                    ? 'bg-slate-100/90 hover:bg-[#0088FF] text-slate-700 hover:text-white border-slate-200/90 hover:border-[#0088FF]' 
                    : 'bg-[#0F224A] hover:bg-[#0088FF] text-sky-400 hover:text-white border-[#1E3A8A]'
                }`}
                aria-label="Close modal"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </motion.button>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-6 sm:p-12 overflow-y-auto space-y-16 relative z-10">

            {/* 1. HERO SECTION MATCHING SCREENSHOT 3 */}
            <div className="text-center max-w-4xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest text-[#0088FF] shadow-sm">
                <span>CAREERS</span>
              </div>

              <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.05]">
                Build <span className="text-[#0088FF]">what you'd be proud to ship.</span>
              </h2>

              <p className="text-base sm:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
                Senior teams, real ownership, and projects that ship to real users every sprint.
              </p>
            </div>

            {/* 2. 4 CORE PERKS CARDS MATCHING SCREENSHOT 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {culturePerks.map((perk, idx) => {
                const Icon = perk.icon;
                return (
                  <div
                    key={idx}
                    className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-md hover:border-[#0088FF] transition-all space-y-3"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-[#0088FF]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading font-black text-lg text-slate-900">{perk.title}</h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">{perk.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* 3. OPEN POSITIONS LIST MATCHING SCREENSHOTS 1 & 3 */}
            <div className="max-w-4xl mx-auto space-y-6 pt-6">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="font-heading text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  Open positions
                </h3>
              </div>

              <div className="divide-y divide-slate-200/80 bg-white rounded-3xl border border-slate-200/90 shadow-lg overflow-hidden">
                {positions.map((pos) => (
                  <div
                    key={pos.id}
                    className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-sky-50/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{pos.icon}</span>
                        <h4 className="font-heading font-black text-lg text-slate-900">{pos.title}</h4>
                      </div>
                      <span className="text-xs font-semibold text-slate-500 block pl-7">{pos.details}</span>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0 pt-2 sm:pt-0">
                      <span className="text-xs font-bold text-slate-500">{pos.location}</span>
                      <button
                        onClick={() => handleApplyClick(pos.title)}
                        className="inline-flex items-center gap-2 bg-sky-50 hover:bg-[#0088FF] text-[#0088FF] hover:text-white font-extrabold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full border border-sky-200 hover:border-[#0088FF] transition-all shadow-sm"
                      >
                        <span>Apply</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. INTERNSHIP PROGRAM BANNER MATCHING SCREENSHOT 1 & 2 */}
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-sky-50 via-white to-sky-50 border border-sky-200 rounded-3xl p-8 sm:p-10 shadow-md space-y-4">
              <h3 className="font-heading text-2xl sm:text-3xl font-black text-slate-900">
                Internship Program
              </h3>
              <p className="text-sm text-slate-600 font-semibold leading-relaxed max-w-2xl">
                A structured 6-month program for top engineering, design, and marketing students. Live projects, weekly mentorship, and conversion to full-time roles.
              </p>
              <button
                onClick={() => handleApplyClick("Internship Program")}
                className="bg-[#0088FF] hover:bg-[#0077E6] text-white font-black text-xs uppercase tracking-wider px-7 py-3 rounded-full shadow-md transition-all"
              >
                Apply for Internship
              </button>
            </div>

            {/* 5. APPLY FOR A POSITION FORM MATCHING SCREENSHOT 2 */}
            <div id="careers-apply-form" className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 sm:p-12 space-y-6">
              <div>
                <h3 className="font-heading text-3xl font-black text-slate-900">
                  Apply for a position
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  Fill out the form below and attach your resume. We'll get back to you soon.
                </p>
              </div>

              {submitted ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-sky-100 text-[#0088FF] flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading text-2xl font-black text-slate-900">Application Submitted!</h4>
                  <p className="text-xs text-slate-600 font-medium">Thank you for applying. Our talent acquisition team will review your application and reach out shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-black uppercase text-slate-500">Full name</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold outline-none focus:border-[#0088FF] focus:bg-white transition-all text-slate-900"
                      />
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-black uppercase text-slate-500">Email</label>
                      <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold outline-none focus:border-[#0088FF] focus:bg-white transition-all text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-black uppercase text-slate-500">Position applying for</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Flutter Developer"
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold outline-none focus:border-[#0088FF] focus:bg-white transition-all text-slate-900"
                      />
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-black uppercase text-slate-500">Resume (PDF)</label>
                      <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200">
                        <label className="bg-sky-50 hover:bg-sky-100 text-[#0088FF] font-black text-xs px-4 py-1.5 rounded-xl border border-sky-200 cursor-pointer transition-colors shrink-0">
                          Choose File
                          <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
                        </label>
                        <span className="text-xs text-slate-500 font-semibold truncate">
                          {formData.resumeName || 'No file chosen'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-black uppercase text-slate-500">Message / Cover Letter</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us why you'd be a great fit..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold outline-none focus:border-[#0088FF] focus:bg-white transition-all text-slate-900"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-[#0088FF] hover:bg-[#0077E6] text-white font-black text-xs uppercase tracking-wider px-8 py-3.5 rounded-full shadow-lg transition-all"
                  >
                    Submit Application
                  </button>
                </form>
              )}
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
