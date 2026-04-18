import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, ShieldCheck, Clock, ArrowRight, Sparkles, Building2, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { NetworkGrid } from "@/components/NetworkGrid";

export default function Home() {
  return (
      <main>
        
        {/* Architectural Hero */}
        <section className="relative min-h-[calc(100vh-5rem)] px-8 flex flex-col items-center justify-center text-center overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-zinc-800 bg-zinc-900/50 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-8 relative z-10 transition-transform duration-700 hover:scale-105">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            AI Logic Engine v2.0
          </div>
          
          <h1 className="text-[clamp(3rem,11vw,9rem)] font-display font-bold max-w-[14ch] text-white mb-10 leading-[1.0] tracking-tighter relative z-10 uppercase mx-auto">
            PROVE YOUR WORK.
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 max-w-xl mb-12 leading-relaxed font-medium relative z-10">
            Verified micro-internships for the top 1% of student talent. No black hole applications—just pure signal and proof of delivery.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto relative z-10">
            <Link href="/browse" className="w-full sm:w-auto">
              <Button size="lg" className="w-full h-16 px-12 text-xs uppercase tracking-widest font-bold">
                Browse Roles
              </Button>
            </Link>
            <Link href="/companies" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full h-16 px-12 text-xs uppercase tracking-widest font-bold bg-background/50 backdrop-blur-sm">
                Hire Talent
              </Button>
            </Link>
          </div>
        </section>

        {/* Global Network Matrix (Phase 3 Integration) */}
        <section className="px-8 mb-20 animate-in fade-in duration-1000 slide-in-from-bottom-5">
           <div className="container mx-auto max-w-[1240px]">
              <NetworkGrid />
           </div>
        </section>

        {/* The Network Grid (Logo Cloud) */}
        <section className="py-20 border-t border-b border-zinc-900 bg-zinc-950/20 px-8">
          <div className="container mx-auto max-w-[1240px]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 opacity-40 grayscale group hover:opacity-100 transition-opacity duration-700">
               <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500 mb-4 md:mb-0">Backing Signal:</div>
               <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-20 items-center">
                  <span className="font-display font-bold text-xl tracking-tighter text-white">DRAFTLY</span>
                  <span className="font-display font-bold text-xl tracking-tighter text-white">LINEAR</span>
                  <span className="font-display font-bold text-xl tracking-tighter text-white">PRISMA</span>
                  <span className="font-display font-bold text-xl tracking-tighter text-white">VERCEL</span>
                  <span className="font-display font-bold text-xl tracking-tighter text-white">STRIPE</span>
               </div>
            </div>
          </div>
        </section>

        {/* Minimalist Evidence Grid */}
        <section className="py-32 px-8">
          <div className="container mx-auto max-w-[1240px]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end mb-24">
              <div className="md:col-span-8">
                <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 uppercase tracking-tighter">The Protocol.</h2>
                <p className="text-lg text-zinc-400 max-w-lg">We've eliminated the noise with a three-tier project verification system.</p>
              </div>
              <div className="md:col-span-4 flex md:justify-end">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 border-l border-zinc-800 pl-6 leading-relaxed">
                  DEPLOYED BY TEAMS <br/>AT FIGMA, STRIPE, <br/>AND VERCEL.
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-zinc-800 divide-y md:divide-y-0 md:divide-x divide-zinc-800 rounded-sm overflow-hidden">
              <div className="p-10 bg-zinc-950/20 group hover:bg-zinc-900/40 transition-colors">
                <div className="mb-10 text-white"><Zap strokeWidth={1} size={40} /></div>
                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">Signal Matching</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">Our matching logic bypasses resumes, scoring compatibility across 40+ specific project delivery indicators.</p>
              </div>

              <div className="p-10 bg-zinc-950/20 group hover:bg-zinc-900/40 transition-colors">
                <div className="mb-10 text-white"><Clock strokeWidth={1} size={40} /></div>
                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight text-glow">Rapid Delivery</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">Scoped 2-8 week micro-internships for fast-moving startups. Zero friction, immediate contribution.</p>
              </div>

              <div className="p-10 bg-zinc-950/20 group hover:bg-zinc-900/40 transition-colors">
                <div className="mb-10 text-white"><ShieldCheck strokeWidth={1} size={40} /></div>
                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">Verified Trust</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">Blockchain-recorded endorsements from real managers, proving your ability to ship in high-stakes environments.</p>
              </div>
            </div>
          </div>
        </section>

        {/* The Process Protocol (Step-by-Step) */}
        <section className="py-40 px-8 border-t border-zinc-900">
           <div className="container mx-auto max-w-[1240px]">
              <div className="max-w-3xl mb-32">
                 <h2 className="text-4xl md:text-7xl font-display font-bold text-white uppercase tracking-tighter leading-none mb-10">THE OPS <br/>CYCLE.</h2>
                 <p className="text-xl text-zinc-400 leading-relaxed">Four phases of verified delivery. From initial sync to recorded protocol.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                 {[
                   { id: "01", title: "Index", desc: "Our engine crawls your technical repositories and recorded project delivery history." },
                   { id: "02", title: "Logical Match", desc: "Companies define specific project mission parameters; our engine scores your signal." },
                   { id: "03", title: "Micro-Sprint", desc: "Execute a focused 4-week engagement with a direct line to startup founders." },
                   { id: "04", title: "Commit Profile", desc: "Success is recorded on your permanent InternConnect ledger as verified proof." },
                 ].map((step, i) => (
                   <div key={i} className="space-y-6 group">
                      <div className="text-6xl font-display font-bold text-zinc-800 tracking-tighter group-hover:text-white transition-colors duration-500">{step.id}</div>
                      <div className="pt-6 border-t border-zinc-900">
                         <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">{step.title}</h3>
                         <p className="text-xs text-zinc-500 leading-relaxed font-medium">{step.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Interactive Signal Demo Mockup */}
        <section className="py-20 px-8 border-t border-zinc-900 bg-zinc-950/40">
           <div className="container mx-auto max-w-[1240px]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                 <div>
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tighter mb-8 leading-none">THE LOGIC <br/>ENGINE.</h2>
                    <p className="text-lg text-zinc-400 mb-10 leading-relaxed">Our engine builds a living multidimensional profile of your technical signal. Every commit, architectural decision, and sprint delivery is indexed into a verifiable score.</p>
                    <div className="space-y-4">
                       {[
                         { label: "Technical Precision", value: 98 },
                         { label: "Delivery Speed", value: 92 },
                         { label: "Architectural Clarity", value: 89 },
                       ].map(metric => (
                         <div key={metric.label}>
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">
                               <span>{metric.label}</span>
                               <span className="text-white">{metric.value}%</span>
                            </div>
                            <div className="h-0.5 bg-zinc-900 overflow-hidden"><div className="h-full bg-white w-0 animate-[shimmer_2s_infinite]" style={{ width: `${metric.value}%` }} /></div>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="relative">
                    <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full" />
                    <Card className="relative z-10 border-zinc-800 bg-zinc-950 shadow-premium overflow-hidden border-2">
                       <CardHeader className="border-b border-zinc-900 bg-zinc-900/10 p-6 flex flex-row items-center justify-between">
                          <div className="flex items-center gap-3">
                             <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                             <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                             <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                          </div>
                          <div className="text-[10px] font-mono font-bold text-zinc-600 tracking-widest uppercase">SIGNAL_ANALYSIS_v2.0</div>
                       </CardHeader>
                       <CardContent className="p-8 space-y-8 font-mono">
                          <div className="text-xs text-zinc-500 whitespace-pre leading-relaxed">
                             <span className="text-emerald-500">{">"}</span> SCANNING REPOSITORIES...<br/>
                             <span className="text-emerald-500">{">"}</span> 422 COMMITS MATCHED.<br/>
                             <span className="text-emerald-500">{">"}</span> ANALYZING SYSTEM ARCHITECTURE...<br/>
                             <span className="text-emerald-500">{">"}</span> <span className="text-white font-bold">MATCH FOUND: FRONTEND_MICRO_SPRINT_0x1A</span>
                          </div>
                          <div className="p-6 border border-zinc-800 bg-zinc-900/20 rounded-sm">
                             <div className="flex items-center justify-between mb-4">
                                <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Candidate Score</div>
                                <div className="text-2xl font-display font-bold text-white tracking-tighter">94%</div>
                             </div>
                             <div className="flex gap-1">
                                {Array.from({length: 20}).map((_, i) => (
                                  <div key={i} className={`h-4 flex-1 ${i < 18 ? 'bg-white' : 'bg-zinc-900'}`} />
                                ))}
                             </div>
                          </div>
                          <div className="flex justify-center pt-4">
                             <Badge variant="success" className="h-8 px-6 text-[10px] tracking-[0.2em] font-bold">SIGNAL VERIFIED</Badge>
                          </div>
                       </CardContent>
                    </Card>
                 </div>
              </div>
           </div>
        </section>

        {/* Technical Constraints (FAQ) */}
        <section className="py-40 px-8">
           <div className="container mx-auto max-w-[1240px]">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-20">
                 <div className="md:col-span-4">
                    <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-white underline underline-offset-8 decoration-zinc-800 mb-10">THE CONSTRAINTS.</h2>
                    <p className="text-xs text-zinc-500 leading-relaxed font-medium">Standard operating protocols for marketplace security and intellectual property protection.</p>
                 </div>
                 <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-12">
                     {[
                       { q: "How are students paid?", a: "All stipends are held in the InternConnect Escrow Protocol. 50% released at midpoint, 50% upon verified delivery." },
                       { q: "What about IP?", a: "Standard IP assignments are built into every marketplace contract. All code delivered belongs to the hiring entity." },
                       { q: "Is the signal real?", a: "Yes. We bypass traditional resumes by indexing actual technical contributions and project delivery records." },
                       { q: "Can I switch roles?", a: "Internships are scoped micro-engagements. Upon completion, you can immediately cycle into new logical matches." },
                     ].map(item => (
                       <div key={item.q} className="space-y-4">
                          <h3 className="text-[11px] font-bold text-white uppercase tracking-widest">{item.q}</h3>
                          <p className="text-[11px] text-zinc-600 leading-relaxed font-medium">{item.a}</p>
                       </div>
                     ))}
                 </div>
              </div>
           </div>
        </section>

        {/* Closing CTA */}
        <section className="py-40 px-8 bg-zinc-950 text-white text-center border-t border-zinc-900">
           <h2 className="text-5xl md:text-8xl font-display font-bold mb-12 tracking-tighter uppercase leading-none text-white">READY TO <br/>SHIP?</h2>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <Link href="/browse" className="w-full sm:w-auto">
                <Button size="lg" className="w-full h-16 px-12 bg-white text-black hover:bg-zinc-200 uppercase tracking-widest font-bold text-xs rounded-sm">
                  Start Building
                </Button>
              </Link>
              <Link href="/onboarding" className="w-full sm:w-auto">
                <Button variant="ghost" size="lg" className="w-full h-16 px-12 text-zinc-400 hover:text-white uppercase tracking-widest font-bold text-xs border border-zinc-800 rounded-sm">
                  Build Profile
                </Button>
              </Link>
           </div>
        </section>
      </main>
  );
}

