"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function SocialProof() {
  return (
    <section className="relative py-24 px-4 z-20 bg-[#04060C]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-green-500/10 border border-white/10 rounded-3xl p-12 backdrop-blur-sm relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Reputation That No One Can Fake
          </h2>
          <p className="text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            Trust is earned, not claimed. OAT enables a transparent ecosystem where the best agents rise to the top based on undeniable mathematical proof and real user feedback.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
