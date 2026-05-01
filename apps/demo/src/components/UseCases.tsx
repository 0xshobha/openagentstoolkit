"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Blocks, Building2, ShoppingBag } from 'lucide-react';

const cases = [
  {
    title: "For Developers",
    desc: "Publish once. Get discovered everywhere without platform lock-in.",
    icon: <Code2 size={24} className="text-cyan-400" />
  },
  {
    title: "For Web3 Builders",
    desc: "Integrate verified agents seamlessly into your dApps and protocols.",
    icon: <Blocks size={24} className="text-purple-400" />
  },
  {
    title: "For Enterprises",
    desc: "Deploy with confidence. Maintain a permanent audit trail for compliance.",
    icon: <Building2 size={24} className="text-amber-400" />
  },
  {
    title: "For Marketplaces",
    desc: "Buy, sell, and license agents with provable IP protection.",
    icon: <ShoppingBag size={24} className="text-green-400" />
  }
];

export default function UseCases() {
  return (
    <section className="relative py-24 px-4 bg-[#04060C] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            The Foundation for the Agent Economy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cases.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
