"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Building, 
  MapPin, 
  Clock, 
  Zap, 
  CheckCircle2, 
  PlusCircle, 
  Briefcase, 
  Banknote,
  Users,
  ChevronLeft,
  Share2,
  MessageSquare
} from "lucide-react";
import { useProfileStore } from "@/store/useProfileStore";
import { calculateMatchScore, Role } from "@/lib/matchingEngine";

// Using the same mock data as Browse for consistency
const JOBS: Role[] = [
  { 
    id: 'role-1', 
    title: "Frontend Micro-Internship", 
    company: "Draftly HQ", 
    location: "Remote", 
    mode: "Remote",
    type: "Micro", 
    duration: "4 weeks", 
    stipend: "$2,000", 
    requiredSkills: ["React", "Tailwind", "Next.js"] 
  },
  { 
    id: 'role-2', 
    title: "Product Design Trainee", 
    company: "Superhuman", 
    location: "Hybrid", 
    mode: "Hybrid",
    type: "Short-term", 
    duration: "12 weeks", 
    stipend: "Unpaid", 
    requiredSkills: ["Figma", "Prototyping", "UX"] 
  },
  { 
    id: 'role-3', 
    title: "Growth Analytics Intern", 
    company: "Stripe", 
    location: "Remote", 
    mode: "Remote",
    type: "Full-term", 
    duration: "6 months", 
    stipend: "$5,000", 
    requiredSkills: ["SQL", "Growth", "Data Analysis"] 
  },
  { 
    id: 'role-4', 
    title: "Software Engineering Intern", 
    company: "Vercel", 
    location: "San Francisco", 
    mode: "On-site",
    type: "Short-term", 
    duration: "3 months", 
    stipend: "$8,000", 
    requiredSkills: ["Next.js", "Turbo", "React", "TypeScript"] 
  },
];

