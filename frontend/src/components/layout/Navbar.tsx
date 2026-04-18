"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Marketplace", href: "/browse" },
  { label: "Protocol", href: "/feed" },
  { label: "Pricing", href: "/pricing" },
  { label: "For Partners", href: "/companies" },
];

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-zinc-800/60 bg-background/95 backdrop-blur-md">
      <div className="container mx-auto max-w-[1240px] px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-display font-bold text-2xl tracking-tighter text-white uppercase group-hover:text-glow transition-all">
            InternConnect
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-[0.8rem] font-bold uppercase tracking-widest">
          {NAV_ITEMS.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className={cn(
                "hover:text-white transition-colors",
                pathname === item.href ? "text-white" : "text-zinc-500"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-[10px] uppercase font-bold tracking-widest">
            Sign in
          </Button>
          <Button variant="primary" size="sm" className="px-6 rounded-sm text-[10px] uppercase font-bold tracking-widest h-10">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};
