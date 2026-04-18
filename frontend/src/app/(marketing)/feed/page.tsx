"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Building2, 
  CheckCircle2, 
  Trophy, 
  TrendingUp, 
  Search,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const ACTIVITIES = [
  {
    id: "A1",
    type: "ROLE_POSTED",
    actor: "Stripe",
    action: "posted a new protocol",
    target: "Level 4 Infrastructure Engineering",
    time: "4m ago",
    icon: Building2,
    color: "text-accent",
    bg: "bg-accent/10"
  },
  {
    id: "A2",
    type: "MILESTONE_VERIFIED",
    actor: "Aryan Sharma",
    action: "successfully achieved milestone",
    target: "Onboarding Flow Optimization",
    time: "12m ago",
    icon: CheckCircle2,
    color: "text-status-green",
    bg: "bg-status-green/10"
  },
  {
    id: "A3",
    type: "SKILL_ENDORSEMENT",
    actor: "Sneha R.",
    action: "endorsed skills for",
    target: "Portfolio Architecture",
    time: "45m ago",
    icon: Sparkles,
    color: "text-status-amber",
    bg: "bg-status-amber/10"
  },
  {
    id: "A4",
    type: "PLATFORM_AWARD",
    actor: "InternConnect",
    action: "awarded peak signal to",
    target: "Rohan Miller",
    time: "2h ago",
    icon: Trophy,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  }
];

export default function GlobalFeedPage() {
  return (
    <div className="min-h-screen bg-background text-zinc-400 pb-24 selection:bg-white selection:text-black">
      
      <div className="max-w-[800px] mx-auto px-8">
        
        {/* Feed Header */}
        <div className="flex items-end justify-between mb-16 border-b border-zinc-900 pb-12">
           <div>
              <h1 className="text-4xl font-display font-bold text-white uppercase tracking-tighter mb-2">Platform Protocol</h1>
              <p className="text-sm font-medium text-zinc-500">Real-time telemetry from the InternConnect network.</p>
           </div>
           <Button variant="outline" className="border-zinc-800 text-[10px] uppercase font-bold tracking-widest gap-2">
              <Search className="w-3.5 h-3.5" /> Filter Signal
           </Button>
        </div>

        {/* Global Statistics */}
        <div className="grid grid-cols-3 gap-6 mb-16">
           <div className="bg-zinc-950/20 border border-zinc-900 p-6 rounded-sm">
              <div className="text-2xl font-display font-bold text-white">142</div>
              <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-1">Live Roles</div>
           </div>
           <div className="bg-zinc-950/20 border border-zinc-900 p-6 rounded-sm">
              <div className="text-2xl font-display font-bold text-white">89%</div>
              <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-1">Success Rate</div>
           </div>
           <div className="bg-zinc-950/20 border border-zinc-900 p-6 rounded-sm">
              <div className="text-2xl font-display font-bold text-white">$12.4k</div>
              <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-1">In Escrow</div>
           </div>
        </div>

        {/* Activity List */}
        <div className="space-y-4">
           {ACTIVITIES.map((activity, i) => (
             <Card key={activity.id} className={cn(
               "bg-zinc-950/20 border-zinc-900 hover:border-zinc-700 transition-all group rounded-sm overflow-hidden",
               i === 0 && "border-accent/30 bg-accent/[0.02]"
             )}>
                <CardContent className="p-0">
                   <div className="flex items-center gap-6 p-6">
                      <div className={cn("w-12 h-12 shrink-0 rounded-sm flex items-center justify-center transition-transform group-hover:scale-105", activity.bg)}>
                         <activity.icon className={cn("w-6 h-6", activity.color)} />
                      </div>
                      
                      <div className="flex-1">
                         <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{activity.time}</span>
                            {i === 0 && <Badge className="bg-accent text-black font-black text-[9px] uppercase tracking-widest">Live</Badge>}
                         </div>
                         <div className="text-base text-zinc-300 font-medium">
                            <span className="text-white font-bold">{activity.actor}</span>{" "}
                            <span className="text-zinc-500">{activity.action}</span>{" "}
                            <span className="text-white font-bold underline decoration-zinc-800 underline-offset-4 cursor-pointer hover:text-accent transition-colors">{activity.target}</span>
                         </div>
                      </div>

                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                         <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white">
                            <ArrowRight className="w-5 h-5" />
                         </Button>
                      </div>
                   </div>
                   
                   {/* Decorative Signal Line */}
                   <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
                </CardContent>
             </Card>
           ))}
        </div>

        {/* Load More Trigger */}
        <div className="mt-12 flex justify-center">
           <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 hover:text-white">
              End of Buffer • Syncing Database
           </Button>
        </div>

      </div>
    </div>
  );
}
