import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';
import { Award, Users, ShieldCheck, Zap } from 'lucide-react';

export default function Stats({ theme = 'light' }) {
  const isLight = theme === 'light';

  const statsData = [
    {
      icon: Award,
      value: 15,
      suffix: "+",
      label: "Projects Completed",
      desc: "Delivered on schedule with 100% precision"
    },
    {
      icon: Users,
      value: 100,
      suffix: "K+",
      label: "Active Users Served",
      desc: "Scaling seamlessly across global regions"
    },
    {
      icon: ShieldCheck,
      value: 99.99,
      suffix: "%",
      label: "Enterprise Uptime SLA",
      desc: "Cloud infrastructure reliability guarantee"
    },
    {
      icon: Zap,
      value: 40,
      suffix: "%",
      label: "Average Efficiency Boost",
      desc: "Streamlined operational workflows"
    }
  ];

  return (
    <section className={`py-6 sm:py-8 transition-colors duration-500 border-y select-none ${isLight ? 'bg-[#F8FAFC] border-slate-200/80' : 'bg-[#0B172E] border-[#1E3A8A]'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {statsData.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.06 }}
                whileHover={{ y: -4 }}
                className={`p-4 sm:p-5 rounded-2xl border-0 shadow-md transition-all duration-200 hover:shadow-xl group flex flex-col justify-between cursor-pointer transform-gpu ${isLight ? 'bg-white shadow-sky-500/10' : 'bg-[#050B17] shadow-xl'
                  }`}
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-[#0088FF] mb-3 group-hover:scale-110 group-hover:bg-[#0088FF] group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className={`font-heading text-3xl sm:text-4xl font-black tracking-tight mb-1 ${isLight ? 'text-slate-900' : 'text-white'
                    }`}>
                    <AnimatedCounter
                      end={stat.value}
                      duration={2000}
                      suffix={stat.suffix}
                    />
                  </div>

                  <div className="text-xs font-black text-[#0088FF] uppercase tracking-wider mb-1">
                    {stat.label}
                  </div>
                </div>

                <p className={`text-xs font-semibold leading-relaxed mt-2 pt-2 border-t ${isLight ? 'text-slate-500 border-slate-100' : 'text-slate-400 border-[#1E3A8A]/60'
                  }`}>
                  {stat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

