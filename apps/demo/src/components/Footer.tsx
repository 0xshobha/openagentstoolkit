"use client";

import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/60 bg-[#04060C] py-12 px-4 relative z-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
            <Sparkles size={16} className="text-slate-300" />
          </div>
          <span className="font-bold text-lg tracking-wide text-white">OPEN AGENTS</span>
        </div>
        
        <div className="flex items-center gap-8 text-sm font-medium text-slate-500">
          <a href="#" className="hover:text-white transition-colors">Documentation</a>
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">Discord</a>
          <a href="https://github.com/0xshobha/openagentstoolkit" className="hover:text-white transition-colors">GitHub</a>
        </div>
        
        <div className="text-xs text-slate-600 font-light">
          &copy; {new Date().getFullYear()} Open Agents Toolkit. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
