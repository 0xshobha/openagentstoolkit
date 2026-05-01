"use client";

import React, { useState } from 'react';
import { ethers, BrowserProvider } from 'ethers';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShieldCheck, Rocket, Zap, Check } from 'lucide-react';

declare global {
  interface Window {
    ethereum?: unknown;
  }
}

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{title: string, desc: string, type: 'success' | 'error'} | null>(null);

  const showToast = (title: string, desc: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ title, desc, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const connectWallet = async () => {
    if (isConnecting || walletAddress) return;

    if (typeof window !== 'undefined' && window.ethereum !== undefined) {
      try {
        setIsConnecting(true);
        const provider = new BrowserProvider(window.ethereum as ethers.Eip1193Provider);
        const accounts = await provider.send("eth_requestAccounts", []);
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          showToast("Connection Successful", `Linked address ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`);
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Wallet connection error:", error);
        showToast("Connection Failed", "Unable to establish a connection with your wallet.", 'error');
      } finally {
        setIsConnecting(false);
      }
    } else {
      showToast("Wallet Unavailable", "Please install a compatible Web3 provider.", 'error');
    }
  };

  return (
    <main className="min-h-screen bg-[#07090E] text-slate-200 selection:bg-indigo-500/30 selection:text-indigo-200 font-sans relative overflow-hidden flex flex-col pb-24">
      
      {/* Background glow effects */}
      <div className="absolute top-[-20%] left-[20%] w-[60%] h-[70%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[60%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent blur-[120px] pointer-events-none"></div>

      {/* Toast Notifications */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className={`fixed bottom-8 right-8 z-50 p-5 rounded-2xl shadow-2xl border backdrop-blur-xl flex items-start gap-4 max-w-sm ${toastMessage.type === 'success' ? 'bg-slate-900/80 border-cyan-900/40 text-cyan-50 shadow-cyan-900/20' : 'bg-slate-900/80 border-rose-900/40 text-rose-50 shadow-rose-900/20'}`}
          >
            <div className={`mt-0.5 ${toastMessage.type === 'success' ? 'text-cyan-400' : 'text-rose-400'}`}>
              <Check size={18} strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="font-semibold text-sm tracking-wide">{toastMessage.title}</h4>
              <p className="text-sm text-slate-400 mt-1 leading-relaxed">{toastMessage.desc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="w-full flex items-center justify-between py-6 px-8 md:px-16 z-50 relative">
        <div className="flex items-center gap-2">
          <div className="font-bold text-xl tracking-wider flex items-center gap-3">
             <div className="w-8 h-8 bg-white text-black flex items-center justify-center rounded-lg">
                <Sparkles size={18} />
             </div>
             OPEN AGENTS
          </div>
        </div>
        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-300">
          <a href="#" className="hover:text-white transition-colors">Platform</a>
          <a href="#" className="hover:text-white transition-colors">Documentation</a>
          <a href="#" className="hover:text-white transition-colors">Use Cases</a>
          <a href="#" className="hover:text-white transition-colors">Community</a>
          <button 
            onClick={connectWallet} 
            disabled={isConnecting || !!walletAddress}
            className="bg-white text-black px-6 py-2.5 rounded-full font-semibold hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-80"
          >
            {isConnecting ? 'Connecting...' : walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center mt-12 md:mt-24 z-10 relative px-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white">
          Discover the power <br /> of Open Agents
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto mb-10 font-light">
          Deploy verifiable, on-chain AI actors across the world's leading networks, right from your dashboard.
        </p>
        <div className="flex items-center gap-4">
          <button className="bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-700 px-5 py-3 rounded-2xl flex items-center gap-3 transition-all backdrop-blur-md">
             <Rocket size={18} className="text-slate-400" />
             <div className="text-left">
               <div className="text-[10px] text-slate-400 uppercase tracking-wider">Deploy Now</div>
               <div className="font-semibold text-sm">Start Building</div>
             </div>
          </button>
          <button className="bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-700 px-5 py-3 rounded-2xl flex items-center gap-3 transition-all backdrop-blur-md">
             <ShieldCheck size={18} className="text-slate-400" />
             <div className="text-left">
               <div className="text-[10px] text-slate-400 uppercase tracking-wider">Explore API</div>
               <div className="font-semibold text-sm">Read Docs</div>
             </div>
          </button>
        </div>
      </motion.div>

      {/* 3D Floating Graphic Container */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="w-full max-w-4xl mx-auto mt-16 md:mt-24 relative h-[300px] md:h-[400px] z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-transparent to-transparent z-20"></div>
        <div className="w-full h-full bg-slate-900/20 border-t border-x border-slate-800/50 rounded-t-[3rem] backdrop-blur-xl relative overflow-hidden flex items-center justify-center" style={{ perspective: '1000px' }}>
            
            {/* Core glowing sphere */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/10 blur-[50px] rounded-full mix-blend-screen"></div>
            
            {/* Abstract Platform */}
            <div className="w-[70%] h-[200px] border border-white/5 bg-slate-800/20 rounded-[3rem] transform rotate-x-60 absolute bottom-[-20px] shadow-[0_-20px_60px_rgba(255,255,255,0.05)] backdrop-blur-3xl flex items-center justify-center">
               {/* Center glowing logo on platform */}
               <div className="w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
            </div>
            
            {/* Floating UI Elements */}
            <motion.div animate={{y: [0, -15, 0]}} transition={{repeat: Infinity, duration: 4, ease: "easeInOut"}} className="absolute top-[25%] left-[25%] w-16 h-16 bg-indigo-500/20 rounded-2xl border border-indigo-400/30 flex items-center justify-center backdrop-blur-md rotate-12 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
              <Sparkles className="text-indigo-300" size={24} />
            </motion.div>
            <motion.div animate={{y: [0, -25, 0]}} transition={{repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1}} className="absolute top-[35%] right-[25%] w-20 h-20 bg-green-500/20 rounded-3xl border border-green-400/30 flex items-center justify-center backdrop-blur-md -rotate-12 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
              <Zap className="text-green-300" size={32} />
            </motion.div>
            <motion.div animate={{y: [0, -10, 0]}} transition={{repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5}} className="absolute top-[45%] left-[45%] w-14 h-14 bg-purple-500/20 rounded-xl border border-purple-400/30 flex items-center justify-center backdrop-blur-md rotate-6 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
              <ShieldCheck className="text-purple-300" size={20} />
            </motion.div>
        </div>
      </motion.div>

      {/* Stats Counter */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex items-center justify-center mb-12 md:mb-16 z-20 relative"
      >
        <div className="bg-slate-900/60 border border-slate-800 rounded-full py-2.5 px-6 flex items-center gap-4 backdrop-blur-md">
          <div className="flex -space-x-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-[#07090E] flex items-center justify-center"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="w-full h-full rounded-full" alt="avatar"/></div>
            <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-[#07090E] flex items-center justify-center"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jude" className="w-full h-full rounded-full" alt="avatar"/></div>
            <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-[#07090E] flex items-center justify-center"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" className="w-full h-full rounded-full" alt="avatar"/></div>
          </div>
          <span className="text-sm text-slate-300">Join <strong className="text-green-400 font-semibold tracking-wide">250,000+</strong> others building now</span>
        </div>
      </motion.div>

      {/* Bento Box Features */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 relative z-20">
        
        {/* Left Column (2 stacked cards) */}
        <div className="md:col-span-2 flex flex-col gap-6">
          
          {/* Card 1: Fast */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-[#121623] border border-slate-800/80 rounded-3xl p-8 md:p-10 relative overflow-hidden flex flex-col md:flex-row justify-between min-h-[260px] shadow-2xl"
          >
              <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-green-500/10 rounded-full blur-[80px]"></div>
              <div className="z-10 w-full md:w-[50%] mb-8 md:mb-0">
                <h3 className="text-3xl font-semibold mb-3 tracking-tight">Fast</h3>
                <p className="text-slate-400 text-sm leading-relaxed">No time? No problem! Open Agents Toolkit teaches you how to build and deploy AI agents faster than you can say &quot;WAGMI&quot;!</p>
              </div>
              <div className="z-10 w-full md:w-[45%] flex items-center">
                 <div className="w-full bg-[#1A1F30] rounded-2xl p-5 border border-slate-800 shadow-lg">
                   <div className="flex justify-between items-center mb-4">
                     <span className="text-xs text-slate-400 font-medium">IN PROGRESS</span>
                     <span className="text-xs font-semibold bg-green-500/20 text-green-400 px-3 py-1 rounded-full">Deploy Agent</span>
                   </div>
                   <div className="mb-2 flex justify-between items-end">
                     <span className="text-sm font-semibold">Intro to OAT</span>
                     <span className="text-[10px] text-slate-500">2/5</span>
                   </div>
                   <div className="w-full bg-slate-800 rounded-full h-1.5 mb-2">
                     <div className="bg-gradient-to-r from-green-400 to-green-500 h-1.5 rounded-full w-[40%] shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
                   </div>
                 </div>
              </div>
          </motion.div>

          {/* Card 2: In-depth */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="bg-[#121623] border border-slate-800/80 rounded-3xl p-8 md:p-10 relative overflow-hidden flex flex-col md:flex-row-reverse justify-between min-h-[260px] shadow-2xl"
          >
              <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]"></div>
              <div className="z-10 w-full md:w-[45%] mb-8 md:mb-0">
                <h3 className="text-3xl font-semibold mb-3 tracking-tight">In-depth</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Learning can be tough, but OAT makes it, well, easy! With our simple but super effective challenges, you&apos;ll go from zero to blockchain hero.</p>
              </div>
              <div className="z-10 w-full md:w-[50%] flex items-center">
                <div className="w-full bg-[#0D1018] rounded-xl p-5 border border-slate-800/50 font-mono text-xs text-indigo-300 leading-loose shadow-inner">
                  <div className="flex gap-2 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                  </div>
                  <span className="text-pink-400">const</span> agent = <span className="text-cyan-400">new</span> OpenAgent(&#123;<br/>
                  &nbsp;&nbsp;id: <span className="text-green-300">&quot;0x123...abc&quot;</span>,<br/>
                  &nbsp;&nbsp;type: <span className="text-green-300">&quot;trader&quot;</span><br/>
                  &#125;);<br/>
                  agent.<span className="text-blue-300">start</span>();
                </div>
              </div>
          </motion.div>
        </div>

        {/* Right Column (1 tall card) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="md:col-span-1 bg-[#121623] border border-slate-800/80 rounded-3xl p-8 md:p-10 relative overflow-hidden flex flex-col shadow-2xl min-h-[400px]"
        >
           <div className="absolute top-[-20px] right-[-20px] w-48 h-48 bg-purple-500/20 blur-[80px]"></div>
           
           <div className="z-10 flex-1 flex items-start justify-center pt-4 mb-8">
             <div className="w-[85%] bg-[#1A1F30] border border-slate-700/60 rounded-3xl p-4 shadow-xl relative pb-12">
                <div className="absolute -top-3 -right-3 bg-slate-800 border border-slate-700 rounded-xl p-1.5 flex items-center gap-2 shadow-lg">
                  <div className="w-6 h-6 rounded-md bg-purple-500/20 flex items-center justify-center">
                    <ShieldCheck size={12} className="text-purple-400" />
                  </div>
                  <span className="text-[10px] font-semibold pr-2">+50 XP</span>
                </div>
                
                <div className="w-12 h-1 bg-slate-700/50 rounded-full mx-auto mb-6"></div>
                <div className="text-center mb-6">
                  <h4 className="font-semibold text-sm">Intro to OAT</h4>
                  <p className="text-[10px] text-slate-500 mt-1">Lesson 2: Writing your first agent.</p>
                </div>

                <div className="w-16 h-16 rounded-2xl border border-dashed border-slate-600 mx-auto flex items-center justify-center mb-6">
                  <Zap className="text-slate-500" size={24} />
                </div>
                
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)] mx-auto absolute -bottom-6 left-1/2 -translate-x-1/2">
                   <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-black border-b-[6px] border-b-transparent ml-1"></div>
                </div>
             </div>
           </div>

           <div className="z-10 mt-auto">
             <h3 className="text-3xl font-semibold mb-3 tracking-tight">Structured</h3>
             <p className="text-slate-400 text-sm leading-relaxed">Not sure where to start? Our learning experts have designed each challenge series to help you learn as quickly and efficiently as possible.</p>
           </div>
        </motion.div>

      </div>
    </main>
  );
}
