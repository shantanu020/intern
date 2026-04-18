"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApplicationStore } from "@/store/useApplicationStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { CheckCircle2, Building, ChevronLeft, ChevronRight, Wand2, PartyPopper } from "lucide-react";

export default function ApplyPage({ params }: { params: { roleId: string } }) {
  const [step, setStep] = useState(1);
  const { data, updateData, resetDoc } = useApplicationStore();
  const [mounted, setMounted] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="p-8">Loading application...</div>;

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-4 animate-in fade-in zoom-in duration-500">
         <div className="w-24 h-24 bg-accent/20 text-accent rounded-full flex items-center justify-center mb-6">
            <PartyPopper className="w-12 h-12" />
         </div>
         <h1 className="text-3xl font-display font-bold text-copy-primary mb-3">Application Submitted!</h1>
         <p className="text-copy-secondary max-w-sm mb-8">Your application for Frontend Micro-Internship at Draftly HQ has been securely encrypted and delivered. You can track your status in your dashboard.</p>
         <Link href="/dashboard">
           <Button size="lg">Go to Dashboard</Button>
         </Link>
      </div>
    );
  }

  const handleNext = () => setStep(s => Math.min(s + 1, 4));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));
  const submitApplication = () => {
    setIsSuccess(true);
    resetDoc();
  };

  const handleAI = () => {
    setIsDrafting(true);
    setTimeout(() => {
      updateData({ 
        coverLetter: "I'm genuinely excited to apply for the Frontend Micro-Internship at Draftly HQ. Having spent the last two years deep-diving into React and TailwindCSS ecosystems, I believe my technical skillset aligns beautifully with your requirement to rebuild the onboarding flow..." 
      });
      setIsDrafting(false);
    }, 1500);
  };

  const isStep4Valid = data.agreedToAccuracy && data.agreedToCommitment && data.agreedToToS;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background-secondary text-copy-primary font-sans">
      
      {/* Left Context Panel */}
      <div className="w-full md:w-[320px] lg:w-[400px] bg-background border-r border-edge p-8 flex flex-col md:sticky md:top-0 md:h-screen">
        <Link href={`/role/${params.roleId}`} className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-copy-muted hover:text-copy-primary transition-colors mb-12">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back
        </Link>
        
        <div className="mb-8">
           <div className="w-12 h-12 rounded bg-white/5 border border-edge mb-4 flex items-center justify-center font-bold text-copy-primary">
             DR
           </div>
           <h2 className="text-2xl font-display font-bold leading-tight mb-2">Frontend Micro-Internship</h2>
           <p className="text-sm text-copy-secondary flex items-center gap-1"><Building className="w-4 h-4" /> Draftly HQ</p>
        </div>

        <div className="space-y-4 pt-8 border-t border-edge flex-1">
           <div className="flex items-center gap-3">
             <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-accent text-white' : 'bg-white/5 text-copy-muted border border-edge'}`}>1</div>
             <span className={`text-sm font-medium ${step >= 1 ? 'text-copy-primary' : 'text-copy-muted'}`}>Logistics</span>
           </div>
           <div className="flex items-center gap-3">
             <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-accent text-white' : 'bg-white/5 text-copy-muted border border-edge'}`}>2</div>
             <span className={`text-sm font-medium ${step >= 2 ? 'text-copy-primary' : 'text-copy-muted'}`}>Proof of Work</span>
           </div>
           <div className="flex items-center gap-3">
             <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 3 ? 'bg-accent text-white' : 'bg-white/5 text-copy-muted border border-edge'}`}>3</div>
             <span className={`text-sm font-medium ${step >= 3 ? 'text-copy-primary' : 'text-copy-muted'}`}>Cover Letter</span>
           </div>
           <div className="flex items-center gap-3">
             <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 4 ? 'bg-accent text-white' : 'bg-white/5 text-copy-muted border border-edge'}`}>4</div>
             <span className={`text-sm font-medium ${step >= 4 ? 'text-copy-primary' : 'text-copy-muted'}`}>Review & Submit</span>
           </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex flex-col md:h-screen md:overflow-y-auto">
        <div className="flex-1 max-w-2xl mx-auto w-full p-8 md:p-12 pb-32">
          
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <h1 className="text-3xl font-display font-bold">Time & Logistics</h1>
              <p className="text-copy-secondary">Let's make sure your availability matches their sprint schedule.</p>
              
              <div className="p-4 rounded-xl border border-edge bg-white/5 space-y-4">
                 <h3 className="font-semibold text-sm">Preferred Start Date</h3>
                 <div className="grid grid-cols-2 gap-3">
                   <label className={`cursor-pointer p-3 border rounded-lg hover:border-accent transition-colors flex items-center gap-2 ${data.startDate === 'Immediate' ? 'border-accent bg-accent/10' : 'border-edge'}`}>
                     <input type="radio" name="start" value="Immediate" className="hidden" checked={data.startDate === 'Immediate'} onChange={() => updateData({startDate: 'Immediate'})}/>
                     <span className="text-sm font-medium text-copy-primary">Immediate</span>
                   </label>
                   <label className={`cursor-pointer p-3 border rounded-lg hover:border-accent transition-colors flex items-center gap-2 ${data.startDate === 'Next Week' ? 'border-accent bg-accent/10' : 'border-edge'}`}>
                     <input type="radio" name="start" value="Next Week" className="hidden" checked={data.startDate === 'Next Week'} onChange={() => updateData({startDate: 'Next Week'})}/>
                     <span className="text-sm font-medium text-copy-primary">Next Week</span>
                   </label>
                 </div>
              </div>

              <div className="p-4 rounded-xl border border-edge bg-white/5 space-y-4">
                 <div className="flex justify-between items-end mb-2">
                   <h3 className="font-semibold text-sm">Hours per week</h3>
                   <span className="text-accent font-mono font-bold">{data.hoursPerWeek} hrs</span>
                 </div>
                 <Slider 
                   min={5} max={60} step={5} 
                   value={data.hoursPerWeek} 
                   onChange={(e) => updateData({hoursPerWeek: Number(e.target.value)})} 
                 />
                 <div className="flex justify-between text-xs font-medium text-copy-muted mt-2">
                   <span>Part Time</span><span>Full Time</span>
                 </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <h1 className="text-3xl font-display font-bold">Proof of Work</h1>
              <p className="text-copy-secondary">Draftly wants to see what you've actually built.</p>
              
              <Input 
                label="Primary Portfolio URL" 
                placeholder="https://yourdomain.com"
                value={data.portfolioUrl}
                onChange={(e) => updateData({portfolioUrl: e.target.value})}
              />

              <div className="mt-8 border-t border-edge pt-8">
                <h3 className="font-semibold text-sm mb-4">Direct Case Studies (Optional)</h3>
                <Input 
                  placeholder="https://github.com/..."
                  className="mb-3"
                />
                <Button variant="outline" size="sm" className="w-full border-dashed"> + Add Link </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
               <div className="flex items-start justify-between">
                 <div>
                  <h1 className="text-3xl font-display font-bold">Cover Letter</h1>
                  <p className="text-copy-secondary mt-1">Why are you the right fit for this micro-internship?</p>
                 </div>
                 <Button onClick={handleAI} disabled={isDrafting} className="bg-accent-light/20 text-accent hover:bg-accent-light/30 border border-accent/20">
                   <Wand2 className={`w-4 h-4 mr-2 ${isDrafting ? 'animate-spin' : ''}`} /> 
                   {isDrafting ? 'Drafting...' : 'AI Writer'}
                 </Button>
               </div>
              
              <Textarea 
                label="Why this role?" 
                className="min-h-[250px]"
                maxLength={600}
                value={data.coverLetter}
                onChange={(e) => updateData({coverLetter: e.target.value})}
                placeholder="Draftly is looking for..."
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <h1 className="text-3xl font-display font-bold">Final Review</h1>
              <p className="text-copy-secondary">Please confirm these final commitments before sealing the application.</p>
              
              <div className="p-6 rounded-xl border border-edge bg-white/5 space-y-5">
                 <label className="flex items-start gap-4 cursor-pointer group">
                   <input type="checkbox" className="w-5 h-5 mt-0.5 rounded border-edge bg-transparent checked:bg-accent focus:ring-accent shrink-0" checked={data.agreedToAccuracy} onChange={(e) => updateData({agreedToAccuracy: e.target.checked})} />
                   <div className="text-sm text-copy-secondary group-hover:text-copy-primary transition-colors">I confirm that all information provided in this application and my profile is accurate.</div>
                 </label>
                 
                 <label className="flex items-start gap-4 cursor-pointer group">
                   <input type="checkbox" className="w-5 h-5 mt-0.5 rounded border-edge bg-transparent checked:bg-accent focus:ring-accent shrink-0" checked={data.agreedToCommitment} onChange={(e) => updateData({agreedToCommitment: e.target.checked})} />
                   <div className="text-sm text-copy-secondary group-hover:text-copy-primary transition-colors">I am ready to commit to the requested {data.hoursPerWeek} hours/week for the 4-week duration if accepted.</div>
                 </label>
                 
                 <label className="flex items-start gap-4 cursor-pointer group">
                   <input type="checkbox" className="w-5 h-5 mt-0.5 rounded border-edge bg-transparent checked:bg-accent focus:ring-accent shrink-0" checked={data.agreedToToS} onChange={(e) => updateData({agreedToToS: e.target.checked})} />
                   <div className="text-sm text-copy-secondary group-hover:text-copy-primary transition-colors">I agree to InternConnect's Escrow Terms of Service and Code of Conduct.</div>
                 </label>
              </div>
            </div>
          )}

        </div>

        {/* Floating Bottom Nav */}
        <div className="fixed md:absolute bottom-0 left-0 md:left-[320px] lg:left-[400px] right-0 bg-background/80 backdrop-blur-md border-t border-edge p-4 flex justify-between items-center z-20">
          <Button variant="ghost" onClick={handleBack} disabled={step === 1} className={step === 1 ? 'opacity-0' : 'opacity-100'}>
             <ChevronLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          
          {step < 4 ? (
            <Button onClick={handleNext}>
               Continue <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={submitApplication} disabled={!isStep4Valid} className={!isStep4Valid ? 'opacity-50' : ''}>
               <CheckCircle2 className="w-4 h-4 mr-2" /> Submit Application
            </Button>
          )}
        </div>
        
      </div>
    </div>
  );
}
