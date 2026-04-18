"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  Search, 
  Eye, 
  Edit3, 
  Flag, 
  CheckCircle,
  Clock,
  Zap,
  Tag,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_ROLES = [
  { id: "R1", title: "Frontend Micro-Internship", company: "Draftly HQ", type: "Micro", status: "Active", applied: 42, matchQuality: 96, date: "2d ago" },
  { id: "R2", title: "Product Design Sprint", company: "Superhuman", type: "Short-term", status: "Review", applied: 15, matchQuality: 92, date: "5h ago" },
  { id: "R3", title: "Growth Analytics Intern", company: "Stripe", type: "Full-term", status: "Active", applied: 86, matchQuality: 88, date: "3d ago" },
  { id: "R4", title: "Backend GraphQL API", company: "Prisma Cloud", type: "Micro", status: "Flagged", applied: 0, matchQuality: 0, date: "1d ago" },
  { id: "R5", title: "Software Engineering Intern", company: "Vercel", type: "Short-term", status: "Active", applied: 112, matchQuality: 94, date: "4d ago" },
  { id: "R6", title: "AI Researcher Assistant", company: "Open Labs", type: "Full-term", status: "Review", applied: 24, matchQuality: 85, date: "12h ago" },
];

export default function AdminRolesPage() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="space-y-10 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-edge/30">
        <div>
          <h1 className="text-3xl font-display font-bold text-copy-primary">Listing Protocol</h1>
          <p className="text-copy-secondary mt-1">Moderate active micro-internships and project deployments.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="h-10 border-edge text-[10px] font-bold uppercase tracking-widest gap-2 bg-white/5">
             <AlertTriangle className="w-3.5 h-3.5 text-status-amber" /> Flagged (1)
           </Button>
           <Button className="h-10 bg-accent hover:bg-zinc-200 text-black text-[10px] font-bold uppercase tracking-widest shadow-glow-accent transition-all">
             Bulk Release Node
           </Button>
        </div>
      </div>

      {/* Grid Monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         
         {/* Main List */}
         <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between mb-4">
               <div className="relative group flex-1 mr-4">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-copy-muted group-focus-within:text-glow-accent transition-all" />
                  <input 
                    type="text" 
                    placeholder="Search roles or companies..." 
                    className="w-full bg-background border border-zinc-900 rounded-lg pl-12 pr-4 h-12 text-sm focus:border-accent outline-none font-medium transition-all"
                  />
               </div>
               <div className="flex bg-zinc-900 p-1 rounded-lg">
                  {["All", "Active", "Review"].map(t => (
                    <button key={t} onClick={() => setFilter(t)} className={cn("px-4 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-widest transition-all", filter === t ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300")}>{t}</button>
                  ))}
               </div>
            </div>

            <div className="space-y-4">
               {MOCK_ROLES.filter(r => filter === "All" || r.status === filter || (filter === "Review" && r.status === "Flagged")).map(role => (
                 <Card key={role.id} className="bg-zinc-950 border-zinc-900 hover:border-zinc-800 transition-all group overflow-hidden">
                    <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                       <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:bg-accent group-hover:text-white transition-all">
                             <Briefcase className="w-6 h-6" />
                          </div>
                          <div>
                             <h3 className="font-bold text-copy-primary text-sm uppercase tracking-tight group-hover:text-accent transition-colors">{role.title}</h3>
                             <div className="flex items-center gap-3 text-[10px] font-bold text-copy-muted uppercase tracking-widest mt-1">
                                <span>{role.company}</span>
                                <span className="text-zinc-800">•</span>
                                <span>{role.type}</span>
                                <span className="text-zinc-800">•</span>
                                <span>{role.date}</span>
                             </div>
                          </div>
                       </div>

                       <div className="flex items-center gap-8">
                          <div className="hidden sm:flex flex-col items-end gap-1">
                             <div className="text-[9px] font-bold text-copy-muted uppercase tracking-widest">Applied Signal</div>
                             <div className="text-sm font-mono font-bold text-copy-primary">{role.applied} <span className="text-[10px] text-zinc-700">Nodes</span></div>
                          </div>
                          <Badge variant={
                             role.status === 'Active' ? 'success' : 
                             role.status === 'Review' ? 'default' : 'danger'
                          } className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest border-none">
                             {role.status}
                          </Badge>
                          <div className="flex items-center gap-1.5">
                             <button className="p-2 border border-zinc-900 rounded-lg text-zinc-600 hover:text-white hover:bg-zinc-900 transition-all" title="View Listing">
                                <Eye className="w-4 h-4" />
                             </button>
                             <button className="p-2 border border-zinc-900 rounded-lg text-zinc-600 hover:text-status-amber hover:bg-zinc-900 transition-all" title="Flag Role">
                                <Flag className="w-4 h-4" />
                             </button>
                             <button className="p-2 border border-zinc-900 rounded-lg text-zinc-600 hover:text-accent-3 hover:bg-zinc-900 transition-all" title="Verify Role">
                                <CheckCircle className="w-4 h-4" />
                             </button>
                          </div>
                       </div>
                    </div>
                 </Card>
               ))}
            </div>
         </div>

         {/* Context Sidebar */}
         <div className="lg:col-span-4 space-y-8">
            <Card className="bg-zinc-950 border-zinc-900 overflow-hidden shadow-premium">
               <div className="p-6 border-b border-zinc-900 bg-zinc-950">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 font-bold">Policy Compliance</h3>
               </div>
               <CardContent className="p-6 space-y-6 text-xs leading-relaxed text-zinc-400 font-medium">
                  <div className="flex items-start gap-4">
                     <AlertTriangle className="w-4 h-4 text-status-amber shrink-0 mt-0.5" />
                     <p>Roles with a Match Quality index below <span className="text-white font-bold">40%</span> are automatically flagged for editorial review.</p>
                  </div>
                  <div className="flex items-start gap-4">
                     <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                     <p>Draft roles are purged from the primary index every <span className="text-white font-bold">72 hours</span> if not verified.</p>
                  </div>
                  <div className="flex items-start gap-4 text-accent-3">
                     <Zap className="w-4 h-4 shrink-0 mt-0.5" />
                     <p>Premium listings (Escrow verified) receive <span className="font-bold">3x signal boost</span> in the student discovery feed.</p>
                  </div>
               </CardContent>
            </Card>

            <Card className="bg-background border-edge p-6 space-y-4">
               <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-copy-muted">
                  <span>Track Distribution</span>
                  <Tag className="w-3.5 h-3.5" />
               </div>
               <div className="space-y-4 pt-2">
                  {[
                    { l: "Frontend Dev", v: "42%", c: "bg-accent" },
                    { l: "Product Design", v: "28%", c: "bg-accent-3" },
                    { l: "Growth Ops", v: "18%", c: "bg-accent-2" },
                    { l: "Data Science", v: "12%", c: "bg-zinc-700" },
                  ].map((t, i) => (
                    <div key={i} className="space-y-1.5">
                       <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest">
                          <span className="text-copy-primary">{t.l}</span>
                          <span className="text-copy-muted">{t.v}</span>
                       </div>
                       <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                          <div className={cn("h-full rounded-full", t.c)} style={{ width: t.v }} />
                       </div>
                    </div>
                  ))}
               </div>
            </Card>
         </div>

      </div>

    </div>
  );
}
