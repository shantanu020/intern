"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  PlusSquare, 
  Users, 
  Eye, 
  Settings2, 
  MoreVertical, 
  Clock, 
  PauseCircle,
  Archive,
  BarChart3,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Active Roles Data
const MOCK_ROLES = [
  {
    id: "role-1",
    title: "Frontend Micro-Internship",
    status: "Active",
    applicants: 42,
    newApplicants: 12,
    datePosted: "Oct 12, 2025",
    type: "Micro-Internship (4 wks)",
    stipend: "$2,000",
    views: 1240
  },
  {
    id: "role-2",
    title: "Product Design Trainee",
    status: "Active",
    applicants: 28,
    newApplicants: 3,
    datePosted: "Oct 10, 2025",
    type: "Short-term (12 wks)",
    stipend: "$4,500",
    views: 856
  },
  {
    id: "role-3",
    title: "Growth Hack Sprint",
    status: "Draft",
    applicants: 0,
    newApplicants: 0,
    datePosted: "---",
    type: "Micro-Internship (2 wks)",
    stipend: "$1,200",
    views: 0
  },
  {
    id: "role-4",
    title: "Backend Dev Cycle",
    status: "Closed",
    applicants: 156,
    newApplicants: 0,
    datePosted: "Sep 20, 2025",
    type: "Full-term (6 mo)",
    stipend: "$8,000",
    views: 3421
  }
];

export default function CompanyRolesPage() {
  const [activeTab, setActiveTab] = useState("Active");

  const filteredRoles = MOCK_ROLES.filter(r => {
    if (activeTab === "All") return true;
    return r.status === activeTab;
  });

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-copy-primary">Role Management</h1>
          <p className="text-copy-secondary mt-1">Manage your active listings and evaluate recruitment performance.</p>
        </div>
        <Link href="/company/post-role">
          <Button variant="primary">
            <PlusSquare className="w-4 h-4 mr-2" />
            Post New Role
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-white/5 w-fit rounded-lg border border-edge">
        {["Active", "Draft", "Closed", "All"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-6 py-2 rounded-md text-sm font-medium transition-all",
              activeTab === tab 
                ? "bg-accent/10 text-accent font-semibold" 
                : "text-copy-secondary hover:text-copy-primary hover:bg-white/5"
            )}
          >
            {tab}
            {tab !== "All" && (
              <span className="ml-2 py-0.5 px-1.5 rounded-full bg-black/20 text-[10px] opacity-70">
                {MOCK_ROLES.filter(r => r.status === tab).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRoles.length === 0 ? (
          <div className="col-span-full py-20 bg-background rounded-2xl border border-edge border-dashed flex flex-col items-center justify-center text-center">
            <Archive className="w-12 h-12 text-copy-muted opacity-20 mb-4" />
            <p className="text-copy-secondary mb-4">No roles found in this category.</p>
            <Link href="/company/post-role">
              <Button variant="outline" size="sm">Create your first role</Button>
            </Link>
          </div>
        ) : (
          filteredRoles.map((role) => (
            <Card key={role.id} className="bg-background border-edge hover:border-accent/30 transition-all group overflow-hidden">
              <CardContent className="p-0">
                
                {/* Status Bar */}
                <div className={cn(
                  "h-1 w-full",
                  role.status === "Active" ? "bg-accent-3" : role.status === "Draft" ? "bg-status-amber" : "bg-copy-muted"
                )} />

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                         <h3 className="text-lg font-bold font-display group-hover:text-accent transition-colors leading-tight">
                           {role.title}
                         </h3>
                         <Badge variant={
                           role.status === "Active" ? "success" : 
                           role.status === "Draft" ? "warning" : "outline"
                         } className="px-1.5 py-0 text-[10px]">
                           {role.status}
                         </Badge>
                      </div>
                      <p className="text-xs text-copy-muted flex items-center gap-1.5">
                        <Clock className="w-3 h-3" /> Posted {role.datePosted}
                      </p>
                    </div>
                    <button className="text-copy-muted hover:text-copy-primary transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-copy-muted mb-1 flex items-center gap-1">
                        <Users className="w-3 h-3" /> Applicants
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-display font-bold text-copy-primary">{role.applicants}</span>
                        {role.newApplicants > 0 && <span className="text-[10px] font-bold text-accent-3">+{role.newApplicants} new</span>}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-copy-muted mb-1 flex items-center gap-1">
                        <Eye className="w-3 h-3" /> Views
                      </span>
                      <span className="text-xl font-display font-bold text-copy-primary">{role.views.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-copy-muted mb-1 flex items-center gap-1">
                        <BarChart3 className="w-3 h-3" /> Conversion
                      </span>
                      <span className="text-xl font-display font-bold text-copy-primary">
                        {role.applicants > 0 ? `${((role.applicants/role.views)*100).toFixed(1)}%` : '0%'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6 text-xs text-copy-secondary">
                     <span className="bg-white/5 px-2 py-1 rounded border border-edge">{role.type}</span>
                     <span className="bg-white/5 px-2 py-1 rounded border border-edge">{role.stipend} Stipend</span>
                  </div>

                  {/* Actions */}
                  <div className="pt-5 border-t border-edge flex items-center justify-between gap-3">
                    <div className="flex gap-2">
                       <Button variant="ghost" size="sm" className="h-9 w-9 p-0" title="Edit">
                         <Settings2 className="w-4 h-4" />
                       </Button>
                       <Link href={`/role/${role.id}`} target="_blank">
                         <Button variant="ghost" size="sm" className="h-9 w-9 p-0" title="View Listing">
                           <ExternalLink className="w-4 h-4" />
                         </Button>
                       </Link>
                    </div>
                    
                    <div className="flex gap-2 flex-1 justify-end">
                       {role.status === "Active" ? (
                         <>
                           <Button variant="outline" size="sm" className="bg-white/5">
                             <PauseCircle className="w-4 h-4 mr-2" />
                             Pause listing
                           </Button>
                           <Link href="/company/applicants">
                             <Button size="sm">Review Applicants</Button>
                           </Link>
                         </>
                       ) : role.status === "Draft" ? (
                         <Button size="sm">Publish Now</Button>
                       ) : (
                         <Button variant="outline" size="sm">Re-open listing</Button>
                       )}
                    </div>
                  </div>

                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

    </div>
  );
}
