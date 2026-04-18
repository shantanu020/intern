"use client";

import React, { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  MapPin, 
  Clock, 
  Banknote, 
  Filter, 
  Zap,
  ChevronRight,
  Inbox
} from "lucide-react";
import Link from "next/link";
import { useProfileStore } from "@/store/useProfileStore";
import { calculateMatchScore, Role } from "@/lib/matchingEngine";

// Mock Data
const JOBS: Role[] = [
  {
    id: "role-1",
    title: "Frontend Micro-Internship",
    company: "Draftly HQ",
    location: "Remote",
    mode: "Remote",
    type: "Micro",
    duration: "4 weeks",
    stipend: "$2,000",
    requiredSkills: ["React", "TailwindCSS", "Next.js"]
  },
  {
    id: "role-2",
    title: "Product Design Sprint",
    company: "Linear Systems",
    location: "San Francisco",
    mode: "Hybrid",
    type: "Short-term",
    duration: "8 weeks",
    stipend: "$4,500",
    requiredSkills: ["Figma", "UI/UX", "Prototyping"]
  },
  {
    id: "role-3",
    title: "Backend GraphQL API",
    company: "Prisma Cloud",
    location: "Global",
    mode: "Remote",
    type: "Micro",
    duration: "2 weeks",
    stipend: "$1,200",
    requiredSkills: ["Node.js", "GraphQL", "PostgreSQL"]
  },
  {
    id: "role-4",
    title: "AI Researcher Assistant",
    company: "Open Labs",
    location: "Remote",
    mode: "Remote",
    type: "Full-term",
    duration: "12 weeks",
    stipend: "$6,000",
    requiredSkills: ["Python", "PyTorch", "NLP"]
  }
];

