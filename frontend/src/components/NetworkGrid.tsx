"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Node {
  id: number;
  x: number;
  y: number;
  type: "student" | "company";
  active: boolean;
}

export const NetworkGrid = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  useEffect(() => {
    // Generate static grid nodes
    const gridNodes: Node[] = [];
    const cols = 20;
    const rows = 12;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        gridNodes.push({
          id: r * cols + c,
          x: (c / cols) * 100,
          y: (r / rows) * 100,
          type: Math.random() > 0.85 ? "company" : "student",
          active: Math.random() > 0.7
        });
      }
    }
    setNodes(gridNodes);
  }, []);

  return (
    <div className="relative w-full h-[500px] bg-zinc-950/40 rounded-sm border border-zinc-900/50 overflow-hidden group">
      {/* Background Pulse */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent)]" />
      
      {/* Grid Canvas */}
      <div className="absolute inset-0 p-12 flex flex-wrap gap-4 justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity duration-1000">
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: node.active ? 1 : 0.1, 
              scale: 1,
              backgroundColor: node.type === "company" ? "#ffffff" : "#27272a"
            }}
            whileHover={{ 
              scale: 2, 
              backgroundColor: "#ffffff",
              boxShadow: "0 0 20px rgba(255,255,255,0.4)"
            }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            className="w-1.5 h-1.5 rounded-full cursor-crosshair transition-all"
          />
        ))}
      </div>

      {/* Decorative Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-8 left-8">
           <div className="text-[10px] font-bold text-white uppercase tracking-[0.4em] mb-1">Global Node Matrix</div>
           <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Awaiting Synchronization</span>
           </div>
        </div>

        <div className="absolute bottom-8 right-8 text-right">
           <div className="text-[40px] font-display font-black text-white/5 uppercase leading-none">0x884_SIG</div>
           <div className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest mt-2">Neural Link Layer v4.2</div>
        </div>
      </div>

      {/* Connection Indicator */}
      {hoveredNode !== null && (
        <div className="absolute bottom-12 left-8 p-4 border border-zinc-800 bg-zinc-950/90 rounded-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/10 rounded-sm flex items-center justify-center font-bold text-white text-[10px]">
                {nodes[hoveredNode].type === 'company' ? 'CORP' : 'TALN'}
              </div>
              <div>
                <div className="text-[10px] font-bold text-white uppercase tracking-tight">Node Integrity: 99.2%</div>
                <div className="text-[8px] font-medium text-zinc-500 uppercase tracking-widest">Active Connection Established</div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
