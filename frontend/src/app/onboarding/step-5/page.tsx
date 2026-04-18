"use client";

import React from "react";
import { useProfileStore } from "@/store/useProfileStore";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";

const DURATIONS = [
  { id: "Micro", label: "Micro", desc: "2-8 weeks" },
  { id: "Short-term", label: "Short-term", desc: "2-3 months" },
  { id: "Full-term", label: "Full-term", desc: "4-6 months" },
];

const MODES = ["Remote", "Hybrid", "On-site"];

export default function Step5() {
  const { availability, updateNestedField } = useProfileStore();

  return (
    <div className="space-y-10 animate-in fade-in">
      
      {/* Duration Boxes */}
      <section>
        <h3 className="text-sm font-semibold text-copy-primary mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-accent" /> Preferred Duration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DURATIONS.map(dur => {
            const isSelected = availability.duration === dur.id;
            return (
              <div 
                key={dur.id}
                onClick={() => updateNestedField('availability', 'duration', dur.id)}
                className={cn(
                  "p-4 rounded-xl border border-edge cursor-pointer transition-all flex flex-col items-center justify-center text-center",
                  isSelected 
                    ? "bg-accent/10 border-accent text-accent shadow-glow" 
                    : "bg-white/5 hover:border-edge-hover hover:bg-white/10 text-copy-secondary"
                )}
              >
                <div className={cn("font-semibold", isSelected ? "text-accent" : "text-copy-primary")}>
                  {dur.label}
                </div>
                <div className="text-xs opacity-80 mt-1">{dur.desc}</div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Slider */}
      <section className="bg-background-secondary/50 p-6 rounded-xl border border-edge">
        <h3 className="text-sm font-semibold text-copy-primary mb-6 flex items-center gap-2">
          <Clock className="w-4 h-4 text-accent" /> Weekly Availability
        </h3>
        <Slider 
          min={5}
          max={60}
          step={5}
          value={availability.hoursPerWeek}
          onChange={(e) => updateNestedField('availability', 'hoursPerWeek', parseInt(e.target.value))}
          valueSuffix=" hours/wk"
        />
        <div className="flex justify-between text-xs text-copy-muted mt-2">
          <span>Part-time (5h)</span>
          <span>Full-time (40h+)</span>
        </div>
      </section>

      {/* Date & Mode */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
           <label className="text-sm font-medium text-copy-primary block mb-2">Earliest Start Date</label>
           <Input 
             type="date"
             value={availability.startDate}
             onChange={(e) => updateNestedField('availability', 'startDate', e.target.value)}
             className="w-full justify-start text-left font-normal h-11"
           />
        </div>

        <div>
          <label className="text-sm font-medium text-copy-primary block mb-2">Preferred Work Mode</label>
          <div className="flex bg-white/5 border border-edge rounded-lg p-1">
            {MODES.map(mode => (
              <button
                key={mode}
                onClick={() => updateNestedField('availability', 'workMode', mode)}
                className={cn(
                  "flex-1 py-2 text-sm font-medium rounded-md transition-all",
                  availability.workMode === mode 
                    ? "bg-background shadow-sm text-copy-primary" 
                    : "text-copy-muted hover:text-copy-secondary"
                )}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
