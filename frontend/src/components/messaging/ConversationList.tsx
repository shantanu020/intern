"use client";

import React from "react";
import { Search, Building } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Thread {
  id: number | string;
  name: string;
  subtitle: string;
  preview: string;
  time: string;
  unread: number;
  avatar: string;
  isSystem?: boolean;
  role?: string;
}

interface ConversationListProps {
  threads: Thread[];
  activeId: number | string;
  onSelect: (id: number | string) => void;
  title?: string;
}

export function ConversationList({ threads, activeId, onSelect, title = "Messages" }: ConversationListProps) {
  return (
    <div className="flex flex-col h-full bg-background-secondary border-r border-edge w-full overflow-hidden">
      {/* Header & Search */}
      <div className="p-6 border-b border-edge bg-background/50">
        <h2 className="text-xl font-display font-bold text-copy-primary mb-6">{title}</h2>
        <div className="relative group">
          <Search className="w-4 h-4 text-copy-muted group-focus-within:text-accent absolute left-3 top-1/2 -translate-y-1/2 transition-colors" />
          <input 
            type="text" 
            placeholder="Search conversations..." 
            className="w-full bg-background border border-edge rounded-lg pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-accent transition-all font-medium"
          />
        </div>
      </div>

      {/* Thread List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide py-2">
        {threads.map((thread) => {
          const isActive = String(thread.id) === String(activeId);
          return (
            <div 
              key={thread.id}
              onClick={() => onSelect(thread.id)}
              className={cn(
                "px-6 py-5 cursor-pointer transition-all border-l-2 relative group",
                isActive 
                  ? "bg-accent/5 border-accent shadow-sm" 
                  : "border-transparent hover:bg-white/5"
              )}
            >
              <div className="flex gap-4">
                <div className="relative shrink-0">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl border flex items-center justify-center font-display font-bold text-sm transition-all shadow-sm",
                    isActive ? "bg-accent text-zinc-950 border-accent scale-105" : "bg-zinc-900 border-zinc-800 text-zinc-400 group-hover:border-zinc-700"
                  )}>
                    {thread.avatar}
                  </div>
                  {thread.unread > 0 && (
                    <div className="absolute -top-1.5 -right-1.5 min-w-[1.25rem] h-5 bg-white text-black rounded-full text-[10px] flex items-center justify-center font-black px-1 ring-4 ring-background-secondary shadow-lg">
                      {thread.unread}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className={cn(
                      "text-sm font-bold truncate transition-colors",
                      thread.unread > 0 ? "text-copy-primary" : "text-copy-secondary",
                      isActive && "text-accent"
                    )}>
                      {thread.name}
                    </h4>
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-widest shrink-0 ml-2",
                      thread.unread > 0 ? "text-zinc-200" : "text-copy-muted"
                    )}>
                      {thread.time}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                    {thread.isSystem ? (
                      <span className="text-white bg-zinc-800 px-1.5 py-0.5 rounded-[2px] text-[8px]">System Protocol</span>
                    ) : (
                      <>
                        <Building className="w-3 h-3 text-zinc-700" />
                        <span className="truncate">{thread.subtitle}</span>
                      </>
                    )}
                  </div>

                  <p className={cn(
                    "text-xs truncate leading-relaxed",
                    thread.unread > 0 ? "text-copy-primary font-semibold" : "text-copy-muted font-medium"
                  )}>
                    {thread.preview}
                  </p>
                </div>
              </div>
              
              {isActive && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-accent rotate-45 rounded-sm lg:hidden md:hidden" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