export default function RoleDetailPage({ params }: { params: { slug: string } }) {
  const profile = useProfileStore();
  
  // Find role based on slug (using ID for mock simplicity)
  const role = useMemo(() => {
    return JOBS.find(j => j.id === params.slug) || JOBS[0];
  }, [params.slug]);

  const matchResult = useMemo(() => {
    return calculateMatchScore(profile, role);
  }, [profile, role]);
  
  return (
    <div className="min-h-screen bg-background text-zinc-400 pt-28 pb-24 selection:bg-white selection:text-black">
      
      <div className="max-w-[1240px] mx-auto px-8">
        
        {/* Editorial Navigation */}
        <Link href="/browse" className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 hover:text-white transition-colors mb-12 group">
          <ChevronLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Marketplace
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          
          {/* Main Content Column */}
          <div className="flex-1 space-y-20">
            
            {/* Architectural Header Area */}
            <div className="border-b border-zinc-900 pb-16">
              <div className="flex items-center gap-8 mb-10">
                <div className="w-24 h-24 rounded-sm bg-zinc-900 border border-zinc-800 flex items-center justify-center font-display font-bold text-2xl text-white shrink-0">
                  {role.company.substring(0,2).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-display font-bold leading-tight mb-4 text-white uppercase tracking-tighter">{role.title}</h1>
                  <div className="flex items-center gap-6 text-[10px] uppercase font-bold tracking-widest text-zinc-500">
                    <span className="flex items-center gap-2">
                       <Building className="w-3.5 h-3.5 text-zinc-700" /> 
                       <Link href={`/company/${role.company.toLowerCase().replace(' ', '-')}`} className="hover:text-white underline underline-offset-4 decoration-zinc-800 transition-colors">
                         {role.company}
                       </Link>
                    </span>
                    <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-zinc-700" /> {role.location}</span>
                  </div>
                </div>
              </div>

              {/* Details Strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                 <div className="space-y-1">
                   <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Model</div>
                   <div className="text-xs font-bold text-zinc-300 uppercase">{role.type}-INTERNSHIP</div>
                 </div>
                 <div className="space-y-1">
                   <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Temporal</div>
                   <div className="text-xs font-bold text-zinc-300 uppercase">{role.duration}</div>
                 </div>
                 <div className="space-y-1">
                   <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Economics</div>
                   <div className="text-xs font-bold text-white uppercase">{role.stipend}</div>
                 </div>
                 <div className="space-y-1">
                   <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Work style</div>
                   <div className="text-xs font-bold text-zinc-300 uppercase">{role.mode}</div>
                 </div>
              </div>
            </div>

            {/* AI Protocol Banner */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-sm p-10 relative overflow-hidden group">
              <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
              <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                <div className="w-24 h-24 rounded-full border border-white/20 flex flex-col items-center justify-center bg-zinc-900 shrink-0 shadow-premium">
                  <span className="font-display font-bold text-3xl text-white leading-none tracking-tighter">{matchResult.score}<span className="text-xs">%</span></span>
                </div>
                <div className="flex-1 w-full">
                  <h3 className="font-display font-bold text-xl text-white flex items-center gap-3 uppercase tracking-tight mb-2">
                    <Zap className="w-5 h-5 text-white fill-white" /> {matchResult.score >= 90 ? 'OPTIMAL' : matchResult.score >= 75 ? 'HIGH SIGNAL' : 'REACH'} MATCH
                  </h3>
                  <p className="text-sm text-zinc-400 font-medium max-w-lg mb-8 leading-relaxed">
                    {matchResult.score >= 90 
                      ? "Current technical profile exhibits deep alignment with this role's specific delivery requirements."
                      : matchResult.score >= 75 
                      ? "Strong profile candidate. Identified minor gaps in secondary skill sets. High potential for conversion."
                      : "Candidate profile suggests a career shift or significant upskilling required for this role."}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                    <div className="space-y-2">
                      <div className="flex justify-between text-[9px] font-bold uppercase tracking-[0.2em] mb-1"><span className="text-zinc-500">Stacks</span><span className="text-white">{matchResult.breakdown.skills}%</span></div>
                      <div className="h-0.5 bg-zinc-900 overflow-hidden"><div className="h-full bg-white transition-all duration-1000 ease-out" style={{width: `${matchResult.breakdown.skills}%`}} /></div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[9px] font-bold uppercase tracking-[0.2em] mb-1"><span className="text-zinc-500">Temporal</span><span className="text-white">{matchResult.breakdown.logistics}%</span></div>
                      <div className="h-0.5 bg-zinc-900 overflow-hidden"><div className="h-full bg-white transition-all duration-1000 ease-out" style={{width: `${matchResult.breakdown.logistics}%`}} /></div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[9px] font-bold uppercase tracking-[0.2em] mb-1"><span className="text-zinc-500">Logic</span><span className="text-white">{matchResult.breakdown.style}%</span></div>
                      <div className="h-0.5 bg-zinc-900 overflow-hidden"><div className="h-full bg-white transition-all duration-1000 ease-out" style={{width: `${matchResult.breakdown.style}%`}} /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scoped Description */}
            <section className="space-y-8">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600">Project Mission</h2>
              <div className="text-lg text-zinc-300 space-y-6 leading-relaxed font-medium">
                <p>We are seeking a high-signal engineer to lead the architectural overhaul of our core user journey. You will operate with full autonomy within the {role.company} ecosystem.</p>
                <p>This engagement is strictly project-based. Success is measured by the delivery of a production-ready, performant onboarding module within the defined {role.duration} window.</p>
              </div>
            </section>

            {/* Requirements Matrix */}
            <section className="grid md:grid-cols-2 gap-20">
              <div className="space-y-8">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600">Hard Signals</h3>
                <div className="grid grid-cols-1 gap-4">
                  {role.requiredSkills.map(skill => (
                    <div key={skill} className="flex items-center gap-4 py-4 border-b border-zinc-900">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-sm font-bold uppercase tracking-widest text-white">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-8">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600">Secondary Signals</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-4 py-4 border-b border-zinc-900">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                    <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">Next.js App Router Mastery</span>
                  </div>
                  <div className="flex items-center gap-4 py-4 border-b border-zinc-900">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                    <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">Figma / Engineering Bridge</span>
                  </div>
                </div>
              </div>
            </section>
            
          </div>

          {/* Sticky Executive Sidebar */}
          <div className="w-full lg:w-[380px] flex-shrink-0 lg:sticky lg:top-32 space-y-10 pb-10">
            
            <Card className="bg-zinc-950 border-zinc-800 rounded-sm">
              <CardContent className="p-10">
                <div className="mb-10">
                  <div className="text-5xl font-display font-bold text-white tracking-tighter mb-2 leading-none">{role.stipend}</div>
                  <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest leading-none">Escrow Protected Allotment</div>
                </div>

                <div className="space-y-6 mb-10 border-t border-zinc-900 pt-10">
                   <div className="flex items-center justify-between">
                     <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest text-zinc-500">DEADLINE</span>
                     <span className="text-[11px] font-bold text-amber-500 uppercase tracking-widest">12 DAYS REMAINING</span>
                   </div>
                   <div className="flex items-center justify-between">
                     <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest text-zinc-500">SIGNAL COUNT</span>
                     <span className="text-[11px] font-bold text-white uppercase tracking-widest">42 APPLICANTS</span>
                   </div>
                </div>

                <div className="space-y-4">
                  <Link href={`/apply/${role.id}`} className="block">
                    <Button size="lg" className="w-full h-16 text-xs font-bold uppercase tracking-[0.25em] rounded-sm bg-accent text-black hover:bg-zinc-200 shadow-glow-accent">INITIATE APPLICATION</Button>
                  </Link>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" size="lg" className="w-full h-16 text-[10px] font-bold uppercase tracking-widest rounded-sm border-zinc-800 hover:border-white transition-all">ADD TO QUEUE</Button>
                    <Link href="/messages" className="block">
                      <Button variant="outline" size="lg" className="w-full h-16 text-[10px] font-bold uppercase tracking-widest rounded-sm border-zinc-800 hover:border-white transition-all bg-white/5">DIRECT INQUIRY</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hiring Authority Card */}
            <Card className="bg-zinc-900/40 border-zinc-800 rounded-sm">
              <CardContent className="p-8">
                <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600 mb-6 font-bold">Hiring Authority</h3>
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-14 h-14 rounded-sm bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-white text-sm">
                    SK
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white text-xs uppercase tracking-widest">Sarah K.</div>
                    <Link href={`/company/${role.company.toLowerCase().replace(' ', '-')}`} className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-1 underline underline-offset-4 decoration-zinc-800 hover:text-white transition-colors">
                      CTO @ {role.company}
                    </Link>
                  </div>
                </div>
                <Link href="/messages" className="block">
                  <Button variant="outline" className="w-full h-11 text-[9px] font-bold uppercase tracking-widest rounded-sm border-zinc-800 hover:border-accent hover:text-accent transition-all group">
                    <MessageSquare className="w-3.5 h-3.5 mr-2 group-hover:scale-110 transition-transform" /> Message Sarah K.
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <div className="flex items-center justify-center pt-4">
              <button className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-zinc-600 hover:text-white transition-all group">
                <Share2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" /> COPIED LINK PROTOCOL
              </button>
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
  );
}
