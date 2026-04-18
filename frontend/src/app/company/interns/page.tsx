"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ExternalLink, Star, CheckCircle2, Clock, Package, MoreHorizontal, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data
type TaskState = "pending" | "in-progress" | "done";

interface Deliverable {
  id: string;
  title: string;
  status: TaskState;
}

interface Intern {
  id: string;
  name: string;
  role: string;
  sprintWeek: number;
  totalWeeks: number;
  deliverables: Deliverable[];
  milestonePercent: number;
  nextPayment: number;
}

const MOCK_INTERNS: Intern[] = [
  {
    id: "I101",
    name: "Aryan Sharma",
    role: "Frontend Micro-Internship",
    sprintWeek: 2,
    totalWeeks: 4,
    milestonePercent: 80,
    nextPayment: 500,
    deliverables: [
      { id: "d1", title: "Setup Next.js environment & repo", status: "done" },
      { id: "d2", title: "Build hero section & navigation", status: "done" },
      { id: "d3", title: "Responsive mobile menu", status: "in-progress" },
      { id: "d4", title: "Integrate footer", status: "pending" },
    ]
  },
  {
    id: "I102",
    name: "Sneha Reddy",
    role: "UI/UX Redesign",
    sprintWeek: 1,
    totalWeeks: 2,
    milestonePercent: 30,
    nextPayment: 400,
    deliverables: [
      { id: "d5", title: "Competitor analysis document", status: "done" },
      { id: "d6", title: "Wireframes for onboarding flow", status: "in-progress" },
      { id: "d7", title: "High-fidelity mockups", status: "pending" },
    ]
  },
  {
    id: "I103",
    name: "Rahul Singh",
    role: "Growth Hack Sprint",
    sprintWeek: 3,
    totalWeeks: 3,
    milestonePercent: 100,
    nextPayment: 700,
    deliverables: [
      { id: "d8", title: "Setup analytics funnel", status: "done" },
      { id: "d9", title: "Launch A/B copy tests", status: "done" },
      { id: "d10", title: "Final performance thesis report", status: "done" },
    ]
  }
];

export default function ActiveInternsPage() {
  const [interns, setInterns] = useState<Intern[]>(MOCK_INTERNS);

  const toggleTask = (internId: string, taskId: string) => {
    setInterns(interns.map(intern => {
      if (intern.id !== internId) return intern;
      
      const updatedTasks = intern.deliverables.map(task => {
        if (task.id !== taskId) return task;
        // Cycle states: pending -> in-progress -> done -> pending
        let nextStatus: TaskState = "pending";
        if (task.status === "pending") nextStatus = "in-progress";
        else if (task.status === "in-progress") nextStatus = "done";
        return { ...task, status: nextStatus };
      });

      return { ...intern, deliverables: updatedTasks };
    }));
  };

  const releaseEscrow = (internId: string) => {
    alert(`Escrow released for ${internId}! (Integration pending)`);
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in pb-8">
      
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-copy-primary">Active Interns</h1>
          <p className="text-copy-secondary mt-1">Track ongoing deliverables, sprints, and release escrow milestones.</p>
        </div>
        <button className="text-sm font-semibold text-accent hover:text-accent-light transition-colors">
          View Past Interns
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interns.map((intern) => (
          <Card key={intern.id} className="bg-background flex flex-col h-full relative group">
            <CardContent className="p-0 flex flex-col h-full">
              
              {/* Card Header */}
              <div className="p-5 border-b border-edge bg-white/[0.02]">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-white/5 border border-edge flex items-center justify-center font-bold text-copy-primary flex-shrink-0">
                      {intern.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-copy-primary leading-tight">{intern.name}</h3>
                      <p className="text-xs text-copy-secondary line-clamp-1 mt-0.5">{intern.role}</p>
                    </div>
                  </div>
                  <button className="text-copy-muted hover:text-copy-primary -mt-1"><MoreHorizontal className="w-4 h-4" /></button>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-accent/10 border-accent/20 text-accent font-medium space-x-1 px-2 py-0.5 pointer-events-none">
                    <Clock className="w-3 h-3 inline-block mr-1 -mt-0.5" />
                    Sprint Week {intern.sprintWeek} / {intern.totalWeeks}
                  </Badge>
                </div>
              </div>

              {/* Tasks List */}
              <div className="p-5 flex-1 mt-2">
                <h4 className="text-sm font-semibold text-copy-primary mb-4 flex items-center gap-2">
                  <Package className="w-4 h-4 text-copy-muted" /> Sprint Deliverables
                </h4>
                
                <div className="space-y-3">
                  {intern.deliverables.map((task) => (
                    <div 
                      key={task.id} 
                      className="flex items-start gap-3 cursor-pointer group/task"
                      onClick={() => toggleTask(intern.id, task.id)}
                    >
                      <div className="mt-0.5">
                        {task.status === "done" ? (
                          <CheckCircle2 className="w-4 h-4 text-accent-3" />
                        ) : task.status === "in-progress" ? (
                          <Clock className="w-4 h-4 text-amber-500" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-edge group-hover/task:border-copy-muted transition-colors" />
                        )}
                      </div>
                      <span className={cn(
                        "text-sm",
                        task.status === "done" ? "line-through text-copy-muted" : "text-copy-secondary group-hover/task:text-copy-primary"
                      )}>
                        {task.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Milestone & Escrow */}
              <div className="px-5 pb-5">
                <div className="bg-white/5 border border-edge rounded-lg p-3">
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-copy-muted">Milestone Progress</div>
                      <div className="font-display font-semibold mt-1">${intern.nextPayment} Escrow</div>
                    </div>
                    <div className="text-xs font-medium text-copy-secondary">{Math.floor(intern.milestonePercent)}%</div>
                  </div>
                  
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-4">
                    <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: `${intern.milestonePercent}%` }} />
                  </div>

                  <button 
                    onClick={() => releaseEscrow(intern.id)}
                    disabled={intern.milestonePercent < 100}
                    className={cn(
                      "w-full py-2 rounded-md text-sm font-semibold transition-all",
                      intern.milestonePercent >= 100 
                        ? "bg-accent-3/20 text-accent-3 border border-accent-3/30 hover:bg-accent-3/30" 
                        : "bg-white/5 text-copy-muted border border-transparent cursor-not-allowed"
                    )}
                  >
                    {intern.milestonePercent >= 100 ? "Release Escrow Payment" : "Awaiting Milestone..."}
                  </button>
                </div>
              </div>

              {/* Action Footer */}
              <div className="border-t border-edge bg-white/[0.01] p-3 flex items-center justify-around">
                <button className="flex flex-col items-center gap-1.5 text-copy-muted hover:text-accent transition-colors p-2 rounded-lg hover:bg-white/5 w-full">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-[10px] font-medium">Message</span>
                </button>
                <div className="w-px h-8 bg-edge" />
                <button className="flex flex-col items-center gap-1.5 text-copy-muted hover:text-accent transition-colors p-2 rounded-lg hover:bg-white/5 w-full">
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-[10px] font-medium">View Work</span>
                </button>
                <div className="w-px h-8 bg-edge" />
                <button className="flex flex-col items-center gap-1.5 text-copy-muted hover:text-accent-3 transition-colors p-2 rounded-lg hover:bg-white/5 w-full">
                  <Star className="w-4 h-4" />
                  <span className="text-[10px] font-medium">Review</span>
                </button>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
