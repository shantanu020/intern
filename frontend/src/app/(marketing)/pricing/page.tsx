"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  HelpCircle, 
  Sparkles, 
  Zap, 
  Building2, 
  ShieldCheck,
  Star,
  Banknote,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    desc: "Perfect for testing the platform with your first micro-internship.",
    features: [
      "1 Active Role Post",
      "Limited AI Match Scores",
      "Standard Support",
      "5% Transaction Fee",
      "Basic Applicant Tracking"
    ],
    buttonText: "Start for Free",
    variant: "secondary",
    icon: Star
  },
  {
    name: "Professional",
    price: "$99",
    monthly: true,
    desc: "For growing teams hiring multiple interns across different tracks.",
    features: [
      "3 Active Role Posts",
      "Full AI Match Score Analysis",
      "Priority Email Support",
      "3% Transaction Fee",
      "Verified Portfolio Access",
      "Bulk Applicant Actions"
    ],
    buttonText: "Go Pro",
    variant: "primary",
    popular: true,
    icon: Zap
  },
  {
    name: "Scale",
    price: "$249",
    monthly: true,
    desc: "Enterprise-grade recruiting for companies hiring at scale.",
    features: [
      "Unlimited Role Posts",
      "Custom Match Signals",
      "Dedicated Account Manager",
      "0% Transaction Fee",
      "Advanced Permissions",
      "API Access for ATS"
    ],
    buttonText: "Join Scale",
    variant: "secondary",
    icon: Building2
  }
];

const FAQS = [
  { q: "How do micro-internships differ from full-time?", a: "Micro-internships are project-based, ranging from 2 to 8 weeks. They are designed for specific sprints, allowing you to vet talent before committing to a long-term role." },
  { q: "Is the payment secure?", a: "Yes. When you hire an intern, the stipend is held in an InternConnect Escrow account. Funds are only released once you approve the intern's work milestones." },
  { q: "What are 'Verified Proof-of-Work' profiles?", a: "Every intern on our platform has a portfolio that is company-endorsed. You can see exactly what they built for other companies and read peer/manager reviews." },
  { q: "Can I cancel my subscription anytime?", a: "Absolutely. You can downgrade or cancel your subscription at any time from your Workspace Settings." }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-copy-primary pb-24 px-6 relative overflow-hidden">
      
      {/* Bg Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent-2/10 blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-[1100px] relative z-10 text-center mb-20">
        <Badge variant="default" className="mb-4 bg-accent/20 text-accent-light border-accent/30">
          Transparent Pricing
        </Badge>
        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Built for startups of <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-2">all sizes.</span></h1>
        <p className="text-xl text-copy-secondary max-w-2xl mx-auto">Flexible plans designed to help you find and hire the best student talent without the traditional recruiting overhead.</p>
      </div>

      {/* Pricing Grid */}
      <div className="container mx-auto max-w-[1100px] grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 mb-32">
        {PLANS.map((plan, i) => (
          <Card 
            key={i} 
            className={cn(
              "bg-background-secondary border-edge transition-all hover:border-accent/40 flex flex-col pt-2 overflow-hidden",
              plan.popular && "border-accent ring-1 ring-accent/30 shadow-[0_20px_50px_rgba(100,64,255,0.15)] scale-105 z-10"
            )}
          >
            {plan.popular && (
              <div className="bg-accent text-black text-[10px] font-black uppercase tracking-widest py-1.5 text-center">
                Most Popular for Startups
              </div>
            )}
            
            <CardContent className="p-8 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className={cn("p-2.5 rounded-xl", plan.variant === 'primary' ? 'bg-accent/20' : 'bg-white/5')}>
                  <plan.icon className={cn("w-6 h-6", plan.variant === 'primary' ? 'text-accent' : 'text-copy-muted')} />
                </div>
                <h3 className="text-xl font-display font-bold">{plan.name}</h3>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-display font-bold">{plan.price}</span>
                  {plan.monthly && <span className="text-lg text-copy-muted">/mo</span>}
                </div>
                <p className="text-sm text-copy-secondary mt-3 leading-relaxed">{plan.desc}</p>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {plan.features.map((f, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent-3 shrink-0 mt-0.5" />
                    <span className="text-sm text-copy-secondary">{f}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant={plan.variant as any} 
                size="lg" 
                className={cn("w-full shadow-lg", plan.variant === 'primary' && 'shadow-accent/20')}
              >
                {plan.buttonText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trust & Stats Section */}
      <div className="container mx-auto max-w-[1100px] mb-32 py-20 border-y border-edge/30">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
               <div className="text-3xl font-display font-bold text-copy-primary mb-1">2k+</div>
               <div className="text-xs font-bold uppercase tracking-widest text-copy-muted">Elite Students</div>
            </div>
            <div>
               <div className="text-3xl font-display font-bold text-copy-primary mb-1">98%</div>
               <div className="text-xs font-bold uppercase tracking-widest text-copy-muted">Success Rate</div>
            </div>
            <div>
               <div className="text-3xl font-display font-bold text-copy-primary mb-1">$0.5M</div>
               <div className="text-xs font-bold uppercase tracking-widest text-copy-muted">Stipends Released</div>
            </div>
            <div>
               <div className="text-3xl font-display font-bold text-copy-primary mb-1">15 min</div>
               <div className="text-xs font-bold uppercase tracking-widest text-copy-muted">Avg. Time to Hire</div>
            </div>
         </div>
      </div>

      {/* FAQ */}
      <div className="container mx-auto max-w-[800px] relative z-10">
        <h2 className="text-3xl font-display font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="grid gap-6">
          {FAQS.map((faq, i) => (
            <Card key={i} className="bg-background-secondary border-edge p-6 hover:border-accent/30 transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-white/5 p-2 rounded-lg shrink-0">
                  <HelpCircle className="w-5 h-5 text-accent" />
                </div>
                <div>
                   <h4 className="font-bold text-lg text-copy-primary mb-2">{faq.q}</h4>
                   <p className="text-copy-secondary leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="container mx-auto max-w-[900px] mt-32 bg-gradient-to-br from-accent-2/10 to-accent/10 border border-accent-2/20 rounded-3xl p-12 text-center relative overflow-hidden">
         <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/20 blur-[80px] rounded-full" />
         <h2 className="text-3xl font-display font-bold mb-4 relative z-10">Still have questions?</h2>
         <p className="text-copy-secondary mb-8 max-w-lg mx-auto relative z-10">Our enterprise team is ready to talk about custom hiring needs, API integrations, and volume discounts.</p>
         <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Button size="lg" className="px-10 bg-accent-2 hover:bg-accent-2/90">Contact Sales</Button>
            <Button size="lg" variant="outline" className="px-10 border-edge">View Case Studies</Button>
         </div>
      </div>

    </div>
  );
}
