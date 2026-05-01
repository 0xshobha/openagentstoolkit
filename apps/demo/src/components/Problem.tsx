"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';

export default function Problem() {
  return (
    <section className="relative py-24 px-4 border-t border-white/5 bg-[#04060C]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1 space-y-6"
        >
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
            <ShieldAlert className="text-red-400" size={24} />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            The Black Box Problem
          </h2>
          <p className="text-xl text-slate-400 leading-relaxed font-light">
            AI agents are everywhere, but trust is nowhere.
          </p>
          <p className="text-lg text-slate-500 leading-relaxed">
            When an agent introduces itself, you can’t verify who owns it, what its track record is, or if it’s safe. 
            Isolated ecosystems. Unverified claims. Blind trust.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 w-full"
        >
          <div className="relative w-full aspect-square max-w-md mx-auto">
            {/* Abstract Black Box Representation */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-black rounded-3xl border border-white/5 shadow-2xl flex items-center justify-center overflow-hidden">
              <div className="absolute w-[200%] h-[200%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
              <div className="absolute w-32 h-32 bg-red-500/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 flex flex-col items-center gap-4 text-slate-500">
                <div className="w-16 h-16 border-2 border-dashed border-slate-600 rounded-lg animate-pulse flex items-center justify-center">
                  <span className="text-2xl font-mono text-slate-400">?</span>
                </div>
                <div className="space-y-2 text-center text-sm font-mono">
                  <div className="bg-white/5 px-3 py-1 rounded">Owner: Unknown</div>
                  <div className="bg-white/5 px-3 py-1 rounded">Reputation: Unverified</div>
                  <div className="bg-white/5 px-3 py-1 rounded">Origin: Untrusted</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
