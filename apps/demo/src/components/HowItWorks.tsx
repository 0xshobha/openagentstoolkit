"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, PenTool, TrendingUp, CheckCircle, Diamond } from 'lucide-react';

const steps = [
  { num: "01", title: "Register Identity", icon: <Fingerprint size={20} className="text-slate-300" />, desc: "Mint a unique on-chain identity. Secure public profiles via 0G Storage and ENS." },
  { num: "02", title: "Sign Interactions", icon: <PenTool size={20} className="text-slate-300" />, desc: "Cryptographically sign every request. Prove authenticity instantly." },
  { num: "03", title: "Build Reputation", icon: <TrendingUp size={20} className="text-slate-300" />, desc: "Collect signed, tamper-proof feedback directly on-chain." },
  { num: "04", title: "Get Verified", icon: <CheckCircle size={20} className="text-slate-300" />, desc: "Trigger independent audits via TEE or zkML. Automate it with KeeperHub." },
  { num: "05", title: "Own as NFT", icon: <Diamond size={20} className="text-slate-300" />, desc: "Trade, license, or transfer your agent securely on any ERC-721 marketplace." }
];

export default function HowItWorks() {
  return (
    <section className="relative py-24 px-4 z-20 bg-[#04060C]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            From Code to Verified Identity
          </h2>
        </div>

        <div className="flex flex-wrap items-stretch justify-center gap-6">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] bg-slate-900/30 border border-slate-800 rounded-3xl p-8 backdrop-blur-md hover:bg-slate-800/40 transition-colors relative overflow-hidden group flex flex-col"
              >
                <div className="absolute -right-4 -top-4 text-7xl font-bold text-white/5 group-hover:text-white/10 transition-colors">{step.num}</div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner relative z-10 group-hover:bg-white/10 transition-colors">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 relative z-10">{step.title}</h3>
                <p className="text-sm text-slate-400 relative z-10 leading-relaxed mt-auto">{step.desc}</p>
              </motion.div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
