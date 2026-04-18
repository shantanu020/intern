"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Building, 
  MapPin, 
  Globe, 
  Users, 
  Zap, 
  CheckCircle2, 
  Star, 
  Award,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Heart,
  Calendar,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Company Data mapping
const COMPANIES_DATA = {
  "draftly-hq": {
    name: "Draftly HQ",
    tagline: "The modern design system infrastructure for high-growth engineering teams.",
    description: "Draftly is building the bridge between design tokens and production code. We help companies like Stripe, Vercel, and Linear maintain visual consistency at scale. Founded in 2023, our mission is to eliminate the 'handoff' by creating a unified source of truth for design and engineering.",
    logo: "DR",
    verified: true,
    hiring: true,
    location: "Global / Remote",
    employees: "12-50",
    founded: "2023",
    website: "https://draftly.design",
    category: "Design Operations",
    stats: {
      rating: 4.9,
      pastInterns: 124,
      responseRate: "98%",
      conversionRate: "42%"
    },
    culture: [
      { t: "Craft-First", d: "We prioritize intentionality and craft in every line of code and pixel.", icon: Sparkles },
      { t: "Radical Autonomy", d: "InternConnect interns aren't just shadows; they own entire product vertical features.", icon: Award },
      { t: "Global Pulse", d: "Our team spans 12 timezones. Asynchronous communication is our superpower.", icon: Globe }
    ],
    perks: ["Competitive Stipend", "M3 MacBook Pro provided", "Direct Mentorship with CTO", "Tokenized Equity Pool", "Remote Office Budget"],
    openRoleIds: ["role-1"]
  },
  "linear-systems": {
    name: "Linear Systems",
    tagline: "The new standard for modern software development.",
    description: "Linear helps teams streamline software projects, sprints, and bug tracking. It's built for high-performance teams who value speed, precision, and focus.",
    logo: "LI",
    verified: true,
    hiring: true,
    location: "San Francisco / Hybrid",
    employees: "51-200",
    founded: "2019",
    website: "https://linear.app",
    category: "Productivity",
    stats: {
      rating: 4.8,
      pastInterns: 86,
      responseRate: "95%",
      conversionRate: "38%"
    },
    culture: [
      { t: "Linear Method", d: "Efficiency through focus and clarity of purpose.", icon: Zap },
      { t: "Design Excellence", d: "Software should be as beautiful as it is functional.", icon: Sparkles }
    ],
    perks: ["Premium Stipend", "Annual Offsites", "Learning Allowance"],
    openRoleIds: ["role-2"]
  }
};

// Mock Roles (duplicated from browse for continuity)
const ALL_ROLES = [
  { id: "role-1", title: "Frontend Micro-Internship", type: "Micro", duration: "4 weeks", stipend: "$2,000", skills: ["React", "Tailwind", "Next.js"] },
  { id: "role-2", title: "Product Design Sprint", type: "Short-term", duration: "8 weeks", stipend: "$4,500", skills: ["Figma", "UI/UX", "Prototyping"] }
];

