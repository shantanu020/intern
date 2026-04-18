"use client";

import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="py-20 px-8 border-t border-zinc-900 bg-background">
      <div className="container mx-auto max-w-[1240px] flex flex-col md:flex-row justify-between items-center gap-10">
        <Link href="/" className="font-display font-bold text-lg text-white uppercase tracking-tighter hover:text-glow transition-all">
          InternConnect
        </Link>
        <div className="flex gap-10 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Careers</a>
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
        </div>
        <div className="text-[10px] text-zinc-600 font-mono">© 2026 INTERNCONNECT PROTOCOL</div>
      </div>
    </footer>
  );
};
