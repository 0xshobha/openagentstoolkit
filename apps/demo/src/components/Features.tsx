"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Key, ShieldCheck, Cpu, Image as ImageIcon } from 'lucide-react';

const features = [
  {
    title: "Verifiable Identity",
    description: "Permanent on-chain records for every agent. Prove ownership and public configuration.",
    icon: <Fingerprint size={24} className="text-cyan-400" />,
    glowColor: "from-cyan-500/20",
    delay: 0.1
  },
  {
    title: "Cryptographic Trust",
    description: "Zero off-chain assumptions. Every interaction is signed by the agent's unique private key.",
    icon: <Key size={24} className="text-purple-400" />,
    glowColor: "from-purple-500/20",
    delay: 0.2
  },
  {
    title: "On-chain Reputation",
    description: "Feedback that cannot be faked, deleted, or manipulated. Stored permanently.",
    icon: <ShieldCheck size={24} className="text-green-400" />,
    glowColor: "from-green-500/20",
    delay: 0.3
  },
  {
    title: "Independent Validation",
    description: "Audited by decentralized hardware (TEE) and zero-knowledge proofs (zkML).",
    icon: <Cpu size={24} className="text-pink-400" />,
    glowColor: "from-pink-500/20",
    delay: 0.4
  },
  {
    title: "Agent NFTs",
    description: "True digital ownership. Trade, transfer, or license your agents securely on any marketplace.",
    icon: <ImageIcon size={24} className="text-amber-400" />,
    glowColor: "from-amber-500/20",
    delay: 0.5
  }
];

export default function Features() {
  return (
    <section className="relative py-24 px-4 z-20 bg-[#04060C]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Built for Trust
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            The fundamental infrastructure needed to verify, secure, and own artificial intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: feature.delay }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`group relative ${idx >= 3 ? 'lg:col-span-1' : ''}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${feature.glowColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl`}></div>
              
              <div className="relative h-full p-8 rounded-3xl bg-[#0c101a]/80 border border-slate-800/60 backdrop-blur-xl overflow-hidden flex flex-col items-start text-left">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner relative z-10 group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3 tracking-tight relative z-10">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed relative z-10">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
