"use client";

import React, { useState } from "react";
import { useProfileStore, Skill } from "@/store/useProfileStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const SUGGESTED_SKILLS = ["React", "TypeScript", "Node.js", "Figma", "Python", "UI/UX Design", "Marketing"];
const LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"] as const;

export default function Step3() {
  const { skills, addSkill, removeSkill } = useProfileStore();
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState<Skill['level']>("Intermediate");

  const handleAdd = () => {
    if (!skillName.trim()) return;
    addSkill({ name: skillName.trim(), level: skillLevel });
    setSkillName("");
  };

  const handleSuggestAdd = (name: string) => {
    addSkill({ name, level: "Intermediate" });
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Description */}
      <div>
        <p className="text-copy-secondary">
          Add skills to train the AI matching engine. Pick your strongest 3-5 skills.
        </p>
      </div>

      {/* Recommended Chips */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-copy-primary">Suggested Skills</h4>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_SKILLS.map(s => {
            const added = skills.some(sk => sk.name === s);
            return (
              <button
                key={s}
                disabled={added}
                onClick={() => handleSuggestAdd(s)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors flex items-center gap-1",
                  added 
                    ? "bg-accent/10 border-accent/20 text-accent cursor-not-allowed" 
                    : "bg-white/5 border-edge hover:border-accent hover:bg-white/10 text-copy-primary"
                )}
              >
                {added && <Check className="w-3 h-3" />}
                {s}
              </button>
            )
          })}
        </div>
      </div>

      {/* Manual Add Form */}
      <div className="bg-background-secondary/50 border border-edge rounded-xl p-6">
        <h4 className="font-semibold text-copy-primary mb-4">Add Custom Skill</h4>
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <Input 
              label="Skill Name"
              placeholder="e.g. Docker"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            />
          </div>
          <div className="w-full sm:w-[200px]">
            <label className="text-sm font-medium text-copy-primary block mb-1.5">Proficiency</label>
            <select 
              className="flex h-11 w-full rounded-md border border-edge-hover bg-white/5 px-3 py-2 text-[0.9rem] text-copy-primary focus:outline-none focus:border-accent appearance-none disabled:cursor-not-allowed disabled:opacity-50"
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value as Skill['level'])}
            >
              {LEVELS.map(l => (
                <option key={l} value={l} className="bg-background-secondary text-copy-primary">{l}</option>
              ))}
            </select>
          </div>
          <Button onClick={handleAdd} className="w-full sm:w-auto h-11">Add</Button>
        </div>
      </div>

      {/* Selected Skills List */}
      {skills.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-edge">
          <h4 className="font-semibold text-copy-primary">Your Skills</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skills.map((skill, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-edge bg-white/5 group hover:border-edge-hover transition-colors">
                <div>
                  <div className="font-medium text-copy-primary">{skill.name}</div>
                  <div className="text-xs text-accent mt-0.5">{skill.level}</div>
                </div>
                <button 
                  onClick={() => removeSkill(skill.name)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-copy-muted hover:bg-status-red/10 hover:text-status-red transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
