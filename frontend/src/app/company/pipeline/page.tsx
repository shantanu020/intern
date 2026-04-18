"use client";

import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { usePipelineStore, ColumnState } from "@/store/usePipelineStore";
import { Badge } from "@/components/ui/badge";
import { Zap, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

const COLUMNS = [
  { id: "applied", title: "Applied", color: "bg-white/10 text-copy-primary" },
  { id: "screened", title: "AI Screened", color: "bg-accent/20 text-accent-light" },
  { id: "shortlisted", title: "Shortlisted", color: "bg-accent/40 text-white" },
  { id: "interviewing", title: "Interviewing", color: "bg-accent text-white shadow-glow" },
  { id: "offer", title: "Offer Extended", color: "bg-accent-3/20 text-accent-3 border border-accent-3/50" }
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

  if (!mounted) return <div className="p-8 text-copy-muted">Loading pipeline...</div>;

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-copy-primary">Hiring Pipeline</h1>
        <p className="text-copy-secondary mt-1">Drag and drop candidates to update their status. Applications are auto-saved.</p>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4 flex-1 items-start">
          {COLUMNS.map(col => {
            const items = store[col.id as keyof ColumnState] || [];
            return (
              <div key={col.id} className="min-w-[300px] w-[300px] bg-background border border-edge rounded-xl flex flex-col max-h-full">
                {/* Column Header */}
                <div className="p-3 border-b border-edge flex items-center justify-between bg-white/5 rounded-t-xl">
                  <span className={cn("text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md", col.color)}>
                    {col.title}
                  </span>
                  <span className="text-xs font-semibold text-copy-muted bg-background px-2 py-0.5 rounded-full border border-edge">
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
                        "p-3 flex-1 overflow-y-auto space-y-3 transition-colors",
                        snapshot.isDraggingOver ? "bg-white/5" : ""
                      )}
                      style={{ minHeight: '200px' }}
                    >
                      {items.map((candidate, index) => (
                        <Draggable key={candidate.id} draggableId={candidate.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={cn(
                                "bg-background-secondary border p-3 rounded-lg flex items-start gap-3 group relative cursor-grab active:cursor-grabbing",
                                snapshot.isDragging ? "border-accent shadow-md z-50 scale-105" : "border-edge hover:border-edge-hover"
                              )}
                              style={provided.draggableProps.style}
                            >
                              <div {...provided.dragHandleProps} className="mt-1 text-copy-muted opacity-0 group-hover:opacity-100 transition-opacity absolute top-3 right-3">
                                <GripVertical className="w-4 h-4" />
                              </div>
                              
                              <div className="w-8 h-8 rounded bg-white/5 border border-edge flex items-center justify-center font-bold text-copy-primary text-xs flex-shrink-0 mt-0.5">
                                {candidate.name.charAt(0)}
                              </div>
                              <div className="flex-1 pr-6">
                                <div className="font-semibold text-copy-primary text-sm line-clamp-1">{candidate.name}</div>
                                <div className="text-xs text-copy-secondary line-clamp-1 mt-0.5">{candidate.uni}</div>
                                <div className="mt-2 text-xs text-copy-muted">{candidate.role}</div>
                              </div>
                              <div className="absolute bottom-3 right-3">
                                <Badge variant={candidate.score >= 90 ? "success" : "default"} className="px-1.5 py-0.5 text-[10px]">
                                  <Zap className="w-2.5 h-2.5 mr-1" /> {candidate.score}%
                                </Badge>
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
