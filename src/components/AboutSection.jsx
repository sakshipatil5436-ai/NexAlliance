import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Briefcase,
  Zap,
  Code2,
  Layers,
  Bot,
  Building2,
  Users,
  Award,
  Globe2,
  Rocket
} from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

export default function AboutSection({ onOpenBooking, theme = 'light', showFounders = true }) {
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';

  const founders = [
    {
      name: "Meet Mistry",
      role: "Co-Founder · Business & Growth",
      desc: "Meet leads business development, sales, client relationships, and growth at NexAlliance. His focus is on understanding business challenges, creating meaningful client partnerships, and identifying opportunities where technology can drive measurable business growth.",
      image: "/meet_founder.webp"
    },
    {
      name: "Sanket Pithava",
      role: "Co-Founder · Technology & Innovation",
      desc: "Sanket leads technology, software development, and innovation at NexAlliance. His focus is on transforming complex requirements into scalable, reliable, and modern digital solutions.",
      image: "/sanket_founder.webp"
    }
  ];

  const timelineEvents = [
    { date: "10 February 2025", title: "Meet.Nexus", desc: "Meet Mistry starts Meet.Nexus focusing on practical client digital solutions.", tag: "Company Launch", icon: Building2 },
    { date: "First Major Project", title: "Hotel Hilton", desc: "Meet.Nexus delivers its first major technology project for Hotel Hilton.", tag: "Milestone Project", icon: Award },
    { date: "1 March 2025", title: "Nexora", desc: "Sanket Pithava starts Nexora to solve complex software architecture challenges.", tag: "Company Launch", icon: Code2 },
    { date: "First Major Project", title: "Bihar Disaster System", desc: "Nexora delivers the Bihar Disaster System for real-world operational needs.", tag: "Milestone Project", icon: Globe2 },
    { date: "Project Partnership", title: "Two Journeys Connect", desc: "Meet.Nexus and Nexora partner on key projects, uniting business & tech strengths.", tag: "Collaboration", icon: Users },
    { date: "26 July 2026", title: "NexAlliance Born", desc: "NexAlliance is officially established by Meet Mistry & Sanket Pithava.", tag: "Official Establishment", icon: Rocket }
  ];

  return (
    <section id="about" className="scroll-mt-20 pt-24 sm:pt-32 pb-20 bg-white text-slate-900 select-none relative">



      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28 relative z-10">

        {/* 1. HERO HEADER AREA (CLEAN & MINIMALIST EDITORIAL) */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0088FF]">
              ABOUT NEXALLIANCE
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-slate-900"
          >
            Two Founders. Two Journeys.{' '}
            <span className="text-[#0088FF]">
              One Vision.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium"
          >
            Every great company begins with a vision. <strong className="text-slate-900 font-semibold">NexAlliance</strong> began with two.
            Before NexAlliance existed, its founders — <strong className="text-[#0088FF] font-semibold">Meet Mistry</strong> and <strong className="text-[#0088FF] font-semibold">Sanket Pithava</strong> — were independently building their own companies.
          </motion.p>

          {/* Elegant Glowing Blue Curved Path River SVG Line */}
          <div className="w-full relative overflow-hidden pt-3 pb-1 pointer-events-none z-0">
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-8 sm:h-10 object-cover opacity-90 filter drop-shadow-[0_0_12px_rgba(0,136,255,0.5)]"
            >
              <path
                d="M-100 60 C 300 120, 800 10, 1540 70"
                stroke="url(#bluePathGradient)"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="bluePathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0088FF" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#0088FF" stopOpacity="1" />
                  <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* 2. OUR STORY SECTION */}
        <div id="our-story" className="scroll-mt-24 space-y-12 sm:space-y-16 pt-6 relative">


          <div className="text-center max-w-2xl mx-auto space-y-2 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0088FF]">OUR STORY</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
              From Two Journeys to <span className="text-[#0088FF]">NexAlliance</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              A timeline of independent beginnings, project collaboration, and shared vision.
            </p>
          </div>

          {/* Direct Plain Screen Layout (NO BOXES, NO BOX BORDERS) */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 items-start">
            {/* Story Block 1: Meet.Nexus */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="space-y-3 text-left"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0088FF]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#0088FF]">10 February 2025</span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
                Meet.Nexus
              </h3>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium"
              >
                On <strong>10 February 2025</strong>, <strong>Meet Mistry</strong> started his entrepreneurial journey with <strong>Meet.Nexus</strong>. Meet.Nexus began by focusing on delivering practical digital solutions for businesses and organizations. Its first major project was <strong>Hotel Hilton</strong>, marking the beginning of Meet's journey in building client-focused technology solutions.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium"
              >
                Through Meet.Nexus, Meet developed strong experience in business development, client relationships, project management, sales, and delivering technology solutions aligned with business requirements.
              </motion.p>
            </motion.div>

            {/* Story Block 2: Nexora */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3 text-left"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600">1 March 2025</span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
                A Second Journey — Nexora
              </h3>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium"
              >
                On <strong>1 March 2025</strong>, <strong>Sanket Pithava</strong> started his own technology company, <strong>Nexora</strong>. Nexora's first project was the <strong>Bihar Disaster System</strong>, a technology-driven initiative that gave Sanket valuable experience in developing solutions for real-world operational requirements.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium"
              >
                Through Nexora, Sanket focused on software development, technology architecture, digital solutions, and solving complex technical challenges.
              </motion.p>
            </motion.div>

            {/* Story Block 3: When Two Journeys Connected */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="space-y-3 text-left"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Project Partnership</span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
                When Two Journeys Connected
              </h3>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium"
              >
                The next chapter began when <strong>Meet.Nexus and Nexora came together through a project partnership</strong>. Working together on projects created an opportunity for both founders to combine their strengths. Meet brought his expertise in business, sales, client relationships, and growth, while Sanket brought his expertise in technology, development, innovation, and technical execution.
              </motion.p>
            </motion.div>

            {/* Story Block 4: The Birth of NexAlliance */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3 text-left"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">26 July 2026</span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
                The Birth of NexAlliance
              </h3>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium"
              >
                On <strong>26 July 2026</strong>, that vision became a reality. <strong>NexAlliance</strong> was officially established by <strong>Meet Mistry and Sanket Pithava</strong>, bringing together the experience, knowledge, and strengths they had developed through their individual journeys.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium"
              >
                NexAlliance was built from two independent companies, multiple experiences, real-world projects, and a shared vision for the future of technology.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* 3. STANDALONE MINIMALIST LEADERSHIP SECTION (ONLY TEXT ANIMATION, NO BOXES) */}
        {showFounders && (
          <div className="space-y-10 pt-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-2"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-[#0088FF]">LEADERSHIP</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
                Meet the Alliance Founders
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {founders.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="flex items-start space-x-4 text-left p-2"
                >
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={f.image}
                    alt={f.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover"
                  />
                  <div className="space-y-1.5 flex-1">
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.4, delay: i * 0.15 + 0.1 }}
                      className="font-heading text-lg font-bold text-slate-900"
                    >
                      {f.name}
                    </motion.h3>
                    <p className="text-xs font-semibold text-[#0088FF] uppercase tracking-wider">{f.role}</p>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.5, delay: i * 0.15 + 0.2 }}
                      className="text-xs text-slate-600 leading-relaxed font-medium"
                    >
                      {f.desc}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* 4. ANIMATED MINIMALIST MILESTONES TIMELINE */}
        <div className="space-y-8 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-2"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#0088FF]">MILESTONES</span>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
              Key Moments in Our Journey
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {timelineEvents.map((evt, idx) => {
              const IconComponent = evt.icon;
              // Directional initial position when reaching section: Left, Right, Top, Bottom
              const directions = [
                { x: -70, y: 0 },  // Left
                { x: 70, y: 0 },   // Right
                { x: 0, y: -50 },  // Top
                { x: 0, y: 50 },   // Bottom
              ];
              const initPos = directions[idx % directions.length];

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, ...initPos }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ type: "spring", stiffness: 280, damping: 20, delay: idx * 0.05 }}
                  whileHover={{ scale: 1.03, y: -5, transition: { duration: 0.15, ease: "easeOut" } }}
                  className="bg-slate-50/80 hover:bg-white border border-slate-200/90 hover:border-[#0088FF]/50 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="space-y-4">
                    {/* Top Row: Date Badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-[#0088FF] uppercase tracking-wider bg-sky-100/70 px-3 py-1 rounded-full border border-sky-200/60">
                        {evt.date}
                      </span>
                    </div>

                    {/* Milestone Title & Description */}
                    <div className="space-y-1.5">
                      <h4 className="font-heading text-lg font-black text-slate-900 group-hover:text-[#0088FF] transition-colors">
                        {evt.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                        {evt.desc}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Tag Badge */}
                  {evt.tag && (
                    <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 group-hover:text-[#0088FF] transition-colors">
                        {evt.tag}
                      </span>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0088FF]/40 group-hover:bg-[#0088FF] transition-colors"></div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 5. MINIMALIST METRICS SUMMARY */}
        <div className="py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0088FF]">
                <AnimatedCounter end={40} suffix="+" duration={1800} />
              </div>
              <span className="text-xs text-slate-500 font-medium">Projects Delivered</span>
            </div>

            <div className="space-y-1">
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0088FF]">
                <AnimatedCounter end={60} suffix="+" duration={1800} />
              </div>
              <span className="text-xs text-slate-500 font-medium">Senior Engineers</span>
            </div>

            <div className="space-y-1">
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0088FF]">
                <AnimatedCounter end={99} suffix="%" duration={1800} />
              </div>
              <span className="text-xs text-slate-500 font-medium">Client Retention</span>
            </div>

            <div className="space-y-1">
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0088FF]">
                <AnimatedCounter end={100} suffix="%" duration={1800} />
              </div>
              <span className="text-xs text-slate-500 font-medium">On-Time Velocity</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
