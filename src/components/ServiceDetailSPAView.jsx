import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Check, Palette, Database, Users, Globe, Smartphone,
  Layers, Cloud, TrendingUp, ChevronDown, ChevronUp, CheckCircle2,
  ShieldCheck, ArrowLeft, ArrowUpRight
} from 'lucide-react';

export default function ServiceDetailSPAView({ serviceId = 'erp', onBack, onOpenBooking, theme = 'light' }) {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [serviceId]);

  // Ecosystem Switcher Tabs Data
  const ecosystemTabs = [
    { id: 'erp', label: 'Enterprise ERP', icon: Database },
    { id: 'crm', label: 'Custom CRM', icon: Users },
    { id: 'web', label: 'Web Engineering', icon: Globe },
    { id: 'mobile', label: 'Mobile Ecosystems', icon: Smartphone },
    { id: 'cloud', label: 'Cloud & DevOps', icon: Cloud },
    { id: 'uiux', label: 'UI/UX Design', icon: Layers },
    { id: 'graphics', label: 'Graphics Design', icon: Palette },
    { id: 'digital', label: 'Digital Growth', icon: TrendingUp }
  ];

  // Unified Brand Blue Theme & Service Data
  const serviceDetails = {
    erp: {
      badge: "ENTERPRISE ERP SOLUTIONS",
      titlePrefix: "Run your entire business on one ",
      titleHighlight: "intelligent platform.",
      subtitle: "We design and implement ERP systems that consolidate finance, inventory, HR, procurement and reporting — replacing fragmented tools with one single source of truth.",
      icon: Database,
      leftTitle: "What you get with Enterprise ERP",
      leftDesc: "Outcomes-first delivery, senior engineering teams, and a proven track record across manufacturing, retail, healthcare, and enterprise logistics.",
      checklist: [
        "Real-Time Inventory & Multi-Warehouse Sync",
        "Automated HR Management & Payroll Processing",
        "Accounting, Invoicing & Tax Automation",
        "Procurement & Supply Chain Management",
        "Executive BI Dashboards & Forecasts",
        "Role-Based Access & Audit Logging"
      ],
      cards: [
        { title: "Single Source of Truth", desc: "Eliminate operational silos across departments." },
        { title: "Real-Time BI Analytics", desc: "Instant executive dashboards and financial forecasts." },
        { title: "Workflow Automation", desc: "Codify multi-level approvals and automated alerts." },
        { title: "Modular Architecture", desc: "Scale smoothly with custom micro-modules on demand." }
      ],
      techTools: ["Odoo", "SAP B1", "Microsoft Dynamics", "Custom .NET", "PostgreSQL", "Power BI", "Docker"],
      metrics: [
        { label: "Data Accuracy", val: "99.9%" },
        { label: "Process Saved", val: "65%" },
        { label: "SLA Uptime", val: "99.99%" }
      ]
    },
    crm: {
      badge: "CUSTOM CRM SOLUTIONS",
      titlePrefix: "Turn every customer touchpoint into ",
      titleHighlight: "measurable revenue.",
      subtitle: "Custom CRM platforms engineered to streamline lead capture, automated deal pipelines, smart follow-ups, and 360° customer analytics.",
      icon: Users,
      leftTitle: "What you get with CRM Solutions",
      leftDesc: "Boost sales productivity, accelerate deal velocity, and retain high-value accounts with intelligent automated workflows.",
      checklist: [
        "Lead Capture, Enrichment & AI Scoring",
        "Visual Multi-Stage Sales Pipelines",
        "Customer Support & Ticketing Portals",
        "WhatsApp & Email Omnichannel Sync",
        "Revenue Forecasting & Team Targets",
        "Automated Drip & Nurture Campaigns"
      ],
      cards: [
        { title: "3x Lead Conversion", desc: "Instant automated responses to incoming inquiries." },
        { title: "360° Client Profile", desc: "All client communications and invoices in one view." },
        { title: "Smart AI Reminders", desc: "Automated triggers for sales rep follow-ups." },
        { title: "Executive Reporting", desc: "Track rep performance and conversion funnels." }
      ],
      techTools: ["Salesforce", "HubSpot", "Custom React/Node", "Python AI", "PostgreSQL", "Redis", "WhatsApp API"],
      metrics: [
        { label: "Lead Velocity", val: "3.5x" },
        { label: "Response Time", val: "<1 min" },
        { label: "Client Retention", val: "+42%" }
      ]
    },
    web: {
      badge: "WEB ENGINEERING PLATFORM",
      titlePrefix: "Web platforms built for speed, scale, and ",
      titleHighlight: "conversion.",
      subtitle: "High-performance web apps, Progressive Web Apps (PWAs), SaaS platforms, and enterprise websites engineered for sub-second page loads.",
      icon: Globe,
      leftTitle: "What you get with Web Engineering",
      leftDesc: "Future-proof frontend and backend architectures tailored to scale seamlessly from early-stage startup traffic to millions of active enterprise users.",
      checklist: [
        "Enterprise Web Applications & PWAs",
        "Custom SaaS Multi-Tenant Products",
        "Headless E-Commerce Architecture",
        "Core Web Vitals 95+ Score Optimization",
        "Bank-Grade API Security & DDoS Shield",
        "SEO-First Semantic Layouts & Schema"
      ],
      cards: [
        { title: "Sub-Second Page Loads", desc: "Optimized server responses consistently under 100ms." },
        { title: "SOC2 Security Ready", desc: "End-to-end encryption and compliance standards." },
        { title: "Responsive UX/UI", desc: "Flawless rendering on mobile, tablet, and ultra-wide screens." },
        { title: "Global CDN Scale", desc: "Edge-cached instant delivery worldwide." }
      ],
      techTools: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "AWS CloudFront", "Vite"],
      metrics: [
        { label: "Lighthouse Score", val: "98/100" },
        { label: "Page Load Time", val: "0.4s" },
        { label: "Global Edge Nodes", val: "300+" }
      ]
    },
    mobile: {
      badge: "MOBILE ECOSYSTEMS",
      titlePrefix: "Mobile experiences your users open ",
      titleHighlight: "every single day.",
      subtitle: "Native iOS & Android mobile applications built with smooth 60fps animations, offline-first sync, biometric security, and instant payment gateways.",
      icon: Smartphone,
      leftTitle: "What you get with Mobile Ecosystems",
      leftDesc: "Engineered for intuitive touch UX, push notification engagement, seamless device integration, and top-tier app store ratings.",
      checklist: [
        "Native iOS (Swift) & Android (Kotlin) Apps",
        "Cross-Platform Flutter & React Native Solutions",
        "Biometric Authentication & Encrypted Storage",
        "Targeted Push Notification Campaigns",
        "In-App Purchases & Payment Gateway Integrations",
        "Offline-First Local DB Synchronization"
      ],
      cards: [
        { title: "4.9★ App Store Rating", desc: "Intuitive touch UX users love to use daily." },
        { title: "Sub-Second Sync", desc: "Real-time WebSockets for instant data updates." },
        { title: "Biometric Security", desc: "FaceID & Fingerprint encrypted user entry." },
        { title: "Cross-Platform Velocity", desc: "Single codebase for iOS & Android apps." }
      ],
      techTools: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase", "GraphQL", "SQLite"],
      metrics: [
        { label: "App Store Rating", val: "4.9★" },
        { label: "Crash-Free Rate", val: "99.8%" },
        { label: "Push Open Rate", val: "32%" }
      ]
    },
    cloud: {
      badge: "CLOUD & DEVOPS",
      titlePrefix: "Run faster, safer, and cheaper on ",
      titleHighlight: "modern cloud.",
      subtitle: "Automated CI/CD pipelines, Kubernetes microservices, cloud cost optimization, and multi-region infrastructure for zero-downtime deployments.",
      icon: Cloud,
      leftTitle: "What you get with Cloud & DevOps",
      leftDesc: "High-availability Kubernetes and serverless architectures engineered to handle traffic spikes effortlessly with 99.99% uptime SLAs.",
      checklist: [
        "AWS, Azure & Google Cloud Multi-Cloud Setups",
        "Kubernetes & Docker Containerization",
        "Automated CI/CD Deployment Pipelines",
        "Zero-Downtime Migration & Disaster Recovery",
        "Cloud Infrastructure Cost Optimization",
        "24/7 Automated Monitoring & Threat Alerting"
      ],
      cards: [
        { title: "99.99% Cloud SLA", desc: "Automated failover and multi-region backups." },
        { title: "Zero-Downtime Rollouts", desc: "Continuous integration without user interruption." },
        { title: "Cost Savings", desc: "Auto-scaling server resources save up to 40% on bills." },
        { title: "Security Shield", desc: "DDoS protection, WAF, and automated compliance." }
      ],
      techTools: ["AWS", "Microsoft Azure", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Prometheus"],
      metrics: [
        { label: "Infrastructure SLA", val: "99.99%" },
        { label: "Cloud Saved", val: "35%" },
        { label: "Deploy Time", val: "<3 min" }
      ]
    },
    uiux: {
      badge: "UI/UX DESIGN STUDIO",
      titlePrefix: "Research-led design that moves ",
      titleHighlight: "business metrics.",
      subtitle: "Human-centered UI/UX design, interactive prototypes, and scalable design systems created to delight users and drive conversion.",
      icon: Layers,
      leftTitle: "What you get with UI/UX Design",
      leftDesc: "Design that balances user delight with business conversion and engineering feasibility for modern web and mobile products.",
      checklist: [
        "User Research, Interviews & Journey Mapping",
        "Wireframing & Information Architecture",
        "High-Fidelity Interactive Figma Prototypes",
        "Design Systems & Reusable Component Libraries",
        "Usability Testing & Conversion Optimization",
        "WCAG Accessibility & Mobile Responsiveness"
      ],
      cards: [
        { title: "Higher Conversion", desc: "Intuitive flows that guide users smoothly to checkout." },
        { title: "Faster Build Times", desc: "Modular design systems ready for developers." },
        { title: "Pixel Perfect", desc: "Flawless responsive layouts across all screen sizes." },
        { title: "User Delight", desc: "Research-backed interaction mechanics & micro-animations." }
      ],
      techTools: ["Figma", "Adobe XD", "Framer", "Protopie", "Storybook", "Zeplin", "Tailwind"],
      metrics: [
        { label: "Conversion Lift", val: "+45%" },
        { label: "User Task Success", val: "96%" },
        { label: "Design Components", val: "200+" }
      ]
    },
    graphics: {
      badge: "GRAPHICS DESIGN & BRANDING",
      titlePrefix: "Visual identity that makes your brand ",
      titleHighlight: "unmistakable.",
      subtitle: "Custom brand identities, logo design, social media creative kits, marketing pitch decks, and high-impact digital graphics.",
      icon: Palette,
      leftTitle: "What you get with Graphics Design",
      leftDesc: "Elevate your visual presence across all digital and print touchpoints with high-impact graphic design created by senior artists.",
      checklist: [
        "Complete Brand Identity & Typography Guidelines",
        "Custom Vector Logo Design & Brand Assets",
        "Social Media Creative Kits & Banners",
        "Marketing Collateral, Pitch Decks & Brochures",
        "3D Graphic Renders & Motion Visuals",
        "Print & Packaging Ready Vector Deliverables"
      ],
      cards: [
        { title: "Distinct Identity", desc: "Stand out boldly in crowded competitive markets." },
        { title: "Brand Consistency", desc: "Unified visual guidelines for marketing teams." },
        { title: "High-Impact Visuals", desc: "Captivating graphics that boost ad engagement." },
        { title: "Production Ready", desc: "Exported in all standard web and print formats." }
      ],
      techTools: ["Adobe Illustrator", "Photoshop", "After Effects", "InDesign", "Blender", "Canva Pro"],
      metrics: [
        { label: "Brand Recall Lift", val: "3x" },
        { label: "Ad CTR Increase", val: "+68%" },
        { label: "Design Assets", val: "Vector" }
      ]
    },
    digital: {
      badge: "DIGITAL GROWTH ENGINE",
      titlePrefix: "Predictable, profitable customer acquisition ",
      titleHighlight: "at scale.",
      subtitle: "Data-driven marketing, SEO strategy, performance advertising campaigns, and revenue growth engines built for measurable ROI.",
      icon: TrendingUp,
      leftTitle: "What you get with Digital Growth",
      leftDesc: "Maximize your digital marketing ROI with end-to-end analytics, funnel optimization, and high-converting performance campaigns.",
      checklist: [
        "Technical SEO & High-Intent Keyword Strategy",
        "Performance PPC (Google Ads & Meta Ads)",
        "Conversion Rate Optimization (CRO)",
        "Social Media Brand Ecosystem Building",
        "Automated Email & SMS Nurture Sequences",
        "Growth Analytics, CAC & LTV Attribution"
      ],
      cards: [
        { title: "5x Growth ROI", desc: "Data-backed acquisition campaigns that scale." },
        { title: "Top Search Rankings", desc: "Organic SEO targeting high-buying-intent keywords." },
        { title: "High-Converting Funnels", desc: "Optimized landing pages and call-to-actions." },
        { title: "Transparent Dashboards", desc: "Real-time CAC, ROAS and conversion reporting." }
      ],
      techTools: ["Google Analytics 4", "SEMrush", "Meta Ads Manager", "Google Search Console", "Klaviyo", "Mixpanel"],
      metrics: [
        { label: "Average ROAS", val: "4.8x" },
        { label: "Organic Traffic", val: "+210%" },
        { label: "CAC Reduction", val: "-32%" }
      ]
    }
  };

  const activeService = serviceDetails[serviceId] || serviceDetails.erp;
  const ServiceIcon = activeService.icon;

  const processSteps = [
    { step: "Step 1", title: "Discovery & Audit", desc: "Deep workshops to map business goals, user personas, and technical requirements." },
    { step: "Step 2", title: "Architecture & Strategy", desc: "Blueprint creation, tech stack selection, milestone roadmap, and success KPIs." },
    { step: "Step 3", title: "Agile Build & Demos", desc: "Iterative development cycles with live weekly demos and staging access." },
    { step: "Step 4", title: "Launch & Continuous Scale", desc: "Production rollout, 24/7 SLA monitoring, performance tuning, and growth." }
  ];

  const faqs = [
    { q: `How fast can we launch our ${activeService.badge} project?`, a: "Typical MVP or initial phase rollouts take 4 to 8 weeks, with continuous sprint enhancements delivered bi-weekly." },
    { q: "Can you integrate with our existing software tools and databases?", a: "Yes — we specialize in custom REST/GraphQL APIs and middleware pipelines to integrate seamlessly with legacy and cloud databases." },
    { q: "Do you provide dedicated technical SLA support post-launch?", a: "Yes, we provide 24/7 monitoring, security upgrades, cloud scaling, and dedicated engineering support SLAs." }
  ];

  const handleTabClick = (tabId) => {
    navigate(`/services/${tabId}`);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col pt-28 sm:pt-36 pb-16 sm:pb-20 select-none overflow-hidden transition-colors duration-500 bg-[#F8FAFC] text-slate-900">

      {/* Silent Breathing Ambient Background Sphere */}
      <motion.div
        animate={{ opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-sky-200/30 filter blur-[140px] pointer-events-none z-0"
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={serviceId}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full space-y-10"
        >

          {/* BACK BUTTON ARROW & ECOSYSTEM PLAIN TEXT NAVIGATION LINKS */}
          <div className="space-y-4">
            <button
              onClick={onBack || (() => navigate('/services'))}
              className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-600 hover:text-[#0088FF] transition-colors cursor-pointer group py-1"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#0088FF]" />
              <span>Back to Services</span>
            </button>

            <div className="overflow-x-auto pb-2 scrollbar-none">
              <div className="flex items-center gap-5 sm:gap-7 min-w-max">
                {ecosystemTabs.map((tab) => {
                  const isActive = serviceId === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={`text-[11px] sm:text-xs font-semibold tracking-normal transition-all duration-200 relative cursor-pointer py-1 ${isActive
                          ? 'text-[#0088FF] font-black'
                          : 'text-slate-600 hover:text-[#0088FF]'
                        }`}
                    >
                      <span>{tab.label}</span>
                      {isActive && (
                        <motion.span
                          layoutId="activeEcosystemUnderline"
                          className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#0088FF] rounded-full shadow-sm"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 2. PAGE HEADER */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-1">

            {/* Left Column: Clean Header Info */}
            <div className="lg:col-span-8 space-y-5 text-left">

              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-[11px] font-black uppercase tracking-widest text-[#0088FF]"
              >
                <span>NEXALLIANCE ECOSYSTEM — {activeService.badge}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
                className="font-heading text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.12] text-slate-900"
              >
                {activeService.titlePrefix}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0088FF] via-[#3B82F6] to-[#2563EB]">
                  {activeService.titleHighlight}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
                className="text-xs xs:text-sm sm:text-base font-medium leading-relaxed text-slate-600 max-w-2xl"
              >
                {activeService.subtitle}
              </motion.p>

            </div>

            {/* Right Column: Telemetry Showcase Card */}
            <div className="lg:col-span-4 flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                whileHover={{ y: -2 }}
                className="w-full max-w-sm bg-white/95 backdrop-blur-xl rounded-3xl p-5 shadow-xl space-y-4 text-left border border-sky-100 transition-all duration-200 group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl text-white flex items-center justify-center shadow-md bg-gradient-to-br from-[#0088FF] to-[#2563EB]">
                      <ServiceIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading font-black text-sm text-slate-900 group-hover:text-[#0088FF] transition-colors">{activeService.badge}</h4>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">System Node Active</span>
                    </div>
                  </div>
                  <div className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-sky-50 text-[#0088FF] group-hover:bg-[#0088FF] group-hover:text-white transition-colors">
                    ACTIVE
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  {activeService.metrics.map((m, idx) => (
                    <div key={idx} className="p-2.5 rounded-2xl text-center space-y-0.5 bg-sky-50/70">
                      <div className="font-heading font-black text-xs text-[#0088FF]">{m.val}</div>
                      <div className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="pt-1 text-[11px] font-bold text-slate-600 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0088FF]" />
                  <span>Verified Architecture & SLA Monitoring</span>
                </div>
              </motion.div>
            </div>

          </div>

          {/* 3. LIVE STATS COUNTER STRIP */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-full bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-lg grid grid-cols-2 md:grid-cols-4 gap-4 text-center border border-sky-100"
          >
            <div className="space-y-0.5">
              <div className="font-heading text-xl sm:text-2xl font-black text-[#0088FF]">99.99%</div>
              <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Uptime SLA</div>
            </div>
            <div className="space-y-0.5 border-l border-sky-100">
              <div className="font-heading text-xl sm:text-2xl font-black text-[#0088FF]">50+</div>
              <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Enterprise Clients</div>
            </div>
            <div className="space-y-0.5 border-l border-sky-100">
              <div className="font-heading text-xl sm:text-2xl font-black text-[#0088FF]">3x</div>
              <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Speed Acceleration</div>
            </div>
            <div className="space-y-0.5 border-l border-sky-100">
              <div className="font-heading text-xl sm:text-2xl font-black text-[#0088FF]">&lt;10ms</div>
              <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">API Response</div>
            </div>
          </motion.div>

          {/* 4. CAPABILITIES & IMPACT METRICS GRID */}
          <div id="capabilities" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">

            {/* Left Column: Capabilities Container */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="lg:col-span-7 bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-lg space-y-5 border border-sky-100"
            >
              <div className="space-y-1.5">
                <div className="text-[10px] font-black uppercase tracking-widest text-[#0088FF]">SYSTEM CAPABILITIES</div>
                <h3 className="font-heading text-xl sm:text-2xl font-black text-slate-900">
                  {activeService.leftTitle}
                </h3>
                <p className="text-xs font-medium leading-relaxed text-slate-600">
                  {activeService.leftDesc}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {activeService.checklist.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-sky-50/60">
                    <div className="w-5 h-5 rounded-full text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm bg-gradient-to-br from-[#0088FF] to-[#2563EB]">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="text-xs font-extrabold text-slate-800 text-left">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column: 4 Key Impact Metric Side Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeService.cards.map((c, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.04, ease: "easeOut" }}
                  whileHover={{ y: -2 }}
                  className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between text-left space-y-3 border border-sky-100 group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-sky-50 text-[#0088FF] group-hover:bg-[#0088FF] group-hover:text-white transition-colors">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-heading text-sm font-extrabold text-slate-900 group-hover:text-[#0088FF] transition-colors">
                      {c.title}
                    </h4>
                    <p className="text-[11px] font-semibold text-slate-500 leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

          {/* 5. TECHNOLOGIES & ECOSYSTEM STACK */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-lg border border-sky-100"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0088FF]">TECH STACK</span>
              <h3 className="font-heading text-lg sm:text-xl font-black text-slate-900">
                Technologies & Ecosystem Tools
              </h3>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {activeService.techTools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-sky-50 text-[#0088FF] shadow-sm border border-sky-200 cursor-default"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>

          {/* 6. IMPLEMENTATION PROCESS WORKFLOW */}
          <div className="space-y-6 text-center pt-2">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0088FF]">METHODOLOGY</span>
              <h3 className="font-heading text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                Implementation Process Workflow
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {processSteps.map((p, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.04, ease: "easeOut" }}
                  whileHover={{ y: -2 }}
                  className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 text-left space-y-2 shadow-sm hover:shadow-md transition-all duration-200 border border-sky-100 cursor-pointer"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#0088FF]">{p.step}</span>
                  <h4 className="font-heading text-base font-black text-slate-900 group-hover:text-[#0088FF] transition-colors">{p.title}</h4>
                  <p className="text-[11px] font-semibold text-slate-600 leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 7. FREQUENTLY ASKED QUESTIONS ACCORDION */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="space-y-5 max-w-3xl mx-auto text-left pt-2"
          >
            <div className="text-center space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0088FF]">ANSWERS & CLARITY</span>
              <h3 className="font-heading text-2xl font-black tracking-tight text-slate-900">
                Frequently Asked Questions
              </h3>
            </div>

            <div className="space-y-2.5">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white/95 backdrop-blur-xl rounded-xl overflow-hidden transition-all shadow-sm border border-sky-100"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="w-full p-4 text-left font-black text-xs sm:text-sm flex items-center justify-between gap-4 cursor-pointer text-slate-900"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 shrink-0 text-[#0088FF]" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 text-xs font-semibold text-slate-600 leading-relaxed border-t border-sky-100 pt-2.5">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* 8. BOTTOM HIGH-CONVERTING CONSULTATION BANNER */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-5 shadow-2xl relative overflow-hidden bg-gradient-to-r from-[#0066FF] via-[#0088FF] to-[#00A3FF]"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full filter blur-3xl pointer-events-none"></div>

            <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              Ready to deploy {activeService.badge}?
            </h3>

            <p className="text-xs sm:text-sm text-sky-100 max-w-lg mx-auto font-semibold leading-relaxed">
              Get a tailored architecture blueprint, team estimation, and accurate rollout timeline from our senior engineering leads.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenBooking}
                className="bg-white hover:bg-sky-50 text-slate-900 font-extrabold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full shadow-xl transition-all cursor-pointer"
              >
                Start Consultation ↗
              </motion.button>
            </div>
          </motion.div>

        </motion.div>
      </AnimatePresence>

    </div>
  );
}
