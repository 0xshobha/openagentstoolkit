"use client";

import React, { useState } from 'react';
import { ethers } from 'ethers';

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{title: string, desc: string, type: 'success' | 'error'} | null>(null);

  const showToast = (title: string, desc: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ title, desc, type });
    setTimeout(() => setToastMessage(null), 5000);
  };

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && typeof (window as any).ethereum !== 'undefined') {
      try {
        setIsConnecting(true);
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          showToast("Wallet Connected", `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`);
        }
      } catch (error: any) {
        console.error(error);
        showToast("Connection Failed", error.message || "Failed to connect wallet", 'error');
      } finally {
        setIsConnecting(false);
      }
    } else {
      showToast("No Wallet Found", "Please install MetaMask or another Web3 wallet.", 'error');
    }
  };

  const requireWallet = (action: () => void) => {
    if (!walletAddress) {
      showToast("Wallet Required", "Please connect your wallet first.", 'error');
      return;
    }
    action();
  };

  const handleMintAgent = () => {
    requireWallet(async () => {
      setLoadingAction('mint');
      // Simulate on-chain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      showToast("Agent Minted", "Successfully registered agent on-chain and stored profile hash on 0G Storage.");
      setLoadingAction(null);
    });
  };

  const handleRequestAudit = () => {
    requireWallet(async () => {
      setLoadingAction('audit');
      await new Promise(resolve => setTimeout(resolve, 2000));
      showToast("Validation Requested", "Validation request submitted. KeeperHub will dispatch the auditor.");
      setLoadingAction(null);
    });
  };

  const handleTestSwap = () => {
    requireWallet(async () => {
      setLoadingAction('swap');
      await new Promise(resolve => setTimeout(resolve, 2000));
      showToast("Swap Executed", "Across Protocol cross-chain swap initiated successfully.");
      setLoadingAction(null);
    });
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-indigo-500 selection:text-white font-sans relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/20 via-transparent to-emerald-900/20 pointer-events-none"></div>

      {toastMessage && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg border backdrop-blur-md animate-in fade-in slide-in-from-top-4 ${toastMessage.type === 'success' ? 'bg-emerald-900/50 border-emerald-500/50 text-emerald-100' : 'bg-red-900/50 border-red-500/50 text-red-100'}`}>
          <h4 className="font-bold">{toastMessage.title}</h4>
          <p className="text-sm opacity-90">{toastMessage.desc}</p>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-emerald-400">
              Open Agents Toolkit
            </h1>
            <p className="text-gray-400 mt-2 text-lg">Verifiable on-chain identity for AI agents.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={connectWallet}
              disabled={isConnecting || !!walletAddress}
              className={`px-6 py-2 rounded-full border transition-all font-medium backdrop-blur-md ${walletAddress ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30' : 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30 hover:bg-indigo-600/30'}`}
            >
              {isConnecting ? 'Connecting...' : walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Agent Registration Card */}
          <div className="group rounded-3xl bg-white/[0.02] border border-white/10 p-8 hover:bg-white/[0.04] transition-all relative overflow-hidden backdrop-blur-xl">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-3xl opacity-0 group-hover:opacity-20 transition duration-1000 blur-xl pointer-events-none"></div>
            <div className="relative">
              <h2 className="text-2xl font-bold mb-4 text-white/90">Register Agent</h2>
              <p className="text-gray-400 mb-6">Mint a new agent identity on-chain via ERC-8004 & ERC-7857.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Agent Name</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="e.g. helpful-assistant.eth" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">0G Storage Profile Hash</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="0x..." />
                </div>
                <button 
                  onClick={handleMintAgent}
                  disabled={loadingAction === 'mint'}
                  className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-emerald-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all disabled:opacity-70 disabled:hover:scale-100 flex justify-center items-center"
                >
                  {loadingAction === 'mint' ? <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></div> : 'Mint Agent NFT'}
                </button>
              </div>
            </div>
          </div>

          {/* Validation & Interoperability Card */}
          <div className="group rounded-3xl bg-white/[0.02] border border-white/10 p-8 hover:bg-white/[0.04] transition-all relative overflow-hidden backdrop-blur-xl">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-3xl opacity-0 group-hover:opacity-20 transition duration-1000 blur-xl pointer-events-none"></div>
            <div className="relative">
              <h2 className="text-2xl font-bold mb-4 text-white/90">Request Validation</h2>
              <p className="text-gray-400 mb-6">Dispatch an independent TEE validation via KeeperHub.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Select Agent</label>
                  <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none">
                    <option>helpful-assistant.eth</option>
                    <option>trading-swarm.eth</option>
                  </select>
                </div>
                <button 
                  onClick={handleRequestAudit}
                  disabled={loadingAction === 'audit'}
                  className="w-full mt-4 bg-white/10 text-white font-semibold py-3 rounded-xl border border-white/20 hover:bg-white/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
                >
                  {loadingAction === 'audit' ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></div>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      Request KeeperHub Audit
                    </>
                  )}
                </button>
                
                <div className="pt-6 mt-6 border-t border-white/10">
                  <h3 className="text-lg font-semibold text-white/80 mb-3">Cross-chain Bridge</h3>
                  <button 
                    onClick={handleTestSwap}
                    disabled={loadingAction === 'swap'}
                    className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold py-3 rounded-xl shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-[1.02] transition-all disabled:opacity-70 disabled:hover:scale-100 flex justify-center items-center"
                  >
                    {loadingAction === 'swap' ? <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></div> : 'Test Across Protocol Swap'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
