"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Bell, 
  Zap, 
  Clock, 
  MessageSquare, 
  Banknote, 
  Star, 
  Eye, 
  CheckCircle2,
  Filter,
  MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Notifications Data
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: "Match",
    title: "New 95% Match Found",
    description: "A new 'Frontend Micro-Internship' at Draftly HQ perfectly aligns with your skills.",
    time: "2 mins ago",
    read: false,
    icon: Zap,
    color: "text-accent",
    bg: "bg-accent/10"
  },
  {
    id: 2,
    type: "Application",
    title: "Application Shortlisted",
    description: "Your application for 'Product Design Trainee' at Superhuman has been moved to Shortlisted.",
    time: "45 mins ago",
    read: false,
    icon: CheckCircle2,
    color: "text-accent-3",
    bg: "bg-accent-3/10"
  },
  {
    id: 3,
    type: "Message",
    title: "New Message from Sarah K.",
    description: "\"Hey Aryan, would love to discuss the Next.js onboarding task...\"",
    time: "2 hours ago",
    read: true,
    icon: MessageSquare,
    color: "text-status-red",
    bg: "bg-status-red/10"
  },
  {
    id: 4,
    type: "Payment",
    title: "Stipend Released",
    description: "Your milestone payment of $500 for the Linear project has been released to your account.",
    time: "5 hours ago",
    read: true,
    icon: Banknote,
    color: "text-accent-2",
    bg: "bg-accent-2/10"
  },
  {
    id: 5,
    type: "Review",
    title: "New Portfolio Endorsement",
    description: "Vercel endorsed your 'Turbo Feature' project with a 5-star rating.",
    time: "1 day ago",
    read: true,
    icon: Star,
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  },
  {
    id: 6,
    type: "View",
    title: "Profile Viewed",
    description: "A recruiter from Stripe recently viewed your portfolio and GitHub links.",
    time: "2 days ago",
    read: true,
    icon: Eye,
    color: "text-accent",
    bg: "bg-accent/10"
  }
];

const TABS = ["All", "Matches", "Applications", "Messages", "Payments"];

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredNotifications = MOCK_NOTIFICATIONS.filter(n => {
    if (activeTab === "All") return true;
    if (activeTab === "Matches") return n.type === "Match";
    if (activeTab === "Applications") return n.type === "Application";
    if (activeTab === "Messages") return n.type === "Message";
    if (activeTab === "Payments") return n.type === "Payment";
    return true;
  });

  return (
    <div className="min-h-screen bg-background text-copy-primary pt-24 pb-20">
      <div className="max-w-[800px] mx-auto px-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
              <Bell className="w-5 h-5" />
            </div>
            <h1 className="text-3xl font-display font-bold">Notifications</h1>
          </div>
          <button className="text-sm font-medium text-accent hover:text-accent-light transition-colors">Mark all as read</button>
        </div>

        {/* Tabs & Filters */}
        <Card className="bg-background-secondary border-edge mb-6">
          <div className="flex items-center justify-between p-2">
            <div className="flex gap-1">
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    activeTab === tab 
                      ? "bg-accent/10 text-accent font-semibold" 
                      : "text-copy-secondary hover:text-copy-primary hover:bg-white/5"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button className="p-2 text-copy-muted hover:text-copy-primary transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </Card>

        {/* Feed */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-20 bg-background-secondary rounded-2xl border border-edge border-dashed">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-6 h-6 text-copy-muted opacity-20" />
              </div>
              <p className="text-copy-secondary">No notifications found in this category.</p>
            </div>
          ) : (
            filteredNotifications.map((notif) => (
              <Card 
                key={notif.id} 
                className={cn(
                  "bg-background border-edge hover:border-edge-hover transition-all cursor-pointer group relative overflow-hidden",
                  !notif.read && "border-l-4 border-l-accent"
                )}
              >
                <CardContent className="p-5 flex gap-5">
                  <div className={cn("w-12 h-12 rounded-xl shrink-0 flex items-center justify-center", notif.bg)}>
                    <notif.icon className={cn("w-5 h-5", notif.color)} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className={cn("font-semibold leading-tight", !notif.read ? "text-copy-primary" : "text-copy-secondary")}>
                        {notif.title}
                      </h3>
                      <span className="text-[10px] font-medium text-copy-muted whitespace-nowrap ml-4">{notif.time}</span>
                    </div>
                    <p className="text-sm text-copy-secondary line-clamp-2 leading-relaxed">
                      {notif.description}
                    </p>
                  </div>

                  <button className="opacity-0 group-hover:opacity-100 p-1 text-copy-muted hover:text-copy-primary transition-all self-start">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </CardContent>
                
                {/* Unread Indicator Dot */}
                {!notif.read && (
                  <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-accent" />
                )}
              </Card>
            ))
          )}
        </div>

        <div className="mt-8 text-center">
          <button className="text-sm font-semibold text-copy-muted hover:text-copy-primary transition-colors">Load older notifications</button>
        </div>

      </div>
    </div>
  );
}