export default function PublicCompanyProfile({ params }: { params: { slug: string } }) {
  // Normalize slug and find company
  const companyKey = params.slug.toLowerCase();
  const company = COMPANIES_DATA[companyKey as keyof typeof COMPANIES_DATA] || COMPANIES_DATA["draftly-hq"];
  
  const roles = ALL_ROLES.filter(r => company.openRoleIds.includes(r.id));

  return (
    <div className="min-h-screen bg-background text-zinc-400 pt-28 pb-24 selection:bg-white selection:text-black font-sans">
      
      <div className="max-w-[1240px] mx-auto px-8">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row gap-12 items-start justify-between mb-20 border-b border-zinc-900 pb-20">
          <div className="flex items-start gap-10">
            <div className="w-32 h-32 rounded-sm bg-zinc-900 border border-zinc-800 flex items-center justify-center font-display font-bold text-4xl text-white shrink-0 relative overflow-hidden group">
               {company.logo}
               <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <div className="pt-2">
              <div className="flex items-center gap-4 mb-3">
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tighter">
                  {company.name}
                </h1>
                {company.verified && (
                  <div className="bg-accent/10 p-1.5 rounded-full" title="Verified Organization">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                  </div>
                )}
              </div>
              
              <Link href={company.website} target="_blank" className="text-xs font-bold uppercase tracking-widest text-zinc-600 hover:text-white transition-all flex items-center gap-2 mb-8 group">
                {company.website.replace('https://', '')} <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              
              <p className="text-xl text-zinc-300 mb-8 font-medium max-w-xl leading-relaxed">{company.tagline}</p>
              
              <div className="flex flex-wrap gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                 <span className="flex items-center gap-3"><MapPin className="w-4 h-4 text-zinc-700" /> {company.location}</span>
                 <span className="flex items-center gap-3"><Users className="w-4 h-4 text-zinc-700" /> {company.employees} EMPLOYEES</span>
                 <span className="flex items-center gap-3"><Calendar className="w-4 h-4 text-zinc-700" /> EST. {company.founded}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full lg:w-auto">
             <Button size="lg" className="h-16 px-10 text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm group">
               View Open Roles <ChevronRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
             </Button>
             <Button variant="outline" size="lg" className="h-16 px-10 border-zinc-900 bg-zinc-950/20 text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm flex items-center gap-3">
               <Heart className="w-4 h-4" /> Save Company
             </Button>
          </div>
        </div>

        {/* Protocol Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border border-zinc-900 mb-24 rounded-sm overflow-hidden divide-x divide-zinc-900">
          <div className="p-8 bg-zinc-950/20">
            <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-4 flex items-center gap-2 font-bold">
              <Star className="w-3 h-3 text-emerald-500 fill-emerald-500" /> Intern Satisfaction
            </div>
            <div className="text-4xl font-display font-bold text-white tracking-tighter">{company.stats.rating}<span className="text-sm text-zinc-700">/5.0</span></div>
          </div>
          <div className="p-8 bg-zinc-950/20">
            <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-4 flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-3 h-3 text-zinc-600" /> Past Placements
            </div>
            <div className="text-4xl font-display font-bold text-white tracking-tighter">{company.stats.pastInterns}</div>
          </div>
          <div className="p-8 bg-zinc-950/20">
            <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-4 flex items-center gap-2 font-bold">
              <Zap className="w-3 h-3 text-zinc-600" /> Response Rate
            </div>
            <div className="text-4xl font-display font-bold text-white tracking-tighter">{company.stats.responseRate}</div>
          </div>
          <div className="p-8 bg-zinc-950/20">
            <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-4 flex items-center gap-2 font-bold">
              <Award className="w-3 h-3 text-zinc-600" /> Full-time Offers
            </div>
            <div className="text-4xl font-display font-bold text-white tracking-tighter">{company.stats.conversionRate}</div>
          </div>
        </div>

        {/* Content Matrix */}
        <div className="grid lg:grid-cols-12 gap-20 mb-32">
          
          {/* Mission & Culture */}
          <div className="lg:col-span-8 space-y-24">
            <section className="space-y-10">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600 font-bold border-l-2 border-accent pl-6">Mission Parameters</h2>
              <div className="text-lg md:text-xl text-zinc-300 leading-relaxed font-medium space-y-6">
                {company.description.split('. ').map((para, i) => (
                  <p key={i}>{para}.</p>
                ))}
              </div>
            </section>

            <section className="space-y-10">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600 font-bold">Corporate DNA</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {company.culture.map((trait, i) => (
                  <div key={i} className="space-y-4">
                    <div className="w-10 h-10 border border-zinc-800 rounded-sm flex items-center justify-center bg-zinc-950 text-white">
                      <trait.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest underline underline-offset-4 decoration-zinc-800">{trait.t}</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed font-medium">{trait.d}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Perks & Assets Sidecard */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
               <Card className="bg-zinc-950/50 border-zinc-800 rounded-sm shadow-premium overflow-hidden">
                 <div className="p-8 border-b border-zinc-900 bg-zinc-950">
                   <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 font-bold">Operational Perks</h3>
                 </div>
                 <CardContent className="p-8 space-y-6">
                   {company.perks.map((perk, i) => (
                     <div key={i} className="flex items-center gap-4">
                       <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                       <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-300">{perk}</span>
                     </div>
                   ))}
                   <div className="pt-6 border-t border-zinc-900">
                     <p className="text-[10px] text-zinc-600 italic leading-relaxed">Internship benefits are standardized across the organization but may vary slightly by vertical.</p>
                   </div>
                 </CardContent>
               </Card>
               
               {company.hiring && (
                 <div className="p-6 bg-accent/5 border border-accent/20 rounded-sm flex items-center gap-4">
                   <div className="relative">
                     <div className="w-3 h-3 bg-accent rounded-full animate-ping absolute inset-0" />
                     <div className="w-3 h-3 bg-accent rounded-full relative" />
                   </div>
                   <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Active Recruitment Node</span>
                 </div>
               )}
            </div>
          </div>
        </div>

        {/* Live Pipeline (Open Roles) */}
        <div id="roles" className="mb-32 pt-20 border-t border-zinc-900">
           <div className="flex items-center justify-between mb-12">
             <h2 className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-tighter">Live Deployment Slots</h2>
             <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{roles.length} ACTIVE POSITIONS</span>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {roles.map(role => (
               <Link key={role.id} href={`/role/${role.id}`}>
                 <Card className="bg-zinc-950 border-zinc-900 hover:border-zinc-700 transition-all group overflow-hidden cursor-pointer relative">
                   <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
                   <CardContent className="p-10">
                     <div className="flex justify-between items-start mb-10">
                       <h3 className="text-2xl font-bold font-display text-white uppercase tracking-tight group-hover:text-glow transition-all">{role.title}</h3>
                       <Badge variant="outline" className="bg-white/5 border-zinc-800 text-zinc-500 font-bold uppercase tracking-[0.2em] text-[9px]">{role.type}</Badge>
                     </div>
                     <div className="grid grid-cols-2 gap-8 mb-10 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                       <span className="flex flex-col gap-1.5"><span className="text-zinc-800">Tempo</span><span className="text-zinc-400">{role.duration}</span></span>
                       <span className="flex flex-col gap-1.5"><span className="text-zinc-800">Economics</span><span className="text-white">{role.stipend}</span></span>
                     </div>
                     <div className="flex items-center justify-between">
                       <div className="flex gap-2">
                         {role.skills.slice(0,3).map(skill => (
                           <span key={skill} className="text-[8px] font-bold text-zinc-600 border border-zinc-900 px-2 py-0.5 rounded-sm uppercase tracking-widest bg-zinc-950">{skill}</span>
                         ))}
                       </div>
                       <Button variant="ghost" className="h-8 p-0 text-[10px] font-bold uppercase tracking-widest group/btn">
                         Initiate <ArrowRight className="w-3 h-3 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                       </Button>
                     </div>
                   </CardContent>
                 </Card>
               </Link>
             ))}
           </div>
        </div>

        {/* Verified Technical Alumni */}
        <div className="mb-32">
           <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600 font-bold mb-10">Previous Technical Alumni</h2>
           <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-4">
             {["AS", "SR", "RS", "PV", "NK", "JM", "TW", "HB", "KR", "ML", "ZA", "OP"].map((initials, i) => (
                <div key={i} className="aspect-square bg-zinc-950 border border-zinc-900 flex items-center justify-center font-bold text-zinc-800 text-xs rounded-sm hover:border-zinc-700 hover:text-zinc-500 transition-colors cursor-pointer grayscale hover:grayscale-0">
                  {initials}
                </div>
             ))}
           </div>
        </div>

      </div>
    </div>
  );
}