export default function BrowsePage() {
  const profile = useProfileStore();
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedEngagements, setSelectedEngagements] = useState<string[]>([]);

  const filteredAndRankedJobs = useMemo(() => {
    return JOBS.filter(job => {
      // 1. Search filter
      const searchMatch = !searchQuery || 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      
      if (!searchMatch) return false;

      // 2. Category filter (Map skills to broad categories)
      if (selectedCategory) {
        const categoryMap: Record<string, string[]> = {
          "Frontend": ["React", "TailwindCSS", "Next.js", "Vue", "Angular"],
          "Backend": ["Node.js", "GraphQL", "PostgreSQL", "Python", "Go"],
          "AI/ML": ["Python", "PyTorch", "NLP", "TensorFlow"],
          "Design": ["Figma", "UI/UX", "Prototyping"]
        };
        const categorySkills = categoryMap[selectedCategory] || [];
        const hasSkillInCategory = job.requiredSkills.some(s => categorySkills.includes(s));
        if (!hasSkillInCategory) return false;
      }

      // 3. Engagement Type filter
      if (selectedEngagements.length > 0) {
        const typeMap: Record<string, string> = {
          "Micro-Internship": "Micro",
          "Seasonal Sprint": "Short-term",
          "Full Quarter": "Full-term"
        };
        const activeTypes = selectedEngagements.map(e => typeMap[e]);
        if (!activeTypes.includes(job.type)) return false;
      }

      return true;
    }).map(job => ({
      ...job,
      match: calculateMatchScore(profile, job)
    })).sort((a, b) => b.match.score - a.match.score);
  }, [profile, searchQuery, selectedCategory, selectedEngagements]);

  const toggleEngagement = (type: string) => {
    setSelectedEngagements(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="min-h-screen bg-background text-zinc-400 pt-28 pb-20 selection:bg-white selection:text-black">
      <div className="container mx-auto max-w-[1240px] px-8">
        
        {/* Editorial Header */}
        <div className="border-b border-zinc-900 pb-16 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white uppercase tracking-tighter mb-4">
                Marketplace <span className="text-zinc-700">/</span> {filteredAndRankedJobs.length.toString().padStart(2, '0')}
              </h1>
              <p className="max-w-md text-sm font-medium leading-relaxed">
                Filter by technical signal, not keywords. Our logic engine matches your delivery history with active project sprints.
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-white transition-colors" />
                <input 
                  type="text" 
                  placeholder="SEARCH REPO OR STACK..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-zinc-900/50 border border-zinc-800 rounded-sm h-12 pl-12 pr-6 text-[10px] uppercase font-bold tracking-widest text-white focus:outline-none focus:border-zinc-500 w-[300px] transition-all"
                />
              </div>
              <Button 
                variant="secondary" 
                className="h-12 w-12 p-0 rounded-sm"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(null);
                  setSelectedEngagements([]);
                }}
              >
                <Filter className="w-4 h-4 shadow-glow" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Sidebar Filters */}
          <aside className="lg:col-span-3 space-y-12">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-white mb-6">Stack Layers</h3>
              <div className="flex flex-wrap gap-2">
                {["Frontend", "Backend", "AI/ML", "Design"].map(cat => (
                  <Badge 
                    key={cat} 
                    variant={selectedCategory === cat ? "default" : "secondary"} 
                    className="cursor-pointer transition-all hover:border-white"
                    onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-white mb-6">Engagement Model</h3>
              <div className="space-y-4">
                {["Micro-Internship", "Seasonal Sprint", "Full Quarter"].map(type => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group">
                    <div 
                      className={`w-4 h-4 rounded-sm border border-zinc-800 flex items-center justify-center transition-colors ${selectedEngagements.includes(type) ? 'bg-white border-white' : 'bg-zinc-950 group-hover:border-zinc-600'}`}
                      onClick={() => toggleEngagement(type)}
                    >
                      {selectedEngagements.includes(type) && <div className="w-1.5 h-1.5 bg-black rounded-sm" />}
                    </div>
                    <span 
                      className={`text-[11px] font-bold uppercase tracking-wider transition-colors ${selectedEngagements.includes(type) ? 'text-white' : 'group-hover:text-white'}`}
                      onClick={() => toggleEngagement(type)}
                    >
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Job Feed */}
          <div className="lg:col-span-9 space-y-4">
            {filteredAndRankedJobs.length > 0 ? (
              filteredAndRankedJobs.map((job) => (
                <Link key={job.id} href={`/role/${job.id}`}>
                  <Card className="group mb-4 hover:border-zinc-600 cursor-pointer overflow-hidden border-zinc-900 bg-zinc-950/20">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row md:items-stretch h-full">
                        
                        {/* Company Identifier */}
                        <div className="p-8 md:w-56 border-b md:border-b-0 md:border-r border-zinc-900 flex flex-col justify-between bg-zinc-950/40">
                          <div className="flex items-center gap-3 mb-6">
                             <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-center font-bold text-white text-xs">
                               {job.company.substring(0,2).toUpperCase()}
                             </div>
                             <Link 
                               href={`/company/${job.company.toLowerCase().replace(' ', '-')}`}
                               className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 hover:text-white transition-colors"
                             >
                               {job.company}
                             </Link>
                          </div>
                          <Badge variant="success" className="text-[9px] w-fit">
                            <Zap className="w-2 h-2 mr-1.5 fill-current" /> {job.match.score}% MATCH
                          </Badge>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 p-8 flex flex-col justify-between">
                           <div>
                              <h3 className="text-2xl font-bold text-white uppercase tracking-tighter mb-4 group-hover:text-glow transition-all">{job.title}</h3>
                              <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-8">
                                 <span className="flex items-center gap-2"><MapPin className="w-3 h-3" /> {job.location}</span>
                                 <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> {job.duration}</span>
                                 <span className="flex items-center gap-2 text-white"><Banknote className="w-3 h-3" /> {job.stipend}</span>
                              </div>
                           </div>
                           
                           <div className="flex items-center justify-between">
                              <div className="flex gap-1.5">
                                 {job.requiredSkills.map(skill => (
                                   <span key={skill} className="px-2 py-0.5 border border-zinc-900 rounded-sm text-[9px] font-bold tracking-widest bg-zinc-950">
                                     {skill}
                                   </span>
                                 ))}
                              </div>
                              <Button variant="ghost" size="sm" className="h-8 text-[9px] uppercase tracking-[0.2em] gap-2 p-0 group/btn">
                                View Signal <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                              </Button>
                           </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-40 border border-dashed border-zinc-900 rounded-sm bg-zinc-950/10">
                 <Inbox className="w-12 h-12 text-zinc-800 mb-6" strokeWidth={1} />
                 <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-2">No Matching Signals</h3>
                 <p className="text-[10px] text-zinc-600 uppercase tracking-widest">Adjust your filters to expand the search results.</p>
                 <Button 
                   variant="ghost" 
                   size="sm" 
                   className="mt-8 text-[9px] uppercase tracking-widest text-zinc-400 hover:text-white"
                   onClick={() => {
                     setSearchQuery("");
                     setSelectedCategory(null);
                     setSelectedEngagements([]);
                   }}
                 >
                   Reset All Filters
                 </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
