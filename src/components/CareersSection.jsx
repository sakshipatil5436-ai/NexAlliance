import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Heart, TrendingUp, Globe, ArrowRight, CheckCircle2, Sparkles, Briefcase, ChevronRight, Upload, AlertCircle } from 'lucide-react';

export default function CareersSection({ onOpenBooking, theme = 'light', isHomePage = false }) {
  const location = useLocation();
  const isCareersPage = location.pathname === '/careers';
  const [activeCategory, setActiveCategory] = useState('all');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    message: '',
    resumeName: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [fileError, setFileError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const culturePerks = [
    {
      icon: Zap,
      title: "Ownership",
      desc: "End-to-end ownership of the things you build, zero micromanagement."
    },
    {
      icon: Heart,
      title: "Culture",
      desc: "Candid, kind, and ruthlessly curious engineering team."
    },
    {
      icon: TrendingUp,
      title: "Growth",
      desc: "Learning budget, mentorship, and high-impact promotion tracks."
    },
    {
      icon: Globe,
      title: "Flexibility",
      desc: "Hybrid by default, remote friendly, async work hours."
    }
  ];

  const positions = [
    {
      id: 1,
      title: "Senior Flutter / Mobile Developer",
      category: "engineering",
      type: "Full-Time · Remote / Surat",
      exp: "3+ Years",
      tags: ["Flutter", "Dart", "BLoC", "REST API", "Firebase"],
      icon: "📱"
    }
  ];

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    if (val.length <= 10) {
      setFormData({ ...formData, phone: val });
      if (val.length === 10) {
        setPhoneError('');
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
      setFileError('Invalid file format. Please upload a PDF or DOC/DOCX resume file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFileError('File size exceeds 5MB limit. Please upload a smaller resume.');
      return;
    }

    setFileError('');
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        resumeName: file.name,
        resumeBase64: reader.result,
        rawFile: file
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      position: '',
      message: '',
      resumeName: '',
      resumeBase64: '',
      rawFile: null
    });
    setPhoneError('');
    setFileError('');
    setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.phone.length < 10) {
      setPhoneError('Mobile number must be exactly 10 digits!');
      return;
    }
    if (!formData.resumeName) {
      setFileError('Resume PDF or DOC file is mandatory!');
      return;
    }
    setPhoneError('');
    setFileError('');
    setSubmitted(true);

    try {
      fetch('http://localhost:5000/api/send-contact-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Job Application',
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          position: formData.position,
          resumeName: formData.resumeName,
          resumeBase64: formData.resumeBase64,
          message: formData.message || 'N/A'
        })
      }).catch(() => { });

      const hiddenForm = document.getElementById('hidden-pdf-form');
      if (hiddenForm) {
        const nameEl = document.getElementById('pdf-form-name');
        const emailEl = document.getElementById('pdf-form-email');
        const phoneEl = document.getElementById('pdf-form-phone');
        const posEl = document.getElementById('pdf-form-position');
        const msgEl = document.getElementById('pdf-form-message');
        const subjEl = document.getElementById('pdf-form-subject');

        if (nameEl) nameEl.value = formData.fullName;
        if (emailEl) emailEl.value = formData.email;
        if (phoneEl) phoneEl.value = formData.phone;
        if (posEl) posEl.value = formData.position;
        if (msgEl) msgEl.value = formData.message || 'N/A';
        if (subjEl) subjEl.value = `New Job Application with Resume PDF: ${formData.fullName} (${formData.position})`;

        hiddenForm.submit();
      }
    } catch (err) {
      console.log('Form submission error:', err);
    }
  };

  return (
    <section id="careers" className="scroll-mt-20 pt-28 sm:pt-36 pb-16 sm:pb-20 relative w-full max-w-full overflow-hidden select-none bg-white text-slate-900">

      {(isCareersPage || !isHomePage) && (
        <div className="fixed inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-25 sm:opacity-30 filter brightness-95 contrast-105"
          >
            <source src="/career_k_liye_kuch_video_bana.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px]"></div>
        </div>
      )}

      <iframe name="hidden-pdf-iframe" className="hidden" title="hidden-pdf-iframe"></iframe>
      <form
        id="hidden-pdf-form"
        action="https://formsubmit.co/info@nexallianceit.com"
        method="POST"
        encType="multipart/form-data"
        target="hidden-pdf-iframe"
        className="hidden"
      >
        <input type="hidden" name="_subject" id="pdf-form-subject" value="New Job Application with Resume PDF" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="Full Name" id="pdf-form-name" />
        <input type="hidden" name="Email" id="pdf-form-email" />
        <input type="hidden" name="Mobile Phone" id="pdf-form-phone" />
        <input type="hidden" name="Position Applied" id="pdf-form-position" />
        <input type="hidden" name="Message" id="pdf-form-message" />
      </form>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">

        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative inline-block text-center pb-1 mb-2"
          >
            <div className="text-[10px] sm:text-sm font-black tracking-[0.2em] uppercase text-[#0088FF] text-center">
              <span>CAREERS AT NEXALLIANCE</span>
            </div>
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#0088FF] to-transparent mt-2 rounded-full shadow-sm"></div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight mb-2 sm:mb-3"
          >
            Build Software That Defines <span className="text-[#0088FF]">The Future.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs xs:text-sm sm:text-base font-semibold leading-relaxed text-slate-600 max-w-2xl mx-auto"
          >
            We are hiring ambitious engineers, designers, and growth leaders to solve hard technical challenges for scaling brands worldwide.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {culturePerks.map((perk, idx) => {
            const IconComp = perk.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="space-y-2.5 text-left border-l-2 border-[#0088FF]/40 pl-4 py-1"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-sky-100/70 text-[#0088FF]">
                  <IconComp className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-lg font-black text-slate-900">
                  {perk.title}
                </h3>
                <p className="text-xs font-semibold leading-relaxed text-slate-600">
                  {perk.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div id="apply-form-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto space-y-5 text-slate-900 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xl relative z-10 text-left"
          >
            <div>
              <h3 className="font-heading text-2xl font-black text-slate-900">
                Apply for a position
              </h3>
              <p className="text-xs font-semibold mt-1 text-slate-600">
                Fill out the form below and attach your resume. Our talent team will review your profile within 24 hours.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-3"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto animate-bounce shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-heading text-xl font-black text-slate-900">Application Submitted!</h4>
                <p className="text-xs font-semibold text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you <strong className="text-[#0088FF]">{formData.fullName || 'there'}</strong>! Our talent acquisition team has received your application for <strong>{formData.position || 'the role'}</strong> and will contact you at <strong>{formData.phone}</strong> shortly.
                </p>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="mt-3 bg-[#0088FF] hover:bg-[#0077E6] text-white font-extrabold text-[11px] uppercase tracking-widest px-6 py-3 rounded-full shadow-md transition-all cursor-pointer"
                >
                  Submit Another Application
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Row 1: Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-black uppercase text-[#0088FF]">Full name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 text-xs font-semibold outline-none focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[#0088FF]/20 transition-all"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-black uppercase text-[#0088FF]">Email <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 text-xs font-semibold outline-none focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[#0088FF]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Row 2: Mobile Number & Position */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 text-left">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-black uppercase text-[#0088FF]">Mobile Number <span className="text-red-500">*</span></label>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{(formData.phone || '').length}/10 Digits</span>
                    </div>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="Enter 10-digit mobile number"
                      value={formData.phone || ''}
                      onChange={handlePhoneChange}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-slate-900 placeholder:text-slate-400 text-xs font-semibold outline-none focus:bg-white transition-all ${phoneError ? 'border-red-400 bg-red-50/50 focus:ring-2 focus:ring-red-400/20' : 'border-slate-200 bg-slate-50 focus:border-[#0088FF] focus:ring-2 focus:ring-[#0088FF]/20'
                        }`}
                    />
                    {phoneError && (
                      <div className="p-2 rounded-md bg-red-50 border border-red-200 text-red-600 text-[11px] font-bold flex items-center gap-1.5 mt-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{phoneError}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-black uppercase text-[#0088FF]">Position applying for <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Flutter Developer"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 text-xs font-semibold outline-none focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[#0088FF]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Row 3: Resume Attachment */}
                <div className="space-y-1 text-left">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-black uppercase text-[#0088FF]">Resume (PDF / DOC) <span className="text-red-500">*</span></label>
                    <span className="text-[9px] font-bold text-red-500 uppercase tracking-wider">Required</span>
                  </div>
                  <div className={`flex items-center gap-3 px-3.5 py-2 rounded-lg border ${fileError ? 'border-red-400 bg-red-50/50' : 'border-slate-200 bg-slate-50'}`}>
                    <label className="bg-[#0088FF] hover:bg-[#0077E6] text-white font-extrabold text-xs px-3.5 py-1.5 rounded-md cursor-pointer transition-colors shrink-0 flex items-center gap-1 shadow-xs">
                      <Upload className="w-3 h-3" />
                      <span>Choose File</span>
                      <input type="file" name="attachment" id="pdf-upload-input" accept=".pdf,.doc,.docx" onChange={handleFileChange} form="hidden-pdf-form" className="hidden" />
                    </label>
                    <span className={`text-xs font-semibold truncate ${formData.resumeName ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
                      {formData.resumeName || 'No PDF/DOC selected'}
                    </span>
                  </div>
                  {fileError && (
                    <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-bold flex items-center gap-2 mt-1">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{fileError}</span>
                    </div>
                  )}
                </div>

                {/* Row 4: Message */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-black uppercase text-[#0088FF]">Message / Cover Letter</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us why you'd be a great fit..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-sky-200 bg-sky-50/70 text-slate-900 placeholder:text-slate-400 text-xs font-semibold outline-none focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[#0088FF]/30 transition-all resize-none"
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-[#0088FF] via-[#0077E6] to-[#2563EB] hover:from-[#0077E6] hover:to-[#1D4ED8] text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Submit Application</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
