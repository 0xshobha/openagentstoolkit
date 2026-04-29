"use client";

import React, { useState } from 'react';
import { ethers, BrowserProvider } from 'ethers';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShieldCheck, ArrowRightLeft, Rocket, Zap, CheckCircle2 } from 'lucide-react';

// Fix TS any errors for window.ethereum
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
        // Using BrowserProvider and casting window.ethereum to the correct type under the hood
        const provider = new BrowserProvider(window.ethereum as ethers.Eip1193Provider);
        const accounts = await provider.send("eth_requestAccounts", []);
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          showToast("Woohoo! 🎉", `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`);
        }
      } catch (error) {
        console.error(error);
        const errorMessage = error instanceof Error ? error.message : "Failed to connect wallet";
        showToast("Oops! 😬", errorMessage, 'error');
      } finally {
        setIsConnecting(false);
      }
    } else {
      showToast("No Wallet Found 🕵️‍♂️", "Please install MetaMask to join the party!", 'error');
    }
  };

  const requireWallet = (action: () => void) => {
    if (!walletAddress) {
      showToast("Hold up! ✋", "You need to connect your wallet first.", 'error');
      return;
    }
    action();
  };

  const handleMintAgent = () => {
    requireWallet(async () => {
      setLoadingAction('mint');
      await new Promise(resolve => setTimeout(resolve, 1500));
      showToast("Agent Minted! 🤖✨", "Your AI Agent is now officially on-chain!");
      setLoadingAction(null);
    });
  };

  const handleRequestAudit = () => {
    requireWallet(async () => {
      setLoadingAction('audit');
      await new Promise(resolve => setTimeout(resolve, 1500));
      showToast("Audit Requested! 🕵️‍♀️", "KeeperHub is on the case! The auditor will check it out.");
      setLoadingAction(null);
    });
  };

  const handleTestSwap = () => {
    requireWallet(async () => {
      setLoadingAction('swap');
      await new Promise(resolve => setTimeout(resolve, 1500));
      showToast("Swap Complete! 🚀", "Tokens teleported across chains via Across Protocol.");
      setLoadingAction(null);
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <main className="min-h-screen bg-[#0f0f13] text-white selection:bg-purple-500 selection:text-white font-sans relative overflow-hidden">
      {/* Playful animated background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] mix-blend-screen animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-600/20 blur-[120px] mix-blend-screen animate-blob animation-delay-2000"></div>
      <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-pink-600/10 blur-[100px] mix-blend-screen animate-blob animation-delay-4000"></div>

      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            className={`fixed top-6 right-6 z-50 p-5 rounded-2xl shadow-2xl border backdrop-blur-xl flex items-start gap-4 max-w-sm ${toastMessage.type === 'success' ? 'bg-emerald-900/40 border-emerald-500/30 text-emerald-50' : 'bg-red-900/40 border-red-500/30 text-red-50'}`}
          >
            <div className={`mt-0.5 rounded-full p-1 ${toastMessage.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
              <CheckCircle2 size={20} />
            </div>
            <div>
              <h4 className="font-bold text-lg leading-tight">{toastMessage.title}</h4>
              <p className="text-sm opacity-80 mt-1">{toastMessage.desc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-20 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-purple-300 mb-4">
              <Sparkles size={16} /> Welcome to the future!
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 pb-2">
              Open Agents Toolkit
            </h1>
            <p className="text-gray-400 mt-2 text-xl font-medium max-w-xl">
              Give your AI agents a real, verifiable on-chain identity. No more bots without passports! 🛂🤖
            </p>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={connectWallet}
            disabled={isConnecting || !!walletAddress}
            className={`px-8 py-4 rounded-full border transition-all font-bold text-lg backdrop-blur-md shadow-xl flex items-center gap-3 ${walletAddress ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-500/20' : 'bg-purple-600/20 text-purple-300 border-purple-500/40 hover:bg-purple-600/30 hover:border-purple-400 shadow-purple-500/20'}`}
          >
            <Zap size={20} className={walletAddress ? 'text-emerald-400' : 'text-purple-400'} />
            {isConnecting ? 'Plugging in...' : walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
          </motion.button>
        </motion.header>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Mint Agent Card */}
          <motion.div variants={itemVariants} className="group rounded-[2rem] bg-white/[0.03] border border-white/10 p-8 hover:bg-white/[0.05] transition-colors relative overflow-hidden backdrop-blur-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10 text-purple-500 group-hover:scale-110 transition-transform duration-500">
              <Rocket size={120} />
            </div>
            <div className="relative z-10">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30">
                <Rocket className="text-white" size={24} />
              </div>
              <h2 className="text-3xl font-bold mb-2 text-white/90">Birth an Agent 🐣</h2>
              <p className="text-gray-400 mb-8 font-medium">Mint a fresh ERC-7857 identity for your AI. Make it official.</p>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">What&apos;s its name?</label>
                  <input type="text" className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white font-medium focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-inner" placeholder="e.g. helpful-assistant.eth" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">0G Profile Hash</label>
                  <input type="text" className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white font-medium focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-inner" placeholder="0x..." />
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleMintAgent}
                  disabled={loadingAction === 'mint'}
                  className="w-full mt-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg py-4 rounded-2xl shadow-xl shadow-purple-500/25 disabled:opacity-70 flex justify-center items-center gap-2"
                >
                  {loadingAction === 'mint' ? <div className="animate-spin h-6 w-6 border-3 border-white/30 border-t-white rounded-full"></div> : <>Mint Agent <Sparkles size={20}/></>}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Validation Card */}
          <motion.div variants={itemVariants} className="group rounded-[2rem] bg-white/[0.03] border border-white/10 p-8 hover:bg-white/[0.05] transition-colors relative overflow-hidden backdrop-blur-2xl flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-8 opacity-10 text-emerald-500 group-hover:scale-110 transition-transform duration-500">
              <ShieldCheck size={120} />
            </div>
            <div className="relative z-10">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30">
                <ShieldCheck className="text-white" size={24} />
              </div>
              <h2 className="text-3xl font-bold mb-2 text-white/90">Verify & Bridge 🌉</h2>
              <p className="text-gray-400 mb-8 font-medium">Keep them honest with KeeperHub audits, or send funds across chains.</p>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Select Agent</label>
                  <select className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white font-medium focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all appearance-none shadow-inner">
                    <option>helpful-assistant.eth</option>
                    <option>trading-swarm.eth</option>
                  </select>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleRequestAudit}
                  disabled={loadingAction === 'audit'}
                  className="w-full bg-white/5 text-white font-bold text-lg py-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loadingAction === 'audit' ? (
                    <div className="animate-spin h-6 w-6 border-3 border-white/30 border-t-white rounded-full"></div>
                  ) : (
                    <>Request Audit <ShieldCheck size={20}/></>
                  )}
                </motion.button>
              </div>
            </div>

            <div className="relative z-10 pt-6 mt-8 border-t border-white/10">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleTestSwap}
                disabled={loadingAction === 'swap'}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg py-4 rounded-2xl shadow-xl shadow-orange-500/25 disabled:opacity-70 flex justify-center items-center gap-2"
              >
                {loadingAction === 'swap' ? <div className="animate-spin h-6 w-6 border-3 border-white/30 border-t-white rounded-full"></div> : <>Test Across Swap <ArrowRightLeft size={20}/></>}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
