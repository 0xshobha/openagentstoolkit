"use client";

import React from 'react';
import { motion } from 'framer-motion';

const partners = [
  { name: "0G Network", glow: "hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:border-green-500/50" },
  { name: "Gensyn", glow: "hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:border-purple-500/50" },
  { name: "Uniswap", glow: "hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:border-pink-500/50" },
  { name: "KeeperHub", glow: "hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:border-sky-500/50" }
];

export default function Ecosystem() {
  return (
    <section className="relative py-20 px-4 z-20 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-32 bg-white/5 blur-[80px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">
          Powered By Leading Web3 Protocols
        </h3>
        
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {partners.map((partner, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`px-6 py-3 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm cursor-pointer transition-all duration-300 ${partner.glow} flex items-center justify-center`}
            >
              <span className="text-slate-300 font-medium tracking-wide">{partner.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
