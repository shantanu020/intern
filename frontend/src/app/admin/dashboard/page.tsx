"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Building2, 
  Banknote, 
  Activity, 
  AlertCircle,
  TrendingUp,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const STATS = [
  { label: "Total Students", value: "3,412", change: "+12%", icon: Users, color: "text-accent", bg: "bg-accent/10" },
  { label: "Active Companies", value: "248", change: "+5%", icon: Building2, color: "text-accent-3", bg: "bg-accent-3/10" },
  { label: "Escrow in Transit", value: "$42,150", change: "-2%", icon: Banknote, color: "text-accent-2", bg: "bg-accent-2/10" },
  { label: "AI Matches (24h)", value: "1,102", change: "+24%", icon: Activity, color: "text-status-amber", bg: "bg-status-amber/10" },
];

const RECENT_ACTIVITY = [
  { company: "Stripe", action: "Posted New Role", target: "Data Engineering", time: "2m ago", status: "Succeeded" },
  { company: "Aryan Sharma", action: "Milestone Released", target: "$500.00", time: "15m ago", status: "Verified" },
  { company: "Draftly HQ", action: "Payment Failed", target: "Bank Reject", time: "1h ago", status: "Alert" },
  { company: "Vercel", action: "Internship Completed", target: "Sneha R.", time: "2h ago", status: "Succeeded" },
  { company: "Supabase", action: "Signed Up", target: "Recruiter Account", time: "5h ago", status: "New" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-12 animate-in fade-in">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-edge/30">
        <div>
           <h1 className="text-3xl font-display font-bold text-copy-primary">Platform Overview</h1>
           <p className="text-copy-secondary mt-1">Real-time telemetry and system audit metrics.</p>
        </div>
        <div className="flex gap-3">
           <Button variant="outline" className="border-edge bg-white/5 uppercase tracking-widest text-[10px] font-bold">Download Report</Button>
           <Button className="bg-accent hover:bg-zinc-200 text-black uppercase tracking-widest text-[10px] font-bold transition-all shadow-glow-accent">Generate Manual Audit</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {STATS.map(stat => (
           <Card key={stat.label} className="bg-background border-edge hover:border-accent/40 transition-all group shadow-sm">
             <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", stat.bg)}>
                    <stat.icon className={cn("w-6 h-6", stat.color)} />
                  </div>
                  <Badge variant={stat.change.startsWith('+') ? 'success' : 'danger'} className="px-2 py-0.5 text-[10px] font-bold">
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-3xl font-display font-bold text-copy-primary">{stat.value}</div>
                <div className="text-[10px] font-bold text-copy-muted uppercase tracking-widest mt-2">{stat.label}</div>
             </CardContent>
           </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         
         {/* Activity Log */}
         <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-bold">Platform Audit Log</h2>
              <button className="text-[10px] font-bold text-accent hover:underline uppercase tracking-widest">Full Log Protocol</button>
           </div>
           
           <Card className="bg-background border-edge overflow-hidden shadow-premium">
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead className="bg-background-secondary text-[10px] font-bold uppercase tracking-[0.2em] text-copy-muted">
                   <tr>
                     <th className="px-8 py-5 border-b border-edge">Actor</th>
                     <th className="px-8 py-5 border-b border-edge">Event</th>
                     <th className="px-8 py-5 border-b border-edge">Target</th>
                     <th className="px-8 py-5 border-b border-edge text-right">Status</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-edge">
                    {RECENT_ACTIVITY.map((log, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                         <td className="px-8 py-5">
                           <div className="font-bold text-sm text-copy-primary group-hover:text-accent transition-colors">{log.company}</div>
                           <div className="text-[10px] font-medium text-copy-muted uppercase tracking-tight mt-0.5">{log.time}</div>
                         </td>
                         <td className="px-8 py-5 text-sm font-medium text-copy-secondary">
                           {log.action}
                         </td>
                         <td className="px-8 py-5 font-mono text-[10px] text-copy-muted font-bold tracking-tight">
                           {log.target}
                         </td>
                         <td className="px-8 py-5 text-right">
                           <Badge variant={
                             log.status === 'Succeeded' || log.status === 'Verified' ? 'success' : 
                             log.status === 'Alert' ? 'danger' : 'default'
                           } className="px-2 py-0 text-[10px] font-bold uppercase border-none">
                             {log.status === 'Alert' && <AlertCircle className="w-3 h-3 mr-1" />}
                             {log.status}
                           </Badge>
                         </td>
                      </tr>
                    ))}
                 </tbody>
               </table>
             </div>
             <div className="p-4 bg-background-secondary/50 flex justify-center border-t border-edge">
               <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest text-copy-muted hover:text-copy-primary gap-2">
                 Load Concurrent Events <ArrowRight className="w-3 h-3" />
               </Button>
             </div>
           </Card>
         </div>

         {/* System Health Panel */}
         <div className="space-y-8">
            <h2 className="text-xl font-display font-bold">System Integrity</h2>
            
            <Card className="bg-background border-edge shadow-premium bg-gradient-to-br from-background via-background to-accent/5">
              <CardContent className="p-8">
                 <div className="flex items-center gap-6 mb-8">
                   <div className="w-16 h-16 rounded-full border border-accent/20 flex flex-col items-center justify-center bg-accent/5 ring-8 ring-accent/5">
                     <span className="text-xl font-display font-bold text-accent">94<span className="text-xs">%</span></span>
                   </div>
                   <div>
                     <div className="font-bold text-sm text-copy-primary uppercase tracking-tight">Match Quality</div>
                     <div className="text-[10px] text-copy-muted font-medium mt-1">Rolling avg. over 1k signals</div>
                   </div>
                 </div>
                 
                 <div className="space-y-5 pt-6 border-t border-edge/50">
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest">
                       <span className="text-copy-secondary">DB Latency</span>
                       <span className="font-mono text-accent-3">12ms</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest">
                       <span className="text-copy-secondary">AI Node Load</span>
                       <span className="font-mono text-status-amber">64%</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest">
                       <span className="text-copy-secondary">Pending Releases</span>
                       <span className="font-mono text-copy-primary">24 Units</span>
                    </div>
                 </div>

                 <Button className="w-full mt-10 h-12 uppercase tracking-[0.2em] text-[10px] font-bold" variant="outline">Run Neural Diagnostic</Button>
              </CardContent>
            </Card>

            <Card className="bg-background border-edge shadow-sm">
              <CardContent className="p-8">
                 <div className="flex items-start gap-5">
                    <div className="p-3 rounded-xl bg-accent-3/10 text-accent-3 shrink-0">
                       <TrendingUp className="w-6 h-6 shadow-glow" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-copy-primary uppercase mb-2">Platform insight</h4>
                      <p className="text-xs text-copy-secondary leading-relaxed font-medium">
                        Creative track applications have surged <span className="text-accent-3 font-bold">+42%</span> this cycle. Recommend priority role status for Design verticals.
                      </p>
                    </div>
                 </div>
              </CardContent>
            </Card>
         </div>

      </div>

    </div>
  );
}
