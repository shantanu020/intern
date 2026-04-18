"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Zap, 
  Search, 
  SlidersHorizontal, 
  CheckCircle2, 
  XCircle, 
  Download, 
  FileText, 
  ChevronDown,
  MessageSquare,
  X 
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data - Standardized to PRD 6.6 Statuses
const MOCK_APPLICANTS = [
  { id: "A101", name: "Aryan Sharma", uni: "IIT Bombay", role: "Frontend Dev (React)", score: 96, date: "2 hrs ago", status: "Applied" },
  { id: "A102", name: "Priya Patel", uni: "NID", role: "Product Design", score: 92, date: "5 hrs ago", status: "Shortlisted" },
  { id: "A103", name: "Rahul Singh", uni: "IIM Ahmedabad", role: "Growth Marketing", score: 89, date: "1 day ago", status: "Interview" },
  { id: "A104", name: "Sneha Reddy", uni: "BITS Pilani", role: "Frontend Dev (React)", score: 88, date: "1 day ago", status: "Applied" },
  { id: "A105", name: "Arjun Verma", uni: "NIT Trichy", role: "Backend Dev (Node)", score: 85, date: "2 days ago", status: "Rejected" },
  { id: "A106", name: "Riya Gupta", uni: "SRCC", role: "Growth Marketing", score: 82, date: "3 days ago", status: "Applied" },
  { id: "A107", name: "Kunal Shah", uni: "IIT Delhi", role: "Backend Dev (Node)", score: 79, date: "4 days ago", status: "Shortlisted" },
  { id: "A108", name: "Ananya Iyer", uni: "Srishti", role: "Product Design", score: 76, date: "4 days ago", status: "Rejected" },
];

const TABS = ["All", "Applied", "Shortlisted", "Interview", "Rejected"];
const SORT_OPTIONS = ["Match Score", "Name", "Recent"];

