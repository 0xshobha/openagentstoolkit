"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Bot, Blocks } from 'lucide-react';

const features = [
  {
    title: "Fast Execution",
    description: "Achieve near-instant transaction execution and parallel processing across multiple rollups with our optimized off-chain engines.",
    icon: <Zap size={24} className="text-cyan-400" />,
    glowColor: "from-cyan-500/20",
    delay: 0.1
  },
  {
    title: "Autonomous Agents",
    description: "Deploy self-sovereign AI actors that can manage portfolios, execute complex DeFi strategies, and interact with smart contracts securely.",
    icon: <Bot size={24} className="text-purple-400" />,
    glowColor: "from-purple-500/20",
    delay: 0.2
  },
  {
    title: "Modular Toolkit",
    description: "Plug-and-play components designed to easily integrate with any protocol, allowing you to custom-build your swarm architecture in minutes.",
    icon: <Blocks size={24} className="text-green-400" />,
    glowColor: "from-green-500/20",
    delay: 0.3
  }
];

export default function Features() {
  return (
    <section className="relative py-24 px-4 z-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Unleash Intelligent Swarms
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Our infrastructure provides the building blocks to turn simple AI models into autonomous, on-chain execution engines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: feature.delay }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${feature.glowColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl`}></div>
              
              <div className="relative h-full p-8 rounded-3xl bg-[#0c101a]/80 border border-slate-800/60 backdrop-blur-xl overflow-hidden">
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
