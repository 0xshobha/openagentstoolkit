"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Rocket, Settings2, ArrowRight } from 'lucide-react';

const steps = [
  { num: "01", title: "Connect Wallet", icon: <Wallet size={20} className="text-slate-300" />, desc: "Link your Web3 identity to start building." },
  { num: "02", title: "Deploy Agent", icon: <Rocket size={20} className="text-slate-300" />, desc: "Initialize an AI entity on your chosen network." },
  { num: "03", title: "Automate Strategy", icon: <Settings2 size={20} className="text-slate-300" />, desc: "Let your agent orchestrate complex operations." }
];

export default function HowItWorks() {
  return (
    <section className="relative py-24 px-4 z-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            How It Works
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            From zero to fully autonomous on-chain operations in three simple steps.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="w-full md:w-1/3 bg-slate-900/30 border border-slate-800 rounded-3xl p-8 backdrop-blur-md hover:bg-slate-800/40 transition-colors relative overflow-hidden group"
              >
                <div className="absolute -right-4 -top-4 text-7xl font-bold text-white/5 group-hover:text-white/10 transition-colors">{step.num}</div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner relative z-10 group-hover:bg-white/10 transition-colors">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 relative z-10">{step.title}</h3>
                <p className="text-sm text-slate-400 relative z-10 leading-relaxed">{step.desc}</p>
              </motion.div>

              {idx < steps.length - 1 && (
                <div className="hidden md:flex text-slate-700">
                  <ArrowRight size={24} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
