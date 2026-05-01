"use client";

import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between py-6 px-8 md:px-16 z-50 relative border-b border-white/5 bg-[#04060C]/50 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white/10 text-white flex items-center justify-center rounded-lg border border-white/20 shadow-inner">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
        </div>
        <span className="font-bold text-lg tracking-wider text-white">OPEN AGENTS</span>
      </div>
      <div className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-400">
        <a href="#" className="hover:text-white transition-colors">Platform</a>
        <a href="#" className="hover:text-white transition-colors">Documentation</a>
        <a href="#" className="hover:text-white transition-colors">Ecosystem</a>
        <ConnectButton />
      </div>
    </nav>
  );
}
