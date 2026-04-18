"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  MoreVertical, 
  MoreHorizontal,
  ChevronRight,
  TrendingUp,
  Award,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Reviews Data
const MOCK_REVIEWS = [
  {
    id: 1,
    internName: "Aryan Sharma",
    role: "Frontend Micro-Internship",
    rating: 5,
    date: "Oct 15, 2025",
    comment: "Aryan showed exceptional mastery of Framer Motion and Next.js. He delivered the onboarding overhaul two weeks ahead of schedule and with zero major bugs. A true asset.",
    endorsements: ["Next.js", "Framer Motion", "UI Polish"],
    status: "Published"
  },
  {
    id: 2,
    internName: "Priya Patel",
    role: "Product Design Trainee",
    rating: 4,
    date: "Sep 28, 2025",
    comment: "Priya's wireframing skills are top-notch. She really understood the user pain points in our check-out flow. Looking forward to her portfolio update.",
    endorsements: ["UX Research", "Figma"],
    status: "Published"
  },
  {
    id: 3,
    internName: "Rahul Singh",
    role: "Growth Analytics Intern",
    rating: 5,
    date: "Aug 12, 2025",
    comment: "Rahul's deep dive into our conversion funnel saved us thousands in ad spend. His SQL optimization was impressive for an intern.",
    endorsements: ["SQL", "Growth Analytics"],
    status: "Published"
  }
];

export default function CompanyReviewsPage() {
  return (
    <div className="space-y-8 animate-in fade-in pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-copy-primary">Reviews & Endorsements</h1>
          <p className="text-copy-secondary mt-1">Review your past interns and release verified proof-of-work to their profiles.</p>
        </div>
        
        {/* Company Rating Summary */}
        <div className="bg-background border border-edge rounded-xl p-5 flex items-center gap-6 shrink-0 shadow-sm">
           <div className="flex flex-col items-center">
             <div className="text-3xl font-display font-bold text-copy-primary">4.9</div>
             <div className="flex gap-0.5 mt-1">
               {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />)}
             </div>
             <div className="text-[10px] text-copy-muted font-bold uppercase tracking-wider mt-2">Intern Rating</div>
           </div>
           
           <div className="w-px h-12 bg-edge" />
           
           <div className="grid grid-cols-2 gap-x-8 gap-y-2">
             <div className="flex items-baseline gap-2">
                <span className="text-lg font-display font-bold text-copy-primary">12</span>
                <span className="text-xs text-copy-secondary">Reviews Left</span>
             </div>
             <div className="flex items-baseline gap-2">
                <span className="text-lg font-display font-bold text-accent-3">100%</span>
                <span className="text-xs text-copy-secondary">Completion</span>
             </div>
             <div className="flex items-baseline gap-2">
                <span className="text-lg font-display font-bold text-copy-primary">8</span>
                <span className="text-xs text-copy-secondary">Endorsements</span>
             </div>
             <div className="flex items-baseline gap-2">
                <span className="text-lg font-display font-bold text-accent-2">+$12k</span>
                <span className="text-xs text-copy-secondary">Released</span>
             </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Latest Activity / Trends */}
        <div className="lg:col-span-1 space-y-6">
           <Card className="bg-background border-edge">
             <CardContent className="p-6">
               <h3 className="font-bold text-copy-primary flex items-center gap-2 mb-6">
                 <TrendingUp className="w-4 h-4 text-accent" /> Skills Most Endorsed
               </h3>
               <div className="space-y-4">
                 {[
                   { label: "Frontend Engineering", count: 5, color: "bg-accent" },
                   { label: "Product Design", count: 3, color: "bg-accent-2" },
                   { label: "Data Analytics", count: 2, color: "bg-accent-3" },
                   { label: "UX Research", count: 2, color: "bg-status-amber" },
                 ].map(skill => (
                   <div key={skill.label}>
                      <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                        <span className="text-copy-primary">{skill.label}</span>
                        <span className="text-copy-muted">{skill.count} times</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className={cn("h-full rounded-full", skill.color)} 
                          style={{ width: `${(skill.count / 5) * 100}%` }}
                        />
                      </div>
                   </div>
                 ))}
               </div>
             </CardContent>
           </Card>

           <Card className="bg-gradient-to-br from-accent-2/10 to-transparent border-accent-2/20">
             <CardContent className="p-6">
               <div className="w-10 h-10 bg-accent-2 text-white rounded-lg flex items-center justify-center mb-4">
                 <Award className="w-5 h-5" />
               </div>
               <h3 className="font-bold text-lg mb-2">Verified Integrity</h3>
               <p className="text-sm text-copy-secondary leading-relaxed">
                 You have endorsed 8 interns so far. These endorsements are etched onto their public proof-of-work profiles.
               </p>
               <Button variant="outline" size="sm" className="mt-4 border-accent-2/40 text-accent-2 hover:bg-accent-2/10">Manage Badges</Button>
             </CardContent>
           </Card>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2 space-y-4">
           <div className="flex items-center justify-between mb-2">
             <h2 className="text-lg font-display font-bold">Past Internship Reviews</h2>
             <div className="flex items-center gap-2">
               <span className="text-xs text-copy-muted">Show:</span>
               <select className="bg-transparent text-xs font-bold text-copy-primary border-none focus:ring-0 cursor-pointer">
                 <option>All Skills</option>
                 <option>Excellent Ratings</option>
               </select>
             </div>
           </div>

           <div className="space-y-4">
             {MOCK_REVIEWS.map(review => (
               <Card key={review.id} className="bg-background-secondary border-edge hover:border-edge-hover transition-colors group">
                 <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-background border border-edge flex items-center justify-center font-bold text-copy-primary">
                          {review.internName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-copy-primary">{review.internName}</h4>
                            <Badge variant="success" className="bg-accent-3/10 text-accent-3 border-transparent px-1 py-0 text-[10px] flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Verified
                            </Badge>
                          </div>
                          <p className="text-xs text-copy-secondary">{review.role} • {review.date}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(i => <Star key={i} className={cn("w-3.5 h-3.5", i <= review.rating ? "fill-accent text-accent" : "text-copy-muted")} />)}
                        </div>
                        <button className="text-copy-muted hover:text-copy-primary transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                      </div>
                    </div>

                    <p className="text-[0.95rem] text-copy-secondary leading-relaxed mb-6 italic">
                      "{review.comment}"
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        {review.endorsements.map(tag => (
                          <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-copy-muted bg-white/5 border border-edge px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button className="text-sm font-semibold text-accent hover:text-accent-light flex items-center gap-1 transition-colors">
                        View Intern Profile <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                 </CardContent>
               </Card>
             ))}
           </div>

           <div className="pt-8 flex justify-center">
             <Button variant="outline" className="text-copy-muted border-edge w-full max-w-xs">Load Historical Records</Button>
           </div>
        </div>

      </div>

    </div>
  );
}
