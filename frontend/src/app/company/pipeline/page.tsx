"use client";

import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { usePipelineStore, ColumnState } from "@/store/usePipelineStore";
import { Badge } from "@/components/ui/badge";
import { Zap, GripVertical, MessageSquare, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const COLUMNS = [
  { id: "applied", title: "Applied", color: "bg-white/5 text-copy-secondary border-zinc-800" },
  { id: "screened", title: "AI Screened", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
  { id: "shortlisted", title: "Shortlisted", color: "bg-accent-3/10 text-accent-3 border-accent-3/20" },
  { id: "interviewing", title: "Interviewing", color: "bg-accent-2/10 text-accent-2 border-accent-2/20 shadow-glow-accent-2/20" },
  { id: "offer", title: "Offer Extended", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" }
] as const;

export default function KanbanPipeline() {
  const store = usePipelineStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    store.moveCandidate(
      source.droppableId as keyof ColumnState,
      destination.droppableId as keyof ColumnState,
      source.index,
      destination.index
    );
  };

  if (!mounted) return <div className="p-8 text-copy-muted font-display uppercase tracking-widest text-[10px]">Synchronizing Pipeline Context...</div>;

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] animate-in fade-in duration-500">
      <div className="mb-10">
        <h1 className="text-3xl font-display font-bold text-white tracking-tighter uppercase">Hiring Pipeline</h1>
        <p className="text-copy-muted text-xs font-bold uppercase tracking-[0.2em] mt-2">Stage Management / Talent Discovery Protocol</p>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-6 flex-1 items-start scrollbar-custom">
          {COLUMNS.map(col => {
            const items = store[col.id as keyof ColumnState] || [];
            return (
              <div key={col.id} className="min-w-[320px] w-[320px] bg-zinc-950/50 border border-zinc-900 rounded-sm flex flex-col max-h-full shadow-inner">
                {/* Column Header */}
                <div className="p-4 border-b border-zinc-900 flex items-center justify-between bg-zinc-900/40">
                  <span className={cn("text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1.5 rounded-[2px] border", col.color)}>
                    {col.title}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-zinc-500 bg-black/40 px-2 py-0.5 rounded-sm border border-zinc-800">
                    {items.length}
                  </span>
                </div>

                {/* Droppable Area */}
                <Droppable droppableId={col.id}>
                  {(provided, snapshot) => (
                    <div 
                      ref={provided.innerRef} 
                      {...provided.droppableProps}
                      className={cn(
                        "p-3 flex-1 overflow-y-auto space-y-4 transition-colors min-h-[300px] scrollbar-hide",
                        snapshot.isDraggingOver ? "bg-accent/5" : ""
                      )}
                    >
                      {items.map((candidate, index) => (
                        <Draggable key={candidate.id} draggableId={candidate.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={cn(
                                "bg-zinc-900/60 border p-4 rounded-sm flex flex-col gap-4 group relative cursor-grab active:cursor-grabbing transition-all",
                                snapshot.isDragging 
                                  ? "border-accent shadow-premium z-50 scale-105 bg-zinc-800" 
                                  : "border-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-900/80"
                              )}
                              style={provided.draggableProps.style}
                            >
                              <div {...provided.dragHandleProps} className="text-zinc-700 opacity-40 group-hover:opacity-100 transition-opacity absolute top-4 right-4">
                                <GripVertical className="w-3.5 h-3.5" />
                              </div>
                              
                              <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-sm bg-black border border-zinc-800 flex items-center justify-center font-display font-bold text-white text-xs flex-shrink-0">
                                  {candidate.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-bold text-white text-[13px] uppercase tracking-wider truncate mb-0.5">{candidate.name}</div>
                                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest truncate">{candidate.uni}</div>
                                </div>
                              </div>

                              <div className="flex flex-col gap-3">
                                <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.2em] bg-black/30 px-2 py-1.5 rounded-sm self-start inline-flex items-center gap-2">
                                  <div className="w-1 h-1 rounded-full bg-zinc-800" /> {candidate.role}
                                </div>
                                
                                <div className="flex items-center justify-between mt-1">
                                  <div className={cn(
                                    "flex items-center gap-1.5 px-2 py-1 rounded-[2px] transition-all",
                                    candidate.score >= 90 ? "bg-accent/5 text-accent shadow-glow-accent/10" : "bg-zinc-900 text-zinc-500"
                                  )}>
                                    <Zap className={cn("w-3 h-3", candidate.score >= 90 ? "fill-current" : "")} />
                                    <span className="text-[10px] font-mono font-bold tracking-tighter">{candidate.score}% SIG</span>
                                  </div>

                                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                     <button 
                                      className="p-1.5 text-zinc-500 hover:text-white hover:bg-white/5 rounded-sm transition-colors"
                                      onClick={(e) => { e.stopPropagation(); window.location.href = '/company/messages'; }}
                                     >
                                       <MessageSquare className="w-3.5 h-3.5" />
                                     </button>
                                     <button className="p-1.5 text-zinc-500 hover:text-white hover:bg-white/5 rounded-sm transition-colors">
                                       <ExternalLink className="w-3.5 h-3.5" />
                                     </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            )
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
