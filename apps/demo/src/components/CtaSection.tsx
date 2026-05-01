"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, FileText } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

export default function CtaSection() {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const handleStartBuilding = () => {
    if (!isConnected && openConnectModal) {
      openConnectModal();
    } else {
      alert("Opening Developer Dashboard...");
    }
  };

  return (
    <section className="relative py-32 px-4 bg-[#04060C] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Secure Your Agent&apos;s Future
          </h2>
          <p className="text-xl text-slate-400 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
            Stop relying on blind trust. Build verified, accountable, and ownable AI agents today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={handleStartBuilding}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              <Rocket size={18} />
              Start Building Now
            </button>
            <a 
              href="https://github.com/0xshobha/openagentstoolkit" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2 backdrop-blur-md"
            >
              <FileText size={18} />
              Read the Docs
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
