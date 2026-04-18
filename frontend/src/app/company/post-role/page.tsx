"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, Clock, Zap, Target, Wand2, Loader2, ChevronRight } from "lucide-react";

export default function PostRole() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    type: "Micro",
    location: "Remote",
    duration: "4 weeks",
    stipend: "",
    description: "",
    skills: "React, Tailwind",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGenerateJD = () => {
    if (!formData.title) return;
    
    setIsGenerating(true);
    
    // Simulated AI Generation Logic
    setTimeout(() => {
      const generatedJD = `## Project Overview
We are looking for a ${formData.title} to join our team for a focused ${formData.duration} sprint. The primary goal is to build a high-fidelity internal tool component using ${formData.skills}.

## Key Responsibilities
- Ownership of the frontend component architecture for the project.
- Implementation of responsive UI patterns using Tailwind CSS.
- Collaboration with our core engineering team to ship code to production.
- Documenting the new component for our internal Design System.

## Success Metrics
- Fully functional component delivered by end of Week 4.
- 100% test coverage for the core business logic.
- Performance audit pass (Lighthouse score > 90).`;

      setFormData(prev => ({ ...prev, description: generatedJD }));
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 h-[calc(100vh-8rem)] pt-6 selection:bg-white selection:text-black">
      
      {/* Form Area */}
      <div className="flex-1 space-y-10 overflow-y-auto pr-4 pb-20 custom-scrollbar">
        <div>
          <h1 className="text-3xl font-display font-bold text-white uppercase tracking-tighter mb-2">Initialize Role</h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">Protocol: RECRUITMENT_V1_DRAFT</p>
        </div>

        <div className="bg-zinc-950 border border-zinc-900 rounded-sm p-10 space-y-8">
          <Input 
            label="ROLE TITLE" 
            name="title"
            placeholder="e.g. FRONTEND_INFRASTRUCTURE"
            value={formData.title}
            onChange={handleChange}
            className="uppercase tracking-widest font-bold text-xs"
          />

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block">Engagement Model</label>
              <select 
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="flex h-12 w-full rounded-sm border border-zinc-900 bg-zinc-900/50 px-4 py-2 text-[10px] uppercase font-bold tracking-widest text-white focus:outline-none focus:border-zinc-500 transition-all appearance-none"
              >
                <option value="Micro">Micro (2-8 wks)</option>
                <option value="Short-term">Short-term (2-3 mo)</option>
                <option value="Full-term">Full-term (4-6 mo)</option>
              </select>
            </div>
            <Input 
              label="LOCATION MODE" 
              name="location"
              placeholder="e.g. REMOTE_GLOBAL"
              value={formData.location}
              onChange={handleChange}
              className="uppercase tracking-widest font-bold text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
             <Input 
              label="TEMPORAL WINDOW" 
              name="duration"
              placeholder="e.g. 4_WEEKS"
              value={formData.duration}
              onChange={handleChange}
              className="uppercase tracking-widest font-bold text-xs"
            />
             <Input 
              label="ECONOMIC ALLOTMENT" 
              name="stipend"
              placeholder="e.g. $2000_TOTAL"
              value={formData.stipend}
              onChange={handleChange}
              className="uppercase tracking-widest font-bold text-xs"
            />
          </div>

          <Input 
            label="TECHNICAL STACK (CSV)" 
            name="skills"
            placeholder="REACT, TAILWIND, NEXTJS"
            value={formData.skills}
            onChange={handleChange}
            className="uppercase tracking-widest font-bold text-xs"
          />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Architectural Mission</label>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 text-[9px] font-bold uppercase tracking-[0.2em] text-white hover:bg-zinc-900 gap-2 border border-zinc-800"
                onClick={handleGenerateJD}
                disabled={isGenerating || !formData.title}
              >
                {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
                {isGenerating ? "GENERATING..." : "AI_ASSIST"}
              </Button>
            </div>
            <Textarea 
              name="description"
              placeholder="DECODE THE MISSION PARAMETERS..."
              value={formData.description}
              onChange={handleChange}
              maxLength={2000}
              className="min-h-[300px] font-mono text-[11px] uppercase tracking-wider leading-relaxed bg-zinc-950 border-zinc-900 text-zinc-300"
            />
          </div>

          <div className="pt-8 border-t border-zinc-900 flex items-center justify-end gap-6">
             <Button variant="ghost" className="uppercase text-[9px] tracking-widest font-bold border border-zinc-900 h-12 px-8">Save Drift</Button>
             <Button variant="primary" className="uppercase text-[9px] tracking-widest font-bold h-12 px-8 rounded-sm">Publish Pipeline</Button>
          </div>
        </div>
      </div>

      {/* Industrial Preview Area */}
      <div className="w-full lg:w-[420px] flex-shrink-0">
        <div className="sticky top-0 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-white" />
            <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.4em]">Signal Preview</h2>
          </div>
          
          <Card className="bg-zinc-950/50 border-zinc-900 pointer-events-none rounded-sm overflow-hidden shadow-premium">
            <CardContent className="p-0">
              <div className="p-8 border-b border-zinc-900 flex justify-between items-center bg-zinc-950">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-center font-bold text-white text-xs">SK</div>
                    <div>
                       <h3 className="font-bold text-white uppercase tracking-tighter text-lg leading-none">
                         {formData.title || "ROLE_TITLE"}
                       </h3>
                       <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest mt-1.5 flex items-center gap-1">
                         <Building className="w-2.5 h-2.5" /> DRAFTLY HQ
                       </p>
                    </div>
                 </div>
                 <Badge variant="success" className="text-[8px]">
                   <Zap className="w-2.5 h-2.5 mr-1.5 fill-current" /> 95% MATCH
                 </Badge>
              </div>

              <div className="p-8 space-y-8">
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <div className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Location</div>
                      <div className="text-[9px] font-bold text-zinc-300 uppercase tracking-wider">{formData.location || "REMOTE_TBD"}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Tempo</div>
                      <div className="text-[9px] font-bold text-zinc-300 uppercase tracking-wider">{formData.duration || "N/A"}</div>
                    </div>
                 </div>

                 <div className="flex flex-wrap gap-1.5">
                    {(formData.skills || "").split(',').map((skill, i) => (
                      <span key={i} className="text-[8px] font-bold text-zinc-500 border border-zinc-900 px-2 py-0.5 rounded-sm uppercase tracking-widest bg-zinc-950">
                        {skill.trim() || "?"}
                      </span>
                    ))}
                 </div>

                 <div className="pt-8 border-t border-zinc-900 flex items-center justify-between">
                    <div className="font-mono text-sm font-bold text-white tracking-widest">
                       {formData.stipend || "$0_TOTAL"}
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 text-[9px] uppercase tracking-widest gap-2 bg-zinc-900/50 border-zinc-900">
                      INITIATE <ChevronRight className="w-3 h-3 text-zinc-600" />
                    </Button>
                 </div>
              </div>
            </CardContent>
          </Card>
          <div className="p-6 border border-zinc-900 bg-zinc-950/20 rounded-sm italic text-[10px] text-zinc-600 leading-relaxed uppercase tracking-widest">
             "Engineers will see a data-driven version of your role. Signal accuracy is prioritized over cosmetic length."
          </div>
        </div>
      </div>

    </div>
  );
}
