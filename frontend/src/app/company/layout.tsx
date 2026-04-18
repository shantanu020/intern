"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  Building2, 
  LayoutDashboard, 
  PlusSquare, 
  Users, 
  KanbanSquare, 
  CheckSquare, 
  Wallet, 
  Star, 
  Settings,
  Bell
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/company/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/company/messages", label: "Messages", icon: Bell }, // Using Bell as a placeholder, will use a better one
  { href: "/company/post-role", label: "Post Role", icon: PlusSquare },
  { href: "/company/applicants", label: "Applicants", icon: Users },
  { href: "/company/pipeline", label: "Pipeline", icon: KanbanSquare },
  { href: "/company/interns", label: "Active Interns", icon: CheckSquare },
  { href: "/company/payments", label: "Payments Escrow", icon: Wallet },
  { href: "/company/reviews", label: "Reviews", icon: Star },
  { href: "/company/settings", label: "Settings", icon: Settings },
];

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background-secondary flex font-sans">
      
      {/* Sidebar */}
      <aside className="w-[260px] bg-background border-r border-edge flex-shrink-0 flex flex-col fixed inset-y-0 left-0 z-20">
        <div className="h-16 flex items-center px-6 border-b border-edge flex-shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-accent" />
            <span className="font-display font-bold text-lg tracking-tight text-copy-primary">Company Hub</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-accent/10 text-accent font-semibold" 
                    : "text-copy-secondary hover:bg-white/5 hover:text-copy-primary"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-accent" : "text-copy-muted")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-edge">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 flex-shrink-0 rounded-full border border-edge bg-accent-light/10 flex items-center justify-center font-bold text-xs text-accent-light">
              SK
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-copy-primary line-clamp-1">Sarah K.</span>
              <span className="text-xs text-copy-muted line-clamp-1">Draftly HQ</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col lg:pl-[260px] min-w-0">
        
        {/* Top Header */}
        <header className="h-16 bg-background/80 backdrop-blur-md border-b border-edge flex items-center justify-between px-8 sticky top-0 z-10 flex-shrink-0">
          <div className="flex items-center text-sm font-medium text-copy-secondary">
            {NAV_ITEMS.find(n => pathname.startsWith(n.href))?.label || "Dashboard"}
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/notifications" className="relative text-copy-muted hover:text-copy-primary transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-status-amber border-[1.5px] border-background" />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-x-hidden">
          {children}
        </main>
        
      </div>
    </div>
  );
}
