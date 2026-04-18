"use client";

import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Users, FileText, CheckCircle2, Zap, Clock, Banknote } from "lucide-react";
import { useProfileStore } from "@/store/useProfileStore";
import { calculateMatchScore, Role } from "@/lib/matchingEngine";

// Mock Data
const STATS = [
  { label: "Total Applicants", value: "248", icon: Users },
  { label: "Shortlisted", value: "42", icon: CheckCircle2 },
  { label: "Avg AI Match", value: "88%", icon: Zap },
  { label: "In Escrow", value: "$4,200", icon: Banknote },
];

const CANDIDATES = [
  { id: 1, name: "Aryan Sharma", role: "Frontend Dev (React)", uni: "IIT Bombay" },
  { id: 2, name: "Priya Patel", role: "Product Design", uni: "NID" },
  { id: 3, name: "Rahul Singh", role: "Growth Marketing", uni: "IIM Ahmedabad" },
  { id: 4, name: "Sneha Reddy", role: "Frontend Dev (React)", uni: "BITS Pilani" }
];

// Reference role for matching in dashboard
const ACTIVE_ROLE: Role = {
  id: 'active-1',
  title: "Frontend Micro-Internship",
  company: "Draftly HQ",
  location: "Remote",
  mode: "Remote",
  type: "Micro",
  duration: "4 weeks",
  stipend: "$2,000",
  requiredSkills: ["React", "TailwindCSS", "Next.js"]
};

export default function CompanyDashboard() {
  const profile = useProfileStore();

  const rankedCandidates = useMemo(() => {
    const userAsCandidate = profile.name ? [{
      id: 99,
      name: profile.name,
      role: profile.headline || "Frontend Candidate",
      uni: profile.education[0]?.institution || "Global University",
      score: calculateMatchScore(profile, ACTIVE_ROLE).score
    }] : [];

    const otherMocks = CANDIDATES.map(c => ({
      ...c,
      score: Math.floor(Math.random() * 20) + 75 
    }));

    return [...userAsCandidate, ...otherMocks].sort((a, b) => b.score - a.score);
  }, [profile]);

  return (
    <div className="space-y-16 animate-in fade-in duration-700 selection:bg-white selection:text-black">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-zinc-900 pb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tighter">Terminal <span className="text-zinc-700">/</span> Pipeline</h1>
          <p className="text-zinc-500 mt-2 font-bold text-[10px] tracking-widest uppercase">Company Identifier: DRAFTLY_HQ_PROD</p>
        </div>
        <div className="flex gap-4">
           <Badge variant="outline" className="h-10 px-4 border-zinc-800 text-zinc-400 font-bold uppercase tracking-widest">March 2026</Badge>
        </div>
      </div>

      {/* Industrial Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-zinc-900 rounded-sm overflow-hidden divide-x divide-zinc-900">
        {STATS.map((stat, i) => (
          <div key={i} className="p-8 bg-zinc-950/20 hover:bg-zinc-900/40 transition-colors">
            <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
               <stat.icon className="w-3 h-3" /> {stat.label}
            </div>
            <div className="text-4xl font-display font-bold text-white tracking-tighter">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        
        {/* Top Matches Protocol */}
        <div className="lg:col-span-8 space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600">High Signal Candidates</h2>
            <button className="text-[10px] text-white hover:underline font-bold uppercase tracking-widest transition-all">Export Report</button>
          </div>
          
          <div className="border border-zinc-900 rounded-sm divide-y divide-zinc-900 overflow-hidden">
            {rankedCandidates.map(match => (
              <div key={match.id} className="p-6 flex items-center justify-between hover:bg-zinc-900/50 transition-all cursor-pointer group">
                <div className="flex items-center gap-8">
                  <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-center font-bold text-white text-xs group-hover:border-zinc-600 transition-colors">
                    {match.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-white uppercase tracking-tight text-lg group-hover:text-glow transition-all">{match.name}</span>
                      {match.id === 99 && <span className="text-[8px] px-1.5 py-0.5 border border-white bg-white text-black font-bold uppercase tracking-widest">Verified</span>}
                    </div>
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">{match.role} <span className="text-zinc-800 mx-2">|</span> {match.uni}</div>
                  </div>
                </div>
                <div className="flex items-center gap-10">
                  <Badge variant={match.score >= 90 ? "default" : "secondary"} className="h-8 px-3 border-zinc-800 font-bold tracking-widest text-[10px]">
                    <Zap className={cn("w-3 h-3 mr-2", match.score >= 90 ? "fill-white" : "text-zinc-700")} /> {match.score}% SIGNAL
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Funnel Infrastructure */}
        <div className="lg:col-span-4 space-y-10">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600">Funnel Infrastructure</h2>
          <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-sm space-y-8">
            {[
              { label: "Inbound Pipeline", val: 248, max: 248, color: "bg-zinc-800" },
              { label: "Signal Screened", val: 180, max: 248, color: "bg-zinc-600" },
              { label: "Reviewed", val: 86, max: 248, color: "bg-zinc-400" },
              { label: "Shortlisted", val: 42, max: 248, color: "bg-zinc-200" },
              { label: "Interview Protocol", val: 14, max: 248, color: "bg-white" },
            ].map(bar => (
              <div key={bar.label} className="space-y-3">
                <div className="flex justify-between text-[9px] font-bold uppercase tracking-[0.2em]">
                  <span className="text-zinc-500">{bar.label}</span>
                  <span className="text-white">{bar.val}</span>
                </div>
                <div className="h-1 w-full bg-zinc-900 overflow-hidden">
                  <div 
                    className={cn("h-full transition-all duration-1000 ease-out", bar.color)}
                    style={{ width: `${(bar.val / bar.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
