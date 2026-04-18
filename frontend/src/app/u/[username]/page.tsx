"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  Zap, 
  ShieldCheck, 
  Linkedin, 
  Github, 
  Mail, 
  Code2,
  ExternalLink,
  Building2 as Building,
  Trophy,
  CheckCircle2,
  Star
} from "lucide-react";
import { useProfileStore } from "@/store/useProfileStore";

export default function StudentPortfolioPage({ params }: { params: { username: string } }) {
  const profile = useProfileStore();
  const userName = profile.name || params.username.charAt(0).toUpperCase() + params.username.slice(1);
  const completionPct = profile.getCompletionPercentage();

  return (
    <div className="min-h-screen bg-background text-zinc-400 pt-28 pb-24 selection:bg-white selection:text-black">
      
      <div className="max-w-[1000px] mx-auto px-8">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row gap-12 items-start justify-between mb-20 border-b border-zinc-900 pb-20">
          
          <div className="flex items-start gap-10">
            <div className="w-32 h-32 rounded-sm bg-zinc-900 border border-zinc-800 flex items-center justify-center font-display font-bold text-4xl text-white shrink-0 relative overflow-hidden">
               {userName.substring(0,2).toUpperCase()}
            </div>
            
            <div className="pt-2">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-2 flex items-center gap-3 text-white uppercase tracking-tighter">
                {userName}
              </h1>
              <Badge variant="outline" className="mb-6 border-zinc-800 text-zinc-500 font-bold tracking-widest uppercase">
                internconnect.io/u/{params.username}
              </Badge>
              <p className="text-xl text-zinc-300 mb-6 font-medium max-w-xl">{profile.headline || "InternConnect Candidate"}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
                 <span className="flex items-center gap-3"><Building className="w-4 h-4 text-zinc-700" /> {profile.education[0]?.institution || "Student"}</span>
                 <span className="flex items-center gap-3"><MapPin className="w-4 h-4 text-zinc-700" /> {profile.location || "Global"}</span>
              </div>
            </div>
          </div>

          {/* Strength Metric */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-sm p-6 flex items-center gap-6 shrink-0 w-full md:w-auto">
             <div className="w-16 h-16 rounded-full border border-zinc-800 flex items-center justify-center font-bold text-white text-xl bg-zinc-900 shadow-sm transition-all">
               {completionPct}%
             </div>
             <div>
                <div className="font-bold text-[10px] tracking-[0.2em] uppercase text-zinc-500 mb-1">Signal Strength</div>
                <div className="text-xs text-zinc-400 font-bold">
                  {completionPct >= 90 ? 'TOP 1% CANDIDATE' : completionPct >= 75 ? 'HIGH SIGNAL' : 'DEVELOPING PROFILE'}
                </div>
             </div>
          </div>
          
        </div>

        {/* Biography & Skills */}
        <div className="grid md:grid-cols-12 gap-20 mb-24">
           <div className="md:col-span-8 space-y-6">
             <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Executive Summary</h3>
             <p className="text-lg text-zinc-300 leading-relaxed whitespace-pre-wrap font-medium">
               {profile.bio || "No biography information provided yet."}
             </p>
           </div>
           <div className="md:col-span-4 space-y-10">
             <div>
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-6">Technical Signal</h3>
               <div className="flex flex-wrap gap-2">
                  {profile.skills.length > 0 ? profile.skills.map(skill => (
                    <Badge key={skill.name} className="px-3 py-1 bg-zinc-900/50 border-zinc-800 font-bold text-zinc-300">{skill.name}</Badge>
                  )) : <span className="text-xs text-zinc-700 italic">No skills added.</span>}
               </div>
             </div>
           </div>
        </div>

        {/* Proof of Work: Internships */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <Trophy className="w-5 h-5 text-zinc-400" />
            <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tighter">Verified Delivery</h2>
          </div>
          
          <div className="bg-zinc-950 border border-zinc-800 rounded-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 bg-white text-black text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-1.5">
              Protocol Record 0x42
            </div>
            
            <div className="p-10">
               <div className="flex flex-col md:flex-row gap-10">
                 
                 <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-center font-bold text-white text-xl shrink-0 relative">
                   DR
                   <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-2 border-zinc-950 flex items-center justify-center">
                     <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                   </div>
                 </div>

                 <div className="flex-1">
                   <div className="flex items-start justify-between mb-6">
                     <div>
                       <h3 className="text-2xl font-bold font-display text-white uppercase tracking-tight">Onboarding Architecture</h3>
                       <p className="text-zinc-500 font-bold text-[10px] tracking-widest mt-1">COMPANY: <span className="text-white">DRAFTLY HQ</span> • MICRO-INTERNSHIP</p>
                     </div>
                     <div className="flex gap-1 mt-1">
                        {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-emerald-500 text-emerald-500" />)}
                     </div>
                   </div>
                   
                   <p className="text-zinc-400 text-lg leading-relaxed italic border-l-2 border-zinc-800 pl-6 py-1">
                     &quot;Outstanding execution. {userName} overhauled our legacy React onboarding flow, cutting bundle size by 40% and introducing architectural clarity. Shipped ahead of schedule.&quot;
                   </p>
                   
                   <div className="mt-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                     <span>Endorsed by</span>
                     <span className="text-white">Sarah K. (CTO)</span>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Proof of Work: Projects */}
        <div className="mb-24">
          <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tighter mb-10">Personal Labs</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {profile.projects.length > 0 ? profile.projects.map(project => (
              <Card key={project.id} className="group hover:border-zinc-600 border-zinc-900 bg-zinc-950/20 rounded-sm">
                 <div className="h-48 w-full bg-zinc-900/50 relative border-b border-zinc-900 flex items-center justify-center">
                    <Code2 className="w-12 h-12 text-zinc-800 group-hover:text-zinc-600 transition-colors" />
                 </div>
                 <CardContent className="p-8">
                   <h3 className="font-bold text-xl mb-3 text-white uppercase tracking-tight group-hover:text-glow transition-all">{project.title}</h3>
                   <p className="text-sm text-zinc-500 line-clamp-2 mb-6 leading-relaxed font-medium">{project.description}</p>
                   <div className="flex items-center gap-2 text-[9px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
                      <ExternalLink className="w-3 h-3 text-zinc-600" /> View Repository
                   </div>
                 </CardContent>
              </Card>
            )) : (
              <div className="col-span-2 py-20 text-center border border-dashed border-zinc-800 rounded-sm">
                 <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest">No lab projects detected.</p>
              </div>
            )}
          </div>
        </div>

        {/* Talent Referrals: Endorsements */}
        <div className="mb-24">
           <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tighter">Social Signal</h2>
              <Button variant="outline" className="text-[10px] uppercase font-bold tracking-widest border-zinc-800 hover:bg-white/5">Request Endorsement</Button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.endorsements.map(endorsement => (
                <Card key={endorsement.id} className="bg-zinc-950 border-zinc-900 rounded-sm hover:border-zinc-700 transition-all">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-bold text-white">
                          {endorsement.avatar}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white uppercase tracking-tight">{endorsement.endorserName}</div>
                          <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{endorsement.endorserRole}</div>
                        </div>
                      </div>
                      <Badge className="bg-emerald-500/10 text-emerald-500 border-none font-black text-[9px] uppercase tracking-widest px-2 py-1">
                        Verified
                      </Badge>
                    </div>

                    <div className="mb-6">
                       <Badge variant="secondary" className="bg-zinc-900 text-zinc-400 border-zinc-800 mb-4 px-2 py-1">
                         Endorsed: {endorsement.skillName}
                       </Badge>
                       <p className="text-sm text-zinc-300 leading-relaxed font-medium italic">
                         &quot;{endorsement.content}&quot;
                       </p>
                    </div>

                    <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.3em]">
                       Authenticated Seal • {endorsement.date}
                    </div>
                  </CardContent>
                </Card>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
}