export default function ApplicantsPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Match Score");
  const [showSortMenu, setShowSortMenu] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter & Sort Logic
  let filtered = MOCK_APPLICANTS.filter(a => activeTab === "All" || a.status === activeTab);
  
  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(a => 
      a.name.toLowerCase().includes(q) || 
      a.role.toLowerCase().includes(q) || 
      a.uni.toLowerCase().includes(q)
    );
  }

  // Sorting Implementation
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === "Match Score") return b.score - a.score;
    if (sortBy === "Name") return a.name.localeCompare(b.name);
    // "Recent" is mock-sorted by ID descending for this demo
    if (sortBy === "Recent") return b.id.localeCompare(a.id);
    return 0;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length && filtered.length > 0) setSelectedIds([]);
    else setSelectedIds(filtered.map(a => a.id));
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(x => x !== id));
    else setSelectedIds([...selectedIds, id]);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Applied": return "bg-accent/10 text-accent-light border-accent/20";
      case "Shortlisted": return "bg-accent-3/10 text-accent-3 border-accent-3/20";
      case "Interview": return "bg-accent-2/10 text-accent-2 border-accent-2/20";
      case "Rejected": return "bg-status-red/10 text-status-red border-status-red/20";
      default: return "bg-white/5 text-copy-secondary border-edge";
    }
  };

  // Prevent hydration flicker for dynamic content
  if (!mounted) return <div className="p-8 text-copy-muted animate-pulse">Loading Hub...</div>;

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] animate-in fade-in">
      
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-copy-primary">Applicant Tracking</h1>
          <p className="text-copy-secondary mt-1">Found {MOCK_APPLICANTS.length} total candidates for your open roles.</p>
        </div>
        
        {/* Bulk Actions */}
        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-2 rounded-lg animate-in slide-in-from-bottom-2">
            <span className="text-sm font-medium text-accent-light mr-4">{selectedIds.length} selected</span>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white/5 text-copy-primary hover:bg-white/10 rounded-md border border-edge transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5" /> Shortlist
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-status-red/10 text-status-red hover:bg-status-red/20 rounded-md border border-status-red/20 transition-colors">
                <XCircle className="w-3.5 h-3.5" /> Reject
              </button>
            </div>
          </div>
        )}
      </div>

      <Card className="bg-background flex flex-col flex-1 overflow-hidden border-edge">
        {/* Toolbar */}
        <div className="p-4 border-b border-edge flex flex-col gap-4 bg-white/[0.01]">
          <div className="flex items-center justify-between overflow-x-auto pb-2 no-scrollbar">
            <div className="flex gap-1.5">
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                    activeTab === tab 
                      ? "bg-accent/10 text-accent border border-accent/30 shadow-sm" 
                      : "text-copy-secondary hover:text-copy-primary hover:bg-white/5 border border-transparent"
                  )}
                >
                  {tab} 
                  <span className={cn(
                    "ml-2 text-[10px] px-1.5 py-0.5 rounded-full",
                    activeTab === tab ? "bg-accent/20 text-accent" : "bg-white/5 text-copy-muted"
                  )}>
                    {tab === "All" ? MOCK_APPLICANTS.length : MOCK_APPLICANTS.filter(a => a.status === tab).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-copy-muted group-focus-within:text-accent transition-colors" />
              <input 
                type="text" 
                placeholder="Search by name, role, or university..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-10 py-2 bg-white/5 border border-edge rounded-md text-sm text-copy-primary focus:outline-none focus:border-accent transition-all"
              />
              {search && (
                <button 
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-copy-muted hover:text-copy-primary"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowSortMenu(!showSortMenu)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 bg-white/5 border border-edge rounded-md text-sm font-medium transition-all",
                  showSortMenu ? "border-accent text-accent bg-accent/5" : "text-copy-secondary hover:text-copy-primary hover:bg-white/10"
                )}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Sort: {sortBy}
                <ChevronDown className={cn("w-4 h-4 transition-transform", showSortMenu && "rotate-180")} />
              </button>
              
              {showSortMenu && (
                <>
                  <div className="fixed inset-0 z-20" onClick={() => setShowSortMenu(false)} />
                  <div className="absolute right-0 mt-2 w-48 bg-background-secondary border border-edge rounded-lg shadow-xl z-30 py-1 animate-in fade-in zoom-in-95 duration-100">
                    {SORT_OPTIONS.map(option => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortBy(option);
                          setShowSortMenu(false);
                        }}
                        className={cn(
                          "w-full text-left px-4 py-2 text-sm transition-colors",
                          sortBy === option ? "text-accent bg-accent/10 font-semibold" : "text-copy-secondary hover:bg-white/5 hover:text-copy-primary"
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead className="sticky top-0 bg-background-secondary z-10 text-[10px] text-copy-muted uppercase tracking-[0.1em] font-bold">
              <tr>
                <th className="p-4 border-b border-edge w-12 text-center">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.length === filtered.length && filtered.length > 0} 
                    onChange={toggleSelectAll}
                    className="rounded border-edge focus:ring-accent bg-transparent cursor-pointer"
                  />
                </th>
                <th className="p-4 border-b border-edge">Candidate Profile</th>
                <th className="p-4 border-b border-edge hidden lg:table-cell">Role & Track</th>
                <th className="p-4 border-b border-edge">AI Fit Score</th>
                <th className="p-4 border-b border-edge hidden sm:table-cell">Applied</th>
                <th className="p-4 border-b border-edge">Current Status</th>
                <th className="p-4 border-b border-edge text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-edge align-middle bg-background">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                        <Search className="w-6 h-6 text-copy-muted text-opacity-20" />
                      </div>
                      <p className="text-copy-secondary font-medium">No candidates found for "{search || activeTab}"</p>
                      {(search || activeTab !== "All") && (
                        <button 
                          onClick={() => {setSearch(""); setActiveTab("All");}}
                          className="text-sm text-accent hover:underline"
                        >
                          Clear all filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map(app => (
                  <tr key={app.id} className={cn(
                    "group transition-all hover:bg-white/[0.015]",
                    selectedIds.includes(app.id) ? "bg-accent/[0.03]" : ""
                  )}>
                    <td className="p-4 text-center">
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(app.id)}
                        onChange={() => toggleSelect(app.id)}
                        className="rounded border-edge focus:ring-accent bg-transparent cursor-pointer"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/20 to-accent-2/20 border border-white/5 flex items-center justify-center font-display font-bold text-copy-primary text-sm flex-shrink-0 shadow-sm">
                          {app.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-copy-primary text-sm group-hover:text-accent transition-colors">{app.name}</div>
                          <div className="text-xs text-copy-muted">{app.uni}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <div className="text-sm text-copy-secondary font-medium">{app.role}</div>
                      <div className="text-[10px] text-copy-muted uppercase tracking-wider mt-0.5">Micro-Internship</div>
                    </td>
                    <td className="p-4">
                      <Badge variant={app.score >= 90 ? "success" : "default"} className="px-2 py-0.5 border border-transparent">
                        <Zap className="w-3 h-3 mr-1" /> {app.score}% Match
                      </Badge>
                    </td>
                    <td className="p-4 hidden sm:table-cell text-sm text-copy-secondary">{app.date}</td>
                    <td className="p-4">
                      <span className={cn(
                        "inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border", 
                        getStatusColor(app.status)
                      )}>
                        {app.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-copy-muted hover:text-copy-primary border border-transparent hover:border-edge bg-transparent hover:bg-white/5 rounded-md transition-all" title="View Profile">
                          <FileText className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-2 text-copy-muted hover:text-accent border border-transparent hover:border-edge bg-transparent hover:bg-white/5 rounded-md transition-all" 
                          title="Quick Chat"
                          onClick={() => window.location.href = '/company/messages'}
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        {app.status === "Applied" && (
                          <>
                           <button className="p-2 text-copy-muted hover:text-accent-3 border border-transparent hover:border-edge bg-transparent hover:bg-white/5 rounded-md transition-all" title="Shortlist">
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-copy-muted hover:text-status-red border border-transparent hover:border-edge bg-transparent hover:bg-white/5 rounded-md transition-all" title="Reject">
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-edge flex items-center justify-between text-xs font-medium text-copy-muted bg-background-secondary/30">
          <div className="flex items-center gap-4">
            <span>Showing {filtered.length} results</span>
            {search && <span className="text-accent underline cursor-pointer" onClick={() => setSearch("")}>Clear Search</span>}
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-edge rounded hover:bg-white/5 transition-colors disabled:opacity-30" disabled>Previous</button>
            <button className="px-3 py-1 border border-edge rounded hover:bg-white/5 transition-colors disabled:opacity-30" disabled>Next</button>
          </div>
        </div>
      </Card>
      
    </div>
  );
}
