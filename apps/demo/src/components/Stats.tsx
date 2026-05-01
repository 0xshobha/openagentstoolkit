"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Layers, TrendingUp, Cpu } from 'lucide-react';

const stats = [
  { label: "Portfolio Value", value: "$42.5M+", icon: <TrendingUp size={16} className="text-green-400" />, glow: "border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.1)]" },
  { label: "Active Agents", value: "1,248", icon: <Cpu size={16} className="text-purple-400" />, glow: "border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.1)]" },
  { label: "Avg Yield", value: "14.2%", icon: <Layers size={16} className="text-cyan-400" />, glow: "border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.1)]" },
  { label: "System Health", value: "99.9%", icon: <Activity size={16} className="text-pink-400" />, glow: "border-pink-500/30 shadow-[0_0_20px_rgba(236,72,153,0.1)]" }
];

export default function Stats() {
  return (
    <section className="relative py-12 px-4 z-20">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`bg-slate-900/50 backdrop-blur-md rounded-2xl p-5 border ${stat.glow} flex flex-col items-center justify-center relative overflow-hidden`}
            >
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
              
              <div className="flex items-center gap-2 mb-2 z-10">
                {stat.icon}
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</span>
              </div>
              <div className="text-3xl font-bold text-white tracking-tight z-10">
                {stat.value}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
