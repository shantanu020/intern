"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Search, 
  UserMinus, 
  ExternalLink,
  Award,
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_USERS = [
  { id: "U1", name: "Aryan Sharma", uni: "IIT Bombay", major: "Comp. Science", signal: 96, joined: "Sep 2025", status: "Verified" },
  { id: "U2", name: "Priya Patel", uni: "NID Ahmedabad", major: "Interaction Design", signal: 92, joined: "Sep 2025", status: "Pending" },
  { id: "U3", name: "Rahul Singh", uni: "IIT Delhi", major: "Mathematics", signal: 88, joined: "Oct 2025", status: "Verified" },
  { id: "U4", name: "Sneha Reddy", uni: "BITS Pilani", major: "Information Tech", signal: 85, joined: "Oct 2025", status: "Flagged" },
  { id: "U5", name: "Arjun Verma", uni: "NIT Trichy", major: "Mechanical Eng.", signal: 79, joined: "Oct 2025", status: "Verified" },
  { id: "U6", name: "Riya Gupta", uni: "SRCC", major: "Economics", signal: 76, joined: "Oct 2025", status: "Pending" },
];

export default function AdminUsersPage() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="space-y-10 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-copy-primary">Talent Directory</h1>
          <p className="text-copy-secondary mt-1">Manage {MOCK_USERS.length} student profiles and verification signals.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="h-10 border-edge text-[10px] font-bold uppercase tracking-widest gap-2">
             <Filter className="w-3.5 h-3.5" /> High Signal Only
           </Button>
           <Button className="h-10 bg-accent hover:bg-zinc-200 text-black text-[10px] font-bold uppercase tracking-widest shadow-glow-accent transition-all">
             Export Student DNA
           </Button>
        </div>
      </div>

      {/* Stats Quickbar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {[
           { l: "Platform Signal", v: "84%", d: "Avg. Quality Score" },
           { l: "Verification Rate", v: "68%", d: "Approved Profiles" },
           { l: "New This Week", v: "+124", d: "Student Signups" },
           { l: "Flagged Nodes", v: "12", d: "Manual Audit Req" },
         ].map((s, i) => (
           <Card key={i} className="bg-background border-edge p-5">
              <div className="text-[9px] font-bold text-copy-muted uppercase tracking-widest mb-1">{s.l}</div>
              <div className="text-xl font-display font-bold text-copy-primary">{s.v}</div>
              <div className="text-[9px] font-medium text-copy-muted italic mt-1">{s.d}</div>
           </Card>
         ))}
      </div>

      {/* Search & List */}
      <div className="space-y-4">
         <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-copy-muted group-focus-within:text-accent transition-colors" />
            <input 
              type="text" 
              placeholder="Search by student name, university, or major..." 
              className="w-full bg-background border border-edge rounded-lg pl-12 pr-4 h-12 text-sm focus:border-accent outline-none font-medium"
            />
         </div>

         <Card className="bg-background border-edge overflow-hidden shadow-premium">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead className="bg-background-secondary text-[10px] font-bold uppercase tracking-[0.2em] text-copy-muted">
                    <tr>
                      <th className="px-8 py-5 border-b border-edge">Student Profile</th>
                      <th className="px-8 py-5 border-b border-edge">University & Track</th>
                      <th className="px-8 py-5 border-b border-edge">Signal Score</th>
                      <th className="px-8 py-5 border-b border-edge">Status</th>
                      <th className="px-8 py-5 border-b border-edge text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-edge">
                    {MOCK_USERS.map(user => (
                      <tr key={user.id} className="hover:bg-white/[0.015] transition-colors group">
                        <td className="px-8 py-5">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-white text-xs group-hover:bg-accent transition-colors">
                                 {user.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                 <div className="font-bold text-sm text-copy-primary">{user.name}</div>
                                 <div className="text-[10px] text-copy-muted font-bold uppercase tracking-tight mt-0.5">Joined {user.joined}</div>
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-5">
                           <div className="text-xs font-bold text-copy-secondary uppercase tracking-tight">{user.uni}</div>
                           <div className="text-[10px] font-medium text-copy-muted mt-0.5">{user.major}</div>
                        </td>
                        <td className="px-8 py-5">
                           <div className="flex items-center gap-3">
                              <div className="flex-1 max-w-[100px] h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                                 <div 
                                   className={cn(
                                     "h-full rounded-full transition-all duration-1000",
                                     user.signal >= 90 ? "bg-emerald-500 shadow-glow-emerald" : 
                                     user.signal >= 80 ? "bg-accent" : "bg-status-amber"
                                   )} 
                                   style={{ width: `${user.signal}%` }} 
                                 />
                              </div>
                              <span className="text-[11px] font-mono font-bold text-copy-primary">{user.signal}%</span>
                           </div>
                        </td>
                        <td className="px-8 py-5">
                           <Badge variant={
                             user.status === 'Verified' ? 'success' : 
                             user.status === 'Pending' ? 'default' : 'danger'
                           } className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest border-none">
                             {user.status}
                           </Badge>
                        </td>
                        <td className="px-8 py-5 text-right">
                           <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-2 border border-edge rounded-lg text-copy-muted hover:text-copy-primary hover:bg-white/5 transition-all" title="View Portfolio">
                                 <ExternalLink className="w-4 h-4" />
                              </button>
                              <button className="p-2 border border-edge rounded-lg text-copy-muted hover:text-accent transition-all" title="Grant Verification">
                                 <Award className="w-4 h-4" />
                              </button>
                              <button className="p-2 border border-edge rounded-lg text-copy-muted hover:text-status-red transition-all" title="Restrict Access">
                                 <UserMinus className="w-4 h-4" />
                              </button>
                           </div>
                        </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
            </div>
         </Card>
      </div>

    </div>
  );
}
