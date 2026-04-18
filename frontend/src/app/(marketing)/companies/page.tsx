"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Users, 
  ShieldCheck, 
  BarChart3, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Building2,
  Clock,
  Briefcase
} from "lucide-react";
import Link from "next/link";

const FEATURES = [
  {
    title: "AI-Vetted Talent",
    desc: "Our engine analyzes 40+ signals including code quality, design sensibility, and soft skills to surface the top 1% of applicants.",
    icon: Zap,
    color: "text-accent",
    bg: "bg-accent/10"
  },
  {
    title: "Verified Proof-of-Work",
    desc: "Don't rely on resumes. See every project and internship the student has completed, verified by the previous companies themselves.",
    icon: ShieldCheck,
    color: "text-accent-3",
    bg: "bg-accent-3/10"
  },
  {
    title: "Escrow-Protected Hiring",
    desc: "Secure your budget. Funds are held in escrow and only released when you sign off on student deliverables/milestones.",
    icon: BarChart3,
    color: "text-accent-2",
    bg: "bg-accent-2/10"
  }
];

const SOCIAL_PROOF = ["Linear", "Stripe", "Vercel", "Draftly", "Supabase", "Retool"];

export default function CompaniesLandingPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      
      {/* Background Decor */}

      {/* Hero Section */}
      <header className="pb-20 px-6 relative z-10">
        <div className="container mx-auto max-w-[1160px] text-center">
          <Badge variant="default" className="mb-6 bg-accent-2/10 text-accent-2 border-accent-2/30">
            <Building2 className="w-3 h-3 mr-2" />
            Designed for Startups & Scaleups
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold max-w-4xl mx-auto text-copy-primary mb-6 leading-[1.05]">
            Hire your next <span className="text-accent-2">rockstar intern</span> in minutes, not weeks.
          </h1>
          
          <p className="text-xl text-copy-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop digging through 500+ generic resumes. InternConnect uses AI to match you with vetted talent for project-based micro-internships.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login?type=company">
              <Button size="lg" className="px-8 flex items-center group">
                Start Hiring Now <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="secondary" className="px-8 border-edge">
              Book a Demo
            </Button>
          </div>

          <div className="mt-20 pt-10">
             <p className="text-xs font-bold uppercase tracking-[0.2em] text-copy-muted mb-8">Trusted by teams at</p>
             <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-40 grayscale group hover:opacity-70 transition-opacity">
                {SOCIAL_PROOF.map(brand => (
                  <span key={brand} className="text-xl font-display font-black text-copy-primary">{brand}</span>
                ))}
             </div>
          </div>
        </div>
      </header>

      {/* Feature Grid */}
      <section className="py-24 px-6 bg-background-secondary/30 relative z-10">
        <div className="container mx-auto max-w-[1160px]">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {FEATURES.map((feature, i) => (
                <Card key={i} className="bg-background border-edge hover:border-accent-2/40 transition-all hover:-translate-y-2 group">
                  <CardContent className="p-8">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", feature.bg)}>
                      <feature.icon className={cn("w-7 h-7", feature.color)} />
                    </div>
                    <h3 className="text-xl font-display font-bold text-copy-primary mb-3">{feature.title}</h3>
                    <p className="text-copy-secondary leading-relaxed text-[0.95rem]">
                      {feature.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
           </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 px-6 relative z-10">
        <div className="container mx-auto max-w-[960px]">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">The New Standard in Recruiting</h2>
            <p className="text-copy-secondary max-w-xl mx-auto">Why we exceed traditional boards like LinkedIn or Glassdoor.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
             <div className="space-y-6">
                {[
                  { t: "Verified Work, Not Words", d: "We force students to show proof-of-work from previously endorsed projects." },
                  { t: "Micro-Internships (2-8 weeks)", d: "Perfect for testing talent on a specific sprint before committing to a 6-month term." },
                  { t: "Seamless Escrow Payments", d: "One-click stipend releases with automated invoicing and tax compliance." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="bg-accent-3/20 p-1.5 rounded-full h-fit mt-1">
                      <CheckCircle2 className="w-4 h-4 text-accent-3" />
                    </div>
                    <div>
                       <h4 className="font-bold text-copy-primary">{item.t}</h4>
                       <p className="text-copy-secondary text-sm mt-1">{item.d}</p>
                    </div>
                  </div>
                ))}
             </div>
             
             {/* Mock Dashboard Card */}
             <div className="relative group">
              {/* Removed gradient glow for UI consistency */}
               <Card className="bg-background-secondary border-accent-2/30 relative z-10 overflow-hidden shadow-2xl">
                 <div className="p-4 border-b border-edge bg-white/5 flex items-center justify-between">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-status-red/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-status-amber/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-status-green/40" />
                    </div>
                    <span className="text-[10px] font-bold text-copy-muted uppercase tracking-widest">Recruiter Portal</span>
                 </div>
                 <div className="p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/20" />
                      <div className="flex-1 space-y-2">
                        <div className="h-2 w-1/3 bg-copy-primary/20 rounded-full" />
                        <div className="h-2 w-1/2 bg-copy-primary/10 rounded-full" />
                      </div>
                      <Badge variant="success" className="px-2 py-0">96% Fit</Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent-2/20" />
                      <div className="flex-1 space-y-2">
                        <div className="h-2 w-1/4 bg-copy-primary/20 rounded-full" />
                        <div className="h-2 w-2/3 bg-copy-primary/10 rounded-full" />
                      </div>
                      <Badge variant="success" className="px-2 py-0">92% Fit</Badge>
                    </div>
                 </div>
               </Card>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-accent/5">
        <div className="container mx-auto max-w-[800px] text-center">
            <h2 className="text-4xl font-display font-bold mb-6">Scale your product team with elite student talent.</h2>
            <p className="text-copy-secondary mb-10 text-lg">Join 200+ startups hiring through InternConnect's AI-matching engine.</p>
            <Link href="/login?type=company">
              <Button size="lg" className="px-10 h-14 text-lg">Create Recruiter Account</Button>
            </Link>
            <p className="text-sm text-copy-muted mt-6 italic">No credit card required for your first role post.</p>
        </div>
      </section>


    </div>
  );
}

import { cn } from "@/lib/utils";
