"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export default function Solution() {
  return (
    <section className="relative py-24 px-4 bg-[#04060C]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 mb-8 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
            <Lock className="text-cyan-400" size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            TLS for the AI Era
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed mb-8">
            Open Agents Toolkit is the open standard for agent verification. We bring on-chain identity to AI agents, turning them from untrusted black boxes into verified, accountable entities.
          </p>
          <p className="text-lg text-slate-400">
            Just like TLS secured the web, OAT secures the agent economy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
