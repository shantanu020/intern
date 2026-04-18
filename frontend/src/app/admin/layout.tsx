"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Shield, 
  LayoutDashboard, 
  Building2, 
  Users, 
  Briefcase, 
  Banknote, 
  Menu,
  X,
  Search,
  Activity,
  Bell,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Companies", href: "/admin/companies", icon: Building2 },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Roles", href: "/admin/roles", icon: Briefcase },
  { label: "Payments", href: "/admin/payments", icon: Banknote },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-copy-primary flex font-sans">
      
      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-background border-r border-edge transition-transform duration-300 lg:relative lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Logo / Brand Area */}
          <div className="h-20 flex items-center px-8 border-b border-edge">
             <div className="flex items-center gap-3">
               <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center text-white shadow-glow-accent">
                 <Shield className="w-5 h-5" />
               </div>
               <div>
                  <h1 className="text-lg font-display font-black uppercase tracking-wider text-copy-primary">System</h1>
                  <p className="text-[9px] font-bold text-accent uppercase tracking-[0.2em] -mt-1 font-mono">Control Plane</p>
               </div>
             </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 py-8 px-4 space-y-1.5 overflow-y-auto">
             {NAV_ITEMS.map((item) => {
               const isActive = pathname === item.href || (item.href === "/admin/dashboard" && pathname === "/admin");
               return (
                 <Link 
                   key={item.label} 
                   href={item.href}
                   className={cn(
                     "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all group",
                     isActive 
                       ? "bg-accent/10 text-accent" 
                       : "text-copy-muted hover:text-copy-primary hover:bg-white/5"
                   )}
                 >
                   <item.icon className={cn("w-4 h-4 transition-colors", isActive ? "text-accent" : "text-copy-muted group-hover:text-copy-primary")} />
                   {item.label}
                   {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />}
                 </Link>
               );
             })}
          </nav>

          {/* Bottom Profile / Health Area */}
          <div className="p-4 border-t border-edge">
             <div className="bg-white/5 rounded-xl p-4 border border-edge">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent-2/20 flex items-center justify-center text-accent-2 font-bold text-xs ring-2 ring-background">
                    AD
                  </div>
                  <div>
                    <div className="text-xs font-bold text-copy-primary uppercase tracking-tight">Admin User</div>
                    <div className="text-[10px] text-copy-muted font-medium">Root Authority</div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-edge/30 text-[10px] font-bold text-copy-muted uppercase tracking-widest">
                   <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-status-green animate-pulse" /> Health</span>
                   <span className="text-copy-primary">99.9%</span>
                </div>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 border-b border-edge bg-background/50 backdrop-blur-md flex items-center justify-between px-8 shrink-0">
           <div className="flex items-center gap-4">
             <button 
               className="lg:hidden p-2 text-copy-muted hover:text-copy-primary transition-colors"
               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
             >
               {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
             </button>
             <div className="relative group hidden md:block">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-copy-muted group-focus-within:text-accent transition-colors" />
               <input 
                 type="text" 
                 placeholder="Search global directory..." 
                 className="bg-white/5 border border-edge rounded-lg pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-accent w-64 md:w-80 transition-all font-medium"
               />
             </div>
           </div>

           <div className="flex items-center gap-4">
             <button className="relative w-10 h-10 rounded-full border border-edge flex items-center justify-center text-copy-muted hover:text-copy-primary hover:bg-white/5 transition-all">
               <Bell className="w-4 h-4" />
               <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-status-red rounded-full ring-2 ring-background" />
             </button>
             <button className="flex items-center gap-3 pl-2 pr-4 h-10 rounded-full border border-edge hover:bg-white/5 transition-all group">
               <div className="w-7 h-7 bg-accent-3/20 rounded-full flex items-center justify-center text-accent-3 font-black text-[10px]">L</div>
               <span className="text-xs font-bold text-copy-muted group-hover:text-copy-primary transition-colors uppercase tracking-tight">Logout</span>
             </button>
           </div>
        </header>

        {/* Dynamic Page Stage */}
        <section className="flex-1 overflow-y-auto p-8 lg:p-12 scrollbar-hide">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </section>
      </main>

    </div>
  );
}
