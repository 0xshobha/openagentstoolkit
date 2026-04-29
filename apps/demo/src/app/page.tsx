"use client";

import React, { useState } from 'react';
import { ethers, BrowserProvider } from 'ethers';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShieldCheck, ArrowRightLeft, Rocket, Zap, Check } from 'lucide-react';

declare global {
  interface Window {
    ethereum?: unknown;
  }
}

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{title: string, desc: string, type: 'success' | 'error'} | null>(null);

  const showToast = (title: string, desc: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ title, desc, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum !== undefined) {
      try {
        setIsConnecting(true);
        const provider = new BrowserProvider(window.ethereum as ethers.Eip1193Provider);
        const accounts = await provider.send("eth_requestAccounts", []);
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          showToast("Connection Successful", `Linked address ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`);
        }
      } catch (error) {
        console.error(error);
        const errorMessage = error instanceof Error ? error.message : "Failed to connect wallet";
        showToast("Connection Failed", errorMessage, 'error');
      } finally {
        setIsConnecting(false);
      }
    } else {
      showToast("Wallet Unavailable", "Please install a compatible Web3 provider.", 'error');
    }
  };

  const requireWallet = (action: () => void) => {
    if (!walletAddress) {
      showToast("Authentication Required", "Please connect your wallet to proceed.", 'error');
      return;
    }
    action();
  };

  const handleMintAgent = () => {
    requireWallet(async () => {
      setLoadingAction('mint');
      await new Promise(resolve => setTimeout(resolve, 1500));
      showToast("Agent Initialized", "Identity registered on-chain and profile stored to 0G.");
      setLoadingAction(null);
    });
  };

  const handleRequestAudit = () => {
    requireWallet(async () => {
      setLoadingAction('audit');
      await new Promise(resolve => setTimeout(resolve, 1500));
      showToast("Validation Processing", "Request submitted. Awaiting KeeperHub response.");
      setLoadingAction(null);
    });
  };

  const handleTestSwap = () => {
    requireWallet(async () => {
      setLoadingAction('swap');
      await new Promise(resolve => setTimeout(resolve, 1500));
      showToast("Transfer Complete", "Cross-chain swap executed via Across Protocol.");
      setLoadingAction(null);
    });
  };

  return (
    <main className="min-h-screen bg-[#07090E] text-slate-200 selection:bg-indigo-500/30 selection:text-indigo-200 font-sans relative overflow-hidden flex flex-col lg:flex-row">
      
      {/* Organic, layered lighting effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[70%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[60%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent blur-3xl pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>

      {/* Toast Notifications */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
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

      {/* Left Column: Asymmetrical Header & Navigation */}
      <div className="w-full lg:w-5/12 lg:min-h-screen relative z-10 px-8 pt-24 pb-12 lg:p-24 flex flex-col justify-between">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-indigo-500/20 flex items-center justify-center mb-12 shadow-inner">
            <Sparkles className="text-indigo-300" size={18} />
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-6 leading-[1.1]">
            Open Agents <br/>
            <span className="text-slate-500">Toolkit</span>
          </h1>
          
          <p className="text-slate-400 text-lg leading-relaxed max-w-md font-light">
            Establish verifiable, on-chain identities for artificial intelligence. Decentralized infrastructure for autonomous actors.
          </p>

          <div className="mt-16">
            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: "rgba(99, 102, 241, 0.15)" }}
              whileTap={{ scale: 0.98 }}
              onClick={connectWallet}
              disabled={isConnecting || !!walletAddress}
              className={`group relative overflow-hidden rounded-[1.25rem] px-8 py-4 font-medium text-sm tracking-wide transition-all duration-300 backdrop-blur-md border flex items-center gap-3 ${walletAddress ? 'bg-cyan-950/30 text-cyan-200 border-cyan-800/50 shadow-[0_0_20px_rgba(8,145,178,0.1)]' : 'bg-slate-900/50 text-indigo-200 border-slate-700/50 hover:border-indigo-500/40 shadow-lg shadow-black/50'}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-white/5 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
              
              <Zap size={16} className={`transition-colors ${walletAddress ? 'text-cyan-400' : 'text-slate-500 group-hover:text-indigo-400'}`} />
              {isConnecting ? 'Authenticating...' : walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
            </motion.button>
          </div>
        </motion.div>

        <div className="hidden lg:block text-xs text-slate-600 font-medium tracking-widest uppercase mt-24">
          OAT Protocol v1.0
        </div>
      </div>

      {/* Right Column: Staggered Interactive Cards */}
      <div className="w-full lg:w-7/12 px-8 pb-24 lg:py-24 lg:pr-24 relative z-10 flex flex-col gap-12 lg:gap-20 items-center lg:items-start">
        
        {/* Card 1: Mint Agent */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg rounded-[24px] bg-slate-900/40 border border-slate-800/60 p-10 shadow-2xl backdrop-blur-2xl relative overflow-hidden lg:ml-0"
          style={{ borderTopLeftRadius: '32px', borderBottomRightRadius: '32px' }}
        >
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
          
          <div className="flex items-start gap-5 mb-8">
            <div className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700/50 shadow-inner">
              <Rocket size={20} className="text-slate-300" />
            </div>
            <div>
              <h2 className="text-xl font-medium text-slate-100 tracking-tight">Initialize Entity</h2>
              <p className="text-sm text-slate-500 mt-1 font-light">Deploy an ERC-7857 identity record.</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="group/input">
              <label className="block text-[11px] font-semibold text-slate-500 mb-2 uppercase tracking-widest transition-colors group-focus-within/input:text-indigo-400">Designation</label>
              <input type="text" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-slate-200 text-sm font-medium focus:outline-none focus:border-indigo-500/50 focus:bg-slate-900 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]" placeholder="e.g. system.eth" />
            </div>
            <div className="group/input">
              <label className="block text-[11px] font-semibold text-slate-500 mb-2 uppercase tracking-widest transition-colors group-focus-within/input:text-indigo-400">0G Volume Hash</label>
              <input type="text" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-slate-200 text-sm font-medium focus:outline-none focus:border-indigo-500/50 focus:bg-slate-900 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]" placeholder="0x..." />
            </div>
            
            <div className="pt-2">
              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleMintAgent}
                disabled={loadingAction === 'mint'}
                className="w-full bg-indigo-500/10 text-indigo-300 font-medium text-sm py-4 rounded-xl border border-indigo-500/20 hover:bg-indigo-500/20 hover:border-indigo-500/40 transition-all shadow-lg flex justify-center items-center gap-2 disabled:opacity-50"
              >
                {loadingAction === 'mint' ? <div className="animate-spin h-4 w-4 border-2 border-indigo-400/30 border-t-indigo-400 rounded-full"></div> : 'Commit Record'}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Validation & Bridge (Staggered to the right on large screens) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg rounded-[28px] bg-slate-900/30 border border-slate-800/40 p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden lg:ml-24"
        >
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-900/10 rounded-full blur-3xl"></div>

          <div className="flex items-start gap-5 mb-8 relative z-10">
            <div className="p-3 rounded-[1.2rem] bg-slate-800/40 border border-slate-700/40 shadow-inner">
              <ShieldCheck size={20} className="text-slate-300" />
            </div>
            <div>
              <h2 className="text-xl font-medium text-slate-100 tracking-tight">Security & Routing</h2>
              <p className="text-sm text-slate-500 mt-1 font-light">Enforce audits or execute cross-chain operations.</p>
            </div>
          </div>
          
          <div className="space-y-6 relative z-10">
            <div className="group/input">
              <label className="block text-[11px] font-semibold text-slate-500 mb-2 uppercase tracking-widest transition-colors group-focus-within/input:text-cyan-400">Target Identity</label>
              <div className="relative">
                <select className="w-full bg-slate-950/40 border border-slate-800/80 rounded-xl px-4 py-3.5 text-slate-200 text-sm font-medium focus:outline-none focus:border-cyan-500/40 focus:bg-slate-900 transition-all appearance-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]">
                  <option>system.eth</option>
                  <option>oracle-node.eth</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRequestAudit}
                disabled={loadingAction === 'audit'}
                className="bg-slate-800/40 text-slate-300 font-medium text-xs py-3.5 rounded-xl border border-slate-700/50 hover:bg-slate-800 hover:text-slate-200 transition-all flex items-center justify-center disabled:opacity-50"
              >
                {loadingAction === 'audit' ? (
                  <div className="animate-spin h-3.5 w-3.5 border-2 border-slate-400/30 border-t-slate-400 rounded-full"></div>
                ) : (
                  'Request Audit'
                )}
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleTestSwap}
                disabled={loadingAction === 'swap'}
                className="bg-cyan-900/20 text-cyan-300 font-medium text-xs py-3.5 rounded-xl border border-cyan-800/30 hover:bg-cyan-900/40 hover:border-cyan-700/50 transition-all flex items-center justify-center disabled:opacity-50"
              >
                {loadingAction === 'swap' ? (
                  <div className="animate-spin h-3.5 w-3.5 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full"></div>
                ) : (
                  <span className="flex items-center gap-1.5"><ArrowRightLeft size={12} /> Bridge Assets</span>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
