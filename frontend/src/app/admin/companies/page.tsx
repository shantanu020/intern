"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  CheckCircle2, 
  XCircle, 
  Search, 
  SlidersHorizontal, 
  ExternalLink,
  MoreHorizontal,
  Mail,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_COMPANIES = [
  { id: "C1", name: "Draftly HQ", category: "Design Ops", status: "Verified", date: "Oct 12, 2025", email: "hr@draftly.design", location: "Global" },
  { id: "C2", name: "Superhuman", category: "Productivity", status: "Pending", date: "Oct 14, 2025", email: "recruiting@superhuman.com", location: "SF, USA" },
  { id: "C3", name: "Stripe", category: "Fintech", status: "Verified", date: "Oct 10, 2025", email: "hiring@stripe.com", location: "Remote" },
  { id: "C4", name: "Vercel", category: "Infrastructure", status: "Verified", date: "Oct 11, 2025", email: "talent@vercel.com", location: "SF, USA" },
  { id: "C5", name: "Linear Systems", category: "Productivity", status: "Pending", date: "Oct 15, 2025", email: "hello@linear.app", location: "Hybrid" },
  { id: "C6", name: "Prisma Cloud", category: "DevTools", status: "Flagged", date: "Oct 12, 2025", email: "ops@prisma.io", location: "Global" },
];

export default function AdminCompaniesPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = MOCK_COMPANIES.filter(c => activeTab === "All" || c.status === activeTab);

  return (
    <div className="space-y-10 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-copy-primary">Company Registry</h1>
          <p className="text-copy-secondary mt-1">Found {MOCK_COMPANIES.length} organizations in the ecosystem.</p>
        </div>
        <div className="flex gap-2 bg-white/5 p-1 rounded-lg border border-edge">
           {["All", "Pending", "Verified", "Flagged"].map(tab => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={cn(
                 "px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all",
                 activeTab === tab ? "bg-accent text-white shadow-glow" : "text-copy-muted hover:text-copy-primary hover:bg-white/5"
               )}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
         <div className="relative w-full md:w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-copy-muted group-focus-within:text-accent transition-colors" />
            <input 
              type="text" 
              placeholder="Search companies by name or email..." 
              className="w-full bg-background border border-edge rounded-lg pl-9 pr-3 py-2 text-xs focus:border-accent outline-none font-medium h-11"
            />
         </div>
         <div className="flex items-center gap-3 w-full md:w-auto">
            <Button variant="outline" className="flex-1 md:flex-none h-11 border-edge text-[10px] font-bold uppercase tracking-widest gap-2">
               <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
            </Button>
            <Button className="flex-1 md:flex-none h-11 bg-accent hover:bg-zinc-200 text-black text-[10px] font-bold uppercase tracking-widest transition-all">
               Manual Onboarding
            </Button>
         </div>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {filtered.map(company => (
           <Card key={company.id} className="bg-background border-edge hover:border-accent/30 transition-all group shadow-premium flex flex-col">
              <div className="p-8 flex-1">
                 <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center font-display font-bold text-xl text-white group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                       {company.name.substring(0,2).toUpperCase()}
                    </div>
                    <Badge variant={
                       company.status === 'Verified' ? 'success' : 
                       company.status === 'Pending' ? 'default' : 'danger'
                    } className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em] border-none shadow-sm">
                       {company.status}
                    </Badge>
                 </div>

                 <h3 className="text-xl font-display font-bold text-copy-primary mb-2 flex items-center gap-2 group-hover:text-accent transition-colors">
                    {company.name}
                    <ExternalLink className="w-3.5 h-3.5 text-copy-muted opacity-0 group-hover:opacity-100 transition-all" />
                 </h3>
                 <p className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-6">{company.category} // {company.location}</p>
                 
                 <div className="space-y-3 font-medium text-xs text-copy-muted">
                    <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-zinc-800" /> {company.email}</div>
                    <div className="flex items-center gap-3"><Calendar className="w-4 h-4 text-zinc-800" /> Joined {company.date}</div>
                 </div>
              </div>

              <div className="p-4 bg-background-secondary/50 border-t border-edge flex items-center justify-between gap-3">
                 {company.status === 'Pending' ? (
                   <>
                    <Button variant="outline" size="sm" className="flex-1 h-9 border-edge text-[9px] font-bold uppercase tracking-widest hover:border-status-red hover:text-status-red transition-all">Reject</Button>
                    <Button size="sm" className="flex-1 h-9 bg-accent hover:bg-zinc-200 text-black text-[9px] font-bold uppercase tracking-widest shadow-glow-accent transition-all">Approve</Button>
                   </>
                 ) : (
                   <>
                    <Button variant="outline" size="sm" className="flex-1 h-9 border-edge text-[9px] font-bold uppercase tracking-widest">Edit Records</Button>
                    <button className="h-9 w-9 flex items-center justify-center border border-edge rounded-lg text-copy-muted hover:text-copy-primary hover:bg-white/5 transition-all">
                       <MoreHorizontal className="w-4 h-4" />
                    </button>
                   </>
                 )}
              </div>
           </Card>
         ))}
      </div>

    </div>
  );
}
