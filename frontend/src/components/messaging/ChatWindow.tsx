"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  MoreVertical, 
  ExternalLink,
  ShieldCheck,
  Zap,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: number | string;
  text: string;
  time: string;
  isMe: boolean;
  sender: string;
}

interface ChatWindowProps {
  messages: Message[];
  activeThread: {
    name: string;
    subtitle: string;
    avatar: string;
    isSystem?: boolean;
    role?: string;
    signal?: number; // Optional signal score for company view
  };
}

export function ChatWindow({ messages, activeThread }: ChatWindowProps) {
  return (
    <div className="flex-1 flex flex-col bg-background relative overflow-hidden">
      
      {/* Thread Header */}
      <header className="h-20 bg-background/80 backdrop-blur-xl border-b border-edge flex items-center justify-between px-8 z-20 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-display font-bold text-sm text-white shadow-premium">
            {activeThread.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
               <h3 className="font-display font-bold text-copy-primary text-lg tracking-tight uppercase">{activeThread.name}</h3>
               {!activeThread.isSystem && (
                 <ShieldCheck className="w-4 h-4 text-emerald-500 fill-emerald-500/10" />
               )}
            </div>
            <div className="text-[10px] font-bold text-copy-muted uppercase tracking-[0.2em] flex items-center gap-2">
              {activeThread.isSystem ? (
                <span className="text-accent ring-1 ring-accent/30 px-1 rounded-[1px]">Protocol Core</span>
              ) : (
                <>
                  <Building className="w-3 h-3 text-zinc-700" />
                  <span>{activeThread.subtitle}</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
           {activeThread.role && (
             <Badge variant="outline" className="hidden lg:flex bg-white/5 border-edge hover:bg-white/10 transition-colors cursor-pointer px-3 py-1.5 font-bold uppercase tracking-widest text-[9px] gap-2">
               Context: {activeThread.role} <ExternalLink className="w-3 h-3" />
             </Badge>
           )}
           
           {activeThread.signal && (
             <div className="flex flex-col items-end">
                <div className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Signal Score</div>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: `${activeThread.signal}%` }} />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-accent">{activeThread.signal}%</span>
                </div>
             </div>
           )}

           <button className="w-10 h-10 rounded-xl hover:bg-white/5 transition-all flex items-center justify-center text-copy-muted hover:text-copy-primary">
             <MoreVertical className="w-5 h-5" />
           </button>
        </div>
      </header>

      {/* Message Stage */}
      <div className="flex-1 overflow-y-auto p-10 space-y-8 flex flex-col scrollbar-hide">
        <div className="flex flex-col items-center justify-center py-10 opacity-40">
           <div className="w-12 h-12 rounded-full border border-dashed border-edge flex items-center justify-center mb-4">
             <Clock className="w-4 h-4" />
           </div>
           <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-copy-muted">Secure Signal Established</div>
        </div>

        {messages.map((msg, i) => (
          <div 
            key={msg.id} 
            className={cn(
              "flex flex-col max-w-[70%] animate-in fade-in slide-in-from-bottom-2",
              msg.isMe ? "self-end items-end" : "self-start items-start"
            )}
          >
            <div className="flex items-center gap-2 mb-2 px-1">
              {!msg.isMe && <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">{activeThread.name}</span>}
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-800">{msg.time}</span>
              {msg.isMe && <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">You</span>}
            </div>

            <div className={cn(
              "px-5 py-4 rounded-2xl text-[0.95rem] leading-relaxed shadow-sm transition-all hover:shadow-md",
              msg.isMe 
                ? "bg-accent text-zinc-950 font-medium rounded-tr-sm" 
                : "bg-background-secondary border border-edge text-copy-primary rounded-tl-sm hover:border-zinc-700"
            )}>
              {msg.text}
            </div>
            
            {i === messages.length - 1 && msg.isMe && (
               <div className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest mt-2 flex items-center gap-1.5">
                  <Zap className="w-2.5 h-2.5 fill-current" /> Signal Delivered
               </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
