"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Node {
  id: number;
  x: number;
  y: number;
  type: "student" | "company";
  seed: number;
}

interface Edge {
  source: number;
  target: number;
}

export const NetworkGrid = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  useEffect(() => {
    // Generate scattered nodes with a deterministic feeling
    const newNodes: Node[] = [];
    const numNodes = 75;
    
    for (let i = 0; i < numNodes; i++) {
      newNodes.push({
        id: i,
        x: 5 + Math.random() * 90, // Keep away from exact edges
        y: 5 + Math.random() * 90,
        type: Math.random() > 0.85 ? "company" : "student",
        seed: Math.random()
      });
    }

    // Calculate edges based on Euclidean distance
    const newEdges: Edge[] = [];
    for (let i = 0; i < numNodes; i++) {
      for (let j = i + 1; j < numNodes; j++) {
        const dx = newNodes[i].x - newNodes[j].x;
        // Multiply dy by roughly 2 to account for wide aspect ratio of the container (100% width vs 500px height)
        const dy = (newNodes[i].y - newNodes[j].y) * 1.5; 
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 15) {
          newEdges.push({ source: i, target: j });
        }
      }
    }

    setNodes(newNodes);
    setEdges(newEdges);
  }, []);

  // Find all edges connected to the hovered node
  const activeEdges = useMemo(() => {
    if (hoveredNode === null) return new Set<number>();
    const active = new Set<number>();
    edges.forEach((edge, idx) => {
      if (edge.source === hoveredNode || edge.target === hoveredNode) {
        active.add(idx);
      }
    });
    return active;
  }, [hoveredNode, edges]);

  // Find all nodes directly connected to the hovered node
  const activeNodes = useMemo(() => {
    if (hoveredNode === null) return new Set<number>();
    const active = new Set<number>([hoveredNode]);
    edges.forEach(edge => {
      if (edge.source === hoveredNode) active.add(edge.target);
      if (edge.target === hoveredNode) active.add(edge.source);
    });
    return active;
  }, [hoveredNode, edges]);

  return (
    <div className="relative w-full h-[500px] bg-zinc-950/80 rounded-sm border border-zinc-900 overflow-hidden group">
      {/* Deep Background Gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent_70%)]" />
      
      {/* Sweeping Scanner Effect */}
      <motion.div 
        className="absolute top-0 bottom-0 w-[200px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent skew-x-12"
        animate={{ left: ['-100%', '200%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      {/* SVG Canvas for Connecting Edges */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {edges.map((edge, idx) => {
          const sourceNode = nodes[edge.source];
          const targetNode = nodes[edge.target];
          if (!sourceNode || !targetNode) return null;
          
          const isActive = activeEdges.has(idx);
          const isFaded = hoveredNode !== null && !isActive;

          return (
            <motion.line
              key={`edge-${idx}`}
              x1={`${sourceNode.x}%`}
              y1={`${sourceNode.y}%`}
              x2={`${targetNode.x}%`}
              y2={`${targetNode.y}%`}
              stroke={isActive ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.15)"}
              strokeWidth={isActive ? 2 : 1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: isFaded ? 0.05 : 1,
              }}
              transition={{ duration: 1, delay: sourceNode.seed }}
            />
          );
        })}
      </svg>
      
      {/* Nodes Layer */}
      <div className="absolute inset-0">
        {nodes.map((node) => {
          const isHovered = hoveredNode === node.id;
          const isConnected = activeNodes.has(node.id);
          const isFaded = hoveredNode !== null && !isConnected;

          return (
            <motion.div
              key={node.id}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 rounded-full cursor-crosshair transition-colors duration-300",
                node.type === "company" ? "w-3 h-3" : "w-1.5 h-1.5"
              )}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: isFaded ? 0.2 : (isConnected ? 1 : 0.7), 
                scale: isHovered ? 2.5 : (isConnected ? 1.5 : 1),
                backgroundColor: isConnected || node.type === "company" ? "#ffffff" : "#a1a1aa",
                boxShadow: isConnected || (node.type === "company" && hoveredNode === null) ? "0 0 20px rgba(255,255,255,0.5)" : "none",
                // Subtle ambient drift
                x: [0, (node.seed - 0.5) * 6, 0],
                y: [0, (node.seed - 0.5) * 6, 0],
              }}
              transition={{ 
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
                x: { duration: 4 + node.seed * 3, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 5 + node.seed * 3, repeat: Infinity, ease: "easeInOut" }
              }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Ripple effect for hovered node */}
              {isHovered && (
                <motion.div 
                  className="absolute inset-0 rounded-full border border-white"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Decorative HUD Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-8 left-8">
           <div className="text-[10px] font-bold text-white uppercase tracking-[0.4em] mb-1">Global Node Matrix</div>
           <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-status-green animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-[8px] font-bold text-status-green uppercase tracking-widest">Network Synchronized</span>
           </div>
        </div>

        <div className="absolute bottom-8 right-8 text-right">
           <div className="text-[40px] font-display font-black text-white/5 uppercase leading-none tracking-tighter">0x884_SIG</div>
           <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em] mt-2">Neural Link Layer v5.0</div>
        </div>
      </div>

      {/* Connection HUD Overlay */}
      {hoveredNode !== null && (
        <div className="absolute bottom-8 left-8 p-4 border border-zinc-800 bg-zinc-950/90 backdrop-blur-md rounded-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white text-black rounded-sm flex items-center justify-center font-black text-xs shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                {nodes[hoveredNode].type === 'company' ? 'CORP' : 'NODE'}
              </div>
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-widest">ID: {nodes[hoveredNode].seed.toString().substring(2, 8)}</div>
                <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.2em] mt-0.5">
                  Connections: <span className="text-white">{activeNodes.size - 1} Active</span>
                </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

