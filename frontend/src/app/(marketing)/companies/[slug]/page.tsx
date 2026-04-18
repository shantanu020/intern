"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Building, 
  MapPin, 
  Globe, 
  Users, 
  Star,
  CheckCircle2,
  Briefcase,
  Zap,
  TrendingUp,
  Heart,
  Laptop
} from "lucide-react";

export default function CompanyProfilePage({ params }: { params: { slug: string } }) {
  // Mock data for any company slug
  const companyName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);

  return (
    <div className="min-h-screen bg-background text-copy-primary pb-24">
      
      {/* Hero Cover Banner */}
      <div className="h-[240px] w-full bg-gradient-to-r from-accent/20 via-background to-accent-2/20 border-b border-edge relative">
         <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px]" />
      </div>

      <div className="max-w-[1160px] mx-auto px-6 relative -mt-16">
        
        {/* Header Profile */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
           <div className="flex items-end gap-6">
             <div className="w-32 h-32 rounded-2xl bg-background border-4 border-background flex items-center justify-center shadow-lg relative overflow-hidden">
               <div className="w-full h-full bg-white/5 border border-edge rounded-xl flex items-center justify-center">
                 <span className="font-display font-bold text-4xl text-copy-primary">{companyName.substring(0,2).toUpperCase()}</span>
               </div>
             </div>
             <div className="pb-2">
               <div className="flex items-center gap-3 mb-1">
                 <h1 className="text-3xl font-display font-bold">{companyName}</h1>
                 <Badge variant="success" className="px-1.5 py-0.5"><CheckCircle2 className="w-3 h-3 mr-1" /> Verified Partner</Badge>
               </div>
               <p className="text-copy-secondary">Building the infrastructure for the next generation of creators.</p>
             </div>
           </div>
           
           <div className="flex items-center gap-3 w-full md:w-auto">
             <Button variant="outline" className="flex-1 md:flex-none">Follow</Button>
             <Button className="flex-1 md:flex-none">View Open Roles</Button>
           </div>
        </div>

        {/* Global Meta Strip */}
        <div className="flex flex-wrap items-center gap-6 py-5 border-y border-edge mb-12">
          <div className="flex items-center gap-2 text-sm text-copy-secondary">
            <MapPin className="w-4 h-4 text-copy-muted" /> San Francisco, CA
          </div>
          <div className="flex items-center gap-2 text-sm text-copy-secondary">
            <Users className="w-4 h-4 text-copy-muted" /> 50-200 Employees
          </div>
          <div className="flex items-center gap-2 text-sm text-copy-secondary">
            <Globe className="w-4 h-4 text-copy-muted" /> {params.slug}.com
          </div>
          <div className="flex items-center gap-2 text-sm text-copy-secondary">
            <TrendingUp className="w-4 h-4 text-copy-muted" /> Series B ($40M)
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Left Column */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* About Section */}
            <section>
              <h2 className="font-display font-bold text-2xl mb-4">About {companyName}</h2>
              <div className="text-copy-secondary leading-relaxed space-y-4">
                <p>We are a fast-growing startup dedicated to solving complex infrastructure problems. Our engineering culture values deep work, extreme ownership, and shipping fast. Interns here do not fetch coffee—they own entire micro-services and user-facing features from day one.</p>
                <p>Over the last 2 years, we've hosted 14 interns through InternConnect, with 9 of them receiving full-time return offers. We treat our interns exactly like full-time hires in terms of expectations and mentorship.</p>
              </div>
            </section>

            {/* Culture & Values Bento */}
            <section>
              <h2 className="font-display font-bold text-2xl mb-6">Culture & Values</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-background-secondary border-edge">
                  <CardContent className="p-6">
                    <Heart className="w-6 h-6 text-accent-3 mb-4" />
                    <h3 className="font-bold text-[1.1rem] mb-2">Ship Fast, Fix Later</h3>
                    <p className="text-sm text-copy-secondary">We prioritize velocity over perfection. We expect you to break things in staging and learn quickly.</p>
                  </CardContent>
                </Card>
                <Card className="bg-background-secondary border-edge">
                  <CardContent className="p-6">
                    <Zap className="w-6 h-6 text-accent mb-4" />
                    <h3 className="font-bold text-[1.1rem] mb-2">High Agency</h3>
                    <p className="text-sm text-copy-secondary">If you see a problem, you fix it. We don't wait for permission to improve the codebase.</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Open Roles (Mini Feed) */}
            <section>
              <h2 className="font-display font-bold text-2xl mb-6">Open Roles at {companyName}</h2>
              <div className="space-y-4">
                {[
                  { id: 'role-1', title: "Frontend Micro-Internship", type: "Micro", dur: "4 weeks", match: 95 },
                  { id: 'role-2', title: "Growth Analytics Intern", type: "Full-term", dur: "6 months", match: 64 },
                ].map(job => (
                  <Card key={job.id} className="bg-background border-edge hover:border-edge-hover transition-colors">
                    <CardContent className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div>
                        <Link href={`/role/${job.id}`}>
                          <h3 className="font-semibold text-lg hover:text-accent transition-colors leading-tight mb-1.5">{job.title}</h3>
                        </Link>
                        <div className="flex flex-wrap gap-2">
                           <Badge variant="default" className="font-normal bg-white/5 text-copy-muted px-2 py-0.5">{job.type} ({job.dur})</Badge>
                           <Badge variant="default" className="font-normal bg-white/5 text-copy-muted px-2 py-0.5">Remote</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 w-full md:w-auto">
                        {job.match >= 75 && (
                          <Badge variant="success" className="px-2 py-1 text-xs shrink-0"><Zap className="w-3 h-3 mr-1" /> {job.match}% Match</Badge>
                        )}
                        <Link href={`/role/${job.id}`} className="w-full md:w-auto">
                          <Button size="sm" className="w-full md:w-auto">View Role</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
            
          </div>

          {/* Right Sidebar Stats Area */}
          <div className="space-y-6 lg:sticky lg:top-24 max-h-[calc(100vh-6rem)]">
            
            <Card className="bg-background border-edge">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-accent text-accent" />)}
                </div>
                <div className="text-sm font-bold mt-2 mb-6">4.9 / 5 Intern Rating</div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-copy-secondary">Past Interns</span>
                    <span className="font-bold text-copy-primary">14</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-copy-secondary">Return Offer Rate</span>
                    <span className="font-bold text-status-green">64%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-copy-secondary">Avg Response</span>
                    <span className="font-bold text-copy-primary">2 Days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

             <Card className="bg-background-secondary border-edge">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">Perks & Benefits</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-copy-secondary">
                    <Laptop className="w-4 h-4 text-accent-light" /> MacBook Pro Provided
                  </li>
                  <li className="flex items-center gap-3 text-sm text-copy-secondary">
                    <Building className="w-4 h-4 text-accent-light" /> $500 WFH Stipend
                  </li>
                  <li className="flex items-center gap-3 text-sm text-copy-secondary">
                    <Users className="w-4 h-4 text-accent-light" /> 1-on-1 CTO Mentorship
                  </li>
                </ul>
              </CardContent>
            </Card>
            
          </div>
        </div>
        
      </div>
    </div>
  );
}
