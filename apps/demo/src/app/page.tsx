import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Stats from '../components/Stats';
import Ecosystem from '../components/Ecosystem';
import HowItWorks from '../components/HowItWorks';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#04060C] text-slate-200 selection:bg-purple-500/30 selection:text-purple-200 font-sans relative overflow-hidden flex flex-col">
      
      {/* Global abstract noise texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none mix-blend-overlay z-50"></div>
      
      {/* Top Navigation */}
      <Navbar />

      <Hero />
      <Ecosystem />
      <Features />
      <Stats />
      <HowItWorks />
      <Footer />
      
    </main>
  );
}
