"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Rocket } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

export default function Hero() {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const handleLaunchApp = () => {
    if (!isConnected && openConnectModal) {
      openConnectModal();
    } else {
      // If connected, proceed to app
      alert("Launching App for connected wallet...");
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 flex flex-col items-center justify-center min-h-[90vh]">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center z-10 max-w-4xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
          <Sparkles size={14} className="text-purple-400" />
          <span className="text-xs font-medium text-slate-300 tracking-wide uppercase">Introducing Open Agents Toolkit</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
          Autonomous AI Agents <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400">for Web3</span>
        </h1>
        
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          Build, deploy and orchestrate intelligent agents across DeFi, social and on-chain ecosystems with unparalleled modularity.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={handleLaunchApp}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            <Rocket size={18} />
            Launch App
          </button>
          <a 
            href="https://github.com/0xshobha/openagentstoolkit" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2 backdrop-blur-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            View GitHub
          </a>
        </div>
      </motion.div>

      {/* Floating 3D-style abstract elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 perspective-[1000px]">
        {/* Abstract floating card 1 */}
        <motion.div 
          animate={{ y: [0, -30, 0], rotateX: [10, 20, 10], rotateY: [-10, -20, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] md:left-[15%] w-48 h-64 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 backdrop-blur-3xl transform rotate-12 shadow-2xl"
        >
           <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-20"></div>
        </motion.div>

        {/* Abstract floating card 2 */}
        <motion.div 
          animate={{ y: [0, 40, 0], rotateX: [-15, -5, -15], rotateY: [15, 25, 15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[20%] right-[10%] md:right-[15%] w-56 h-48 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 backdrop-blur-3xl transform -rotate-12 shadow-2xl flex flex-col justify-between p-6"
        >
          <div className="w-12 h-12 rounded-full bg-cyan-500/20 blur-xl"></div>
          <div className="w-full h-2 bg-white/5 rounded-full mt-auto">
            <div className="w-2/3 h-full bg-cyan-400/50 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
          </div>
        </motion.div>
        
        {/* Small floating tokens */}
        <motion.div 
          animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-[40%] right-[20%] w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 backdrop-blur-xl flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.2)]"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-green-400 to-green-600 shadow-[inset_0_-2px_10px_rgba(0,0,0,0.5)]"></div>
        </motion.div>
      </div>
    </section>
  );
}
