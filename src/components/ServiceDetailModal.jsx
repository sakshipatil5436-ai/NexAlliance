import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, Layers, Database, Users, Globe, Smartphone, Cloud, TrendingUp, Palette, Sun, Moon, ChevronDown, ChevronUp } from 'lucide-react';
import NexLogo from './NexLogo';

export default function ServiceDetailModal({ isOpen, onClose, serviceId = 'erp', onOpenBooking, theme = 'light', onToggleTheme }) {
  const [openFaq, setOpenFaq] = useState(0); // Default first FAQ open

  if (!isOpen) return null;

  const isLight = theme === 'light';

  // Process Steps Data
  const processSteps = [
    {
      step: "Step 1",
      title: "Discovery",
      desc: "Workshops to map goals, users, and constraints."
    },
    {
      step: "Step 2",
      title: "Strategy",
      desc: "Architecture, roadmap and success metrics."
    },
    {
      step: "Step 3",
      title: "Build",
      desc: "Iterative delivery with weekly demos."
    },
    {
      step: "Step 4",
      title: "Launch & Grow",
      desc: "Go-live, monitoring, and continuous improvement."
    }
  ];

  // FAQ Data
  const faqs = [
    {
      q: "How long does an ERP rollout take?",
      a: "Typical phased rollouts run 8-16 weeks depending on modules and integrations."
    },
    {
      q: "Can you migrate from our existing tools?",
      a: "Yes — we run a structured data migration with reconciliation and parallel runs."
    },
    {
      q: "Do you provide ongoing support & maintenance?",
      a: "Yes, we offer 24/7 technical SLA monitoring, regular system upgrades, and hands-on staff training."
    }
  ];

  // Service Detail Configurations
  const serviceDetails = {
    erp: {
      badge: "ERP Solutions",
      titlePrefix: "Run your entire business on one ",
      titleHighlight: "intelligent platform.",
      subtitle: "We design and implement ERP systems that consolidate finance, inventory, HR, procurement and reporting — replacing fragmented tools with one source of truth.",
      icon: Database,
      leftTitle: "What you get with ERP Solutions",
      leftDesc: "Outcomes-first delivery, senior teams, and a track record across regulated and high-growth industries.",
      checklist: [
        "Inventory Management",
        "HR Management",
        "Accounting & Finance",
        "Procurement",
        "Reporting & BI",
        "Workflow Automation"
      ],
      cards: [
        {
          title: "Single source of truth",
          desc: "Eliminate silos across departments."
        },
        {
          title: "Faster decisions",
          desc: "Real-time dashboards and forecasts."
        },
        {
          title: "Process automation",
          desc: "Codify approvals and workflows."
        },
        {
          title: "Scales with you",
          desc: "Modular architecture adds capabilities on demand."
        }
      ],
      techTools: ["Odoo", "SAP B1", "Microsoft Dynamics", "Custom .NET", "PostgreSQL", "Power BI"]
    },
    crm: {
      badge: "CRM Solutions",
      titlePrefix: "Turn every customer touchpoint into ",
      titleHighlight: "measurable growth.",
      subtitle: "Custom CRM platforms that streamline lead capture, pipeline management, automated follow-ups, and customer analytics.",
      icon: Users,
      leftTitle: "What you get with CRM Solutions",
      leftDesc: "Boost sales productivity and retain high-value accounts with intelligent automated workflows.",
      checklist: [
        "Lead Management & Scoring",
        "Sales Pipeline Automation",
        "Customer Support Portals",
        "Omnichannel Messaging Integration",
        "Revenue & Sales Forecasting",
        "Marketing Automation"
      ],
      cards: [
        {
          title: "3x Lead Conversion",
          desc: "Instant automated responses to incoming inquiries."
        },
        {
          title: "360° Customer View",
          desc: "All client interactions logged in one place."
        },
        {
          title: "Smart Follow-ups",
          desc: "AI triggers for timely sales engagement."
        },
        {
          title: "Custom Dashboards",
          desc: "Track rep performance and deal stages."
        }
      ],
      techTools: ["Salesforce", "HubSpot", "Custom React/Node", "Python AI", "PostgreSQL", "Redis"]
    },
    web: {
      badge: "Web Engineering",
      titlePrefix: "Web platforms built for speed, scale, and ",
      titleHighlight: "conversion.",
      subtitle: "High-performance web apps, PWAs, SaaS platforms, and enterprise websites engineered for sub-second page loads.",
      icon: Globe,
      leftTitle: "What you get with Web Engineering",
      leftDesc: "Future-proof frontend and backend architectures tailored to scale from startup to enterprise traffic.",
      checklist: [
        "Enterprise Corporate Websites",
        "Custom SaaS Web Products",
        "High-Speed PWAs & Portals",
        "Headless E-Commerce Solutions",
        "SEO & Core Web Vitals Optimization",
        "API Integration & Security"
      ],
      cards: [
        {
          title: "Sub-second Load Speeds",
          desc: "Optimized server responses under 100ms."
        },
        {
          title: "Bank-grade Security",
          desc: "SOC2 readiness and end-to-end encryption."
        },
        {
          title: "Responsive UX/UI",
          desc: "Flawless rendering on mobile, tablet, and desktop."
        },
        {
          title: "Global CDN Scale",
          desc: "Edge-cached delivery worldwide."
        }
      ],
      techTools: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "AWS CloudFront"]
    },
    mobile: {
      badge: "Mobile Ecosystems",
      titlePrefix: "Mobile experiences your customers actually ",
      titleHighlight: "open every day.",
      subtitle: "Native iOS & Android mobile applications built with smooth animations, offline-first sync, and secure payment APIs.",
      icon: Smartphone,
      leftTitle: "What you get with Mobile Ecosystems",
      leftDesc: "Engineered for intuitive touch UX, biometric security, and instant push notification engagement.",
      checklist: [
        "iOS & Android Native Apps",
        "Cross-Platform Flutter & React Native",
        "Biometric & P2P Security",
        "Push Notification Campaigns",
        "In-App Purchases & Payment Gateways",
        "Offline Data Synchronization"
      ],
      cards: [
        {
          title: "4.9★ App Store Rating",
          desc: "Intuitive interface users love to navigate."
        },
        {
          title: "Sub-Second Sync",
          desc: "Real-time websockets for instant updates."
        },
        {
          title: "Biometric Auth",
          desc: "FaceID & Fingerprint encrypted entry."
        },
        {
          title: "Cross-Platform Efficiency",
          desc: "Single codebase for iOS & Android."
        }
      ],
      techTools: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase", "GraphQL"]
    },
    cloud: {
      badge: "Cloud & DevOps",
      titlePrefix: "Run faster, safer, and cheaper on ",
      titleHighlight: "modern cloud.",
      subtitle: "Automated CI/CD pipelines, microservices architecture, and cloud infrastructure management for zero-downtime deployments.",
      icon: Cloud,
      leftTitle: "What you get with Cloud & DevOps",
      leftDesc: "High-availability Kubernetes and serverless setups engineered to handle spikes in traffic effortless.",
      checklist: [
        "AWS, Azure & GCP Architectures",
        "Kubernetes & Docker Containerization",
        "Automated CI/CD Deployment Pipelines",
        "Zero-Downtime Migration Services",
        "Cloud Cost Optimization",
        "24/7 Infrastructure Monitoring"
      ],
      cards: [
        {
          title: "99.99% Cloud SLA",
          desc: "Automated failover and disaster recovery."
        },
        {
          title: "Zero-Downtime Deployments",
          desc: "Continuous integration without user interruption."
        },
        {
          title: "Cost Efficiency",
          desc: "Auto-scaling server resources on demand."
        },
        {
          title: "Security Shield",
          desc: "DDoS protection and automated backups."
        }
      ],
      techTools: ["AWS", "Microsoft Azure", "Docker", "Kubernetes", "Terraform", "GitHub Actions"]
    },
    digital: {
      badge: "Digital Growth",
      titlePrefix: "Predictable, profitable customer acquisition ",
      titleHighlight: "at scale.",
      subtitle: "Data-driven marketing, SEO strategy, performance campaigns, and revenue growth engines.",
      icon: TrendingUp,
      leftTitle: "What you get with Digital Growth",
      leftDesc: "Maximize your digital ROI with end-to-end analytics, funnel optimization, and high-converting campaigns.",
      checklist: [
        "Technical SEO & Content Strategy",
        "Performance PPC (Google & Meta Ads)",
        "Conversion Rate Optimization (CRO)",
        "Social Media Brand Ecosystems",
        "Email Marketing Automation",
        "Growth Analytics & Attribution"
      ],
      cards: [
        {
          title: "5x Growth ROI",
          desc: "Data-backed acquisition campaigns."
        },
        {
          title: "Top Search Rankings",
          desc: "Organic SEO targeting high-intent keywords."
        },
        {
          title: "High-Converting Funnels",
          desc: "Optimized landing pages and call-to-actions."
        },
        {
          title: "Real-time Analytics",
          desc: "Transparent performance reporting."
        }
      ],
      techTools: ["Google Analytics 4", "SEMrush", "Meta Ads Manager", "Google Search Console", "Klaviyo", "Mixpanel"]
    },
    uiux: {
      badge: "UI/UX Design",
      titlePrefix: "Research-led design that moves ",
      titleHighlight: "business metrics.",
      subtitle: "Human-centered UI/UX design, interactive prototypes, and scalable design systems created for intuitive user experiences.",
      icon: Layers,
      leftTitle: "What you get with UI/UX Design",
      leftDesc: "Design that balances user delight with business conversion and engineering feasibility.",
      checklist: [
        "User Research & Journey Mapping",
        "Wireframing & Information Architecture",
        "High-Fidelity Interactive Prototypes",
        "Design Systems & Component Libraries",
        "Usability Testing & Feedback Loops",
        "Accessibility & Compliance (WCAG)"
      ],
      cards: [
        {
          title: "Higher Conversion",
          desc: "Intuitive flows that guide users effortlessly."
        },
        {
          title: "Faster Build Times",
          desc: "Modular design systems ready for developers."
        },
        {
          title: "Pixel Perfect",
          desc: "Flawless responsive layouts across devices."
        },
        {
          title: "User Delighted",
          desc: "Research-backed interaction mechanics."
        }
      ],
      techTools: ["Figma", "Adobe XD", "Framer", "Protopie", "Storybook", "Zeplin"]
    },
    graphics: {
      badge: "Graphics Design",
      titlePrefix: "Visual identity that makes your brand ",
      titleHighlight: "unmistakable.",
      subtitle: "Custom brand identities, logo design, social media creatives, marketing materials, and digital graphics.",
      icon: Palette,
      leftTitle: "What you get with Graphics Design",
      leftDesc: "Elevate your visual presence across all digital touchpoints with high-impact graphic design.",
      checklist: [
        "Brand Identity & Style Guides",
        "Logo Design & Vector Assets",
        "Social Media Creative Kits",
        "Marketing Collateral & Pitch Decks",
        "3D Graphics & Motion Visuals",
        "Print & Packaging Assets"
      ],
      cards: [
        {
          title: "Distinct Identity",
          desc: "Stand out in crowded digital markets."
        },
        {
          title: "Brand Consistency",
          desc: "Unified visual guidelines for all teams."
        },
        {
          title: "High-Impact Visuals",
          desc: "Engaging graphics that capture attention."
        },
        {
          title: "Ready-to-Use Assets",
          desc: "Exported in all standard digital formats."
        }
      ],
      techTools: ["Adobe Illustrator", "Photoshop", "After Effects", "InDesign", "Blender", "Canva Pro"]
    }
  };

  const activeService = serviceDetails[serviceId] || serviceDetails.erp;
  const ServiceIcon = activeService.icon;

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

        {/* Main Modal Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          className={`w-full max-w-6xl rounded-[32px] sm:rounded-[40px] shadow-2xl overflow-hidden my-auto max-h-[calc(100vh-100px)] flex flex-col relative z-10 transition-colors duration-300 border ${isLight
            ? 'bg-[#F0F6FF] border-sky-100 text-slate-800'
            : 'bg-[#050B17] border-[#1E3A8A] text-slate-100'
            }`}
        >

          {/* Top Header Bar matching Screenshot */}
          <div className={`px-6 py-4 border-b flex items-center justify-between shrink-0 relative z-20 transition-colors duration-300 ${isLight ? 'bg-white/90 backdrop-blur-xl border-slate-200/80' : 'bg-[#0B172E]/90 backdrop-blur-xl border-[#1E3A8A]/70'
            }`}>

            {/* Logo */}
            <div className="flex items-center gap-3">
              <NexLogo theme={theme} />
            </div>

            {/* Desktop Nav Items */}
            <div className={`hidden lg:flex items-center gap-6 text-sm font-semibold ${isLight ? 'text-slate-600' : 'text-slate-300'
              }`}>
              <a href="#home" onClick={onClose} className="hover:text-[#0088FF] transition-colors">Home</a>
              <a href="#about" onClick={onClose} className="hover:text-[#0088FF] transition-colors">About</a>
              <a href="#services" onClick={onClose} className="hover:text-[#0088FF] transition-colors font-bold text-[#0088FF] flex items-center gap-1">
                Services <span className="text-xs">▾</span>
              </a>
              <a href="#portfolio" onClick={onClose} className="hover:text-[#0088FF] transition-colors">Portfolio</a>
              <a href="#careers" onClick={onClose} className="hover:text-[#0088FF] transition-colors">Careers</a>
              <a href="#contact" onClick={onClose} className="hover:text-[#0088FF] transition-colors">Contact</a>
            </div>

            {/* Top Right Controls */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-3">

                {/* Theme Toggle Button */}
                <motion.button
                  type="button"
                  onClick={onToggleTheme}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ rotate: 180, scale: 0.85 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isLight ? 'bg-amber-100/80 text-amber-600 hover:bg-amber-200' : 'bg-[#0B172E] border border-[#1E3A8A] text-amber-400 hover:bg-[#1E3A8A]/50'
                    }`}
                  aria-label="Toggle theme"
                >
                  {isLight ? <Moon className="w-5 h-5 text-amber-600 fill-amber-500" /> : <Sun className="w-5 h-5 text-amber-400 fill-amber-400" />}
                </motion.button>

                {/* Schedule Consultation CTA */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => { onClose(); onOpenBooking(); }}
                  className="bg-[#0088FF] hover:bg-[#0077E6] text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-md shadow-[#0088FF]/20 transition-all"
                >
                  Schedule Consultation
                </motion.button>
              </div>

              {/* Perfect High-Contrast Close X Button */}
              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ scale: 1.12, rotate: 90 }}
                whileTap={{ scale: 0.88 }}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ml-2 border-2 shadow-md cursor-pointer ${isLight
                    ? 'bg-sky-50 hover:bg-[#0088FF] text-[#0088FF] hover:text-white border-sky-200 hover:border-[#0088FF] shadow-sky-500/10'
                    : 'bg-[#0F224A] hover:bg-[#0088FF] text-sky-400 hover:text-white border-[#1E3A8A] hover:border-[#0088FF] shadow-2xl'
                  }`}
                aria-label="Close modal"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </motion.button>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-6 sm:p-12 overflow-y-auto space-y-16 relative z-10">

            {/* HERO SECTION MATCHING SCREENSHOT */}
            <div className="text-center max-w-4xl mx-auto space-y-6">

              {/* Badge */}
              <div className="flex justify-center">
                <span className={`text-xs font-bold px-4 py-1.5 rounded-full border tracking-wide uppercase ${isLight ? 'bg-white border-sky-200 text-slate-600 shadow-sm' : 'bg-[#0B172E] border-[#1E3A8A] text-sky-400'
                  }`}>
                  {activeService.badge}
                </span>
              </div>

              {/* Headline */}
              <h1 className={`font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight ${isLight ? 'text-slate-900' : 'text-white'
                }`}>
                {activeService.titlePrefix}
                <span className="text-[#0088FF]">{activeService.titleHighlight}</span>
              </h1>

              {/* Subtitle */}
              <p className={`text-base sm:text-lg max-w-3xl mx-auto font-medium leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'
                }`}>
                {activeService.subtitle}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { onClose(); onOpenBooking(); }}
                  className="bg-[#0088FF] hover:bg-[#0077E6] text-white font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full shadow-lg shadow-[#0088FF]/30 transition-all flex items-center gap-2"
                >
                  <span>Schedule Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <a
                  href="#portfolio"
                  onClick={onClose}
                  className={`font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full border transition-all ${isLight ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50' : 'bg-[#0B172E] border-[#1E3A8A] text-white hover:bg-[#0F224A]'
                    }`}
                >
                  See related work
                </a>
              </div>

            </div>

            {/* MIDDLE GRID SECTION: "What you get with ERP Solutions" */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">

              {/* Left Column (5 cols) */}
              <div className="lg:col-span-5 space-y-6">

                {/* Icon Box */}
                <div className="w-12 h-12 rounded-2xl bg-[#0088FF] text-white flex items-center justify-center shadow-lg shadow-[#0088FF]/30">
                  <ServiceIcon className="w-6 h-6" />
                </div>

                <h3 className={`font-heading text-2xl sm:text-3xl font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                  {activeService.leftTitle}
                </h3>

                <p className={`text-xs sm:text-sm leading-relaxed font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                  {activeService.leftDesc}
                </p>

                {/* Checklist with Blue Checkmarks */}
                <ul className="space-y-3 pt-2">
                  {activeService.checklist.map((item, idx) => (
                    <li key={idx} className={`flex items-center gap-2.5 text-xs sm:text-sm font-semibold ${isLight ? 'text-slate-800' : 'text-slate-200'
                      }`}>
                      <Check className="w-4 h-4 text-[#0088FF] shrink-0 stroke-[3]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

              </div>

              {/* Right Column: 4 Cards Grid (2x2) (7 cols) */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeService.cards.map((card, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className={`p-6 rounded-2xl border transition-all duration-300 ${isLight
                      ? 'bg-white border-slate-200/90 shadow-sm hover:shadow-md'
                      : 'bg-[#0B172E] border-[#1E3A8A]/80 text-white shadow-xl'
                      }`}
                  >
                    <h4 className={`font-bold text-sm mb-1.5 ${isLight ? 'text-slate-900' : 'text-white'
                      }`}>
                      {card.title}
                    </h4>
                    <p className={`text-xs leading-relaxed font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'
                      }`}>
                      {card.desc}
                    </p>
                  </motion.div>
                ))}
              </div>

            </div>

            {/* TECHNOLOGIES & TOOLS SECTION */}
            <div className="pt-6 border-t border-slate-200/60 dark:border-[#1E3A8A]/40 space-y-4">
              <span className={`text-[10px] font-extrabold uppercase tracking-widest block ${isLight ? 'text-slate-500' : 'text-slate-400'
                }`}>
                TECHNOLOGIES & TOOLS
              </span>

              <div className="flex flex-wrap gap-2.5">
                {activeService.techTools.map((tech, idx) => (
                  <span
                    key={idx}
                    className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all ${isLight
                      ? 'bg-white border-slate-200 text-slate-700 hover:border-[#0088FF]'
                      : 'bg-[#0B172E] border-[#1E3A8A] text-slate-300 hover:border-[#3B82F6]'
                      }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* OUR PROCESS SECTION MATCHING NEW SCREENSHOT */}
            <div className="pt-10 space-y-8">
              <h3 className={`font-heading text-3xl sm:text-4xl font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'
                }`}>
                Our process
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {processSteps.map((stepItem, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className={`p-6 rounded-2xl border transition-all duration-300 ${isLight
                      ? 'bg-white border-slate-200/90 shadow-sm hover:shadow-md'
                      : 'bg-[#0B172E] border-[#1E3A8A]/80 text-white shadow-xl'
                      }`}
                  >
                    <span className="text-xs text-slate-400 font-semibold block mb-2">
                      {stepItem.step}
                    </span>
                    <h4 className={`font-bold text-base mb-2 ${isLight ? 'text-slate-900' : 'text-white'
                      }`}>
                      {stepItem.title}
                    </h4>
                    <p className={`text-xs leading-relaxed font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'
                      }`}>
                      {stepItem.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* FREQUENTLY ASKED FAQ ACCORDION MATCHING NEW SCREENSHOT */}
            <div className="pt-10 max-w-3xl mx-auto space-y-8">
              <h3 className={`font-heading text-3xl sm:text-4xl font-bold tracking-tight text-center ${isLight ? 'text-slate-900' : 'text-white'
                }`}>
                Frequently asked
              </h3>

              <div className="space-y-4">
                {faqs.map((faq, idx) => {
                  const isOpenFaq = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className={`border-b pb-4 transition-colors ${isLight ? 'border-slate-200' : 'border-[#1E3A8A]/50'
                        }`}
                    >
                      <button
                        onClick={() => setOpenFaq(isOpenFaq ? null : idx)}
                        className="w-full flex items-center justify-between gap-4 text-left py-2 font-bold text-sm sm:text-base focus:outline-none"
                      >
                        <span className={isLight ? 'text-slate-900' : 'text-white'}>{faq.q}</span>
                        {isOpenFaq ? (
                          <ChevronUp className="w-4 h-4 text-[#0088FF] shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                      </button>

                      <AnimatePresence>
                        {isOpenFaq && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <p className={`pt-2 text-xs sm:text-sm font-medium leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'
                              }`}>
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* READY TO TRANSFORM YOUR BUSINESS DIGITALLY? BLUE CALLOUT BANNER MATCHING NEW SCREENSHOT */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="mt-14 bg-gradient-to-r from-[#0066FF] via-[#0088FF] to-[#00A3FF] text-white rounded-[28px] sm:rounded-[36px] p-8 sm:p-14 text-center shadow-2xl space-y-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full filter blur-3xl pointer-events-none"></div>

              <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                Ready to transform your business digitally?
              </h3>

              <p className="text-sm sm:text-base text-sky-100 max-w-2xl mx-auto font-semibold leading-relaxed">
                Tell us where you want to go. We'll map the fastest, safest path to get there.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { onClose(); onOpenBooking(); }}
                  className="bg-white hover:bg-sky-50 text-slate-900 font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full shadow-lg transition-all"
                >
                  Book Consultation
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { onClose(); onOpenBooking(); }}
                  className="bg-transparent hover:bg-white/10 border border-white/70 text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full transition-all"
                >
                  Contact Us
                </motion.button>
              </div>
            </motion.div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
