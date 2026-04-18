"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  Eye, 
  Zap, 
  CheckCircle2, 
  ChevronRight,
  TrendingUp,
  Clock,
  PlayCircle,
  Building
} from "lucide-react";

const STATS = [
  { label: "Active Applications", value: "3", icon: Briefcase, color: "text-accent" },
  { label: "Profile Views", value: "24", icon: Eye, color: "text-accent-2" },
  { label: "AI Matches", value: "12", icon: Zap, color: "text-accent-3" },
  { label: "Base Profile Score", value: "88%", icon: TrendingUp, color: "text-status-amber" },
];

const APPLICATIONS = [
  { company: "Draftly HQ", role: "Frontend Micro-Internship", status: "Under Review", date: "Applied 2 days ago", color: "amber" },
  { company: "Stripe", role: "Growth Analytics Intern", status: "Applied", date: "Applied 4 days ago", color: "indigo" },
  { company: "Vercel", role: "Design Intern", status: "Rejected", date: "Updated 1 week ago", color: "red" },
];

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-background text-copy-primary pt-24 pb-20">
      <div className="max-w-[1160px] mx-auto px-6">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold mb-1">Welcome back, Aryan!</h1>
            <p className="text-copy-secondary">You have 3 active applications. Keep building your portfolio.</p>
          </div>
          <Link href="/browse">
            <Button className="shrink-0"><Zap className="w-4 h-4 mr-2" /> Find New Matches</Button>
          </Link>
        </div>

        {/* Profile Banner */}
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-5 mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center font-bold text-accent shrink-0">
              88%
            </div>
            <div>
              <h3 className="font-semibold text-accent leading-tight">Your profile is almost complete</h3>
              <p className="text-xs text-copy-secondary mt-0.5">Missing: 1 more case study and GitHub connection.</p>
            </div>
          </div>
          <Button variant="outline" className="border-accent/40 text-accent hover:bg-accent/20 shrink-0">Complete Profile</Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {STATS.map((stat, i) => (
            <Card key={i} className="bg-background border-edge hover:border-edge-hover transition-colors">
              <CardContent className="p-5 flex items-start justify-between">
                <div>
                  <div className="text-2xl font-display font-bold leading-none mb-2">{stat.value}</div>
                  <div className="text-sm font-medium text-copy-secondary">{stat.label}</div>
                </div>
                <div className={`p-2 rounded-md bg-white/5 ${stat.color}`}>
                  <stat.icon className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Applications Widget */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-bold">My Applications</h2>
              <Link href="/applications" className="text-sm text-accent font-medium hover:text-accent-light transition-colors">View All</Link>
            </div>
            
            <Card className="bg-background-secondary border-edge">
              <div className="divide-y divide-edge">
                {APPLICATIONS.map((app, i) => (
                  <div key={i} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/5 transition-colors group cursor-pointer">
                     <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded bg-background border border-edge flex items-center justify-center font-bold text-copy-primary shrink-0">
                         {app.company.substring(0,2).toUpperCase()}
                       </div>
                       <div>
                         <h4 className="font-semibold text-[1.05rem] group-hover:text-accent transition-colors leading-tight mb-1">{app.role}</h4>
                         <div className="text-sm text-copy-secondary">{app.company}</div>
                       </div>
                     </div>
                     <div className="flex items-center justify-between md:flex-col md:items-end gap-2 shrink-0">
                       <Badge variant={app.color === 'amber' ? 'warning' : app.color === 'indigo' ? 'default' : 'danger'} className="px-2 py-0.5 whitespace-nowrap">
                         {app.color === 'amber' ? <Clock className="w-3 h-3 mr-1" /> : null}
                         {app.status}
                       </Badge>
                       <span className="text-xs text-copy-muted">{app.date}</span>
                     </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column: Secondary Widgets */}
          <div className="space-y-6">
            
            <Card className="bg-gradient-to-br from-accent/10 to-transparent border-accent/20">
              <CardContent className="p-6">
                <div className="w-10 h-10 bg-accent text-white rounded-lg flex items-center justify-center mb-4 shadow-glow">
                  <PlayCircle className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg mb-2">Resume Review Session</h3>
                <p className="text-sm text-copy-secondary mb-4">Your mentor session with Sarah is scheduled for tomorrow.</p>
                <Button className="w-full">Join Meeting</Button>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <h2 className="text-lg font-display font-bold">Top Match</h2>
              <Link href="/role/demo">
                <Card className="bg-background border-edge hover:border-accent/50 transition-colors cursor-pointer group">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                       <Badge variant="success" className="px-2 font-semibold text-xs py-0.5"><Zap className="w-3 h-3 mr-1" /> 98% Match</Badge>
                       <ChevronRight className="w-4 h-4 text-copy-muted group-hover:text-accent transition-colors" />
                    </div>
                    <h4 className="font-semibold text-[1.05rem] mb-1 leading-tight">UI/UX Designer</h4>
                    <p className="text-sm text-copy-secondary flex items-center gap-1"><Building className="w-3 h-3" /> Linear</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
